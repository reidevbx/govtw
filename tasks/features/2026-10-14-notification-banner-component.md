# 新增 通知橫幅 Notification Banner 元件（`govtw-notification-banner`）

- **優先度**：P1
- **參考**：[GOV.UK Notification Banner](https://design-system.service.gov.uk/components/notification-banner/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 全國政府入口網 gov.tw：https://www.gov.tw/ — 浮動「系統公告」；第一個「關閉」是沒有 href 的 `<a>`，鍵盤無法操作
- 財政部稅務入口網：https://www.etax.nat.gov.tw/ — 反詐騙公告、設備維護通知
- 監理服務網：https://www.mvdis.gov.tw/ — `table.msg_box_warning`，關閉鈕是 `<a href="#">X</a>`
- 台北服務通：https://service.gov.taipei/ — 「線上服務移轉至台北服務通」公告
- 勞保局：https://www.bli.gov.tw/ — 頁尾 DOM 留著 110 年的過期 lightbox

### 現況問題

- 關閉鈕沒有可讀名稱，或鍵盤無法操作
- 過期公告沒有下架
- 用排版表格實作

## 需求定義

- variant：`info`（一般公告）、`success`（操作成功）
- slot：標題、內容
- `success` 時加 `role="alert"` 並自動 focus
- 是否可關閉需決定；若可關閉，關閉鈕用 `<button aria-label="關閉通知">`

### 無障礙

- WCAG 2.2 AA 為最低標準
- `role="region"` + `aria-labelledby`（info）
- `role="alert"`（success）

### 待確認（動手前需決定）

1. 要不要支援「可關閉」？GOV.UK 不支援，但台灣維護公告常見

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [x] 決定「待確認」各項
- [x] `pnpm new:component notification-banner --type=basic --zh-name=通知橫幅`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-notification-banner-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-notification-banner.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/notification-banner.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-notification-banner.ts`、`apps/docs/components/notification-banner.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `warning-text`
- `panel`

## 總結

### 完成項目

- ✅ 依 [P1 決定表](./2026-10-14-p1-decisions.md) N1–N3
- ✅ `govtw-notification-banner`：`type="info"` 為 `role="region"`；`type="success"` 為 `role="alert"` 並自動聚焦
- ✅ `heading` 屬性，預設 info「重要訊息」、success「成功」
- ✅ `dismissible` 顯示 44×44px 原生關閉按鈕（`aria-label="關閉通知"`）；可取消的 `govtw-dismiss` 事件；元件不記住關閉狀態
- ✅ docs 頁（`default`、`success`、`dismissible` 三個 preview）

### 與決定表的差異

- 新增 N3 `no-autofocus`：文件頁的 success 範例若自動聚焦，會在載入時搶焦點並捲動頁面。已補進決定表

### 驗證

- 對比度：白字對 blue.9 為 9.21:1、對 green.8 為 5.97:1（淺色）；深色主題 neutral.12 對 blue.6 為 6.88:1、對 green.5 為 10.05:1
- `pnpm build`、`pnpm check:components`（27 個）、`pnpm lint`、`tsc --noEmit` 通過
- 未在瀏覽器實測
