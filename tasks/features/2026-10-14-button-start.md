# Button 新增 start 變體

- **優先度**：P1
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

- gov.tw 每個申辦內容頁都有「我要線上申辦」主要行動按鈕
- 目前 `govtw-button` variant 只有 primary、secondary、danger

## 需求定義

- 新增 `variant="start"`：較大字級、右側箭頭圖示
- 通常搭配 `href` 以連結形式呈現

### 待確認（動手前需決定）

1. 箭頭圖示要不要依「外部網站」換成外連圖示

## 實作計劃

- [x] 決定「待確認」各項
- [x] 修改 `packages/web-components/src/govtw-button.ts`
- [x] 更新對應 docs 頁的範例與屬性表
- [x] `pnpm build:previews` → `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 修改：`packages/web-components/src/govtw-button.ts` 與對應 docs 頁
- 既有使用者行為可能改變，需在 docs 註明

## 總結

### 完成項目

- ✅ 依 [P1 決定表](./2026-10-14-p1-decisions.md) B1、B2
- ✅ `variant="start"`：沿用 primary 配色（以 `:is()` 共用 primary 的 hover／active 規則），字級 lg、粗體，右側箭頭 SVG（`aria-hidden`）；箭頭不因外部網站改變
- ✅ 連結按鈕 `target="_blank"` 時加視覺隱藏的「（另開新視窗）」，套用到所有 variant
- ✅ 新增 token：`start-font-size`、`start-font-weight`、`start-icon-size`
- ✅ docs：新增「開始按鈕」範例（`start` preview）、屬性表、Start 變體說明、無障礙說明

### 行為變更

- 既有 `target="_blank"` 的連結按鈕會多出螢幕閱讀器念的「（另開新視窗）」，畫面不變

### 驗證

- `pnpm build`、`pnpm check:components`（26 個）、`pnpm lint`、`tsc --noEmit` 通過
- 未在瀏覽器實測
