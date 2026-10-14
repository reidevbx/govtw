# 卡片 Card

## 概述

卡片用來並排呈現多個服務或主題入口，每張有標題連結、說明，可加圖片。參考來源是台灣政府網站調查；[GOV.UK](https://design-system.service.gov.uk/) 不提供此元件。

gov.tw、臺北市政府、高雄市政府首頁都用卡片排列服務入口。調查發現的問題：

- 說明文字只放在 `title` 屬性，觸控裝置與鍵盤使用者看不到
- 多張卡都有「更多」連結，螢幕閱讀器的連結清單出現一排「更多」
- 連到外部網域的卡片沒有提示

## 互動範例

### 卡片格

用 CSS Grid 排成卡片格，欄寬隨容器自動調整。

<DemoBlock variant="default" direction="column">
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); gap: 1rem;">
    <govtw-card heading="戶籍謄本申請" href="#">
      <p>線上申請電子戶籍謄本，免臨櫃。</p>
    </govtw-card>
    <govtw-card heading="綜合所得稅申報" href="#">
      <p>每年 5 月申報，可用自然人憑證或行動身分識別登入。</p>
    </govtw-card>
    <govtw-card heading="駕照換發" href="#">
      <p>駕照到期前可預約監理站換發。</p>
    </govtw-card>
  </div>

  <template #code>

```html
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); gap: 1rem;">
  <govtw-card heading="戶籍謄本申請" href="/services/household">
    <p>線上申請電子戶籍謄本，免臨櫃。</p>
  </govtw-card>
  <govtw-card heading="綜合所得稅申報" href="/services/tax">
    <p>每年 5 月申報，可用自然人憑證或行動身分識別登入。</p>
  </govtw-card>
  <govtw-card heading="駕照換發" href="/services/license">
    <p>駕照到期前可預約監理站換發。</p>
  </govtw-card>
</div>
```

  </template>
</DemoBlock>

### 含圖片與外部連結

<DemoBlock variant="image" direction="column">
  <div style="max-inline-size: 20rem;">
    <govtw-card heading="臺北市民服務" href="#" target="_blank">
      <img slot="image" src="/og-1200x630.jpg" alt="">
      <p>市政服務線上申辦入口。</p>
    </govtw-card>
  </div>

  <template #code>

```html
<govtw-card heading="臺北市民服務" href="https://example.gov.taipei/" target="_blank">
  <img slot="image" src="/images/taipei.jpg" alt="">
  <p>市政服務線上申辦入口。</p>
</govtw-card>
```

  </template>
</DemoBlock>

## 使用方式

```bash
pnpm add @gov-tw/web-components
```

```ts
import '@gov-tw/web-components/govtw-card';
```

## 屬性

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `heading` | `string` | `''` | 標題 |
| `href` | `string` | `''` | 連結網址 |
| `heading-level` | `number` | `3` | 標題層級（2–6），依頁面標題結構設定 |
| `target` | `string` | `''` | 設為 `_blank` 時另開新視窗，標題後加「（另開新視窗）」 |

### Slot

| Slot | 說明 |
|------|------|
| （預設） | 說明文字。不要放連結 |
| `image` | 圖片，放在卡片最上方 |

## 事件

無。

## 無障礙

- **只有標題是連結**：整張卡都能點，但不是把整張卡包在 `<a>` 裡。螢幕閱讀器只念標題，不會把整段說明念成連結文字
- **擴大點擊範圍**：標題連結的 `::after` 蓋住整張卡。因此說明內的連結會被蓋住點不到，說明內不要放連結
- **聚焦**：標題加黃底，整張卡加黑框，讓使用者看出點擊範圍
- **標題層級**：以 `role="heading"` 加 `aria-level` 輸出，用 `heading-level` 配合頁面結構
- **圖片**：卡片圖片多半是裝飾，設 `alt=""`。元件無法檢查作者寫的 `<img>`
- **另開新視窗**：`target="_blank"` 時標題後加可見的「（另開新視窗）」

## 設計指引

### 何時使用

- 首頁或分類頁並排呈現 3 個以上同層級的服務或主題入口

### 何時不使用

- 沒有圖片、只有標題與說明時：用一般的連結清單，掃讀比卡片格快
- 只有一兩個入口時：用一般連結或[按鈕](/components/button)

### 設計建議

- **說明寫在卡片上**：不要只放在 `title` 屬性
- **不要加「更多」連結**：整張卡已經可以點
- **標題寫服務名稱**：使用者用標題判斷要不要點開
- **同一組卡片高度一致**：CSS Grid 會自動拉齊同一列的高度

### 相關元件

- [Cluster](/components/cluster)
- [連結 Link](/components/link)
