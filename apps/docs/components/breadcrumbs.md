# 麵包屑 Breadcrumbs

## 概述

麵包屑顯示目前頁面在網站階層中的位置，讓使用者一鍵回到上層頁面。參考 [GOV.UK Breadcrumbs](https://design-system.service.gov.uk/components/breadcrumbs/)。

放在頁首之下、主內容之上。作者只要寫一串 `<a>`，元件會自動包成 `<nav>` 與有序清單，並標示目前頁。

## 互動範例

### 基本用法

最後一項是目前頁，用 `<span>` 表示不可點。

<DemoBlock variant="default" direction="column">
  <govtw-breadcrumbs>
    <a href="#">首頁</a>
    <a href="#">申辦服務</a>
    <a href="#">戶政</a>
    <span>申請戶籍謄本</span>
  </govtw-breadcrumbs>

  <template #code>

```html
<govtw-breadcrumbs>
  <a href="/">首頁</a>
  <a href="/services">申辦服務</a>
  <a href="/services/household">戶政</a>
  <span>申請戶籍謄本</span>
</govtw-breadcrumbs>
```

  </template>
</DemoBlock>

### 窄螢幕換行

路徑過長時自動換行，分隔符號跟著項目移動。縮小視窗寬度可看到效果。

<DemoBlock variant="wrap" direction="column">
  <govtw-breadcrumbs>
    <a href="#">首頁</a>
    <a href="#">交通違規</a>
    <a href="#">一般交通違規</a>
    <a href="#">交通違規查詢及繳納</a>
    <span>查詢結果</span>
  </govtw-breadcrumbs>

  <template #code>

```html
<govtw-breadcrumbs>
  <a href="/">首頁</a>
  <a href="/violation">交通違規</a>
  <a href="/violation/general">一般交通違規</a>
  <a href="/violation/general/query">交通違規查詢及繳納</a>
  <span>查詢結果</span>
</govtw-breadcrumbs>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-breadcrumbs';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `label` | `string` | `'麵包屑'` | `<nav>` 地標的可讀名稱 |

| 子元素 | 說明 |
|--------|------|
| `<a href>` | 上層頁面連結 |
| `<span>` | 目前頁，放在最後一項 |

最後一個子元素一律標為目前頁。所以最後一項請放目前頁的 `<span>`，不要放上層連結。

### 限制

- 元件在頁面解析完成後，把子元素包裝一次。之後用 JavaScript 新增或移除子元素，不會重新包裝
- 用 JavaScript 建立時，請先加好子元素，再把元件插入頁面
- 元件以 light DOM 渲染：子元素仍在頁面上，頁面自己的 CSS 也會影響它們

## 事件

無事件。

## 無障礙

- **地標**：自動包成 `<nav aria-label="麵包屑">`，螢幕閱讀器可從地標清單跳到這裡
- **清單語意**：自動包成 `<ol>`，螢幕閱讀器會念出「清單，4 個項目」
- **目前頁**：最後一項自動加 `aria-current="page"`
- **分隔符號**：用 CSS 畫的箭頭，不是文字，螢幕閱讀器不會念出
- **聚焦樣式**：黃色背景加黑色底線，與 [連結 Link](/components/link) 一致

## 設計指引

### 何時使用

- 網站階層超過兩層，使用者可能需要回到上層
- 內容頁、服務說明頁

### 何時不使用

- 多步驟申辦流程中：使用者應依步驟前進或返回，改用 [返回連結 Back Link](https://design-system.service.gov.uk/components/back-link/)（規劃中）
- 只有一層的網站

### 設計建議

- **從首頁開始**：第一項固定為「首頁」
- **用頁面標題當文字**：每一項的文字與該頁 `<h1>` 一致
- **中間層要可點**：若某一層沒有自己的頁面，就不要放進麵包屑。調查發現多個網站把不能點的分類名稱放在路徑中，使用者點了沒反應
- **同一網站每頁都要有**：調查中有網站部分頁面缺少麵包屑

### 相關元件

- [主選單 Service Navigation](/components/service-navigation)
- [連結 Link](/components/link)
