# 登入

## 概述

使用者輸入帳號與密碼，登入機關的線上服務。GOV.UK Design System 沒有登入模式，本頁依台灣政府網站調查與 WCAG 2.2 整理。

調查中，戶政司、財政部稅務入口網、監理服務網的申辦或查詢頁都有圖形驗證碼。登入頁若也用圖形驗證碼，會讓部分使用者無法登入，見下方「圖形驗證碼與 WCAG 3.3.8」。

## 何時使用

- 使用者需要查看或修改自己的資料、案件進度

能不登入就完成的服務，不要要求登入。例如只是查詢公開資料、下載表單。

## 範例

<DemoBlock variant="default" direction="column">
  <form novalidate onsubmit="event.preventDefault()">
    <govtw-stack space="6">
      <h1>登入</h1>
      <govtw-text-input name="username" label="帳號" autocomplete="username"></govtw-text-input>
      <govtw-password-input name="password" label="密碼"></govtw-password-input>
      <div><govtw-button type="submit">登入</govtw-button></div>
      <p><govtw-link href="#">忘記密碼</govtw-link></p>
    </govtw-stack>
  </form>

  <template #code>

```html
<h1>登入</h1>

<form method="post" novalidate>
  <govtw-text-input name="username" label="帳號" autocomplete="username"></govtw-text-input>
  <govtw-password-input name="password" label="密碼"></govtw-password-input>
  <govtw-button type="submit">登入</govtw-button>
</form>

<p><govtw-link href="/forgot-password">忘記密碼</govtw-link></p>
```

  </template>
</DemoBlock>

### 登入失敗

<DemoBlock variant="error" direction="column">
  <govtw-stack space="6">
    <govtw-error-summary no-autofocus>
      <ul><li><a href="#username">帳號或密碼錯誤，請重新輸入</a></li></ul>
    </govtw-error-summary>
    <h1>登入</h1>
    <govtw-text-input id="username" name="username" label="帳號" autocomplete="username" value="wang123"></govtw-text-input>
    <govtw-password-input name="password" label="密碼"></govtw-password-input>
  </govtw-stack>

  <template #code>

```html
<govtw-error-summary>
  <ul><li><a href="#username">帳號或密碼錯誤，請重新輸入</a></li></ul>
</govtw-error-summary>

<h1>登入</h1>
<govtw-text-input id="username" name="username" label="帳號"
  autocomplete="username" value="wang123"></govtw-text-input>
<govtw-password-input name="password" label="密碼"></govtw-password-input>
```

  </template>
</DemoBlock>

## 做法

### 1. 欄位

- 帳號用[文字輸入](/components/text-input)，設 `autocomplete="username"`
- 密碼用[密碼輸入](/components/password-input)，預設 `autocomplete="current-password"`
- 兩個 `autocomplete` 讓瀏覽器與密碼管理工具自動填入
- **不要阻擋貼上**。密碼管理工具需要貼上或自動填入

### 2. 登入失敗的訊息

- 寫「帳號或密碼錯誤，請重新輸入」，不指出是哪一項錯。指出「帳號不存在」會讓別人知道哪些帳號有註冊。這是常見的資安做法，不是 GOV.UK 的規範
- 保留帳號欄位的內容，清空密碼
- 錯誤摘要連到帳號欄位，欄位本身不顯示錯誤訊息。這是[表單錯誤處理](/patterns/validation)的例外：兩個欄位都標錯誤，等於暗示兩個都錯（本設計系統的建議）

### 3. 連續失敗

- 連續失敗多次後，暫停一段時間才能再試。這是伺服器的工作
- 暫停時，告訴使用者要等多久，以及其他登入方式

### 4. 圖形驗證碼與 WCAG 3.3.8

抄寫圖形驗證碼屬於認知功能測驗。WCAG 3.3.8（無障礙驗證，AA）要求：登入時，不能只靠認知功能測驗驗證身分。

- 用了[圖形驗證碼](/components/captcha)，就要**另外提供不用驗證碼的登入方式**，例如自然人憑證、行動自然人憑證
- 提供語音驗證碼**不算**替代方式。使用者仍然要抄寫聽到的字元
- 記住密碼本身也是認知功能測驗。允許貼上與密碼管理工具自動填入，就符合 3.3.8
- 優先用其他做法阻擋大量嘗試，例如限制同一來源的嘗試頻率

各機關憑證登入的實作方式不同，本頁不寫流程。

### 5. 第二道驗證

需要更高安全性時，密碼正確後再傳送簡訊驗證碼，見[確認手機號碼](/patterns/confirm-phone-number)的「登入時」。

## 無障礙

- **自動填入**：帳號與密碼設對 `autocomplete`，使用者不用記住或手動輸入
- **顯示密碼**：密碼輸入有「顯示」按鈕，使用者可以確認輸入內容
- **WCAG 3.3.8**：允許貼上與自動填入；用圖形驗證碼時提供替代登入方式
- **錯誤處理**：與[表單錯誤處理](/patterns/validation)相同

## 用到的元件

- [文字輸入 Text Input](/components/text-input)
- [密碼輸入 Password Input](/components/password-input)
- [按鈕 Button](/components/button)
- [連結 Link](/components/link)
- [錯誤摘要 Error Summary](/components/error-summary)
- [圖形驗證碼 Captcha](/components/captcha)（盡量不用）

## 參考來源

- 台灣政府網站調查（2026-10-14）
- [WCAG 2.2 Understanding 3.3.8 Accessible Authentication (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html)
- GOV.UK Design System 沒有登入模式；相關的有 [Passwords](https://design-system.service.gov.uk/patterns/passwords/) 與 [Create accounts](https://design-system.service.gov.uk/patterns/create-accounts/)
