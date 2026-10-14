# 手風琴 Accordion

## 概述

手風琴把一頁內容分成多段，每段只顯示標題，使用者點標題展開。適合常見問答、多段說明。參考 [GOV.UK Accordion](https://design-system.service.gov.uk/components/accordion/)。

由 `<govtw-accordion>`（容器）與多個 `<govtw-accordion-section>`（每一段）組成。容器上方有「全部展開／全部收合」按鈕。

## 互動範例

### 常見問答

<DemoBlock variant="default" direction="column">
  <govtw-accordion>
    <govtw-accordion-section heading="戶籍謄本可以線上申請嗎？">
      <p>可以。持自然人憑證到戶政線上申辦系統申請電子戶籍謄本。</p>
    </govtw-accordion-section>
    <govtw-accordion-section heading="委託他人申請要帶什麼？">
      <p>委託書、委託人身分證影本、受託人身分證正本。</p>
    </govtw-accordion-section>
    <govtw-accordion-section heading="申請後多久可以拿到？">
      <p>臨櫃申請當場核發；線上申請電子謄本可立即下載。</p>
    </govtw-accordion-section>
  </govtw-accordion>

  <template #code>

```html
<govtw-accordion>
  <govtw-accordion-section heading="戶籍謄本可以線上申請嗎？">
    <p>可以。持自然人憑證到戶政線上申辦系統申請電子戶籍謄本。</p>
  </govtw-accordion-section>
  <govtw-accordion-section heading="委託他人申請要帶什麼？">
    <p>委託書、委託人身分證影本、受託人身分證正本。</p>
  </govtw-accordion-section>
  <govtw-accordion-section heading="申請後多久可以拿到？">
    <p>臨櫃申請當場核發；線上申請電子謄本可立即下載。</p>
  </govtw-accordion-section>
</govtw-accordion>
```

  </template>
</DemoBlock>

### 用網址直接展開某一段

給 section 加 `id`，網址加上 `#id` 時該段自動展開。可用來分享單一問答。

```html
<govtw-accordion-section id="qa-delegate" heading="委託他人申請要帶什麼？">…</govtw-accordion-section>
<!-- https://example.gov.tw/faq#qa-delegate -->
```

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-accordion';
```

一次載入 `govtw-accordion` 與 `govtw-accordion-section` 兩個元件。

## 屬性

### govtw-accordion

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `heading-level` | `number` | `2` | 各段標題的層級（2–6） |

### govtw-accordion-section

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `heading` | `string` | `''` | 段落標題 |
| `open` | `boolean` | `false` | 是否展開 |
| `id` | `string` | — | 選用。網址 `#id` 相符時自動展開 |

## 事件

| 事件 | 觸發元素 | 說明 |
|------|----------|------|
| `govtw-accordion-toggle` | section | 使用者點標題展開或收合時觸發。讀取 section 的 `open` 取得狀態 |

## 無障礙

- **標題與按鈕**：每段標題是 `role="heading"`（層級由 `heading-level` 設定），內含原生 `<button>`
- **展開狀態**：按鈕以 `aria-expanded` 表示，`aria-controls` 指向內容。兩者在同一個 Shadow DOM 內，id 可正常參照
- **「展開／收合」文字**：視覺上顯示，但加了 `aria-hidden`，避免螢幕閱讀器重複念狀態
- **全部展開**：原生 `<button>`，以 `aria-expanded` 表示是否全部展開
- **瀏覽器搜尋**：收合的內容不保證能被頁內搜尋（Ctrl+F）找到。重要資訊不要只放在收合內容中

## 設計指引

### 何時使用

- 常見問答
- 使用者只需要其中幾段的長篇說明

### 何時不使用

- 只有一段要收合 → 用 [可展開說明 Details](/components/details)
- 使用者需要依序讀完所有內容 → 直接寫在頁面上
- 使用者需要在幾段之間切換比較 → 用 [頁籤 Tabs](/components/tabs)
- 巢狀分類：本元件不支援巢狀。調查發現有網站用三層巢狀手風琴放問答，請改成分類頁加問答頁

### 設計建議

- **標題寫成問題**：如「委託他人申請要帶什麼？」
- **內容簡短**：每段幾個段落以內

### 相關元件

- [可展開說明 Details](/components/details)
- [頁籤 Tabs](/components/tabs)
