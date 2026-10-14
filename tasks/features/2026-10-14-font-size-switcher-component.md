# 新增 字級切換 Font Size Switcher 元件（`govtw-font-size-switcher`）

- **優先度**：P2
- **參考**：GOV.UK 無對應元件（台灣自訂）
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 全國政府入口網 gov.tw：https://www.gov.tw/ — 「小／中／大」用 `href="#"`
- 數位發展部：https://moda.gov.tw/ — dropdown「A / A+ / A-」，只靠 title
- 財政部稅務入口網：https://www.etax.nat.gov.tw/ — 有 button，但沒標示目前字級
- 臺北市政府：https://www.gov.taipei/ — `javascript:SetFont()`

### 現況問題

- 不是 `<button>`
- 沒有 `aria-pressed`，看不出目前選哪個

## 需求定義

- 三個 `<button aria-pressed>`：小、中、大
- 切換時在 `<html>` 設 `data-font-size`，由 tokens 調整根字級
- 選擇存到 localStorage（失敗時不影響使用）
- 發出 `govtw-change` 事件

### 無障礙

- WCAG 2.2 AA 為最低標準
- 群組加 `role="group"` + `aria-label="字級"`
- `aria-pressed` 表示目前字級

### 待確認（動手前需決定）

1. tokens 是否要新增 `data-font-size` 主題？需調整 `packages/tokens/build.js`
2. WCAG 不要求此功能（瀏覽器可縮放），但台灣使用者普遍期待

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [x] 決定「待確認」各項
- [x] `pnpm new:component font-size-switcher --type=basic --zh-name=字級切換`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-font-size-switcher-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-font-size-switcher.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/font-size-switcher.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-font-size-switcher.ts`、`apps/docs/components/font-size-switcher.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `header`

## 總結

依 [P2 決定表](./2026-10-14-p2-decisions.md) FS1–FS4 完成。

### 完成項目

- 不改 `build.js`；`tokens.json` 的 `utilities` 加 3 條 `html[data-font-size]` 規則：87.5%／100%／125%（FS1、FS2）
- 文件範例前加警告區塊，說明會改變整個文件站台（FS3）
- 可見文字「小」「中」「大」，`role="group"` 的名稱取自可見標籤「字級」（FS4）
- localStorage 讀寫包在 try/catch；`storage-key` 設空字串時不儲存
- 以 MutationObserver 監看 `<html>` 屬性，同一頁多個切換器互相同步
- 文件提供 `<head>` 同步程式，避免載入時字級跳動

### 變更檔案

- `packages/web-components/src/govtw-font-size-switcher.ts`（新）
- `packages/tokens/tokens.json`：`utilities` 3 條規則、`font-size-switcher` 15 個 token
- `apps/docs/components/font-size-switcher.md`（新）
- `apps/docs/components/page-tools.md`：相關元件改為實際連結
- scaffolder 更新的 `index.ts`、`package.json`、`vite.config.ts`、`config.mts`

### 後續建議

- 檢查既有元件是否有 px 字級：有的話切換不會縮放
