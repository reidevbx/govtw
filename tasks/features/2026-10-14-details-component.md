# 新增 可展開說明 Details 元件（`govtw-details`）

- **優先度**：P1
- **參考**：[GOV.UK Details](https://design-system.service.gov.uk/components/details/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 財政部稅務入口網：https://www.etax.nat.gov.tw/etwmain/etw109w?formId=OLF013008 — 「稅別分類」展開／收合
- 勞保局：https://www.bli.gov.tw/0014162.html — 試算頁長篇說明，適合收合
- 內政部戶政司：https://www.ris.gov.tw/apply-idCardChange/app/aw070402/main — 姓名欄特殊字元說明，適合收合

### 現況問題

- 三組網站都沒有用原生 `<details>`

## 需求定義

- 包住原生 `<details>` / `<summary>`
- 屬性：`summary`（摘要文字）、`open`
- 內容透過 default slot 傳入

### 無障礙

- WCAG 2.2 AA 為最低標準
- 使用原生元素，不自造 `aria-expanded`

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [x] 決定「待確認」各項
- [x] `pnpm new:component details --type=basic --zh-name=可展開說明`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-details-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-details.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/details.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-details.ts`、`apps/docs/components/details.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `accordion`
- `inset-text`

## 總結

### 完成項目

- ✅ 依 [P1 決定表](./2026-10-14-p1-decisions.md) D1：`summary` 屬性 + default slot，Shadow DOM 內使用原生 `<details>`
- ✅ `open` 屬性與原生 toggle 事件雙向同步
- ✅ 以 `::before` 畫三角形取代各瀏覽器不一致的原生 marker
- ✅ docs 頁（`default`、`open` 兩個 preview）

### 驗證

- `pnpm build`、`pnpm check:components`（24 個）、`pnpm lint`、`tsc --noEmit` 通過
- 未在瀏覽器實測；頁內搜尋自動展開在 Shadow DOM 下是否有效未確認，docs 已註明
