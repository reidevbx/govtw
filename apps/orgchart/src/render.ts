import Konva from 'konva'
import { HEADER_H, MEMBER_H, MEMBER_W, memberPosition, type Layout, type UnitBox } from './layout'
import type { Member } from './types'

const PHOTO_R = 48
const PHOTO_TOP = 16
const MARGIN = 48

/** canvas 用的顏色從 govtw token 讀，跟著亮色／暗色主題 */
export interface Theme {
  canvas: string
  surface: string
  neutral: string
  border: string
  line: string
  text: string
  textSecondary: string
  brand: string
  onBrand: string
  font: string
}

export function readTheme(): Theme {
  const s = getComputedStyle(document.documentElement)
  const v = (name: string) => s.getPropertyValue(name).trim()
  return {
    canvas: v('--govtw-color-bg-canvas'),
    surface: v('--govtw-color-bg-surface'),
    neutral: v('--govtw-color-bg-neutral'),
    border: v('--govtw-color-border-subtle'),
    line: v('--govtw-color-border-default'),
    text: v('--govtw-color-text-primary'),
    textSecondary: v('--govtw-color-text-secondary'),
    brand: v('--govtw-color-brand-primary'),
    onBrand: v('--govtw-color-text-on-primary'),
    font: v('--govtw-font-sans'),
  }
}

/** 照片依 URL 快取，主題切換重畫時不重新下載 */
const imageCache = new Map<string, Promise<HTMLImageElement>>()

function loadImage(src: string) {
  let p = imageCache.get(src)
  if (!p) {
    p = new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
    imageCache.set(src, p)
  }
  return p
}

function drawPhoto(member: Member, theme: Theme, layer: Konva.Layer) {
  const cx = MEMBER_W / 2
  const cy = PHOTO_TOP + PHOTO_R
  const group = new Konva.Group({
    clipFunc: (ctx) => ctx.arc(cx, cy, PHOTO_R, 0, Math.PI * 2),
  })

  // 佔位：姓名第一個字；出缺顯示「缺」
  group.add(new Konva.Circle({ x: cx, y: cy, radius: PHOTO_R, fill: theme.neutral }))
  group.add(
    new Konva.Text({
      x: cx - PHOTO_R,
      y: cy - PHOTO_R,
      width: PHOTO_R * 2,
      height: PHOTO_R * 2,
      text: member.vacant ? '缺' : member.name.slice(0, 1),
      fontFamily: theme.font,
      fontSize: 36,
      fontStyle: 'bold',
      fill: theme.textSecondary,
      align: 'center',
      verticalAlign: 'middle',
    }),
  )

  if (member.photo) {
    loadImage(import.meta.env.BASE_URL + member.photo)
      .then((img) => {
        // 置中裁成正方形（object-fit: cover），人像偏上取景
        const side = Math.min(img.width, img.height)
        group.add(
          new Konva.Image({
            image: img,
            x: cx - PHOTO_R,
            y: cy - PHOTO_R,
            width: PHOTO_R * 2,
            height: PHOTO_R * 2,
            crop: {
              x: (img.width - side) / 2,
              y: img.height > img.width ? (img.height - side) * 0.2 : 0,
              width: side,
              height: side,
            },
          }),
        )
        layer.batchDraw()
      })
      .catch(() => console.warn(`[orgchart] 照片載入失敗：${member.photo}`))
  }
  return group
}

function drawMember(member: Member, theme: Theme, layer: Konva.Layer, onOpen: (m: Member) => void) {
  const g = new Konva.Group()
  g.add(drawPhoto(member, theme, layer))
  g.add(
    new Konva.Text({
      y: PHOTO_TOP + PHOTO_R * 2 + 12,
      width: MEMBER_W,
      text: member.name,
      fontFamily: theme.font,
      fontSize: 18,
      fontStyle: 'bold',
      fill: member.vacant ? theme.textSecondary : theme.text,
      align: 'center',
    }),
  )
  g.add(
    new Konva.Text({
      x: 8,
      y: PHOTO_TOP + PHOTO_R * 2 + 40,
      width: MEMBER_W - 16,
      text: member.title,
      fontFamily: theme.font,
      fontSize: 14,
      lineHeight: 1.3,
      fill: theme.textSecondary,
      align: 'center',
      wrap: 'char',
    }),
  )

  // 點擊區：整個成員範圍
  const hit = new Konva.Rect({ width: MEMBER_W, height: MEMBER_H, fill: 'transparent' })
  hit.on('mouseenter', () => (document.body.style.cursor = 'pointer'))
  hit.on('mouseleave', () => (document.body.style.cursor = ''))
  hit.on('click tap', () => onOpen(member))
  g.add(hit)
  return g
}

