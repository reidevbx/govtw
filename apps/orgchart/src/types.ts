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
}

export interface Unit {
  id: string
  name: string
  parent: string | null
  group: Group | null
  url: string
  members: Member[]
}
