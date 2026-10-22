# 文件站新增「網站重構示範」頁與首頁入口

## 問題分析

showcase 已部署到 https://govtw-showcase.vercel.app/ ，文件站沒有任何連結可以找到它。

## 需求定義

- 文件站新增說明頁，列出各示範網站、頁面類型與用到的元件，連到線上示範
- 首頁新增入口
- 側欄「資源」加入連結

## 實作計劃

1. 新增 `apps/docs/resources/showcase.md`
2. `config.mts` 側欄「資源」加入「網站重構示範」
3. `index.md` 在「參考」之前加「網站重構示範」區塊
4. `pnpm --filter docs build` 驗證

## 影響範圍

僅文件站：`apps/docs/resources/showcase.md`（新增）、`apps/docs/.vitepress/config.mts`、`apps/docs/index.md`

## 總結

- 完成：說明頁 `/resources/showcase`、側欄「資源 → 網站重構示範」、首頁「網站重構示範」區塊（位於「參考」之前）
- 變更檔案：`apps/docs/resources/showcase.md`（新增）、`apps/docs/.vitepress/config.mts`、`apps/docs/index.md`
- 驗證：`pnpm --filter docs build` 成功，產出 `resources/showcase.html`
- 後續建議：新增示範網站時，同步更新 `showcase.md` 的網站表格與首頁連結
