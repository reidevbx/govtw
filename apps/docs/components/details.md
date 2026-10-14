# 可展開說明 Details

## 概述

可展開說明把「不是每個人都需要」的資訊收起來，使用者點摘要文字才展開。參考 [GOV.UK Details](https://design-system.service.gov.uk/components/details/)。

元件內部使用原生 `<details>` 與 `<summary>`，鍵盤操作、展開狀態的朗讀都由瀏覽器提供。

## 互動範例

### 基本用法

<DemoBlock variant="default" direction="column">
  <govtw-details summary="找不到身分證統一編號？">
    <p>身分證統一編號印在國民身分證正面，為 1 個英文字母加 9 個數字，例如 A123456789。</p>
  </govtw-details>

  <template #code>

```html
<govtw-details summary="找不到身分證統一編號？">
  <p>身分證統一編號印在國民身分證正面，為 1 個英文字母加 9 個數字，例如 A123456789。</p>
</govtw-details>
```

  </template>
</DemoBlock>

### 預設展開

<DemoBlock variant="open" direction="column">
  <govtw-details summary="姓名含特殊字元怎麼輸入？" open>
    <p>原住民族姓名可能含有 ʼ、é、ɨ、ʉ 等字元。請從下方複製後貼上：</p>
    <p>ʼ é ɨ ʉ ṟ ·</p>
  </govtw-details>

  <template #code>

```html
<govtw-details summary="姓名含特殊字元怎麼輸入？" open>
  <p>原住民族姓名可能含有 ʼ、é、ɨ、ʉ 等字元。請從下方複製後貼上：</p>
  <p>ʼ é ɨ ʉ ṟ ·</p>
</govtw-details>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-details';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `summary` | `string` | `''` | 摘要文字，點擊後展開 |
| `open` | `boolean` | `false` | 是否展開。使用者點擊時會同步更新 |

| Slot | 說明 |
|------|------|
| （default） | 展開後顯示的內容 |

## 事件

無自訂事件。展開狀態可讀取 `open` 屬性。

## 無障礙

- **原生元素**：使用 `<details>` / `<summary>`，不自造 `aria-expanded`。Enter 與空白鍵都能展開
- **展開狀態**：螢幕閱讀器會念出「已收合」「已展開」
- **聚焦樣式**：摘要文字聚焦時為黃色背景加黑色底線，與 [連結 Link](/components/link) 一致
- **瀏覽器搜尋**：Chrome 對原生 `<details>` 支援「頁內搜尋找到時自動展開」，但內容經 Shadow DOM slot 傳入時是否仍有效，尚未實測

## 設計指引

### 何時使用

- 少數使用者才需要的說明，如「找不到身分證字號？」
- 表單欄位旁的進階說明

### 何時不使用

- 多數使用者都需要的資訊 → 直接寫在頁面上
- 多段相關內容需要逐段展開 → 用手風琴 Accordion（規劃中）

### 設計建議

- **摘要寫成使用者會問的問題**：如「找不到身分證字號？」，不要寫「說明」「更多資訊」
- **內容簡短**：展開後超過幾個段落，考慮另開一頁
- **不要放重要警告**：收起來的內容很多人不會看

### 相關元件

- [補充說明 Inset Text](/components/inset-text)
