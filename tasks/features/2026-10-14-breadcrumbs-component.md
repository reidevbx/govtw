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

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component breadcrumbs --type=basic --zh-name=麵包屑`
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-breadcrumbs-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-breadcrumbs.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/breadcrumbs.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-breadcrumbs.ts`、`apps/docs/components/breadcrumbs.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `back-link`
- `side-navigation`
