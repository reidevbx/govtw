// 示範資料：分類名稱參考我的E政府網站架構，服務內容為虛構

export interface Category {
  slug: string
  group: 'life' | 'daily'
  name: string
  description: string
  tags: string[]
}

export const groups = {
  life: '人生大事',
  daily: '日常生活',
} as const

export const categories: Category[] = [
  { slug: 'birth', group: 'life', name: '出生', description: '出生登記、育兒津貼、托育補助。', tags: ['育兒津貼', '出生登記'] },
  { slug: 'school', group: 'life', name: '就學', description: '入學、學費補助、就學貸款。', tags: ['就學貸款'] },
  { slug: 'work', group: 'life', name: '就業', description: '求職、職業訓練、勞健保。', tags: ['職業訓練'] },
  { slug: 'care', group: 'life', name: '就養', description: '長期照顧、身心障礙福利。', tags: ['長照'] },
  { slug: 'end', group: 'life', name: '終老', description: '死亡登記、遺產與喪葬補助。', tags: ['喪葬補助'] },
  { slug: 'identity', group: 'daily', name: '婚姻與身分', description: '結婚登記、身分證、戶籍謄本。', tags: ['戶籍謄本', '身分證'] },
  { slug: 'travel', group: 'daily', name: '交通與旅遊', description: '駕照、護照、交通罰單。', tags: ['護照', '駕照'] },
  { slug: 'home', group: 'daily', name: '居住與環境', description: '租屋補貼、垃圾清運、水電。', tags: ['租屋補貼'] },
  { slug: 'tax', group: 'daily', name: '理財與納稅', description: '綜合所得稅、牌照稅、地價稅。', tags: ['綜所稅'] },
]
