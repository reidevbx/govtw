# Link 連結

## 概述

連結用於導航至其他頁面或資源。參考 [GOV.UK Design System](https://design-system.service.gov.uk/styles/links/) 的設計，確保連結在所有狀態下都清晰可辨。

所有需要連結行為的地方都應使用 `<govtw-link>` 元件，無論是獨立連結或段落中的行內連結，皆可正確運作。

## 互動範例

試著操作下方連結：hover（滑鼠移入會加粗底線）、用 <kbd>Tab</kbd> 鍵聚焦（黃底黑字）。

<DemoBlock variant="default">
  <govtw-link href="#">前往申辦</govtw-link>
  <govtw-link href="#">查看更多資訊</govtw-link>
  <govtw-link href="#">下載表單</govtw-link>

  <template #code>

```html
<govtw-link href="#">前往申辦</govtw-link>
<govtw-link href="#">查看更多資訊</govtw-link>
<govtw-link href="#">下載表單</govtw-link>
```

  </template>
</DemoBlock>

### 段落中的連結

`<govtw-link>` 以 `display: inline` 呈現，可自然嵌入段落文字中，字體與行高繼承自父層。

<DemoBlock variant="paragraph">
  <p style="max-width: 36em; line-height: 1.6;">
    您可以至 <govtw-link href="#">線上申辦系統</govtw-link> 完成申請，
    或參閱 <govtw-link href="#">申請須知</govtw-link> 了解所需文件。
    如有疑問請 <govtw-link href="#">聯絡我們</govtw-link>。
  </p>

  <template #code>

```html
<p>
  您可以至 <govtw-link href="#">線上申辦系統</govtw-link> 完成申請，
  或參閱 <govtw-link href="#">申請須知</govtw-link> 了解所需文件。
  如有疑問請 <govtw-link href="#">聯絡我們</govtw-link>。
</p>
```

  </template>
</DemoBlock>

### 不顯示已造訪狀態

導覽連結等不需要顯示已造訪色彩的場景，加上 `no-visited` 屬性：

<DemoBlock variant="no-visited">
  <govtw-link href="#" no-visited>首頁</govtw-link>
  <govtw-link href="#" no-visited>關於我們</govtw-link>
  <govtw-link href="#" no-visited>聯絡方式</govtw-link>

  <template #code>

```html
<govtw-link href="#" no-visited>首頁</govtw-link>
<govtw-link href="#" no-visited>關於我們</govtw-link>
<govtw-link href="#" no-visited>聯絡方式</govtw-link>
```

  </template>
</DemoBlock>

### 無底線連結

預設不顯示底線，hover 與 focus/active 時才出現底線。適用於導覽列、頁尾連結等已有明確視覺區隔的場景。

<DemoBlock variant="no-underline">
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

`target="_blank"` 時，元件自動在連結文字後加上可見的「（另開新視窗）」，並補上 `rel="noopener noreferrer"`。不用自己寫。

<DemoBlock variant="new-tab">
  <govtw-link href="https://example.gov.tw" target="_blank">外部系統</govtw-link>

  <template #code>

```html
<govtw-link href="https://example.gov.tw" target="_blank">外部系統</govtw-link>
<!-- 顯示為：外部系統（另開新視窗） -->
```

  </template>
</DemoBlock>

## 互動狀態展示

連結的互動回饋參考 GOV.UK Design System 的設計手法，核心特色是 **focus 與 active 時以黃色背景搭配黑色粗底線**，確保使用者在任何背景色上都能清楚辨識連結狀態。

### 預設

底線 1px，連結色。

<DemoBlock no-code>
  <govtw-link href="#">前往申辦</govtw-link>
</DemoBlock>

### Hover（懸停）

底線加粗至 3px，顏色加深。即使色覺障礙使用者也能透過底線粗細變化感知互動。

<DemoBlock no-code>
  <span class="demo-state-label">預設</span>
  <govtw-link href="#">前往申辦</govtw-link>
  <span class="demo-state-label">→ Hover</span>
  <govtw-link href="#" id="demo-link-hover">前往申辦</govtw-link>
</DemoBlock>

### Active（按壓）與 Focus（聚焦）

Focus 背景色（`--govtw-focus-color`）填滿，文字變為 focus 文字色（`--govtw-focus-text`），底部 4px 粗線。Active 與 Focus 使用相同的雙色指標，參考 GOV.UK 的設計。Light mode 為黃底黑字，dark mode 為藍底白字。

<DemoBlock no-code>
  <span class="demo-state-label">預設</span>
  <govtw-link href="#">前往申辦</govtw-link>
  <span class="demo-state-label">→ Active / Focus</span>
  <govtw-link href="#" id="demo-link-focus">前往申辦</govtw-link>
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

  applyStyle('demo-link-hover', (a) => {
    a.style.color = 'var(--govtw-link-hover-color)'
    a.style.textDecorationThickness = 'var(--govtw-link-hover-underline-thickness)'
  })

  applyStyle('demo-link-focus', (a) => {
    a.style.outline = 'var(--govtw-focus-width) solid transparent'
    a.style.backgroundColor = 'var(--govtw-link-focus-bg)'
    a.style.color = 'var(--govtw-link-focus-color)'
    a.style.textDecoration = 'none'
    a.style.boxShadow = '0 -2px var(--govtw-link-focus-bg), 0 4px var(--govtw-link-focus-underline-color)'
  })
})
</script>

