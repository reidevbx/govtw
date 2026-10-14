# 排版

排版是政府數位服務中最基本的視覺元素。良好的排版能提升閱讀性、建立資訊層級，並確保所有使用者（包含視覺障礙者）都能順利取得資訊。

本系統參考 [GOV.UK Design System](https://design-system.service.gov.uk/styles/type-scale/) 的排版架構，針對中文（CJK）排版特性進行調整。

## 字型

### 內文字型

```css
--govtw-font-family-base: 'Noto Sans TC', 'Microsoft JhengHei', system-ui,
  -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

以 Noto Sans TC 為首選，確保跨平台一致的中文顯示品質。fallback 依序為微軟正黑體、系統預設字型。

### 等寬字型

```css
--govtw-font-family-mono: 'Noto Sans Mono', 'SF Mono', Monaco,
  'Cascadia Code', Menlo, monospace;
```

用於程式碼區塊、技術文件中的 inline code。

## 字級對照表（Type Scale）

字級系統定義了所有排版樣式的基礎。每個字級對應明確的字體大小與行高，並在不同螢幕尺寸下調整以確保可讀性。

### 大螢幕（≥ 640px）

| Token | 大小 | 行高 | 對應用途 |
|-------|------|------|----------|
| `--govtw-font-size-4xl` | `2.25rem` (36px) | 1.2 | 頁面標題（h1） |
| `--govtw-font-size-3xl` | `1.875rem` (30px) | 1.3 | 大標題（h2） |
| `--govtw-font-size-2xl` | `1.5rem` (24px) | 1.4 | 標題（h3）、前導段落 |
| `--govtw-font-size-xl` | `1.25rem` (20px) | 1.4 | 小標題（h4） |
| `--govtw-font-size-lg` | `1.125rem` (18px) | 1.6 | 大段文字 |
| `--govtw-font-size-base` | `1rem` (16px) | 1.8 | 內文 |
| `--govtw-font-size-sm` | `0.875rem` (14px) | 1.6 | 次要文字、註解 |
| `--govtw-font-size-xs` | `0.75rem` (12px) | 1.5 | 輔助文字、標籤 |

### 小螢幕（< 640px）

為提升行動裝置上的可讀性，大字級會等比縮小，但**內文字級（16px）不縮小**，以符合無障礙最佳實務。

| Token | 大螢幕 | 小螢幕 | 說明 |
|-------|--------|--------|------|
| `--govtw-font-size-4xl` | 36px | 27px | 頁面標題縮小 |
| `--govtw-font-size-3xl` | 30px | 24px | 大標題縮小 |
| `--govtw-font-size-2xl` | 24px | 21px | 標題微調 |
| `--govtw-font-size-xl` | 20px | 19px | 小標題微調 |
| `--govtw-font-size-lg` | 18px | 18px | 不縮小 |
| `--govtw-font-size-base` | 16px | 16px | 不縮小 |
| `--govtw-font-size-sm` | 14px | 14px | 不縮小 |
| `--govtw-font-size-xs` | 12px | 12px | 不縮小 |

> **無障礙注意**：GOV.UK 於 2022 年後不再於小螢幕使用更小的內文字級，因為 14px 以下的字體大小對視覺障礙使用者造成困難。本系統遵循相同原則，內文字級在任何裝置上皆維持 16px。

## 字重

<DemoBlock direction="column" no-code>
  <div class="type-sample">
    <span class="type-sample__label">regular · 400</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-2xl); font-weight: var(--govtw-font-weight-regular);">一般內文使用 Regular 字重</div>
  </div>
  <div class="type-sample">
    <span class="type-sample__label">medium · 500</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-2xl); font-weight: var(--govtw-font-weight-medium);">強調文字使用 Medium 字重</div>
  </div>
  <div class="type-sample">
    <span class="type-sample__label">bold · 700</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-2xl); font-weight: var(--govtw-font-weight-bold);">標題使用 Bold 字重</div>
  </div>
</DemoBlock>

| Token | 值 | 用途 |
|-------|------|------|
| `--govtw-font-weight-regular` | `400` | 內文 |
| `--govtw-font-weight-medium` | `500` | 強調文字 |
| `--govtw-font-weight-bold` | `700` | 標題、重要資訊 |

## 標題

標題用於建立頁面的資訊層級。使用語意化的 HTML 標題標籤（`<h1>` 到 `<h6>`），`tokens.css` 已為每個標題元素定義預設的排版樣式。

### 標題展示

<DemoBlock direction="column" no-code>
  <div class="type-sample">
    <span class="type-sample__label">h1 · 36px · Bold</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-4xl); font-weight: var(--govtw-font-weight-bold); line-height: 1.2;">勞動部線上申辦服務</div>
  </div>
  <div class="type-sample">
    <span class="type-sample__label">h2 · 30px · Bold</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-3xl); font-weight: var(--govtw-font-weight-bold); line-height: 1.3;">申請表單</div>
  </div>
  <div class="type-sample">
    <span class="type-sample__label">h3 · 24px · Bold</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-2xl); font-weight: var(--govtw-font-weight-bold); line-height: 1.4;">個人資料</div>
  </div>
  <div class="type-sample">
    <span class="type-sample__label">h4 · 20px · Bold</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-xl); font-weight: var(--govtw-font-weight-bold); line-height: 1.4;">聯絡方式</div>
  </div>
  <div class="type-sample">
    <span class="type-sample__label">h5 · 18px · Bold</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-lg); font-weight: var(--govtw-font-weight-bold); line-height: 1.4;">注意事項</div>
  </div>
  <div class="type-sample">
    <span class="type-sample__label">h6 · 16px · Bold</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-base); font-weight: var(--govtw-font-weight-bold); line-height: 1.4;">附註說明</div>
  </div>
</DemoBlock>

### 標題層級對照

`tokens.css` 會為 `<h1>` 到 `<h6>` 元素直接套用對應的排版樣式，使用時不需額外加 class。

| 元素 | 預設字級 | 行高 | 字重 |
|------|---------|------|------|
| `<h1>` | 36px (`--govtw-font-size-4xl`) | 1.2 | 700 |
| `<h2>` | 30px (`--govtw-font-size-3xl`) | 1.3 | 700 |
| `<h3>` | 24px (`--govtw-font-size-2xl`) | 1.4 | 700 |
| `<h4>` | 20px (`--govtw-font-size-xl`) | 1.4 | 700 |
| `<h5>` | 18px (`--govtw-font-size-lg`) | 1.4 | 700 |
| `<h6>` | 16px (`--govtw-font-size-base`) | 1.4 | 700 |

### 用法

```html
<h1>勞動部線上申辦服務</h1>
<h2>服務項目</h2>
<h3>勞工保險</h3>
<h4>投保申請</h4>
<h5>注意事項</h5>
<h6>附註說明</h6>
```

### 標題書寫原則

- 使用語意化的 `<h1>` 至 `<h6>` 標籤，不可跳級
- 標題應簡潔明確，描述該區塊的內容
- 每個頁面只有一個 `<h1>`

## 段落

### 段落展示

<DemoBlock direction="column" no-code>
  <div class="type-sample">
    <span class="type-sample__label">body-l · 18px · 前導段落</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-lg); font-weight: var(--govtw-font-weight-regular); line-height: 1.6;">勞動部提供完整的線上申辦服務，協助勞工朋友便捷處理各項保險業務。</div>
  </div>
  <div class="type-sample">
    <span class="type-sample__label">body · 16px · 預設內文</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-base); font-weight: var(--govtw-font-weight-regular); line-height: 1.8;">本服務提供線上申辦各項勞工保險業務，包含投保、退保及給付申請。</div>
  </div>
  <div class="type-sample">
    <span class="type-sample__label">body-s · 14px · 小字內文</span>
    <div class="type-sample__text" style="font-size: var(--govtw-font-size-sm); font-weight: var(--govtw-font-weight-regular); line-height: 1.6;">最後更新日期：2025 年 1 月 15 日</div>
  </div>
</DemoBlock>

### 內文（Body）

預設內文字級為 16px，行高 1.8，適合中文閱讀。`tokens.css` 已為 `<body>` 和 `<p>` 設定基礎樣式。

```html
<p>本服務提供線上申辦各項勞工保險業務，包含投保、退保及給付申請。</p>
```

### 段落樣式參考

| 用途 | 字級 | 行高 | 說明 |
|------|------|------|------|
| 前導段落 | 18px | 1.6 | 頁面頂端摘要文字，每頁最多一次 |
| 預設內文 | 16px | 1.8 | `<p>` 預設樣式 |
| 小字內文 | 14px | 1.6 | 附註、版權聲明等次要資訊 |

## 連結

所有需要連結行為的地方都應使用 `<govtw-link>` 元件，確保連結在所有狀態下都有一致的互動回饋。詳細說明請參閱 [Link 連結元件](/components/link)。

### 預設樣式

連結預設為藍色加底線，讓使用者能清楚辨識可點擊的文字。

<DemoBlock>
  <govtw-link href="#">前往申辦</govtw-link>
  <govtw-link href="#">查看更多資訊</govtw-link>
  <govtw-link href="#">下載表單</govtw-link>

  <template #code>

```html
<govtw-link href="/apply">前往申辦</govtw-link>
<govtw-link href="/info">查看更多資訊</govtw-link>
<govtw-link href="/form">下載表單</govtw-link>
```

  </template>
</DemoBlock>

### 段落中的行內連結

`<govtw-link>` 以 `display: inline` 呈現，可自然嵌入段落文字中，字體與行高繼承自父層。

<DemoBlock>
  <p style="max-width: 36em; line-height: 1.8;">
    您可以至 <govtw-link href="#">線上申辦系統</govtw-link> 完成申請，
    或參閱 <govtw-link href="#">申請須知</govtw-link> 了解所需文件。
    如有疑問請 <govtw-link href="#">聯絡我們</govtw-link>。
  </p>

  <template #code>

```html
<p>
  您可以至 <govtw-link href="/apply">線上申辦系統</govtw-link> 完成申請，
  或參閱 <govtw-link href="/guide">申請須知</govtw-link> 了解所需文件。
  如有疑問請 <govtw-link href="/contact">聯絡我們</govtw-link>。
</p>
```

  </template>
</DemoBlock>

### 連結互動狀態

連結的互動回饋參考 GOV.UK Design System，核心特色是 **focus 與 active 時以雙色指標**（背景色 + 粗底線）確保在任何背景色上都清晰可辨。

| 狀態 | 樣式 |
|------|------|
| 預設 | 連結色（`--govtw-link-color`），底線 1px |
| 已造訪 | 紫色（`--govtw-link-visited-color`） |
| Hover | 底線加粗至 3px，文字色加深 |
| Focus / Active | 背景色（`--govtw-focus-color`），文字色（`--govtw-focus-text`），底部 4px 粗線 |

<DemoBlock no-code>
  <span class="demo-state-label">預設</span>
  <govtw-link href="#">前往申辦</govtw-link>
  <span class="demo-state-label">→ Hover</span>
  <govtw-link href="#" id="demo-typo-link-hover">前往申辦</govtw-link>
  <span class="demo-state-label">→ Focus / Active</span>
  <govtw-link href="#" id="demo-typo-link-focus">前往申辦</govtw-link>
</DemoBlock>

### 不顯示已造訪狀態

導覽連結等不需要顯示已造訪色彩的場景，加上 `no-visited` 屬性：

<DemoBlock>
  <govtw-link href="#" no-visited>首頁</govtw-link>
  <govtw-link href="#" no-visited>關於我們</govtw-link>
  <govtw-link href="#" no-visited>聯絡方式</govtw-link>

  <template #code>

```html
<govtw-link href="/" no-visited>首頁</govtw-link>
<govtw-link href="/about" no-visited>關於我們</govtw-link>
<govtw-link href="/contact" no-visited>聯絡方式</govtw-link>
```

  </template>
</DemoBlock>

### 無底線連結

預設不顯示底線，hover 與 focus/active 時才出現。適用於導覽列、頁尾等已有明確視覺區隔的場景。

<DemoBlock>
  <govtw-link href="#" no-underline>首頁</govtw-link>
  <govtw-link href="#" no-underline>服務項目</govtw-link>
  <govtw-link href="#" no-underline>聯絡我們</govtw-link>

  <template #code>

```html
<govtw-link href="/" no-underline>首頁</govtw-link>
<govtw-link href="/services" no-underline>服務項目</govtw-link>
<govtw-link href="/contact" no-underline>聯絡我們</govtw-link>
```

  </template>
</DemoBlock>

### 開新視窗的連結

當連結必須在新視窗開啟時，要有明確的文字提示。`<govtw-link>` 設定 `target="_blank"` 時會自動加上「（另開新視窗）」：

<DemoBlock>
  <govtw-link href="https://example.gov.tw" target="_blank">外部系統</govtw-link>

  <template #code>

```html
<govtw-link href="https://example.gov.tw" target="_blank">外部系統</govtw-link>
```

  </template>
</DemoBlock>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const findInShadowRoots = (id) => {
    const hosts = document.querySelectorAll('.demo-block-preview')
    for (const host of hosts) {
      const shadow = host.shadowRoot
      if (!shadow) continue
      const el = shadow.querySelector(`#${id}`)
      if (el) return el
    }
    return null
  }

  const applyStyle = (id, fn) => {
    const attempt = () => {
      const el = findInShadowRoots(id)
      if (!el) {
        requestAnimationFrame(attempt)
        return
      }
      const apply = () => {
        const anchor = el.shadowRoot?.querySelector('a')
        if (anchor) fn(anchor)
        else requestAnimationFrame(apply)
      }
      apply()
    }
    setTimeout(attempt, 100)
  }

  applyStyle('demo-typo-link-hover', (a) => {
    a.style.color = 'var(--govtw-link-hover-color)'
    a.style.textDecorationThickness = 'var(--govtw-link-hover-underline-thickness)'
  })

  applyStyle('demo-typo-link-focus', (a) => {
    a.style.outline = 'var(--govtw-focus-width) solid transparent'
    a.style.backgroundColor = 'var(--govtw-link-focus-bg)'
    a.style.color = 'var(--govtw-link-focus-color)'
    a.style.textDecoration = 'none'
    a.style.boxShadow = '0 -2px var(--govtw-link-focus-bg), 0 4px var(--govtw-link-focus-underline-color)'
  })
})
</script>

