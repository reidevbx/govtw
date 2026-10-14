# 完成面板 Panel

## 概述

完成面板放在交易完成頁的最上方，告訴使用者「已經辦好了」，並顯示案件編號。參考 [GOV.UK Panel](https://design-system.service.gov.uk/components/panel/)。

調查發現有政府網站送出申請後只顯示「請稍後我們將儘速為您辦理」，沒有案件編號，使用者無法查詢進度。

## 互動範例

### 基本用法

<DemoBlock variant="default" direction="column">
  <govtw-panel>
    <h1 slot="title">申請已送出</h1>
    案件編號<br><strong>A1150001234</strong>
  </govtw-panel>

  <template #code>

```html
<govtw-panel>
  <h1 slot="title">申請已送出</h1>
  案件編號<br><strong>A1150001234</strong>
</govtw-panel>
```

  </template>
</DemoBlock>

### 完成頁結構

面板下方用一般段落說明接下來會發生什麼事。

```html
<govtw-panel>
  <h1 slot="title">申請已送出</h1>
  案件編號<br><strong>A1150001234</strong>
</govtw-panel>

<p>我們已寄送確認信到 wang@example.com。</p>

<h2>接下來會發生什麼事</h2>
<p>戶政事務所將在 3 個工作天內審核。審核結果會以簡訊通知。</p>
<p>可隨時到 <govtw-link href="/progress">案件進度查詢</govtw-link> 輸入案件編號查看。</p>
```

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-panel';
```

## 屬性

無屬性。

| Slot | 說明 |
|------|------|
| `title` | 標題，傳入 `<h1>`。元件會清除 margin 並改為面板文字色 |
| （default） | 補充內容，如案件編號 |

## 事件

無事件。

## 無障礙

- **頁面標題**：面板標題是頁面的 `<h1>`。完成頁不要另外再放一個 `<h1>`
- **對比**：淺色主題白字對綠底 5.97:1；深色主題 10.05:1，皆高於 4.5:1
- **高對比模式**：保留透明邊框，在 Windows 高對比模式下仍看得到面板範圍

## 設計指引

### 何時使用

- 交易完成頁：申請送出、付款完成、預約成功

### 何時不使用

- 一般提示訊息 → 用 [通知橫幅 Notification Banner](/components/notification-banner)
- 表單頁或內容頁：面板只用於「流程結束」

### 設計建議

- **一頁只放一個**
- **一定要給案件編號**：讓使用者能查進度、能向客服說明
- **說明下一步**：面板下方寫明審核時間、通知方式、進度查詢方式

### 相關元件

- [警告文字 Warning Text](/components/warning-text)
