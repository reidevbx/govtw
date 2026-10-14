# Pagination 新增結果計數與每頁筆數

- **優先度**：P2
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

- moda：「共 389 筆資料，第 1/26 頁，每頁顯示 [select] 筆」
- 臺北：10/20/50/100/200 純文字連結，看不出目前選哪個
- moi：每頁筆數 select 沒有可見標籤；總筆數顯示成「_/_2361」
- 目前 `govtw-pagination` 已有 `aria-current`，只缺計數與筆數

## 需求定義

- 選用的結果計數文字：「共 N 筆，第 X / Y 頁」
- 每頁筆數選擇建議用獨立的 `govtw-select` + 送出按鈕組合，不塞進 pagination

### 待確認（動手前需決定）

1. 做成 pagination 屬性，還是只在文件示範組合？建議後者

## 實作計劃

- [ ] 決定「待確認」各項
- [ ] 修改 `packages/web-components/src/govtw-pagination.ts`
- [ ] 更新對應 docs 頁的範例與屬性表
- [ ] `pnpm build:previews` → `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 修改：`packages/web-components/src/govtw-pagination.ts` 與對應 docs 頁
- 既有使用者行為可能改變，需在 docs 註明
