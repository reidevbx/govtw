import { readFileSync, writeFileSync } from 'fs';

const tokens = JSON.parse(readFileSync(new URL('./tokens.json', import.meta.url), 'utf-8'));

const PREFIX = 'govtw';

// ── Reference resolution ──────────────────────────────
// Resolve "{primitive.color.blue.500}" → actual value from JSON tree

function getByPath(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

function resolveValue(value, root) {
  if (typeof value !== 'string') return value;
  const match = value.match(/^\{(.+)\}$/);
  if (!match) return value;
  const resolved = getByPath(root, match[1]);
  if (resolved === undefined) {
    console.warn(`⚠ Unresolved reference: ${value}`);
    return value;
  }
  // Recursively resolve chained references
  return resolveValue(resolved, root);
}

// Convert a reference path to a CSS var() name
// "{primitive.color.blue.500}" → "var(--govtw-primitive-color-blue-500)"
// "{semantic.font.sans}"       → "var(--govtw-font-sans)"
// Semantic layer vars are emitted without the "semantic" prefix,
// so we strip it when building the var() reference.
function refToCssVar(value) {
  if (typeof value !== 'string') return value;
  const match = value.match(/^\{(.+)\}$/);
  if (!match) return value; // literal value
  let path = match[1];
  // Semantic vars are output as --govtw-{rest} (no "semantic" segment)
  if (path.startsWith('semantic.')) {
    path = path.slice('semantic.'.length);
  }
  const varName = `--${PREFIX}-${path.replace(/\./g, '-')}`;
  return `var(${varName})`;
}

// ── Flatten helpers ──────────────────────────────

function flatten(obj, prefix, transform = v => v, lines = []) {
  for (const [key, value] of Object.entries(obj)) {
    const name = `${prefix}-${key}`;
    if (typeof value === 'object' && !Array.isArray(value)) {
      flatten(value, name, transform, lines);
    } else {
      lines.push(`  ${name}: ${transform(value)};`);
    }
  }
  return lines;
}

// ── Generate tokens.css ──────────────────────────────

const sections = [];

// 1. Primitive layer — raw values
const primitiveLines = flatten(tokens.primitive, `--${PREFIX}-primitive`);
sections.push(`/* ==========================================================================
 * Primitive tokens — 原始設計數值
 * ========================================================================== */
:root {
${primitiveLines.join('\n')}
}`);

// 2. Semantic layer — usage-based mappings (references to primitives)
const semanticLines = flatten(tokens.semantic, `--${PREFIX}`, refToCssVar);

// Add --govtw-space-{n} aliases for layout components (they use "space" not "spacing")
const spaceAliasLines = [];
for (const key of Object.keys(tokens.semantic.spacing)) {
  spaceAliasLines.push(`  --${PREFIX}-space-${key}: var(--${PREFIX}-spacing-${key});`);
}

sections.push(`
/* ==========================================================================
 * Semantic tokens — 語意層（以用途命名，引用原始層）
 * ========================================================================== */
:root {
${semanticLines.join('\n')}

  /* Space aliases — 佈局元件使用 --govtw-space-{n} */
${spaceAliasLines.join('\n')}
}`);

// 3. Component layer — per-component customization
const componentLines = flatten(tokens.component, `--${PREFIX}`, refToCssVar);
sections.push(`
/* ==========================================================================
 * Component tokens — 元件層（可覆蓋以客製化個別元件）
 * ========================================================================== */
:root {
${componentLines.join('\n')}
}`);

// 4. Themes — override semantic variables per theme
// Each key under tokens.themes becomes a [data-theme="<name>"] selector.
// The "dark" theme also gets a @media (prefers-color-scheme: dark) fallback.
if (tokens.themes) {
  for (const [themeName, themeOverrides] of Object.entries(tokens.themes)) {
    const themeLines = flatten(themeOverrides, `--${PREFIX}`, refToCssVar);
    const themeCss = themeLines.join('\n');
    const selector = `[data-theme="${themeName}"]`;

    if (themeName === 'dark') {
      // Dark theme: @media fallback（須 opt-in via data-theme="auto"）+ data attribute + .dark class（VitePress 慣例）
      // 注意：@media 預設不對 :root 生效，避免與 VitePress 等自帶 theme 控制（用 .dark class）的宿主衝突。
      // 想吃系統偏好的獨立頁面（如 preview HTML），html 加 data-theme="auto"。
      sections.push(`
/* ==========================================================================
 * Theme: dark — 深色主題
 *   觸發：[data-theme="dark"] / .dark 手動；data-theme="auto" + 系統偏好自動
 * ========================================================================== */
@media (prefers-color-scheme: dark) {
  :root[data-theme="auto"] {
${themeCss}
  }
}

${selector},
.dark {
${themeCss}
}`);
    } else {
      sections.push(`
/* ==========================================================================
 * Theme: ${themeName}
 * ========================================================================== */
${selector} {
${themeCss}
}`);
    }
  }
}

/** 把 { selector: { prop: value } } 轉成 CSS 規則（value 可含 token 引用） */
function selectorRules(map) {
  return Object.entries(map).map(([selector, props]) => {
    const propLines = Object.entries(props).map(([prop, value]) => `  ${prop}: ${refToCssVar(value)};`);
    return `${selector} {\n${propLines.join('\n')}\n}`;
  }).join('\n\n');
}

// 5. Typography — base element styles
if (tokens.typography?.elements) {
  sections.push(`
/* ==========================================================================
 * Typography — 基礎排版樣式（引用 Semantic token）
 * ========================================================================== */
${selectorRules(tokens.typography.elements)}`);
}

// 6. Utilities — 通用 class（如視覺隱藏）
if (tokens.utilities) {
  sections.push(`
/* ==========================================================================
 * Utilities — 通用 class
 * ========================================================================== */
${selectorRules(tokens.utilities)}`);
}

const css = sections.join('\n') + '\n';
writeFileSync(new URL('./tokens.css', import.meta.url), css);
const themeNames = tokens.themes ? Object.keys(tokens.themes).join(', ') : 'none';
console.log(`✓ tokens.css generated (primitive + semantic + component + themes: ${themeNames})`);

// ── Tailwind v4 CSS theme ──────────────────────────────

function generateTailwindTheme() {
  const lines = [];
  const semantic = tokens.semantic;

  // Colors
  lines.push('  /* Colors */');
  const colorEntries = flatten(semantic.color, `--${PREFIX}-color`, refToCssVar, []);
  for (const entry of colorEntries) {
    // Extract var name from "  --govtw-color-brand-primary: var(...);"
    const match = entry.match(/^\s+(--govtw-color-(.+)):/);
    if (match) {
      lines.push(`  --color-${PREFIX}-${match[2]}: var(${match[1]});`);
    }
  }

  // Spacing
  lines.push('');
  lines.push('  /* Spacing */');
  for (const key of Object.keys(semantic.spacing)) {
    lines.push(`  --spacing-${PREFIX}-${key}: var(--${PREFIX}-spacing-${key});`);
  }

  // Border radius
  lines.push('');
  lines.push('  /* Border radius */');
  for (const key of Object.keys(semantic.radius)) {
    lines.push(`  --radius-${PREFIX}-${key}: var(--${PREFIX}-radius-${key});`);
  }

  // Font family
  lines.push('');
  lines.push('  /* Font family */');
  lines.push(`  --font-${PREFIX}-sans: var(--${PREFIX}-font-sans);`);
  lines.push(`  --font-${PREFIX}-mono: var(--${PREFIX}-font-mono);`);

  return lines.join('\n');
}

const tailwindTheme = `/* gov.tw Design System — Tailwind v4 theme integration */
/* Usage: @import '@gov-tw/tokens/tailwind.css' in your CSS */

@import './tokens.css';

@theme {
${generateTailwindTheme()}
}
`;

writeFileSync(new URL('./tailwind.css', import.meta.url), tailwindTheme);
console.log('✓ tailwind.css generated');
