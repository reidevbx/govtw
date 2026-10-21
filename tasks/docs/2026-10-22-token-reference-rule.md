# 釐清 Token 引用規則

## 問題分析

CLAUDE.md 與 `foundations/architecture.md` 寫「Component 只引用 Semantic」，但 tokens.json 已有 15 個 component token 直接引用 Primitive（button、pagination、search、tag）。使用者確認的規則是：Primitive 不可直接使用，Component 可引用 Semantic 或 Primitive。

## 需求定義

文件改成實際規則；檢查程式碼是否違反「Primitive 不可直接使用」。

## 實作計劃

1. 搜尋 CSS 中的 `var(--govtw-primitive-*)`：元件 src、docs theme 皆無；只有 `foundations/colour.md` 色票展示（展示 primitive 本身，屬文件用途）
2. 更新 CLAUDE.md「三層結構」「引用規則」
3. 更新 `apps/docs/foundations/architecture.md` 三處

## 影響範圍

僅文件。

## 總結

- 完成：兩份文件改為「Primitive 不可直接使用；Component 可引用 Semantic 或 Primitive；Semantic 用於排版、文字、背景」
- 變更檔案：`CLAUDE.md`、`apps/docs/foundations/architecture.md`
- 後續建議：`search.button-color` 引用 `text.on-primary`（暗色變黑）但 `search.button-bg` 是固定 Primitive，暗色模式對比錯亂，待修
