# 新增 附件下載 Attachment 元件（`govtw-attachment`）

- **優先度**：P2
- **參考**：GOV.UK 無對應元件（台灣自訂）
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 勞保局：https://www.bli.gov.tw/0017367.html — 檔名、格式（`<img alt="pdf">`）、大小、下載次數
- 數位發展部：https://moda.gov.tw/press/press-releases/372 — 「會議紀錄 + PDF」標示
- 內政部戶政司：https://www.ris.gov.tw/documents/html/4/288.html — 連結文字直接用檔名，沒有大小
- 財政部稅務入口網：https://www.etax.nat.gov.tw/etwmain/etw160w — 連結文字後加「(pdf)」

### 現況問題

- 格式只用圖示表示
- 沒有檔案大小
- PDF 與 ODF 雙格式呈現方式不一

## 需求定義

- 屬性：`href`、`format`（PDF/ODT/ODS…）、`size`、`title`
- 同一份文件多格式：一個標題下列多個格式連結
- 格式與大小用文字呈現，不只用圖示

### 無障礙

- WCAG 2.2 AA 為最低標準
- 連結可讀名稱包含格式與大小，例如「會議紀錄（PDF，245 KB）」

### 待確認（動手前需決定）

1. 「下載次數」是否納入（建議不納入）

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [x] 決定「待確認」各項
- [x] `pnpm new:component attachment --type=basic --zh-name=附件下載`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-attachment-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-attachment.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/attachment.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-attachment.ts`、`apps/docs/components/attachment.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `document-list`
- `file-upload`

## 總結

依 [P2 決定表](./2026-10-14-p2-decisions.md) AT1–AT4 完成。

### 完成項目

- 不顯示下載次數（AT1）
- `<govtw-attachment heading>` 內放多個 `<govtw-attachment-file href format size>`（AT2）
- 連結可見文字「PDF（245 KB）」，前面加視覺隱藏的標題（AT3）
- 格式用加框文字標示，不用圖示（AT4）

### 變更檔案

- `packages/web-components/src/govtw-attachment.ts`（新，含 `GovtwAttachmentFile`）
- `packages/web-components/src/index.ts`：手動加上 `GovtwAttachmentFile` export
- `packages/tokens/tokens.json`：`attachment` 14 個 token
- `apps/docs/components/attachment.md`（新）
- `apps/docs/components/file-upload.md`：相關元件改為實際連結
- scaffolder 更新的 `package.json`、`vite.config.ts`、`config.mts`

### 後續建議

- 在瀏覽器確認：螢幕閱讀器的連結清單念出標題加格式
