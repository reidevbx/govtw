# 色彩

## 色彩系統

本系統的色彩以三層 design token 架構定義。所有元件透過 Component token 取色，Component token 引用 Semantic token，Semantic token 引用 Primitive token。

```
Primitive（原始色票）→ Semantic（語意用途）→ Component（元件客製）
```

主題切換只需覆寫 Semantic 層，所有元件自動生效。

---

## Primitive 色票

原始設計數值，**不直接在元件中使用**。前綴 `--govtw-primitive-color-`。

7 個色家族各 12 階，套用統一 OKLCH 曲線：

| 階 | L | C | 用途 |
|---|---|---|---|
| 1-2 | 0.985 / 0.965 | 0.005 / 0.015 | 極淺背景 |
| 3-4 | 0.93 / 0.875 | 0.035 / 0.060 | 淺底、淺邊框 |
| 5-6 | 0.79 / 0.69 | 0.090 / 0.115 | 標準邊框 |
| 7-8 | 0.58 / 0.48 | 0.135 / 0.145（峰）| 連結、按鈕 bg |
| 9-10 | 0.38 / 0.30 | 0.135 / 0.105 | 深強調 |
| 11-12 | 0.25 / 0.21 | 0.085 / 0.070 | 接近最深 |

色家族 hue：blue 240、teal 170、red 25、green 145、yellow 85、purple 300、neutral 240（chroma ≈ 0.005-0.008，淡 tint 灰）。

### Blue（hue 240）

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-blue-1)"><div class="color-swatch__preview" style="border: 1px solid #ccc"></div><div class="color-swatch__info"><code>blue-1</code><span class="color-swatch__desc">L 0.985</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-blue-2)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>blue-2</code><span class="color-swatch__desc">L 0.965</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-blue-3)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>blue-3</code><span class="color-swatch__desc">L 0.93</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-blue-4)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>blue-4</code><span class="color-swatch__desc">L 0.875</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-blue-5)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>blue-5</code><span class="color-swatch__desc">L 0.79</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-blue-6)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>blue-6</code><span class="color-swatch__desc">L 0.69</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-blue-7)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>blue-7</code><span class="color-swatch__desc">L 0.58 ← link</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-blue-8)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>blue-8</code><span class="color-swatch__desc">L 0.48 ← button</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-blue-9)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>blue-9</code><span class="color-swatch__desc">L 0.38</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-blue-10)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>blue-10</code><span class="color-swatch__desc">L 0.30</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-blue-11)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>blue-11</code><span class="color-swatch__desc">L 0.25</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-blue-12)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>blue-12</code><span class="color-swatch__desc">L 0.21 ← anchor</span></div></div>
</DemoBlock>

### Teal（hue 170）

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-1)"><div class="color-swatch__preview" style="border: 1px solid #ccc"></div><div class="color-swatch__info"><code>teal-1</code><span class="color-swatch__desc">L 0.985</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-2)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>teal-2</code><span class="color-swatch__desc">L 0.965</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-3)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>teal-3</code><span class="color-swatch__desc">L 0.93</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-4)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>teal-4</code><span class="color-swatch__desc">L 0.875</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-5)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>teal-5</code><span class="color-swatch__desc">L 0.79</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-6)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>teal-6</code><span class="color-swatch__desc">L 0.69</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-7)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>teal-7</code><span class="color-swatch__desc">L 0.58</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-8)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>teal-8</code><span class="color-swatch__desc">L 0.48 ← secondary</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-9)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>teal-9</code><span class="color-swatch__desc">L 0.38</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-10)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>teal-10</code><span class="color-swatch__desc">L 0.30</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-11)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>teal-11</code><span class="color-swatch__desc">L 0.25</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-teal-12)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>teal-12</code><span class="color-swatch__desc">L 0.21</span></div></div>
</DemoBlock>

### Red（hue 25）

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-red-1)"><div class="color-swatch__preview" style="border: 1px solid #ccc"></div><div class="color-swatch__info"><code>red-1</code><span class="color-swatch__desc">L 0.985</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-red-2)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>red-2</code><span class="color-swatch__desc">L 0.965</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-red-3)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>red-3</code><span class="color-swatch__desc">L 0.93</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-red-4)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>red-4</code><span class="color-swatch__desc">L 0.875</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-red-5)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>red-5</code><span class="color-swatch__desc">L 0.79</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-red-6)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>red-6</code><span class="color-swatch__desc">L 0.69</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-red-7)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>red-7</code><span class="color-swatch__desc">L 0.58</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-red-8)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>red-8</code><span class="color-swatch__desc">L 0.48 ← error</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-red-9)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>red-9</code><span class="color-swatch__desc">L 0.38</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-red-10)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>red-10</code><span class="color-swatch__desc">L 0.30</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-red-11)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>red-11</code><span class="color-swatch__desc">L 0.25</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-red-12)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>red-12</code><span class="color-swatch__desc">L 0.21</span></div></div>
</DemoBlock>

