# 新增 頁尾 Footer 元件（`govtw-footer`）

- **優先度**：P0
- **參考**：[GOV.UK Footer](https://design-system.service.gov.uk/components/footer/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 全國政府入口網 gov.tw：https://www.gov.tw/ — 地址、電話、隱私權政策、無障礙標章、更新日期（民國年）、瀏覽人次
- 數位發展部：https://moda.gov.tw/ — 收合式網站地圖、CC0 授權、民意信箱
- 勞保局：https://www.bli.gov.tw/ — fat footer 加展開切換鈕、訪客計數器（iframe）
- 臺北市政府：https://www.gov.taipei/ — 1999 熱線、社群 icon、QR code、無障礙標章 A2.1
- 高雄市政府：https://www.kcg.gov.tw/ — 瀏覽人次（空值）、約 27 個 icon 外部連結

### 現況問題

- 展開切換鈕沒有 `aria-expanded`，文字同時寫「選單展開 選單關閉」（bli）
- 連結文字是英文「find facebook」（臺北）
- 「開新視窗」與「另開新視窗」混用
- 更新日期、瀏覽人次由 JS 填入，抓到空值

## 需求定義

- 政府網站固定欄位：機關名稱、地址、電話、服務時間、隱私權政策、資訊安全政策、政府網站資料開放宣告
- 無障礙標章 slot：固定 alt 文案與連結格式
- 更新日期：使用 `<time datetime>`，顯示格式由使用者決定（民國年或西元年）
- 選用區塊：網站地圖連結群組、社群連結、授權宣告

### 無障礙

- WCAG 2.2 AA 為最低標準
- 使用 `<footer>` 地標，頁面只能有一個 contentinfo
- 無障礙標章圖片 alt 需寫明等級

### 待確認（動手前需決定）

1. 瀏覽人次是否納入（建議不納入，屬站台後端功能）
2. 無障礙標章的官方 alt 文案與連結網址需查證

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component footer --type=layout --zh-name=頁尾`
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-footer-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-footer.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/footer.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-footer.ts`、`apps/docs/components/footer.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `header`
- `accesskey`
