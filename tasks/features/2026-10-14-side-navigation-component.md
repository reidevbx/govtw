# 新增 側邊選單 Side Navigation 元件（`govtw-side-navigation`）

- **優先度**：P2
- **參考**：GOV.UK 無對應元件（台灣自訂）
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 臺北市政府：https://www.gov.taipei/Content_List.aspx?n=C9049AA756058F1A — 左側可收合分類樹
- 高雄市政府：https://www.kcg.gov.tw/ — 所有內頁左側子選單
- 內政部戶政司：https://www.ris.gov.tw/ — Bootstrap accordion 左側選單

### 現況問題

- 和主選單重複輸出
- 收合開關不是 `<button>`

## 需求定義

- 垂直連結清單，最多兩層
- 目前頁 `aria-current="page"`
- 搭配 `govtw-sidebar` 佈局使用

### 無障礙

- WCAG 2.2 AA 為最低標準
- `<nav aria-label="本單元選單">`
- 第二層收合用 `<button aria-expanded>`

### 待確認（動手前需決定）

1. 是否支援收合？建議第一版只顯示目前分支

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [x] 決定「待確認」各項
- [x] `pnpm new:component side-navigation --type=basic --zh-name=側邊選單`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-side-navigation-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-side-navigation.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/side-navigation.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-side-navigation.ts`、`apps/docs/components/side-navigation.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `service-navigation`
- `breadcrumbs`

## 總結

依 [P2 決定表](./2026-10-14-p2-decisions.md) SN1–SN3 完成。

### 完成項目

- 不收合；文件建議作者只展開目前分支（SN1）
- 作者在 `<a>` 加 `aria-current="page"`，元件以左側粗線加粗體標示（SN2）
- 以 light DOM 包上 `<nav aria-label>`，`label` 預設「本單元選單」（SN3）
- 每個項目高度至少 44px

### 變更檔案

- `packages/web-components/src/govtw-side-navigation.ts`（新）
- `packages/tokens/tokens.json`：`side-navigation` 14 個 token
- `apps/docs/components/side-navigation.md`（新）
- scaffolder 更新的 `index.ts`、`package.json`、`vite.config.ts`、`config.mts`

### 後續建議

- 若之後需要收合，用 `<button aria-expanded>`，另開任務
