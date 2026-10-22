export type Group = '行政院本部' | '部' | '委員會' | '其他機關' | '獨立機關'

export interface Member {
  id: string
  name: string
  title: string
  /** 相對於 public 的路徑；沒有照片為 null */
  photo: string | null
  photoSource: string | null
  /** 首長介紹頁網址 */
  source: string
  /** 職位出缺：name 為「出缺」，不計入人數 */
  vacant?: boolean
}

export interface Unit {
  id: string
  name: string
  parent: string | null
  group: Group | null
  /** 機關官網；查不到為 null */
  url: string | null
  members: Member[]
  /** members 為空時顯示的說明，預設「出缺」 */
  note?: string
}
