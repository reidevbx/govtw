# 按鈕移除底部陰影按壓效果

## 問題分析

`govtw-button` 底部有 3px inset box-shadow（看起來像下底線），按下時陰影消失模擬按壓。使用者不要這個效果。

## 需求定義

- 移除預設、focus、disabled 狀態的底部 inset shadow
- 移除 active 時「陰影消失」的按壓效果；保留 hover / active 背景加深
- focus ring 保留

## 實作計劃

1. `packages/web-components/src/govtw-button.ts`：刪除 `box-shadow: inset ...`、`--_shadow-color`、active 與 disabled:active 的 shadow 規則；focus 只留外框 ring
2. `apps/docs/components/button.md`：更新 Active 說明、demo script、無障礙段落
3. `pnpm build:components`、`pnpm build:previews`、`pnpm lint`

## 影響範圍

- 所有 `govtw-button` variant（primary / start / secondary / danger）
- 按鈕文件頁

## 總結

- 完成：移除 inset 底部陰影與按壓效果；active 狀態改由背景加深表示
- 變更檔案：`packages/web-components/src/govtw-button.ts`、`apps/docs/components/button.md`
- 後續建議：視覺由使用者在 dev server 確認
