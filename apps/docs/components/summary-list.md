# 摘要清單 Summary List

## 概述

摘要清單以「標題：內容」成對列出資訊。常用在申請送出前的確認頁，讓使用者檢查填寫內容並修改。參考 [GOV.UK Summary list](https://design-system.service.gov.uk/components/summary-list/)。

作者直接寫原生 `<dl>`，元件只負責樣式，不改寫結構。

## 互動範例

### 確認頁：含變更連結

每列的第二個 `<dd>` 放動作連結。連結文字加上視覺隱藏的欄位名稱，螢幕閱讀器才會念出「變更姓名」，而不是一連串的「變更」。

<DemoBlock variant="default" direction="column">
  <govtw-summary-list>
    <dl>
      <div>
        <dt>姓名</dt>
        <dd>王小明</dd>
        <dd><govtw-link href="#">變更<span class="govtw-visually-hidden">姓名</span></govtw-link></dd>
      </div>
      <div>
        <dt>出生日期</dt>
        <dd>民國 78 年 7 月 2 日</dd>
        <dd><govtw-link href="#">變更<span class="govtw-visually-hidden">出生日期</span></govtw-link></dd>
      </div>
      <div>
        <dt>戶籍地址</dt>
        <dd>100057<br>臺北市中正區<br>範例路 1 號 3 樓</dd>
        <dd><govtw-link href="#">變更<span class="govtw-visually-hidden">戶籍地址</span></govtw-link></dd>
      </div>
    </dl>
  </govtw-summary-list>

  <template #code>

```html
<govtw-summary-list>
  <dl>
    <div>
      <dt>姓名</dt>
      <dd>王小明</dd>
      <dd>
        <govtw-link href="/apply/name">
          變更<span class="govtw-visually-hidden">姓名</span>
        </govtw-link>
      </dd>
    </div>
    <div>
      <dt>出生日期</dt>
      <dd>民國 78 年 7 月 2 日</dd>
      <dd>
        <govtw-link href="/apply/birthday">
          變更<span class="govtw-visually-hidden">出生日期</span>
        </govtw-link>
      </dd>
    </div>
  </dl>
</govtw-summary-list>
```

  </template>
</DemoBlock>

### 內容頁資訊欄：無邊框

`no-border` 移除列之間的分隔線，適合放在內容頁末端的發布資訊。

<DemoBlock variant="no-border" direction="column">
  <govtw-summary-list no-border>
    <dl>
      <div><dt>發布單位</dt><dd>戶政司</dd></div>
      <div><dt>發布日期</dt><dd><time datetime="2026-10-08">115-10-08</time></dd></div>
      <div><dt>更新日期</dt><dd><time datetime="2026-10-14">115-10-14</time></dd></div>
    </dl>
  </govtw-summary-list>

  <template #code>

```html
<govtw-summary-list no-border>
  <dl>
    <div><dt>發布單位</dt><dd>戶政司</dd></div>
    <div><dt>發布日期</dt><dd><time datetime="2026-10-08">115-10-08</time></dd></div>
    <div><dt>更新日期</dt><dd><time datetime="2026-10-14">115-10-14</time></dd></div>
  </dl>
</govtw-summary-list>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-summary-list';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `no-border` | `boolean` | `false` | 不顯示列與列之間的分隔線 |

### 子元素結構

| 元素 | 說明 |
|------|------|
| `<dl>` | 直接子元素 |
| `<dl> > <div>` | 每一列 |
| `<div> > <dt>` | 標題 |
| `<div> > <dd>`（第一個） | 內容 |
| `<div> > <dd>`（第二個，選用） | 動作連結，靠右對齊 |

元件以 light DOM 渲染：結構就是你寫的 HTML，頁面的 CSS 也會影響它。容器寬度不足 40rem 時，標題與內容改為上下排列。

## 事件

無事件。

## 無障礙

- **原生語意**：`<dl>`、`<dt>`、`<dd>` 讓螢幕閱讀器念出「標題、內容」的配對
- **變更連結要有唯一名稱**：用 `.govtw-visually-hidden` 加上欄位名稱，如「變更<span>姓名</span>」。否則螢幕閱讀器的連結清單會出現好幾個「變更」
- **日期**：用 `<time datetime>` 提供機器可讀的日期

## 設計指引

### 何時使用

- 申請送出前的確認頁（Check answers）
- 內容頁的發布單位、日期等資訊

### 何時不使用

- 多欄、需要比較的資料 → 用表格 Table（規劃中）
- 只有一兩項資訊 → 直接寫在段落中

### 設計建議

- **標題簡短**：2 到 6 個字
- **用原生 `<dl>`**：調查發現有網站用 `<div>` 模擬表格列出申辦資訊，螢幕閱讀器無法得知標題與內容的對應

### 相關元件

- [完成面板 Panel](/components/panel)
- [連結 Link](/components/link)
