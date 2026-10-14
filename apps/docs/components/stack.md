# Stack 垂直堆疊

## 概述

垂直堆疊把子元素由上往下排列，並用同一個間距隔開。這是最基本的佈局元件，適用於頁面區塊、表單欄位、卡片內容。

間距一律由 `space` 屬性控制，不必在每個子元素上寫 margin。佈局元件的整體概念見 [基礎 › 佈局](/foundations/layout)。

## 互動範例

### 基本用法

<DemoBlock variant="default" direction="column">
  <govtw-stack space="4">
    <div style="padding: 12px; background: var(--govtw-color-bg-surface); border: 1px solid var(--govtw-color-border-subtle); border-radius: var(--govtw-radius-sm);">區塊 A</div>
    <div style="padding: 12px; background: var(--govtw-color-bg-surface); border: 1px solid var(--govtw-color-border-subtle); border-radius: var(--govtw-radius-sm);">區塊 B</div>
    <div style="padding: 12px; background: var(--govtw-color-bg-surface); border: 1px solid var(--govtw-color-border-subtle); border-radius: var(--govtw-radius-sm);">區塊 C</div>
  </govtw-stack>

  <template #code>

```html
<govtw-stack space="4">
  <div>區塊 A</div>
  <div>區塊 B</div>
  <div>區塊 C</div>
</govtw-stack>
```

  </template>
</DemoBlock>

### 表單欄位

表單欄位之間建議用 `space="6"`（24px）。

<DemoBlock variant="form" direction="column">
  <govtw-stack space="6">
    <govtw-text-input label="姓名" name="name"></govtw-text-input>
    <govtw-text-input label="電話" name="phone" type="tel" width="10"></govtw-text-input>
    <govtw-button>送出</govtw-button>
  </govtw-stack>

  <template #code>

```html
<govtw-stack space="6">
  <govtw-text-input label="姓名" name="name"></govtw-text-input>
  <govtw-text-input label="電話" name="phone" type="tel" width="10"></govtw-text-input>
  <govtw-button>送出</govtw-button>
</govtw-stack>
```

  </template>
</DemoBlock>

### 巢狀堆疊

外層用大間距分隔區塊，內層用小間距排列區塊內的元素。

<DemoBlock variant="nested" direction="column">
  <govtw-stack space="8">
    <govtw-stack space="2">
      <div style="padding: 12px; background: var(--govtw-color-bg-surface); border: 1px solid var(--govtw-color-border-subtle); border-radius: var(--govtw-radius-sm);">區塊一：項目 1</div>
      <div style="padding: 12px; background: var(--govtw-color-bg-surface); border: 1px solid var(--govtw-color-border-subtle); border-radius: var(--govtw-radius-sm);">區塊一：項目 2</div>
    </govtw-stack>
    <govtw-stack space="2">
      <div style="padding: 12px; background: var(--govtw-color-bg-surface); border: 1px solid var(--govtw-color-border-subtle); border-radius: var(--govtw-radius-sm);">區塊二：項目 1</div>
      <div style="padding: 12px; background: var(--govtw-color-bg-surface); border: 1px solid var(--govtw-color-border-subtle); border-radius: var(--govtw-radius-sm);">區塊二：項目 2</div>
    </govtw-stack>
  </govtw-stack>

  <template #code>

```html
<govtw-stack space="8">
  <govtw-stack space="2">
    <div>區塊一：項目 1</div>
    <div>區塊一：項目 2</div>
  </govtw-stack>
  <govtw-stack space="2">
    <div>區塊二：項目 1</div>
    <div>區塊二：項目 2</div>
  </govtw-stack>
</govtw-stack>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-stack';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `space` | `number` | `4` | 子元素間距，對應 `--govtw-space-{n}` token |

`space` 只能用 token 有定義的值：`1`、`2`、`3`、`4`、`5`、`6`、`8`、`10`、`12`、`16`。填其他值（如 `7`）時 token 不存在，間距會變成 0。

| space 值 | 實際大小 | 適用場景 |
|----------|---------|---------|
| `2` | 8px | 緊密相關的元素 |
| `4` | 16px | 段落、清單項目 |
| `6` | 24px | 表單欄位之間 |
| `8` | 32px | 頁面區塊之間 |
| `12` | 48px | 頁面大段落之間 |

## 事件

無事件。

## 無障礙

- **語意**：純佈局元件，不附加 role 或 ARIA。輔助科技只會讀到子元素本身的語意
- **閱讀順序**：視覺順序與 DOM 順序一致，鍵盤 Tab 順序不受影響
- **不取代語意標籤**：頁面區塊仍應使用 `<section>`、`<main>` 等標籤，Stack 只負責間距

## 設計指引

### 何時使用

- 一組元素需要由上往下排列，且間距一致
- 表單欄位、頁面段落、卡片內容

### 何時不使用

- 元素需要水平排列 → 用 [水平排列 Cluster](/components/cluster)
- 需要主內容 + 側邊欄兩欄 → 用 [側邊欄佈局 Sidebar](/components/sidebar)

### 設計建議

- **間距由外而內遞減**：頁面區塊用 `8–12`，區塊內用 `4–6`，緊密元素用 `2–3`
- **注意 margin 會疊加**：`tokens.css` 預設給 `h1`–`h6`、`p` 下方 margin（例如 `h2` 是 24px）。這些 margin 會加在 `space` 之上。需要精準間距時，把子元素的 margin 設為 0

### 相關元件

- [水平排列 Cluster](/components/cluster)
- [頁面容器 Container](/components/container)
- [側邊欄佈局 Sidebar](/components/sidebar)
