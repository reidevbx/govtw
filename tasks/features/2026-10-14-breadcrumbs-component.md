# 新增 麵包屑 Breadcrumbs 元件（`govtw-breadcrumbs`）

- **優先度**：P0
- **參考**：[GOV.UK Breadcrumbs](https://design-system.service.gov.uk/components/breadcrumbs/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 全國政府入口網 gov.tw：https://www.gov.tw/News_LifeEvent_8 — 有 `nav aria-label`；但 News_Content_2 只是一般 `ul`
- 內政部戶政司：https://www.ris.gov.tw/ — 有 `aria-current="page"`；手機版用「·····」收合中間層
- 內政部：https://www.moi.gov.tw/cl.aspx?n=37 — 目前頁是純文字
- 勞保局：https://www.bli.gov.tw/0100603.html — `ul.breadcrumb` 加 schema.org，沒包 nav
- 監理服務網：https://www.mvdis.gov.tw/m3-emv-vil/vil/penaltyQueryPay — 純文字連結，`&#8250;` 分隔
- 臺北市政府：https://www.gov.taipei/ — FAQ 內頁完全沒有麵包屑

### 現況問題

- 同一站內有的頁有 `nav`、有的沒有（gov.tw）
- 多數沒有 `aria-current="page"`
- 路徑常有 3 到 4 層，中間層是不能點的分類名

## 需求定義

- 子元素用 `<a>` 傳入，最後一項為目前頁
- 自動包 `<nav aria-label="麵包屑">` 與 `<ol>`
- 最後一項自動加 `aria-current="page"`
- 分隔符號用 CSS 產生，不讓螢幕閱讀器讀出
- 窄螢幕行為：換行或收合，需決定

### 無障礙

- WCAG 2.2 AA 為最低標準
- 分隔符號 `aria-hidden`
- 收合按鈕（若有）必須是 `<button>`

### 待確認（動手前需決定）

1. 窄螢幕採「換行」還是「收合中間層」？GOV.UK 用換行加 `collapse-on-mobile` 只留上一層

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [x] 決定「待確認」各項
- [x] `pnpm new:component breadcrumbs --type=basic --zh-name=麵包屑`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-breadcrumbs-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-breadcrumbs.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/breadcrumbs.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-breadcrumbs.ts`、`apps/docs/components/breadcrumbs.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `back-link`
- `side-navigation`

## 總結

### 完成項目

- ✅ 依 [P0 決定表](./2026-10-14-p0-decisions.md) A1、A2、B1、B2 實作
- ✅ `govtw-breadcrumbs`：light DOM，作者寫 `<a>`／`<span>`，元件包成 `<nav aria-label><ol><li>`，最後一項加 `aria-current="page"`
- ✅ 分隔符號為 CSS 箭頭，窄螢幕換行
- ✅ 新增共用 `internal/light-dom.ts`：`adoptStyles`、`takeChildElements`、`whenParsed`；accesskey 改用 `adoptStyles`
- ✅ docs 頁（`default`、`wrap` 兩個 preview）

### 實作時發現的問題

- 元件 script 在 `<head>` 同步載入時（preview 頁就是這樣），`connectedCallback` 會在子元素解析前觸發。以 `whenParsed` 等 `DOMContentLoaded` 後再取子元素

### 驗證

- `pnpm build`、`pnpm check:components`（17 個）、`pnpm lint`、`tsc --noEmit` 通過
- 未在瀏覽器實測

### 變更檔案

- `packages/web-components/src/govtw-breadcrumbs.ts`、`internal/light-dom.ts` — 新增
- `packages/web-components/src/govtw-accesskey.ts` — 改用共用 `adoptStyles`
- `apps/docs/components/breadcrumbs.md`、preview 2 份 — 新增
- `packages/tokens/tokens.json` — 新增 breadcrumbs、search、service-navigation、header、footer 五組 token（一次加齊）
