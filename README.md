# GOV.TW Design System

> **🚧 開發中（Alpha）** — 本專案目前處於早期開發階段，API 與元件介面可能隨時變動。尚未發布至 npm，請勿用於正式環境。歡迎追蹤進度或參與討論。

**文件站**: [govtw.vercel.app](https://govtw.vercel.app/) · **原始碼**: [GitHub](https://github.com/reidevbx/govtw)

為台灣政府數位服務打造的設計系統，提供跨部會一致的使用者體驗。

參考 [GOV.UK Design System](https://design-system.service.gov.uk/)、[U.S. Web Design System](https://designsystem.digital.gov/)、[New York State Design System](https://designsystem.ny.gov/) 與 [Web Awesome](https://webawesome.com/)，結合台灣在地需求，以 Web Components 實作框架無關的 UI 元件庫。

## 特色

- **框架無關** — 基於 Web Components 標準，可在 React、Vue、Angular 或純 HTML 中使用
- **Design Token 驅動** — 所有視覺樣式透過 CSS custom properties 定義，一處修改全站生效
- **無障礙優先** — 符合 WCAG 2.2 AA 標準，語意化 HTML、鍵盤導航、螢幕閱讀器支援
- **繁體中文最佳化** — 字體、行高、間距針對 CJK 排版調校

## 快速開始

> **⚠️ 套件尚未發布** — 以下安裝指令為預定的使用方式，目前套件尚未發布至 npm / CDN。如需試用，請 clone 本 repo 並以本地開發模式執行。

<!--
### CDN（免建置工具）

```html
<link rel="stylesheet" href="https://unpkg.com/@gov-tw/tokens/tokens.css">
<script src="https://unpkg.com/@gov-tw/web-components/dist/gov-tw.iife.js"></script>

<govtw-button>送出</govtw-button>
```

### npm（搭配打包工具）

```bash
npm install @gov-tw/web-components @gov-tw/tokens
```

```js
// 載入全部元件
import '@gov-tw/web-components'

// 或按需載入單一元件
import '@gov-tw/web-components/govtw-button'
```

```css
@import '@gov-tw/tokens/tokens.css';
```

### Tailwind v4

```css
@import '@gov-tw/tokens/tailwind.css';
```
-->

## 可用元件

| 元件 | 標籤 | 用途 |
|------|------|------|
| Button | `<govtw-button>` | 觸發動作，支援 primary / secondary / danger 變體 |
| Checkbox | `<govtw-checkbox>` | 核取方塊，原生 input 覆蓋確保無障礙 |
| Text Input | `<govtw-text-input>` | 單行文字輸入，支援 prefix/suffix、固定寬度 |
| Textarea | `<govtw-textarea>` | 多行文字輸入，支援字數計數 |
| Fieldset | `<govtw-fieldset>` | 表單欄位群組，附 legend 和錯誤狀態 |
| Stack | `<govtw-stack>` | 垂直堆疊佈局，控制子元素間距 |
| Sidebar | `<govtw-sidebar>` | 雙欄佈局，窄螢幕自動堆疊為單欄 |
| Cluster | `<govtw-cluster>` | 水平流式佈局，空間不足自動換行 |
| Container | `<govtw-container>` | 頁面容器，限制最大寬度並置中 |

## 專案結構

```
govtw/
├── apps/
│   └── docs/                 # VitePress 文件站
├── packages/
│   ├── tokens/               # Design Token（CSS custom properties）
│   │   ├── tokens.json       # 設計決策的唯一來源
│   │   ├── tokens.css        # 產出的 CSS custom properties
│   │   └── tailwind.css      # Tailwind v4 @theme 整合
│   └── web-components/       # Lit Web Components 元件庫
│       ├── src/              # 元件原始碼（TypeScript + Lit）
│       └── dist/             # 建置產出（ESM + IIFE）
├── package.json
└── pnpm-workspace.yaml
```

## 品牌客製

所有元件透過 CSS custom properties 取色，覆寫 token 即可客製品牌配色：

```css
:root {
  --govtw-color-brand-primary: #2C84B2;   /* 主要品牌色 */
  --govtw-color-brand-secondary: #618D90; /* 輔助品牌色 */
  --govtw-color-bg-surface: #EAF0F0;     /* 區塊背景 */
}
```

## 設計原則

1. **以使用者為中心** — 從使用者需求出發，而非組織架構
2. **無障礙與包容性** — 公共服務必須所有人都能使用
3. **降低使用者負擔** — 系統承擔複雜度，不轉嫁給使用者
4. **一致性與可預期性** — 統一互動模式建立信任感
5. **資料驅動的持續改善** — 以數據為基礎持續優化
6. **開放與協作** — 公開設計與研究成果，共同演進

## 開發

```bash
# 安裝依賴
pnpm install

# 啟動文件站開發伺服器
pnpm dev

# 建置 Design Token
pnpm build:tokens

# 建置元件庫
pnpm build:components
```

### 技術棧

| 領域 | 選擇 | 理由 |
|------|------|------|
| 套件管理 | pnpm workspace | 嚴格的依賴管理、磁碟效率 |
| Design Token | JSON → CSS custom properties | 簡單、瀏覽器原生支援、可穿透 Shadow DOM |
| UI 元件 | Lit 3 Web Components | 框架無關、原生瀏覽器標準、輕量 |
| 文件站 | VitePress | Vue 生態系、Markdown 驅動、內建搜尋 |
| 元件建置 | Vite library mode | 產出 ESM + IIFE，支援 npm 與 CDN |

### 命名規則

| 類型 | 格式 | 範例 |
|------|------|------|
| 元件標籤 | `govtw-<name>` | `<govtw-button>` |
| 元件檔案 | `govtw-<name>.ts` | `govtw-button.ts` |
| CSS Token | `--govtw-{category}-{name}` | `--govtw-color-brand-primary` |
| npm 套件 | `@gov-tw/<package>` | `@gov-tw/web-components` |

## 授權

MIT