function drawUnit(box: UnitBox, theme: Theme, layer: Konva.Layer, onOpen: (m: Member) => void) {
  const g = new Konva.Group({ x: box.x, y: box.y })
  g.add(
    new Konva.Rect({
      width: box.w,
      height: box.h,
      cornerRadius: 8,
      fill: theme.surface,
      stroke: theme.border,
      strokeWidth: 1,
    }),
  )
  g.add(
    new Konva.Rect({
      width: box.w,
      height: HEADER_H,
      cornerRadius: [8, 8, 0, 0],
      fill: theme.brand,
    }),
  )
  g.add(
    new Konva.Text({
      x: 8,
      width: box.w - 16,
      height: HEADER_H,
      text: box.unit.name,
      fontFamily: theme.font,
      fontSize: box.unit.name.length > 10 ? 13 : 15,
      fontStyle: 'bold',
      fill: theme.onBrand,
      align: 'center',
      verticalAlign: 'middle',
      wrap: 'char',
    }),
  )
  if (!box.unit.members.length) {
    g.add(
      new Konva.Text({
        y: HEADER_H,
        width: box.w,
        height: box.h - HEADER_H,
        text: box.unit.note ?? '出缺',
        fontFamily: theme.font,
        fontSize: 16,
        fill: theme.textSecondary,
        align: 'center',
        verticalAlign: 'middle',
      }),
    )
  }
  box.unit.members.forEach((m, i) => {
    const mg = drawMember(m, theme, layer, onOpen)
    mg.position(memberPosition(i))
    g.add(mg)
  })
  return g
}

/** 畫整張圖到 layer；回傳背景範圍（含邊距），供縮放與匯出使用 */
export function drawChart(layout: Layout, theme: Theme, layer: Konva.Layer, onOpen: (m: Member) => void) {
  layer.destroyChildren()
  const { bounds } = layout
  const area = {
    x: bounds.x - MARGIN,
    y: bounds.y - MARGIN,
    width: bounds.w + MARGIN * 2,
    height: bounds.h + MARGIN * 2,
  }

  // 背景：匯出圖片時才有底色
  layer.add(new Konva.Rect({ ...area, fill: theme.canvas, listening: false }))

  for (const p of layout.panels) {
    layer.add(
      new Konva.Rect({
        x: p.x,
        y: p.y,
        width: p.w,
        height: p.h,
        cornerRadius: 12,
        fill: theme.neutral,
        listening: false,
      }),
    )
    layer.add(
      new Konva.Text({
        x: p.x + 24,
        y: p.y + 12,
        text: p.count > 1 ? `${p.group}（${p.count}）` : p.group,
        fontFamily: theme.font,
        fontSize: 16,
        fontStyle: 'bold',
        fill: theme.text,
        listening: false,
      }),
    )
  }

  for (const c of layout.containers) {
    layer.add(
      new Konva.Rect({
        x: c.x,
        y: c.y,
        width: c.w,
        height: c.h,
        cornerRadius: 8,
        stroke: theme.line,
        strokeWidth: 1,
        dash: [6, 4],
        listening: false,
      }),
    )
  }

  for (const points of layout.lines) {
    layer.add(new Konva.Line({ points, stroke: theme.line, strokeWidth: 2, listening: false }))
  }

  for (const box of layout.units) {
    layer.add(drawUnit(box, theme, layer, onOpen))
  }

  layer.batchDraw()
  return area
}
