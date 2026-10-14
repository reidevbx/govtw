# 圖形驗證碼 Captcha

## 概述

圖形驗證碼要求使用者抄寫圖片中的文字，用來阻擋自動化程式大量送出。參考來源是台灣政府網站調查；[GOV.UK](https://design-system.service.gov.uk/) 不提供此元件。

::: warning 優先用其他做法
驗證碼會擋住部分真人使用者，包括視障、閱讀障礙與認知障礙者。只有機關確定必須使用時才用本元件。可以先考慮：

- 限制同一來源的送出頻率
- 只在偵測到異常流量時才出現驗證碼
:::

調查中戶政司、財政部稅務入口網的驗證碼都有「產製新驗證碼」與「語音播放」。監理服務網沒有語音替代，視障者無法完成查詢；標籤也對不到輸入框。本元件把語音版設為必備。

## 互動範例

<DemoBlock variant="default" direction="column">
  <govtw-captcha
    name="captcha"
    src="/assets/captcha-sample.svg"
    audio-src="/assets/captcha-sample.mp3"
    hint="請輸入圖片中的 5 個數字"
    inputmode="numeric"
    maxlength="5"
  ></govtw-captcha>

  <template #code>

```html
<govtw-captcha
  name="captcha"
  src="/captcha/image"
  audio-src="/captcha/audio"
  hint="請輸入圖片中的 5 個數字"
  inputmode="numeric"
  maxlength="5">
</govtw-captcha>
```

  </template>
</DemoBlock>

範例沒有實際的語音檔，按「語音播放」不會出聲。

### 換一張

元件不會自己抓新圖。按「換一張」時發出 `govtw-refresh` 事件，由作者向伺服器取得新的驗證碼後更新 `src` 與 `audio-src`。換圖後輸入框會清空。

```js
const captcha = document.querySelector('govtw-captcha');
captcha.addEventListener('govtw-refresh', async () => {
  const { image, audio } = await fetch('/captcha/new').then((res) => res.json());
  captcha.src = image;
  captcha.audioSrc = audio;
});
```

## 狀態展示

<DemoBlock no-code direction="column">
  <govtw-captcha
    src="/assets/captcha-sample.svg"
    audio-src="/assets/captcha-sample.mp3"
    error="驗證碼不正確，請重新輸入"
  ></govtw-captcha>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-captcha';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `name` | `string` | `''` | 表單欄位名稱 |
| `value` | `string` | `''` | 目前的值 |
| `label` | `string` | `'驗證碼'` | 標籤文字 |
| `hint` | `string` | `''` | 提示文字，建議寫字數與字元種類 |
| `error` | `string` | `''` | 錯誤訊息 |
| `src` | `string` | `''` | 驗證碼圖片網址 |
| `alt` | `string` | `'圖形驗證碼'` | 圖片替代文字 |
| `audio-src` | `string` | `''` | 語音驗證碼網址。**必填**，缺少時 console 警告 |
| `inputmode` | `string` | `''` | 純數字驗證碼設 `numeric`，手機會顯示數字鍵盤 |
| `maxlength` | `number` | `0` | 最多可輸入的字數；0 表示不限制 |
| `disabled` | `boolean` | `false` | 停用 |

## 事件

| 事件 | 說明 |
|------|------|
| `govtw-refresh` | 按「換一張」時觸發 |
| `input` | 輸入時觸發 |
| `change` | 失焦且值改變時觸發 |

## 無障礙

- **語音替代**（WCAG 1.1.1）：圖片驗證碼對視障者是無法辨識的非文字內容，必須提供語音版
- **標籤對應**：`<label for>` 指向輸入框；圖片、按鈕、輸入框都在同一個 Shadow DOM，不會發生 id 對不到的問題
- **按鈕用 `<button>`**：「換一張」「語音播放」都是原生按鈕，觸控目標高度至少 44px
- **不自動完成**：輸入框設 `autocomplete="off"`、`spellcheck="false"`

### WCAG 3.3.8 無障礙驗證

抄寫驗證碼屬於認知功能測驗。WCAG 3.3.8（AA）要求驗證身分的步驟不能只依賴認知功能測驗。

- 驗證碼用在**登入流程**時，需另外提供不用驗證碼的登入方式（如自然人憑證、行動身分識別），才符合 3.3.8
- 用在**查詢或申請表單**時，3.3.8 不適用，但仍建議優先考慮上方的替代做法

各機關登入流程的實際做法我們沒有逐一查證，這裡只寫規範要求。

登入頁的完整做法見[登入](/patterns/sign-in)模式。

## 設計指引

### 何時使用

- 機關確定必須阻擋自動化大量送出，且其他做法不足時

### 何時不使用

- 一般的聯絡表單、意見信箱：先用頻率限制
- 使用者已登入的流程：身分已經驗證，不需要再擋

### 設計建議

- **提示寫字數與種類**：如「請輸入圖片中的 5 個數字」
- **只用數字或只用英文**：避免 0 與 O、1 與 l 這類難以分辨的字元
- **錯誤後換新圖**：驗證失敗時由伺服器產生新的驗證碼，並保留使用者已填的其他欄位
- **不設過短的時限**：驗證碼有效時間至少數分鐘，讓使用者有時間聽語音

### 相關元件

- [文字輸入 Text Input](/components/text-input)
- [錯誤摘要 Error Summary](/components/error-summary)
