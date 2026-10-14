# 新增 卡片 Card 元件（`govtw-card`）

- **優先度**：P2
- **參考**：GOV.UK 無對應元件（台灣自訂）
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 全國政府入口網 gov.tw：https://www.gov.tw/ — 「推薦服務」圖 + 標題 + 分類
- 臺北市政府：https://www.gov.taipei/ — 「需要什麼服務」卡片格，含子連結與「更多」
- 高雄市政府：https://www.kcg.gov.tw/ — 「貼心e服務」11 類
- 台北服務通：https://service.taipei/ — 5 張服務卡，連到外部網域但沒有提示

### 現況問題

- 卡片說明只放在 title
- 「更多」連結文字重複
- 外連沒有提示

## 需求定義

- slot：標題（含連結）、說明、圖片（選用）
- 整張卡可點時，只有標題是連結，用 CSS 擴大點擊區
- 「更多」連結需含視覺隱藏的描述文字
- 搭配 Cluster 或 CSS Grid 排成卡片格

### 無障礙

- WCAG 2.2 AA 為最低標準
- 不把整張卡包在 `<a>` 裡（避免螢幕閱讀器念整段）
- 圖片 alt 必填或明確設為裝飾

### 待確認（動手前需決定）

1. GOV.UK 沒有 Card 元件；是否改用「服務清單」pattern 取代？

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [x] 決定「待確認」各項
- [x] `pnpm new:component card --type=basic --zh-name=卡片`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-card-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-card.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/card.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-card.ts`、`apps/docs/components/card.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `document-list`

## 總結

依 [P2 決定表](./2026-10-14-p2-decisions.md) CD1–CD3 完成。

### 完成項目

- 做卡片；設計指引寫明沒有圖片時改用連結清單（CD1）
- `heading`、`href`、`heading-level` 屬性，說明用 default slot，圖片用 `slot="image"`；標題連結的 `::after` 擴大到整張卡（CD2）
- 文件寫明卡片圖片設 `alt=""`（CD3）

### 實作時新增

- `target="_blank"` 時標題後加可見的「（另開新視窗）」，與 link 元件一致。理由：調查發現台北服務通的卡片連到外部網域沒有提示
- 聚焦時整張卡加黑框，讓使用者看出點擊範圍

### 變更檔案

- `packages/web-components/src/govtw-card.ts`（新）
- `packages/tokens/tokens.json`：`card` 16 個 token
- `apps/docs/components/card.md`（新）
- scaffolder 更新的 `index.ts`、`package.json`、`vite.config.ts`、`config.mts`

### 後續建議

- 在瀏覽器確認：點卡片任何位置都會開啟連結；聚焦框在圓角處的顯示
