# 元件按鈕色與文件站首頁按鈕一致

## 問題分析

首頁 hero brand 按鈕用 `--vp-c-brand-3`（= brand-primary blue-9 加深 20%，約等於 blue-10）。`govtw-button` primary 用 blue-8，兩者顏色不同。CLAUDE.md 對 custom.css 綁定範圍的描述也與程式碼不符。

## 需求定義

- 以首頁按鈕色為準，元件 primary 按鈕改成同色
- 兩者共用同一個 token，之後只改一處

## 實作計劃

1. `tokens.json`：`button.primary-bg` 改為 `{primitive.color.blue.10}`，`pnpm build:tokens`
2. `custom.css`：`--vp-button-brand-*` 綁到 `--govtw-button-primary-*`，hover/active 用元件同比例加深
3. CLAUDE.md：更新 custom.css 綁定範圍描述
4. `pnpm sync:public`、`pnpm lint`

## 影響範圍

- 所有使用 primary / start variant 的 `govtw-button`
- 文件站首頁 hero brand 按鈕（hover 由變亮改為變暗）

## 總結

- 完成：元件 primary 按鈕改 blue-10；首頁 brand 按鈕改引用元件 token
- 變更檔案：`packages/tokens/tokens.json`（及產出的 tokens.css / tailwind.css）、`apps/docs/.vitepress/theme/custom.css`、`CLAUDE.md`
- 後續建議：首頁 alt 按鈕（「元件」）仍為 VitePress 灰色，若要對齊 secondary variant 需另外綁定

## 追加調整（2026-10-22）

- 使用者回饋 blue-10 在亮色與暗色模式都太暗
- `button.primary-bg` 改回 `{primitive.color.blue.8}`（#0064a6，白字對比 6.04，符合 AA 的最亮選項）
- 首頁 brand 按鈕仍引用 `--govtw-button-primary-bg`，跟著變；brand-primary 不變
