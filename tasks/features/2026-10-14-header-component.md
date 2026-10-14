# 新增 頁首 Header 元件（`govtw-header`）

- **優先度**：P0
- **參考**：[GOV.UK Header](https://design-system.service.gov.uk/components/header/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 全國政府入口網 gov.tw：https://www.gov.tw/ — logo 包在 h1、上方連結、手機選單
- 數位發展部：https://moda.gov.tw/ — logo h1 視覺隱藏、offcanvas 選單、深淺色 logo、深色模式切換
- 臺北市政府：https://www.gov.taipei/ — English、網站導覽、分享、字級、ADHD 友善介面、大型游標、注音
- 高雄市政府：https://www.kcg.gov.tw/ — ENGLISH、雙語詞彙、市長信箱、登入
- 監理服務網：https://www.mvdis.gov.tw/ — `table.mm_table` 排版；**沒有 viewport meta**

### 現況問題

- 桌機版、手機版各輸出一次 DOM（臺北、高雄）
- 標題階層錯誤：gov.tw logo 是 h1，頁面標題變 h2
- 工具列塞滿十多個項目

## 需求定義

- slot：`logo`、`service-name`、`tools`（工具列）、`navigation`
- 單一 DOM 做響應式，不重複輸出
- logo 不放 h1；頁面標題 h1 留給主內容
- 工具列建議項目：語言切換、字級切換、深色模式切換、網站導覽、搜尋
- 語言切換、深色模式切換先以 slot 內放 `govtw-link` / `govtw-button` 實作，不另做元件

### 無障礙

- WCAG 2.2 AA 為最低標準
- 使用 `<header>` 地標，頁面只能有一個 banner
- 手機選單開關用原生 `<button>` 加 `aria-expanded`

### 待確認（動手前需決定）

1. 工具列要不要限制項目數量？建議在設計指引寫「最多 5 項」
2. 「ADHD 友善介面、大型游標」是否納入（建議不納入，屬瀏覽器或作業系統功能）

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component header --type=layout --zh-name=頁首`
- [ ] 補 `packages/web-components/vite.config.ts` entry（scaffolder 已知缺漏）
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-header-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-header.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/header.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-header.ts`、`apps/docs/components/header.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `service-navigation`
- `search`
- `font-size-switcher`
- `skip-link`
- `accesskey`
