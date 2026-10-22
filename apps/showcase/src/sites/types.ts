// 每個示範網站的設定，由 src/layouts/Site.astro 讀取

export interface NavItem {
  key: string
  href: string
  label: string
}

/** 總覽頁列出的重構頁面，依頁面類型分組 */
export interface PageGroup {
  type: string
  pages: { label: string; href: string }[]
}

export interface SiteConfig {
  /** 網址前綴，如 '/ey' */
  base: string
  /** 機關名稱，用於 logo 文字與 <title> */
  name: string
  /** 原站網址，總覽頁對照用 */
  origin: string
  /** header 的服務名稱 */
  serviceName: string
  nav: NavItem[]
  searchAction: string
  footer: {
    contact: string
    links: { href: string; label: string }[]
    updated: string
  }
}
