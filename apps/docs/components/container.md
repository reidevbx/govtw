# Container 頁面容器

## 概述

頁面容器限制內容的最大寬度、水平置中，並在左右留白。它是頁面最外層的佈局元件，其他佈局元件都放在它裡面。

佈局元件的整體概念見 [基礎 › 佈局](/foundations/layout)。

## 互動範例

### 基本用法

範例把最大寬度設為 `480px`，方便在文件頁看出置中效果。正式頁面通常用預設的 `1020px`。

<DemoBlock variant="default" direction="column">
  <div style="background: var(--govtw-color-bg-surface); border-radius: var(--govtw-radius-sm);">
    <govtw-container max-width="480px">
      <div style="padding: 12px 0; border-inline: 1px dashed var(--govtw-color-border-default);">這段內容最寬 480px，水平置中，左右各留 16px 內距。</div>
    </govtw-container>
  </div>

  <template #code>

```html
<govtw-container max-width="480px">
  <div>這段內容最寬 480px，水平置中，左右各留 16px 內距。</div>
</govtw-container>
```

  </template>
</DemoBlock>

### 標準頁面結構

Container 包住整頁內容，裡面再用 Stack 排列區塊。

<DemoBlock variant="page" direction="column">
  <govtw-container max-width="720px">
    <govtw-stack space="6">
      <h1 style="margin: 0;">申辦勞工保險</h1>
      <p style="margin: 0;">請依照下列步驟完成線上申辦。</p>
      <govtw-cluster space="3">
        <govtw-button>開始申辦</govtw-button>
      </govtw-cluster>
    </govtw-stack>
  </govtw-container>

  <template #code>

```html
<govtw-container max-width="720px">
  <govtw-stack space="6">
    <h1 style="margin: 0;">申辦勞工保險</h1>
    <p style="margin: 0;">請依照下列步驟完成線上申辦。</p>
    <govtw-cluster space="3">
      <govtw-button>開始申辦</govtw-button>
    </govtw-cluster>
  </govtw-stack>
</govtw-container>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-container';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `max-width` | `string` | `'1020px'` | 最大寬度，任何 CSS 長度值（如 `720px`、`60rem`、`100%`） |
| `padding` | `number` | `4` | 左右內距，對應 `--govtw-space-{n}` token（預設 16px） |

`padding` 只能用 token 有定義的值：`1`、`2`、`3`、`4`、`5`、`6`、`8`、`10`、`12`、`16`。填其他值時內距會變成 0。

### 建議寬度

| 用途 | `max-width` | 說明 |
|------|-------------|------|
| 一般服務頁面 | `1020px`（預設） | 含側邊欄的標準頁面 |
| 表單頁面 | `720px` | 欄位不會拉得過寬 |
| 文章、內容頁 | `640px` | 控制每行字數，方便閱讀 |
| 儀表板 | `100%` | 資料密集的頁面 |

## 事件

無事件。

## 無障礙

- **語意**：純佈局元件，不附加 role 或 ARIA。頁面主要區域仍要用 `<main>`、`<header>`、`<footer>` 標示
- **縮放**：Container 只設寬度上限（`max-inline-size`），不設固定寬度。使用者放大到 400% 時容器會跟著縮窄，不會產生水平捲軸（WCAG 2.2 SC 1.4.10 Reflow）
- **窄螢幕留白**：左右內距在手機上保持文字不貼邊

## 設計指引

### 何時使用

- 每個頁面最外層包一個 Container
- 頁首、主內容、頁尾各自包一個 Container，讓三者左右對齊

### 何時不使用

- 已經在 Container 裡面 → 不要再巢狀一層，內距會重複
- 需要滿版背景色的區塊 → 背景色放在外層元素，Container 放在裡面控制內容寬度

### 設計建議

- 同一個網站的頁首、主內容、頁尾用相同 `max-width`，左緣才會對齊
- 表單頁面用 `720px`，避免單一欄位過寬

### 相關元件

- [垂直堆疊 Stack](/components/stack)
- [側邊欄佈局 Sidebar](/components/sidebar)
