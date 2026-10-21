# 系統架構

本設計系統由兩個核心套件組成，透過 design token 串連。

```
packages/
├── tokens/                ← Design Token（JSON → CSS）
│   ├── tokens.json        ← 唯一的設計決策來源
│   ├── tokens.css         ← 產出的 CSS 變數
│   └── tailwind.css       ← Tailwind v4 theme 整合
│
└── web-components/        ← UI 元件庫（Lit Web Components）
    ├── src/               ← TypeScript 原始碼，每元件一個檔
    │   ├── govtw-*.ts
    │   └── index.ts
    └── dist/              ← 建置產出
        ├── *.js           ← ESM 模組（npm install 使用）
        └── gov-tw.iife.js ← CDN 用單一打包檔
```

---

## Design Token（`@gov-tw/tokens`）

Design token 是整個系統的**單一事實來源**。所有視覺決策——色彩、間距、圓角、字型——都定義在 `tokens.json` 中，再透過建置腳本轉換為 CSS custom properties。

```
tokens.json  →  build.js  →  tokens.css       （CSS custom properties）
（設計決策）    （轉換器）  └→  tailwind.css    （Tailwind v4 @theme）
```

### 三層 Token 架構

Token 分為三層，上層引用下層，形成清晰的抽象階梯：

```
Primitive（原始層）→ Semantic（語意層）→ Component（元件層）
   原始數值             用途語意             元件客製
```

#### 1. Primitive（原始層）

原始設計數值，前綴 `--govtw-primitive-`。**不可直接使用**，必須經過 Semantic 或 Component token。

| 類別 | 範例 | 說明 |
|------|------|------|
| `color` | `--govtw-primitive-color-blue-500` | 色票原始值 |
| `space` | `--govtw-primitive-space-4` | 間距基礎值 |
| `radius` | `--govtw-primitive-radius-md` | 圓角基礎值 |
| `font` | `--govtw-primitive-font-family-sans` | 字型基礎值 |

#### 2. Semantic（語意層）

以用途命名，引用 Primitive 層，前綴 `--govtw-`。用於排版、文字、背景、邊框等通用用途，也是主題切換的操作層。

| 類別 | 範例 | 說明 |
|------|------|------|
| `color` | `--govtw-color-brand-primary` | 品牌主色 |
| `color` | `--govtw-color-text-primary` | 主要文字色 |
| `color` | `--govtw-color-bg-canvas` | 頁面背景色 |
| `spacing` | `--govtw-spacing-4` | 間距 |
| `radius` | `--govtw-radius-md` | 圓角 |
| `font` | `--govtw-font-sans` | 字型 |

#### 3. Component（元件層）

每個元件可單獨覆寫的 token，引用 Semantic 或 Primitive 層，前綴 `--govtw-{元件名}-`。需要隨主題切換的值引用 Semantic；元件特有、各主題固定的值（如按鈕藍底白字）可直接引用 Primitive。

| 元件 | 範例 | 說明 |
|------|------|------|
| Button | `--govtw-button-primary-bg` | 主要按鈕背景 |
| Button | `--govtw-button-focus-color` | 按鈕聚焦色 |
| Text Input | `--govtw-text-input-border-color` | 輸入框邊框色 |
| Checkbox | `--govtw-checkbox-check-color` | 勾選色 |

#### 層級引用關係

```css
/* Primitive → 原始值 */
--govtw-primitive-color-blue-500: #2C84B2;

/* Semantic → 引用 Primitive */
--govtw-color-brand-primary: var(--govtw-primitive-color-blue-500);

/* Component → 引用 Semantic（隨主題切換） */
--govtw-button-secondary-bg: var(--govtw-color-bg-neutral);

/* Component → 引用 Primitive（各主題固定） */
--govtw-button-primary-bg: var(--govtw-primitive-color-blue-8);
```

### 主題系統

主題定義在 `tokens.json` 的 `themes` 區塊，覆寫 Semantic 層的變數。Component 層透過 CSS 變數繼承自動生效，不需額外設定。

目前提供 **dark** 主題，產出三種選擇器：

| 選擇器 | 觸發方式 |
|--------|---------|
| `@media (prefers-color-scheme: dark)` | 系統偏好自動套用 |
| `[data-theme="dark"]` | 手動切換（資料屬性） |
| `.dark` | 手動切換（class，與 VitePress 等慣例對齊） |

新增主題只需在 `tokens.json` 的 `themes` 下加入新的 key，`build.js` 會自動產生對應的 `[data-theme="<name>"]` 選擇器。

