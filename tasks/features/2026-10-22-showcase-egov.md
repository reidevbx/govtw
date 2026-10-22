# showcase 新增第二站：我的E政府（egov）

## 問題分析

使用者要在 `apps/showcase` 補上 [我的E政府](https://www.gov.tw/) 的重構示範。原站資訊架構（2026-10-22 擷取）：

- 主選單：人生大事（出生、就學、就業、就養、終老）、日常生活（婚姻與身分、交通與旅遊、居住與環境、理財與納稅）、網站導覽
- 首頁區塊：系統公告 → 人生大事／日常生活分類 → 資訊快遞 → 推薦服務 → 精選櫥窗 → 即時影像 → 認識我們
- 頁尾：意見信箱、資訊安全政策、隱私權政策；客服專線、服務時間；主辦單位數位發展部

## 需求定義

- 新站 `egov`，網址前綴 `/egov/`
- 頁面：首頁、分類頁（9 個分類）、服務說明頁、資訊快遞列表
- 首頁保留原站主要區塊：系統公告、分類（tabs 切換人生大事／日常生活）、資訊快遞、推薦服務
- 精選櫥窗、即時影像、認識我們、E-GOV 小幫手不做（第一批範圍外）
- 內容為示範資料，標示「設計示範，非我的E政府官方網站」

## 實作計劃

1. `src/sites/egov/`：`site.ts`、`theme.css`、`Layout.astro`、`data/`（分類、服務、資訊快遞）
2. `src/pages/egov/`：`index.astro`、`category/[slug].astro`、`services/[id].astro`、`news/index.astro`
3. `src/pages/index.astro` 加入 egov
4. `pnpm build:showcase`、`pnpm lint`；確認 egov 主題不出現在 ey 與總覽頁

## 影響範圍

只新增 `apps/showcase/src/sites/egov/**`、`apps/showcase/src/pages/egov/**`，修改 `pages/index.astro`。

## 總結

- 完成：egov 站 17 頁：首頁、9 個分類頁、6 個服務說明頁、資訊快遞列表；總覽頁加入 egov
- 變更檔案：新增 `apps/showcase/src/sites/egov/**`、`apps/showcase/src/pages/egov/**`；修改 `apps/showcase/src/pages/index.astro`
- 驗證：`pnpm build:showcase` 成功（全站 26 頁）；egov 主題只出現在 `/egov/`，ey 主題只出現在 `/ey/`，總覽頁兩者皆無；`pnpm lint` 通過
- 用到的元件：notification-banner、search、tabs、card、document-list、tag、breadcrumbs、sidebar、side-navigation、cluster、inset-text、summary-list、warning-text、button（start）、back-link
- 後續建議：
  - 未做：精選櫥窗、即時影像、認識我們、E-GOV 小幫手、字級切換與分享
  - 品牌色沿用系統預設 blue；若要對齊原站配色需另外提供色碼
  - 資訊快遞目前只有列表，無內頁

## 追加：套用原站配色（2026-10-22）

- 問題：第一版沿用系統預設 blue，未對齊原站
- 色碼來源：`https://www.gov.tw/css/global.css`，出現次數最多的有彩色為 `#035a58`（208 次），另有 `#012928`、`#339e97`、`#e2fefd`
- 原站藍綠（H≈192、C≈0.07）與系統 teal（H170、C≥0.115）差距大，改在 `sites/egov/theme.css` 定義站點原色 `--egov-*`，再對應到 brand-primary、link-default、button-primary-bg、search-button-bg、site-hero-bg
- 暗色：brand / link 改用 `#339e97`，主視覺底改 `#012928`；按鈕底色固定 `#035a58`（白字對比 8.05）
- 驗證：`#035a58` 只出現在 `/egov/` 頁面，ey 與總覽頁沒有
