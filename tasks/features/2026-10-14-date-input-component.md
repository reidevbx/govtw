# 新增 日期輸入 Date Input 元件（`govtw-date-input`）

- **優先度**：P1
- **參考**：[GOV.UK Date Input](https://design-system.service.gov.uk/components/date-input/)
- **來源**：[元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)

## 問題分析

### 調查時看到的實例（2026-10-14）

- 內政部戶政司：https://www.ris.gov.tw/apply-idCardChange/app/aw070402/main — 年 `<input maxlength=3>` + 月、日 `<select>`
- 內政部：https://www.moi.gov.tw/News.aspx?n=4&sms=9009 — `<input type="date">` 但提示寫「民國年/月/日」
- 監理服務網：https://www.mvdis.gov.tw/m3-emv-trn/exm/query — 「例：民國78年7月2日，請填0780702」
- 數位發展部：https://moda.gov.tw/press/press-releases/372 — text input，placeholder「yyyy-mm-dd」

### 現況問題

- 民國年與西元年混用，同一機關也混用（bli 列表西元、內文民國）
- 原生 date picker 是西元年，卻提示輸入民國年（moi）
- label 對不到 id（mvdis `for="txtBirthday"` → `id="birthdayStr"`）
- 格式提示沒有用 `aria-describedby` 關聯

## 需求定義

- GOV.UK 式三欄：年、月、日，各為 `inputmode="numeric"` 的 text input
- 屬性 `calendar="roc"|"gregorian"`：決定年份欄是民國年（3 碼）或西元年（4 碼）
- 表單送出值統一為 ISO 格式 `YYYY-MM-DD`（民國年自動 +1911）
- 使用 `fieldset` + `legend`，hint 說明格式
- `error` 屬性，可標示哪一欄錯
- formAssociated + ElementInternals

### 無障礙

- WCAG 2.2 AA 為最低標準
- 每欄有可見 label（年／月／日）
- 錯誤時 `aria-invalid` 只加在出錯的欄位

### 待確認（動手前需決定）

1. 表單送出值用 ISO 西元日期，還是保留使用者輸入的民國年？建議 ISO
2. 是否需要日期區間（起日～迄日）變體，或交給 pattern 組合兩個元件

### 驗收標準

- `pnpm check:components` 全部通過
- `pnpm lint`、`pnpm build` 通過
- docs 頁含：概述 → 互動範例 → 狀態展示 → 使用方式 → 屬性表 → 無障礙 → 設計指引

## 實作計劃

- [ ] 決定「待確認」各項
- [ ] `pnpm new:component date-input --type=form --zh-name=日期輸入`
- [ ] 補 `packages/web-components/vite.config.ts` entry（scaffolder 已知缺漏）
- [ ] 修 sidebar 英文名空格：「日期輸入 Date Input」（scaffolder 已知缺漏）
- [ ] `packages/tokens/tokens.json` 新增 `--govtw-date-input-*` component token → `pnpm build:tokens`
- [ ] 實作 `govtw-date-input.ts`：屬性、樣式、render
- [ ] 寫 `apps/docs/components/date-input.md`，DemoBlock 加 `variant`
- [ ] `pnpm build` → `pnpm check:components` → `pnpm lint`
- [ ] 追加「## 總結」

## 影響範圍

- 新增：`packages/web-components/src/govtw-date-input.ts`、`apps/docs/components/date-input.md`
- 修改：`packages/tokens/tokens.json`、`packages/web-components/{index.ts,package.json,vite.config.ts}`、`apps/docs/.vitepress/config.mts`

## 相關任務

- `error-summary`
- `fieldset`
