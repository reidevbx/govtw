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
/** 單位卡片內成員超過這個數量就換列 */
const MEMBER_COLS = 6
/** 子單位框：與上方卡片的距離、內距 */
const SUB_GAP = 24
const SUB_PAD = 16
/** 全圖目標寬高比 */
const TARGET_RATIO = 16 / 9

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
  /** 子單位外框（三級機關、大法官等） */
  containers: Box[]
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

/** 一個單位連同其子單位，座標相對於區塊左上角 */
interface Block {
  w: number
  h: number
  /** 單位卡片本身（連線接在它的上緣中點） */
  card: Box
  units: UnitBox[]
  containers: Box[]
  lines: number[][]
}

const shift = (points: number[], dx: number, dy: number) =>
  points.map((v, i) => (i % 2 ? v + dy : v + dx))

function translate(b: Block, dx: number, dy: number): Block {
  return {
    ...b,
    card: { ...b.card, x: b.card.x + dx, y: b.card.y + dy },
    units: b.units.map((u) => ({ ...u, x: u.x + dx, y: u.y + dy })),
    containers: b.containers.map((c) => ({ ...c, x: c.x + dx, y: c.y + dy })),
    lines: b.lines.map((l) => shift(l, dx, dy)),
  }
}

/** 區塊分成 cols 欄，依序放進目前最矮的一欄；欄寬取該欄最寬的區塊 */
function masonry(blocks: Block[], cols: number, gap: number) {
  const k = Math.max(1, Math.min(cols, blocks.length))
  const items: Block[][] = Array.from({ length: k }, () => [])
  const heights: number[] = new Array(k).fill(0)
  for (const b of blocks) {
    const i = heights.indexOf(Math.min(...heights))
    heights[i] += (items[i].length ? gap : 0) + b.h
    items[i].push(b)
  }
  const placed: Block[] = []
  let x = 0
  for (const col of items) {
    let y = 0
    for (const b of col) {
      placed.push(translate(b, x, y))
      y += b.h + gap
    }
    x += Math.max(...col.map((b) => b.w)) + gap
  }
  return { placed, w: x - gap, h: Math.max(...heights) }
}

/** 子單位：parent 指向它、不屬於行政院分類面板（group 為 null），也不是五院（五院另排一列） */
function block(unit: Unit, all: Unit[]): Block {
  const size = unitSize(unit)
  const card = { x: 0, y: 0, ...size }
  const kids = all.filter(
    (u) => u.parent === unit.id && u.group === null && !YUAN_ORDER.includes(u.id),
  )
  if (!kids.length) {
    return { ...size, card, units: [{ unit, ...card }], containers: [], lines: [] }
  }

  // 子單位欄數由 1 往上加，直到框高不超過框寬
  const kidBlocks = kids.map((k) => block(k, all))
  let grid = masonry(kidBlocks, 1, CELL_GAP)
  for (let k = 2; k <= kidBlocks.length && grid.h > grid.w; k++) {
    grid = masonry(kidBlocks, k, CELL_GAP)
  }
  const cont = { w: grid.w + SUB_PAD * 2, h: grid.h + SUB_PAD * 2 }
  const w = Math.max(size.w, cont.w)
  const cardX = (w - size.w) / 2
  const contBox = { x: (w - cont.w) / 2, y: size.h + SUB_GAP, ...cont }
  const cx = w / 2

  const inner = grid.placed.map((b) => translate(b, contBox.x + SUB_PAD, contBox.y + SUB_PAD))
  return {
    w,
    h: contBox.y + cont.h,
    card: { ...card, x: cardX },
    units: [{ unit, ...card, x: cardX }, ...inner.flatMap((b) => b.units)],
    containers: [contBox, ...inner.flatMap((b) => b.containers)],
    lines: [[cx, size.h, cx, contBox.y], ...inner.flatMap((b) => b.lines)],
  }
}

const bottomCenter = (b: Box) => [b.x + b.w / 2, b.y + b.h] as const
const topCenter = (b: Box) => [b.x + b.w / 2, b.y] as const

