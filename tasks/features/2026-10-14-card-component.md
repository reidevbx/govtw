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

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component card --type=basic --zh-name=卡片`
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-card-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-card.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/card.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-card.ts`、`apps/docs/components/card.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `document-list`
