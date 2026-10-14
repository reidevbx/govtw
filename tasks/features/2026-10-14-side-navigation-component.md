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

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component side-navigation --type=basic --zh-name=側邊選單`
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-side-navigation-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-side-navigation.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/side-navigation.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-side-navigation.ts`、`apps/docs/components/side-navigation.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `service-navigation`
- `breadcrumbs`
