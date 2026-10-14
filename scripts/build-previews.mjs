#!/usr/bin/env node
/**
 * 從元件與模式 md 自動生成 preview HTML。
 *
 * 來源：apps/docs/components/<name>.md 中的 <DemoBlock variant="x" ...>...</DemoBlock>
 * 輸出：apps/docs/public/preview/<name>/<x>.html
 *
 * 來源：apps/docs/patterns/<name>.md（index.md 除外）
 * 輸出：apps/docs/public/preview/patterns/<name>/<x>.html
 *
 * 規則：
 *   1. 只處理有 `variant="..."` 的 DemoBlock；無 variant 則跳過（如狀態對照）
 *   2. 剝除 <template #code>...</template> 區塊（docs-only）
 *   3. direction="column" 映射為 flex-direction: column, align-items: stretch
 *      預設（row）映射為 flex-direction: row, align-items: center
 *   4. title 取該 md 的 H1（# Button 按鈕 → 「Button 按鈕」）
 *   5. 內容相同不覆寫，避免 mtime 無謂變動
 */

import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { P, rel } from './paths.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE = readFileSync(resolve(__dirname, 'preview-template.html'), 'utf-8');

/** 抓 <DemoBlock ...>...</DemoBlock>，不支援巢狀（專案內無此用法）。 */
const DEMO_BLOCK_RE = /<DemoBlock\b([^>]*)>([\s\S]*?)<\/DemoBlock>/g;

/** 抓屬性，支援雙引號與單引號。 */
function getAttr(attrs, name) {
  const m = attrs.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)')`));
  return m ? (m[1] ?? m[2]) : null;
}

/** 剝除 <template #code>...</template> 區塊；去掉頭尾空行但保留行首縮排。 */
function stripCodeTemplate(body) {
  return body
    .replace(/<template[^>]*#code[^>]*>[\s\S]*?<\/template>/g, '')
    .replace(/^(?:[ \t]*\n)+/, '')
    .replace(/(?:\n[ \t]*)+$/, '');
}

/** 讀 md 的 H1（# Xxx），沒有就用檔名。 */
function extractTitle(md, fallback) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}

/** 給定 md 內容，回傳 [{variant, direction, body}] 。 */
function extractDemos(md) {
  const demos = [];
  for (const match of md.matchAll(DEMO_BLOCK_RE)) {
    const [, attrs, inner] = match;
    const variant = getAttr(attrs, 'variant');
    if (!variant) continue;
    const direction = getAttr(attrs, 'direction') === 'column' ? 'column' : 'row';
    const body = stripCodeTemplate(inner);
    demos.push({ variant, direction, body });
  }
  return demos;
}

/**
 * 先找出所有非空行的共同前導空白並去除（dedent），再加入統一縮排。
 * 保留行內相對縮排關係（如巢狀 tag）。
 */
function reindent(text, spaces = 4) {
  const lines = text.split('\n');
  const leads = lines
    .filter(l => l.trim() !== '')
    .map(l => l.match(/^ */)[0].length);
  const common = leads.length ? Math.min(...leads) : 0;
  const pad = ' '.repeat(spaces);
  return lines
    .map(l => (l.trim() === '' ? '' : pad + l.slice(common)))
    .join('\n');
}

function render({ title, direction, body }) {
  const alignItems = direction === 'column' ? 'stretch' : 'center';
  return TEMPLATE
    .replace('{{title}}', title)
    .replace('{{direction}}', direction)
    .replace('{{alignItems}}', alignItems)
    .replace('{{body}}', reindent(body, 4));
}

function writeIfChanged(file, content) {
  if (existsSync(file) && readFileSync(file, 'utf-8') === content) {
    return false;
  }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  return true;
}

function main() {
  const cleanMode = process.argv.includes('--clean');
  if (cleanMode && existsSync(P.docs.preview)) {
    rmSync(P.docs.preview, { recursive: true, force: true });
  }

  const stats = { components: 0, patterns: 0, generated: 0, unchanged: 0 };
  const sources = [
    { dir: P.docs.components, outDir: P.docs.preview, key: 'components' },
    { dir: P.docs.patterns, outDir: resolve(P.docs.preview, 'patterns'), key: 'patterns' },
  ];

  for (const { dir, outDir, key } of sources) {
    if (!existsSync(dir)) continue;
    const mdFiles = readdirSync(dir)
      .filter(f => f.endsWith('.md') && f !== 'index.md')
      .sort();

    for (const mdFile of mdFiles) {
      const name = mdFile.replace(/\.md$/, '');
      const md = readFileSync(resolve(dir, mdFile), 'utf-8');
      const title = extractTitle(md, name);
      const demos = extractDemos(md);

      if (demos.length === 0) continue;
      stats[key] += 1;

      for (const demo of demos) {
        const out = resolve(outDir, name, `${demo.variant}.html`);
        const html = render({ title, direction: demo.direction, body: demo.body });
        const changed = writeIfChanged(out, html);
        if (changed) stats.generated += 1;
        else stats.unchanged += 1;
      }
    }
  }

  const total = stats.generated + stats.unchanged;
  console.log(
    `✅ ${stats.components} 個元件、${stats.patterns} 個模式｜${total} 個 preview HTML｜` +
    `${stats.generated} 生成/更新、${stats.unchanged} 未變`
  );
  console.log(`   輸出：${rel(P.docs.preview)}/`);
}

main();
