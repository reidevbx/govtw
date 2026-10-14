# 分頁

協助使用者在多頁內容中導覽。參考 [GOV.UK Pagination](https://design-system.service.gov.uk/components/pagination/) 的兩種變體：

- **預設（numbered）**：適用搜尋結果、列表頁等同質性內容，包含頁碼、上一頁、下一頁
- **`block`**：適用線性閱讀內容（多頁指南、連續說明），垂直堆疊上一頁／下一頁，可附描述標題

## 互動範例

### 標準頁碼

提供總頁數 `total` 與當前頁 `current`，元件自動算出頁碼與 ellipsis（…）。

<DemoBlock variant="default">
  <govtw-pagination total="5" current="3" href-template="?page={n}"></govtw-pagination>

  <template #code>

```html
<govtw-pagination total="5" current="3" href-template="?page={n}"></govtw-pagination>
```

  </template>
</DemoBlock>

### 大量頁數含 ellipsis

當總頁數較多時，元件會在首頁、當前頁前後、末頁之間以 ellipsis 收合。

<DemoBlock variant="ellipsis">
  <govtw-pagination total="42" current="7" href-template="?page={n}"></govtw-pagination>

  <template #code>

```html
<govtw-pagination total="42" current="7" href-template="?page={n}"></govtw-pagination>
```

  </template>
</DemoBlock>

### 首頁／末頁

在首頁時不顯示「上一頁」，末頁時不顯示「下一頁」。

<DemoBlock variant="boundaries" direction="column" no-code>
  <div>
    <p style="margin: 0 0 0.5rem; color: var(--vp-c-text-2); font-size: 0.875rem;">當前為第 1 頁</p>
    <govtw-pagination total="10" current="1" href-template="?page={n}"></govtw-pagination>
  </div>
  <div style="margin-top: 1.5rem;">
    <p style="margin: 0 0 0.5rem; color: var(--vp-c-text-2); font-size: 0.875rem;">當前為第 10 頁</p>
    <govtw-pagination total="10" current="10" href-template="?page={n}"></govtw-pagination>
  </div>
</DemoBlock>

### Block 變體（線性內容）

線性閱讀內容如多頁指南，使用 `variant="block"` 並可附描述標題說明前後頁主題。

<DemoBlock variant="block">
  <govtw-pagination
    variant="block"
    prev-href="/guide/3"
    prev-label="如何申辦"
    next-href="/guide/5"
    next-label="繳交申請費"
  ></govtw-pagination>

  <template #code>

```html
<govtw-pagination
  variant="block"
  prev-href="/guide/3"
  prev-label="如何申辦"
  next-href="/guide/5"
  next-label="繳交申請費"
></govtw-pagination>
```

  </template>
</DemoBlock>

### 結果筆數與每頁筆數

需要顯示結果筆數或讓使用者選每頁筆數時，**不要放進分頁元件**，用一般段落與[下拉選單](/components/select)組合。每頁筆數改變時，回到第 1 頁。

<DemoBlock variant="page-size" direction="column">
  <form action="#" method="get">
    <govtw-stack space="4">
      <p>共 128 筆，第 2 / 13 頁</p>
      <govtw-cluster space="3" vertical-align="end">
        <govtw-select name="per-page" label="每頁筆數" value="10">
          <option value="10">10 筆</option>
          <option value="20">20 筆</option>
          <option value="50">50 筆</option>
        </govtw-select>
        <govtw-button type="submit" variant="secondary">套用</govtw-button>
      </govtw-cluster>
      <govtw-pagination total="13" current="2" href-template="?page={n}&per-page=10"></govtw-pagination>
    </govtw-stack>
  </form>

  <template #code>

```html
<form action="/news" method="get">
  <govtw-stack space="4">
    <p>共 128 筆，第 2 / 13 頁</p>
    <govtw-cluster space="3" vertical-align="end">
      <govtw-select name="per-page" label="每頁筆數" value="10">
        <option value="10">10 筆</option>
        <option value="20">20 筆</option>
        <option value="50">50 筆</option>
      </govtw-select>
      <govtw-button type="submit" variant="secondary">套用</govtw-button>
    </govtw-cluster>
    <govtw-pagination total="13" current="2" href-template="?page={n}&per-page=10"></govtw-pagination>
  </govtw-stack>
</form>
```

  </template>
</DemoBlock>

- **用送出按鈕**：選了每頁筆數不要自動重新載入頁面。選項改變就跳頁，鍵盤使用者用方向鍵瀏覽選項時會被打斷（WCAG 3.2.2）
- **筆數寫在分頁上方**：使用者先知道結果有多少，再決定要不要翻頁

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-pagination';
```

## 屬性

### 通用

| 屬性 | 型別 | 預設 | 說明 |
|---|---|---|---|
| `variant` | `'default' \| 'block'` | `'default'` | 變體 |
| `landmark-label` | `string` | `'頁數導覽'` | nav landmark 的 `aria-label` |

### `variant="default"`（numbered）

| 屬性 | 型別 | 預設 | 說明 |
|---|---|---|---|
| `total` | `number` | `0` | 總頁數，≤1 時不渲染 |
| `current` | `number` | `1` | 當前頁碼，1-based |
| `href-template` | `string` | — | URL 模板，含 `{n}` 佔位符（如 `?page={n}`）|

### `variant="block"`

| 屬性 | 型別 | 預設 | 說明 |
|---|---|---|---|
| `prev-href` | `string` | — | 上一頁 href，省略表示首頁 |
| `next-href` | `string` | — | 下一頁 href，省略表示末頁 |
| `prev-label` | `string` | — | 上一頁的描述標題 |
| `next-label` | `string` | — | 下一頁的描述標題 |

## 事件

無自訂事件。連結點擊由瀏覽器原生處理；SPA 框架的 router 會自動攔截 `<a href>` 並走 history API。

## 無障礙

- **Landmark**：根元素 `<nav>` 配 `aria-label`，多個分頁共存時建議自訂 `landmark-label`（如「搜尋結果頁數」「文章目錄頁數」）以利區分
- **當前頁**：以 `aria-current="page"` 標記，輔助科技會宣告「目前頁面」
- **頁碼語意**：每個頁碼連結附 `aria-label="第 N 頁"`，避免螢幕閱讀器只唸出數字
- **rel 提示**：上一頁／下一頁連結加 `rel="prev"` / `rel="next"`，協助瀏覽器與爬蟲理解導覽關係
- **觸控目標**：每個項目最小 44×44px，符合 WCAG 2.5.5 AAA
- **鍵盤**：所有連結皆可 Tab 聚焦；focus 狀態為黃底（`#fd0`）+ 黑色粗底線，與 `<govtw-link>` 一致
- **裝飾性圖示**：箭頭 SVG 加 `aria-hidden="true"` 與 `focusable="false"`，不被輔助科技讀出

## 設計指引

### 何時使用

- 搜尋結果或列表頁有多頁、需要隨機跳轉到任一頁時 → 使用 `default` 變體
- 線性閱讀內容（多頁指南、連續說明）需要前後翻頁時 → 使用 `block` 變體

### 何時不使用

- 單頁就能呈現所有內容時，不要硬切分頁
- 內容**極多**（數萬筆）時，分頁體驗差，改用篩選/搜尋/分組
- 即時更新的串流（如時間軸、訊息流），改用「載入更多」或無限滾動

### 設計建議

- 預設一頁顯示 10–20 筆，避免使用者迷失
- 避免無限滾動，分頁更利於可分享 URL 與書籤
- 篩選/排序變更時應重設回第 1 頁
- 更新瀏覽器 `<title>` 加入頁碼（如「搜尋結果（第 3 頁）」），方便輔助科技與分頁書籤辨識

### 相關元件

- [連結 Link](/components/link)：分頁建構於連結之上，互動樣式一致
