# 新增 摘要清單 Summary List 元件（`govtw-summary-list`）

- **優先度**：P1
- **參考**：[GOV.UK Summary List](https://design-system.service.gov.uk/components/summary-list/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 全國政府入口網 gov.tw：https://www.gov.tw/News_Content_2_775901 — div 模擬表格列出服務內容、申辦流程、應備物品、聯絡窗口
- 臺北市政府：https://www.gov.taipei/ — FAQ 內頁：點閱數、資料更新、維護單位、發布日期
- 高雄市政府：https://www.kcg.gov.tw/ — 新聞內頁：發布期間、承辦人、聯絡電話

### 現況問題

- 用 div 模擬表格，沒有語意

## 需求定義

- 使用 `<dl>`、`<dt>`、`<dd>`
- 每列可選「變更」動作連結（確認頁用）
- 變更連結含視覺隱藏文字，例如「變更<span>姓名</span>」
- 變體：無邊框（內容頁資訊欄用）

### 無障礙

- WCAG 2.2 AA 為最低標準
- `<dl>` 語意
- 每個「變更」連結名稱需唯一

### 待確認（動手前需決定）

1. 子元素 API：用 `<govtw-summary-list-row>` 子元件，還是直接傳 `<dl>`？

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component summary-list --type=basic --zh-name=摘要清單`
- [ ] 補 `packages/web-components/vite.config.ts` entry（scaffolder 已知缺漏）
- [ ] 修 sidebar 英文名空格：「摘要清單 Summary List」（scaffolder 已知缺漏）
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-summary-list-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-summary-list.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/summary-list.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-summary-list.ts`、`apps/docs/components/summary-list.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `panel`
- `table`
