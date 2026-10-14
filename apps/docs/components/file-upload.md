# 檔案上傳 File Upload

## 概述

檔案上傳讓使用者從裝置選取檔案，例如證件照片、證明文件。參考 [GOV.UK File upload](https://design-system.service.gov.uk/components/file-upload/)。

元件包住原生 `<input type="file">`，只加標籤、提示、錯誤訊息與樣式。原生欄位在所有瀏覽器、手機與輔助科技都能操作。

## 互動範例

### 單一檔案

<DemoBlock variant="default" direction="column">
  <govtw-file-upload
    name="photo"
    label="上傳證件照片"
    hint="JPG 或 PNG 格式，10 MB 以內"
    accept=".jpg,.jpeg,.png"
  ></govtw-file-upload>

  <template #code>

```html
<govtw-file-upload
  name="photo"
  label="上傳證件照片"
  hint="JPG 或 PNG 格式，10 MB 以內"
  accept=".jpg,.jpeg,.png">
</govtw-file-upload>
```

  </template>
</DemoBlock>

### 多個檔案

<DemoBlock variant="multiple" direction="column">
  <govtw-file-upload
    name="documents"
    label="上傳證明文件"
    hint="可選多個檔案。PDF 格式，每個 5 MB 以內"
    accept=".pdf"
    multiple
  ></govtw-file-upload>

  <template #code>

```html
<govtw-file-upload
  name="documents"
  label="上傳證明文件"
  hint="可選多個檔案。PDF 格式，每個 5 MB 以內"
  accept=".pdf"
  multiple>
</govtw-file-upload>
```

  </template>
</DemoBlock>

### 錯誤狀態

<DemoBlock variant="error" direction="column">
  <govtw-file-upload
    name="photo-error"
    label="上傳證件照片"
    hint="JPG 或 PNG 格式，10 MB 以內"
    error="檔案須小於 10 MB"
  ></govtw-file-upload>

  <template #code>

```html
<govtw-file-upload
  name="photo"
  label="上傳證件照片"
  hint="JPG 或 PNG 格式，10 MB 以內"
  error="檔案須小於 10 MB">
</govtw-file-upload>
```

  </template>
</DemoBlock>

## 狀態展示

<DemoBlock no-code direction="column">
  <govtw-file-upload label="停用" disabled></govtw-file-upload>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-file-upload';
```

所屬的 `<form>` 要設 `enctype="multipart/form-data"`，伺服器才收得到檔案。

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `name` | `string` | `''` | 表單欄位名稱 |
| `label` | `string` | `''` | 標籤文字 |
| `hint` | `string` | `''` | 提示文字，寫允許的格式與大小上限 |
| `error` | `string` | `''` | 錯誤訊息 |
| `accept` | `string` | `''` | 允許的副檔名或 MIME type，如 `.pdf,.jpg` |
| `multiple` | `boolean` | `false` | 允許選取多個檔案 |
| `disabled` | `boolean` | `false` | 停用 |

讀取 `files` 屬性可取得目前選取的檔案（`FileList`）。

## 事件

| 事件 | 說明 |
|------|------|
| `change` | 選取的檔案改變時觸發 |

## 無障礙

- **原生欄位**：使用 `<input type="file">`，鍵盤可用 Tab 聚焦、Enter 或空白鍵開啟檔案選擇
- **標籤與說明**：`label` 以 `<label for>` 關聯；提示與錯誤以 `aria-describedby` 關聯
- **觸控目標**：選擇檔案按鈕高度至少 44px
- **不做拖放區**：拖放對鍵盤與螢幕閱讀器使用者無法操作，所以第一版不提供

## 設計指引

### 何時使用

- 服務必須取得使用者的檔案，例如證件照片、證明文件

### 何時不使用

- 機關能自行查詢的資料：用跨機關查詢取代，不要求使用者上傳

### 設計建議

- **提示寫格式與大小**：如「PDF 格式，5 MB 以內」，讓使用者選檔前就知道限制
- **錯誤訊息具體**：寫「檔案須小於 10 MB」，不寫「上傳失敗」
- **大小與格式要在伺服器檢查**：`accept` 只是瀏覽器的篩選，使用者仍能選其他檔案
- **一次只問一件事**：多份不同的文件分成多個欄位，各自標示用途

### 相關元件

- [錯誤摘要 Error Summary](/components/error-summary)
- 附件下載 Attachment（規劃中）
