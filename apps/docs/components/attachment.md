# 附件下載 Attachment

## 概述

附件下載用來列出可下載的檔案，並以文字標示格式與大小。參考 [GOV.UK Attachment](https://components.publishing.service.gov.uk/component-guide/attachment)（GOV.UK 出版元件，不在 GOV.UK Design System 內）。

調查中各機關的附件寫法不一：

- 勞保局用 `<img alt="pdf">` 圖示表示格式
- 戶政司的連結文字直接用檔名，沒有大小
- 財政部在連結文字後加「(pdf)」
- 同一份文件有 PDF 與 ODF 兩種格式時，各網站排法不同

## 互動範例

### 多種格式

同一份文件的不同格式放在同一個標題下。

<DemoBlock variant="default" direction="column">
  <govtw-attachment heading="第 5 次委員會議紀錄">
    <govtw-attachment-file href="#" format="PDF" size="245 KB"></govtw-attachment-file>
    <govtw-attachment-file href="#" format="ODT" size="38 KB"></govtw-attachment-file>
  </govtw-attachment>

  <template #code>

```html
<govtw-attachment heading="第 5 次委員會議紀錄">
  <govtw-attachment-file href="/files/meeting-5.pdf" format="PDF" size="245 KB"></govtw-attachment-file>
  <govtw-attachment-file href="/files/meeting-5.odt" format="ODT" size="38 KB"></govtw-attachment-file>
</govtw-attachment>
```

  </template>
</DemoBlock>

### 附件清單

多份文件用 [Stack](/components/stack) 排列。

<DemoBlock variant="list" direction="column">
  <govtw-stack space="6">
    <govtw-attachment heading="115 年度預算書">
      <govtw-attachment-file href="#" format="PDF" size="3.2 MB"></govtw-attachment-file>
      <govtw-attachment-file href="#" format="ODS" size="410 KB"></govtw-attachment-file>
    </govtw-attachment>
    <govtw-attachment heading="申請表">
      <govtw-attachment-file href="#" format="PDF" size="120 KB"></govtw-attachment-file>
      <govtw-attachment-file href="#" format="ODT" size="24 KB"></govtw-attachment-file>
    </govtw-attachment>
  </govtw-stack>

  <template #code>

```html
<govtw-stack space="6">
  <govtw-attachment heading="115 年度預算書">
    <govtw-attachment-file href="/files/budget.pdf" format="PDF" size="3.2 MB"></govtw-attachment-file>
    <govtw-attachment-file href="/files/budget.ods" format="ODS" size="410 KB"></govtw-attachment-file>
  </govtw-attachment>
  <govtw-attachment heading="申請表">
    <govtw-attachment-file href="/files/form.pdf" format="PDF" size="120 KB"></govtw-attachment-file>
    <govtw-attachment-file href="/files/form.odt" format="ODT" size="24 KB"></govtw-attachment-file>
  </govtw-attachment>
</govtw-stack>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-attachment';
```

一個 import 會同時註冊 `<govtw-attachment>` 與 `<govtw-attachment-file>`。

## 屬性

### govtw-attachment

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `heading` | `string` | `''` | 文件標題 |

### govtw-attachment-file

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `href` | `string` | `''` | 檔案網址。必填，缺少時不渲染並 console 警告 |
| `format` | `string` | `''` | 檔案格式，如 `PDF`、`ODT`、`ODS` |
| `size` | `string` | `''` | 檔案大小，如 `245 KB` |

## 事件

無。

## 無障礙

- **可讀名稱含標題、格式、大小**：連結可見文字是「PDF（245 KB）」，前面加視覺隱藏的標題，螢幕閱讀器念「第 5 次委員會議紀錄 PDF（245 KB）」。連結單獨列出時（如螢幕閱讀器的連結清單），也知道是哪份文件
- **格式用文字標示**：不用圖示，色盲或圖片未載入時仍看得到格式
- **觸控目標**：每個連結高度至少 44px

## 設計指引

### 何時使用

- 會議紀錄、預算書、申請表等需要下載的檔案

### 何時不使用

- 內容可以直接寫成網頁時：網頁比 PDF 容易閱讀、搜尋，也較容易符合無障礙要求

### 設計建議

- **提供開放格式**：提供 ODF（ODT、ODS、ODP），使用者不需購買特定軟體也能開啟；需要固定版面時加 PDF
- **標題寫文件名稱**：寫「第 5 次委員會議紀錄」，不寫檔名「1150301_mtg.pdf」
- **大小用 KB 或 MB**：使用者用行動網路時，可先判斷是否要下載
- **不顯示下載次數**：對使用者決定是否下載沒有幫助

### 相關模式

- [長篇內容頁](/patterns/content-page)

### 相關元件

- [檔案上傳 File Upload](/components/file-upload)
- [Stack](/components/stack)
