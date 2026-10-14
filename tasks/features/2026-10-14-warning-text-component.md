# 新增 警告文字 Warning Text 元件（`govtw-warning-text`）

- **優先度**：P1
- **參考**：[GOV.UK Warning Text](https://design-system.service.gov.uk/components/warning-text/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 內政部戶政司：https://www.ris.gov.tw/apply-idCardChange/app/aw070402/main — `alert alert-info`：密碼輸錯 3 次鎖定、異體字須臨櫃
- 勞保局：https://www.bli.gov.tw/0014162.html — 重要限制與背景資訊混在同一長清單
- 台北服務通：https://service.gov.taipei/ — 「搜尋結果僅供參考，補助資格以政府審核為準」

### 現況問題

- 重要警告沒有視覺分級，和一般說明混在一起

## 需求定義

- 驚嘆號圖示 + 粗體文字
- 圖示加視覺隱藏文字「警告」
- 內容透過 default slot 傳入

### 無障礙

- WCAG 2.2 AA 為最低標準
- 不依賴顏色或圖示作為唯一指示：視覺隱藏文字「警告」必備

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component warning-text --type=basic --zh-name=警告文字`
- [ ] 補 `packages/web-components/vite.config.ts` entry（scaffolder 已知缺漏）
- [ ] 修 sidebar 英文名空格：「警告文字 Warning Text」（scaffolder 已知缺漏）
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-warning-text-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-warning-text.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/warning-text.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-warning-text.ts`、`apps/docs/components/warning-text.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `inset-text`
- `notification-banner`
