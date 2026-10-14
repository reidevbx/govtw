# 標籤 Tag

## 概述

標籤顯示項目的狀態或分類，例如申辦案件的「審核中」「已完成」。參考 [GOV.UK Tag](https://design-system.service.gov.uk/components/tag/)。

標籤**純顯示，不可點擊**。可點的分類或熱門關鍵字請用 [連結 Link](/components/link)。

## 互動範例

### 基本用法

<DemoBlock variant="default">
  <govtw-tag>草稿</govtw-tag>

  <template #code>

```html
<govtw-tag>草稿</govtw-tag>
```

  </template>
</DemoBlock>

### 顏色

<DemoBlock variant="colors">
  <govtw-tag color="grey">未開始</govtw-tag>
  <govtw-tag color="blue">審核中</govtw-tag>
  <govtw-tag color="green">已完成</govtw-tag>
  <govtw-tag color="yellow">待補件</govtw-tag>
  <govtw-tag color="red">已退件</govtw-tag>

  <template #code>

```html
<govtw-tag color="grey">未開始</govtw-tag>
<govtw-tag color="blue">審核中</govtw-tag>
<govtw-tag color="green">已完成</govtw-tag>
<govtw-tag color="yellow">待補件</govtw-tag>
<govtw-tag color="red">已退件</govtw-tag>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-tag';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `color` | `'grey' \| 'blue' \| 'green' \| 'yellow' \| 'red'` | `'grey'` | 顏色 |

| Slot | 說明 |
|------|------|
| （default） | 標籤文字 |

## 事件

無事件。

## 無障礙

- **文字表達狀態**：顏色只是輔助。「已完成」「已退件」等文字本身要能表達意思，色盲使用者才能理解
- **對比**：每種顏色的文字與背景對比 ≥ 4.5:1
- **不可點擊**：標籤不是按鈕或連結，不會進入 Tab 順序
- **高對比模式**：保留透明 outline，在 Windows 高對比模式下仍看得到邊界

## 設計指引

### 何時使用

- 顯示案件、申請、任務的狀態
- 標示文章的分類

### 何時不使用

- 需要點擊篩選 → 用 [連結 Link](/components/link)
- 只是想強調某段文字 → 用粗體或 [補充說明 Inset Text](/components/inset-text)

### 設計建議

- **每種顏色對應固定意思**：同一網站內，綠色永遠表示完成、紅色永遠表示問題
- **不要每一項都加標籤**：調查發現有網站在新聞列表的 20 筆資料全部標「HOT」，標籤因此失去意義
- **文字簡短**：2 到 4 個字
- **中英文不要混用**：調查發現同一機關同時用「頭條」與「HOT」

### 相關元件

- [連結 Link](/components/link)
