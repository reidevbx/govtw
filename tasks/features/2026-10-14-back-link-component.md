# 新增 返回連結 Back Link 元件（`govtw-back-link`）

- **優先度**：P1
- **參考**：[GOV.UK Back Link](https://design-system.service.gov.uk/components/back-link/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 全國政府入口網 gov.tw：https://www.gov.tw/News_Content_2_775901 — 「回上一頁」用 `document.referrer` 或 `history.back`
- 臺北市政府：https://www.gov.taipei/ — 「回上一頁」依賴 JS
- 勞保局：https://www.bli.gov.tw/0110277.html — 「上一則／下一則」

### 現況問題

- 依賴 JS，沒有 JS 時無法使用
- 「回頂端」三站三種文案

## 需求定義

- `href` 必填，指向實際上一步網址
- 預設文字「返回」
- 用於多步驟表單頂端

### 無障礙

- WCAG 2.2 AA 為最低標準
- 真連結，不用 `javascript:history.back()`

### 待確認（動手前需決定）

1. 「上一則／下一則」是否放進 pagination 的 block 變體（已有），而不是本元件

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component back-link --type=basic --zh-name=返回連結`
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-back-link-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-back-link.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/back-link.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-back-link.ts`、`apps/docs/components/back-link.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `breadcrumbs`
- `pagination`
