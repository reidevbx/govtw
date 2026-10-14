# Link 新增外部連結提示

- **優先度**：P1
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

- 所有網站都只用 title 屬性提示「另開新視窗」，螢幕閱讀器不一定念出
- 括號與文案不一致：「（另開新視窗）」「[另開新視窗]」「開新視窗」「另開視窗」
- 目前 `govtw-link` 只有 `href`、`target`、`rel`、`no-visited`、`no-underline`，沒有外連提示

## 需求定義

- `target="_blank"` 時自動加可見文字「（另開新視窗）」，或至少加視覺隱藏文字
- `rel="noopener noreferrer"` 已自動補上（`govtw-link.ts:93`），不用再做
- 文案統一為「（另開新視窗）」

### 待確認（動手前需決定）

1. 提示要可見還是只給螢幕閱讀器？GOV.UK 建議可見文字

## 實作計劃

- [x] 決定「待確認」各項
- [x] 修改 `packages/web-components/src/govtw-link.ts`
- [x] 更新對應 docs 頁的範例與屬性表
- [x] `pnpm build:previews` → `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 修改：`packages/web-components/src/govtw-link.ts` 與對應 docs 頁
- 既有使用者行為可能改變，需在 docs 註明

## 總結

### 完成項目

- ✅ 依 [P1 決定表](./2026-10-14-p1-decisions.md) L1、L2：`target="_blank"` 時在連結文字後加可見的「（另開新視窗）」；新增 `no-new-window-text` 屬性可關閉
- ✅ `rel="noopener noreferrer"` 原本就會自動補（`govtw-link.ts:93`），未變動
- ✅ 更新 4 處原本手寫「（另開新視窗）」的範例，避免文字重複：`link.md` 2 處、`typography.md` 1 處（`link.md` 的 new-tab preview 一併重生）

### 行為變更

- **既有使用者受影響**：所有 `target="_blank"` 的 `<govtw-link>` 都會多出「（另開新視窗）」。若連結文字原本已手寫此提示，會重複出現，需移除手寫文字或加 `no-new-window-text`

### 驗證

- `pnpm build`、`pnpm check:components`（26 個）、`pnpm lint`、`tsc --noEmit` 通過
- 未在瀏覽器實測
