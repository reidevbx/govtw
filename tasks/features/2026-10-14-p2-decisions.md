# P2 元件決定表（2026-10-14）

P2 共 10 個新元件與 1 項既有元件擴充。使用者確認後依序連續執行，不再逐項詢問。

- 來源：各任務文件的「待確認」段，加上實作前檢查程式碼發現的問題（標「新增」）
- 每項附建議做法；使用者只需改不同意的項目
- 沿用 [P0 決定表](./2026-10-14-p0-decisions.md) 與 [P1 決定表](./2026-10-14-p1-decisions.md) 的共通決定

## 共通

| # | 問題 | 建議 | 理由 |
|---|---|---|---|
| C4 | **新增**：GOV.UK 沒有的元件（圖形驗證碼、步驟指示、卡片、字級切換、頁面工具列）參考什麼 | **參考來源寫「台灣政府網站調查」**，並在設計指引說明 GOV.UK 為何不做、何時該用替代做法 | 台灣網站普遍有，不做的話各機關會各自做出不符無障礙的版本 |
| C5 | **新增**：一組項目的元件（附件、文件列表）怎麼寫子項 | **用子元件**，如 `<govtw-document-list-item>`，與 accordion 同一種做法 | 每項欄位固定（標題、日期、單位），用屬性比讓作者手寫 HTML 結構不容易寫錯 |
| C6 | **新增**：導覽清單（側邊選單、步驟指示）怎麼寫 | **作者寫原生 `<ul>`／`<ol>`，元件用 light DOM 包裝**，與 breadcrumbs 同一種做法 | 巢狀清單與 `aria-current` 都在作者的 HTML 裡，語意最完整 |

## 密碼輸入 Password Input

| # | 問題 | 建議 |
|---|---|---|
| PW1 | **新增**：繼承 text-input 還是獨立元件 | **獨立元件**。text-input 的狀態欄位都是 `private`，繼承要改它的程式碼。樣式約 80 行與 text-input 重複，token 用自己的 `--govtw-password-input-*` |
| PW2 | **新增**：按鈕文字與宣告 | 按鈕可見文字「顯示」／「隱藏」，可讀名稱「顯示密碼」／「隱藏密碼」。切換時 live region 念「密碼已顯示」／「密碼已隱藏」 |
| PW3 | **新增**：送出表單時 | 自動切回隱藏，避免瀏覽器把明碼記進表單歷史（GOV.UK 同做法） |
| PW4 | **新增**：`autocomplete` | 預設 `current-password`；註冊頁由作者設 `new-password` |

## 檔案上傳 File Upload

| # | 問題 | 建議 |
|---|---|---|
| FU1 | 是否做拖放區 | **第一版不做**，只包原生 `<input type="file">` 並加樣式。GOV.UK 近期版本的拖放區設計我沒有查證，留到後續任務 |
| FU2 | **新增**：是否檢查檔案大小與格式 | **不檢查**。`accept` 只交給瀏覽器；大小、格式錯誤由作者或伺服器判斷後設 `error` |
| FU3 | **新增**：送出值 | 用 `FormData` 送出所有選取的檔案，欄位名為 `name` |

## 圖形驗證碼 Captcha

| # | 問題 | 建議 |
|---|---|---|
| CA1 | 設計系統是否推薦圖形驗證碼 | **提供元件，但設計指引寫明優先用其他防濫用做法**（如限制送出頻率）。只有機關必須用時才用本元件 |
| CA2 | **新增**：圖片與換一張 | `src`、`alt`（預設「圖形驗證碼」）屬性。「換一張」按鈕只發出 `govtw-refresh` 事件，元件不自己抓新圖，由作者更新 `src` 與 `audio-src` |
| CA3 | **新增**：語音版 | `audio-src` 必填，缺少時 console 警告。「語音播放」按鈕播放元件內的 `<audio>` |
| CA4 | **新增**：WCAG 3.3.8 | 文件寫明：抄寫驗證碼本身屬於認知測驗。若用在登入流程，**需另外提供不用驗證碼的登入方式**才符合 3.3.8。這點我不確定各機關的實際做法，文件只寫規範要求 |
| CA5 | **新增**：輸入框 | `autocomplete="off"`、`spellcheck="false"`；`inputmode` 由作者設（純數字驗證碼設 `numeric`） |

## 步驟指示 Step Indicator

| # | 問題 | 建議 |
|---|---|---|
| SI1 | 做完整步驟條，還是 GOV.UK 的「第 x 步，共 n 步」 | **做步驟條**；容器寬度 40rem 以下改成只顯示「第 2 步，共 4 步」。設計指引說明步驟少於 3 步時，直接在標題上方寫文字即可 |
| SI2 | **新增**：API | 作者寫 `<ol><li>`（依 C6），元件屬性只有 `current`。總步數由 `<li>` 數量決定，**不提供 `total` 屬性**，避免兩者不一致 |
| SI3 | **新增**：步驟可否點擊回到前一步 | **不可點擊**，只顯示。回到前一步用 back-link |
| SI4 | 是否用瀏覽器實測實際申辦流程 | **不實測**。需要登入或送出資料，依現有調查結果實作 |

