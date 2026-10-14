# 一次性驗證碼 OTP Input

## 概述

一次性驗證碼讓使用者輸入簡訊或 Email 收到的驗證碼，並在等待一段時間後可以重新傳送。GOV.UK 沒有對應元件，參考來源為台灣政府網站調查。

調查中內政部戶政司的線上申辦有「取得行動電話驗證碼」與 6 碼數字輸入。

## 互動範例

### 簡訊驗證碼

<DemoBlock variant="default" direction="column">
  <govtw-otp-input
    name="otp"
    hint="驗證碼已傳送到 0912-xxx-678，10 分鐘內有效"
  ></govtw-otp-input>

  <template #code>

```html
<govtw-otp-input
  name="otp"
  hint="驗證碼已傳送到 0912-xxx-678，10 分鐘內有效">
</govtw-otp-input>
```

  </template>
</DemoBlock>

### 處理重新傳送

按下「重新傳送驗證碼」時，元件發出 `govtw-resend` 事件並重新倒數。寄送驗證碼由作者呼叫自己的 API。寄出後用[通知橫幅](/components/notification-banner)告知結果。

<DemoBlock variant="resend" direction="column">
  <govtw-otp-input
    name="otp"
    resend-delay="10"
    hint="驗證碼已傳送到 0912-xxx-678"
  ></govtw-otp-input>

  <template #code>

```html
<govtw-otp-input
  id="otp"
  name="otp"
  resend-delay="10"
  hint="驗證碼已傳送到 0912-xxx-678">
</govtw-otp-input>

<script>
  document.querySelector('#otp').addEventListener('govtw-resend', () => {
    fetch('/api/otp/resend', { method: 'POST' });
  });
</script>
```

  </template>
</DemoBlock>

## 狀態展示

<DemoBlock no-code direction="column">
  <govtw-otp-input error="驗證碼錯誤，請重新輸入" resend-delay="0"></govtw-otp-input>
  <govtw-otp-input label="停用" disabled resend-delay="0"></govtw-otp-input>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-otp-input';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `name` | `string` | `''` | 表單欄位名稱 |
| `value` | `string` | `''` | 目前的值 |
| `label` | `string` | `'驗證碼'` | 標籤文字 |
| `hint` | `string` | `''` | 提示文字，寫傳送到哪裡、多久內有效 |
| `error` | `string` | `''` | 錯誤訊息 |
| `resend-delay` | `number` | `60` | 載入或重新傳送後，要等幾秒才能再次重新傳送 |
| `disabled` | `boolean` | `false` | 停用 |

## 事件

| 事件 | 說明 |
|------|------|
| `input` | 輸入時觸發 |
| `change` | 失焦且值改變時觸發 |
| `govtw-resend` | 倒數結束後按下「重新傳送驗證碼」時觸發 |

## 無障礙

- **自動填入**：輸入框設 `autocomplete="one-time-code"`，iOS 與 Android 可以從簡訊自動填入
- **數字鍵盤**：`inputmode="numeric"` 讓手機顯示數字鍵盤，但仍可貼上其他字元
- **不自動送出**：輸入滿位數時不會自動送出，符合 WCAG 3.2.2（輸入時不可自動改變情境）
- **倒數期間的按鈕**：設 `aria-disabled="true"`，仍可用 Tab 聚焦。聚焦時念出「N 秒後可重新傳送」
- **倒數宣告**：倒數文字每秒更新，但不放在 live region（螢幕閱讀器會在空檔時念出的區域）。倒數結束時只宣告一次「現在可以重新傳送驗證碼」
- **觸控目標**：按鈕高度至少 44px
- **錯誤**：錯誤訊息以 `aria-describedby` 關聯到欄位，並加 `aria-invalid`

## 設計指引

### 何時使用

- 用簡訊或 Email 傳送一次性驗證碼，確認使用者擁有該手機號碼或信箱

### 何時不使用

- 防止機器人送出表單：見[圖形驗證碼](/components/captcha)
- 使用者自己設定的密碼：用[密碼輸入](/components/password-input)

### 設計建議

- **用一個輸入框**：不要拆成 6 個格子。拆格會干擾貼上與自動填入，螢幕閱讀器使用者也要逐格輸入
- **寫明傳送到哪裡**：在提示寫出遮蔽後的手機號碼或信箱，使用者才知道去哪裡找
- **有效期限寫在提示**：例如「10 分鐘內有效」，不要在畫面上倒數有效期限
- **伺服器去除空格**：使用者可能貼上「123 456」，比對前先去除空格與連字號
- **錯誤訊息具體**：區分「驗證碼錯誤」與「驗證碼已過期，請重新傳送」

### 相關元件

- [文字輸入 Text Input](/components/text-input)
- [密碼輸入 Password Input](/components/password-input)
- [圖形驗證碼 Captcha](/components/captcha)
