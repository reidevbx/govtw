# 新增 導盲磚 Accesskey 元件（`govtw-accesskey`）

- **優先度**：P0
- **參考**：GOV.UK 無對應元件（台灣自訂）
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 全國政府入口網 gov.tw：https://www.gov.tw/ — 3 個 `:::` 錨點，`Accesskey_U/C/Z`
- 數位發展部：https://moda.gov.tw/ — `#AU/#AC/#AZ`，title「[快捷鍵Alt+U]」；另有 `accesskey="S"` 開搜尋
- 勞保局：https://www.bli.gov.tw/ — accesskey U/C/B
- 監理服務網：https://www.mvdis.gov.tw/ — 只有 T/U/S，**缺 C（主要內容）**；兩個錨點共用 `id="shortcut"`
- 臺北市政府：https://www.gov.taipei/ — 上方、中間、下方三處；另有「無障礙快捷鍵」說明頁
- 高雄市政府：https://www.kcg.gov.tw/ — 上、中、下、左、右五處

### 現況問題

- 每站代號不一致：U/C/Z、U/C/B、T/U/S
- 連結文字只有 `:::`，意義只放在 title 屬性
- `href` 常是 `javascript:void(0)`、`javascript:;`
- id 重複（mvdis）

## 需求定義

- 依數位發展部〈網站無障礙規範〉提供 `:::` 定位點與 accesskey
- 屬性：`key`（U/C/Z 等）、`label`（「上方功能區塊」等）
- 可讀名稱用視覺隱藏文字，不只靠 title
- 產出真正的錨點 id，不用 `javascript:`
- 文件附「快速鍵說明」範本（網站導覽頁必備）

### 無障礙

- WCAG 2.2 AA 為最低標準
- 可讀名稱需包含區塊名稱與快速鍵
- accesskey 不得與瀏覽器、螢幕閱讀器常用快速鍵衝突，需在文件列出

### 待確認（動手前需決定）

1. 代號標準採 U/C/Z 還是 U/C/B？需查證數位發展部最新規範條文
2. 是否顯示 `:::` 可見文字（規範要求）與 GOV.UK 極簡風格如何取捨

### 決定（2026-10-14）

- **代號不寫死**：`key` 為必填屬性。文件推薦 U（上方）、C（中央）、Z（下方），依據是數位發展部與 gov.tw 自身網站的做法；另註明部分網站用 B
- 規範原文未查到：`accessibility.moda.gov.tw` 回 403，搜尋結果只有各機關實作說明
- **Light DOM 渲染**：不用 Shadow DOM，讓錨點 id 可被頁面上的 `#AU` 連結找到，accesskey 也不受 Shadow DOM 支援度影響。樣式以 adoptedStyleSheets 掛到元件所在的 root（document 或 ShadowRoot）
- **「:::」永遠顯示**：`aria-hidden="true"`；可讀名稱用視覺隱藏文字。不加 `aria-keyshortcuts`：組合鍵依瀏覽器與平台而異（Alt、Alt+Shift、Ctrl+Option），瀏覽器已會公開 accesskey
- 錨點 id 預設 `A{key}`（同數位發展部 `#AU`），可用 `anchor-id` 覆寫

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [x] 決定「待確認」各項（見「決定」段）
- [x] `pnpm new:component accesskey --type=basic --zh-name=導盲磚`
- [x] `packages/tokens/tokens.json` 新增 `--govtw-accesskey-*` component token → `pnpm build:tokens`
- [x] 實作 `govtw-accesskey.ts`：屬性、樣式、render
- [x] 寫 `apps/docs/components/accesskey.md`，DemoBlock 加 `variant`
- [x] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [x] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-accesskey.ts`、`apps/docs/components/accesskey.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `skip-link`
- `header`
- `footer`

## 總結

### 完成項目

- ✅ `govtw-accesskey`：light DOM 渲染 `<a id href accesskey>`，「:::」`aria-hidden`，`label` 為視覺隱藏的可讀名稱
- ✅ 樣式以 adoptedStyleSheets 掛到所在 root；DemoBlock 搬移元素進 Shadow DOM 時會重新觸發 `connectedCallback`，樣式隨之掛上
- ✅ 缺 `key` 或 `label` 時不渲染並 `console.warn`
- ✅ docs 頁：建議代號表、各平台組合鍵表、網站導覽頁的「快速鍵說明」範本

### 驗證

- `pnpm build`、`pnpm check:components`、`pnpm lint`、`tsc --noEmit` 通過
- **未在瀏覽器實測**：各瀏覽器的 accesskey 跳轉、聚焦樣式、DemoBlock 內的樣式套用，交由使用者確認

### 變更檔案

- `packages/web-components/src/govtw-accesskey.ts` — 新增（專案第一個 light DOM 元件）
- `apps/docs/components/accesskey.md`、`apps/docs/public/preview/accesskey/default.html` — 新增
- `packages/tokens/tokens.json` — 新增 `accesskey` component token
- `index.ts`、`package.json`、`vite.config.ts`、`config.mts` — scaffolder 自動更新

### 後續建議

- 規範原文仍未查證（`accessibility.moda.gov.tw` 回 403），建議用瀏覽器確認代號規定
- light DOM 是新寫法，若之後 header、footer 也需要，可抽成共用的 `adoptStyles` 工具
