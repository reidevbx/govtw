# 修正 govtw-button type="submit" 無法送出表單

- **來源**：撰寫[模式](../docs/2026-10-14-patterns-decisions.md)「表單錯誤處理」時，讀 `govtw-button.ts` 發現

## 問題分析

`<govtw-button type="submit">` 在 Shadow DOM 內渲染原生 `<button type="submit">`。依 HTML 規範，Shadow DOM 內的按鈕不屬於外面 light DOM 的 `<form>`，按下時表單不會送出。`type="reset"` 同理。

元件沒有 `formAssociated`，也沒有自己呼叫表單的送出。

影響：
- pagination 文件「結果筆數與每頁筆數」範例的「套用」按鈕
- 所有用 `govtw-button` 送出的表單

## 需求定義

- `static formAssociated = true` + `attachInternals()`，取得所屬的 `<form>`
- 點擊時：`type="submit"` 呼叫 `form.requestSubmit()`；`type="reset"` 呼叫 `form.reset()`
- `requestSubmit()` 會跑表單驗證並觸發 `submit` 事件，與原生按鈕一致
- 有 `href`（渲染成 `<a>`）時不處理

### 限制

- 不傳 submitter：`requestSubmit(submitter)` 只接受原生送出按鈕，傳自訂元素會丟出 TypeError。後果是按鈕的 `name`／`value` 不會跟著送出；元件本來就沒有這兩個屬性
- 文字欄位內按 Enter 送出（implicit submission）是否正常，未在瀏覽器確認，不在本次範圍

### 驗收標準

- `tsc`、`pnpm build`、`pnpm check:components`、`pnpm lint` 通過

## 實作計劃

- [x] `govtw-button.ts` 加 `formAssociated`、`attachInternals()`、點擊處理
- [x] button 文件補說明（屬性表 `type`、限制）
- [x] 驗證 → 追加「## 總結」

## 影響範圍

- 修改：`packages/web-components/src/govtw-button.ts`、`apps/docs/components/button.md`

## 總結

### 完成項目

- `govtw-button` 加 `static formAssociated = true` 與 `attachInternals()`
- 內部 `<button>` 點擊時：`type="submit"` 呼叫 `form.requestSubmit()`，`type="reset"` 呼叫 `form.reset()`；不在表單內則不動作
- 停用時內部 `<button disabled>` 不觸發點擊，所以不會送出
- button 文件屬性表補 `type`，新增「在表單中使用」段與限制說明

### 變更檔案

- `packages/web-components/src/govtw-button.ts`
- `apps/docs/components/button.md`

### 後續建議

- 未在瀏覽器實測送出；請在 pagination「結果筆數與每頁筆數」範例按「套用」，網址應帶上 `?per-page=`
- 文字欄位內按 Enter 是否送出表單，需在瀏覽器確認。不會的話另開任務，在表單元件內攔 Enter 並呼叫 `requestSubmit()`
