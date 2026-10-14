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

- [x] 決定「待確認」各項
- [x] `pnpm new:component document-list --type=basic --zh-name=文件列表`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-document-list-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-document-list.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/document-list.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-document-list.ts`、`apps/docs/components/document-list.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `tag`
- `attachment`
- `pagination`

## 總結

依 [P2 決定表](./2026-10-14-p2-decisions.md) DL1–DL4 完成。

### 完成項目

- 與 table 的分工寫在兩頁的設計指引（DL1）
- `<govtw-document-list>` 內放 `<govtw-document-list-item heading href date unit>`，標籤用 `slot="tags"`（DL2）
- 容器 `role="list"`、每項 `role="listitem"`
- `<time datetime>` 輸出 ISO；畫面預設民國年「115 年 10 月 14 日」，`calendar="gregorian"` 顯示西元年（DL3）
- table.md 的「規劃中」改成實際連結（DL4）

### 變更檔案

- `packages/web-components/src/govtw-document-list.ts`（新，含 `GovtwDocumentListItem`）
- `packages/web-components/src/index.ts`：手動加上 `GovtwDocumentListItem` export
- `packages/tokens/tokens.json`：`document-list` 16 個 token
- `apps/docs/components/document-list.md`（新）
- `apps/docs/components/table.md`
- scaffolder 更新的 `package.json`、`vite.config.ts`、`config.mts`

### 後續建議

- 在瀏覽器確認：螢幕閱讀器念出「清單，3 個項目」（`role="list"` 跨 slot 的支援度依瀏覽器而定）