### Green（hue 145）

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-green-1)"><div class="color-swatch__preview" style="border: 1px solid #ccc"></div><div class="color-swatch__info"><code>green-1</code><span class="color-swatch__desc">L 0.985</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-green-2)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>green-2</code><span class="color-swatch__desc">L 0.965</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-green-3)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>green-3</code><span class="color-swatch__desc">L 0.93</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-green-4)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>green-4</code><span class="color-swatch__desc">L 0.875</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-green-5)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>green-5</code><span class="color-swatch__desc">L 0.79</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-green-6)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>green-6</code><span class="color-swatch__desc">L 0.69</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-green-7)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>green-7</code><span class="color-swatch__desc">L 0.58</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-green-8)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>green-8</code><span class="color-swatch__desc">L 0.48 ← success</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-green-9)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>green-9</code><span class="color-swatch__desc">L 0.38</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-green-10)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>green-10</code><span class="color-swatch__desc">L 0.30</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-green-11)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>green-11</code><span class="color-swatch__desc">L 0.25</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-green-12)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>green-12</code><span class="color-swatch__desc">L 0.21</span></div></div>
</DemoBlock>

### Yellow（hue 85）

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-yellow-1)"><div class="color-swatch__preview" style="border: 1px solid #ccc"></div><div class="color-swatch__info"><code>yellow-1</code><span class="color-swatch__desc">L 0.985</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-yellow-2)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>yellow-2</code><span class="color-swatch__desc">L 0.965</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-yellow-3)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>yellow-3</code><span class="color-swatch__desc">L 0.93</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-yellow-4)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>yellow-4</code><span class="color-swatch__desc">L 0.875</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-yellow-5)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>yellow-5</code><span class="color-swatch__desc">L 0.79</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-yellow-6)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>yellow-6</code><span class="color-swatch__desc">L 0.69</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-yellow-7)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>yellow-7</code><span class="color-swatch__desc">L 0.58</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-yellow-8)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>yellow-8</code><span class="color-swatch__desc">L 0.48 ← warning</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-yellow-9)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>yellow-9</code><span class="color-swatch__desc">L 0.38</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-yellow-10)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>yellow-10</code><span class="color-swatch__desc">L 0.30</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-yellow-11)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>yellow-11</code><span class="color-swatch__desc">L 0.25</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-yellow-12)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>yellow-12</code><span class="color-swatch__desc">L 0.21</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-yellow-focus)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>yellow-focus</code><span class="color-swatch__desc">#fd0 ← 特例 (focus)</span></div></div>
</DemoBlock>

### Purple（hue 300）

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-purple-1)"><div class="color-swatch__preview" style="border: 1px solid #ccc"></div><div class="color-swatch__info"><code>purple-1</code><span class="color-swatch__desc">L 0.985</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-purple-2)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>purple-2</code><span class="color-swatch__desc">L 0.965</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-purple-3)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>purple-3</code><span class="color-swatch__desc">L 0.93</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-purple-4)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>purple-4</code><span class="color-swatch__desc">L 0.875</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-purple-5)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>purple-5</code><span class="color-swatch__desc">L 0.79</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-purple-6)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>purple-6</code><span class="color-swatch__desc">L 0.69</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-purple-7)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>purple-7</code><span class="color-swatch__desc">L 0.58</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-purple-8)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>purple-8</code><span class="color-swatch__desc">L 0.48 ← visited</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-purple-9)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>purple-9</code><span class="color-swatch__desc">L 0.38</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-purple-10)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>purple-10</code><span class="color-swatch__desc">L 0.30</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-purple-11)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>purple-11</code><span class="color-swatch__desc">L 0.25</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-purple-12)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>purple-12</code><span class="color-swatch__desc">L 0.21</span></div></div>
</DemoBlock>

### Neutral（hue 240，極低 chroma）

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-neutral-1)"><div class="color-swatch__preview" style="border: 1px solid #ccc"></div><div class="color-swatch__info"><code>neutral-1</code><span class="color-swatch__desc">L 0.99 ← bg-canvas</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-neutral-2)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>neutral-2</code><span class="color-swatch__desc">L 0.97</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-neutral-3)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>neutral-3</code><span class="color-swatch__desc">L 0.94</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-neutral-4)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>neutral-4</code><span class="color-swatch__desc">L 0.88 ← divider</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-neutral-5)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>neutral-5</code><span class="color-swatch__desc">L 0.78</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-neutral-6)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>neutral-6</code><span class="color-swatch__desc">L 0.66</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-neutral-7)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>neutral-7</code><span class="color-swatch__desc">L 0.55 ← text-secondary</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-neutral-8)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>neutral-8</code><span class="color-swatch__desc">L 0.45</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-neutral-9)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>neutral-9</code><span class="color-swatch__desc">L 0.35</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-neutral-10)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>neutral-10</code><span class="color-swatch__desc">L 0.27</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-neutral-11)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>neutral-11</code><span class="color-swatch__desc">L 0.22</span></div></div>
  <div class="color-swatch" style="--c: var(--govtw-primitive-color-neutral-12)"><div class="color-swatch__preview"></div><div class="color-swatch__info"><code>neutral-12</code><span class="color-swatch__desc">L 0.18 ← text-primary</span></div></div>
