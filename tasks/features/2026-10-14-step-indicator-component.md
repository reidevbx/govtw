# 新增 步驟指示 Step Indicator 元件（`govtw-step-indicator`）

- **優先度**：P2
- **參考**：GOV.UK 無對應元件（台灣自訂）
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 監理服務網：https://www.mvdis.gov.tw/m3-emv-vil/vil/penaltyQueryPay — 「步驟一 › 步驟二 › 步驟三」用排版表格加箭頭圖
- 內政部戶政司：https://www.ris.gov.tw/apply-idCardChange/app/aw070402/main — fieldset 加編號文字
- 內政部戶政司：https://www.ris.gov.tw/apply-reservation/app/aw071401/applyMain — 只有「下一頁」，沒有進度提示

### 現況問題

- 沒有 `aria-current="step"`
- 目前步驟只靠視覺樣式

## 需求定義

- 有序清單 `<ol>`，目前步驟 `aria-current="step"`
- 屬性：`current`、`total`；步驟名稱以 slot 傳入
- 窄螢幕只顯示「第 2 步，共 4 步」

### 無障礙

- WCAG 2.2 AA 為最低標準
- `aria-current="step"`
- 已完成步驟加視覺隱藏文字「已完成」

### 待確認（動手前需決定）

1. GOV.UK 不做步驟條，只在標題上方寫「第 x 步，共 n 步」。是否改做這種輕量版本？
2. 本次調查沒看到完整申辦流程（需登入或送出），建議用瀏覽器實測確認

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component step-indicator --type=basic --zh-name=步驟指示`
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-step-indicator-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-step-indicator.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/step-indicator.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-step-indicator.ts`、`apps/docs/components/step-indicator.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `back-link`
