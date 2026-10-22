import type { Group, Unit } from './types'

/** 每個 parts/*.json 由不同批次收集，這裡合併成一份 */
const parts = import.meta.glob<{ asOf?: string; units: Unit[] }>('./data/parts/*.json', {
  eager: true,
  import: 'default',
})

export const units: Unit[] = Object.values(parts).flatMap((p) => p.units)

export const asOf: string =
  Object.values(parts).find((p) => p.asOf)?.asOf ?? ''

export const GROUP_ORDER: Group[] = ['行政院本部', '部', '委員會', '其他機關', '獨立機關']

/** 五院排列順序（憲法順序） */
export const YUAN_ORDER = ['ey', 'ly', 'jy', 'exam', 'cy']

export const ROOT_ID = 'president-office'
export const EXECUTIVE_ID = 'ey'
