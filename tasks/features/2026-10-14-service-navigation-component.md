# 新增 主選單 Service Navigation 元件（`govtw-service-navigation`）

- **優先度**：P0
- **參考**：[GOV.UK Service Navigation](https://design-system.service.gov.uk/components/service-navigation/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 數位發展部：https://moda.gov.tw/ — 5 個主項，下拉加多層 dropend 子選單，「資訊公開」有 20 多項
- 臺北市政府：https://www.gov.taipei/ — 7 大類，多層子選單
- 高雄市政府：https://www.kcg.gov.tw/ — 4 大類，多層子選單
- 勞保局：https://www.bli.gov.tw/ — `nav#menu` 五欄 submenu
- 監理服務網：https://www.mvdis.gov.tw/ — MegaMenu 項目是 `<a href="#">`，沒有 `aria-expanded`

### 現況問題

- 選單在頁首、手機版、側欄、頁尾重複 3 到 4 次，Tab 次數暴增
- 所有連結 title 寫「移至XXX」，螢幕閱讀器重複念（moda）
- 子選單開關不是 `<button>`

## 需求定義

- 第一版只做單層水平導覽（GOV.UK Service navigation 範圍）
- 目前頁加 `aria-current="page"`
- 窄螢幕收合成「選單」按鈕
- 多層大選單（mega menu）列為第二版，需先決定是否支援

### 無障礙

- WCAG 2.2 AA 為最低標準
- `<nav aria-label="主選單">`
- 收合按鈕 `aria-expanded`、`aria-controls`

### 待確認（動手前需決定）

1. 是否支援多層下拉？台灣網站普遍有，但 GOV.UK 刻意不做，建議先不做

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [x] 決定「待確認」各項
- [x] `pnpm new:component service-navigation --type=basic --zh-name=主選單`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-service-navigation-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-service-navigation.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/service-navigation.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-service-navigation.ts`、`apps/docs/components/service-navigation.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `header`
- `side-navigation`

## 總結

### 完成項目

- ✅ 依 [P0 決定表](./2026-10-14-p0-decisions.md) A1、A2、A4、N1–N3 實作
- ✅ `govtw-service-navigation`：light DOM，作者寫 `<a>`，元件包成 `<nav aria-label><ul><li>`；只支援單層
- ✅ 目前頁由作者加 `aria-current="page"`，顯示粗體加指示線（寬版底線、窄版左線）
- ✅ 容器寬度 40rem 以下收合成「選單」`<button aria-expanded aria-controls>`，以 container query 判斷
- ✅ 寬窄版面共用同一份 DOM
- ✅ docs 頁（`default`、`collapsed` 兩個 preview）；breadcrumbs 補回相關元件連結

### 驗證

- `pnpm build`、`pnpm check:components`（19 個）、`pnpm lint`、`tsc --noEmit` 通過
- 未在瀏覽器實測：container query 收合、按鈕展開

### 變更檔案

- `packages/web-components/src/govtw-service-navigation.ts` — 新增
- `apps/docs/components/service-navigation.md`、preview 2 份 — 新增
- `apps/docs/components/breadcrumbs.md` — 補相關元件連結
- `packages/tokens/tokens.json` — service-navigation 補 3 個底線 token