## 列表

### 項目符號列表

```html
<ul>
  <li>準備身分證正反面影本</li>
  <li>填寫申請書</li>
  <li>至櫃台繳件</li>
</ul>
```

### 編號列表

當項目有順序性時使用：

```html
<ol>
  <li>登入系統並選擇申辦項目。</li>
  <li>填寫申請表單並上傳文件。</li>
  <li>確認資料無誤後送出。</li>
</ol>
```

## CJK 排版注意事項

- **行高**：中文內文建議 `1.8`，標題建議 `1.2–1.4`
- **段落間距**：段落之間使用 `1rem` 以上的間距
- **標點符號**：使用全形標點（，。、；：）
- **中英混排**：中文與英文 / 數字之間建議加入半形空格
- **避頭尾**：行首不應出現句號、逗號等結尾標點；行尾不應出現開括號

## 使用方式

引用 `tokens.css` 後，`<h1>` 至 `<h6>`、`<body>`、`<p>` 等元素會自動套用設計系統的排版樣式，直接使用語意化 HTML 即可。

```html
<h1>頁面標題</h1>
<p>這是一段內文。</p>
```

若需要自訂樣式，可使用 CSS 自訂屬性：

```css
.my-heading {
  font-size: var(--govtw-font-size-3xl);
  font-weight: var(--govtw-font-weight-bold);
  line-height: 1.3;
}
```

## 無障礙

- 不使用 14px 以下的字級作為主要閱讀文字
- 行高至少 1.5 倍字體大小（中文內文建議 1.8）
- 確保文字與背景的色彩對比度至少 4.5:1（WCAG 2.2 AA）
- 使用 `rem` 而非 `px` 定義字級，讓使用者能透過瀏覽器設定調整文字大小
- 標題層級不跳級，維持正確的文件結構
- 粗體僅用於強調關鍵資訊，避免大量使用
