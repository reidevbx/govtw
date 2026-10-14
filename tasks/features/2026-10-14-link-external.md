# Link 新增外部連結提示

- **優先度**：P1
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

- 所有網站都只用 title 屬性提示「另開新視窗」，螢幕閱讀器不一定念出
- 括號與文案不一致：「（另開新視窗）」「[另開新視窗]」「開新視窗」「另開視窗」
- 目前 `govtw-link` 只有 `href`、`target`、`rel`、`no-visited`、`no-underline`，沒有外連提示

## 需求定義

- `target="_blank"` 時自動加可見文字「（另開新視窗）」，或至少加視覺隱藏文字
- 自動補 `rel="noopener noreferrer"`
- 文案統一為「（另開新視窗）」

### 待確認（動手前需決定）

1. 提示要可見還是只給螢幕閱讀器？GOV.UK 建議可見文字

## 實作計劃

- [ ] 決定「待確認」各項
- [ ] 修改 `packages/web-components/src/govtw-link.ts`
- [ ] 更新對應 docs 頁的範例與屬性表
- [ ] `pnpm build:previews` → `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 修改：`packages/web-components/src/govtw-link.ts` 與對應 docs 頁
- 既有使用者行為可能改變，需在 docs 註明
