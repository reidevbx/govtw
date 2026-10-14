# 文件站側欄元件分類

## 問題分析

側欄「元件」組有 41 個元件，依建立順序排列，沒有分類。使用者要找表單或導覽類元件時，只能逐一瀏覽。

## 需求定義

「元件」組拆成 5 個子分組（使用者已確認分組與名稱，2026-10-14）。「佈局元件」組不變。

| 分組 | key | 元件 |
|---|---|---|
| 表單與操作 | `form` | button、text-input、textarea、password-input、otp-input、date-input、select、checkbox、radio、fieldset、file-upload、captcha |
| 導覽 | `navigation` | link、back-link、breadcrumbs、pagination、search、service-navigation、side-navigation、contents-list |
| 內容呈現 | `content` | inset-text、warning-text、details、accordion、tabs、tag、table、summary-list、card、document-list、attachment |
| 訊息與狀態 | `feedback` | error-summary、notification-banner、panel、step-indicator |
| 頁面框架 | `page` | header、footer、skip-link、accesskey、page-tools、font-size-switcher |

- 元件網址 `/components/<name>` 不變
- scaffolder 新增 `--category=form|navigation|content|feedback|page`；`--type=layout` 時不需要，其餘必填
- 每個分組有自己的 marker：`// <form-start>` … `// <form-end>`

### 驗收標準

- 側欄 41 個元件連結都還在，各在正確分組
- `pnpm build`、`pnpm check:components`、`pnpm lint` 通過
- `pnpm new:component` 未給 `--category` 時報錯並列出選項

## 實作計劃

- [x] 改寫 `apps/docs/.vitepress/config.mts` 的元件區段
- [x] `scripts/new-component.mjs` 加 `--category`，依分類找 marker
- [x] 更新 CLAUDE.md 與 `.claude/skills/new-component/SKILL.md` 的用法
- [x] 驗證 → 追加「## 總結」

## 影響範圍

- 修改：`apps/docs/.vitepress/config.mts`、`scripts/new-component.mjs`、`CLAUDE.md`、`.claude/skills/new-component/SKILL.md`

## 總結

### 完成項目

- 側欄「元件」拆成 5 個子分組，每組有 `// <key-start>`／`// <key-end>` marker；連結數前後皆 46，網址不變
- scaffolder 新增 `--category`：
  - 沒給時報錯，並列出可選的分類
  - 給錯值時報錯，並列出可選的分類
  - `--type=layout` 不需要 `--category`；有給時會警告並忽略
- 已實測：用 `--category=feedback` 建立的測試元件插在「訊息與狀態」組的最後一項；測試檔已刪除，相關檔案已還原
- CLAUDE.md、`new-component` skill 補上分類表與用法

### 變更檔案

- `apps/docs/.vitepress/config.mts`
- `scripts/new-component.mjs`
- `CLAUDE.md`
- `.claude/skills/new-component/SKILL.md`

### 後續建議

- 巢狀分組在側欄的呈現，需在 `pnpm dev` 確認
- 之後可考慮新增元件總覽頁（`/components/`），用卡片依分類列出

### 後續調整（2026-10-14）

- 使用者要求分組不要做成可收合的下拉選單。移除 7 個巢狀分組（元件 5 組、模式 2 組）的 `collapsed` 設定；VitePress 沒有 `collapsed` 時，分組固定展開且不顯示收合箭頭
- 最上層的 9 個群組維持 `collapsed: false`（可收合、預設展開）
