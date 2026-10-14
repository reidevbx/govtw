# 新增 文件列表 Document List 元件（`govtw-document-list`）

- **優先度**：P2
- **參考**：GOV.UK 無對應元件（台灣自訂）
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 數位發展部：https://moda.gov.tw/press/press-releases/372 — 日期 + 發布單位 + 標題 + 主題標籤 + 檔案類型
- 勞保局：https://www.bli.gov.tw/0100147.html — 新聞列表加「頭條」
- 高雄市政府：https://www.kcg.gov.tw/News.aspx?n=F29A02A9D36C47F0 — 民國年日期 + 標題 + 發布機關；標題被截斷成「....」

### 現況問題

- 標題被截斷
- 日期沒有機器可讀格式

## 需求定義

- 每項：標題連結、日期（`<time datetime>`）、發布單位、選用標籤
- 不截斷標題
- 搭配 pagination 使用

### 無障礙

- WCAG 2.2 AA 為最低標準
- 使用 `<ul>` 或 `<ol>`
- 日期用 `<time>`

### 待確認（動手前需決定）

1. 與 Table 的分工：多欄可排序資料用 table，新聞公告用本元件

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component document-list --type=basic --zh-name=文件列表`
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-document-list-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-document-list.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/document-list.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-document-list.ts`、`apps/docs/components/document-list.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `tag`
- `attachment`
- `pagination`
