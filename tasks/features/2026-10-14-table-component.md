# 新增 表格 Table 元件（`govtw-table`）

- **優先度**：P1
- **參考**：[GOV.UK Table](https://design-system.service.gov.uk/components/table/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 內政部：https://www.moi.gov.tw/News.aspx?n=4&sms=9009 — 有 `th`，沒有 `caption`、`scope`
- 監理服務網：https://www.mvdis.gov.tw/m3-emv-cht/public/news — 只用已廢棄的 `summary` 屬性；全站用巢狀排版表格
- 勞保局：https://www.bli.gov.tw/0017367.html — 附件下載表 `table.footable`
- 臺北市政府：https://www.gov.taipei/ — 新聞稿四欄列表
- 高雄市政府：https://www.kcg.gov.tw/ — 表頭「標題」出現兩次

### 現況問題

- 沒有 `caption`
- `th` 沒有 `scope`
- 用表格排版

## 需求定義

- 樣式元件：包住原生 `<table>`，只加樣式，不改結構
- `caption` 必填（可視覺隱藏）
- 數字欄靠右對齊的 class 或屬性
- 窄螢幕：容器水平捲動，並可用鍵盤捲動

### 無障礙

- WCAG 2.2 AA 為最低標準
- 捲動容器加 `tabindex="0"` 與 `role="region"` + `aria-label`
- 文件強調不可用表格排版

### 待確認（動手前需決定）

1. 用 Shadow DOM 包 slot 時，原生 table 樣式要靠 `::slotted` 還是 light DOM CSS？需實測

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component table --type=basic --zh-name=表格`
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-table-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-table.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/table.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-table.ts`、`apps/docs/components/table.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `summary-list`
- `pagination`
