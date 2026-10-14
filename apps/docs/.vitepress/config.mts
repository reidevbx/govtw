import { defineConfig } from 'vitepress'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const tokensCssPath = resolve(__dirname, '../../../packages/tokens/tokens.css')

function readTokensCss() {
  return readFileSync(tokensCssPath, 'utf-8')
}

function govtwTokensPlugin(): Plugin {
  return {
    name: 'govtw-tokens-hmr',
    configureServer(server) {
      server.watcher.add(tokensCssPath)
      server.watcher.on('change', (file) => {
        if (file === tokensCssPath) {
          server.restart()
        }
      })
    },
  }
}


export default defineConfig({
  lang: 'zh-TW',
  title: 'GOV.TW Design System',
  description: '為台灣政府數位服務打造的設計系統',

  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'GOV.TW Design System' }],
    ['meta', { property: 'og:description', content: '為台灣政府數位服務打造的設計系統' }],
    ['meta', { property: 'og:image', content: '/og-1200x630.jpg' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: '/og-1200x630.jpg' }],
  ],

  vite: {
    plugins: [govtwTokensPlugin()],
    resolve: {
      conditions: ['source'],
    },
    define: {
      __GOVTW_TOKENS_CSS__: JSON.stringify(readTokensCss()),
    },
  },

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('govtw-'),
      },
    },
  },

  themeConfig: {
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg' },
    siteTitle: false,

    nav: [
      { text: '快速開始', link: '/getting-started' },
      { text: '設計原則', link: '/principles/' },
      { text: '基礎', link: '/foundations/architecture' },
      { text: '元件', link: '/components/button' },
    ],

    sidebar: [
      {
        text: '快速開始',
        collapsed: false,
        items: [
          { text: '安裝與使用', link: '/getting-started' },
        ],
      },
      {
        text: '設計原則',
        collapsed: false,
        items: [
          { text: '總覽', link: '/principles/' },
          { text: '原則一：以使用者為中心', link: '/principles/people-first' },
          { text: '原則二：無障礙與包容性', link: '/principles/everyone-counts' },
          { text: '原則三：降低使用者負擔', link: '/principles/simplicity-is-designed' },
          { text: '原則四：一致性與可預期性', link: '/principles/trust-through-consistency' },
          { text: '原則五：資料驅動的持續改善', link: '/principles/keep-improving' },
          { text: '原則六：開放與協作', link: '/principles/work-in-the-open' },
        ],
      },
      {
        text: '服務標準',
        collapsed: false,
        items: [
          { text: '概述', link: '/standards/' },
        ],
      },
      {
        text: '基礎',
        collapsed: false,
        items: [
          { text: '系統架構', link: '/foundations/architecture' },
          { text: '色彩', link: '/foundations/colour' },
          { text: '排版', link: '/foundations/typography' },
          { text: '佈局', link: '/foundations/layout' },
          { text: '間距', link: '/foundations/spacing' },
        ],
      },
      {
        text: '元件',
        collapsed: false,
        items: [
          {
            text: '表單與操作',
            items: [
              // <form-start>
              { text: '按鈕 Button', link: '/components/button' },
              { text: '文字輸入 Text Input', link: '/components/text-input' },
              { text: '多行文字輸入 Textarea', link: '/components/textarea' },
              { text: '密碼輸入 Password Input', link: '/components/password-input' },
              { text: '一次性驗證碼 OTP Input', link: '/components/otp-input' },
              { text: '日期輸入 Date Input', link: '/components/date-input' },
              { text: '選擇清單 Select', link: '/components/select' },
              { text: '核取方塊 Checkbox', link: '/components/checkbox' },
              { text: '單選按鈕 Radio', link: '/components/radio' },
              { text: '欄位群組 Fieldset', link: '/components/fieldset' },
              { text: '檔案上傳 File Upload', link: '/components/file-upload' },
              { text: '圖形驗證碼 Captcha', link: '/components/captcha' },
              // <form-end>
            ],
          },
          {
            text: '導覽',
            items: [
              // <navigation-start>
              { text: '連結 Link', link: '/components/link' },
              { text: '返回連結 Back Link', link: '/components/back-link' },
              { text: '麵包屑 Breadcrumbs', link: '/components/breadcrumbs' },
              { text: '分頁 Pagination', link: '/components/pagination' },
              { text: '搜尋框 Search', link: '/components/search' },
              { text: '主選單 Service Navigation', link: '/components/service-navigation' },
              { text: '側邊選單 Side Navigation', link: '/components/side-navigation' },
              { text: '頁內目錄 Contents List', link: '/components/contents-list' },
              // <navigation-end>
            ],
          },
          {
            text: '內容呈現',
            items: [
              // <content-start>
              { text: '補充說明 Inset Text', link: '/components/inset-text' },
              { text: '警告文字 Warning Text', link: '/components/warning-text' },
              { text: '可展開說明 Details', link: '/components/details' },
              { text: '手風琴 Accordion', link: '/components/accordion' },
              { text: '頁籤 Tabs', link: '/components/tabs' },
              { text: '標籤 Tag', link: '/components/tag' },
              { text: '表格 Table', link: '/components/table' },
              { text: '摘要清單 Summary List', link: '/components/summary-list' },
              { text: '卡片 Card', link: '/components/card' },
              { text: '文件列表 Document List', link: '/components/document-list' },
              { text: '附件下載 Attachment', link: '/components/attachment' },
              // <content-end>
            ],
          },
          {
            text: '訊息與狀態',
            items: [
              // <feedback-start>
              { text: '錯誤摘要 Error Summary', link: '/components/error-summary' },
              { text: '通知橫幅 Notification Banner', link: '/components/notification-banner' },
              { text: '完成面板 Panel', link: '/components/panel' },
              { text: '步驟指示 Step Indicator', link: '/components/step-indicator' },
              // <feedback-end>
            ],
          },
          {
            text: '頁面框架',
            items: [
              // <page-start>
              { text: '頁首 Header', link: '/components/header' },
              { text: '頁尾 Footer', link: '/components/footer' },
              { text: '跳至主要內容 Skip Link', link: '/components/skip-link' },
              { text: '導盲磚 Accesskey', link: '/components/accesskey' },
              { text: '頁面工具列 Page Tools', link: '/components/page-tools' },
              { text: '字級切換 Font Size Switcher', link: '/components/font-size-switcher' },
              // <page-end>
            ],
          },
        ],
      },
      {
        text: '佈局元件',
        collapsed: false,
        items: [
          // <layout-start>
          { text: '頁面容器 Container', link: '/components/container' },
          { text: '垂直堆疊 Stack', link: '/components/stack' },
          { text: '側邊欄佈局 Sidebar', link: '/components/sidebar' },
          { text: '水平排列 Cluster', link: '/components/cluster' },
          // <layout-end>
        ],
      },
      {
        text: '模式',
        collapsed: false,
        items: [
          { text: '概述', link: '/patterns/' },
          {
            text: '協助使用者',
            items: [
              { text: '表單錯誤處理', link: '/patterns/validation' },
              { text: '確認手機號碼', link: '/patterns/confirm-phone-number' },
              { text: '登入', link: '/patterns/sign-in' },
            ],
          },
          {
            text: '頁面',
            items: [
              { text: '多步驟表單', link: '/patterns/multi-step-form' },
              { text: '完成頁', link: '/patterns/confirmation-page' },
              { text: '搜尋結果頁', link: '/patterns/search-results' },
              { text: '長篇內容頁', link: '/patterns/content-page' },
            ],
          },
        ],
      },
      {
        text: '資源',
        collapsed: false,
        items: [
          { text: '部會 Logo', link: '/resources/ministry-logos' },
        ],
      },
      {
        text: '治理',
        collapsed: false,
        items: [
          { text: '概述', link: '/governance/' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/reidevbx/govtw' },
    ],

    search: {
      provider: 'local',
    },

    outline: {
      label: '本頁內容',
    },

    docFooter: {
      prev: '上一頁',
      next: '下一頁',
    },

    darkModeSwitchLabel: '佈景主題',
    sidebarMenuLabel: '選單',
    returnToTopLabel: '回到頂部',
  },
})
