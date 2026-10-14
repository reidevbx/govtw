# 跳至主要內容 Skip Link

## 概述

讓鍵盤與螢幕閱讀器使用者略過頁首和導覽，直接跳到主內容。平時視覺隱藏，按 Tab 鍵聚焦時才顯示。參考 [GOV.UK Skip link](https://design-system.service.gov.uk/components/skip-link/)。

**每個頁面都要放**，而且必須是頁面上第一個可聚焦的元素。這是 WCAG 2.2 SC 2.4.1 Bypass Blocks（略過區塊）的標準做法。

台灣政府網站另有「:::」導盲磚慣例，見 [導盲磚 Accesskey](/components/accesskey)。兩者用途不同，建議同時使用。

## 互動範例

### 基本用法

點一下範例區塊內的空白處，再按 Tab 鍵，即可看到跳至主要內容連結。按 Enter 後，焦點會移到主內容。

<DemoBlock variant="default" direction="column">
  <govtw-skip-link href="#demo-main-content"></govtw-skip-link>
  <div style="padding: 12px; background: var(--govtw-color-bg-surface); border-radius: var(--govtw-radius-sm);">頁首與導覽（略過這一區）</div>
  <div id="demo-main-content" style="padding: 12px; border: 1px dashed var(--govtw-color-border-default); border-radius: var(--govtw-radius-sm);">主內容：按下跳至主要內容後，焦點會移到這裡</div>

  <template #code>

```html
<body>
  <govtw-skip-link href="#main-content"></govtw-skip-link>
  <header>頁首與導覽</header>
  <main id="main-content">主內容</main>
</body>
```

  </template>
</DemoBlock>

### 自訂文字

預設文字是「跳至主要內容」，可以用 default slot 改寫。多數情況請保留預設文字，讓全站一致。

```html
<govtw-skip-link href="#main-content">跳至申辦表單</govtw-skip-link>
```

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-skip-link';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `href` | `string` | `'#main-content'` | 主內容的錨點，格式為 `#id` |

| Slot | 說明 |
|------|------|
| （default） | 連結文字，預設「跳至主要內容」 |

## 事件

無自訂事件。點擊時元件會把焦點移到目標元素，不會阻止原生的錨點跳轉。

## 無障礙

- **位置**：必須是 `<body>` 內第一個可聚焦元素，放在頁首、導盲磚之前
- **焦點移動**：點擊後焦點移到目標元素。目標不可聚焦時（如 `<main>`），元件會暫時加上 `tabindex="-1"`，失焦後移除。之後按 Tab 會從主內容繼續往下
- **隱藏方式**：未聚焦時用 `clip-path` 視覺隱藏，不用 `display: none`，所以仍在 Tab 順序與無障礙樹中
- **聚焦樣式**：黃色背景（`#fd0`）加黑色底線，與 [連結 Link](/components/link) 的 focus 樣式一致
- **高對比模式**：保留透明 outline，在 Windows 高對比模式下仍看得到聚焦框

## 設計指引

### 何時使用

- 每個頁面都要放一個，指向 `<main>`

### 何時不使用

- 不要放多個跳過連結（如「跳至導覽」「跳至頁尾」）：區塊跳轉請用 [導盲磚 Accesskey](/components/accesskey)

### 設計建議

- 主內容元素加 `id="main-content"`，就能直接用預設的 `href`
- 目標必須存在。若 `href` 找不到元素，點擊時只會執行原生錨點跳轉，焦點不會移動

### 相關元件

- [導盲磚 Accesskey](/components/accesskey)
- [連結 Link](/components/link)
