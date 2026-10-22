import type { SiteConfig } from '../types'

export const site: SiteConfig = {
  base: '/egov',
  name: '我的E政府',
  origin: 'https://www.gov.tw/',
  serviceName: '設計示範',
  nav: [
    { key: 'home', href: '/egov/', label: '首頁' },
    { key: 'life', href: '/egov/category/birth/', label: '人生大事' },
    { key: 'daily', href: '/egov/category/identity/', label: '日常生活' },
    { key: 'news', href: '/egov/news/', label: '資訊快遞' },
  ],
  searchAction: '/egov/',
  footer: {
    contact: '客服中心（示範）｜服務時間：週一至週五 08:30–18:00（例假日除外）｜電話與信箱為示範資料',
    links: [
      { href: '/egov/', label: '意見信箱' },
      { href: '/egov/', label: '資訊安全政策' },
      { href: '/egov/', label: '隱私權政策' },
    ],
    updated: '2026-10-22',
  },
}
