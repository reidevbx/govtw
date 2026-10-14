# 密碼輸入 Password Input

## 概述

密碼輸入是加上「顯示／隱藏」按鈕的密碼欄位，讓使用者確認自己輸入的內容。參考 [GOV.UK Password input](https://design-system.service.gov.uk/components/password-input/)。

調查中內政部戶政司的線上申辦有「密碼」與「確認密碼」兩欄，沒有顯示切換。使用者看不到輸入內容，只能靠重打一次確認。

## 互動範例

### 登入

<DemoBlock variant="default" direction="column">
  <govtw-password-input name="password" label="密碼"></govtw-password-input>

  <template #code>

```html
<govtw-password-input name="password" label="密碼"></govtw-password-input>
```

  </template>
</DemoBlock>

### 設定新密碼

設定新密碼時，`autocomplete` 設 `new-password`，瀏覽器的密碼管理工具會建議強密碼。用提示說明密碼規則。

<DemoBlock variant="new-password" direction="column">
  <govtw-password-input
    name="new-password"
    label="新密碼"
    hint="至少 8 個字元，須包含英文字母與數字"
    autocomplete="new-password"
  ></govtw-password-input>

  <template #code>

```html
<govtw-password-input
  name="new-password"
  label="新密碼"
  hint="至少 8 個字元，須包含英文字母與數字"
  autocomplete="new-password">
</govtw-password-input>
```

  </template>
</DemoBlock>

## 狀態展示

<DemoBlock no-code direction="column">
  <govtw-password-input label="錯誤" error="請輸入密碼"></govtw-password-input>
  <govtw-password-input label="停用" disabled></govtw-password-input>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-password-input';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `name` | `string` | `''` | 表單欄位名稱 |
| `value` | `string` | `''` | 目前的值 |
| `label` | `string` | `''` | 標籤文字 |
| `hint` | `string` | `''` | 提示文字，建議寫密碼規則 |
| `error` | `string` | `''` | 錯誤訊息 |
| `autocomplete` | `string` | `'current-password'` | 登入用 `current-password`；註冊、變更密碼用 `new-password` |
| `disabled` | `boolean` | `false` | 停用 |

## 事件

| 事件 | 說明 |
|------|------|
| `input` | 輸入時觸發 |
| `change` | 失焦且值改變時觸發 |

## 無障礙

- **切換按鈕**：可見文字「顯示」／「隱藏」，可讀名稱「顯示密碼」／「隱藏密碼」，`aria-controls` 指向密碼欄位
- **狀態宣告**：切換時以 live region（`aria-live="polite"`，螢幕閱讀器會在空檔時念出的區域）宣告「密碼已顯示」或「密碼已隱藏」
- **送出時自動隱藏**：表單送出時切回隱藏，避免瀏覽器把明碼記進表單歷史
- **觸控目標**：按鈕高度至少 44px
- **錯誤**：錯誤訊息以 `aria-describedby` 關聯到欄位，並加 `aria-invalid`

## 設計指引

### 何時使用

- 登入、註冊、變更密碼

### 何時不使用

- 一次性驗證碼（簡訊、Email 收到的數字）：用[一次性驗證碼](/components/otp-input)

### 設計建議

- **不要要求輸入兩次**：有顯示切換後，使用者可以直接確認內容。「確認密碼」欄位只增加填寫負擔
- **允許貼上**：不要阻擋貼上，密碼管理工具需要貼上或自動填入
- **規則寫在提示**：在使用者輸入前說明規則，不要等送出後才用錯誤訊息告知

### 相關元件

- [文字輸入 Text Input](/components/text-input)
- [錯誤摘要 Error Summary](/components/error-summary)
