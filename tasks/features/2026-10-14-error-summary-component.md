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

- [x] 決定「待確認」各項
- [x] `pnpm new:component error-summary --type=basic --zh-name=錯誤摘要`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-error-summary-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-error-summary.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/error-summary.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-error-summary.ts`、`apps/docs/components/error-summary.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `date-input`
- `text-input`

## 總結

### 完成項目

- ✅ 依 [P1 決定表](./2026-10-14-p1-decisions.md) E1–E3
- ✅ `govtw-error-summary`：light DOM 包裝作者的 `<ul><li><a>`，加上 `<h2>` 標題與 `role="alert"` 容器（巢狀連結需要 light DOM 樣式，`::slotted` 選不到）
- ✅ 出現時自動聚焦一次；`no-autofocus` 可關閉
- ✅ 點 `#id` 連結：先在元件所在 root 找目標再退回 document，`scrollIntoView` 後以 `focus({ preventScroll: true })` 聚焦。表單元件的 `delegatesFocus` 會把焦點轉到內部 input
- ✅ 標題 id 以計數器產生，避免重複
- ✅ docs 頁（`default` preview，搭配兩個帶 `error` 的 text-input）

### 與決定表的差異

- 決定表未指定 DOM。實作採 light DOM 包裝（同 breadcrumbs），原因是作者清單中的巢狀 `<a>` 需要樣式

### 驗證

- `pnpm build`、`pnpm check:components`（30 個）、`pnpm lint`、`tsc --noEmit` 通過
- 未在瀏覽器實測：自動聚焦、點連結後焦點是否進到內部 input
