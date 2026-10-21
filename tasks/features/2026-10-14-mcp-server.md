# 新增 MCP server（`@gov-tw/mcp`），部署到 Cloudflare Workers

- **優先度**：P1
- **參考**：[Cloudflare Agents — MCP servers](https://github.com/cloudflare/agents/blob/main/docs/agents/mcp-servers.md)

## 問題分析

### 現況

- 工程師用 AI 工具（Claude Code、Cursor）開發政府網站時，AI 不知道 govtw 元件的存在與用法
- AI 只能憑訓練資料猜，常見結果：改用 Bootstrap、自己寫 `<div>` 按鈕、tag 名稱寫錯
- repo 沒有機器可讀的元件規格：沒有 `custom-elements.json`，也沒有 `llms.txt`
- 元件規格散在三處：元件 `.ts`、`apps/docs/components/*.md`、`packages/tokens/tokens.json`

### 根因

- 文件只為人類閱讀設計，AI 工具沒有查詢入口

### 已確認

- 部署到 Cloudflare 沒有資料落地問題：MCP 只提供公開文件，不碰使用者資料（2026-10-14 使用者確認）

## 需求定義

### 預期結果

- 工程師在 AI 工具加一行設定，AI 就能查詢 govtw 元件、token、設計指引
- 文件更新後，MCP 內容自動同步，不需工程師升級

### Tool 清單

| Tool | 輸入 | 回傳 |
|---|---|---|
| `list_components` | 無 | 所有元件的 tag、中文名、一句用途 |
| `get_component` | `name` | 屬性、事件、slot、範例 HTML、無障礙說明、設計指引 |
| `get_tokens` | `category`（選填） | token 名稱與值，含 dark 主題 |
| `get_guide` | `topic` | foundations / principles / patterns / getting-started 內容 |
| `validate_html` | `html` | 錯誤清單：未知 tag、未知屬性、必填缺漏、非 govtw 的原生控制項 |

### 驗收標準

- `claude mcp add --transport http govtw <url>/mcp` 後，Claude Code 能呼叫全部 5 個 tool
- `get_component` 回傳內容與 docs 頁一致（由 build 產生，不手寫）
- `validate_html` 對 `<govtw-buton>` 回報未知 tag
- `pnpm build`、`pnpm lint` 通過
- 新增元件後重跑 `pnpm build`，MCP 資料自動包含新元件

## 實作計劃

### 階段 1：機器可讀資料

- [ ] `packages/web-components` 加 `@custom-elements-manifest/analyzer`，產生 `custom-elements.json`
- [ ] 新增 `scripts/build-mcp-data.mjs`：合併 manifest + md + tokens.json → `packages/mcp/data/*.json`
- [ ] 同一支腳本產生 `apps/docs/public/llms.txt`（元件索引）與 `llms-full.txt`（全文）
- [ ] 接進 `pnpm build`

### 階段 2：MCP server

- [ ] 新增 `packages/mcp`：`@modelcontextprotocol/server`、`agents`、`zod`
- [ ] `src/server.ts`：`createServer()` 註冊 5 個 tool，Cloudflare 與 npx 版共用
- [ ] `src/worker.ts`：`createMcpHandler(createServer)`
- [ ] `src/stdio.ts`：本機 npx 版入口（給不能連外的單位）
- [ ] `wrangler.jsonc` 設定，路徑 `/mcp`
- [ ] 本機用 `wrangler dev` + MCP Inspector 測試 5 個 tool

### 階段 3：部署與文件

- [ ] Cloudflare 設 Rate Limiting
- [ ] GitHub Actions：main 更新時 `wrangler deploy`
- [ ] docs 新增「AI 工具整合」頁：Claude Code / Cursor / VS Code 設定方式
- [ ] 追加「## 總結」

## 待確認

| # | 問題 | 預設建議 |
|---|---|---|
| 1 | 網域 | 先用 `*.workers.dev`，之後再接正式網域 |
| 2 | 文件站是否一起搬到 Cloudflare | 先不搬，MCP 單獨部署 |
| 3 | npx 版是否這次就做 | 做，`server.ts` 共用，額外成本 1 個入口檔 |
| 4 | Cloudflare 帳號 | 需使用者提供，或由使用者自己執行 `wrangler login` |

## 影響範圍

- 新增：`packages/mcp/`、`scripts/build-mcp-data.mjs`、`apps/docs/public/llms*.txt`、docs「AI 工具整合」頁、`.github/workflows/deploy-mcp.yml`
- 修改：根目錄 `package.json`（build 指令）、`packages/web-components/package.json`（analyzer）、`apps/docs/.vitepress/config.mts`（sidebar）

## 相關任務

- [元件缺口調查總表](./2026-10-14-component-gap-roadmap.md)：元件越完整，AI 越少自行拼湊
