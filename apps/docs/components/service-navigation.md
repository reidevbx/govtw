# 主選單 Service Navigation

## 概述

主選單列出網站最上層的幾個區塊，放在頁首下方。參考 [GOV.UK Service navigation](https://design-system.service.gov.uk/components/service-navigation/)。

只支援**單層**連結，不做下拉選單。容器寬度不足 40rem（640px）時，收合成「選單」按鈕。

## 互動範例

### 基本用法

目前頁由作者在對應連結加 `aria-current="page"`，顯示為粗體加底線指示。

<DemoBlock variant="default" direction="column">
  <govtw-service-navigation>
    <a href="#">首頁</a>
    <a href="#" aria-current="page">申辦服務</a>
    <a href="#">最新消息</a>
    <a href="#">政府資訊公開</a>
    <a href="#">聯絡我們</a>
  </govtw-service-navigation>

  <template #code>

```html
<govtw-service-navigation>
  <a href="/">首頁</a>
  <a href="/services" aria-current="page">申辦服務</a>
  <a href="/news">最新消息</a>
  <a href="/open-data">政府資訊公開</a>
  <a href="/contact">聯絡我們</a>
</govtw-service-navigation>
```

  </template>
</DemoBlock>

### 窄容器收合

切換依據是**元件所在容器**的寬度，不是螢幕寬度。下面範例把元件放在 320px 寬的容器中，因此顯示「選單」按鈕。

<DemoBlock variant="collapsed" direction="column">
  <div style="max-inline-size: 320px;">
    <govtw-service-navigation>
      <a href="#">首頁</a>
      <a href="#" aria-current="page">申辦服務</a>
      <a href="#">最新消息</a>
      <a href="#">聯絡我們</a>
    </govtw-service-navigation>
  </div>

  <template #code>

```html
<div style="max-inline-size: 320px;">
  <govtw-service-navigation>
    <a href="/">首頁</a>
    <a href="/services" aria-current="page">申辦服務</a>
    <a href="/news">最新消息</a>
    <a href="/contact">聯絡我們</a>
  </govtw-service-navigation>
</div>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-service-navigation';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `label` | `string` | `'主選單'` | `<nav>` 地標的可讀名稱 |
| `toggle-text` | `string` | `'選單'` | 窄容器收合按鈕的文字 |
| `open` | `boolean` | `false` | 窄容器時選單是否展開 |

| 子元素 | 說明 |
|--------|------|
| `<a href>` | 選單項目。目前頁加 `aria-current="page"` |

### 限制

- 元件在頁面解析完成後，把子元素包裝一次。之後新增或移除子元素，不會重新包裝
- 用 JavaScript 建立時，請先加好子元素，再把元件插入頁面
- 元件以 light DOM 渲染，頁面自己的 CSS 也會影響連結

## 事件

無自訂事件。展開狀態可用 `open` 屬性讀取。

## 無障礙

- **地標**：自動包成 `<nav aria-label="主選單">`。一頁有多個 `<nav>` 時，每個都要有不同的名稱
- **目前頁**：以 `aria-current="page"` 標示，螢幕閱讀器會念出「目前頁面」。視覺上用粗體加指示線，不只靠顏色
- **收合按鈕**：原生 `<button>`，`aria-expanded` 表示展開狀態，`aria-controls` 指向清單
- **觸控目標**：每個項目高度至少 44px
- **單一 DOM**：寬窄兩種版面共用同一份連結，不重複輸出。調查發現多數網站把選單輸出 3 到 4 次，鍵盤使用者要多按很多次 Tab

## 設計指引

### 何時使用

- 網站有 2 到 7 個最上層區塊

### 何時不使用

- 單頁服務或線性流程（如線上申辦表單）：使用者應依步驟前進，不需要主選單
- 需要多層下拉：本元件不支援。請改成在各區塊首頁列出下一層連結

### 設計建議

- **項目不超過 7 個**：超過時考慮合併區塊
- **文字簡短**：每項 2 到 6 個字
- **目前頁要標示**：使用者進入子頁時，對應的上層項目也加 `aria-current="page"`
- **連結不要加 title**：調查發現有網站每個連結都加 `title="移至XXX"`，螢幕閱讀器會重複念

### 相關元件

- [麵包屑 Breadcrumbs](/components/breadcrumbs)
- [搜尋框 Search](/components/search)
