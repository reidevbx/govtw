# 導盲磚 Accesskey

## 概述

導盲磚是台灣政府網站的無障礙慣例：在頁面各區塊開頭放一個「:::」定位點，並設定快速鍵（accesskey）。鍵盤與螢幕閱讀器使用者按快速鍵，就能直接跳到上方、中央、下方等區塊。

GOV.UK 沒有對應元件。本元件把各網站不一致的寫法（`javascript:` 連結、只靠 `title` 說明、重複 id）統一成一種。

::: tip 與跳至主要內容的分工
[跳至主要內容 Skip Link](/components/skip-link) 是 WCAG 2.4.1 的標準做法，只有一個，指向主內容。導盲磚是台灣慣例，標示多個區塊。兩者建議同時使用。
:::

## 互動範例

### 三區塊定位點

每個區塊開頭放一個導盲磚。點範例區塊內任一處後，按下方表格的組合鍵試試看。

<DemoBlock variant="default" direction="column">
  <div style="padding: 12px; background: var(--govtw-color-bg-surface); border-radius: var(--govtw-radius-sm);">
    <govtw-accesskey key="U" label="上方功能區塊"></govtw-accesskey>
    頁首與導覽
  </div>
  <div style="padding: 12px; border: 1px dashed var(--govtw-color-border-default); border-radius: var(--govtw-radius-sm);">
    <govtw-accesskey key="C" label="中央內容區塊"></govtw-accesskey>
    主內容
  </div>
  <div style="padding: 12px; background: var(--govtw-color-bg-surface); border-radius: var(--govtw-radius-sm);">
    <govtw-accesskey key="Z" label="下方功能區塊"></govtw-accesskey>
    頁尾
  </div>

  <template #code>

```html
<header>
  <govtw-accesskey key="U" label="上方功能區塊"></govtw-accesskey>
  …
</header>
<main id="main-content">
  <govtw-accesskey key="C" label="中央內容區塊"></govtw-accesskey>
  …
</main>
<footer>
  <govtw-accesskey key="Z" label="下方功能區塊"></govtw-accesskey>
  …
</footer>
```

  </template>
</DemoBlock>

### 搭配跳至主要內容

完整頁面的開頭順序：跳至主要內容 → 上方導盲磚 → 頁首。

```html
<body>
  <govtw-skip-link href="#main-content"></govtw-skip-link>
  <header>
    <govtw-accesskey key="U" label="上方功能區塊"></govtw-accesskey>
    …
  </header>
  <main id="main-content">
    <govtw-accesskey key="C" label="中央內容區塊"></govtw-accesskey>
    …
  </main>
</body>
```

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-accesskey';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `key` | `string` | `''` | **必填**。快速鍵字母，自動轉大寫 |
| `label` | `string` | `''` | **必填**。區塊名稱，作為螢幕閱讀器念出的名稱 |
| `anchor-id` | `string` | `'A{key}'` | 錨點 id。預設依 `key` 產生，如 `AU` |

缺少 `key` 或 `label` 時不渲染定位點，並在 console 顯示警告。

### 建議代號

| 代號 | 區塊 | `label` 建議文字 |
|------|------|------------------|
| `U` | 上方：頁首、主選單 | 上方功能區塊 |
| `C` | 中央：主內容 | 中央內容區塊 |
| `Z` | 下方：頁尾 | 下方功能區塊 |
| `L` | 左側選單（若有） | 左側選單區塊 |
| `S` | 搜尋框（若有） | 搜尋 |

U/C/Z 依據數位發展部與全國政府入口網的做法。部分網站下方區塊用 `B`，同一網站內請統一。

### 各平台組合鍵

組合鍵由瀏覽器決定，元件無法改變：

| 平台 | 瀏覽器 | 組合鍵 |
|------|--------|--------|
| Windows | Chrome、Edge | Alt + 代號 |
| Windows | Firefox | Alt + Shift + 代號 |
| macOS | Chrome、Safari、Firefox | Control + Option + 代號 |

## 事件

無事件。

## 無障礙

- **可讀名稱**：「:::」加了 `aria-hidden`，螢幕閱讀器只念 `label`（如「上方功能區塊」）
- **不依賴 title**：說明文字不放在 `title` 屬性，因為多數螢幕閱讀器預設不念 title
- **真實錨點**：`href` 指向自己的 id，沒有 JavaScript 也能運作。網站導覽頁可用 `<a href="#AC">` 連到各區塊
- **Light DOM**：定位點直接渲染在頁面上，不放在 Shadow DOM 內，因此錨點 id 可被其他連結找到
- **聚焦樣式**：黃色背景（`#fd0`），與 [連結 Link](/components/link) 一致
- **避免衝突**：不要用 `D`、`F`、`E` 等字母。例如 Chrome 的 Alt + D 會聚焦網址列

## 設計指引

### 何時使用

- 台灣政府網站的每個頁面：上方、中央、下方三處
- 有左側選單或搜尋框時，可加 `L`、`S`

### 何時不使用

- 一般區塊或段落：導盲磚只標示頁面主要區域，太多會讓使用者記不住

### 網站導覽頁的快速鍵說明

依慣例，網站導覽（Sitemap）頁要說明導盲磚。可參考以下文字：

```html
<h2>快速鍵說明</h2>
<p>本網站提供以下快速鍵，方便使用鍵盤瀏覽：</p>
<ul>
  <li>Alt + U：<a href="#AU">上方功能區塊</a>，包含頁首與主選單</li>
  <li>Alt + C：<a href="#AC">中央內容區塊</a>，本頁主要內容</li>
  <li>Alt + Z：<a href="#AZ">下方功能區塊</a>，包含頁尾資訊</li>
</ul>
<p>Firefox 請改按 Alt + Shift + 代號；macOS 請按 Control + Option + 代號。</p>
```

### 相關元件

- [跳至主要內容 Skip Link](/components/skip-link)
- [連結 Link](/components/link)
