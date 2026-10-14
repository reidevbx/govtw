# P1 元件決定表（2026-10-14）

P1 共 12 個新元件與 2 項既有元件擴充。使用者確認後依序連續執行，不再逐項詢問。

- 來源：各任務文件的「待確認」段，加上實作前檢查程式碼發現的問題（標「新增」）
- 每項附建議做法；使用者只需改不同意的項目
- 沿用 [P0 決定表](./2026-10-14-p0-decisions.md) 的 A1–A4

## 共通

| # | 問題 | 建議 | 理由 |
|---|---|---|---|
| C1 | **新增**：需要「只給螢幕閱讀器的文字」時怎麼寫（如摘要清單的「變更<span>姓名</span>」） | **在 `tokens.css` 新增 `.govtw-visually-hidden` 與 `.govtw-visually-hidden-focusable` 兩個 utility class** | 作者寫在 light DOM 的文字，元件無法替它加樣式。`foundations/layout.md` 已經引用 `govtw-visually-hidden-focusable`，但目前不存在，一併補上 |
| C2 | **新增**：包住原生 HTML 的元件（摘要清單、表格）用哪種 DOM | **light DOM，只加樣式，不改寫作者的結構** | 作者直接寫 `<dl>`、`<table>`，語意最完整。不需要像麵包屑那樣搬移子元素，沒有解析時序問題 |
| C3 | **新增**：頁籤的 tab 按鈕與 panel 放哪 | **全部 light DOM** | `aria-controls`、`aria-labelledby` 的 id 無法跨 Shadow DOM 邊界。按鈕在 Shadow DOM、panel 在 light DOM 時，兩者無法互相參照 |

## 標籤 Tag

| # | 問題 | 建議 |
|---|---|---|
| T1 | **新增**：提供哪些顏色 | `grey`（預設）、`blue`、`green`、`yellow`、`red` 五種，每種文字與背景對比 ≥ 4.5:1 |

## 警告文字 Warning Text

| # | 問題 | 建議 |
|---|---|---|
| W1 | **新增**：視覺隱藏的前綴文字 | 預設「警告」，可用 `icon-label` 屬性改寫 |

## 可展開說明 Details

| # | 問題 | 建議 |
|---|---|---|
| D1 | **新增**：摘要文字用屬性還是 slot | `summary` 屬性。內容用 default slot。Shadow DOM 內使用原生 `<details>` |

## 返回連結 Back Link

| # | 問題 | 建議 |
|---|---|---|
| K1 | 「上一則／下一則」放哪 | **用既有的 pagination block 變體**，不放進本元件 |
| K2 | **新增**：沒有 `href` 時 | 不渲染連結並 console 警告。不提供 `history.back()` |

## 完成面板 Panel

| # | 問題 | 建議 |
|---|---|---|
| M1 | **新增**：標題用屬性還是 slot | `slot="title"`，作者傳入 `<h1>`。元件把標題顏色改為繼承面板文字色 |

## Link 外部連結提示

| # | 問題 | 建議 |
|---|---|---|
| L1 | 提示可見還是只給螢幕閱讀器 | **可見**。`target="_blank"` 時在連結文字後加「（另開新視窗）」 |
| L2 | **新增**：可否關閉 | 提供 `no-new-window-text` 屬性。只在連結周圍已有說明時使用 |

## Button start 變體

| # | 問題 | 建議 |
|---|---|---|
| B1 | 外部網站時換外連圖示 | **不換**，一律右箭頭 |
| B2 | **新增**：`target="_blank"` 時的提示 | 加視覺隱藏的「（另開新視窗）」。按鈕上加可見括號文字會讓按鈕過長 |

## 通知橫幅 Notification Banner

| # | 問題 | 建議 |
|---|---|---|
| N1 | 是否支援關閉 | **支援，預設關閉**。加 `dismissible` 屬性才顯示關閉按鈕。按下發出 `govtw-dismiss` 事件，元件不記住狀態，由作者決定是否儲存 |
| N2 | **新增**：標題 | `heading` 屬性，預設 `info` 為「重要訊息」、`success` 為「成功」 |

## 摘要清單 Summary List

| # | 問題 | 建議 |
|---|---|---|
| S1 | 子元素 API：子元件還是直接寫 `<dl>` | **直接寫 `<dl>`**（依 C2）。每列用 `<div>` 包 `<dt>`、`<dd>`；動作連結放在第二個 `<dd>` |
| S2 | **新增**：無邊框變體 | `no-border` 屬性，用於內容頁的資訊欄 |

