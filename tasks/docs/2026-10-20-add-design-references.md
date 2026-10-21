# 文件站列入外部參考

## 問題分析

- 文件站與 README 目前只提到 [GOV.UK Design System](https://design-system.service.gov.uk/)，沒有集中列出其他參考來源
- 使用者要求把 [U.S. Web Design System](https://designsystem.digital.gov/)、[Web Awesome](https://webawesome.com/) 與 [New York State Design System](https://designsystem.ny.gov/) 列入網站參考

## 需求定義

- 文件站有一頁「參考」，列出 GOV.UK、USWDS、NYSDS、Web Awesome，並說明各自參考什麼
- 側欄「資源」可連到該頁
- README 同步列出這些來源
- 首頁可見簡短參考清單

### 驗收標準

- 文件站側欄「資源」有「參考」連結，頁面含上述三個外部連結
- README 開頭不再只列 GOV.UK

## 實作計劃

- [x] 新增 `apps/docs/resources/references.md`
- [x] 側欄加入「參考」
- [x] 首頁補簡短參考清單
- [x] 更新 README
- [x] 追加「## 總結」

## 總結

### 完成項目

- ✅ 文件站新增「參考」頁，列出 GOV.UK、USWDS、NYSDS、Web Awesome
- ✅ 側欄「資源」與首頁可連到該頁
- ✅ README 同步列入這些來源

### 變更檔案

- `apps/docs/resources/references.md` — 新增參考頁
- `apps/docs/.vitepress/config.mts` — 側欄加入「參考」
- `apps/docs/index.md` — 首頁補參考清單
- `README.md` — 開頭參考來源補 USWDS 與 Web Awesome

### 後續建議

- 元件或模式若實際借鏡 USWDS / Web Awesome 的具體做法，再在該頁的「參考來源」補上連結，避免只在總覽出現

## 影響範圍

- 新增：`apps/docs/resources/references.md`
- 修改：`apps/docs/.vitepress/config.mts`、`apps/docs/index.md`、`README.md`
