# 佈局

佈局定義頁面的整體結構。本系統採用 **Layout Primitives**（佈局原語）的做法——提供一組可組合的佈局元件，每個元件只解決一個佈局問題，透過組合產生各種頁面結構。

這比傳統的格線系統（如 12 欄 grid）更靈活：元件根據容器寬度自適應，不依賴固定比例 class。

## 佈局元件總覽

| 元件 | 用途 | 概念 |
|------|------|------|
| [`<govtw-container>`](/components/container) | 頁面容器，限制最大寬度並置中 | 外框 |
| [`<govtw-stack>`](/components/stack) | 垂直堆疊，控制子元素間距 | 垂直流 |
| [`<govtw-sidebar>`](/components/sidebar) | 主內容 + 側邊欄，窄時自動堆疊 | 雙欄 → 單欄 |
| [`<govtw-cluster>`](/components/cluster) | 水平排列，自動換行 | 水平流 |

每個元件的互動範例、屬性表、無障礙說明，請見各自的元件頁。

## 共通規則

- **間距用 token 編號**：`space`、`padding` 填的是 `--govtw-space-{n}` 的 `n`，例如 `space="4"` 是 16px。只能用 `1`、`2`、`3`、`4`、`5`、`6`、`8`、`10`、`12`、`16`
- **不用 media query**：Sidebar 與 Cluster 依「容器」寬度換行，不是依螢幕寬度。同一段結構放在窄欄位裡也會自動適應
- **純佈局、無語意**：佈局元件不附加 role 或 ARIA。地標與標題仍由 `<main>`、`<aside>`、`<h1>` 等標籤提供

## 組合範例

佈局元件的威力在於組合。以下是常見的頁面結構。

### 標準服務頁面

```html
<govtw-container>
  <govtw-sidebar side-width="16rem">
    <main>
      <govtw-stack space="6">
        <h1>勞工保險線上申辦</h1>
        <p>本服務提供線上申辦各項勞工保險業務。</p>
        <govtw-fieldset>
          <h2 slot="legend">申請人資料</h2>
          <govtw-text-input label="姓名"></govtw-text-input>
          <govtw-text-input label="身分證字號" width="10"></govtw-text-input>
        </govtw-fieldset>
        <govtw-cluster space="3">
          <govtw-button>送出</govtw-button>
          <govtw-button variant="secondary">取消</govtw-button>
        </govtw-cluster>
      </govtw-stack>
    </main>
    <aside aria-label="相關連結">
      <govtw-stack space="4">
        <h2>相關連結</h2>
        <govtw-link href="#">常見問題</govtw-link>
        <govtw-link href="#">聯絡我們</govtw-link>
      </govtw-stack>
    </aside>
  </govtw-sidebar>
</govtw-container>
```

### 表單頁面（全寬單欄）

```html
<govtw-container max-width="720px">
  <main>
    <govtw-stack space="8">
      <h1>申請表單</h1>
      <govtw-fieldset>
        <h2 slot="legend">個人資料</h2>
        <govtw-text-input label="姓名"></govtw-text-input>
        <govtw-text-input label="電話" type="tel" width="10"></govtw-text-input>
        <govtw-text-input label="電子信箱" type="email"></govtw-text-input>
      </govtw-fieldset>
      <govtw-cluster space="3">
        <govtw-button>送出</govtw-button>
        <govtw-button variant="secondary">返回</govtw-button>
      </govtw-cluster>
    </govtw-stack>
  </main>
</govtw-container>
```

## 頁面寬度

頁面寬度由 Container 的 `max-width` 控制。建議值見 [頁面容器 Container › 建議寬度](/components/container#建議寬度)。

## 視覺隱藏

將內容從視覺上隱藏，但螢幕閱讀器仍可讀取。

```html
<!-- 跳至主要內容連結（鍵盤聚焦時顯示） -->
<a href="#main" class="govtw-visually-hidden-focusable">
  跳至主要內容
</a>
```

## 無障礙

- 使用語意化的 `<main>`、`<aside>`、`<nav>` 元素
- 提供「跳至主要內容」的隱藏連結，方便鍵盤使用者
- 佈局元件在窄空間自動堆疊，確保內容順序合理
- 內容閱讀順序應與 DOM 順序一致
- 避免用 CSS 改變視覺順序（如 `order`），會造成鍵盤導航混亂

## 設計指引

- **由外而內組合**：Container → Stack / Sidebar → 內容元件
- 表單頁面建議用較窄的 Container（`720px`），避免欄位過寬
- 文字內容控制每行約 60–75 個中文字元
- Stack 的 `space` 值由大到小：頁面區塊用 `8–12`，區塊內用 `4–6`，緊湊元素用 `2–3`
- Sidebar 放次要資訊；預設 `side="right"` 時主內容是第一個子元素，窄螢幕上先出現