## 使用方式

```html
<!-- 獨立連結 -->
<govtw-link href="/apply">前往申辦</govtw-link>

<!-- 段落中的行內連結 -->
<p>
  請至 <govtw-link href="/apply">線上申辦系統</govtw-link> 完成申請。
</p>

<!-- 不顯示已造訪狀態 -->
<govtw-link href="#" no-visited>導覽連結</govtw-link>

<!-- 無底線（hover 時才出現） -->
<govtw-link href="#" no-underline>導覽連結</govtw-link>

<!-- 開新視窗：自動加「（另開新視窗）」 -->
<govtw-link href="https://example.gov.tw" target="_blank">外部連結</govtw-link>
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `href` | `string` | `''` | 連結目標 URL |
| `target` | `string` | `''` | 連結開啟方式（如 `_blank`） |
| `rel` | `string` | `''` | 連結關係（如 `noreferrer noopener`） |
| `no-visited` | `boolean` | `false` | 是否隱藏已造訪狀態 |
| `no-underline` | `boolean` | `false` | 預設不顯示底線，hover 與 focus/active 時才出現 |
| `no-new-window-text` | `boolean` | `false` | `target="_blank"` 時不自動加「（另開新視窗）」。只在連結周圍已有說明時使用 |

## 樣式 Token

連結元件使用以下 CSS 自訂屬性，可透過覆蓋 token 調整外觀：

| Token | 預設值 | 說明 |
|-------|--------|------|
| `--govtw-link-color` | `--govtw-color-link-default` | 預設連結色 |
| `--govtw-link-visited-color` | `--govtw-color-link-visited` | 已造訪色（紫） |
| `--govtw-link-hover-color` | `--govtw-color-text-primary` | 懸停色 |
| `--govtw-link-underline-thickness` | `1px` | 預設底線粗細 |
| `--govtw-link-underline-offset` | `0.25em` | 底線與文字距離 |
| `--govtw-link-hover-underline-thickness` | `3px` | 懸停底線粗細 |
| `--govtw-link-focus-bg` | `--govtw-focus-color` | Focus 背景色（light: `#fd0`，dark: `#0055FF`） |
| `--govtw-link-focus-color` | `--govtw-focus-text` | Focus 文字色（light: `#1A1A1A`，dark: `#FFFFFF`） |
| `--govtw-link-focus-underline-color` | `--govtw-focus-text` | Focus 底線色（light: `#1A1A1A`，dark: `#FFFFFF`） |

::: tip Focus 色彩隨主題自動適配
Focus 指標透過 `--govtw-focus-color` 和 `--govtw-focus-text` 兩個語意層 token 控制，dark mode 下自動切換為高飽和藍底白字，確保在任何背景色上都清晰可辨。
:::

## 樣式狀態

### 預設

- 文字色：`--govtw-link-color`
- 底線：1px，`text-decoration-skip-ink: none`

### Hover（懸停）

- 文字色加深至 `--govtw-link-hover-color`
- 底線加粗至 3px

### Active（按壓）與 Focus（聚焦）

Active 與 Focus 使用相同的雙色指標（GOV.UK `govuk-focused-text` 手法）：

- `outline: 3px solid transparent` — 高對比模式可見
- 背景色：`--govtw-focus-color`（light: `#fd0` 黃色，dark: `#0055FF` 藍色）
- 文字色：`--govtw-focus-text`（light: `#1A1A1A` 黑色，dark: `#FFFFFF` 白色）
- 移除底線，改為 `box-shadow` 實作 4px 底線
- 上方 2px 延伸，與 focus 背景融合

### Visited（已造訪）

- 文字色：`--govtw-link-visited-color`（紫色）
- 可用 `no-visited` 屬性關閉

## 無障礙

- 使用語意化的 `<a>` 元素
- 確保鍵盤可操作（Enter 觸發導航）
- Focus 狀態以黃底 + 黑色底線的雙色指標清晰標示，符合 WCAG 2.2 AA
- `outline: 3px solid transparent` 確保高對比模式下仍可見
- 底線預設開啟，不依賴色彩作為唯一的連結辨識方式
- 開新視窗的連結自動加上可見的「（另開新視窗）」，所有使用者都看得到，不只放在 `title`
- 色彩對比度符合 WCAG 2.2 AA 標準（至少 4.5:1）

## 設計指引

- 連結文字應描述目的地（如「查看申請進度」），避免使用「點擊這裡」
- 段落中的連結直接以 `<govtw-link>` 包裹文字即可，元件會自動繼承字體與行高
- 不建議在同一段落中放置過多連結
- 導覽用途的連結使用 `no-visited`，避免紫色造成視覺干擾
- 導覽列、頁尾等已有明確視覺區隔的連結可使用 `no-underline`，但需確保 hover 時底線仍會出現
- 開新視窗應有明確的文字提示，不僅依靠圖示
- 連結密集區域（如頁尾）確保各連結間有足夠間距