export function computeLayout(all: Unit[]): Layout {
  const units: UnitBox[] = []
  const panels: PanelBox[] = []
  const containers: Box[] = []
  const lines: number[][] = []
  const add = (b: Block) => {
    units.push(...b.units)
    containers.push(...b.containers)
    lines.push(...b.lines)
  }

  // 第一列：總統府
  const root = all.find((u) => u.id === ROOT_ID)
  const rootBlock = root ? block(root, all) : null
  if (rootBlock) add(translate(rootBlock, -rootBlock.w / 2, 0))
  const rootCard = rootBlock && { ...rootBlock.card, x: rootBlock.card.x - rootBlock.w / 2 }

  // 第二列：五院（含院內成員等子單位），一列置中
  const yuanY = rootBlock ? rootBlock.h + ROW_GAP : 0
  const yuans = YUAN_ORDER.map((id) => all.find((u) => u.id === id)).filter((u): u is Unit => !!u)
  const yuanBlocks = yuans.map((u) => block(u, all))
  const total = yuanBlocks.reduce((s, b) => s + b.w, 0) + YUAN_GAP * (yuanBlocks.length - 1)
  let x = -total / 2
  const yuanPlaced = yuanBlocks.map((b) => {
    const placed = translate(b, x, yuanY)
    x += b.w + YUAN_GAP
    add(placed)
    return placed
  })

  if (rootCard && yuanPlaced.length) {
    const [rx, rb] = bottomCenter(rootCard)
    const busY = yuanY - ROW_GAP / 2
    const xs = yuanPlaced.map((b) => topCenter(b.card)[0])
    lines.push([rx, rb, rx, busY])
    lines.push([Math.min(...xs, rx), busY, Math.max(...xs, rx), busY])
    for (const b of yuanPlaced) {
      const [cx, cy] = topCenter(b.card)
      lines.push([cx, busY, cx, cy])
    }
  }

  // 第三區：行政院所屬機關，依類別分面板，面板左右並排；面板內可分多欄
  const eyCard = yuanPlaced.find((b) => b.units[0].unit.id === EXECUTIVE_ID)?.card
  const groups = new Map<Group, Unit[]>()
  for (const u of all) {
    if (u.parent !== EXECUTIVE_ID || !u.group) continue
    groups.set(u.group, [...(groups.get(u.group) ?? []), u])
  }

  const panelY = yuanY + Math.max(0, ...yuanPlaced.map((b) => b.h)) + ROW_GAP
  const panelSets = GROUP_ORDER.flatMap((group) => {
    const list = groups.get(group)
    if (!list?.length) return []
    const blocks = list.map((u) => block(u, all))
    // 每種欄數的排法，欄數由少到多
    const options = blocks.map((_, i) => masonry(blocks, i + 1, CELL_GAP))
    return [{ group, count: list.length, options }]
  })

  // 以各面板可能的高度為上限逐一試算，每個面板取符合上限的最少欄數，選全圖最接近 16:9 的組合
  const topW = Math.max(rootBlock?.w ?? 0, total)
  const limits = [...new Set(panelSets.flatMap((p) => p.options.map((o) => o.h)))]
  let chosen = panelSets.map((p) => p.options[0])
  let bestScore = Infinity
  for (const limit of limits) {
    const pick = panelSets.map((p) => p.options.find((o) => o.h <= limit) ?? p.options[p.options.length - 1])
    const w = pick.reduce((s, o) => s + o.w + PANEL_PAD * 2, 0) + PANEL_GAP * (pick.length - 1)
    const h = panelY + PANEL_LABEL_H + Math.max(...pick.map((o) => o.h)) + PANEL_PAD
    const score = Math.abs(Math.log(Math.max(w, topW) / h / TARGET_RATIO))
    if (score < bestScore) {
      bestScore = score
      chosen = pick
    }
  }

  const panelsW = chosen.reduce((s, o) => s + o.w + PANEL_PAD * 2, 0) + PANEL_GAP * (chosen.length - 1)
  let px = -panelsW / 2
  panelSets.forEach((p, i) => {
    const grid = chosen[i]
    for (const b of grid.placed) add(translate(b, px + PANEL_PAD, panelY + PANEL_LABEL_H))
    const w = grid.w + PANEL_PAD * 2
    const h = PANEL_LABEL_H + grid.h + PANEL_PAD
    panels.push({ group: p.group, count: p.count, x: px, y: panelY, w, h })
    px += w + PANEL_GAP
  })

  if (eyCard && panels.length) {
    const [ex, eb] = bottomCenter(eyCard)
    const busY = panelY - ROW_GAP / 2
    const xs = panels.map((p) => topCenter(p)[0])
    lines.push([ex, eb, ex, busY])
    lines.push([Math.min(...xs, ex), busY, Math.max(...xs, ex), busY])
    for (const p of panels) {
      const [x, y] = topCenter(p)
      lines.push([x, busY, x, y])
    }
  }

  const boxes: Box[] = [...units, ...panels, ...containers]
  const minX = Math.min(...boxes.map((b) => b.x))
  const minY = Math.min(...boxes.map((b) => b.y))
  const maxX = Math.max(...boxes.map((b) => b.x + b.w))
  const maxY = Math.max(...boxes.map((b) => b.y + b.h))

  return { units, panels, containers, lines, bounds: { x: minX, y: minY, w: maxX - minX, h: maxY - minY } }
}
