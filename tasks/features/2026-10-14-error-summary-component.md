# 新增 錯誤摘要 Error Summary 元件（`govtw-error-summary`）

- **優先度**：P1
- **參考**：[GOV.UK Error Summary](https://design-system.service.gov.uk/components/error-summary/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 內政部戶政司：https://www.ris.gov.tw/apply-registration/app/aw0718/main — 錯誤用 sweetalert2 彈窗，原始碼有「查無資料！」
- 財政部稅務入口網：https://www.etax.nat.gov.tw/etwmain/etw113w2 — 錯誤訊息是純文字加「:-(」，沒有 `role=alert`

### 現況問題

- 錯誤用彈窗顯示，關掉後使用者看不到哪一欄錯
- 沒有頁面頂端的錯誤清單

## 需求定義

- 頁面頂端顯示所有錯誤，每項連到對應欄位
- 出現時自動取得焦點
- slot：標題（預設「有問題需要處理」）、錯誤清單
- 點擊錯誤連結時，焦點移到對應欄位（含 Shadow DOM 內的 input）
- 欄位錯誤訊息已由 text-input、select、textarea 的 `error` 屬性提供，本元件不重做

### 無障礙

- WCAG 2.2 AA 為最低標準
- `role="alert"`
- 出現時 focus，讓螢幕閱讀器立即念出

### 待確認（動手前需決定）

1. 如何讓錯誤連結聚焦到 Shadow DOM 內的 input？需確認各表單元件 `delegatesFocus` 是否足夠

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component error-summary --type=basic --zh-name=錯誤摘要`
- [ ] 補 `packages/web-components/vite.config.ts` entry（scaffolder 已知缺漏）
- [ ] 修 sidebar 英文名空格：「錯誤摘要 Error Summary」（scaffolder 已知缺漏）
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-error-summary-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-error-summary.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/error-summary.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-error-summary.ts`、`apps/docs/components/error-summary.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `date-input`
- `text-input`
