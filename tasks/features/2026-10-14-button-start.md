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

- [ ] 決定「待確認」各項
- [ ] 修改 `packages/web-components/src/govtw-button.ts`
- [ ] 更新對應 docs 頁的範例與屬性表
- [ ] `pnpm build:previews` → `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 修改：`packages/web-components/src/govtw-button.ts` 與對應 docs 頁
- 既有使用者行為可能改變，需在 docs 註明
