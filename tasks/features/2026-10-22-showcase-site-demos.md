# 新增 apps/showcase：政府網站重構示範（第一站：行政院）

## 問題分析

- 設計系統目前只有文件站一個使用者，缺少「真實網站」驗證元件與 token 是否足夠
- 使用者要用本系統做多個政府網站的重構示範，要求：每站有自己的樣式與頁面、不影響設計系統
- 每站一個 app 會重複 Astro 設定、layout、版面 CSS，且每站要各開一個部署專案

## 需求定義

- 新增單一應用 `apps/showcase`，以 workspace 套件方式使用 `@gov-tw/web-components`、`@gov-tw/tokens`
- 每個示範網站一個資料夾 `src/sites/<站>/`，網址前綴 `/<站>/`
- 每站主題只在該站頁面載入，不影響其他站與總覽頁
- 不修改 `packages/`、`tokens.json`、`apps/docs`
- 內容使用示範資料，每頁標示「設計示範，非 XX 官方網站」，`noindex`
- 第一站：行政院（`ey`），首頁、新聞列表、新聞內頁、一般內容頁
- 某站要正式上線交接給機關時，再拆成獨立 app

## 結構

```
apps/showcase/src/
  layouts/Document.astro   html 骨架、載入 tokens.css + base.css + web-components
  layouts/Site.astro       示範站共用骨架（示範橫幅、header、footer），讀 SiteConfig
  styles/base.css          共用版面，--site-* token 預設值
  sites/types.ts           SiteConfig 型別
  sites/ey/site.ts         名稱、選單、footer 設定
  sites/ey/theme.css       ey 主題（token 層）
  sites/ey/Layout.astro    引入 theme.css 並包 Site.astro
  sites/ey/data/news.ts    示範資料
  pages/index.astro        示範總覽
  pages/ey/**              ey 頁面
```

## Token 規則對照

- `sites/<站>/theme.css` 屬於 token 層（等同主題），可引用 Primitive 覆寫 Semantic / Component / `--site-*`
- `styles/base.css` 與頁面只用 Semantic / Component / `--site-*` token，不直接用 Primitive

## 影響範圍

- 新增 `apps/showcase/**`
- 根目錄 `package.json`（`dev:showcase`、`build:showcase`）、`.gitignore`、`pnpm-lock.yaml`

## 總結

- 完成：`apps/showcase`（Astro 7.4.2），共 9 頁：`/`（總覽）、`/ey/`、`/ey/news/`、`/ey/news/1~5/`、`/ey/about/`
- 驗證：
  - `pnpm build:showcase` 成功
  - 總覽頁只載入共用 CSS，不含 ey 主題覆寫；ey 頁在共用 CSS 之後內嵌 ey 主題（teal-8 覆寫在 tokens 的 blue-8 之後）
  - `src` 中只有 `sites/ey/theme.css` 引用 Primitive
  - `pnpm lint` 通過；`packages/`、`apps/docs` 無變更
- 新增一站的步驟：建 `src/sites/<站>/`（`site.ts`、`theme.css`、`Layout.astro`、`data/`）→ 建 `src/pages/<站>/` → 在 `pages/index.astro` 的 `sites` 加一筆
- 後續建議：
  - ey 主題色 teal 為佔位，需依行政院識別規範調整
  - logo 目前為文字，需取得授權的 logo 檔
  - 部署需另開 Vercel 專案，Root Directory 設 `apps/showcase`
  - 視覺由使用者以 `pnpm dev:showcase` 確認

## 追加：總覽頁列出所有重構頁面（2026-10-22）

- `SiteConfig` 新增 `origin`（原站網址）；`types.ts` 新增 `PageGroup`
- 各站新增 `src/sites/<站>/pages.ts`，由資料檔產生頁面清單（新增新聞／服務自動列入）
- `src/pages/index.astro`：目錄（contents-list）＋ 每站「進入示範」「原站」連結 ＋ 頁面表格（類型、頁面、網址）
- 驗證：表格 25 列 = ey 8 頁 + egov 17 頁；所有網址皆對應到 dist 中的頁面；`pnpm lint` 通過
- 新增一站時，步驟多一項：建 `pages.ts` 並在總覽頁 `sites` 加入 `groups`

## 追加：部署設定（2026-10-22）

- 新增 `apps/showcase/vercel.json`：`buildCommand` 為 `cd ../.. && pnpm build:showcase`，`outputDirectory` 為 `dist`
- 部署方式：Vercel 另開專案，同 repo，Root Directory 設 `apps/showcase`（需使用者於 Vercel 後台操作）
- 是否公開、是否開啟 Deployment Protection 由使用者決定
