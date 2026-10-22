import type { PageGroup } from '../types'
import { news } from './data/news'

export const pageGroups: PageGroup[] = [
  { type: '首頁', pages: [{ label: '首頁', href: '/ey/' }] },
  { type: '列表頁', pages: [{ label: '新聞與公告', href: '/ey/news/' }] },
  { type: '新聞內頁', pages: news.map((n) => ({ label: n.title, href: `/ey/news/${n.id}/` })) },
  { type: '內容頁', pages: [{ label: '關於本院', href: '/ey/about/' }] },
]
