# 新增 頁面工具列 Page Tools 元件（`govtw-page-tools`）

- **優先度**：P2
- **參考**：GOV.UK 無對應元件（台灣自訂）
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 全國政府入口網 gov.tw：https://www.gov.tw/News_Content_2_775901 — 列印、FB、X、LINE、Email、注音切換
- 內政部：https://www.moi.gov.tw/ — 分享鈕 `href="#"`，文字「Share toPlurk」
- 高雄市政府：https://www.kcg.gov.tw/ — 列印、FB、Plurk、Twitter、LINE、Email

### 現況問題

- 全是 `javascript:` 連結，沒有 JS 時不能用
- 只有 icon，沒有文字

## 需求定義

- 列印：`<button>` 呼叫 `window.print()`
- 分享：真實的分享網址連結（LINE、Facebook、X、Email `mailto:`）
- 支援 Web Share API，可用時顯示單一「分享」按鈕
- 每個項目有可見文字或可讀名稱

### 無障礙

- WCAG 2.2 AA 為最低標準
- 外連加「（另開新視窗）」

### 待確認（動手前需決定）

1. 預設提供哪些分享平台？建議 LINE、Facebook、Email

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [x] 決定「待確認」各項
- [x] `pnpm new:component page-tools --type=basic --zh-name=頁面工具列`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-page-tools-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-page-tools.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/page-tools.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-page-tools.ts`、`apps/docs/components/page-tools.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `link`

## 總結

依 [P2 決定表](./2026-10-14-p2-decisions.md) PT1–PT3 完成，PT4 實作時改變。

### 完成項目

- `platforms` 預設 `line facebook email`，可加 `x`（PT1）
- 支援 `navigator.share` 時改成單一「分享」按鈕；`no-native-share` 可關閉（PT2）
- 分享網址與標題預設 `location.href`、`document.title`，可用 `url`、`share-title` 覆寫（PT3）
- 列印是 `<button>`；列印時工具列隱藏；`no-print` 可不顯示列印

### 與決定表不同

- **PT4 改為同一分頁開啟**，不另開新視窗，因此不加「（另開新視窗）」。理由：工具列上每個連結加可見提示會讓整列過長；分享完按上一頁即可回來
- 分享連結用原生 `<a>`，未沿用 link 元件，避免元件互相依賴

### 變更檔案

- `packages/web-components/src/govtw-page-tools.ts`（新）
- `packages/tokens/tokens.json`：`page-tools` 9 個 token
- `apps/docs/components/page-tools.md`（新）
- scaffolder 更新的 `index.ts`、`package.json`、`vite.config.ts`、`config.mts`

### 後續建議

- 各平台分享網址格式（LINE、X）未實測，需在瀏覽器確認仍有效
