# 長篇內容頁

## 概述

計畫說明、法規、申辦須知這類長篇文字頁的版型：左側列出同單元的其他頁，主內容開頭放頁內目錄，結尾放附件與頁面工具列。GOV.UK Design System 沒有這個模式，本頁依台灣政府網站調查整理。

調查中全國政府入口網的長文頁用表格排版目錄；多個機關的內頁左側有子選單，但輸出了整個網站的選單。

## 何時使用

- 一頁有 4 個以上段落，使用者可能只需要其中一段
- 同一單元有多個相關頁面，例如「戶籍謄本」底下的臨櫃申請、線上申請

## 範例

<DemoBlock variant="default" direction="column">
  <govtw-stack space="6">
    <govtw-breadcrumbs>
      <a href="#">首頁</a>
      <a href="#">施政計畫</a>
      <span>數位服務創新計畫</span>
    </govtw-breadcrumbs>
    <govtw-sidebar side="left" side-width="14rem" space="8">
      <govtw-side-navigation label="施政計畫選單">
        <ul>
          <li><a href="#">年度施政計畫</a></li>
          <li><a href="#" aria-current="page">數位服務創新計畫</a></li>
          <li><a href="#">資訊安全計畫</a></li>
        </ul>
      </govtw-side-navigation>
      <div>
        <govtw-stack space="6">
          <h1>數位服務創新計畫</h1>
          <govtw-contents-list>
            <ol>
              <li><a href="#background">一、計畫緣起</a></li>
              <li><a href="#goals">二、計畫目標</a></li>
              <li><a href="#budget">三、經費需求</a></li>
              <li><a href="#contact">四、聯絡窗口</a></li>
            </ol>
          </govtw-contents-list>
          <h2 id="background">一、計畫緣起</h2>
          <p>（內文）</p>
          <h2 id="goals">二、計畫目標</h2>
          <p>（內文）</p>
          <h2 id="budget">三、經費需求</h2>
          <p>（內文）</p>
          <h2 id="contact">四、聯絡窗口</h2>
          <p>（內文）</p>
          <govtw-attachment heading="數位服務創新計畫書">
            <govtw-attachment-file href="#" format="PDF" size="1.2 MB"></govtw-attachment-file>
            <govtw-attachment-file href="#" format="ODT" size="86 KB"></govtw-attachment-file>
          </govtw-attachment>
          <govtw-page-tools></govtw-page-tools>
        </govtw-stack>
      </div>
    </govtw-sidebar>
  </govtw-stack>

  <template #code>

```html
<govtw-breadcrumbs>
  <a href="/">首頁</a>
  <a href="/plans">施政計畫</a>
  <span>數位服務創新計畫</span>
</govtw-breadcrumbs>

<govtw-sidebar side="left" side-width="14rem" space="8">
  <govtw-side-navigation label="施政計畫選單">
    <ul>
      <li><a href="/plans/annual">年度施政計畫</a></li>
      <li><a href="/plans/digital" aria-current="page">數位服務創新計畫</a></li>
      <li><a href="/plans/security">資訊安全計畫</a></li>
    </ul>
  </govtw-side-navigation>

  <main id="main-content">
    <h1>數位服務創新計畫</h1>

    <govtw-contents-list>
      <ol>
        <li><a href="#background">一、計畫緣起</a></li>
        <li><a href="#goals">二、計畫目標</a></li>
        …
      </ol>
    </govtw-contents-list>

    <h2 id="background">一、計畫緣起</h2>
    <p>…</p>
    …

    <govtw-attachment heading="數位服務創新計畫書">
      <govtw-attachment-file href="/files/plan.pdf" format="PDF" size="1.2 MB"></govtw-attachment-file>
      <govtw-attachment-file href="/files/plan.odt" format="ODT" size="86 KB"></govtw-attachment-file>
    </govtw-attachment>

    <govtw-page-tools></govtw-page-tools>
  </main>
</govtw-sidebar>
```

  </template>
</DemoBlock>

範例的計畫名稱是示意。容器寬度不夠時，側邊選單會移到主內容上方。

## 做法

### 1. 頁面組成

由上到下：

1. [麵包屑](/components/breadcrumbs)
2. [側邊欄佈局](/components/sidebar)：左側 [側邊選單](/components/side-navigation)，右側主內容
3. 主內容：`<h1>` → [頁內目錄](/components/contents-list) → 內文 → [附件下載](/components/attachment) → [頁面工具列](/components/page-tools)

### 2. 側邊選單只列本單元

- 只列同一單元的頁面，不要把整個網站的選單複製一份
- 目前頁的連結加 `aria-current="page"`

### 3. 頁內目錄與標題一致

- 目錄連結的文字和頁面標題完全相同，包含「一、」「（一）」等編號
- 每個 `<h2>` 都要有 `id`，對應目錄連結的 `href`
- 段落少於 4 個時，不需要目錄

### 4. 附件放在內文之後

- 一份文件提供多種格式時，放在同一個附件區塊
- 附件的內容要能在網頁上讀到。只放 PDF、不寫內文，使用者要先下載才知道內容

### 5. 何時拆頁

使用者通常只看其中一段時，考慮拆成多頁，用側邊選單串起來。不要用目錄撐住一個很長的頁面。

## 無障礙

- **地標**：側邊選單是 `<nav>`、頁內目錄是另一個 `<nav>`，兩者名稱不同（「施政計畫選單」「目錄」），螢幕閱讀器使用者可以從地標清單分辨
- **主內容**：主內容用 `<main id="main-content">`，搭配[跳至主要內容](/components/skip-link)連結
- **標題層級**：`<h1>` 只有一個，目錄對應的段落用 `<h2>`，不要跳級
- **閱讀順序**：側邊選單在原始碼中排在主內容之前，窄螢幕時也顯示在上方，順序一致

## 用到的元件

- [麵包屑 Breadcrumbs](/components/breadcrumbs)
- [側邊欄佈局 Sidebar](/components/sidebar)
- [側邊選單 Side Navigation](/components/side-navigation)
- [頁內目錄 Contents List](/components/contents-list)
- [附件下載 Attachment](/components/attachment)
- [頁面工具列 Page Tools](/components/page-tools)
- [跳至主要內容 Skip Link](/components/skip-link)

## 參考來源

- 台灣政府網站調查（2026-10-14）
- GOV.UK Design System 沒有長篇內容頁模式
