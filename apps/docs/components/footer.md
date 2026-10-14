# 頁尾 Footer

## 概述

頁尾放在每個頁面最下方，顯示機關資訊、政策連結、更新日期與無障礙標章。參考 [GOV.UK Footer](https://design-system.service.gov.uk/components/footer/)。

元件**只負責版面**。台灣政府網站頁尾的固定內容由作者以 named slot 傳入。

## 互動範例

### 標準頁尾

<DemoBlock variant="default" direction="column">
  <govtw-footer>
    <govtw-accesskey key="Z" label="下方功能區塊"></govtw-accesskey>
    <address slot="contact" style="font-style: normal;">
      範例機關｜100057 臺北市中正區範例路 1 號<br>
      服務電話：(02) 1234-5678（週一至週五 08:30–17:30）
    </address>
    <govtw-cluster slot="meta" space="4">
      <govtw-link href="#">隱私權政策</govtw-link>
      <govtw-link href="#">資訊安全政策</govtw-link>
      <govtw-link href="#">政府網站資料開放宣告</govtw-link>
    </govtw-cluster>
    <p slot="updated">更新日期：<time datetime="2026-10-14">115-10-14</time></p>
    <div slot="badge" style="padding: 12px; border: 1px dashed var(--govtw-color-border-default); border-radius: var(--govtw-radius-sm);">無障礙標章圖片</div>
  </govtw-footer>

  <template #code>

```html
<govtw-footer>
  <govtw-accesskey key="Z" label="下方功能區塊"></govtw-accesskey>
  <address slot="contact">
    範例機關｜100057 臺北市中正區範例路 1 號<br>
    服務電話：(02) 1234-5678（週一至週五 08:30–17:30）
  </address>
  <govtw-cluster slot="meta" space="4">
    <govtw-link href="/privacy">隱私權政策</govtw-link>
    <govtw-link href="/security">資訊安全政策</govtw-link>
    <govtw-link href="/open-data">政府網站資料開放宣告</govtw-link>
  </govtw-cluster>
  <p slot="updated">更新日期：<time datetime="2026-10-14">115-10-14</time></p>
  <a slot="badge" href="（數位發展部核發的檢測頁網址）">
    <img src="/assets/a11y-badge-aa.png" alt="通過 AA 等級無障礙網頁檢測">
  </a>
</govtw-footer>
```

  </template>
</DemoBlock>

### 含網站地圖連結

`navigation` slot 放網站地圖連結群組。有內容時，下方自動顯示分隔線。

<DemoBlock variant="with-navigation" direction="column">
  <govtw-footer>
    <govtw-cluster slot="navigation" space="6">
      <govtw-link href="#">申辦服務</govtw-link>
      <govtw-link href="#">最新消息</govtw-link>
      <govtw-link href="#">政府資訊公開</govtw-link>
      <govtw-link href="#">網站導覽</govtw-link>
    </govtw-cluster>
    <address slot="contact" style="font-style: normal;">範例機關｜服務電話：(02) 1234-5678</address>
    <p slot="updated">更新日期：<time datetime="2026-10-14">115-10-14</time></p>
  </govtw-footer>

  <template #code>

```html
<govtw-footer>
  <govtw-cluster slot="navigation" space="6">
    <govtw-link href="/services">申辦服務</govtw-link>
    <govtw-link href="/news">最新消息</govtw-link>
    <govtw-link href="/open-data">政府資訊公開</govtw-link>
    <govtw-link href="/sitemap">網站導覽</govtw-link>
  </govtw-cluster>
  <address slot="contact">範例機關｜服務電話：(02) 1234-5678</address>
  <p slot="updated">更新日期：<time datetime="2026-10-14">115-10-14</time></p>
</govtw-footer>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-footer';
```

## 屬性

無屬性。內容透過 slot 傳入。

| Slot | 說明 |
|------|------|
| （default） | 放在頁尾最前面，供 [導盲磚 Accesskey](/components/accesskey) 使用 |
| `navigation` | 網站地圖連結群組（選用）。有內容時顯示分隔線 |
| `contact` | 機關名稱、地址、電話、服務時間，建議用 `<address>` |
| `meta` | 政策連結 |
| `updated` | 更新日期，建議用 `<time datetime>` |
| `badge` | 無障礙標章 |

版面寬度上限 1020px，與 [頁首 Header](/components/header) 一致。寬度不足時，標章自動換到下一行。元件會清除 slot 內容首尾的 margin，間距由元件控制。

## 事件

無事件。

## 無障礙

- **地標**：內部使用 `<footer>`，成為頁面的 contentinfo 地標。一頁只放一個。調查發現有網站把 contentinfo 用在首頁多個區塊，這是錯誤用法
- **機關資訊**：用 `<address>` 標示聯絡資訊
- **日期**：用 `<time datetime="2026-10-14">` 提供機器可讀的西元日期，畫面文字可以用民國年
- **無障礙標章**：圖片 alt 寫明等級，如「通過 AA 等級無障礙網頁檢測」。標章連結填數位發展部核發給該網站的檢測頁網址
- **社群連結文字**：用中文寫明平台，如「Facebook 粉絲專頁」。調查發現有網站用「find facebook」

::: warning 標章文案尚未查證
alt 文案與連結格式依調查時各網站的寫法整理，尚未查到數位發展部的規範原文。正式上線前請以數位發展部提供的標章說明為準。
:::

## 設計指引

### 何時使用

- 每個頁面都要有頁尾

### 政府網站頁尾的固定內容

| 內容 | 放在 |
|------|------|
| 機關名稱、地址、電話、服務時間 | `contact` |
| 隱私權政策、資訊安全政策、政府網站資料開放宣告 | `meta` |
| 更新日期 | `updated` |
| 無障礙標章 | `badge` |

### 設計建議

- **不放瀏覽人次**：計數器屬站台後端功能，對使用者沒有幫助
- **不放「最佳瀏覽解析度」**：響應式網頁應適用所有螢幕
- **網站地圖連結精簡**：只放最上層區塊；完整清單放在網站導覽頁

### 相關元件

- [頁首 Header](/components/header)
- [導盲磚 Accesskey](/components/accesskey)
- [水平排列 Cluster](/components/cluster)
