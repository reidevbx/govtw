# 文件列表 Document List

## 概述

文件列表用來列出新聞、公告、法規等文件，每項有標題連結、日期與發布單位。參考 [GOV.UK Document list](https://components.publishing.service.gov.uk/component-guide/document_list)（GOV.UK 出版元件，不在 GOV.UK Design System 內）。

調查中發現的問題：

- 高雄市政府的新聞列表把長標題截斷成「....」，使用者看不到完整標題
- 日期只有畫面文字，沒有機器可讀的格式

## 互動範例

<DemoBlock variant="default" direction="column">
  <govtw-document-list>
    <govtw-document-list-item
      heading="115 年度數位服務創新補助計畫開始受理申請"
      href="#"
      date="2026-10-14"
      unit="數位產業署"
    >
      <govtw-tag slot="tags" color="blue">公告</govtw-tag>
    </govtw-document-list-item>
    <govtw-document-list-item
      heading="政府網站無障礙檢測作業說明會報名資訊"
      href="#"
      date="2026-10-08"
      unit="資訊處"
    >
      <govtw-tag slot="tags" color="green">活動</govtw-tag>
    </govtw-document-list-item>
    <govtw-document-list-item
      heading="個人資料保護法施行細則部分條文修正草案預告"
      href="#"
      date="2026-09-30"
      unit="法制處"
    ></govtw-document-list-item>
  </govtw-document-list>

  <template #code>

```html
<govtw-document-list>
  <govtw-document-list-item
    heading="115 年度數位服務創新補助計畫開始受理申請"
    href="/news/1"
    date="2026-10-14"
    unit="數位產業署">
    <govtw-tag slot="tags" color="blue">公告</govtw-tag>
  </govtw-document-list-item>
  <govtw-document-list-item
    heading="政府網站無障礙檢測作業說明會報名資訊"
    href="/news/2"
    date="2026-10-08"
    unit="資訊處">
    <govtw-tag slot="tags" color="green">活動</govtw-tag>
  </govtw-document-list-item>
  <govtw-document-list-item
    heading="個人資料保護法施行細則部分條文修正草案預告"
    href="/news/3"
    date="2026-09-30"
    unit="法制處">
  </govtw-document-list-item>
</govtw-document-list>
```

  </template>
</DemoBlock>

### 西元年

<DemoBlock variant="gregorian" direction="column">
  <govtw-document-list calendar="gregorian">
    <govtw-document-list-item heading="115 年第 4 季開放資料釋出時程" href="#" date="2026-10-14" unit="資訊處"></govtw-document-list-item>
  </govtw-document-list>

  <template #code>

```html
<govtw-document-list calendar="gregorian">
  <govtw-document-list-item heading="115 年第 4 季開放資料釋出時程" href="/news/4" date="2026-10-14" unit="資訊處">
  </govtw-document-list-item>
</govtw-document-list>
```

  </template>
</DemoBlock>

### 搭配分頁

列表很長時，下方加[分頁](/components/pagination)。

```html
<govtw-document-list>…</govtw-document-list>
<govtw-pagination total="12" current="1" href-template="/news?page={n}"></govtw-pagination>
```

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-document-list';
```

一個 import 會同時註冊 `<govtw-document-list>` 與 `<govtw-document-list-item>`。

## 屬性

### govtw-document-list

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `calendar` | `'roc' \| 'gregorian'` | `'roc'` | 日期顯示的曆法，套用到所有項目 |

### govtw-document-list-item

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `heading` | `string` | `''` | 標題，不截斷 |
| `href` | `string` | `''` | 連結網址；沒有時標題顯示為一般文字 |
| `date` | `string` | `''` | ISO 日期，如 `2026-10-14`。畫面顯示「115 年 10 月 14 日」 |
| `unit` | `string` | `''` | 發布單位 |

### Slot

| Slot | 說明 |
|------|------|
| `tags` | 標籤，放 [`<govtw-tag>`](/components/tag) |

## 事件

無。

## 無障礙

- **清單語意**：容器為 `role="list"`，每項為 `role="listitem"`。螢幕閱讀器會念出「清單，3 個項目」
- **日期**：用 `<time datetime="2026-10-14">`，機器可讀
- **標題不截斷**：完整標題才能讓使用者判斷是否要點開
- **標籤不只靠顏色**：標籤的文字就是分類名稱

## 設計指引

### 何時使用

- 新聞稿、公告、活動、法規預告等依日期排列的文件

### 何時不使用

- 多欄、需要比較的資料：用[表格](/components/table)
- 可下載的檔案：用[附件下載](/components/attachment)

### 設計建議

- **最新的在最上面**
- **同一服務只用一種曆法**：調查發現有機關的列表用西元年、內文用民國年
- **標籤只放一到兩個**：標籤太多時使用者不容易掃讀

### 相關元件

- [表格 Table](/components/table)
- [分頁 Pagination](/components/pagination)
- [標籤 Tag](/components/tag)
- [附件下載 Attachment](/components/attachment)
