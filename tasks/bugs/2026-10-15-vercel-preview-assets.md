# 修正線上站獨立預覽頁缺少元件與 token

## 問題分析

使用者回報（截圖，2026-10-15）：`govtw.vercel.app/preview/button/default.html` 只顯示純文字，按鈕沒有樣式。

- `/preview/button/default.html` 回 200，但 `/gov-tw.iife.js`、`/tokens.css` 回 404
- 這 2 個檔案在 `.gitignore` 第 8–9 行（`96de705`，2026-04-24），由 `pnpm build` 的 `sync:public` 產生
- repo 沒有 `vercel.json`，推測 Vercel 只跑 `vitepress build`，沒跑 `build:components` 與 `sync:public`
- 本機 dev server 125 頁預覽以無頭瀏覽器檢查皆正常

## 需求定義

- `apps/docs/vercel.json`：`buildCommand` 為 `cd ../.. && pnpm build`，`outputDirectory` 為 `.vitepress/dist`
- Vercel 專案的 Root Directory 是 `apps/docs`（建置紀錄的 install 指令為 `cd ../.. && pnpm install`），設定檔要放在這層

### 驗收標準

- 部署後 `/gov-tw.iife.js`、`/tokens.css` 回 200
- 線上預覽頁的元件有註冊

## 實作計劃

- [ ] 新增 `vercel.json`
- [ ] commit、push，等 Vercel 部署
- [ ] curl 驗證 → 追加「## 總結」

## 影響範圍

- 新增：`apps/docs/vercel.json`
