# 暗色模式 primary 按鈕文字對比不足

## 問題分析

- `button.primary-bg` 引用 primitive `blue.10`，暗色模式不變。
- `button.primary-color` 引用 semantic `text.on-primary`，暗色模式改為 `neutral.12`（近黑）。
- 暗色模式下變成深藍底黑字，對比不足。影響 `govtw-button` primary / start 與首頁 hero brand 按鈕。

## 需求定義

暗色模式 primary 按鈕文字維持白色。

## 實作計劃

`tokens.json` 的 `button.primary-color` 改為 `{primitive.color.neutral.1}`，與固定的 bg 配對；`pnpm build:tokens`、`pnpm sync:public`。

## 影響範圍

- `govtw-button` primary / start（亮色模式不變，原本就是 neutral-1）
- 首頁 hero brand 按鈕（透過 `--vp-button-brand-text` 引用）

## 總結

- 完成：primary 按鈕字色固定為 neutral-1
- 變更檔案：`packages/tokens/tokens.json`、`packages/tokens/tokens.css`、`apps/docs/public/tokens.css`
- 後續建議：`search.button-bg`（primitive blue-8）＋ `text-on-primary` 有同樣問題，未處理