## 表格 Table

| # | 問題 | 建議 |
|---|---|---|
| R1 | 用 `::slotted` 還是 light DOM | **light DOM**（依 C2）。作者寫原生 `<table>` |
| R2 | **新增**：窄螢幕水平捲動 | 元件本身當捲動容器：`overflow-x: auto`，自動加 `role="region"`、`tabindex="0"`，名稱取自 `<caption>` 文字 |
| R3 | **新增**：數字欄靠右 | 作者在 `<th>`、`<td>` 加 `class="govtw-table__numeric"` |

## 錯誤摘要 Error Summary

| # | 問題 | 建議 |
|---|---|---|
| E1 | 錯誤連結如何聚焦到 Shadow DOM 內的 input | 錯誤連結的 `href` 指向表單元件的 id（如 `#name`）。點擊時元件呼叫該元件的 `focus()`。已確認 text-input、select、textarea、checkbox、radio 都設了 `delegatesFocus`，`focus()` 會轉到內部 input |
| E2 | **新增**：出現時自動聚焦 | 預設自動聚焦，讓螢幕閱讀器立即念出。提供 `no-autofocus` 關閉 |
| E3 | **新增**：錯誤清單寫法 | 作者寫 `<ul><li><a href="#id">錯誤訊息</a></li></ul>`；標題用 `heading` 屬性，預設「有問題需要處理」 |

## 日期輸入 Date Input

| # | 問題 | 建議 |
|---|---|---|
| I1 | 送出值用 ISO 還是民國年 | **兩者都送**。`{name}` 送 ISO 日期（`2026-10-14`），日期不完整或不存在時送空字串；另送 `{name}-year`、`{name}-month`、`{name}-day` 原始輸入，讓伺服器在驗證失敗時能回填 |
| I2 | 日期區間變體 | **不做**。在文件示範組合兩個 date-input |
| I3 | **新增**：預設曆法 | **`calendar="roc"`（民國年）**。調查中戶政、監理的表單都用民國年。西元年用 `calendar="gregorian"` |
| I4 | **新增**：群組標題 | 元件內部自帶 `<fieldset>`，標題用 `legend` 屬性。理由：年月日三欄必須是一個群組，不應讓作者每次另外包 fieldset |
| I5 | **新增**：錯誤標示 | `error` 屬性放錯誤訊息；`error-fields` 屬性指定哪幾欄加紅框（如 `"day"`、`"month year"`），預設三欄都加 |
| I6 | **新增**：是否內建驗證 | **不內建**。日期是否合理（如 2 月 30 日）由作者或伺服器判斷後設定 `error` |

## 頁籤 Tabs

| # | 問題 | 建議 |
|---|---|---|
| G1 | 「篩選不要用頁籤」 | 寫進設計指引 |
| G2 | **新增**：子元素 API | 作者寫 `<section data-label="分頁名稱">`，元件在前面產生 tablist（依 C3，全部 light DOM） |
| G3 | **新增**：窄螢幕 | 容器寬度 40rem 以下改成一般標題加全部內容，不顯示頁籤 |

## 手風琴 Accordion

| # | 問題 | 建議 |
|---|---|---|
| H1 | 是否內建「複製連結」 | **不內建** |
| H2 | **新增**：子元素 API | `<govtw-accordion-section heading="...">` 子元件，各自用 Shadow DOM；按鈕與內容在同一個 shadow 內，`aria-controls` 可正常參照 |
| H3 | **新增**：標題層級 | `heading-level` 屬性，預設 `2` |
| H4 | **新增**：URL hash 直接展開 | 支援。網址 `#xxx` 與 section 的 `id` 相同時自動展開 |
| H5 | **新增**：瀏覽器搜尋能否找到收合內容 | **不保證**。`hidden="until-found"` 與 slot 的組合行為未確認，第一版不使用，文件註明 |

## 執行順序

由簡單到複雜：

1. tag → 2. warning-text → 3. details → 4. back-link → 5. panel
6. link-external → 7. button-start
8. notification-banner → 9. summary-list → 10. table（先完成 C1 utility class）
11. error-summary → 12. date-input
13. tabs → 14. accordion

每個項目：scaffolder（擴充項目跳過）→ token → `.ts` → docs → `build`、`check:components`、`lint`、`tsc` → 任務文件總結 → commit。

## 停止條件

- 驗證失敗且無法修復
- 遇到本表沒涵蓋的設計問題
