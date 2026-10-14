# 新增 簡訊驗證碼 OTP Input 元件（`govtw-otp-input`）

- **優先度**：P3
- **參考**：GOV.UK 無對應元件（台灣自訂）
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 內政部戶政司：https://www.ris.gov.tw/apply-idCardChange/app/aw070402/main — 「取得行動電話驗證碼」+ 6 碼數字輸入

## 需求定義

- 單一輸入框（不拆成 6 格），`inputmode="numeric"`、`autocomplete="one-time-code"`
- 「重新傳送」按鈕與倒數提示

### 無障礙

- WCAG 2.2 AA 為最低標準
- 倒數提示不要每秒宣告；只在可重送時宣告一次

### 待確認（動手前需決定）

1. 是否直接用 text-input 加文件範例即可，不另做元件？

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [x] 決定「待確認」各項
- [x] `pnpm new:component otp-input --type=form --zh-name=一次性驗證碼`（依 OT3 改名）
- [x] `packages/tokens/tokens.json` 新增 `--govtw-otp-input-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-otp-input.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/otp-input.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-otp-input.ts`、`apps/docs/components/otp-input.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `captcha`
- `text-input`

## 總結

依 [P3 決定表](./2026-10-14-p3-decisions.md) OT1–OT9 實作。

### 完成項目

- 獨立元件 `govtw-otp-input`，中文名稱改為「一次性驗證碼」（OT3）
- 輸入框固定 `inputmode="numeric"`、`autocomplete="one-time-code"`，不限長度、不自動送出
- `resend-delay`（預設 60 秒）倒數；倒數期間按鈕 `aria-disabled`，聚焦時以 `aria-describedby` 念出剩餘秒數
- 倒數結束時 live region 宣告一次「現在可以重新傳送驗證碼」
- 按下重新傳送發出 `govtw-resend` 事件並重新倒數
- 剩餘秒數以截止時間計算，不累積 `setInterval` 延遲
- 21 個 component token

### 變更檔案

- 新增：`packages/web-components/src/govtw-otp-input.ts`、`apps/docs/components/otp-input.md`、`apps/docs/public/preview/otp-input/`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`、`apps/docs/components/password-input.md`

### 後續建議

- 未在瀏覽器實測倒數與宣告，也未用螢幕閱讀器確認念法
- `autocomplete="one-time-code"` 的簡訊自動填入未在 iOS／Android 實機驗證
