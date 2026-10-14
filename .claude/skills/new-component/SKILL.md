---
name: new-component
description: 建立新的 govtw-* Lit 元件（scaffolder-backed）。使用者要新增元件、或執行 /new-component 時使用。
---

# /new-component <name> [options]

建立 gov.tw Design System 的新 Lit 元件。**務必使用 scaffolder，不要手動建檔**。

## 使用流程

1. **先建任務文件**（守則一）：`tasks/features/YYYY-MM-DD-<name>-component.md`
   - 填寫 問題分析 / 需求定義 / 實作計劃 / 影響範圍
   - 若 `tasks/features/` 已有該元件的任務文件（如 2026-10-14 調查產出的），直接沿用，先處理其中「待確認」
   - 向使用者確認計畫後才動手（守則三）

2. **跑 scaffolder**：
   ```bash
   pnpm new:component <name> [--type=basic|form|layout] [--zh-name=中文名] [--en-name="English Name"]
   ```
   - `basic`：一般互動元件（如 button、link）
   - `form`：表單元件（含 `formAssociated`、`attachInternals`、`setFormValue`、`formResetCallback`）
   - `layout`：佈局原語（含 `styleMap` + token），sidebar 自動放進「佈局元件」群組
     只用於 Container、Stack 這類佈局原語；header、footer 等頁面元件用 `basic`
   - `--en-name`：sidebar 英文名；省略時由 name 推導（`date-input` → `Date Input`）

   scaffolder 會建立 `.ts` 與 docs `.md`，並更新 `index.ts`、`package.json` exports、`vite.config.ts` entry、VitePress sidebar。

3. **新增 Component token**：在 `packages/tokens/tokens.json` 加 `--govtw-<name>-*`（引用 Semantic 層）→ `pnpm build:tokens`

4. **填寫 TODO**：
   - 元件 `.ts`：屬性宣告、樣式、render 內容
   - 文件 `.md`：屬性表、事件表、無障礙段落、設計指引
   - demo 寫在 `<DemoBlock variant="xxx">` 內；preview HTML 由 `pnpm build:previews` 自動生成，**不要手寫**

5. **驗證**：
   ```bash
   pnpm build             # tokens → components → sync:public → build:previews → docs
   pnpm check:components  # 稽核完整性
   pnpm lint
   ```
   視覺檢查交由使用者跑 `pnpm dev`。

6. **補任務文件的總結**（守則七）。

## 品質檢查清單（實作時對照）

### 元件

- [ ] `@customElement('govtw-<name>')` tag 正確
- [ ] `declare global HTMLElementTagNameMap` 宣告已在檔尾
- [ ] 有可聚焦子元素時 `delegatesFocus: true`
- [ ] 表單元件：`static formAssociated = true` + `attachInternals()`
- [ ] CSS 只引用 Component token（不加 fallback）
- [ ] 元件只控制自身職責的樣式；文字排版由外層控制
- [ ] Focus ring 用 `box-shadow`（`#fd0`），`:host` 加 `outline: none !important`
- [ ] 互動目標至少 44×44px
- [ ] 錯誤狀態加 `aria-invalid`，訊息以 `aria-describedby` 關聯
- [ ] `target="_blank"` 時自動補 `rel="noopener noreferrer"`
- [ ] `updated()` 用 `PropertyValues<this>` 型別
- [ ] 需要把作者的子元素包進 `<li>` 等結構、或錨點 id 要讓頁面其他連結找到時，改用 light DOM：
      `createRenderRoot() { return this; }`，並使用 `internal/light-dom.ts` 的 `adoptStyles`、`takeChildElements`、`whenParsed`
      （範例：`govtw-breadcrumbs.ts`、`govtw-accesskey.ts`）

### 無障礙（WCAG 2.2 AA）

- [ ] 送出、切換、開關一律用原生 `<button>`；導覽用有真實 `href` 的 `<a>`，不用 `javascript:` 或 `href="#"`
- [ ] 每個輸入都有可見 label，不只靠 placeholder
- [ ] 重要資訊（另開新視窗、目前狀態）不只放在 `title` 屬性
- [ ] 狀態不只靠顏色表達（`aria-pressed`、`aria-current`、`aria-expanded`、視覺隱藏文字）
- [ ] 圖片 alt 必填，或明確標為裝飾

### 文件

- [ ] 結構：概述 / 互動範例 / 狀態展示 / 使用方式 / 屬性 / 事件 / 無障礙 / 設計指引
- [ ] 屬性表的型別與預設值和 `.ts` 一致
- [ ] demo 內的示意樣式只用 `--govtw-*` token（preview 頁沒有 `--vp-*`）
- [ ] 佈局類 demo 加 `direction="column"`
- [ ] 相關元件連結文字為「中文 English」，如 `[連結 Link](/components/link)`

## 參考

- 既有最佳實踐範例：`packages/web-components/src/govtw-button.ts`（basic）、`govtw-text-input.ts`（form）、`govtw-stack.ts`（layout）
- 元件缺口與優先順序：`tasks/features/2026-10-14-component-gap-roadmap.md`
- 完整工作守則：`CLAUDE.md` 的「工作守則」區段（`AGENTS.md` 是它的 symlink）
- 任務文件規範：`tasks/README.md`
