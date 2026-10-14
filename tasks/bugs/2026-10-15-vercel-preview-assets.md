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

- [x] 新增 `vercel.json`
- [x] commit、push，等 Vercel 部署
- [x] curl 驗證 → 追加「## 總結」

## 影響範圍

- 新增：`apps/docs/vercel.json`

## 總結

### 完成項目

- `apps/docs/vercel.json` 讓 Vercel 跑完整的 `pnpm build`（含 `build:components`、`sync:public`、`build:previews`）
- 部署 `dpl_9bWeLFwogYAnr8bP7KvzHbAiho9k` 成功；`/gov-tw.iife.js`、`/tokens.css` 由 404 變 200
- 以無頭瀏覽器載入線上 125 頁預覽：0 錯誤、0 個未註冊元件

### 過程中的錯誤

- 第一次把 `vercel.json` 放在 repo 根目錄（`9b86d02`）。Vercel 的 Root Directory 是 `apps/docs`，沒讀到設定，部署失敗：「No Output Directory named "dist" found」
- `62b4815` 只搬了檔案，內容沒加進去；`1fe5d79` 補上正確內容

### 變更檔案

- 新增：`apps/docs/vercel.json`

### 後續建議

- 這個問題從 `96de705`（2026-04-24）起就存在，期間線上預覽頁都缺元件
- Vercel 專案設定裡的 Build Command、Output Directory 若有手動填值，`vercel.json` 會覆寫它們；可以清掉避免混淆
