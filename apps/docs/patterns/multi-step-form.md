# 多步驟表單

## 概述

把一份長表單拆成多頁，每頁只問一件事，最後讓使用者確認所有答案再送出。參考 [GOV.UK Question pages](https://design-system.service.gov.uk/patterns/question-pages/) 與 [Check answers](https://design-system.service.gov.uk/patterns/check-answers/)。

## 何時使用

- 線上申辦需要填寫多項資料，例如申請戶籍謄本、補助
- 後面要問的問題，取決於前面的答案

## 範例

### 問題頁

<DemoBlock variant="question" direction="column">
  <form novalidate onsubmit="event.preventDefault()">
    <govtw-stack space="6">
      <govtw-back-link href="#"></govtw-back-link>
      <govtw-fieldset>
        <h1 slot="legend">你要申請哪一種戶籍謄本？</h1>
        <govtw-radio name="type" value="current" label="現戶全部"></govtw-radio>
        <govtw-radio name="type" value="partial" label="現戶部分"></govtw-radio>
        <govtw-radio name="type" value="history" label="除戶全部"></govtw-radio>
      </govtw-fieldset>
      <div><govtw-button type="submit">繼續</govtw-button></div>
    </govtw-stack>
  </form>

  <template #code>

```html
<govtw-back-link href="/apply/applicant"></govtw-back-link>

<form method="post" novalidate>
  <govtw-fieldset>
    <h1 slot="legend">你要申請哪一種戶籍謄本？</h1>
    <govtw-radio name="type" value="current" label="現戶全部"></govtw-radio>
    <govtw-radio name="type" value="partial" label="現戶部分"></govtw-radio>
    <govtw-radio name="type" value="history" label="除戶全部"></govtw-radio>
  </govtw-fieldset>

  <govtw-button type="submit">繼續</govtw-button>
</form>
```

  </template>
</DemoBlock>

### 確認頁

<DemoBlock variant="check-answers" direction="column">
  <form novalidate onsubmit="event.preventDefault()">
    <govtw-stack space="6">
      <govtw-back-link href="#"></govtw-back-link>
      <h1>送出前，請確認你的答案</h1>
      <h2>申請人</h2>
      <govtw-summary-list>
        <dl>
          <div>
            <dt>姓名</dt>
            <dd>王小明</dd>
            <dd><govtw-link href="#">變更<span class="govtw-visually-hidden">姓名</span></govtw-link></dd>
          </div>
          <div>
            <dt>身分證統一編號</dt>
            <dd>A123456789</dd>
            <dd><govtw-link href="#">變更<span class="govtw-visually-hidden">身分證統一編號</span></govtw-link></dd>
          </div>
        </dl>
      </govtw-summary-list>
      <h2>申請內容</h2>
      <govtw-summary-list>
        <dl>
          <div>
            <dt>謄本種類</dt>
            <dd>現戶全部</dd>
            <dd><govtw-link href="#">變更<span class="govtw-visually-hidden">謄本種類</span></govtw-link></dd>
          </div>
          <div>
            <dt>份數</dt>
            <dd>1 份</dd>
            <dd><govtw-link href="#">變更<span class="govtw-visually-hidden">份數</span></govtw-link></dd>
          </div>
        </dl>
      </govtw-summary-list>
      <h2>送出申請</h2>
      <p>送出後，即表示你確認以上資料就你所知均為正確。</p>
      <div><govtw-button type="submit">確認並送出</govtw-button></div>
    </govtw-stack>
  </form>

  <template #code>

```html
<govtw-back-link href="/apply/copies"></govtw-back-link>
<h1>送出前，請確認你的答案</h1>

<h2>申請人</h2>
<govtw-summary-list>
  <dl>
    <div>
      <dt>姓名</dt>
      <dd>王小明</dd>
      <dd><govtw-link href="/apply/name?return=check">變更<span class="govtw-visually-hidden">姓名</span></govtw-link></dd>
    </div>
    …
  </dl>
</govtw-summary-list>

<h2>申請內容</h2>
<govtw-summary-list>…</govtw-summary-list>

<h2>送出申請</h2>
<p>送出後，即表示你確認以上資料就你所知均為正確。</p>

<form method="post" novalidate>
  <govtw-button type="submit">確認並送出</govtw-button>
</form>
```

  </template>
</DemoBlock>

## 做法

### 1. 一頁只問一件事

- 先從一頁一個問題開始。使用者比較容易理解要做什麼，出錯時也只需要改一頁
- 彼此相關的欄位可以放在同一頁，例如地址的縣市與路名。這時標題寫成陳述句，如「你的通訊地址」

### 2. 問題頁的組成

由上到下：

1. [返回連結](/components/back-link)：回到上一題
2. 標題：就是問題本身，如「你要申請哪一種戶籍謄本？」。每頁的標題都不同
3. 欄位
4. 「繼續」按鈕：靠左放，不寫「下一步」

只有一組單選或核取方塊時，把 `<h1>` 放進 [欄位群組](/components/fieldset)的 `slot="legend"`，標題就是群組名稱，螢幕閱讀器只念一次。

目前 [文字輸入](/components/text-input)的 `label` 是屬性，不能放 `<h1>`。單一文字欄位的頁面，標題與 label 要分開寫。

### 3. 進度指示

GOV.UK 建議依序嘗試：

1. **先不用進度指示**。先試著改善問題的順序、題型與題數
2. 使用者仍然有困難時，在標題上方加簡單的文字，如「第 3 題，共 9 題」。總數會隨答案改變時，不要顯示總數

GOV.UK 不建議同時列出所有步驟的進度條：使用者常沒注意到它、佔空間，在小螢幕上也不好用。

[步驟指示](/components/step-indicator)元件就是這種進度條。只在以下情況使用：步驟少且固定、每一步有明確的名稱（如「填寫資料、上傳文件、確認、送出」），而且使用者研究顯示有幫助。容器寬度 40rem 以下時，它會自動改成只顯示「第 x 步，共 n 步」。

### 4. 確認頁

- 用[摘要清單](/components/summary-list)列出所有答案，依主題分段，每段加 `<h2>`
- 每一列有「變更」連結，連結內加視覺隱藏文字，說明要變更哪一項
- 使用者改完後，按「繼續」回到確認頁，不要讓他重走後面的步驟。修改後需要回答新的問題時，先問完再回到確認頁
- 選填但沒填的項目，寫「未提供」
- 送出按鈕寫「確認並送出」，上方加一段聲明

## 無障礙

- **標題就是問題**：螢幕閱讀器使用者進入頁面，第一個聽到的就是要回答的問題
- **legend 當標題**：一組單選或核取方塊時，標題放在 legend 裡，不會重複念兩次
- **變更連結的可讀名稱**：「變更姓名」而不是一連串的「變更」
- **錯誤處理**：每一頁送出時依[表單錯誤處理](/patterns/validation)驗證

## 用到的元件

- [返回連結 Back Link](/components/back-link)
- [欄位群組 Fieldset](/components/fieldset)
- [單選按鈕 Radio](/components/radio)
- [按鈕 Button](/components/button)
- [摘要清單 Summary List](/components/summary-list)
- [連結 Link](/components/link)
- [步驟指示 Step Indicator](/components/step-indicator)（盡量不用）

## 參考來源

- [GOV.UK Question pages](https://design-system.service.gov.uk/patterns/question-pages/)
- [GOV.UK Check answers](https://design-system.service.gov.uk/patterns/check-answers/)
