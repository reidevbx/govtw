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

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component otp-input --type=form --zh-name=簡訊驗證碼`
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-otp-input-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-otp-input.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/otp-input.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-otp-input.ts`、`apps/docs/components/otp-input.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `captcha`
- `text-input`
