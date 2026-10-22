# gov.tw Design System

台灣政府數位服務設計系統，參考 GOV.UK Design System，以 Web Components 實作、VitePress 承載文件。

## 工作守則（執行任務前必讀）

⛔ **BLOCKING：未建立任務文件禁止開始寫程式碼。** 詳見 `tasks/README.md`。

### 七大守則

1. **前期分析** — 動手前在 `tasks/{分類}/YYYY-MM-DD-描述.md` 建立任務文件，寫明：問題分析、需求定義、實作計劃、影響範圍。
2. **建立任務清單** — 用 TaskCreate 列出具體、可驗證、按順序排列的步驟。
3. **確認計畫** — 向使用者確認理解無誤、方向正確，再動手。
4. **逐項執行** — 一次專注一項，完成後立即更新進度；遇阻礙立即回報。
5. **最小影響原則** — 優先修改既有檔案；避免新建檔案與重複程式碼。
6. **高層級概覽** — 向使用者說明改了哪些檔案、主要變更、為什麼這樣做。
7. **Review 總結** — 在任務文件追加「## 總結」：完成項目、變更檔案、後續建議。

### 分類

| 分類 | 用途 |
|---|---|
| `features/` | 新元件、新頁面、新功能 |
| `bugs/` | 修正錯誤行為、a11y 違規 |
| `refactor/` | 重構、結構調整（行為不變） |
| `optimization/` | 效能改善 |
| `docs/` | 文件內容更新 |
| `test/` | 新增/修正測試 |

### 不適用此守則

純諮詢問答、程式碼審查（僅閱讀）、文件查詢。

## 架構

pnpm workspace monorepo，分為 `apps/`（應用）與 `packages/`（共用套件）。

- **`packages/tokens`** — 設計 Token 的單一來源（`tokens.json` → `tokens.css` / `tailwind.css`）
- **`packages/web-components`** — Lit 3 Web Components，每個元件一個檔案
- **`apps/docs`** — VitePress 文件站台，元件頁面含 live demo
- **`apps/showcase`** — Astro 政府網站重構示範，每站一個資料夾（`src/sites/<站>/` + `src/pages/<站>/`），主題只在該站載入，不修改 `packages/`

## 指令

```bash
pnpm dev             # 文件站台 dev server
pnpm dev:showcase    # 網站重構示範 dev server
pnpm build:showcase  # 建置網站重構示範
pnpm build           # 建置所有套件 + 文件站台
pnpm build:tokens    # 重建 token 產出檔
pnpm build:previews  # 從 md 重生 preview HTML
pnpm lint            # ESLint 檢查（Lit + 自訂 govtw rule）
pnpm lint:fix        # 自動修復可修復的 lint 問題
pnpm check:components  # 稽核元件完整性（docs / preview / sidebar）
pnpm new:component   # 建立新元件（見「新增元件步驟」）
```

### Git hooks（Husky）

`pnpm install` 會自動啟用以下 hook：

