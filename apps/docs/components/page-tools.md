# 頁面工具列 Page Tools

## 概述

頁面工具列提供「列印」與分享連結，放在內容頁的標題下方或頁尾。參考來源是台灣政府網站調查；[GOV.UK](https://design-system.service.gov.uk/) 不提供此元件。

gov.tw、高雄市政府的內容頁都有列印與 Facebook、LINE、Email 分享。調查發現的問題：

- 全部用 `javascript:` 連結，沒有 JavaScript 時不能用，也不能用右鍵複製網址
- 只有圖示，沒有文字；內政部的分享按鈕可讀名稱是「Share toPlurk」
- 列印用連結而不是按鈕

## 互動範例

### 預設

瀏覽器支援系統分享選單時（Web Share API，手機瀏覽器多半支援），只顯示一個「分享」按鈕；不支援時顯示各平台連結。

<DemoBlock variant="default" direction="column">
  <govtw-page-tools></govtw-page-tools>

  <template #code>

```html
<govtw-page-tools></govtw-page-tools>
```

  </template>
</DemoBlock>

### 一律顯示平台連結

<DemoBlock variant="links" direction="column">
  <govtw-page-tools platforms="line facebook x email" no-native-share></govtw-page-tools>

  <template #code>

```html
<govtw-page-tools platforms="line facebook x email" no-native-share></govtw-page-tools>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-page-tools';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `platforms` | `string` | `'line facebook email'` | 分享平台，空白分隔：`line`、`facebook`、`x`、`email` |
| `url` | `string` | `''` | 分享的網址；空值時用目前頁面網址 |
| `share-title` | `string` | `''` | 分享的標題；空值時用 `document.title` |
| `no-print` | `boolean` | `false` | 不顯示列印按鈕 |
| `no-native-share` | `boolean` | `false` | 不使用系統分享選單，一律顯示各平台連結 |

## 事件

無。

## 無障礙

- **列印與分享用 `<button>`**：觸發動作的項目是按鈕，不用連結假裝
- **分享平台是真實連結**：`<a href>` 指向各平台的分享網址，不用 `javascript:`
- **可見文字**：每個項目都有文字，不只用圖示。可讀名稱為「分享到 LINE」
- **同一分頁開啟**：分享連結不另開新視窗，使用者分享完按上一頁即可回來
- **觸控目標**：每個項目高度至少 44px
- **列印時隱藏**：列印出的頁面不含工具列

## 設計指引

### 何時使用

- 新聞稿、公告、說明頁等使用者可能想轉給別人的內容頁

### 何時不使用

- 申辦流程中的表單頁：使用者不需要分享填到一半的表單
- 需要登入才能看的頁面：分享出去別人也打不開

### 設計建議

- **平台不要太多**：3 到 4 個即可。預設 LINE、Facebook、Email
- **列印前先確認版面**：用瀏覽器的列印預覽檢查內容是否完整，必要時為頁面加列印樣式
- **不需要「回上一頁」「回頂端」按鈕**：瀏覽器已經提供

### 相關元件

- 字級切換 Font Size Switcher（規劃中）
- [按鈕 Button](/components/button)
