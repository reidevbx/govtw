# 新增 頁內目錄 Contents List 元件（`govtw-contents-list`）

- **優先度**：P3
- **參考**：GOV.UK 無對應元件（台灣自訂）
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 全國政府入口網 gov.tw：https://www.gov.tw/News_Content_37_908085 — 長文頁「目錄：一、二…」，用 table 排版

### 現況問題

- 用表格排版

## 需求定義

- `<nav aria-label="本頁目錄">` + 錨點清單
- 支援中文編號（一、二、三）

### 無障礙

- WCAG 2.2 AA 為最低標準
- 錨點目標是頁內標題

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component contents-list --type=basic --zh-name=頁內目錄`
- [ ] 補 `packages/web-components/vite.config.ts` entry（scaffolder 已知缺漏）
- [ ] 修 sidebar 英文名空格：「頁內目錄 Contents List」（scaffolder 已知缺漏）
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-contents-list-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-contents-list.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/contents-list.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-contents-list.ts`、`apps/docs/components/contents-list.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `side-navigation`
