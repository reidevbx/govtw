import type { PageGroup } from '../types'
import { categories } from './data/categories'
import { services } from './data/services'

export const pageGroups: PageGroup[] = [
  { type: '首頁', pages: [{ label: '首頁', href: '/egov/' }] },
  { type: '分類頁', pages: categories.map((c) => ({ label: c.name, href: `/egov/category/${c.slug}/` })) },
  { type: '服務說明頁', pages: services.map((s) => ({ label: s.name, href: `/egov/services/${s.id}/` })) },
  { type: '列表頁', pages: [{ label: '資訊快遞', href: '/egov/news/' }] },
]
