# 警告文字 Warning Text

## 概述

警告文字提醒使用者「不照做會有後果」，例如密碼輸錯會鎖定、須臨櫃辦理。參考 [GOV.UK Warning text](https://design-system.service.gov.uk/components/warning-text/)。

左側驚嘆號圖示加粗體文字。比 [補充說明 Inset Text](/components/inset-text) 更強烈，用於重要限制，不用於一般說明。

## 互動範例

### 基本用法

<DemoBlock variant="default" direction="column">
  <govtw-warning-text>密碼連續輸錯 3 次，帳號將被鎖定 30 分鐘。</govtw-warning-text>

  <template #code>

```html
<govtw-warning-text>密碼連續輸錯 3 次，帳號將被鎖定 30 分鐘。</govtw-warning-text>
```

  </template>
</DemoBlock>

### 與說明文字搭配

警告文字只寫後果與限制。背景說明寫在一般段落。

<DemoBlock variant="with-content" direction="column">
  <govtw-stack space="4">
    <p style="margin: 0;">姓名含有異體字或罕用字時，系統可能無法正確顯示。</p>
    <govtw-warning-text>姓名含有異體字者，請攜帶身分證正本至戶政事務所臨櫃辦理，無法線上申請。</govtw-warning-text>
  </govtw-stack>

  <template #code>

```html
<p>姓名含有異體字或罕用字時，系統可能無法正確顯示。</p>
<govtw-warning-text>
  姓名含有異體字者，請攜帶身分證正本至戶政事務所臨櫃辦理，無法線上申請。
</govtw-warning-text>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-warning-text';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `icon-label` | `string` | `'警告'` | 視覺隱藏的前綴文字，螢幕閱讀器會先念「警告：」 |

| Slot | 說明 |
|------|------|
| （default） | 警告內容 |

## 事件

無事件。

## 無障礙

- **不只靠圖示**：驚嘆號圖示加了 `aria-hidden`。文字前有視覺隱藏的「警告：」，螢幕閱讀器使用者也知道這是警告
- **粗體**：整段文字以 `<strong>` 標示
- **高對比模式**：圖示在 Windows 高對比模式下保留圓形邊界

## 設計指引

### 何時使用

- 使用者不照做就會失敗、被罰、資料遺失
- 例：「逾期未繳將加徵滯納金」「須臨櫃辦理，無法線上申請」

### 何時不使用

- 一般補充說明 → 用 [補充說明 Inset Text](/components/inset-text)
- 整個網站的公告（如系統維護） → 用通知橫幅 Notification Banner（規劃中）
- 表單驗證錯誤 → 用欄位的 `error` 屬性

### 設計建議

- **一頁最多一到兩處**：太多會失去警示效果
- **寫明後果**：不要只寫「請注意」，要寫「不這樣做會怎樣」
- **與背景說明分開**：調查發現有網站把重要限制與費率沿革混在同一長清單，使用者看不出哪條最重要

### 相關元件

- [補充說明 Inset Text](/components/inset-text)
