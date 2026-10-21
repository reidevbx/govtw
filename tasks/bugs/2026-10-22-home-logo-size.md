# 首頁 logo 與內頁 logo 大小一致

## 問題分析

- `custom.css` 設 logo `height: 56px; width: auto`。logo 比例 516:123，56px 高時約 235px 寬。
- 內頁（有 sidebar）在 ≥960px 時，navbar `.title` 寬度為 `--vp-sidebar-width`（272px）減左右 padding 64px，內容只剩 208px。
- VitePress `base.css` 對 `img` 設 `max-width: 100%`，logo 被壓到 208px 寬，SVG 等比縮放後實際約 208×50px。
- 首頁沒有 sidebar，不受限，維持 235×56px，所以比內頁大。

## 需求定義

首頁 logo 縮到與內頁同大小。

## 實作計劃

`custom.css` 在 ≥960px 時把 logo 寬度設為 `calc(var(--vp-sidebar-width) - 64px)`、`height: auto`。

## 影響範圍

- ≥960px 的 navbar logo（首頁變小，內頁不變）
- <960px 不變（原本兩者就一致）

## 總結

- 完成：≥960px 首頁與內頁 logo 都是 208px 寬
- 變更檔案：`apps/docs/.vitepress/theme/custom.css`
- 後續建議：視覺由使用者在 dev server 確認
