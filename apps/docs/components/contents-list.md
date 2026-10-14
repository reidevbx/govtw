# 頁內目錄 Contents List

## 概述

頁內目錄列出長篇頁面的段落標題，讓使用者直接跳到需要的段落。參考來源是台灣政府網站調查；GOV.UK Design System 不提供此元件。

全國政府入口網的長文頁有「目錄：一、二…」，但用表格排版。表格沒有導覽區語意，螢幕閱讀器的地標清單找不到它。

## 互動範例

<DemoBlock variant="default" direction="column">
  <govtw-contents-list>
    <ol>
      <li><a href="#background">一、計畫緣起</a></li>
      <li><a href="#goals">二、計畫目標</a></li>
      <li><a href="#budget">三、經費需求</a></li>
      <li><a href="#contact">四、聯絡窗口</a></li>
    </ol>
  </govtw-contents-list>

  <template #code>

```html
<govtw-contents-list>
  <ol>
    <li><a href="#background">一、計畫緣起</a></li>
    <li><a href="#goals">二、計畫目標</a></li>
    <li><a href="#budget">三、經費需求</a></li>
    <li><a href="#contact">四、聯絡窗口</a></li>
  </ol>
</govtw-contents-list>

<h2 id="background">一、計畫緣起</h2>
<h2 id="goals">二、計畫目標</h2>
…
```

  </template>
</DemoBlock>

### 兩層目錄

第二層對應 `<h3>`，會縮排顯示。

<DemoBlock variant="nested" direction="column">
  <govtw-contents-list>
    <ol>
      <li><a href="#background">一、計畫緣起</a></li>
      <li>
        <a href="#goals">二、計畫目標</a>
        <ol>
          <li><a href="#goals-short">（一）短期目標</a></li>
          <li><a href="#goals-long">（二）長期目標</a></li>
        </ol>
      </li>
      <li><a href="#budget">三、經費需求</a></li>
    </ol>
  </govtw-contents-list>

  <template #code>

```html
<govtw-contents-list>
  <ol>
    <li><a href="#background">一、計畫緣起</a></li>
    <li>
      <a href="#goals">二、計畫目標</a>
      <ol>
        <li><a href="#goals-short">（一）短期目標</a></li>
        <li><a href="#goals-long">（二）長期目標</a></li>
      </ol>
    </li>
    <li><a href="#budget">三、經費需求</a></li>
  </ol>
</govtw-contents-list>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-contents-list';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `heading` | `string` | `'目錄'` | 可見的目錄標題（`<h2>`），也是 `<nav>` 的可讀名稱 |

## 事件

無。

## 無障礙

- **導覽區**：元件包上 `<nav>`，以 `aria-labelledby` 指向可見的「目錄」標題。螢幕閱讀器使用者可以從地標清單找到它
- **清單語意**：作者寫的 `<ol>`／`<ul>` 保留在頁面上。元件會加上 `role="list"`，因為 Safari 會移除 `list-style: none` 清單的清單語意
- **編號**：中文編號寫在連結文字裡，螢幕閱讀器會念出。元件用 `list-style: none` 隱藏清單符號，避免出現「1. 一、計畫緣起」兩套編號
- **錨點目標**：每個連結的 `href="#id"` 要對應頁面上標題的 `id`。點擊後瀏覽器會捲動到該標題
- **觸控目標**：每個連結高度至少 44px
- **對比度**：連結使用 `link.default` 色

## 設計指引

### 何時使用

- 頁面有 4 個以上段落，使用者可能只需要其中一段，例如計畫說明、法規、申辦須知

### 何時不使用

- 連到同一單元的其他頁面：用[側邊選單](/components/side-navigation)
- 段落少於 4 個：直接閱讀即可，不需要目錄
- 內容可以拆成多頁時：考慮拆頁，而不是用目錄撐住一個很長的頁面

### 設計建議

- **文字與標題一致**：目錄連結的文字要和頁面標題完全相同，包含「一、」「（一）」等編號
- **最多兩層**：第二層對應 `<h3>`。更深的層級不要列入目錄
- **放在 `<h1>` 下方**：在主內容開頭、第一個段落之前
- **固定頁首會遮住標題**：如果網站有固定在畫面頂端的頁首，在標題加 `scroll-margin-block-start`，捲動後標題才不會被遮住

### 相關元件

- [側邊選單 Side Navigation](/components/side-navigation)
- [手風琴 Accordion](/components/accordion)
