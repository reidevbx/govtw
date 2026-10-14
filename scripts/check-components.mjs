#!/usr/bin/env node
/**
 * 稽核：檢查每個 govtw-* 元件是否擁有完整的周邊檔案與 config 登錄。
 *
 * 檢查項目（每個元件）：
 *   1. apps/docs/components/<name>.md 存在
 *   2. md 中每個 <DemoBlock variant="x"> 對應 apps/docs/public/preview/<name>/<x>.html
 *      （若 md 中完全沒有 variant，視同無 preview 需求）
 *   3. packages/web-components/src/index.ts 有對應的 export
 *   4. packages/web-components/package.json 有對應的 exports entry
 *   5. apps/docs/.vitepress/config.mts sidebar 元件區段有連結
 *   6. packages/web-components/vite.config.ts 有 build.lib.entry
 *
 * 回傳 exit code 0（全部通過）或 1（有缺漏）。
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { P } from './paths.mjs';

const SOURCE_RE = /^govtw-[a-z][a-z0-9-]*\.ts$/;
const VARIANT_RE = /<DemoBlock\b[^>]*\bvariant=(?:"([^"]*)"|'([^']*)')/g;

/** 掃出 md 中所有 <DemoBlock variant="x"> 的 variant 名稱。 */
function extractVariants(mdPath) {
  if (!existsSync(mdPath)) return [];
  const content = readFileSync(mdPath, 'utf-8');
  const variants = [];
  for (const m of content.matchAll(VARIANT_RE)) {
    variants.push(m[1] ?? m[2]);
  }
  return variants;
}

/** 一次性蒐集 docs 頁面 — 避免每元件重複 syscall。 */
function buildCaches() {
  const docs = new Set(
    readdirSync(P.docs.components)
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace(/\.md$/, ''))
  );
  return { docs };
}

const sourceFiles = readdirSync(P.wc.src)
  .filter(f => SOURCE_RE.test(f) && !f.endsWith('.test.ts'));

const { docs } = buildCaches();
const indexContent = readFileSync(P.wc.index, 'utf-8');
const pkgExports = JSON.parse(readFileSync(P.wc.pkg, 'utf-8')).exports ?? {};
const vpContent = readFileSync(P.docs.vpConfig, 'utf-8');
const viteContent = readFileSync(P.wc.viteConfig, 'utf-8');

const issues = [];

for (const file of sourceFiles) {
  const tag = file.replace(/\.ts$/, '');
  const name = tag.replace(/^govtw-/, '');
  const rowIssues = [];

  if (!docs.has(name)) {
    rowIssues.push(`缺 docs: apps/docs/components/${name}.md`);
  } else {
    const mdPath = resolve(P.docs.components, `${name}.md`);
    const variants = extractVariants(mdPath);
    for (const variant of variants) {
      const html = resolve(P.docs.preview, name, `${variant}.html`);
      if (!existsSync(html)) {
        rowIssues.push(`缺 preview HTML: public/preview/${name}/${variant}.html（執行 pnpm build:previews）`);
      }
    }
  }

  if (!indexContent.includes(`from './${tag}.js'`)) rowIssues.push(`index.ts 缺 export`);
  if (!pkgExports[`./${tag}`]) rowIssues.push(`package.json 缺 exports entry`);
  if (!vpContent.includes(`/components/${name}`)) rowIssues.push(`VitePress sidebar 缺 link`);
  if (!viteContent.includes(`'${tag}':`)) rowIssues.push(`vite.config.ts 缺 entry`);

  if (rowIssues.length > 0) issues.push({ tag, rowIssues });
}

if (issues.length === 0) {
  console.log(`✅ ${sourceFiles.length} 個元件全部完整。`);
  process.exit(0);
}

console.log(`❌ ${issues.length} / ${sourceFiles.length} 個元件有缺漏：\n`);
for (const { tag, rowIssues } of issues) {
  console.log(`  ${tag}`);
  for (const issue of rowIssues) console.log(`    - ${issue}`);
  console.log('');
}
process.exit(1);
