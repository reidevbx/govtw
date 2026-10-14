# 通知橫幅 Notification Banner

## 概述

通知橫幅放在頁面頂端，告訴使用者「與整個服務相關、需要立即知道」的事。參考 [GOV.UK Notification banner](https://design-system.service.gov.uk/components/notification-banner/)。

兩種類型：

- **info**：一般公告，如系統維護、反詐騙提醒
- **success**：使用者剛完成某個操作，如「資料已儲存」

## 互動範例

### 一般公告

<DemoBlock variant="default" direction="column">
  <govtw-notification-banner>
    <p>本網站將於 115 年 10 月 15 日（星期四）17:00–20:00 進行系統維護，期間暫停服務。</p>
  </govtw-notification-banner>

  <template #code>

```html
<govtw-notification-banner>
  <p>本網站將於 115 年 10 月 15 日（星期四）17:00–20:00 進行系統維護，期間暫停服務。</p>
</govtw-notification-banner>
```

  </template>
</DemoBlock>

### 操作成功

success 類型出現時會自動取得焦點，螢幕閱讀器立即念出。範例加了 `no-autofocus`，避免文件頁一載入就跳到這裡。

<DemoBlock variant="success" direction="column">
  <govtw-notification-banner type="success" no-autofocus>
    <p>已更新您的通訊地址。</p>
  </govtw-notification-banner>

  <template #code>

```html
<govtw-notification-banner type="success">
  <p>已更新您的通訊地址。</p>
</govtw-notification-banner>
```

  </template>
</DemoBlock>

### 可關閉

加 `dismissible` 顯示關閉按鈕。元件不會記住關閉狀態；要讓使用者下次不再看到，請監聽 `govtw-dismiss` 事件自行儲存。

<DemoBlock variant="dismissible" direction="column">
  <govtw-notification-banner dismissible heading="反詐騙提醒">
    <p>本機關不會以電話要求您操作 ATM 或提供帳戶密碼。</p>
  </govtw-notification-banner>

  <template #code>

```html
<govtw-notification-banner dismissible heading="反詐騙提醒">
  <p>本機關不會以電話要求您操作 ATM 或提供帳戶密碼。</p>
</govtw-notification-banner>

<script>
  document.querySelector('govtw-notification-banner')
    .addEventListener('govtw-dismiss', () => {
      localStorage.setItem('fraud-notice-dismissed', '1');
    });
</script>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-notification-banner';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `type` | `'info' \| 'success'` | `'info'` | 類型 |
| `heading` | `string` | `''` | 標題；空值時 info 為「重要訊息」、success 為「成功」 |
| `dismissible` | `boolean` | `false` | 顯示關閉按鈕 |
| `no-autofocus` | `boolean` | `false` | success 類型不自動取得焦點 |

| Slot | 說明 |
|------|------|
| （default） | 公告內容 |

## 事件

| 事件 | 說明 |
|------|------|
| `govtw-dismiss` | 按下關閉按鈕時觸發，可取消。未呼叫 `preventDefault()` 時元件會隱藏 |

## 無障礙

- **info**：`role="region"` 地標，名稱取自標題。螢幕閱讀器可從地標清單找到
- **success**：`role="alert"`，出現時自動取得焦點並念出內容
- **標題**：使用 `<h2>`
- **關閉按鈕**：原生 `<button>`，可讀名稱「關閉通知」，大小 44×44px。調查發現有網站的關閉鈕是沒有 `href` 的 `<a>`，鍵盤無法操作
- **對比**：標題列白字對品牌藍 9.21:1、對成功綠 5.97:1（淺色主題）

## 設計指引

### 何時使用

- 系統維護、服務中斷等影響整個服務的公告
- 使用者完成操作後的確認訊息

### 何時不使用

- 表單驗證錯誤 → 用 [錯誤摘要 Error Summary](/components/error-summary)
- 交易完成頁 → 用 [完成面板 Panel](/components/panel)
- 只跟某段內容有關的提醒 → 用 [警告文字 Warning Text](/components/warning-text) 或 [補充說明 Inset Text](/components/inset-text)

### 設計建議

- **一頁最多一個**
- **過期公告要下架**：調查發現有網站頁尾還留著 3 年前的公告
- **維護時間寫清楚**：日期、星期、起訖時間
- **重要公告不要設為可關閉**：使用者可能誤關後錯過資訊

### 相關元件

- [完成面板 Panel](/components/panel)
- [警告文字 Warning Text](/components/warning-text)
