# 新增 標籤 Tag 元件（`govtw-tag`）

- **優先度**：P1
- **參考**：[GOV.UK Tag](https://design-system.service.gov.uk/components/tag/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 數位發展部：https://moda.gov.tw/press/press-releases/372 — 主題標籤，但寫成 `<a href="javascript:;" role="button">`
- 勞保局：https://www.bli.gov.tw/0100147.html — 「頭條」只靠綠色底色區分
- 監理服務網：https://www.mvdis.gov.tw/m3-emv-cht/public/news — 20 筆**全部**標 HOT

### 現況問題

- 標籤濫用失去意義
- 只靠顏色區分
- 標籤和篩選連結語意混淆

## 需求定義

- 純顯示用，不可點擊
- color 屬性：灰、藍、綠、黃、紅等，每色有文字說明
- 可點的「熱門關鍵字」不屬本元件，用 `govtw-link` 加 cluster 排列

### 無障礙

- WCAG 2.2 AA 為最低標準
- 顏色不是唯一指示：文字本身要表達狀態
- 色彩對比 ≥ 4.5:1

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [x] 決定「待確認」各項
- [x] `pnpm new:component tag --type=basic --zh-name=標籤`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-tag-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-tag.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/tag.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-tag.ts`、`apps/docs/components/tag.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `document-list`
- `search`

## 總結

### 完成項目

- ✅ 依 [P1 決定表](./2026-10-14-p1-decisions.md) T1：`grey`（預設）、`blue`、`green`、`yellow`、`red`
- ✅ `govtw-tag`：Shadow DOM，純顯示；Windows 高對比模式保留透明 outline
- ✅ docs 頁（`default`、`colors` 兩個 preview）

### 驗證

- 對比度依 OKLCH 值換算 sRGB 計算：grey 14.52、blue 14.15、green 14.12、yellow 14.43、red 14.80（皆為 :1，遠高於 4.5:1）
- `pnpm build`、`pnpm check:components`（22 個）、`pnpm lint`、`tsc --noEmit` 通過

### 同一個 commit 的共用變更

- `packages/tokens/build.js`：抽出 `selectorRules()`，新增 Utilities 區段
- `tokens.json`：新增 `.govtw-visually-hidden`、`.govtw-visually-hidden-focusable`（決定 C1），以及 P1 全部 component token
- 修正：`notification-banner.header-padding` 原本一個值含兩個 token 引用，會產生壞掉的 CSS 變數，已拆成 `-y`、`-x`