## 附件下載 Attachment

| # | 問題 | 建議 |
|---|---|---|
| AT1 | 是否顯示下載次數 | **不顯示** |
| AT2 | **新增**：一份文件多種格式的 API | `<govtw-attachment heading="會議紀錄">` 內放多個 `<govtw-attachment-file href format size>`（依 C5） |
| AT3 | **新增**：連結的可讀名稱 | 可見文字「PDF（245 KB）」，前面加視覺隱藏的標題，螢幕閱讀器念「會議紀錄 PDF（245 KB）」 |
| AT4 | **新增**：格式圖示 | 不用圖片圖示，只用文字標示格式 |

## 文件列表 Document List

| # | 問題 | 建議 |
|---|---|---|
| DL1 | 與 Table 的分工 | 多欄、需要比較的資料用 table；新聞、公告、法規列表用本元件。兩頁文件互相連結 |
| DL2 | **新增**：API | `<govtw-document-list>` 內放 `<govtw-document-list-item heading href date unit>`；標籤用 `slot="tags"` 放 `<govtw-tag>`（依 C5） |
| DL3 | **新增**：日期顯示格式 | `date` 屬性填 ISO（`2026-10-14`），`<time datetime>` 用 ISO。畫面預設顯示民國年「115 年 10 月 14 日」，與 date-input 一致；`calendar="gregorian"` 改顯示西元年 |
| DL4 | **新增**：完成後 | table.md 的「規劃中」改成實際連結 |

## 卡片 Card

| # | 問題 | 建議 |
|---|---|---|
| CD1 | 改用「服務清單」pattern 取代？ | **做卡片**。設計指引寫明：沒有圖片、只有標題與說明時，改用一般連結清單 |
| CD2 | **新增**：API | `heading`、`href`、`heading-level`（預設 3）屬性；說明用 default slot；圖片用 `slot="image"`。標題連結在 Shadow DOM 內，用 `::after` 擴大到整張卡的點擊範圍 |
| CD3 | **新增**：圖片 alt | 元件無法檢查作者的 `<img>`。文件寫明：卡片圖片多半是裝飾，設 `alt=""` |

## 側邊選單 Side Navigation

| # | 問題 | 建議 |
|---|---|---|
| SN1 | 是否支援收合 | **第一版不收合**。作者只輸出目前分支的第二層，其他分支只列第一層 |
| SN2 | **新增**：目前頁標示 | 作者在 `<a>` 加 `aria-current="page"`（依 C6），元件只加樣式：左側粗線加粗體 |
| SN3 | **新增**：`<nav>` 名稱 | `label` 屬性，預設「本單元選單」 |

## 頁面工具列 Page Tools

| # | 問題 | 建議 |
|---|---|---|
| PT1 | 預設分享平台 | `platforms` 屬性，預設 `line facebook email`；可加 `x` |
| PT2 | **新增**：Web Share API | 瀏覽器支援 `navigator.share` 時，平台連結改成單一「分享」按鈕。手機的系統分享選單已包含 LINE |
| PT3 | **新增**：分享的網址與標題 | 預設取 `location.href` 與 `document.title`；可用 `url`、`share-title` 覆寫 |
| PT4 | **新增**：外連提示 | 平台連結開新視窗，沿用 link 元件，自動加「（另開新視窗）」 |
| PT4′ | **實作時改變** | 改為同一分頁開啟，不加提示。工具列每個連結都加可見提示會過長 |

## 字級切換 Font Size Switcher

| # | 問題 | 建議 |
|---|---|---|
| FS1 | tokens 是否新增 `data-font-size` 主題 | **不改 `build.js`**。在 `tokens.json` 的 `utilities` 加 3 條規則：`html[data-font-size="small"]` 87.5%、`medium` 100%、`large` 125%。所有字級 token 都是 rem，會一起縮放 |
| FS2 | **新增**：用百分比還是 px | **百分比**，保留使用者在瀏覽器設定的基準字級 |
| FS3 | **新增**：文件頁的範例 | ⚠️ 按下範例會改變整個文件站台的字級，並記到 localStorage。設計上這就是元件的行為，文件加一行說明，按「中」可還原 |
| FS4 | **新增**：按鈕文字 | 可見文字「小」「中」「大」，群組名稱「字級」 |

## Pagination 每頁筆數

| # | 問題 | 建議 |
|---|---|---|
| PG1 | 做成屬性，還是只在文件示範組合 | **只在文件示範**：pagination 上方放「共 N 筆，第 X / Y 頁」段落，加 `govtw-select` 與送出按鈕。不改 pagination 程式碼 |

## 執行順序

1. password-input
2. file-upload
3. captcha
4. step-indicator
5. attachment
6. document-list
7. card
8. side-navigation
9. page-tools
10. font-size-switcher
11. pagination 文件範例

前 3 個是表單元件，結構相近，先做。每項一個 commit。
