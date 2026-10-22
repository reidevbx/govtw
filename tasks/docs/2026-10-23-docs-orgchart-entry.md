# 文件站首頁加入組織圖入口

## 問題分析

- 組織圖已部署到 https://govtw-orgchart.rei-devbx.workers.dev/ ，文件站首頁沒有入口。

## 需求定義

- 在首頁「網站重構示範」之後、「參考」之前加一段「中央政府首長組織圖」，格式同其他文字區塊。
- 說明資料日期與非官方示範。

## 實作計劃

- [x] `apps/docs/index.md` 新增區塊
- [x] `pnpm --filter docs build` 驗證

## 影響範圍

- `apps/docs/index.md`

## 總結

### 完成項目
- ✅ 首頁新增「中央政府首長組織圖」區塊，位於「網站重構示範」與「參考」之間
- ✅ `pnpm --filter docs build` 成功，輸出的 index.html 含組織圖連結

### 變更檔案
- `apps/docs/index.md`

### 後續建議
- 若之後綁自訂網域，記得更新首頁連結
