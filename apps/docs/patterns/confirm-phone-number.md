# 確認手機號碼

## 概述

傳送一次性驗證碼到使用者的手機，請使用者輸入，確認他擁有這支手機。參考 [GOV.UK Confirm a phone number](https://design-system.service.gov.uk/patterns/confirm-a-phone-number/)。

## 何時使用

- **註冊或變更手機號碼**：確認號碼正確，之後才能用簡訊通知使用者
- **登入的第二道驗證**：密碼之外，再確認是本人持有的手機

Email 驗證是另一個模式，尚未撰寫。

## 範例

### 註冊時

註冊時寫出使用者剛填的號碼，並提供修改方式。填錯號碼的使用者才不會卡住。

<DemoBlock variant="register" direction="column">
  <form novalidate onsubmit="event.preventDefault()">
    <govtw-stack space="6">
      <h1>輸入簡訊驗證碼</h1>
      <p>我們已傳送 6 位數驗證碼到 0912-345-678。驗證碼 10 分鐘內有效。</p>
      <govtw-otp-input name="otp"></govtw-otp-input>
      <govtw-details summary="號碼填錯了？">
        <p><govtw-link href="#">修改手機號碼</govtw-link></p>
      </govtw-details>
      <div><govtw-button type="submit">繼續</govtw-button></div>
    </govtw-stack>
  </form>

  <template #code>

```html
<h1>輸入簡訊驗證碼</h1>
<p>我們已傳送 6 位數驗證碼到 0912-345-678。驗證碼 10 分鐘內有效。</p>

<form method="post" novalidate>
  <govtw-otp-input name="otp"></govtw-otp-input>

  <govtw-details summary="號碼填錯了？">
    <p><govtw-link href="/register/phone">修改手機號碼</govtw-link></p>
  </govtw-details>

  <govtw-button type="submit">繼續</govtw-button>
</form>
```

  </template>
</DemoBlock>

### 登入時

登入時**不顯示手機號碼**。顯示的話，知道帳號的人就能看到使用者的號碼。改為說明無法使用手機時怎麼辦。

<DemoBlock variant="sign-in" direction="column">
  <form novalidate onsubmit="event.preventDefault()">
    <govtw-stack space="6">
      <h1>輸入簡訊驗證碼</h1>
      <p>我們已傳送 6 位數驗證碼到你註冊的手機。驗證碼 10 分鐘內有效。</p>
      <govtw-otp-input name="otp"></govtw-otp-input>
      <govtw-details summary="無法使用這支手機？">
        <p>請撥打客服專線 0800-000-000，週一至週五 8:30 至 17:30。</p>
      </govtw-details>
      <div><govtw-button type="submit">繼續</govtw-button></div>
    </govtw-stack>
  </form>

  <template #code>

```html
<h1>輸入簡訊驗證碼</h1>
<p>我們已傳送 6 位數驗證碼到你註冊的手機。驗證碼 10 分鐘內有效。</p>

<form method="post" novalidate>
  <govtw-otp-input name="otp"></govtw-otp-input>

  <govtw-details summary="無法使用這支手機？">
    <p>請撥打客服專線 0800-000-000，週一至週五 8:30 至 17:30。</p>
  </govtw-details>

  <govtw-button type="submit">繼續</govtw-button>
</form>
```

  </template>
</DemoBlock>

範例的客服電話是示意，請換成機關的實際聯絡方式。

### 驗證碼錯誤

<DemoBlock variant="error" direction="column">
  <govtw-stack space="6">
    <govtw-error-summary no-autofocus>
      <ul><li><a href="#otp">驗證碼錯誤，請重新輸入</a></li></ul>
    </govtw-error-summary>
    <h1>輸入簡訊驗證碼</h1>
    <govtw-otp-input id="otp" name="otp" value="12345" error="驗證碼錯誤，請重新輸入" resend-delay="0"></govtw-otp-input>
  </govtw-stack>

  <template #code>

```html
<govtw-error-summary>
  <ul><li><a href="#otp">驗證碼錯誤，請重新輸入</a></li></ul>
</govtw-error-summary>

<h1>輸入簡訊驗證碼</h1>
<govtw-otp-input id="otp" name="otp" value="12345"
  error="驗證碼錯誤，請重新輸入"></govtw-otp-input>
```

  </template>
</DemoBlock>

## 做法

### 1. 輸入驗證碼的頁面

- 用[一次性驗證碼](/components/otp-input)元件，一個輸入框，不要拆成 6 格
- 說明驗證碼傳到哪裡、有幾位數、多久內有效
- 註冊時寫出號碼並提供修改連結；登入時不寫號碼，改說明無法使用手機時怎麼辦

### 2. 接受不同的寫法

- 使用者可能輸入「123 456」或「123-456」。伺服器比對前去除空格與連字號
- 不要限制輸入長度，貼上含空格的驗證碼時才不會被截斷

### 3. 重新傳送

本設計系統與 GOV.UK 的做法不同：

| | 本設計系統 | GOV.UK |
|---|---|---|
| 位置 | 同一頁，輸入框下方的「重新傳送驗證碼」按鈕 | 輸入頁放「沒收到簡訊？」連結，連到另一頁再按「重新傳送」 |
| 等待時間 | 按鈕倒數結束後才能按（預設 60 秒） | 頁面沒有提到等待時間 |
| 優點 | 少換一頁 | 不需要 JavaScript |

- 重新傳送後，舊驗證碼在原本的期限內仍然有效。使用者可能先收到舊的簡訊
- 按下重新傳送後，用[通知橫幅](/components/notification-banner)告知「已重新傳送驗證碼」

### 4. 驗證碼期限

- 有效期限由機關決定，寫在說明文字裡。GOV.UK 用 15 分鐘
- 不要在畫面上倒數有效期限

### 5. 錯誤訊息

| 情況 | 錯誤訊息 |
|---|---|
| 驗證碼不正確 | 驗證碼錯誤，請重新輸入 |
| 驗證碼已過期 | 驗證碼已過期，已重新傳送新的驗證碼 |
| 位數不足 | 驗證碼應為 6 位數字，你輸入的位數不足 |
| 位數過多 | 驗證碼應為 6 位數字，你輸入的位數過多 |

驗證碼過期時，系統自動重新傳送，使用者不用再按一次。

### 6. 防止暴力嘗試

- 連續輸錯 10 次後，要等一段時間才能再試（GOV.UK 的建議）
- 這是伺服器的工作，元件不處理

## 無障礙

- **自動填入**：`autocomplete="one-time-code"` 讓 iOS 與 Android 可以從簡訊帶入驗證碼。這點尚未在實機確認
- **不自動送出**：輸入滿 6 位數時不會自動送出，使用者按「繼續」才送出，符合 WCAG 3.2.2
- **重新傳送按鈕**：倒數期間仍可聚焦，螢幕閱讀器念出剩餘秒數；倒數結束時宣告一次
- **錯誤處理**：與[表單錯誤處理](/patterns/validation)相同，頁首放錯誤摘要，欄位旁顯示錯誤訊息

## 用到的元件

- [一次性驗證碼 OTP Input](/components/otp-input)
- [可展開說明 Details](/components/details)
- [連結 Link](/components/link)
- [按鈕 Button](/components/button)
- [錯誤摘要 Error Summary](/components/error-summary)
- [通知橫幅 Notification Banner](/components/notification-banner)

## 參考來源

- [GOV.UK Confirm a phone number](https://design-system.service.gov.uk/patterns/confirm-a-phone-number/)