</DemoBlock>

---

## Semantic 色彩

以用途命名，引用 Primitive 層。主題切換（如 dark mode）覆寫的就是這一層。

切換頁面的深色模式可以看到 Semantic 色彩隨主題自動變化。

### 品牌色

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-color-brand-primary)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-brand-primary</code>
      <span class="color-swatch__desc">主要品牌色</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-brand-secondary)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-brand-secondary</code>
      <span class="color-swatch__desc">輔助品牌色</span>
    </div>
  </div>
</DemoBlock>

### 文字色

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-color-text-primary)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-text-primary</code>
      <span class="color-swatch__desc">主要文字</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-text-secondary)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-text-secondary</code>
      <span class="color-swatch__desc">次要文字</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-text-on-primary)">
    <div class="color-swatch__preview" style="border: 1px solid #ccc"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-text-on-primary</code>
      <span class="color-swatch__desc">品牌色上的文字</span>
    </div>
  </div>
</DemoBlock>

### 背景色

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-color-bg-canvas)">
    <div class="color-swatch__preview" style="border: 1px solid #ccc"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-bg-canvas</code>
      <span class="color-swatch__desc">頁面背景</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-bg-surface)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-bg-surface</code>
      <span class="color-swatch__desc">區塊背景</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-bg-neutral)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-bg-neutral</code>
      <span class="color-swatch__desc">中性灰背景（如次要按鈕）</span>
    </div>
  </div>
</DemoBlock>

### 邊框色

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-color-border-default)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-border-default</code>
      <span class="color-swatch__desc">預設邊框</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-border-neutral)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-border-neutral</code>
      <span class="color-swatch__desc">中性灰邊框（如次要按鈕）</span>
    </div>
  </div>
</DemoBlock>

### 回饋色

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-color-feedback-error)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-feedback-error</code>
      <span class="color-swatch__desc">錯誤</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-feedback-success)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-feedback-success</code>
      <span class="color-swatch__desc">成功</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-feedback-warning)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-feedback-warning</code>
      <span class="color-swatch__desc">警告</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-feedback-info)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-feedback-info</code>
      <span class="color-swatch__desc">資訊</span>
    </div>
  </div>
</DemoBlock>

### 連結色

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-color-link-default)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-link-default</code>
      <span class="color-swatch__desc">預設連結</span>
    </div>
  </div>
  <div class="color-swatch" style="--c: var(--govtw-color-link-visited)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-color-link-visited</code>
      <span class="color-swatch__desc">已瀏覽連結</span>
    </div>
  </div>
</DemoBlock>

### Focus

<DemoBlock no-code>
  <div class="color-swatch" style="--c: var(--govtw-focus-color)">
    <div class="color-swatch__preview"></div>
    <div class="color-swatch__info">
      <code>--govtw-focus-color</code>
      <span class="color-swatch__desc">聚焦框色（黃色）</span>
    </div>
  </div>
</DemoBlock>

---

## 使用方式

元件內部使用 Component token，一般頁面使用 Semantic token：

```css
/* 一般頁面樣式 — 使用 Semantic token */
.my-element {
  color: var(--govtw-color-text-primary);
  background: var(--govtw-color-bg-surface);
  border: 1px solid var(--govtw-color-border-default);
}
```

### 客製品牌色（覆寫 Semantic token）

各機關只需覆寫 Semantic 層的品牌色，所有元件自動生效：

```css
@import '@gov-tw/tokens/tokens.css';

:root {
  --govtw-color-brand-primary: #0062B1;    /* 機關品牌主色 */
  --govtw-color-brand-secondary: #00A67E;  /* 機關品牌輔色 */
}
```

### 客製特定元件（覆寫 Component token）

需要細粒度調整時，覆寫單一 Component token，影響範圍只到該元件：

```css
:root {
  --govtw-button-primary-bg: #0062B1;
}
```

## 無障礙

- 所有文字與背景色的對比度至少符合 WCAG 2.2 AA 標準（4.5:1）
- 回饋色不僅依靠色彩傳達意義，需搭配圖示或文字
- Focus 色 `#fd0` 確保鍵盤導航時的高可見度
