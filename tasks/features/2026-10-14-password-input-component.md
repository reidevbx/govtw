# 新增 密碼輸入 Password Input 元件（`govtw-password-input`）

- **優先度**：P2
- **參考**：[GOV.UK Password Input](https://design-system.service.gov.uk/components/password-input/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 內政部戶政司：https://www.ris.gov.tw/apply-idCardChange/app/aw070402/main — 4 碼密碼與確認密碼，沒有顯示／隱藏切換

### 現況問題

- 沒有顯示／隱藏切換

## 需求定義

- 基於 text-input，加「顯示」按鈕切換 `type`
- 切換時以 live region 宣告「密碼已顯示」
- `autocomplete` 預設 `current-password`

### 無障礙

- WCAG 2.2 AA 為最低標準
- 切換按鈕 `aria-controls`，文字隨狀態改變

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [x] 決定「待確認」各項
- [x] `pnpm new:component password-input --type=form --zh-name=密碼輸入`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-password-input-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-password-input.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/password-input.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-password-input.ts`、`apps/docs/components/password-input.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `text-input`

## 總結

依 [P2 決定表](./2026-10-14-p2-decisions.md) PW1–PW4 完成。

### 完成項目

- 獨立元件，不繼承 text-input（PW1）
- 「顯示／隱藏」按鈕：可讀名稱「顯示密碼／隱藏密碼」，`aria-controls` 指向欄位；live region 宣告狀態（PW2）
- `formAssociatedCallback` 監聽所屬表單的 `submit`，送出時切回隱藏（PW3）
- `autocomplete` 預設 `current-password`（PW4）

### 變更檔案

- `packages/web-components/src/govtw-password-input.ts`（新）
- `packages/tokens/tokens.json`：`password-input` 20 個 token
- `apps/docs/components/password-input.md`（新）
- scaffolder 更新的 `index.ts`、`package.json`、`vite.config.ts`、`config.mts`

### 後續建議

- 在瀏覽器確認：切換時 NVDA／VoiceOver 會念出宣告；送出後欄位回到隱藏
