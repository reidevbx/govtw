# 新增 頁內目錄 Contents List 元件（`govtw-contents-list`）

- **優先度**：P3
- **參考**：GOV.UK 無對應元件（台灣自訂）
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 全國政府入口網 gov.tw：https://www.gov.tw/News_Content_37_908085 — 長文頁「目錄：一、二…」，用 table 排版

### 現況問題

- 用表格排版

## 需求定義

- `<nav aria-label="本頁目錄">` + 錨點清單
- 支援中文編號（一、二、三）

### 無障礙

- WCAG 2.2 AA 為最低標準
- 錨點目標是頁內標題

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [x] 決定「待確認」各項
- [x] `pnpm new:component contents-list --type=basic --zh-name=頁內目錄`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-contents-list-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-contents-list.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/contents-list.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-contents-list.ts`、`apps/docs/components/contents-list.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `side-navigation`

## 總結

依 [P3 決定表](./2026-10-14-p3-decisions.md) CL1–CL7 實作。

### 完成項目

- light DOM 元件 `govtw-contents-list`：作者寫 `<ol>`／`<ul>` 加錨點連結，元件包上 `<nav aria-labelledby>` 與可見的 `<h2>`「目錄」
- 中文編號由作者寫在連結文字裡（CL2），元件以 `list-style: none` 隱藏清單符號
- **實作時新增**：清單加 `role="list"`。Safari 會移除 `list-style: none` 清單的清單語意
- 第二層縮排；連結高度至少 44px
- 12 個 component token
- side-navigation 文件加上與頁內目錄的分工說明（CL6）

### 變更檔案

- 新增：`packages/web-components/src/govtw-contents-list.ts`、`apps/docs/components/contents-list.md`、`apps/docs/public/preview/contents-list/`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`、`apps/docs/components/side-navigation.md`

### 後續建議

- side-navigation 同樣用 `list-style: none`，但沒有加 `role="list"`，Safari 的 VoiceOver 可能不念項目數。建議另開 bug 任務處理
- 未用螢幕閱讀器實測
