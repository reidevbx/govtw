# 新增 完成面板 Panel 元件（`govtw-panel`）

- **優先度**：P1
- **參考**：[GOV.UK Panel](https://design-system.service.gov.uk/components/panel/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 內政部戶政司：https://www.ris.gov.tw/documents/html/4/288.html — 送出後顯示「請稍後我們將儘速為您辦理…」，沒有案件編號

### 現況問題

- 送出後沒有明確的完成畫面與案件編號（間接證據，未實際送出表單）

## 需求定義

- 大字標題（如「申請已送出」）+ 案件編號
- 用於交易完成頁，一頁只放一個

### 無障礙

- WCAG 2.2 AA 為最低標準
- 標題使用 `<h1>`
- 顏色對比 ≥ 4.5:1

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component panel --type=basic --zh-name=完成面板`
- [ ] 補 `packages/web-components/vite.config.ts` entry（scaffolder 已知缺漏）
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-panel-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-panel.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/panel.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-panel.ts`、`apps/docs/components/panel.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `notification-banner`
- `summary-list`
