# 修正 Safari 移除清單語意（7 個元件）

- **來源**：[contents-list 總結](../features/2026-10-14-contents-list-component.md)的後續建議

## 問題分析

Safari（WebKit）會把設了 `list-style: none` 的 `<ul>`／`<ol>` 當成一般文字，VoiceOver 不念「清單，N 項」。這是 WebKit 的刻意行為，明確加上 `role="list"` 可恢復清單語意。

以下 7 個元件隱藏清單符號，但沒有加 `role="list"`：

| 元件 | 清單來源 |
|---|---|
| breadcrumbs | 元件產生（light DOM 模板） |
| service-navigation | 元件產生（light DOM 模板） |
| pagination | 元件產生（模板） |
| page-tools | 元件產生（模板） |
| error-summary | 作者寫的清單 |
| side-navigation | 作者寫的清單（巢狀） |
| step-indicator | 作者寫的 `<ol>` |

## 需求定義

- 元件產生的清單：模板直接加 `role="list"`
- 作者寫的清單：包裝時對清單本身與其內所有 `<ul>`／`<ol>` 加 `role="list"`
- 抽出共用函式放在 `internal/light-dom.ts`，contents-list 改用它

### 驗收標準

- `pnpm build`、`pnpm check:components`、`pnpm lint`、`tsc` 通過
- 7 個元件與 contents-list 的清單都有 `role="list"`

## 實作計劃

- [x] `internal/light-dom.ts` 新增 `restoreListRole()`
- [x] 4 個模板清單加 `role="list"`
- [x] error-summary、side-navigation、step-indicator、contents-list 呼叫 `restoreListRole()`
- [x] 有寫無障礙說明的文件頁補一行
- [x] 驗證 → 追加「## 總結」

## 影響範圍

- 修改：`packages/web-components/src/internal/light-dom.ts` 與 8 個元件檔

## 總結

### 完成項目

- `internal/light-dom.ts` 新增 `restoreListRole()`：對元素本身及其內所有 `<ul>`／`<ol>` 加 `role="list"`
- 模板直接加 `role="list"`：breadcrumbs、pagination、page-tools、service-navigation
- 包裝時呼叫 `restoreListRole()`：error-summary、side-navigation（含巢狀）、step-indicator、contents-list（改用共用函式）
- 7 個元件的文件頁「無障礙」段補上說明

### 變更檔案

- `packages/web-components/src/internal/light-dom.ts`
- `packages/web-components/src/govtw-{breadcrumbs,pagination,page-tools,service-navigation,error-summary,side-navigation,step-indicator,contents-list}.ts`
- `apps/docs/components/{breadcrumbs,pagination,page-tools,service-navigation,error-summary,side-navigation,step-indicator}.md`

### 後續建議

- 未用 Safari + VoiceOver 實測修正前後的差異
- 之後新增隱藏清單符號的元件，要記得加 `role="list"`；可考慮寫進 `.claude/skills/new-component/SKILL.md` 的檢查清單
