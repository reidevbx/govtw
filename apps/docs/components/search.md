# 搜尋框 Search

## 概述

站內搜尋框，包含可見標籤、搜尋輸入欄與送出按鈕。GOV.UK 沒有獨立元件，本元件參考其頁首搜尋的做法。

台灣政府網站幾乎每頁都有搜尋框。調查發現常見問題：輸入欄只有 placeholder、送出鈕用連結假冒、送出鈕沒有名稱。本元件一律使用原生 `<form>`、`<input>`、`<button>`。

## 互動範例

### 基本用法

標籤預設可見。範例中按下搜尋會把查詢帶到目前頁的網址（`?q=…`）。

<DemoBlock variant="default" direction="column">
  <govtw-search label="搜尋本網站"></govtw-search>

  <template #code>

```html
<govtw-search action="/search" label="搜尋本網站"></govtw-search>
```

  </template>
</DemoBlock>

### 隱藏標籤（放在頁首時）

空間有限時可視覺隱藏標籤，螢幕閱讀器仍會念出。只在頁首等「看得出是搜尋框」的位置使用。

<DemoBlock variant="hide-label" direction="column">
  <govtw-search label="搜尋本網站" hide-label></govtw-search>

  <template #code>

```html
<govtw-search action="/search" label="搜尋本網站" hide-label></govtw-search>
```

  </template>
</DemoBlock>

### 搭配熱門關鍵字

熱門關鍵字放在元件外，用 [水平排列 Cluster](/components/cluster) 排列連結。

<DemoBlock variant="with-keywords" direction="column">
  <govtw-stack space="3">
    <govtw-search label="找服務"></govtw-search>
    <govtw-cluster space="3">
      <span>熱門搜尋：</span>
      <govtw-link href="#">育兒津貼</govtw-link>
      <govtw-link href="#">護照</govtw-link>
      <govtw-link href="#">戶籍謄本</govtw-link>
      <govtw-link href="#">勞保</govtw-link>
    </govtw-cluster>
  </govtw-stack>

  <template #code>

```html
<govtw-stack space="3">
  <govtw-search action="/search" label="找服務"></govtw-search>
  <govtw-cluster space="3">
    <span>熱門搜尋：</span>
    <govtw-link href="/search?q=育兒津貼">育兒津貼</govtw-link>
    <govtw-link href="/search?q=護照">護照</govtw-link>
    <govtw-link href="/search?q=戶籍謄本">戶籍謄本</govtw-link>
    <govtw-link href="/search?q=勞保">勞保</govtw-link>
  </govtw-cluster>
</govtw-stack>
```

  </template>
</DemoBlock>

### 由 JavaScript 處理搜尋

監聽 `govtw-search` 事件並呼叫 `preventDefault()`，表單就不會送出。

```js
document.querySelector('govtw-search').addEventListener('govtw-search', (event) => {
  event.preventDefault();
  runSearch(event.detail.value);
});
```

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-search';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `action` | `string` | `''` | 表單送出網址；空值時送到目前頁 |
| `method` | `'get' \| 'post'` | `'get'` | 表單送出方式 |
| `name` | `string` | `'q'` | 查詢參數名稱 |
| `label` | `string` | `'搜尋本網站'` | 標籤文字，也是 search 地標的名稱 |
| `hide-label` | `boolean` | `false` | 視覺隱藏標籤 |
| `value` | `string` | `''` | 預設查詢文字 |
| `button-text` | `string` | `'搜尋'` | 送出按鈕文字 |

不提供 `placeholder`：placeholder 在輸入後消失，而且對比度通常不足。說明文字請寫在 `label`。

## 事件

| 事件 | detail | 說明 |
|------|--------|------|
| `govtw-search` | `{ value: string }` | 送出前觸發，可取消。呼叫 `preventDefault()` 會阻止表單送出 |

## 無障礙

- **地標**：`<form role="search">`，名稱取自 `label`。螢幕閱讀器可從地標清單直接跳到搜尋
- **可見標籤**：預設顯示。`hide-label` 只是視覺隱藏，可讀名稱不變
- **原生按鈕**：送出鈕是 `<button type="submit">`，有可見文字，按 Enter 也能送出
- **觸控目標**：輸入欄與按鈕高度 44px
- **聚焦樣式**：輸入欄黃色外框加粗邊框；按鈕黃色外框。與 [文字輸入 Text Input](/components/text-input)、[按鈕 Button](/components/button) 一致

## 設計指引

### 何時使用

- 網站超過約 20 頁，使用者可能找不到內容
- 頁首放一個全站搜尋；搜尋結果頁頂端再放一個，帶入目前查詢

### 何時不使用

- 篩選列表（如依日期、發布單位）：那是篩選表單，不是搜尋

### 設計建議

- **一頁只放一個全站搜尋**：調查中有網站在同一頁放兩個搜尋框且 id 重複
- **熱門關鍵字最多 8 個**：調查中有網站每頁放約 100 個關鍵字，鍵盤使用者要按非常多次 Tab 才能離開
- **不要導到 Google 進階搜尋**：站外搜尋頁的版面與無障礙品質無法控制

### 相關模式

- [搜尋結果頁](/patterns/search-results)

### 相關元件

- [文字輸入 Text Input](/components/text-input)
- [水平排列 Cluster](/components/cluster)
