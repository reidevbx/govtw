import '@gov-tw/tokens/tokens.css'
import '@gov-tw/web-components/govtw-button'
import './style.css'
import Konva from 'konva'
import { asOf, units } from './data'
import { computeLayout } from './layout'
import { drawChart, readTheme } from './render'
import type { Member } from './types'

const SCALE_MIN = 0.1
const SCALE_MAX = 3
const SCALE_STEP = 1.15

const container = document.getElementById('chart') as HTMLDivElement
const stage = new Konva.Stage({
  container,
  width: container.clientWidth,
  height: container.clientHeight,
  draggable: true,
})
const layer = new Konva.Layer()
stage.add(layer)

const layout = computeLayout(units)

// 拖曳平移後放開滑鼠不要觸發點擊
let dragged = false
stage.on('dragstart', () => (dragged = true))
stage.on('pointerdown', () => (dragged = false))

function openSource(m: Member) {
  if (dragged) return
  window.open(m.source, '_blank', 'noopener')
}

let area = drawChart(layout, readTheme(), layer, openSource)

// 主題切換時重畫（顏色從 token 讀）
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  area = drawChart(layout, readTheme(), layer, openSource)
})

function clampScale(s: number) {
  return Math.min(SCALE_MAX, Math.max(SCALE_MIN, s))
}

/** 以畫面上的某一點為中心縮放 */
function zoomAt(point: { x: number; y: number }, next: number) {
  const old = stage.scaleX()
  const scale = clampScale(next)
  const anchor = {
    x: (point.x - stage.x()) / old,
    y: (point.y - stage.y()) / old,
  }
  stage.scale({ x: scale, y: scale })
  stage.position({ x: point.x - anchor.x * scale, y: point.y - anchor.y * scale })
}

function zoomCenter(factor: number) {
  zoomAt({ x: stage.width() / 2, y: stage.height() / 2 }, stage.scaleX() * factor)
}

function fit() {
  const scale = clampScale(Math.min(stage.width() / area.width, stage.height() / area.height))
  stage.scale({ x: scale, y: scale })
  stage.position({
    x: (stage.width() - area.width * scale) / 2 - area.x * scale,
    y: (stage.height() - area.height * scale) / 2 - area.y * scale,
  })
}

stage.on('wheel', (e) => {
  e.evt.preventDefault()
  const pointer = stage.getPointerPosition()
  if (!pointer) return
  // 觸控板縮放手勢（ctrlKey）的 deltaY 很小，用連續比例
  const factor = Math.exp(-e.evt.deltaY * (e.evt.ctrlKey ? 0.01 : 0.002))
  zoomAt(pointer, stage.scaleX() * factor)
})

// 雙指縮放
let pinch: { dist: number; scale: number } | null = null
stage.on('touchmove', (e) => {
  const [a, b] = e.evt.touches
  if (!a || !b) return
  e.evt.preventDefault()
  stage.stopDrag()
  const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
  const rect = container.getBoundingClientRect()
  const center = {
    x: (a.clientX + b.clientX) / 2 - rect.left,
    y: (a.clientY + b.clientY) / 2 - rect.top,
  }
  if (!pinch) pinch = { dist, scale: stage.scaleX() }
  zoomAt(center, pinch.scale * (dist / pinch.dist))
})
stage.on('touchend', () => (pinch = null))

new ResizeObserver(() => {
  stage.size({ width: container.clientWidth, height: container.clientHeight })
}).observe(container)

/** 匯出整張圖：暫時把視角設回 1:1 涵蓋全圖 */
function download() {
  const prev = { scale: stage.scale(), pos: stage.position(), size: stage.size() }
  stage.scale({ x: 1, y: 1 })
  stage.position({ x: -area.x, y: -area.y })
  stage.size({ width: area.width, height: area.height })
  // 瀏覽器 canvas 有尺寸上限（單邊約 16384px、面積約 2.6 億像素），圖太大就降低倍率
  const pixelRatio = Math.min(
    2,
    16000 / Math.max(area.width, area.height),
    Math.sqrt(1.5e8 / (area.width * area.height)),
  )
  const url = stage.toDataURL({ pixelRatio })
  stage.scale(prev.scale)
  stage.position(prev.pos)
  stage.size(prev.size)

  const a = document.createElement('a')
  a.href = url
  a.download = `中央政府首長組織圖-${asOf}.png`
  a.click()
}

const actions: Record<string, () => void> = {
  'zoom-in': () => zoomCenter(SCALE_STEP),
  'zoom-out': () => zoomCenter(1 / SCALE_STEP),
  fit,
  download,
}
document.querySelectorAll<HTMLElement>('[data-action]').forEach((el) => {
  el.addEventListener('click', () => actions[el.dataset.action!]?.())
})

// 文字版名單：canvas 讀不到內容，給螢幕閱讀器與搜尋用；順序同圖
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
const link = (href: string | null, text: string) =>
  href ? `<a href="${esc(href)}" rel="noopener" target="_blank">${esc(text)}</a>` : esc(text)
const list = document.getElementById('list')!
list.innerHTML = layout.units
  .map(
    ({ unit: u }) => `<li>${link(u.url, u.name)}<ul>${
      u.members.length
        ? u.members
            .map((m) => `<li>${esc(m.title)}：${m.vacant ? '出缺' : link(m.source, m.name)}</li>`)
            .join('')
        : `<li>${esc(u.note ?? '出缺')}</li>`
    }</ul></li>`,
  )
  .join('')
document.getElementById('as-of')!.textContent = asOf
// 政務委員兼部會首長會出現兩次，人數依姓名去重；出缺不計
document.getElementById('count')!.textContent = String(
  new Set(units.flatMap((u) => u.members.filter((m) => !m.vacant).map((m) => m.name))).size,
)

fit()
