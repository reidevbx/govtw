# 新增 檔案上傳 File Upload 元件（`govtw-file-upload`）

- **優先度**：P2
- **參考**：[GOV.UK File Upload](https://design-system.service.gov.uk/components/file-upload/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 內政部戶政司：https://www.ris.gov.tw/app/portal/765 — 國民身分證影像上傳（入口，未進入）

### 現況問題

- 本次沒有直接觀察到上傳畫面，需求來自入口頁與 GOV.UK

## 需求定義

- 包住原生 `<input type="file">`
- 屬性：`label`、`hint`、`error`、`accept`、`multiple`
- hint 說明允許格式與大小上限
- formAssociated

### 無障礙

- WCAG 2.2 AA 為最低標準
- 使用原生 file input，不自造拖放區作為唯一方式

### 待確認（動手前需決定）

1. 是否要做拖放區？GOV.UK 文件有改良版設計，需查證最新狀態

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [x] 決定「待確認」各項
- [x] `pnpm new:component file-upload --type=form --zh-name=檔案上傳`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-file-upload-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-file-upload.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/file-upload.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-file-upload.ts`、`apps/docs/components/file-upload.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `attachment`

## 總結

依 [P2 決定表](./2026-10-14-p2-decisions.md) FU1–FU3 完成。

### 完成項目

- 包住原生 `<input type="file">`，用 `::file-selector-button` 加按鈕樣式；不做拖放區（FU1）
- 不檢查大小與格式，`accept` 交給瀏覽器（FU2）
- 以 `FormData` 送出所有選取的檔案；`files` getter 供 JS 讀取（FU3）

### 變更檔案

- `packages/web-components/src/govtw-file-upload.ts`（新）
- `packages/tokens/tokens.json`：`file-upload` 17 個 token
- `apps/docs/components/file-upload.md`（新）
- scaffolder 更新的 `index.ts`、`package.json`、`vite.config.ts`、`config.mts`

### 後續建議

- 查證 GOV.UK 新版拖放區設計，另開任務評估
- 在瀏覽器確認：表單送出時伺服器收到檔案；Safari 的 `::file-selector-button` 樣式
