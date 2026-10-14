# 表格 Table

## 概述

表格用來呈現需要比較的多欄資料，例如各縣市統計、費率對照。參考 [GOV.UK Table](https://design-system.service.gov.uk/components/table/)。

作者直接寫原生 `<table>`，元件只負責樣式與窄螢幕捲動。**不要用表格排版**：調查發現有網站整個版面用巢狀表格排出來，螢幕閱讀器會把版面當成資料念。

## 互動範例

### 基本用法

<DemoBlock variant="default" direction="column">
  <govtw-table>
    <table>
      <caption>勞工保險普通事故保險費率</caption>
      <thead>
        <tr>
          <th scope="col">年度</th>
          <th scope="col" class="govtw-table__numeric">費率</th>
          <th scope="col">說明</th>
        </tr>
      </thead>
      <tbody>
        <tr><th scope="row">113 年</th><td class="govtw-table__numeric">11.5%</td><td>依勞工保險條例第 13 條調整</td></tr>
        <tr><th scope="row">114 年</th><td class="govtw-table__numeric">12.0%</td><td>依勞工保險條例第 13 條調整</td></tr>
        <tr><th scope="row">115 年</th><td class="govtw-table__numeric">12.0%</td><td>維持前一年度費率</td></tr>
      </tbody>
    </table>
  </govtw-table>

  <template #code>

```html
<govtw-table>
  <table>
    <caption>勞工保險普通事故保險費率</caption>
    <thead>
      <tr>
        <th scope="col">年度</th>
        <th scope="col" class="govtw-table__numeric">費率</th>
        <th scope="col">說明</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">113 年</th>
        <td class="govtw-table__numeric">11.5%</td>
        <td>依勞工保險條例第 13 條調整</td>
      </tr>
    </tbody>
  </table>
</govtw-table>
```

  </template>
</DemoBlock>

### 寬表格：水平捲動

表格比容器寬時，元件可以左右捲動，並成為可聚焦的區域。鍵盤使用者按 Tab 聚焦後，用方向鍵捲動。

<DemoBlock variant="scroll" direction="column">
  <div style="max-inline-size: 360px;">
    <govtw-table>
      <table>
        <caption>各縣市戶籍謄本申請件數</caption>
        <thead>
          <tr>
            <th scope="col">縣市</th>
            <th scope="col" class="govtw-table__numeric">1 月</th>
            <th scope="col" class="govtw-table__numeric">2 月</th>
            <th scope="col" class="govtw-table__numeric">3 月</th>
            <th scope="col" class="govtw-table__numeric">4 月</th>
            <th scope="col" class="govtw-table__numeric">5 月</th>
            <th scope="col" class="govtw-table__numeric">6 月</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">臺北市</th><td class="govtw-table__numeric">12,340</td><td class="govtw-table__numeric">10,215</td><td class="govtw-table__numeric">13,002</td><td class="govtw-table__numeric">12,876</td><td class="govtw-table__numeric">11,930</td><td class="govtw-table__numeric">12,451</td></tr>
          <tr><th scope="row">高雄市</th><td class="govtw-table__numeric">9,812</td><td class="govtw-table__numeric">8,903</td><td class="govtw-table__numeric">10,114</td><td class="govtw-table__numeric">9,987</td><td class="govtw-table__numeric">9,560</td><td class="govtw-table__numeric">9,734</td></tr>
        </tbody>
      </table>
    </govtw-table>
  </div>

  <template #code>

```html
<govtw-table>
  <table>
    <caption>各縣市戶籍謄本申請件數</caption>
    …
  </table>
</govtw-table>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-table';
```

## 屬性

無屬性。

| class | 用在 | 說明 |
|-------|------|------|
| `govtw-table__numeric` | `<th>`、`<td>` | 靠右對齊、等寬數字 |

元件以 light DOM 渲染：結構就是你寫的 HTML。

## 事件

無事件。

## 無障礙

- **`<caption>` 必填**：說明表格內容，也是捲動區域的可讀名稱。可用 `.govtw-visually-hidden` 視覺隱藏。調查發現多數政府網站的表格沒有 caption，只用已廢棄的 `summary` 屬性
- **`<th scope>`**：欄標題用 `scope="col"`，列標題用 `scope="row"`，螢幕閱讀器才能念出儲存格對應的標題
- **捲動區域**：表格溢出時，元件自動加上 `role="region"`、`tabindex="0"`、`aria-label`（取自 caption）。不溢出時不加，避免多一個 Tab 停留點
- **聚焦樣式**：捲動區域聚焦時顯示黃色外框

## 設計指引

### 何時使用

- 使用者需要比較多筆資料的多個欄位

### 何時不使用

- 排版 → 用 [垂直堆疊 Stack](/components/stack)、[側邊欄佈局 Sidebar](/components/sidebar)
- 只有「標題：內容」兩欄 → 用 [摘要清單 Summary List](/components/summary-list)
- 新聞公告列表 → 用[文件列表 Document List](/components/document-list)

### 設計建議

- **數字欄靠右**：加 `govtw-table__numeric`，方便上下比較位數
- **數字加千分位**：如 12,340
- **欄位不要太多**：超過 6 欄時，考慮拆成多個表格

### 相關元件

- [摘要清單 Summary List](/components/summary-list)
- [分頁 Pagination](/components/pagination)
