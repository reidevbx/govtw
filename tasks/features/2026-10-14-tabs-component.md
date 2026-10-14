# 新增 頁籤 Tabs 元件（`govtw-tabs`）

- **優先度**：P1
- **參考**：[GOV.UK Tabs](https://design-system.service.gov.uk/components/tabs/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 數位發展部：https://moda.gov.tw/ — 首頁公告 5 個頁籤，有 `role=tablist/tab/tabpanel`
- 勞保局：https://www.bli.gov.tw/ — `<a href="javascript:;">`，只靠 `.current` class
- 監理服務網：https://www.mvdis.gov.tw/m3-emv-vil/vil/penaltyQueryPay — `<span onclick>` 包 GIF，**鍵盤無法操作**
- 臺北市政府：https://www.gov.taipei/ — `#Group_` 錨點，沒有 role
- 全國政府入口網 gov.tw：https://www.gov.tw/News_LifeEvent_8 — 把 `role="tab"` 用在可複選的篩選項

### 現況問題

- 多數沒有 tab 語意與鍵盤操作
- 頁籤文字做成圖片（mvdis）
- `role="tab"` 用在篩選（gov.tw），語意錯誤

## 需求定義

- WAI-ARIA Tabs pattern：左右方向鍵切換、Home/End
- 沒有 JS 時退化成錨點目錄加全部面板
- 窄螢幕退化成垂直清單
- 子元件 API：`<govtw-tab-panel label="...">`

### 無障礙

- WCAG 2.2 AA 為最低標準
- `role="tablist"`、`tab`、`tabpanel`、`aria-selected`、`aria-controls`
- roving tabindex

### 待確認（動手前需決定）

1. GOV.UK 只建議用在使用者需要切換比較的情境；文件需寫明「篩選不要用頁籤」

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component tabs --type=basic --zh-name=頁籤`
- [ ] 補 `packages/web-components/vite.config.ts` entry（scaffolder 已知缺漏）
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-tabs-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-tabs.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/tabs.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-tabs.ts`、`apps/docs/components/tabs.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `accordion`
