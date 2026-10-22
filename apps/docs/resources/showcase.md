# 網站重構示範

以本設計系統重構既有政府網站，驗證元件與 token 能否支撐真實網站的需求。

[前往網站重構示範](https://govtw-showcase.vercel.app/)

::: warning 示範資料
示範網站的內容皆為虛構資料，非各機關官方網站。每頁頂端都有示範標示，並設定不讓搜尋引擎收錄。
:::

## 示範網站

| 網站 | 示範 | 原站 | 頁面 |
|---|---|---|---|
| 行政院 | [/ey/](https://govtw-showcase.vercel.app/ey/) | [ey.gov.tw](https://www.ey.gov.tw/) | 首頁、新聞列表、新聞內頁、內容頁 |
| 我的E政府 | [/egov/](https://govtw-showcase.vercel.app/egov/) | [www.gov.tw](https://www.gov.tw/) | 首頁、分類頁、服務說明頁、資訊快遞列表 |

完整頁面清單見[示範總覽](https://govtw-showcase.vercel.app/)。

## 用到的元件

- **頁面框架**：skip-link、header、service-navigation、search、footer、accesskey
- **佈局**：container、stack、sidebar、cluster
- **導覽**：breadcrumbs、side-navigation、contents-list、back-link、pagination、link
- **內容**：card、document-list、tag、table、summary-list、tabs、page-tools
- **訊息**：notification-banner、warning-text、inset-text
- **操作**：button（含 start）

## 每站有自己的樣式

示範網站不修改設計系統。每站在自己的主題檔覆寫 token，例如：

```css
/* 我的E政府：主色取自原站 #035a58 */
:root {
  --govtw-color-brand-primary: #035a58;
  --govtw-button-primary-bg: #035a58;
}
```

主題檔只在該站頁面載入，不影響其他示範網站與本文件站。原始碼位於 repo 的 `apps/showcase/`。
