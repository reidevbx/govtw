# 新增 圖形驗證碼 Captcha 元件（`govtw-captcha`）

- **優先度**：P2
- **參考**：GOV.UK 無對應元件（台灣自訂）
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 內政部戶政司：https://www.ris.gov.tw/apply-idCardChange/app/aw070402/main — 圖片 +「產製新驗證碼」+「語音播放」+ 5 碼輸入
- 財政部稅務入口網：https://www.etax.nat.gov.tw/etwmain/etw113w2 — 同結構，含語音播放
- 監理服務網：https://www.mvdis.gov.tw/m3-emv-vil/vil/penaltyQueryPay — **沒有語音替代**；label 對不到 id；id 重複

### 現況問題

- mvdis 沒有語音驗證碼，視障者無法使用
- label 與 id 不對應

## 需求定義

- 圖片 slot 或 `src` 屬性
- 「換一張」按鈕，發出 `govtw-refresh` 事件
- 「語音播放」按鈕必備，`audio-src` 屬性
- 輸入框 `autocomplete="off"`、`inputmode` 可設定
- formAssociated

### 無障礙

- WCAG 2.2 AA 為最低標準
- WCAG 2.2 SC 1.1.1 要求非文字內容的替代：語音版必備
- WCAG 2.2 SC 3.3.8 Accessible Authentication

### 待確認（動手前需決定）

1. 設計系統是否應該「推薦」圖形驗證碼？GOV.UK 不提供；建議元件化以統一無障礙做法，並在文件建議優先用其他防濫用機制

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [x] 決定「待確認」各項
- [x] `pnpm new:component captcha --type=form --zh-name=圖形驗證碼`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-captcha-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-captcha.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/captcha.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-captcha.ts`、`apps/docs/components/captcha.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `otp-input`
- `text-input`

## 總結

依 [P2 決定表](./2026-10-14-p2-decisions.md) CA1–CA5 完成。

### 完成項目

- 文件開頭用警告區塊說明優先用其他防濫用做法（CA1）
- `src`、`alt` 屬性；「換一張」只發出 `govtw-refresh` 事件，換圖後清空輸入（CA2）
- `audio-src` 缺少時 console 警告；「語音播放」播放元件內的 `<audio preload="none">`（CA3）
- 文件說明 WCAG 3.3.8：登入流程需另外提供不用驗證碼的登入方式（CA4）
- 輸入框 `autocomplete="off"`、`spellcheck="false"`，`inputmode`、`maxlength` 可設（CA5）

### 變更檔案

- `packages/web-components/src/govtw-captcha.ts`（新）
- `packages/tokens/tokens.json`：`captcha` 20 個 token
- `apps/docs/components/captcha.md`（新）
- `apps/docs/public/assets/captcha-sample.svg`（新，範例圖片）
- scaffolder 更新的 `index.ts`、`package.json`、`vite.config.ts`、`config.mts`

### 後續建議

- 範例沒有語音檔；若要示範播放，需準備一段授權可用的音檔
- 各機關登入流程是否符合 3.3.8 未查證
