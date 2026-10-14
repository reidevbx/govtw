# 頁籤 Tabs

## 概述

頁籤把相關內容分成幾個區塊，一次只顯示一個。參考 [GOV.UK Tabs](https://design-system.service.gov.uk/components/tabs/)。

GOV.UK 的研究顯示，頁籤只適合「使用者需要在幾個區塊之間切換比較」的情況。多數內容直接依序寫在頁面上更好找。

## 互動範例

### 基本用法

每個 `<section>` 是一個頁籤，`data-label` 是頁籤名稱。用方向鍵左右切換。

<DemoBlock variant="default" direction="column">
  <govtw-tabs label="戶籍謄本申請說明">
    <section data-label="申請資格">
      <h3>申請資格</h3>
      <p>本人、戶長、利害關係人或受委託人可申請。</p>
    </section>
    <section data-label="應備文件">
      <h3>應備文件</h3>
      <p>國民身分證正本；委託他人申請須另附委託書及受託人身分證。</p>
    </section>
    <section data-label="規費">
      <h3>規費</h3>
      <p>每張新臺幣 15 元。</p>
    </section>
  </govtw-tabs>

  <template #code>

```html
<govtw-tabs label="戶籍謄本申請說明">
  <section data-label="申請資格">
    <h3>申請資格</h3>
    <p>本人、戶長、利害關係人或受委託人可申請。</p>
  </section>
  <section data-label="應備文件">
    <h3>應備文件</h3>
    <p>國民身分證正本；委託他人申請須另附委託書及受託人身分證。</p>
  </section>
  <section data-label="規費">
    <h3>規費</h3>
    <p>每張新臺幣 15 元。</p>
  </section>
</govtw-tabs>
```

  </template>
</DemoBlock>

### 窄容器：全部展開

容器寬度低於 40rem 時，不顯示頁籤，所有內容依序展開。每個 section 開頭的標題這時就是區塊標題，所以**每個 section 都要有自己的標題**。

<DemoBlock variant="narrow" direction="column">
  <div style="max-inline-size: 320px;">
    <govtw-tabs label="戶籍謄本申請說明">
      <section data-label="申請資格">
        <h3>申請資格</h3>
        <p>本人、戶長、利害關係人或受委託人可申請。</p>
      </section>
      <section data-label="規費">
        <h3>規費</h3>
        <p>每張新臺幣 15 元。</p>
      </section>
    </govtw-tabs>
  </div>

  <template #code>

```html
<div style="max-inline-size: 320px;">
  <govtw-tabs label="戶籍謄本申請說明">
    <section data-label="申請資格">…</section>
    <section data-label="規費">…</section>
  </govtw-tabs>
</div>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-tabs';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `label` | `string` | `''` | 頁籤群組的可讀名稱 |
| `mode` | `'tabs' \| 'list'` | `'tabs'` | 唯讀。依容器寬度自動切換，反映到屬性供 CSS 使用 |

| 子元素 | 說明 |
|--------|------|
| `<section data-label="名稱">` | 每個頁籤的內容。可自訂 `id`，未設定時自動產生 |

### 限制

- 元件在頁面解析完成後包裝一次。之後新增或移除 section，不會重新包裝
- 元件以 light DOM 渲染：頁籤按鈕與 section 都在頁面上，id 可互相參照

## 事件

無自訂事件。

## 無障礙

- **WAI-ARIA Tabs**：`role="tablist"`、`tab`、`tabpanel`，以 `aria-selected`、`aria-controls`、`aria-labelledby` 連結
- **鍵盤**：Tab 進入目前頁籤；左右方向鍵切換並立即顯示；Home／End 跳到第一個／最後一個；再按 Tab 進入內容
- **原生按鈕**：頁籤是 `<button>`。調查發現有網站的頁籤是 `<span onclick>` 包圖片，鍵盤完全無法操作
- **網址連結**：網址 `#id` 對應某個 section 時，該頁籤預設選中
- **窄容器**：改為全部展開時，移除 tab 相關 role，螢幕閱讀器看到的是一般區塊

## 設計指引

### 何時使用

- 使用者需要在幾個區塊之間來回切換，例如比較「個人」與「法人」的申請方式

### 何時不使用

- **篩選列表**：篩選要用核取方塊或選擇清單。調查發現有網站把可複選的篩選做成頁籤，語意錯誤
- 使用者需要依序閱讀所有內容 → 直接寫在頁面上
- 內容很長 → 拆成多個頁面

### 設計建議

- **頁籤名稱簡短**：2 到 6 個字
- **不超過 5 個頁籤**
- **每個 section 開頭放標題**：窄螢幕展開時，標題是區塊的分界

### 相關元件

- [可展開說明 Details](/components/details)
