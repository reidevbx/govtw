# 元件缺口調查總表（2026-10-14）

## 問題分析

### 調查方式

- 4 個 agent 同時調查 13 個台灣政府網站，盤點「本系統還沒有」的 UI 元件
- 工具：WebFetch 抓 HTML；SPA 頁面（稅務入口網）改用 Chrome 開啟，只看不送出
- 已有元件不列入：button、link、text-input、textarea、select、checkbox、radio、fieldset、inset-text、pagination、container、stack、sidebar、cluster

| 組別 | 網站 | 結果 |
|---|---|---|
| 入口與部會 | gov.tw、數位發展部 | ✅ 抓到 |
| | 國家發展委員會 | ❌ Cloudflare 驗證頁，全站 403 |
| 戶政與稅務 | 內政部戶政司、內政部、財政部稅務入口網 | ✅ 抓到（戶政表單在 iframe 內，另抓 src） |
| 勞保與監理 | 勞保局、監理服務網 | ✅ 抓到 |
| | 健保署 | ❌ Cloudflare 驗證頁，全站 403 |
| 地方政府 | 臺北市政府、台北服務通、高雄市政府、高雄數位市民 | ✅ 抓到（部分申辦頁內容未渲染） |

### 調查限制

- WebFetch 只看得到 DOM 與文字，**無法判斷顏色對比、focus 是否可見**
- 沒有登入、沒有送出表單：確認頁、完成頁、伺服器錯誤畫面都沒有直接證據
- 國發會、健保署沒有資料，需用真瀏覽器補看
- 完整的多步驟申辦流程沒有觀察到，步驟指示的需求證據較弱

## 需求定義

把缺少的元件拆成一個元件一份任務文件，依優先度排序。每份文件含：實例網址、現況問題、需求、無障礙、待確認事項、實作計劃。

### 優先度定義

| 等級 | 條件 |
|---|---|
| P0 | 每頁都有，或台灣法規要求 |
| P1 | 表單流程與內容呈現的核心元件，GOV.UK 有對應 |
| P2 | 台灣特有，或中等頻率 |
| P3 | 低頻，可能用既有元件組合即可 |

### P0：每頁都有（7 個）

| 元件 | GOV.UK 對應 | 任務文件 |
|---|---|---|
| 跳至主要內容 Skip Link | ✅ | [skip-link](./2026-10-14-skip-link-component.md) |
| 導盲磚 Accesskey | ❌ 台灣自訂 | [accesskey](./2026-10-14-accesskey-component.md) |
| 頁首 Header | ✅ | [header](./2026-10-14-header-component.md) |
| 頁尾 Footer | ✅ | [footer](./2026-10-14-footer-component.md) |
| 麵包屑 Breadcrumbs | ✅ | [breadcrumbs](./2026-10-14-breadcrumbs-component.md) |
| 主選單 Service Navigation | ✅ | [service-navigation](./2026-10-14-service-navigation-component.md) |
| 搜尋框 Search | ❌ 台灣自訂 | [search](./2026-10-14-search-component.md) |

### P1：表單流程與內容核心（12 個）

| 元件 | GOV.UK 對應 | 任務文件 |
|---|---|---|
| 日期輸入 Date Input（含民國年） | ✅ | [date-input](./2026-10-14-date-input-component.md) |
| 錯誤摘要 Error Summary | ✅ | [error-summary](./2026-10-14-error-summary-component.md) |
| 通知橫幅 Notification Banner | ✅ | [notification-banner](./2026-10-14-notification-banner-component.md) |
| 警告文字 Warning Text | ✅ | [warning-text](./2026-10-14-warning-text-component.md) |
| 摘要清單 Summary List | ✅ | [summary-list](./2026-10-14-summary-list-component.md) |
| 完成面板 Panel | ✅ | [panel](./2026-10-14-panel-component.md) |
| 表格 Table | ✅ | [table](./2026-10-14-table-component.md) |
| 頁籤 Tabs | ✅ | [tabs](./2026-10-14-tabs-component.md) |
| 手風琴 Accordion | ✅ | [accordion](./2026-10-14-accordion-component.md) |
| 可展開說明 Details | ✅ | [details](./2026-10-14-details-component.md) |
| 標籤 Tag | ✅ | [tag](./2026-10-14-tag-component.md) |
| 返回連結 Back Link | ✅ | [back-link](./2026-10-14-back-link-component.md) |

### P2：台灣特有或中頻（10 個）

| 元件 | GOV.UK 對應 | 任務文件 |
|---|---|---|
| 圖形驗證碼 Captcha（含語音） | ❌ | [captcha](./2026-10-14-captcha-component.md) |
| 步驟指示 Step Indicator | ❌ | [step-indicator](./2026-10-14-step-indicator-component.md) |
| 檔案上傳 File Upload | ✅ | [file-upload](./2026-10-14-file-upload-component.md) |
| 附件下載 Attachment（PDF/ODF） | ❌ | [attachment](./2026-10-14-attachment-component.md) |
| 側邊選單 Side Navigation | ❌ | [side-navigation](./2026-10-14-side-navigation-component.md) |
| 字級切換 Font Size Switcher | ❌ | [font-size-switcher](./2026-10-14-font-size-switcher-component.md) |
| 頁面工具列 Page Tools（列印、LINE 分享） | ❌ | [page-tools](./2026-10-14-page-tools-component.md) |
| 卡片 Card | ❌ | [card](./2026-10-14-card-component.md) |
| 文件列表 Document List | ❌ | [document-list](./2026-10-14-document-list-component.md) |
| 密碼輸入 Password Input | ✅ | [password-input](./2026-10-14-password-input-component.md) |

