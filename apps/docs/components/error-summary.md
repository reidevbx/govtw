# 錯誤摘要 Error Summary

## 概述

表單驗證失敗時，錯誤摘要放在頁面最上方，列出所有錯誤。每項錯誤連到對應欄位。參考 [GOV.UK Error summary](https://design-system.service.gov.uk/components/error-summary/)。

錯誤摘要要**搭配欄位錯誤訊息**一起使用：摘要告訴使用者「有哪些問題」，欄位旁的訊息告訴使用者「哪裡要改」。欄位錯誤訊息由 [文字輸入 Text Input](/components/text-input) 等表單元件的 `error` 屬性提供。

調查發現多個政府網站用彈出視窗顯示錯誤，關掉後使用者就看不到哪一欄錯了。

## 互動範例

### 基本用法

點錯誤連結，焦點會移到對應欄位。範例加了 `no-autofocus`，避免文件頁一載入就跳到這裡。

<DemoBlock variant="default" direction="column">
  <govtw-stack space="6">
    <govtw-error-summary no-autofocus>
      <ul>
        <li><a href="#demo-name">請輸入姓名</a></li>
        <li><a href="#demo-id">身分證統一編號格式不正確，應為 1 個英文字母加 9 個數字</a></li>
      </ul>
    </govtw-error-summary>
    <govtw-text-input id="demo-name" label="姓名" error="請輸入姓名"></govtw-text-input>
    <govtw-text-input id="demo-id" label="身分證統一編號" width="10" value="A12345" error="身分證統一編號格式不正確，應為 1 個英文字母加 9 個數字"></govtw-text-input>
  </govtw-stack>

  <template #code>

```html
<govtw-error-summary>
  <ul>
    <li><a href="#name">請輸入姓名</a></li>
    <li><a href="#id-number">身分證統一編號格式不正確，應為 1 個英文字母加 9 個數字</a></li>
  </ul>
</govtw-error-summary>

<govtw-text-input id="name" label="姓名" error="請輸入姓名"></govtw-text-input>
<govtw-text-input
  id="id-number"
  label="身分證統一編號"
  width="10"
  error="身分證統一編號格式不正確，應為 1 個英文字母加 9 個數字">
</govtw-text-input>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-error-summary';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `heading` | `string` | `'有問題需要處理'` | 標題 |
| `no-autofocus` | `boolean` | `false` | 出現時不自動取得焦點 |

| 子元素 | 說明 |
|--------|------|
| `<ul><li><a href="#欄位id">` | 錯誤清單。連結的 `href` 指向表單元件的 `id` |

### 連結要指向哪裡

| 錯誤欄位 | `href` 指向 |
|----------|-------------|
| 文字輸入、多行文字、選擇清單 | 該元件的 `id` |
| 單選按鈕、核取方塊群組 | 群組中**第一個**選項的 `id` |

### 限制

- 元件在頁面解析完成後，把子元素包裝一次。之後新增或移除子元素，不會重新包裝
- 元件以 light DOM 渲染

## 事件

無事件。

## 無障礙

- **立即念出**：`role="alert"`，出現時自動取得焦點，螢幕閱讀器馬上念出標題與錯誤
- **連結到欄位**：點連結後，頁面捲到欄位頂端，焦點移進欄位的輸入框。表單元件都設了 `delegatesFocus`，所以焦點會進到元件內部的 `<input>`
- **文案一致**：摘要中的錯誤文字，與欄位旁的錯誤訊息相同

## 設計指引

### 何時使用

- 使用者送出表單後，伺服器或前端驗證發現錯誤

### 何時不使用

- 使用者還在填寫時：不要邊打字邊顯示錯誤
- 非表單錯誤（如系統錯誤）→ 另做錯誤頁

### 設計建議

- **放在頁面最上方**：主內容 `<h1>` 之前
- **頁面標題加「錯誤：」**：如 `<title>錯誤：申請戶籍謄本</title>`，螢幕閱讀器使用者切換分頁時也知道有錯
- **錯誤訊息寫明怎麼改**：寫「應為 1 個英文字母加 9 個數字」，不寫「格式錯誤」
- **不要用彈出視窗**：彈窗關掉後使用者就看不到錯誤

### 相關元件

- [文字輸入 Text Input](/components/text-input)
- [欄位群組 Fieldset](/components/fieldset)
