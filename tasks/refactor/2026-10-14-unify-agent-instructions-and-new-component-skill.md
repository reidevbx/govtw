# 統一 AI 指引檔與 new-component skill，修正 scaffolder 缺漏

## 問題分析

### 1. 指引檔有兩份副本

- `AGENTS.md` 與 `CLAUDE.md` 內容完全相同（`diff` 無差異），`AGENTS.md` 未 commit
- `.agents/skills/source-command-new-component/SKILL.md` 是 `.claude/commands/new-component.md` 的副本，只差 frontmatter 與一處 `CLAUDE.md` → `AGENTS.md`
- 兩份分開維護，改一份就會不一致

### 2. skill 內容過時

- 第 3 步要求手填 `preview .html`；2026-04-24 起 preview 已由 md 的 `<DemoBlock variant>` 自動生成
- 檢查清單「preview HTML 載入 `/tokens.css`」已不適用
- 驗證步驟缺 `pnpm lint`、`pnpm build:previews`
- 缺 CLAUDE.md 規範：元件只管自身樣式、component token 流程、44×44 觸控目標
- 缺 2026-10-14 調查得出的規則：送出／切換用 `<button>`、重要資訊不只放 `title`

### 3. scaffolder（`scripts/new-component.mjs`）缺漏

| 缺漏 | 位置 | 影響 |
|---|---|---|
| 不加 `vite.config.ts` entry | `main()` 沒有對應步驟 | build 不產出 `dist/govtw-<name>.js` |
| sidebar 英文名用 PascalCase | 第 444、454 行 | `date-input` 變「DateInput」；31 份待做任務中 19 個是複合詞 |
| 仍產生 `preview/<name>/default.html` | `writeNewFiles()` | 與 CLAUDE.md「scaffolder 不再手動產」不符 |
| layout 元件插進一般元件清單 | `updateSidebar()` | 需手動移到「佈局元件」群組 |

## 需求定義

- `AGENTS.md` → symlink 到 `CLAUDE.md`
- skill 唯一來源：`.claude/skills/new-component/SKILL.md`（由 command 改為 skill，加 `name` frontmatter）
- `.agents/skills/new-component` → symlink 到 `../../.claude/skills/new-component`
- 刪除 `.agents/skills/source-command-new-component/`
- scaffolder：
  - 自動在 `vite.config.ts` 的 `entry` 加入新元件
  - sidebar 英文名改為 Title Case 加空格（`date-input` → `Date Input`），並新增 `--en-name` 覆寫
  - 不再產生 preview HTML
  - `--type=layout` 插入「佈局元件」群組（新增 `<layout-start>` / `<layout-end>` marker）
- `check:components` 新增檢查：`vite.config.ts` 有 entry
- CLAUDE.md「新增元件步驟」同步更新

### 驗收標準

- `ls -l AGENTS.md` 顯示指向 `CLAUDE.md`
- 用測試名稱跑 scaffolder：vite entry、sidebar 英文名、群組位置正確，且不產生 preview HTML；測完還原
- `pnpm check:components`、`pnpm lint`、`pnpm build` 通過

## 實作計劃

- [x] 1. `AGENTS.md` 改為 symlink
- [x] 2. 搬移 command → skill，建立 `.agents` symlink，刪除舊副本
- [x] 3. 更新 skill 內容
- [x] 4. scaffolder：vite entry
- [x] 5. scaffolder：英文名空格 + `--en-name`
- [x] 6. scaffolder：移除 preview 產生
- [x] 7. scaffolder：layout 群組 marker
- [x] 8. `check:components` 加 vite entry 檢查
- [x] 9. 更新 CLAUDE.md「新增元件步驟」
- [x] 10. 用測試元件驗證後還原；跑 check / lint / build

## 影響範圍

- 新增：`.claude/skills/new-component/SKILL.md`、symlink `AGENTS.md`、`.agents/skills/new-component`
- 刪除：`.claude/commands/new-component.md`、`.agents/skills/source-command-new-component/`
- 修改：`scripts/new-component.mjs`、`scripts/check-components.mjs`、`scripts/paths.mjs`、`apps/docs/.vitepress/config.mts`（加 marker）、`CLAUDE.md`

## 總結

### 完成項目

- ✅ `AGENTS.md` → symlink 到 `CLAUDE.md`（替換前 `diff` 確認兩檔完全相同）
- ✅ skill 改放 `.claude/skills/new-component/SKILL.md`（`git mv`，保留歷史）；`.agents/skills/new-component` 為 symlink；舊副本已刪
- ✅ skill 內容：移除手寫 preview 步驟、補 token 流程與 lint、新增無障礙與文件檢查清單
- ✅ scaffolder：自動加 vite entry、英文名 Title Case 加空格（可用 `--en-name` 覆寫）、不再產 preview、layout 進「佈局元件」群組
- ✅ docs 範本改為 `<DemoBlock variant="default">` + `<template #code>`，與既有頁面一致
- ✅ `check:components` 新增 vite entry 檢查
- ✅ CLAUDE.md「新增元件步驟」同步，新增「AI 指引檔」段落
- ✅ 31 份 2026-10-14 元件任務移除已不需要的手動補救步驟；link-external 任務修正（`rel` 已自動補）
- ✅ 刪除過時 memory「scaffolder 已知缺漏」

### 驗證

- 用 `zz-test-item`（basic、複合詞）與 `zz-grid`（layout）實際跑 scaffolder：
  - vite entry 正確插入，`build:components` 產出兩個 `dist/govtw-zz-*.js`
  - sidebar 名稱為「測試項目 Zz Test Item」、「測試網格 Zz Grid」，後者在 `<layout-end>` 前
  - 未產生 preview；`build:previews` 從新範本生成 `default.html`；`check:components` 16 個全部完整
  - 測完刪除測試檔，並從備份還原 4 個被改動的檔案，`grep zz-` 無殘留
- 最終：`pnpm check:components` ✅ 14 個、`pnpm lint` 通過、`pnpm build` 通過

### 變更檔案

- `AGENTS.md` — 改為 symlink
- `.claude/commands/new-component.md` → `.claude/skills/new-component/SKILL.md` — 搬移並改寫
- `.agents/skills/new-component` — 新 symlink；刪除 `.agents/skills/source-command-new-component/`
- `scripts/new-component.mjs`、`scripts/check-components.mjs`、`scripts/paths.mjs`
- `apps/docs/.vitepress/config.mts` — 加 `<layout-start/end>` marker
- `CLAUDE.md`
- `tasks/features/2026-10-14-*.md` — 移除過時步驟

### 後續建議

- **確認 symlink 在其他工具可用**：Codex 等工具是否跟隨 symlink 讀取 `.agents/skills/`，尚未實測
- **`/new-component` 指令來源改變**：從 command 改為 skill，名稱不變；若有人用舊路徑引用，需更新
