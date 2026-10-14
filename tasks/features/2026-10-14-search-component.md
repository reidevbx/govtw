# 新增 搜尋框 Search 元件（`govtw-search`）

- **優先度**：P0
- **參考**：GOV.UK 無對應元件（台灣自訂）
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 全國政府入口網 gov.tw：https://www.gov.tw/ — select「全站搜／找服務」+ input + `<a role="button">` 送出；熱門關鍵字
- 數位發展部：https://moda.gov.tw/ — 全螢幕覆蓋式搜尋，含熱門標籤
- 內政部：https://www.moi.gov.tw/ — 兩個 `id="tbx_advancedSearchBtn"`
- 財政部稅務入口網：https://www.etax.nat.gov.tw/ — 送出按鈕沒有可及名稱
- 高雄市政府：https://www.kcg.gov.tw/ — 英文「Search:」標籤沒綁輸入框；熱門搜尋約 100 個

### 現況問題

- 輸入框只有 placeholder，沒有 label
- 送出鈕不是原生 `<button>`，或沒有名稱
- 熱門關鍵字數量過多（高雄約 100 個）

## 需求定義

- `<form role="search">` 內含 `<input type="search">` 與 `<button type="submit">`
- label 必填，可視覺隱藏
- 屬性：`action`、`name`（預設 `q`）、`label`、`placeholder`
- 熱門關鍵字以 slot 傳入，文件建議最多 8 個

### 無障礙

- WCAG 2.2 AA 為最低標準
- `role="search"` 地標
- 送出按鈕的可及名稱固定為「搜尋」

### 待確認（動手前需決定）

1. 是否支援「搜尋範圍」select（gov.tw 的全站／找服務）

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component search --type=form --zh-name=搜尋框`
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-search-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-search.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/search.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-search.ts`、`apps/docs/components/search.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `header`
- `tag`
