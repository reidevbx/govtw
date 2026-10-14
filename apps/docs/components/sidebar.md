# Sidebar 側邊欄佈局

## 概述

側邊欄佈局把內容分成主內容和側邊欄兩欄。容器寬度不足時，兩欄自動堆疊成單欄。

堆疊由 CSS `flex-wrap` 處理，不依賴 media query。因此同一個元件放在窄容器裡也會自動切換。佈局元件的整體概念見 [基礎 › 佈局](/foundations/layout)。

## 互動範例

### 基本用法

第一個子元素是主內容，第二個是側邊欄。縮小視窗寬度可看到兩欄堆疊。

<DemoBlock variant="default" direction="column">
  <govtw-sidebar side-width="200px" content-min="50" space="4">
    <div style="padding: 16px; background: var(--govtw-color-bg-surface); border: 1px solid var(--govtw-color-border-subtle); border-radius: var(--govtw-radius-sm);">
      <strong>主內容</strong><br>佔滿剩餘寬度。
    </div>
    <div style="padding: 16px; background: var(--govtw-color-bg-surface); border: 1px solid var(--govtw-color-border-subtle); border-radius: var(--govtw-radius-sm);">
      <strong>側邊欄</strong><br>寬度 200px。
    </div>
  </govtw-sidebar>

  <template #code>

```html
<govtw-sidebar side-width="200px" content-min="50" space="4">
  <div>主內容</div>
  <div>側邊欄</div>
</govtw-sidebar>
```

  </template>
</DemoBlock>

### 側邊欄在左側

設定 `side="left"` 時，**第一個子元素變成側邊欄**，第二個是主內容。DOM 順序就是視覺順序，不用 CSS `order` 調換。

<DemoBlock variant="left" direction="column">
  <govtw-sidebar side="left" side-width="200px" content-min="50" space="4">
    <div style="padding: 16px; background: var(--govtw-color-bg-surface); border: 1px solid var(--govtw-color-border-subtle); border-radius: var(--govtw-radius-sm);">
      <strong>側邊欄</strong><br>寬度 200px。
    </div>
    <div style="padding: 16px; background: var(--govtw-color-bg-surface); border: 1px solid var(--govtw-color-border-subtle); border-radius: var(--govtw-radius-sm);">
      <strong>主內容</strong><br>佔滿剩餘寬度。
    </div>
  </govtw-sidebar>

  <template #code>

```html
<govtw-sidebar side="left" side-width="200px" content-min="50" space="4">
  <div>側邊欄</div>
  <div>主內容</div>
</govtw-sidebar>
```

  </template>
</DemoBlock>

### 服務頁面

主內容放 `<main>`，側邊欄放 `<aside>`。

```html
<govtw-sidebar side-width="16rem">
  <main>
    <h1>申辦服務</h1>
    <p>主要內容……</p>
  </main>
  <aside aria-label="相關連結">
    <h2>相關連結</h2>
    <ul>
      <li><govtw-link href="#">常見問題</govtw-link></li>
      <li><govtw-link href="#">聯絡我們</govtw-link></li>
    </ul>
  </aside>
</govtw-sidebar>
```

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-sidebar';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `side-width` | `string` | `'16rem'` | 側邊欄寬度，任何 CSS 長度值 |
| `content-min` | `number` | `60` | 主內容最小寬度，單位是容器寬度的百分比（0–100）。主內容低於此寬度時兩欄堆疊 |
| `space` | `number` | `6` | 兩欄之間的間距，對應 `--govtw-space-{n}` token（預設 24px） |
| `side` | `'right' \| 'left'` | `'right'` | 側邊欄位置。`right` 時第二個子元素是側邊欄；`left` 時第一個子元素是側邊欄 |

`space` 只能用 token 有定義的值：`1`、`2`、`3`、`4`、`5`、`6`、`8`、`10`、`12`、`16`。填其他值時間距會變成 0。

元件只處理前兩個子元素。放三個以上子元素時，中間的子元素不會套用任何寬度規則。

### 自動堆疊原理

- 主內容設 `flex-grow: 999`、`flex-basis: 0`、`min-inline-size: {content-min}%`
- 側邊欄設 `flex-grow: 1`、`flex-basis: {side-width}`
- 容器夠寬時，兩欄並排，主內容吃掉多餘空間
- 主內容無法維持 `content-min` 寬度時，flexbox 換行，兩欄各佔一整行

## 事件

無事件。

## 無障礙

- **使用地標標籤**：主內容用 `<main>`，側邊欄用 `<aside>` 或 `<nav>`，讓螢幕閱讀器使用者可以跳轉
- **閱讀順序**：堆疊後的順序就是 DOM 順序。`side="right"` 時主內容在上；`side="left"` 時側邊欄在上
- **左側導覽要考慮跳過連結**：`side="left"` 放導覽時，堆疊後導覽會在主內容上方。請在頁首提供「跳至主要內容」連結
- **縮放**：預設設定下，放大到 400% 時兩欄會堆疊成單欄，不會產生水平捲軸（WCAG 2.2 SC 1.4.10 Reflow）

## 設計指引

### 何時使用

- 主內容旁邊有相關連結、步驟說明、聯絡資訊
- 左側章節導覽 + 右側內容

### 何時不使用

- 三欄以上的版面 → 目前沒有對應元件，請拆成巢狀的 Sidebar 或自行用 CSS Grid
- 兩欄內容同等重要、需要等寬 → Sidebar 會讓主內容佔大部分寬度，不適合

### 設計建議

- **主要內容優先**：預設 `side="right"`，窄螢幕上使用者先看到主內容
- **側邊欄放次要資訊**：使用者不看側邊欄也要能完成任務
- **`content-min` 預設 60 即可**：調低會讓兩欄在更窄的寬度仍並排，主內容可能過窄

### 相關元件

- [頁面容器 Container](/components/container)
- [垂直堆疊 Stack](/components/stack)
- [水平排列 Cluster](/components/cluster)