- **pre-commit**：對 staged 檔案跑 `lint-staged`（web-components/src/*.ts、scripts/*.mjs、eslint-rules/*.js 自動 `eslint --fix`）
- **pre-push**：跑 `pnpm build:components` 確保 TypeScript 編譯通過才能推上 remote

緊急情況可用 `git commit --no-verify` / `git push --no-verify` 繞過，但應留紀錄說明原因。

## 命名規則

- 元件 tag：`govtw-<name>`（如 `govtw-button`）
- 元件檔案：`govtw-<name>.ts`
- TS class：`Govtw<PascalName>`（如 `GovtwButton`、`GovtwTextInput`）
- CSS token 前綴：`--govtw-`
- npm scope：`@gov-tw/`
- 文件頁面：`apps/docs/components/<name>.md`

## 核心原則

### 無障礙
- WCAG 2.2 AA 為最低標準
- 互動回饋不依賴色彩作為唯一指示
- 使用原生語意化元素（`<button>`、`<input>`），不自造可聚焦元素
- 最小觸控目標 44x44px

### 元件開發
- 使用 Lit 3 + TypeScript 裝飾器
- 含可聚焦元素的元件必須設定 `delegatesFocus: true`
- 表單元件使用 `formAssociated` + `ElementInternals` 參與原生表單
- CSS 只使用 Component token（`--govtw-<component>-*`），不加 fallback 值
- Focus ring 統一用 `box-shadow`（非 `outline`），顏色 `#fd0`
- `:host` 加 `outline: none !important` 抑制瀏覽器預設 focus 框
- **元件只控制自身職責的樣式**：例如 radio 只管圓形選取器和選擇狀態，不管文字排版；fieldset 只管群組語意和佈局，不管標題/說明的字型大小顏色。文字樣式由外層段落/排版控制，透過繼承生效。
- **Fieldset 使用 slot 傳入標題與說明**：`<govtw-fieldset>` 的 legend 和 hint 透過 named slot（`slot="legend"`、`slot="hint"`）傳入，使用者自行用 `<h2>`、`<p>` 等標籤控制樣式。`error` 仍為 prop（元件負責錯誤顯示邏輯）。

### Token 架構

三層設計 Token，唯一來源是 `packages/tokens/tokens.json`，修改後須執行 `pnpm build:tokens`。

**三層結構**：
1. **Primitive（原始層）** — 原始設計數值，前綴 `--govtw-primitive-`（如 `--govtw-primitive-color-blue-500`）
2. **Semantic（語意層）** — 以用途命名，引用 Primitive 層，前綴 `--govtw-`（如 `--govtw-color-brand-primary`）
3. **Component（元件層）** — 每個元件可覆寫的 token，引用 Semantic 或 Primitive 層，前綴 `--govtw-<component>-`（如 `--govtw-button-primary-bg`）

**主題系統**：
- 主題定義在 `tokens.json` 的 `themes` 區塊，目前有 `dark`
- dark 主題覆寫 Semantic 層變數，產出 `@media (prefers-color-scheme: dark)` 自動套用 + `[data-theme="dark"]` 手動切換
- 新增主題只需在 `themes` 下加新 key，`build.js` 會自動產生對應的 `[data-theme="<name>"]` 選擇器

**引用規則**：
- 元件 CSS 中只使用 Component token，**不加 fallback**（如 `var(--govtw-button-primary-bg)`），方便除錯
- **Primitive 不可直接使用**：CSS（元件、docs 站 `custom.css`）不得出現 `var(--govtw-primitive-*)`，必須經過 Semantic 或 Component token
- Semantic 用於通用用途：排版、文字、背景、邊框等
- Component token 可引用 Semantic，也可直接引用 Primitive（元件特有、不需隨主題變的值，如按鈕藍底白字、tag 色）
- dark 主題只覆寫 Semantic 層：引用 Semantic 的 Component token 會跟著換；引用 Primitive 的不會，配對的底色與字色要一起引用 Primitive，避免暗色模式對比錯亂

**產出檔案**：
- `tokens.css` — 五段式：Primitive `:root` → Semantic `:root` → Component `:root` → Themes → Typography（裸標籤）。單檔可用，多數消費者直接 import 即可
- `tailwind.css` — Tailwind v4 `@theme` 整合，`@import './tokens.css'` 後映射至 Tailwind namespace
- VitePress 等有自身 chrome 的站台 import `tokens.css` 後，需在自家 CSS 加 `body { line-height: 1.5 }` 等覆寫，吸收裸 `body` 排版的繼承污染（見 `apps/docs/.vitepress/theme/custom.css`）

### 文件
- 語言：繁體中文（zh-TW）
- 每個元件頁面結構：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引
- 元件 demo 使用 `<DemoBlock>` 元件，內部以 Shadow DOM 隔離 VitePress 樣式
- `<DemoBlock>` 透過 Vite `define` 注入 `tokens.css` 並自動替換 `:root` → `:host`、`[data-theme]` → `:host([data-theme])`
- `<DemoBlock>` 會監聽 VitePress 的 `.dark` class 變化，同步 `data-theme="dark"` 至 Shadow DOM host
- 純展示區塊（如互動狀態）使用 `<DemoBlock no-code>` 隱藏原始碼按鈕

### Docs 站 vs 元件 — 兩層獨立 UI
文件站台的視覺體系**刻意分為兩層**，請勿混用：

| 層 | 在哪 | 樣式來源 |
|---|---|---|
| VitePress chrome（nav / sidebar / hero / prose / breadcrumb / search / code block） | light DOM | VitePress 內建 `--vp-*` 變數 + `apps/docs/.vitepress/theme/custom.css` |
| govtw 元件 demo | DemoBlock 內 Shadow DOM | `--govtw-*` token，由 Vite define 注入 |

**為什麼分開**
- VitePress prose 樣式（`.vp-doc h2/p` 等）會穿透 light DOM 污染元件外觀；Shadow DOM 阻斷
- 使用者裝元件到自家 gov.tw 應用時不會帶 VitePress chrome；隔離後 demo 看起來與正式環境完全一致

**選擇性 token 綁定**
- `tokens.css` 在 `theme/index.ts` 載入到站台根層，讓 chrome 也能用 `--govtw-*`
- `custom.css` 把以下 VitePress 變數別名到 govtw token：
  - 品牌色 `--vp-c-brand-1/2/3/soft`、`--vp-c-indigo-*` → `--govtw-color-brand-primary` + `color-mix()`
  - 中性色 `--vp-c-bg/bg-soft/text-1/text-2/divider` → `--govtw-color-bg-*`、`--govtw-color-text-*`、`--govtw-color-border-subtle`
  - 首頁 brand 按鈕 `--vp-button-brand-*` → `--govtw-button-primary-bg/color`（hover/active 加深比例同元件）
  - 內文連結 → `--govtw-color-link-default`
- prose / code block 保留 VitePress 預設
- dark mode 由 `tokens.css` 的 `.dark` 選擇器自動覆寫；`custom.css` 不重複寫 dark 規則
- 想改 chrome 配色：改 `tokens.json` 的 `color.brand.primary` → `pnpm build:tokens` → 站台連動

### 獨立預覽頁面（auto-generated）
- **唯一來源是 md**：`<DemoBlock variant="xxx">` 裡的 HTML。build 腳本會抽出內容自動生成 `apps/docs/public/preview/<component>/<xxx>.html`（參考 GOV.UK「Open this example in a new tab」）
- 作者只需在 DemoBlock 加 `variant="xxx"`；DemoBlock 會從當前路由推導預覽 URL，無須寫 `preview="..."`
- 沒有 `variant` 的 DemoBlock 不會生 preview，也不顯示「在新分頁預覽」按鈕（適合狀態對照這類不需要獨立頁面的情境）
- 改 md 的 demo 內容後執行 `pnpm build:previews` 重新生成；`pnpm build` 會自動前置跑一次
- 生成流程：`scripts/build-previews.mjs` + `scripts/preview-template.html`（統一 boilerplate 與 `.demo-layout` flex 版型）
- 模式頁（`apps/docs/patterns/<name>.md`，`index.md` 除外）同樣適用，輸出到 `public/preview/patterns/<name>/<xxx>.html`
- preview HTML 是 build 產物但**有 commit**（方便 dev 啟動立即可用、PR 可 review）；編輯器看到它們即可視為「不要手改」
- `apps/docs/public/tokens.css` 與 `gov-tw.iife.js` 是從 packages 複製來的，每次 build 後由 `sync:public` 同步更新

## 新增元件步驟

⚠️ **不要手工建立**，使用 scaffolder：

```bash
pnpm new:component <name> --category=<分類> [--type=basic|form|layout] [--zh-name=中文名] [--en-name="English Name"]
```

scaffolder 會自動：
- 建立 `packages/web-components/src/govtw-<name>.ts`（依 type 套用 basic / form / layout 模板）
- 建立 `apps/docs/components/<name>.md` 骨架（含 `<DemoBlock variant="default">`）
- 更新 `index.ts` export、`package.json` exports、`vite.config.ts` entry、VitePress sidebar
- sidebar 英文名由 name 推導為 Title Case 加空格（`date-input` → `Date Input`），可用 `--en-name` 覆寫
- `--category` 決定插入「元件」底下哪個分類（marker `<分類-start/end>`），`--type=layout` 以外必填：

  | `--category` | 分類 | 範例 |
  |---|---|---|
  | `form` | 表單與操作 | button、text-input、file-upload |
  | `navigation` | 導覽 | link、breadcrumbs、pagination |
  | `content` | 內容呈現 | details、table、card |
  | `feedback` | 訊息與狀態 | error-summary、notification-banner |
  | `page` | 頁面框架 | header、footer、skip-link |

- `--type=layout` 固定插入「佈局元件」群組（`<layout-start/end>` marker），不需要 `--category`

（preview HTML 由 `pnpm build:previews` 自動生成，scaffolder 不產）

產生後的工作（完整檢查清單見 `.claude/skills/new-component/SKILL.md`）：
1. 在 `tokens.json` 新增 component token，`pnpm build:tokens`
2. 填寫元件 `.ts` 中的 TODO 區塊（屬性、樣式、render）
3. 補 docs 頁的屬性表、事件表、無障礙說明，並在 `<DemoBlock>` 內寫示範 HTML 與 `variant` 名
4. `pnpm build`（依序跑 build:tokens → build:components → sync:public → build:previews → docs build）
5. `pnpm check:components` 稽核所有元件完整性，`pnpm lint`

### AI 指引檔

- `CLAUDE.md` 是唯一來源；`AGENTS.md` 是指向它的 symlink，不要直接編輯
- skill 唯一來源在 `.claude/skills/`；`.agents/skills/` 內是指向它的 symlink

## 技術約束

- TypeScript：`experimentalDecorators: true`、`useDefineForClassFields: false`（Lit 必需）
- VitePress 需在 `config.mts` 設定 `isCustomElement: tag => tag.startsWith('govtw-')`
- Web Components 僅在 client-side 動態 import（SSR 不支援自訂元素）
- 設計參考：[GOV.UK Design System](https://design-system.service.gov.uk/)
