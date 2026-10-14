# 步驟指示 Step Indicator

## 概述

步驟指示告訴使用者目前在多步驟流程的第幾步、還剩幾步。參考來源是台灣政府網站調查。

[GOV.UK](https://design-system.service.gov.uk/patterns/question-pages/) 不做步驟條，只在頁面標題上方寫「第 2 步，共 4 步」。台灣的申辦服務普遍有步驟條，但做法不一：監理服務網用排版表格加箭頭圖片，戶政司用 fieldset 加編號文字，兩者都沒有標示目前步驟的語意，目前步驟只靠顏色區分。

## 互動範例

<DemoBlock variant="default" direction="column">
  <govtw-step-indicator current="2">
    <ol>
      <li>填寫資料</li>
      <li>上傳文件</li>
      <li>確認內容</li>
      <li>完成送出</li>
    </ol>
  </govtw-step-indicator>

  <template #code>

```html
<govtw-step-indicator current="2">
  <ol>
    <li>填寫資料</li>
    <li>上傳文件</li>
    <li>確認內容</li>
    <li>完成送出</li>
  </ol>
</govtw-step-indicator>
```

  </template>
</DemoBlock>

### 窄螢幕

容器寬度 40rem 以下時，只顯示「第 x 步，共 n 步」。

<DemoBlock variant="narrow" direction="column">
  <div style="max-inline-size: 20rem;">
    <govtw-step-indicator current="3">
      <ol>
        <li>填寫資料</li>
        <li>上傳文件</li>
        <li>確認內容</li>
        <li>完成送出</li>
      </ol>
    </govtw-step-indicator>
  </div>

  <template #code>

```html
<div style="max-inline-size: 20rem;">
  <govtw-step-indicator current="3">
    <ol>
      <li>填寫資料</li>
      <li>上傳文件</li>
      <li>確認內容</li>
      <li>完成送出</li>
    </ol>
  </govtw-step-indicator>
</div>
```

  </template>
</DemoBlock>

## 狀態展示

每一步的三種狀態不只用顏色區分：

| 狀態 | 圓圈 | 文字 | 螢幕閱讀器 |
|------|------|------|------------|
| 已完成 | 實心 | 一般 | 念「（已完成）」 |
| 目前 | 粗框 | 粗體 | `aria-current="step"`，念法依螢幕閱讀器而定 |
| 未到 | 細框 | 次要文字色 | — |

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-step-indicator';
```

元件放在頁面標題 `<h1>` 上方。每一頁更新 `current`。

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `current` | `number` | `1` | 目前第幾步，從 1 開始 |

總步數由 `<ol>` 內 `<li>` 的數量決定，不另外設定，避免兩者不一致。

## 事件

無。

## 無障礙

- **有序清單**：步驟用 `<ol>`，螢幕閱讀器會念出「清單，4 個項目」。清單加 `role="list"`，因為 Safari 會移除 `list-style: none` 清單的清單語意
- **目前步驟**：加 `aria-current="step"`
- **已完成步驟**：加視覺隱藏文字「（已完成）」
- **摘要文字**：「第 2 步，共 4 步」寬螢幕時只給螢幕閱讀器，窄螢幕時顯示
- **不可點擊**：步驟只顯示，不是連結。使用者回到前一步用[返回連結](/components/back-link)
- **對比**：未到步驟的圓框與文字使用次要文字色，對背景淺色 4.71:1、深色 6.05:1；已完成的實心圓內數字淺色 9.21:1、深色 6.88:1

## 設計指引

::: warning 先試著不用步驟條
GOV.UK 不建議同時列出所有步驟的進度條：使用者常沒注意到它、佔空間，在小螢幕上也不好用。建議先不用進度指示，必要時再用「第 3 題，共 9 題」文字。詳見[多步驟表單](/patterns/multi-step-form)模式。
:::

### 何時使用

- 4 步以上、步驟固定且各有明確名稱的申辦流程，而且使用者研究顯示有幫助

### 何時不使用

- 3 步以下的流程：直接在標題上方寫「第 1 步，共 2 步」即可
- 步驟會依使用者回答而改變的流程：總步數不固定時，步驟條會給出錯誤的預期

### 設計建議

- **步驟名稱簡短**：4 到 6 個字，如「填寫資料」「上傳文件」
- **步驟數控制在 6 步以內**：太多步會在寬螢幕換行
- **最後一步是確認頁**：讓使用者送出前檢查所有內容，可搭配[摘要清單](/components/summary-list)

### 相關模式

- [多步驟表單](/patterns/multi-step-form)

### 相關元件

- [返回連結 Back Link](/components/back-link)
- [摘要清單 Summary List](/components/summary-list)
- [完成面板 Panel](/components/panel)
