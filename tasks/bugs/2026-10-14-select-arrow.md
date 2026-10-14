# 修正 select 下拉箭頭貼齊右邊框

## 問題分析

使用者回報（截圖，2026-10-14）：`govtw-select` 的下拉箭頭貼在右邊框上。

`.select` 使用瀏覽器原生外觀，箭頭由作業系統繪製，不受 `padding` 控制；macOS 上箭頭緊貼右側邊框。

## 需求定義

- `.select` 設 `appearance: none` 關掉原生箭頭
- 外層包 `<span class="select-wrapper">`，以 `::after` 用 `currentColor` 邊框畫向下箭頭，與 accordion 箭頭同一畫法
- 右側內距加大，文字不會壓到箭頭
- 箭頭 `pointer-events: none`，點箭頭仍會打開選單
- 停用狀態箭頭一起變淡

### 驗收標準

- `tsc`、`pnpm lint` 通過
- 使用者在 `pnpm dev` 確認箭頭位置

## 實作計劃

- [x] 修改 `govtw-select.ts` 的樣式與 render
- [x] 驗證 → 追加「## 總結」

## 影響範圍

- 修改：`packages/web-components/src/govtw-select.ts`

## 總結

### 完成項目

- `.select` 設 `appearance: none`，原生箭頭不再顯示
- 外層 `select-wrapper` 以 `::after` 畫箭頭，距右邊框 `--govtw-spacing-3`
- 右側內距改為 `spacing-3 × 2 + 箭頭寬`，長選項文字不會壓到箭頭
- 箭頭 `pointer-events: none`；停用時 `opacity: 0.5`
- `tsc`、`pnpm build`、`check:components`、`lint` 通過

### 變更檔案

- `packages/web-components/src/govtw-select.ts`

### 後續建議

- 未逐一在 Safari、Firefox、Windows 確認箭頭位置
