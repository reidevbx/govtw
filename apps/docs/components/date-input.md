# 日期輸入 Date Input

## 概述

日期輸入用三個欄位輸入年、月、日，適合使用者**已知道日期**的情況，例如出生日期、證件核發日期。參考 [GOV.UK Date input](https://design-system.service.gov.uk/components/date-input/)。

預設為**民國年**。調查中戶政、監理等申辦表單都使用民國年，但各網站的寫法不一：有的拆成年、月、日，有的要求一次填入「0780702」，有的用原生日期選擇器卻提示輸入民國年。本元件統一成一種做法。

## 互動範例

### 民國年（預設）

<DemoBlock variant="default" direction="column">
  <govtw-date-input name="birthday" legend="出生日期" hint="例如 78 7 2"></govtw-date-input>

  <template #code>

```html
<govtw-date-input name="birthday" legend="出生日期" hint="例如 78 7 2"></govtw-date-input>
```

  </template>
</DemoBlock>

### 西元年

<DemoBlock variant="gregorian" direction="column">
  <govtw-date-input name="issued" legend="護照核發日期" hint="例如 2024 3 15" calendar="gregorian"></govtw-date-input>

  <template #code>

```html
<govtw-date-input name="issued" legend="護照核發日期" hint="例如 2024 3 15" calendar="gregorian">
</govtw-date-input>
```

  </template>
</DemoBlock>

### 錯誤狀態

`error-fields` 指定哪幾欄加紅框。只有某一欄有問題時，只標那一欄。

<DemoBlock variant="error" direction="column">
  <govtw-date-input
    name="birthday-error"
    legend="出生日期"
    hint="例如 78 7 2"
    error="出生日期須包含日"
    error-fields="day"
  ></govtw-date-input>

  <template #code>

```html
<govtw-date-input
  name="birthday"
  legend="出生日期"
  hint="例如 78 7 2"
  error="出生日期須包含日"
  error-fields="day">
</govtw-date-input>
```

  </template>
</DemoBlock>

### 日期區間

需要起訖日期時，用兩個日期輸入，不另做區間元件。

```html
<govtw-stack space="6">
  <govtw-date-input name="start" legend="開始日期"></govtw-date-input>
  <govtw-date-input name="end" legend="結束日期"></govtw-date-input>
</govtw-stack>
```

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-date-input';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `name` | `string` | `''` | 表單欄位名稱 |
| `legend` | `string` | `''` | 群組標題 |
| `hint` | `string` | `''` | 提示文字，建議寫範例 |
| `error` | `string` | `''` | 錯誤訊息 |
| `error-fields` | `string` | `''` | 加紅框的欄位，空白分隔（`year`、`month`、`day`）。空值時三欄都加 |
| `calendar` | `'roc' \| 'gregorian'` | `'roc'` | 曆法：民國年或西元年 |
| `value` | `string` | `''` | ISO 日期（`YYYY-MM-DD`）。設定時會填入三個欄位 |
| `autocomplete` | `string` | `''` | 設為 `bday` 時，月、日欄位可自動填入生日；西元年時年份欄也會 |
| `disabled` | `boolean` | `false` | 停用 |

### 表單送出值

假設 `name="birthday"`，使用者輸入民國 78 年 7 月 2 日：

| 欄位名稱 | 值 | 用途 |
|----------|----|------|
| `birthday` | `1989-07-02` | ISO 日期。日期不完整或不存在（如 2 月 30 日）時為空字串 |
| `birthday-year` | `78` | 使用者原始輸入 |
| `birthday-month` | `7` | 使用者原始輸入 |
| `birthday-day` | `2` | 使用者原始輸入 |

伺服器驗證失敗時，用原始輸入把值填回欄位，使用者不用重打。

## 事件

| 事件 | 說明 |
|------|------|
| `input` | 任一欄位輸入時觸發 |
| `change` | 任一欄位失焦且值改變時觸發 |

讀取 `value` 屬性可取得目前的 ISO 日期。

## 無障礙

- **群組**：三個欄位包在 `<fieldset>` 中，`legend` 是群組名稱。螢幕閱讀器會念「出生日期，群組，民國年」
- **每欄都有可見標籤**：民國年（或西元年）、月、日
- **數字鍵盤**：`inputmode="numeric"`，手機會顯示數字鍵盤。不用 `type="number"`，避免捲動滑鼠時數值被改
- **錯誤**：錯誤訊息以 `aria-describedby` 關聯到群組；只在出錯的欄位加 `aria-invalid`
- **錯誤摘要連結**：[錯誤摘要](/components/error-summary) 的連結指向本元件的 `id`，焦點會移到年份欄

## 設計指引

### 何時使用

- 使用者已知道的日期：出生日期、證件核發日期、到職日期

### 何時不使用

- 使用者要從近期挑一天（如預約日期）：日期選擇器可能更合適（本系統尚未提供）

### 設計建議

- **提示寫範例**：如「例如 78 7 2」。不要寫「請輸入 YYYMMDD」這類格式代碼
- **不要要求補零**：使用者輸入 7 或 07 都可以。調查發現有網站要求填「0780702」
- **同一服務只用一種曆法**：調查發現有機關的列表用西元年、內文用民國年
- **錯誤訊息具體**：寫「出生日期須包含日」，不寫「日期格式錯誤」

### 相關元件

- [錯誤摘要 Error Summary](/components/error-summary)
- [文字輸入 Text Input](/components/text-input)
