# 次要按鈕亮色模式改為灰色

## 問題分析

`button.secondary-bg` 引用 `bg.surface`、`secondary-border-color` 引用 `border.default`。這兩個 semantic token 亮色模式是淡藍（blue-2 / blue-4），暗色模式是灰（neutral-11 / neutral-9），兩種模式色相不一致。

## 需求定義

亮色模式次要按鈕改為灰色，與暗色模式一致。暗色模式外觀不變。

## 實作計劃

1. `tokens.json` 新增 semantic `bg.neutral`（亮 neutral-3 / 暗 neutral-11）、`border.neutral`（亮 neutral-5 / 暗 neutral-9）
2. `button.secondary-bg` / `secondary-border-color` 改引用新 token
3. `foundations/colour.md` 補兩個新 token 的色票
4. `pnpm build:tokens`、`pnpm sync:public`、`pnpm build:previews`

## 影響範圍

- `govtw-button` secondary（亮色模式）
- `bg.surface` / `border.default` 不動，其他元件不受影響

## 總結

- 完成：新增 `bg.neutral`、`border.neutral`；次要按鈕改用灰色
- 變更檔案：`packages/tokens/tokens.json`（與產出檔）、`apps/docs/foundations/colour.md`
- 後續建議：亮色值（neutral-3 / neutral-5）依暗色模式與畫布的亮度差推估，視覺由使用者確認
