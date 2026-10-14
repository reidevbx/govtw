# 新增 跳至主要內容 Skip Link 元件（`govtw-skip-link`）

- **優先度**：P0
- **參考**：[GOV.UK Skip Link](https://design-system.service.gov.uk/components/skip-link/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 全國政府入口網 gov.tw：https://www.gov.tw/ — 「跳到主要內容區塊」
- 數位發展部：https://moda.gov.tw/ — visually-hidden-focusable
- 勞保局：https://www.bli.gov.tw/ — `a.firstGoTo.ScreenReadersOnly`「移至主要內容區」
- 監理服務網：https://www.mvdis.gov.tw/ — **沒有 skip link**

### 現況問題

- mvdis 完全沒有 skip link
- gov.tw、bli 內頁另有「跳過此子選單列請按[Enter]，繼續則按[Tab]」，可見文字只有底線

## 需求定義

- 頁面第一個可聚焦元素；平時隱藏，聚焦時顯示
- `href` 指向主內容 id（預設 `#main-content`）
- 文案固定「跳至主要內容」，全站一致
- 目標元素需可接收焦點（文件說明加 `tabindex="-1"`）

### 無障礙

- WCAG 2.2 AA 為最低標準
- WCAG 2.2 SC 2.4.1 Bypass Blocks
- focus 時顯示，使用 `#fd0` focus ring

### 待確認（動手前需決定）

1. 與「導盲磚」是否合併成同一個元件，或分開兩個元件（建議分開）

### 決定（2026-10-14）

- skip-link 與導盲磚**分開**成兩個元件：前者是 WCAG 2.4.1 的標準做法，後者是台灣慣例
- 使用 Shadow DOM（`delegatesFocus`），內部渲染原生 `<a>`
- 點擊時把焦點移到目標元素；目標不可聚焦時暫時加 `tabindex="-1"`，失焦後移除（同 GOV.UK 做法）
- 目標查找先用元件所在的 root（`getRootNode()`），找不到再用 `document`，讓 DemoBlock 的 Shadow DOM 內也能運作

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [x] 決定「待確認」各項（見「決定」段）
- [x] `pnpm new:component skip-link --type=basic --zh-name=跳至主要內容`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-skip-link-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-skip-link.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/skip-link.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-skip-link.ts`、`apps/docs/components/skip-link.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `accesskey`
- `header`

## 總結

### 完成項目

- ✅ `govtw-skip-link`：Shadow DOM + `delegatesFocus`，未聚焦時以 `clip-path` 視覺隱藏
- ✅ 點擊後把焦點移到目標；目標不可聚焦時暫時加 `tabindex="-1"`，失焦後移除
- ✅ 目標查找先用 `getRootNode()` 再退回 `document`，DemoBlock 內可運作
- ✅ 預設文字「跳至主要內容」，可用 default slot 改寫
- ✅ docs 頁與 preview（`variant="default"`）

### 驗證

- `pnpm build`、`pnpm check:components`（16 個全部完整）、`pnpm lint`、`tsc --noEmit` 通過
- **未在瀏覽器實測**：聚焦顯示、焦點移動、高對比模式，交由使用者確認

### 變更檔案

- `packages/web-components/src/govtw-skip-link.ts` — 新增
- `apps/docs/components/skip-link.md`、`apps/docs/public/preview/skip-link/default.html` — 新增
- `packages/tokens/tokens.json` — 新增 `skip-link` component token
- `index.ts`、`package.json`、`vite.config.ts`、`config.mts` — scaffolder 自動更新

### 後續建議

- `foundations/layout.md` 的「視覺隱藏」段落引用 `govtw-visually-hidden-focusable` class，但 `tokens.css` 沒有這個 class。建議改成引用本元件
