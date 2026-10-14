# 完成頁

## 概述

申辦流程的最後一頁。告訴使用者申請已送出，並說明接下來會發生什麼事。參考 [GOV.UK Confirmation pages](https://design-system.service.gov.uk/patterns/confirmation-pages/)。

## 何時使用

- 申請、付款、預約等流程完成時

只是儲存設定或更新資料，不需要完成頁，用[通知橫幅](/components/notification-banner)告知即可。

## 範例

<DemoBlock variant="default" direction="column">
  <govtw-stack space="6">
    <govtw-panel>
      <h1 slot="title">申請已送出</h1>
      案件編號<br><strong>A1150001234</strong>
    </govtw-panel>
    <p>我們已寄送確認信到 wang@example.com。</p>
    <h2>接下來會發生什麼事</h2>
    <p>戶政事務所會在 3 個工作天內審核。審核通過後，我們會寄 Email 通知你到所選的戶政事務所領取。</p>
    <p>你可以用案件編號<govtw-link href="#">查詢申請進度</govtw-link>。</p>
    <h2>需要協助</h2>
    <p>請撥打 0800-000-000，週一至週五 8:30 至 17:30。</p>
    <p><govtw-link href="#">這項服務好用嗎？給我們意見</govtw-link>（約 1 分鐘）</p>
  </govtw-stack>

  <template #code>

```html
<govtw-panel>
  <h1 slot="title">申請已送出</h1>
  案件編號<br><strong>A1150001234</strong>
</govtw-panel>

<p>我們已寄送確認信到 wang@example.com。</p>

<h2>接下來會發生什麼事</h2>
<p>戶政事務所會在 3 個工作天內審核。審核通過後，我們會寄 Email 通知你到所選的戶政事務所領取。</p>
<p>你可以用案件編號<govtw-link href="/track">查詢申請進度</govtw-link>。</p>

<h2>需要協助</h2>
<p>請撥打 0800-000-000，週一至週五 8:30 至 17:30。</p>

<p><govtw-link href="/feedback">這項服務好用嗎？給我們意見</govtw-link>（約 1 分鐘）</p>
```

  </template>
</DemoBlock>

範例的審核天數、電話都是示意，請換成實際內容。

## 做法

### 1. 頁面要有的內容

GOV.UK 列出完成頁必須有的內容：

| 內容 | 說明 |
|---|---|
| [完成面板](/components/panel) | 標題寫完成了什麼，如「申請已送出」 |
| 案件編號 | 有的話放在面板裡。使用者查進度、聯絡客服時要用 |
| 接下來會發生什麼事 | 寫明誰會做什麼、多久內完成、怎麼通知使用者 |
| 聯絡方式 | 電話、服務時間，或線上客服 |
| 意見回饋連結 | 連到意見回饋頁 |
| 保存紀錄的方式 | 例如下載 PDF |
| 下一步可能需要的連結 | 例如查詢進度、相關服務 |

### 2. 確認信

- 可以另外寄 Email 或簡訊，附上案件編號。GOV.UK 沒有規定必須寄，範例中有寄
- 頁面上寫明寄到哪裡，使用者才知道去哪裡找

### 3. 面板內不要放連結或按鈕

面板的背景是成功色（綠色），連結與按鈕放在裡面不易辨識。GOV.UK 指出，放在裡面的互動元件要另外調整樣式，對比至少 3:1。連結一律放在面板下方。

### 4. 使用者重新打開這一頁

有些使用者會把完成頁加入書籤，當成收據。

- 能做到的話，讓這一頁可以重新打開
- 做不到的話，書籤打開時顯示有用的內容，例如查詢進度、重新申請、聯絡客服的連結

## 無障礙

- **標題放在面板裡**：面板的 `slot="title"` 放 `<h1>`，螢幕閱讀器使用者一進頁面就聽到「申請已送出」
- **案件編號是文字**：不要做成圖片，使用者才能複製、螢幕閱讀器才能念
- **連結放在面板外**：面板背景上的連結對比可能不足

## 用到的元件

- [完成面板 Panel](/components/panel)
- [連結 Link](/components/link)

## 參考來源

- [GOV.UK Confirmation pages](https://design-system.service.gov.uk/patterns/confirmation-pages/)
