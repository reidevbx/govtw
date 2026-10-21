# 暗色模式搜尋按鈕文字對比不足

## 問題分析

`search.button-bg` 引用 Primitive `blue.8`（各主題固定），`search.button-color` 引用 Semantic `text.on-primary`（暗色模式為 neutral-12 近黑）。暗色模式變成藍底黑字。

## 需求定義

搜尋按鈕文字各主題固定白色，與底色配對。

## 實作計劃

`tokens.json` 的 `search.button-color` 改為 `{primitive.color.neutral.1}`；`pnpm build:tokens`、`pnpm sync:public`。

## 影響範圍

`govtw-search` 按鈕（亮色不變，暗色改白字）。

## 總結

- 完成：`search.button-color` 改引用 `primitive.color.neutral.1`
- 變更檔案：`packages/tokens/tokens.json`、`packages/tokens/tokens.css`、`apps/docs/public/tokens.css`
