# 新增 手風琴 Accordion 元件（`govtw-accordion`）

- **優先度**：P1
- **參考**：[GOV.UK Accordion](https://design-system.service.gov.uk/components/accordion/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 數位發展部：https://moda.gov.tw/press/clarification/378 — Bootstrap accordion，每題有「複製連結」，錨點 `#qaH20718`
- 勞保局：https://www.bli.gov.tw/0100603.html — 三層巢狀；開關是 `<a href="javascript:void(0)">`，沒有 `aria-expanded`
- 高雄市政府：https://www.kcg.gov.tw/DownloadForms.aspx?n=460A00BC234B1923 — 8 個分類，開關文字「點擊開啟」

### 現況問題

- 開關不是 `<button>`
- 沒有 `aria-expanded`
- 開關文字沒有描述性

## 需求定義

- 每段標題是 `<button aria-expanded>`
- 「全部展開／全部收合」按鈕
- 支援 URL hash 直接展開指定段落（單題深連結）
- 子元件 API：`<govtw-accordion-section heading="...">`
- 不支援巢狀（文件說明改用分類頁）

### 無障礙

- WCAG 2.2 AA 為最低標準
- 標題按鈕包在 `<h2>`–`<h4>` 內，層級可設定
- 收合內容使用 `hidden="until-found"` 讓瀏覽器搜尋能找到

### 待確認（動手前需決定）

1. 「複製連結」按鈕要不要內建？

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component accordion --type=basic --zh-name=手風琴`
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-accordion-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-accordion.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/accordion.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-accordion.ts`、`apps/docs/components/accordion.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `details`
- `tabs`
