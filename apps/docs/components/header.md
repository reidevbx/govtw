# 頁首 Header

## 概述

頁首放在每個頁面最上方，顯示機關 logo、服務名稱、工具列與主選單。參考 [GOV.UK Header](https://design-system.service.gov.uk/components/header/)。

元件**只負責版面**。logo、文字、搜尋框、主選單都由作者以 named slot 傳入，各自使用對應的元件。

## 互動範例

### 完整頁首

<DemoBlock variant="default" direction="column">
  <govtw-header>
    <govtw-accesskey key="U" label="上方功能區塊"></govtw-accesskey>
    <a slot="logo" href="#"><img src="/logo.svg" alt="範例機關首頁" style="block-size: 40px; inline-size: auto; display: block;"></a>
    <span slot="service-name">線上申辦服務</span>
    <govtw-search slot="tools" label="搜尋本網站" hide-label></govtw-search>
    <govtw-service-navigation slot="navigation">
      <a href="#">首頁</a>
      <a href="#" aria-current="page">申辦服務</a>
      <a href="#">最新消息</a>
      <a href="#">聯絡我們</a>
    </govtw-service-navigation>
  </govtw-header>

  <template #code>

```html
<govtw-skip-link href="#main-content"></govtw-skip-link>
<govtw-header>
  <govtw-accesskey key="U" label="上方功能區塊"></govtw-accesskey>
  <a slot="logo" href="/">
    <img src="/logo.svg" alt="範例機關首頁" height="40">
  </a>
  <span slot="service-name">線上申辦服務</span>
  <govtw-search slot="tools" action="/search" label="搜尋本網站" hide-label></govtw-search>
  <govtw-service-navigation slot="navigation">
    <a href="/">首頁</a>
    <a href="/services" aria-current="page">申辦服務</a>
    <a href="/news">最新消息</a>
    <a href="/contact">聯絡我們</a>
  </govtw-service-navigation>
</govtw-header>
```

  </template>
</DemoBlock>

### 最精簡頁首

只有 logo 與服務名稱。適合線上申辦等單一流程的服務：使用者應專注完成任務，不需要主選單。

<DemoBlock variant="minimal" direction="column">
  <govtw-header>
    <a slot="logo" href="#"><img src="/logo.svg" alt="範例機關首頁" style="block-size: 40px; inline-size: auto; display: block;"></a>
    <span slot="service-name">申請戶籍謄本</span>
  </govtw-header>

  <template #code>

```html
<govtw-header>
  <a slot="logo" href="/">
    <img src="/logo.svg" alt="範例機關首頁" height="40">
  </a>
  <span slot="service-name">申請戶籍謄本</span>
</govtw-header>
```

  </template>
</DemoBlock>

### 工具列

工具列放語言切換、字級切換等。多個項目用 [水平排列 Cluster](/components/cluster) 包起來，放進 `tools` slot。

```html
<govtw-cluster slot="tools" space="4">
  <govtw-link href="/en" lang="en">English</govtw-link>
  <govtw-link href="/sitemap">網站導覽</govtw-link>
  <govtw-search action="/search" label="搜尋本網站" hide-label></govtw-search>
</govtw-cluster>
```

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-header';
```

## 屬性

無屬性。內容透過 slot 傳入。

| Slot | 說明 |
|------|------|
| （default） | 放在 logo 前面，供 [導盲磚 Accesskey](/components/accesskey) 使用 |
| `logo` | 機關 logo，通常是包著 `<img>` 的首頁連結 |
| `service-name` | 服務或網站名稱，元件會套用粗體與較大字級 |
| `tools` | 工具列，如語言切換、搜尋框 |
| `navigation` | 主選單，放 [主選單 Service Navigation](/components/service-navigation) |

版面寬度上限 1020px，與 [頁面容器 Container](/components/container) 的預設值一致。寬度不足時，工具列自動換到 logo 下方。

## 事件

無事件。

## 無障礙

- **地標**：內部使用 `<header>`，成為頁面的 banner 地標。一頁只放一個
- **logo 不是 `<h1>`**：`<h1>` 留給主內容的頁面標題。調查發現有網站把 logo 包在 `<h1>`，導致每頁真正的標題變成 `<h2>`
- **logo 的 alt**：logo 是連結時，alt 描述連結目的地，如「數位發展部首頁」
- **順序**：頁面開頭依序放 [跳至主要內容 Skip Link](/components/skip-link)、頁首（含上方導盲磚）
- **單一 DOM**：寬窄版面共用同一份內容，不重複輸出

## 設計指引

### 何時使用

- 每個頁面都要有頁首

### 何時不使用

- 不要在同一頁放兩個頁首

### 設計建議

- **工具列最多 5 項**：調查發現台灣政府網站頁首常有 10 項以上工具，使用者不易找到需要的功能
- **不要放瀏覽器已有的功能**：如大型游標、ADHD 友善介面。使用者可在瀏覽器或作業系統設定
- **服務名稱要簡短**：如「線上申辦服務」，不要放完整機關全銜
- **線上申辦流程用最精簡頁首**：移除主選單與工具列，減少使用者分心

### 相關元件

- [主選單 Service Navigation](/components/service-navigation)
- [搜尋框 Search](/components/search)
- [跳至主要內容 Skip Link](/components/skip-link)
- [導盲磚 Accesskey](/components/accesskey)
