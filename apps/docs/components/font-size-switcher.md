# 字級切換 Font Size Switcher

## 概述

字級切換讓使用者把整個網站的文字放大或縮小。參考來源是台灣政府網站調查；[GOV.UK](https://design-system.service.gov.uk/) 不提供此元件。

WCAG 不要求這個功能，因為瀏覽器本身可以縮放（WCAG 1.4.4 要求放大到 200% 時內容仍可使用）。但台灣政府網站普遍提供「小／中／大」切換，使用者也習慣找它。

## 互動範例

::: warning 會改變整個文件站台
按下範例的按鈕，會在本站的 `<html>` 設定字級並存到瀏覽器。文件站台的導覽列以 px 定義，不會縮放；以 rem 定義的範例元件會一起縮放。按「中」可以還原。
:::

<DemoBlock variant="default" direction="column">
  <govtw-font-size-switcher></govtw-font-size-switcher>

  <template #code>

```html
<govtw-font-size-switcher></govtw-font-size-switcher>
```

  </template>
</DemoBlock>

## 運作方式

1. 使用者按「大」
2. 元件在 `<html>` 設 `data-font-size="large"`
3. `tokens.css` 的規則把根字級設為 125%
4. 所有以 rem 定義的字級 token 一起放大

| `data-font-size` | 根字級 |
|------------------|--------|
| `small` | 87.5% |
| `medium` | 100% |
| `large` | 125% |

用百分比而不是 px，保留使用者在瀏覽器設定的基準字級。

### 避免載入時閃動

元件在 JavaScript 載入後才讀取儲存的字級，頁面可能先以預設字級顯示再跳動。在 `<head>` 最前面加一段同步程式可避免：

```html
<script>
  try {
    const size = localStorage.getItem('govtw-font-size');
    if (size) document.documentElement.setAttribute('data-font-size', size);
  } catch {}
</script>
```

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-font-size-switcher';
```

網站必須載入 `tokens.css`，字級規則在其中。

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `label` | `string` | `'字級'` | 群組的可見標籤與可讀名稱 |
| `storage-key` | `string` | `'govtw-font-size'` | localStorage 的 key；設為空字串時不儲存 |

## 事件

| 事件 | 說明 |
|------|------|
| `govtw-change` | 切換字級時觸發。`detail.size` 為 `small`、`medium` 或 `large` |

## 無障礙

- **按鈕群組**：三個 `<button>` 包在 `role="group"` 內，群組名稱取自可見標籤「字級」
- **目前字級**：`aria-pressed="true"`；畫面上反白加粗體，不只靠顏色
- **觸控目標**：每個按鈕至少 44×44px
- **多個切換器同步**：頁首與頁尾都放時，任一個切換後另一個的狀態會跟著更新
- **儲存失敗不影響使用**：私密瀏覽或停用儲存時，字級仍會套用到目前頁面

## 設計指引

### 何時使用

- 網站使用者以年長者為主，或機關有提供字級切換的需求

### 何時不使用

- 元件或頁面用 px 定義字級：切換不會有效果，先把字級改成 rem

### 設計建議

- **放在固定位置**：頁首右上角，每頁都在同一個地方
- **放大後檢查版面**：在「大」字級下確認文字不會被截斷或重疊
- **不要取代瀏覽器縮放**：版面仍須支援放大到 200%

### 相關元件

- [頁首 Header](/components/header)
- [頁面工具列 Page Tools](/components/page-tools)
