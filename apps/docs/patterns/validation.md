# 表單錯誤處理

## 概述

使用者送出表單後，如果有欄位填錯或漏填，重新顯示同一頁，告訴使用者哪裡有問題、怎麼修正。參考 [GOV.UK Recover from validation errors](https://design-system.service.gov.uk/patterns/validation/)。

調查發現多個政府網站用彈出視窗顯示錯誤。關掉視窗後，使用者就看不到哪一欄錯了。

## 何時使用

- 使用者填的內容不可能正確，例如身分證統一編號少一碼
- 必填欄位沒有填
- 內容不夠明確，無法使用，例如日期只填了月份

不要用驗證判斷使用者有沒有資格申請。不符資格時，帶使用者到另一頁說明原因與其他選擇。

## 範例

<DemoBlock variant="default" direction="column">
  <govtw-stack space="6">
    <govtw-error-summary no-autofocus>
      <ul>
        <li><a href="#name">請輸入姓名</a></li>
        <li><a href="#id-number">身分證統一編號應為 1 個英文字母加 9 個數字</a></li>
      </ul>
    </govtw-error-summary>
    <h1>申請戶籍謄本</h1>
    <form novalidate onsubmit="event.preventDefault()">
      <govtw-stack space="6">
        <govtw-text-input id="name" name="name" label="姓名" error="請輸入姓名"></govtw-text-input>
        <govtw-text-input id="id-number" name="id-number" label="身分證統一編號" width="10" value="A12345" error="身分證統一編號應為 1 個英文字母加 9 個數字"></govtw-text-input>
        <div><govtw-button type="submit">繼續</govtw-button></div>
      </govtw-stack>
    </form>
  </govtw-stack>

  <template #code>

```html
<title>錯誤：申請戶籍謄本</title>
…
<main>
  <govtw-error-summary>
    <ul>
      <li><a href="#name">請輸入姓名</a></li>
      <li><a href="#id-number">身分證統一編號應為 1 個英文字母加 9 個數字</a></li>
    </ul>
  </govtw-error-summary>

  <h1>申請戶籍謄本</h1>

  <form method="post" novalidate>
    <govtw-text-input id="name" name="name" label="姓名"
      error="請輸入姓名"></govtw-text-input>
    <govtw-text-input id="id-number" name="id-number" label="身分證統一編號"
      width="10" value="A12345"
      error="身分證統一編號應為 1 個英文字母加 9 個數字"></govtw-text-input>
    <govtw-button type="submit">繼續</govtw-button>
  </form>
</main>
```

  </template>
</DemoBlock>

範例中錯誤摘要加了 `no-autofocus`，避免文件頁一載入就跳到這裡；表單也不會真的送出。實際頁面不要加 `no-autofocus`。

## 做法

### 1. 按下送出時才驗證

- 使用者按下送出後才檢查
- 不要在使用者離開欄位時檢查，也不要在輸入時檢查。打字慢的使用者還沒填完就會看到錯誤
- 例外：有使用者研究證明即時檢查利大於弊，而且做得到無障礙

### 2. 一定要在伺服器驗證

- 伺服器驗證必做。前端檢查可以被略過，JavaScript 也可能沒載入
- 前端檢查是選配。要做的話，規則要和伺服器一致
- `<form>` 加 `novalidate`，關掉瀏覽器內建的檢查。欄位不加 `required`。錯誤一律由伺服器回傳、用錯誤摘要與欄位錯誤顯示，畫面和念法才會一致

### 3. 接受不同的寫法

- 意思明確時，接受不同格式。例如電話號碼「0912-345-678」和「0912345678」都接受
- 自動去除多餘的空格與標點，除非去掉會讓意思不清楚

### 4. 重新顯示同一頁

- 保留使用者已填的內容，不要清空。使用者才看得到哪裡填錯，也不用重打
- 頁面 `<title>` 前加「錯誤：」，如 `<title>錯誤：申請戶籍謄本</title>`
- 頁面最上方、`<h1>` 之前放[錯誤摘要](/components/error-summary)，列出所有錯誤。錯誤摘要出現時會自動取得焦點
- 每個錯誤欄位設 `error` 屬性，在欄位旁顯示同一句錯誤訊息

### 5. 錯誤訊息寫明怎麼改

| 不要寫 | 要寫 |
|---|---|
| 格式錯誤 | 身分證統一編號應為 1 個英文字母加 9 個數字 |
| 此欄位為必填 | 請輸入姓名 |
| 日期無效 | 出生日期必須是過去的日期 |

- 摘要和欄位旁的錯誤訊息用同一句話
- 不要用彈出視窗顯示錯誤

## 無障礙

- **標題加「錯誤：」**：螢幕閱讀器載入頁面時先念標題，使用者馬上知道送出失敗
- **焦點移到錯誤摘要**：錯誤摘要設 `role="alert"` 並自動取得焦點，螢幕閱讀器念出所有錯誤
- **連結到欄位**：摘要中的每個錯誤連到欄位，點下後焦點移進輸入框
- **欄位關聯**：欄位旁的錯誤訊息以 `aria-describedby` 關聯，並設 `aria-invalid`；聚焦欄位時會念出錯誤
- **不只靠顏色**：錯誤欄位有紅色左框線，加上錯誤文字

## 用到的元件

- [錯誤摘要 Error Summary](/components/error-summary)
- [文字輸入 Text Input](/components/text-input)，及其他有 `error` 屬性的表單元件
- [欄位群組 Fieldset](/components/fieldset)：單選、核取方塊群組的錯誤
- [按鈕 Button](/components/button)

## 參考來源

- [GOV.UK Recover from validation errors](https://design-system.service.gov.uk/patterns/validation/)
