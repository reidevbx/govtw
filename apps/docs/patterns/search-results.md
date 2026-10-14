# 搜尋結果頁

## 概述

使用者搜尋網站內容後看到的頁面：保留關鍵字、顯示結果筆數、列出結果並分頁。GOV.UK Design System 沒有搜尋結果模式，本頁組合本設計系統既有的元件整理。

## 何時使用

- 網站內的全文搜尋結果
- 新聞、公告、法規等列表頁的查詢結果

## 範例

### 有結果

<DemoBlock variant="default" direction="column">
  <govtw-stack space="6">
    <h1>搜尋結果</h1>
    <govtw-search label="搜尋本網站" value="補助"></govtw-search>
    <form novalidate onsubmit="event.preventDefault()">
      <govtw-stack space="4">
        <p>共 128 筆符合「補助」的結果，第 2 / 13 頁</p>
        <input type="hidden" name="q" value="補助">
        <govtw-cluster space="3" vertical-align="end">
          <govtw-select name="per-page" label="每頁筆數" value="10">
            <option value="10">10 筆</option>
            <option value="20">20 筆</option>
            <option value="50">50 筆</option>
          </govtw-select>
          <govtw-button type="submit" variant="secondary">套用</govtw-button>
        </govtw-cluster>
      </govtw-stack>
    </form>
    <govtw-document-list>
      <govtw-document-list-item heading="115 年度數位服務創新補助計畫開始受理申請" href="#" date="2026-10-14" unit="數位產業署">
        <govtw-tag slot="tags" color="blue">公告</govtw-tag>
      </govtw-document-list-item>
      <govtw-document-list-item heading="中小企業數位轉型補助申請須知" href="#" date="2026-09-30" unit="中小及新創企業署">
        <govtw-tag slot="tags" color="green">申辦須知</govtw-tag>
      </govtw-document-list-item>
    </govtw-document-list>
    <govtw-pagination total="13" current="2" href-template="?q=補助&page={n}&per-page=10"></govtw-pagination>
  </govtw-stack>

  <template #code>

```html
<h1>搜尋結果</h1>
<govtw-search action="/search" label="搜尋本網站" value="補助"></govtw-search>

<form action="/search" method="get">
  <p>共 128 筆符合「補助」的結果，第 2 / 13 頁</p>
  <input type="hidden" name="q" value="補助">
  <govtw-cluster space="3" vertical-align="end">
    <govtw-select name="per-page" label="每頁筆數" value="10">
      <option value="10">10 筆</option>
      <option value="20">20 筆</option>
      <option value="50">50 筆</option>
    </govtw-select>
    <govtw-button type="submit" variant="secondary">套用</govtw-button>
  </govtw-cluster>
</form>

<govtw-document-list>
  <govtw-document-list-item
    heading="115 年度數位服務創新補助計畫開始受理申請"
    href="/news/1234" date="2026-10-14" unit="數位產業署">
    <govtw-tag slot="tags" color="blue">公告</govtw-tag>
  </govtw-document-list-item>
  …
</govtw-document-list>

<govtw-pagination total="13" current="2"
  href-template="/search?q=補助&page={n}&per-page=10"></govtw-pagination>
```

  </template>
</DemoBlock>

範例的標題、機關名稱都是示意。

### 沒有結果

<DemoBlock variant="no-results" direction="column">
  <govtw-stack space="6">
    <h1>搜尋結果</h1>
    <govtw-search label="搜尋本網站" value="補肋"></govtw-search>
    <p>找不到符合「補肋」的結果。</p>
    <div>
      <p>你可以：</p>
      <ul>
        <li>檢查有沒有錯字</li>
        <li>改用其他關鍵字，或用較少的字詞</li>
        <li>用較通用的說法，例如「補助」而不是「補助款申請表」</li>
      </ul>
    </div>
  </govtw-stack>

  <template #code>

```html
<h1>搜尋結果</h1>
<govtw-search action="/search" label="搜尋本網站" value="補肋"></govtw-search>

<p>找不到符合「補肋」的結果。</p>
<p>你可以：</p>
<ul>
  <li>檢查有沒有錯字</li>
  <li>改用其他關鍵字，或用較少的字詞</li>
  <li>用較通用的說法，例如「補助」而不是「補助款申請表」</li>
</ul>
```

  </template>
</DemoBlock>

## 做法

### 1. 頁面組成

由上到下：

1. 標題「搜尋結果」
2. [搜尋框](/components/search)：填入使用者剛才的關鍵字，方便修改後再搜尋
3. 結果筆數：「共 128 筆符合『補助』的結果，第 2 / 13 頁」。使用者先知道結果有多少，再決定要不要翻頁
4. 每頁筆數（選配）
5. [文件列表](/components/document-list)
6. [分頁](/components/pagination)

### 2. 每頁筆數

- 用一般段落與[選擇清單](/components/select)組合，不要放進分頁元件
- 用「套用」按鈕送出。選了就自動重新載入，鍵盤使用者用方向鍵瀏覽選項時會被打斷（WCAG 3.2.2）
- 用隱藏欄位帶上關鍵字，改每頁筆數時不會遺失搜尋條件
- 每頁筆數改變時，回到第 1 頁

### 3. 分頁網址

- 分頁連結要保留關鍵字與每頁筆數，例如 `?q=補助&page=3&per-page=10`
- 每一頁都有自己的網址，使用者可以加入書籤或分享

### 4. 沒有結果

- 寫出使用者搜尋的關鍵字，讓他發現打錯字
- 提供具體建議：檢查錯字、換關鍵字、用較通用的說法
- 不要只寫「查無資料」

### 5. 篩選條件

依日期、機關、類型篩選，需要另外設計，本頁尚未涵蓋。

## 無障礙

- **頁面標題**：`<title>` 寫出關鍵字與頁碼，如「搜尋「補助」第 2 頁 - 機關名稱」。螢幕閱讀器使用者切換分頁時，知道自己在哪一頁
- **結果筆數**：寫在列表前，螢幕閱讀器使用者讀到列表前就知道有多少筆
- **不自動送出**：每頁筆數用送出按鈕，不在選項改變時跳頁
- **分頁的目前頁**：分頁元件會在目前頁加 `aria-current="page"`

## 用到的元件

- [搜尋框 Search](/components/search)
- [選擇清單 Select](/components/select)
- [按鈕 Button](/components/button)
- [文件列表 Document List](/components/document-list)
- [標籤 Tag](/components/tag)
- [分頁 Pagination](/components/pagination)
- [水平排列 Cluster](/components/cluster)

## 參考來源

- GOV.UK Design System 沒有搜尋結果模式
- [分頁](/components/pagination)、[文件列表](/components/document-list)文件
