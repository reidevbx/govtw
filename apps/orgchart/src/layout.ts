import { EXECUTIVE_ID, GROUP_ORDER, ROOT_ID, YUAN_ORDER } from './data'
import type { Group, Unit } from './types'

/** 卡片尺寸（canvas 座標，單位 px） */
export const MEMBER_W = 160
export const MEMBER_H = 200
export const UNIT_PAD = 12
export const HEADER_H = 44

const ROW_GAP = 80
const YUAN_GAP = 32
const CELL_GAP = 16
const PANEL_PAD = 24
const PANEL_LABEL_H = 40
const PANEL_GAP = 40
/** 面板內卡片超過這個寬度就換列 */
const PANEL_INNER_MAX = 2400
/** 單位卡片內成員超過這個數量就換列 */
const MEMBER_COLS = 6
/** 行政院往下的主幹線與面板左緣的距離 */
const TRUNK_OFFSET = 36

export interface Box {
  x: number
  y: number
  w: number
  h: number
}

export interface UnitBox extends Box {
  unit: Unit
}

export interface PanelBox extends Box {
  group: Group
  count: number
}

export interface Layout {
  units: UnitBox[]
  panels: PanelBox[]
  /** 連線，每條是 Konva.Line 的 points */
  lines: number[][]
  bounds: Box
}

function unitSize(unit: Unit) {
  const n = Math.max(unit.members.length, 1)
  const cols = Math.min(n, MEMBER_COLS)
  const rows = Math.ceil(n / cols)
  return { w: cols * MEMBER_W + UNIT_PAD * 2, h: HEADER_H + rows * MEMBER_H + UNIT_PAD }
}

/** 第 i 位成員在單位卡片內的位置 */
export function memberPosition(i: number) {
  return {
    x: UNIT_PAD + (i % MEMBER_COLS) * MEMBER_W,
    y: HEADER_H + Math.floor(i / MEMBER_COLS) * MEMBER_H,
  }
}

/** 一列置中排列，回傳每個 box */
function row(list: Unit[], y: number, gap: number): UnitBox[] {
  const sizes = list.map(unitSize)
  const total = sizes.reduce((s, b) => s + b.w, 0) + gap * (list.length - 1)
  let x = -total / 2
  return list.map((unit, i) => {
    const box = { unit, x, y, ...sizes[i] }
    x += sizes[i].w + gap
    return box
  })
}

const bottomCenter = (b: Box) => [b.x + b.w / 2, b.y + b.h] as const
const topCenter = (b: Box) => [b.x + b.w / 2, b.y] as const

export function computeLayout(all: Unit[]): Layout {
  const units: UnitBox[] = []
  const panels: PanelBox[] = []
  const lines: number[][] = []

  // 第一列：總統府
  const root = all.find((u) => u.id === ROOT_ID)
  const rootBoxes = root ? row([root], 0, 0) : []
  units.push(...rootBoxes)
  const rootBox = rootBoxes[0]

  // 第二列：五院
  const yuanY = rootBox ? rootBox.y + rootBox.h + ROW_GAP : 0
  const yuans = YUAN_ORDER.map((id) => all.find((u) => u.id === id)).filter((u): u is Unit => !!u)
  const yuanBoxes = row(yuans, yuanY, YUAN_GAP)
  units.push(...yuanBoxes)

  if (rootBox && yuanBoxes.length) {
    const [rx, rb] = bottomCenter(rootBox)
    const busY = rb + ROW_GAP / 2
    const xs = yuanBoxes.map((b) => topCenter(b)[0])
    lines.push([rx, rb, rx, busY])
    lines.push([Math.min(...xs, rx), busY, Math.max(...xs, rx), busY])
    for (const b of yuanBoxes) {
      const [x, y] = topCenter(b)
      lines.push([x, busY, x, y])
    }
  }

  // 第三區：行政院所屬機關，依類別分面板，由上往下排
  const eyBox = yuanBoxes.find((b) => b.unit.id === EXECUTIVE_ID)
  const children = all.filter((u) => u.parent === EXECUTIVE_ID)
  const groups = new Map<Group, Unit[]>()
  for (const u of children) {
    const g = u.group ?? '其他機關'
    groups.set(g, [...(groups.get(g) ?? []), u])
  }

  let panelY = (yuanBoxes[0] ? yuanBoxes[0].y + yuanBoxes[0].h : yuanY) + ROW_GAP
  const trunkX = eyBox ? eyBox.x + eyBox.w / 2 : 0
  let lastStubY = 0

  for (const group of GROUP_ORDER) {
    const list = groups.get(group)
    if (!list?.length) continue

    // 面板放在主幹線右側；主幹線在行政院正下方
    const x = trunkX + TRUNK_OFFSET
    const left = x + PANEL_PAD
    // 卡片寬度不一，由左往右排，超過 PANEL_INNER_MAX 換列；列高取該列最高
    let cx = left
    let cy = panelY + PANEL_LABEL_H
    let rowH = 0
    let innerW = 0
    for (const unit of list) {
      const size = unitSize(unit)
      if (cx > left && cx - left + size.w > PANEL_INNER_MAX) {
        cx = left
        cy += rowH + CELL_GAP
        rowH = 0
      }
      units.push({ unit, x: cx, y: cy, ...size })
      cx += size.w + CELL_GAP
      rowH = Math.max(rowH, size.h)
      innerW = Math.max(innerW, cx - CELL_GAP - left)
    }
    const w = innerW + PANEL_PAD * 2
    const h = cy + rowH + PANEL_PAD - panelY
    panels.push({ group, count: list.length, x, y: panelY, w, h })

    lastStubY = panelY + PANEL_LABEL_H / 2
    lines.push([trunkX, lastStubY, x, lastStubY])
    panelY += h + PANEL_GAP
  }

  if (eyBox && panels.length) {
    const [, eb] = bottomCenter(eyBox)
    lines.push([trunkX, eb, trunkX, lastStubY])
  }

  const boxes: Box[] = [...units, ...panels]
  const minX = Math.min(...boxes.map((b) => b.x))
  const minY = Math.min(...boxes.map((b) => b.y))
  const maxX = Math.max(...boxes.map((b) => b.x + b.w))
  const maxY = Math.max(...boxes.map((b) => b.y + b.h))

  return { units, panels, lines, bounds: { x: minX, y: minY, w: maxX - minX, h: maxY - minY } }
}
