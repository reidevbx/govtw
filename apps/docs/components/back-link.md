# 返回連結 Back Link

## 概述

返回連結放在多步驟表單頁面的最上方，讓使用者回到上一步。參考 [GOV.UK Back link](https://design-system.service.gov.uk/components/back-link/)。

`href` 必填，指向實際的上一步網址。元件**不提供** `history.back()`：使用者可能從書籤或其他網站直接進入此頁，此時「瀏覽器上一頁」會離開你的服務。

## 互動範例

### 基本用法

<DemoBlock variant="default" direction="column">
  <govtw-back-link href="#"></govtw-back-link>

  <template #code>

```html
<govtw-back-link href="/apply/step-1"></govtw-back-link>
```

  </template>
</DemoBlock>

### 自訂文字

預設文字是「返回」，可用 default slot 改寫。多數情況請保留預設文字。

<DemoBlock variant="custom-text" direction="column">
  <govtw-back-link href="#">返回申請人資料</govtw-back-link>

  <template #code>

```html
<govtw-back-link href="/apply/applicant">返回申請人資料</govtw-back-link>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-back-link';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `href` | `string` | `''` | **必填**。上一步的網址 |

| Slot | 說明 |
|------|------|
| （default） | 連結文字，預設「返回」 |

缺少 `href` 時不渲染連結，並在 console 顯示警告。

## 事件

無事件。

## 無障礙

- **真實連結**：使用 `<a href>`，沒有 JavaScript 也能運作
- **箭頭**：用 CSS 畫，不是文字，螢幕閱讀器不會念出
- **聚焦樣式**：黃色背景加黑色底線，與 [連結 Link](/components/link) 一致

## 設計指引

### 何時使用

- 多步驟表單或申辦流程的每一頁頂端（第一頁除外）

### 何時不使用

- 內容頁之間的導覽 → 用 [麵包屑 Breadcrumbs](/components/breadcrumbs)
- 新聞的「上一則／下一則」 → 用 [分頁 Pagination](/components/pagination) 的 `block` 變體
- 已經有麵包屑的頁面：兩者不要同時出現

### 設計建議

- **放在頁首下方、主內容上方**
- **指向實際的上一步**：調查發現多個網站的「回上一頁」依賴 `history.back()` 或 `document.referrer`，沒有 JavaScript 時無法使用

### 相關元件

- [麵包屑 Breadcrumbs](/components/breadcrumbs)
- [分頁 Pagination](/components/pagination)
