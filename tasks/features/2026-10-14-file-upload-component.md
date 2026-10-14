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

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component file-upload --type=form --zh-name=檔案上傳`
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-file-upload-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-file-upload.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/file-upload.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-file-upload.ts`、`apps/docs/components/file-upload.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `attachment`
