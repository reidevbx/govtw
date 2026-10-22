import type { SiteConfig } from '../types'

export const site: SiteConfig = {
  base: '/ey',
  name: '行政院',
  origin: 'https://www.ey.gov.tw/',
  serviceName: '設計示範',
  nav: [
    { key: 'home', href: '/ey/', label: '首頁' },
    { key: 'news', href: '/ey/news/', label: '新聞與公告' },
    { key: 'about', href: '/ey/about/', label: '關於本院' },
  ],
  searchAction: '/ey/news/',
  footer: {
    contact: '行政院（示範）｜地址與電話為示範資料',
    links: [
      { href: '/ey/about/', label: '隱私權政策' },
      { href: '/ey/about/', label: '資訊安全政策' },
      { href: '/ey/about/', label: '政府網站資料開放宣告' },
    ],
    updated: '2026-10-22',
  },
}
