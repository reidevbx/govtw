# P0 元件決定表（2026-10-14）

breadcrumbs、search、service-navigation、header、footer 五個元件動手前的設計決定。使用者確認後，依序連續執行，不再逐項詢問。

- 來源：各元件任務文件的「待確認」段，加上實作時才會遇到的 API 問題（標「新增」）
- 每項附建議做法；使用者只需改不同意的項目

## 共通

| # | 問題 | 建議 | 理由 |
|---|---|---|---|
| A1 | **新增**：連結清單（麵包屑、主選單）的 DOM 結構 | **作者寫 `<a>` 子元素，元件用 light DOM 包成 `<nav><ol><li>`** | Shadow DOM 的 `<slot>` 無法把作者的 `<a>` 包進 `<li>`，`::slotted` 也選不到巢狀元素。light DOM 已在 accesskey 用過，沿用 adoptedStyleSheets |
| A2 | **新增**：作者事後增刪連結時要不要重新包裝 | **不支援**，只在首次連線時包裝一次 | 政府網站的麵包屑與主選單由伺服器輸出，幾乎不在前端變動。文件註明限制 |
| A3 | **新增**：header、footer 用哪種 DOM | **Shadow DOM + named slot** | 只負責版面，不需要改寫作者內容，slot 足夠 |
| A4 | **新增**：窄螢幕切換點 | **容器寬度 40rem（640px），用 container query** | 與佈局元件「依容器寬度、不依螢幕寬度」的原則一致 |

## breadcrumbs 麵包屑

| # | 問題 | 建議 |
|---|---|---|
| B1 | 窄螢幕要換行還是收合中間層 | **換行**。收合中間層需要額外按鈕，第一版不做 |
| B2 | **新增**：目前頁怎麼標示 | 最後一個子元素自動加 `aria-current="page"`。最後一項可用 `<span>`（不可點）或 `<a>` |

## search 搜尋框

| # | 問題 | 建議 |
|---|---|---|
| S1 | 是否支援搜尋範圍 select | **不支援**。需要時由作者在外層自行組合 `govtw-select` |
| S2 | **新增**：熱門關鍵字放在哪 | 放在元件外，用 `govtw-cluster` + `govtw-link` 排列。文件建議最多 8 個 |

## service-navigation 主選單

| # | 問題 | 建議 |
|---|---|---|
| N1 | 是否支援多層下拉 | **不支援**，第一版只做單層。多層需求另開任務 |
| N2 | **新增**：目前頁怎麼標示 | 作者在對應 `<a>` 加 `aria-current="page"`，元件只負責樣式。主選單的目前頁依網址判斷，元件無從得知 |
| N3 | **新增**：窄螢幕收合按鈕文字 | 「選單」，`aria-expanded` 切換 |

## header 頁首

| # | 問題 | 建議 |
|---|---|---|
| H1 | 工具列項目上限 | **設計指引寫「最多 5 項」**，元件不強制 |
| H2 | ADHD 友善介面、大型游標是否納入 | **不納入**。屬瀏覽器或作業系統功能 |
| H3 | **新增**：slot 結構 | `logo`、`service-name`、`tools`、`navigation`（放 service-navigation） |
| H4 | **新增**：是否自動插入導盲磚 | **不自動**。文件示範作者在 header 開頭放 `<govtw-accesskey key="U">` |

## footer 頁尾

| # | 問題 | 建議 |
|---|---|---|
| F1 | 瀏覽人次是否納入 | **不納入**。屬站台後端功能 |
| F2 | 無障礙標章的 alt 與連結 | 標章由作者以 `badge` slot 傳入 `<a><img alt></a>`。文件建議 alt「通過 AA 等級無障礙網頁檢測」，連結填數位發展部核發的該站檢測頁網址。規範原文未查證，文件註明 |
| F3 | **新增**：slot 結構 | `meta`（政策連結）、`contact`（機關資訊）、`badge`、`updated`（更新日期）、`navigation`（網站地圖連結群組，選用）、default（導盲磚）。**實作時調整**：原訂 default 放網站地圖，改為與 header 一致放導盲磚，網站地圖改用 `navigation` slot |
| F4 | **新增**：更新日期的格式 | 元件不格式化。作者傳入 `<time datetime="2026-10-14">`，顯示文字（民國或西元）由作者決定 |

## 執行順序

1. breadcrumbs → 2. search → 3. service-navigation → 4. header → 5. footer

每個元件：scaffolder → token → `.ts` → docs → `build`、`check:components`、`lint` → 任務文件總結 → commit。

## 停止條件

- 驗證失敗且無法修復
- 遇到本表沒涵蓋的設計問題
