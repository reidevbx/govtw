# Cluster 水平排列

## 概述

水平排列把子元素由左往右排成一列，寬度不足時自動換行。適用於按鈕群組、標籤列、一排連結。

換行由 CSS `flex-wrap` 處理，不需要 media query。佈局元件的整體概念見 [基礎 › 佈局](/foundations/layout)。

## 互動範例

### 按鈕群組

<DemoBlock variant="default" direction="column">
  <govtw-cluster space="3">
    <govtw-button>送出申請</govtw-button>
    <govtw-button variant="secondary">儲存草稿</govtw-button>
    <govtw-button variant="secondary">取消</govtw-button>
  </govtw-cluster>

  <template #code>

```html
<govtw-cluster space="3">
  <govtw-button>送出申請</govtw-button>
  <govtw-button variant="secondary">儲存草稿</govtw-button>
  <govtw-button variant="secondary">取消</govtw-button>
</govtw-cluster>
```

  </template>
</DemoBlock>

### 自動換行

縮小視窗寬度，項目會換到下一行，行與行之間也套用同一個 `space`。

<DemoBlock variant="wrap" direction="column">
  <govtw-cluster space="2">
    <govtw-link href="#">戶籍謄本</govtw-link>
    <govtw-link href="#">印鑑證明</govtw-link>
    <govtw-link href="#">身分證換發</govtw-link>
    <govtw-link href="#">護照申請</govtw-link>
    <govtw-link href="#">駕照換發</govtw-link>
    <govtw-link href="#">勞保投保</govtw-link>
    <govtw-link href="#">健保轉出</govtw-link>
    <govtw-link href="#">地價稅查詢</govtw-link>
  </govtw-cluster>

  <template #code>

```html
<govtw-cluster space="2">
  <govtw-link href="#">戶籍謄本</govtw-link>
  <govtw-link href="#">印鑑證明</govtw-link>
  <govtw-link href="#">身分證換發</govtw-link>
  <govtw-link href="#">護照申請</govtw-link>
  <govtw-link href="#">駕照換發</govtw-link>
  <govtw-link href="#">勞保投保</govtw-link>
  <govtw-link href="#">健保轉出</govtw-link>
  <govtw-link href="#">地價稅查詢</govtw-link>
</govtw-cluster>
```

  </template>
</DemoBlock>

### 兩端對齊

`align="space-between"` 把第一個項目推到最左、最後一個推到最右。常用於「上一步 / 下一步」。

<DemoBlock variant="space-between" direction="column">
  <govtw-cluster align="space-between">
    <govtw-button variant="secondary">上一步</govtw-button>
    <govtw-button>下一步</govtw-button>
  </govtw-cluster>

  <template #code>

```html
<govtw-cluster align="space-between">
  <govtw-button variant="secondary">上一步</govtw-button>
  <govtw-button>下一步</govtw-button>
</govtw-cluster>
```

  </template>
</DemoBlock>

### 對齊方式對照

<DemoBlock direction="column" no-code>
  <govtw-stack space="4">
    <govtw-cluster align="start">
      <govtw-button variant="secondary">start</govtw-button>
      <govtw-button variant="secondary">預設</govtw-button>
    </govtw-cluster>
    <govtw-cluster align="center">
      <govtw-button variant="secondary">center</govtw-button>
      <govtw-button variant="secondary">置中</govtw-button>
    </govtw-cluster>
    <govtw-cluster align="end">
      <govtw-button variant="secondary">end</govtw-button>
      <govtw-button variant="secondary">靠右</govtw-button>
    </govtw-cluster>
  </govtw-stack>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-cluster';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `space` | `number` | `3` | 子元素間距（水平與換行後的垂直方向），對應 `--govtw-space-{n}` token |
| `align` | `'start' \| 'center' \| 'end' \| 'space-between'` | `'start'` | 水平對齊 |
| `vertical-align` | `'start' \| 'center' \| 'end' \| 'baseline'` | `'center'` | 同一行內的垂直對齊 |

`space` 只能用 token 有定義的值：`1`、`2`、`3`、`4`、`5`、`6`、`8`、`10`、`12`、`16`。填其他值時間距會變成 0。

## 事件

無事件。

## 無障礙

- **語意**：純佈局元件，不附加 role 或 ARIA
- **閱讀順序**：換行後的視覺順序仍與 DOM 順序一致，由左到右、由上到下
- **一組連結請加語意**：導覽連結應放在 `<nav aria-label="...">` 裡，Cluster 只負責排列
- **觸控目標**：`space` 不要小於 `2`（8px），避免相鄰按鈕或連結誤觸

## 設計指引

### 何時使用

- 一組按鈕並排
- 標籤、一排相關連結
- 數量不固定、需要自動換行的水平項目

### 何時不使用

- 元素需要由上往下排列 → 用 [垂直堆疊 Stack](/components/stack)
- 需要固定欄寬的兩欄版面 → 用 [側邊欄佈局 Sidebar](/components/sidebar)

### 設計建議

- **主要按鈕放第一個**：依 GOV.UK 慣例，主要動作在左，次要動作在右
- **`space-between` 只用兩個項目**：三個以上時中間項目的位置不好預期
- **文字與圖示混排用 `baseline`**：讓不同字級的文字底線對齊

### 相關元件

- [按鈕 Button](/components/button)
- [垂直堆疊 Stack](/components/stack)
- [側邊欄佈局 Sidebar](/components/sidebar)