> 機關自有品牌色客製範例請見 [色彩 — 使用方式](/foundations/colour#使用方式)。

### 使用方式

直接引入 CSS custom properties：

```css
@import '@gov-tw/tokens/tokens.css';

.my-element {
  color: var(--govtw-color-text-primary);
  padding: var(--govtw-spacing-4);
  border-radius: var(--govtw-radius-md);
  font-family: var(--govtw-font-sans);
}
```

### Tailwind v4 整合

若專案使用 Tailwind CSS v4，可改為引入 `tailwind.css`，將 token 註冊為 Tailwind theme 變數：

```css
/* 專案的主 CSS 檔案 */
@import '@gov-tw/tokens/tailwind.css';
```

引入後即可使用 Tailwind utility class：

```html
<button class="bg-govtw-brand-primary text-govtw-text-on-primary
               px-govtw-4 py-govtw-2 rounded-govtw-md font-govtw-sans">
  送出
</button>
```

對應關係：

| Token | Tailwind utility | 範例 |
|-------|-----------------|------|
| `--govtw-color-brand-primary` | `bg-govtw-brand-primary` | 背景色 |
| `--govtw-color-text-on-primary` | `text-govtw-text-on-primary` | 文字色 |
| `--govtw-spacing-4` | `p-govtw-4`、`m-govtw-4`、`gap-govtw-4` | 間距 |
| `--govtw-radius-md` | `rounded-govtw-md` | 圓角 |
| `--govtw-font-sans` | `font-govtw-sans` | 字型 |

`tailwind.css` 內部引入了 `tokens.css`，因此不需要重複引入。

---

## Web Components（`@gov-tw/web-components`）

UI 元件以 [Lit](https://lit.dev/) 建構，封裝為標準 Web Components。透過 Vite 建置，產出 ESM 模組（npm 使用）與 IIFE 單檔（CDN 使用），Lit runtime 已打包其中，使用者不需另外安裝。

### 為什麼選擇 Web Components

- **框架無關**：原生瀏覽器標準，可在 React、Vue、Angular 或純 HTML 中使用
- **Shadow DOM 封裝**：樣式不會洩漏、也不會被外部覆蓋
- **與 token 的連結**：CSS custom properties 可穿透 Shadow DOM，元件從外部讀取 token 值
- **零依賴使用**：CDN 版本只需一個 `<script>` 標籤即可使用

### 元件如何讀取 Token

元件內部透過 `var()` 引用 Component token，**不加 fallback 值**，確保未引入 token 時能立即發現問題：

```css
/* govtw-button 內部樣式 */
button {
  font-family: var(--govtw-button-font-family);
  background: var(--govtw-button-primary-bg);
  color: var(--govtw-button-primary-color);
  border-radius: var(--govtw-button-border-radius);
}
```

這代表：
1. 元件只依賴 Component token，不直接引用 Semantic 或 Primitive 層
2. Component token 引用 Semantic 或 Primitive；Primitive 不會在 CSS 中被直接使用
3. 主題切換時，只需覆寫 Semantic 層，引用 Semantic 的 Component token 透過 CSS 變數繼承自動生效
4. 各機關覆寫 Semantic 層即可客製品牌色，不需修改元件程式碼
5. 需要細粒度調整時，可直接覆寫特定 Component token（如只改按鈕圓角）

---

## 資料流

```
tokens.json                   ← 設計師與開發者共同維護
  │
  │  ┌─ Primitive  ─→ 原始數值（色票、間距、字型…）
  ├─ │─ Semantic   ─→ 語意用途（品牌色、文字色、背景色…）
  │  │─ Component  ─→ 元件客製（按鈕背景、輸入框邊框…）
  │  └─ Themes     ─→ 主題覆寫（dark 覆寫 Semantic 層）
  │
  ├─→ build.js ─┬→ tokens.css      ← 四段式 CSS custom properties
  │             └→ tailwind.css    ← Tailwind v4 @theme 整合
  │
  └─→ web-components 透過 var() 讀取 Component token
        │
        ├─→ vite build ─┬→ dist/*.js          ← ESM（npm install）
        │               ├→ dist/*.d.ts        ← TypeScript 型別
        │               └→ dist/gov-tw.iife.js ← IIFE（CDN <script>）
        │
        ├── <govtw-button>
        ├── <govtw-checkbox>
        └── ...
```

`@gov-tw/tokens` 沒有程式執行期依賴——產出就是 CSS 檔案。`@gov-tw/web-components` 的 Lit runtime 已打包進產出，使用者不需另外安裝 Lit。在樣式層透過 CSS custom properties 讀取 Component token（非 npm 依賴關係）。Tailwind 整合同樣是純 CSS，不需要額外的 JavaScript 設定。

---

## 技術選型

| 領域 | 選擇 | 理由 |
|------|------|------|
| 套件管理 | pnpm workspace | 嚴格的依賴管理、磁碟效率 |
| Design Token | JSON → CSS custom properties | 簡單、瀏覽器原生支援、可穿透 Shadow DOM |
| UI 元件 | Lit Web Components | 框架無關、原生瀏覽器標準、輕量 |
| 元件建置 | Vite library mode | 產出 ESM + IIFE，支援 npm 與 CDN 兩種使用方式 |

