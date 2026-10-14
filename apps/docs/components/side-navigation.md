# 側邊選單 Side Navigation

## 概述

側邊選單列出同一單元內的頁面，讓使用者在相關頁面之間切換。參考來源是台灣政府網站調查；GOV.UK Design System 不提供此元件。

臺北市政府、高雄市政府、戶政司的內頁左側都有子選單。調查發現的問題：

- 側邊選單輸出整個網站的選單，與主選單重複
- 收合開關用 `<a>` 或 `<div>`，不是 `<button>`，鍵盤無法操作或螢幕閱讀器不知道狀態

## 互動範例

<DemoBlock variant="default" direction="column">
  <div style="max-inline-size: 18rem;">
    <govtw-side-navigation>
      <ul>
        <li><a href="#">戶籍登記</a></li>
        <li>
          <a href="#">戶籍謄本</a>
          <ul>
            <li><a href="#">臨櫃申請</a></li>
            <li><a href="#" aria-current="page">線上申請</a></li>
            <li><a href="#">跨機關查詢</a></li>
          </ul>
        </li>
        <li><a href="#">身分證</a></li>
        <li><a href="#">門牌</a></li>
      </ul>
    </govtw-side-navigation>
  </div>

  <template #code>

```html
<govtw-side-navigation>
  <ul>
    <li><a href="/household/register">戶籍登記</a></li>
    <li>
      <a href="/household/transcript">戶籍謄本</a>
      <ul>
        <li><a href="/household/transcript/counter">臨櫃申請</a></li>
        <li><a href="/household/transcript/online" aria-current="page">線上申請</a></li>
        <li><a href="/household/transcript/query">跨機關查詢</a></li>
      </ul>
    </li>
    <li><a href="/household/id-card">身分證</a></li>
    <li><a href="/household/address">門牌</a></li>
  </ul>
</govtw-side-navigation>
```

  </template>
</DemoBlock>

### 搭配側邊欄佈局

用 [Sidebar](/components/sidebar) 把選單放在主內容左側。容器變窄時，選單會移到主內容上方。

```html
<govtw-sidebar side="left" side-width="16rem">
  <govtw-side-navigation>
    <ul>…</ul>
  </govtw-side-navigation>
  <main>…</main>
</govtw-sidebar>
```

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-side-navigation';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `label` | `string` | `'本單元選單'` | `<nav>` 地標的可讀名稱。同一頁有多個 `<nav>` 時，名稱要能區分 |

### 子元素

| 元素 | 說明 |
|------|------|
| `<ul><li><a>` | 選單項目，最多兩層 |
| `aria-current="page"` | 加在目前頁的 `<a>` 上 |

## 事件

無。

## 無障礙

- **導覽地標**：元件包上 `<nav aria-label="本單元選單">`，螢幕閱讀器可從地標清單跳到選單
- **目前頁**：作者在 `<a>` 加 `aria-current="page"`；畫面上以左側粗線加粗體標示，不只靠顏色
- **不收合**：沒有收合開關，所有項目都能直接用 Tab 走到
- **觸控目標**：每個項目高度至少 44px
- **巢狀清單**：第二層是第一層 `<li>` 裡的 `<ul>`，螢幕閱讀器會念出層級

## 設計指引

### 何時使用

- 單元內有 5 頁以上，使用者需要在其中切換

### 何時不使用

- 單元只有兩三頁：在內文用連結即可
- 整個網站的主選單：用[服務導覽](/components/service-navigation)
- 連到同一頁的段落：用[頁內目錄](/components/contents-list)

### 設計建議

- **只列本單元**：不要把整個網站的選單複製一份
- **只展開目前分支**：其他分支只列第一層，選單才不會太長
- **最多兩層**：需要更多層時，表示單元要重新分類

### 相關元件

- [Sidebar](/components/sidebar)
- [服務導覽 Service Navigation](/components/service-navigation)
- [麵包屑 Breadcrumbs](/components/breadcrumbs)
- [頁內目錄 Contents List](/components/contents-list)