### P3：低頻（2 個）

| 元件 | 任務文件 |
|---|---|
| 簡訊驗證碼 OTP Input | [otp-input](./2026-10-14-otp-input-component.md) |
| 頁內目錄 Contents List | [contents-list](./2026-10-14-contents-list-component.md) |

### 既有元件擴充（3 個）

| 項目 | 優先度 | 任務文件 |
|---|---|---|
| Link 新增外部連結提示「（另開新視窗）」 | P1 | [link-external](./2026-10-14-link-external.md) |
| Button 新增 start 變體（我要線上申辦） | P1 | [button-start](./2026-10-14-button-start.md) |
| Pagination 新增結果計數與每頁筆數 | P2 | [pagination-page-size](./2026-10-14-pagination-page-size.md) |

已確認現有元件**不缺**的功能：

- 欄位錯誤訊息：text-input、select、textarea 已有 `error` 屬性與 `aria-invalid`
- 分頁目前頁：pagination 已有 `aria-current`

### 不做成元件，改寫成 Pattern（模式）

這些是多個元件的組合，之後在 `apps/docs/patterns/` 補頁面：

| Pattern | 組成 | 看到的網站 |
|---|---|---|
| 地址 Addresses | 縣市、鄉鎮市區連動選單 | 戶政司、稅務入口網。已有任務：[addresses-pattern](./2026-04-30-addresses-pattern.md) |
| 頁面意見回饋 | radio + textarea + button | gov.tw、臺北市 |
| 列表篩選 | fieldset + checkbox + date-input + button | 數位發展部、臺北市、稅務入口網 |
| 申辦須知同意 | checkbox + details | 戶政司 |
| 登入方式選擇（自然人憑證、健保卡等） | radio + inset-text | 稅務入口網、戶政司 |
| 回頁面頂端 | link | 所有網站，但三站三種文案 |
| 語言切換、深色模式切換 | 放進 header 的 tools slot | 數位發展部、臺北市、高雄市 |

### 不做

| 項目 | 原因 |
|---|---|
| 輪播 Carousel | GOV.UK 刻意不提供；調查中的輪播普遍 alt 空白、沒有暫停鈕（違反 WCAG 2.2.2） |
| 聊天機器人 | 屬站台服務，不屬設計系統 |
| 即時資訊條（天氣、空品） | 屬站台功能 |
| 瀏覽人次、下載次數 | 屬後端功能 |
| Cookie 同意橫幅 | 調查的網站都沒有 |
| 對話框 Modal | GOV.UK 不提供；之後若有明確需求再評估 |

## 跨站共通問題 → 寫進元件規範

調查中重複出現的問題。之後每個元件的設計指引都應該對照：

1. **用連結假裝按鈕**：`<a href="javascript:...">`、`href="#"` 很普遍。送出、切換、列印一律用 `<button>`
2. **label 與 id 不對應**：監理服務網至少 5 處、稅務入口網 29 個勾選框的可及名稱都是「on」
3. **「另開新視窗」只放 title**：而且有 4 種寫法。由 link-external 任務統一
4. **民國年與西元年混用**：同一機關也混用。需要一份「日期顯示規範」，見後續建議
5. **導覽重複輸出 3 到 4 次**：header、service-navigation 必須單一 DOM 做響應式
6. **圖片 alt 缺失或無意義**：空字串、「.」、「排版用圖」。card、header logo 的 alt 必填
7. **重複的「更多」連結**：card、document-list 需支援描述性文字

## 實作計劃

- [x] 4 個 agent 調查 13 個網站
- [x] 比對現有元件，排除已有功能
- [x] 產出 31 份新元件任務、3 份擴充任務、1 份總表
- [ ] 使用者確認優先度與「不做」清單
- [ ] 依 P0 → P1 → P2 → P3 順序逐一執行

### 建議執行順序

P0 內有依賴關係，建議順序：

1. skip-link、accesskey（header 會用到）
2. breadcrumbs、search、service-navigation
3. header、footer（組合前面的元件）

P1 建議先做表單流程：error-summary → date-input → warning-text → notification-banner → summary-list → panel。之後再做內容呈現類。

## 影響範圍

- 新增：本次只新增 `tasks/features/` 下的任務文件，共 35 份
- 不動任何程式碼與 docs

## 總結

### 完成項目

- ✅ 13 個網站，11 個抓到資料，2 個被擋（國發會、健保署）
- ✅ 31 個新元件任務：P0 7 個、P1 12 個、P2 10 個、P3 2 個
- ✅ 3 個既有元件擴充任務
- ✅ 7 個 Pattern 候選、6 個不做項目

### 後續建議

- **補看被擋的網站**：國發會、健保署用真瀏覽器開啟
- **實測申辦流程**：步驟指示、確認頁、完成頁需登入或送出才看得到
- **查證規範條文**：導盲磚代號（U/C/Z 或 U/C/B）、無障礙標章 alt 文案，需查數位發展部〈網站無障礙規範〉原文
- **新增日期顯示規範**：在 `apps/docs/foundations/` 加一頁，規定民國年與西元年的使用時機和格式
