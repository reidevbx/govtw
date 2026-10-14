# 補 4 個 Layout 元件的文件頁

## 問題分析

- `pnpm check:components` 回報 4 / 14 個元件不完整：`govtw-cluster`、`govtw-container`、`govtw-sidebar`、`govtw-stack`
- 缺漏項目都一樣：缺 `apps/docs/components/<name>.md`、VitePress sidebar 缺連結
- 程式碼、`index.ts` export、`package.json` exports、`vite.config.ts` entry 都已存在，不用改
- 這 4 個元件目前只在 `apps/docs/foundations/layout.md` 有說明，但該頁有 3 個問題：
  1. 屬性表型別寫錯：`space`、`padding`、`content-min` 實際是 `Number`，文件寫 `string`
  2. demo 用 `<div class="demo-block">` 直接放在 light DOM，沒用 `<DemoBlock>`，VitePress 樣式會污染元件
  3. 組合範例的 `<govtw-fieldset legend="...">` 是舊寫法，現行規範是 `slot="legend"`

## 需求定義

- 新增 4 個元件頁，結構依專案規範：概述 → 互動範例 → 使用方式 → 屬性表 → 事件 → 無障礙 → 設計指引
- demo 用 `<DemoBlock variant="...">`，由 `pnpm build:previews` 自動生 preview HTML
- demo 中的示意色塊只用 `--govtw-*` token（preview 頁沒有 `--vp-*` 變數）
- 屬性表依 `.ts` 原始碼，型別與預設值須一致
- sidebar 元件區段加 4 個連結
- `foundations/layout.md` 改為總覽頁：保留概念說明與組合範例，屬性細節改連到元件頁

### 驗收標準

- `pnpm check:components` 回 `✅ 14 個元件全部完整。`
- `pnpm build` 通過
- `pnpm lint` 通過

## 實作計劃

- [x] 1. 寫 `apps/docs/components/stack.md`
- [x] 2. 寫 `apps/docs/components/cluster.md`
- [x] 3. 寫 `apps/docs/components/container.md`
- [x] 4. 寫 `apps/docs/components/sidebar.md`
- [x] 5. `apps/docs/.vitepress/config.mts` sidebar 加 4 個連結
- [x] 6. 整理 `apps/docs/foundations/layout.md`：刪重複屬性表、修 fieldset 寫法、連到元件頁
- [x] 7. `pnpm build:previews` 生 preview HTML
- [x] 8. 跑 `pnpm check:components`、`pnpm lint`、`pnpm build` 驗證

## 影響範圍

- 新增：`apps/docs/components/{stack,cluster,container,sidebar}.md`
- 新增（自動生成）：`apps/docs/public/preview/{stack,cluster,container,sidebar}/*.html`
- 修改：`apps/docs/.vitepress/config.mts`、`apps/docs/foundations/layout.md`
- 不動：`packages/` 下任何檔案

## 總結

### 完成項目

- ✅ 4 個元件頁，共 10 個帶 `variant` 的 demo，另有 1 個 `no-code` 對照區塊
- ✅ sidebar 新增「佈局元件」群組，放在 `<components-start/end>` 標記之外，不影響 scaffolder 插入位置
- ✅ `layout.md` 改為總覽頁：刪除 4 份屬性表與 light DOM demo；fieldset 改用 `slot="legend"`；組合範例補上 `<main>`、`<aside aria-label>`
- ✅ 屬性表型別依原始碼修正：`space`、`padding`、`content-min` 為 `number`

### 驗證

- `pnpm check:components`：✅ 14 個元件全部完整
- `pnpm lint`：通過
- `pnpm build`：通過
- 未在瀏覽器檢查畫面，交由使用者執行 `pnpm dev` 確認

### 變更檔案

- `apps/docs/components/{stack,cluster,container,sidebar}.md` — 新增
- `apps/docs/public/preview/{stack,cluster,container,sidebar}/*.html` — `build:previews` 自動生成
- `apps/docs/.vitepress/config.mts` — 新增「佈局元件」sidebar 群組
- `apps/docs/foundations/layout.md` — 改為總覽頁

### 後續建議

- **Stack 的 margin 疊加**：`tokens.css` 給 `h1`–`h6`、`p` 預設 `margin-bottom`，會加在 `space` 之上。可考慮讓 Stack 把子元素 margin 歸零（需另開 refactor 任務，會改變元件行為）
- **`space` 沒有驗證**：填 token 不存在的值（如 `7`）時，間距靜默變成 0。可考慮在元件內 fallback 或在 dev 模式 console.warn
- **`check:components` 只檢查連結存在**：不檢查連結放在哪個 sidebar 群組
