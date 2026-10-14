/**
 * 集中的路徑常數，供所有 scripts 共用。
 */

import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export const P = {
  wc: {
    src: resolve(ROOT, 'packages/web-components/src'),
    index: resolve(ROOT, 'packages/web-components/src/index.ts'),
    pkg: resolve(ROOT, 'packages/web-components/package.json'),
    viteConfig: resolve(ROOT, 'packages/web-components/vite.config.ts'),
    iife: resolve(ROOT, 'packages/web-components/dist/gov-tw.iife.js'),
  },
  docs: {
    components: resolve(ROOT, 'apps/docs/components'),
    preview: resolve(ROOT, 'apps/docs/public/preview'),
    public: resolve(ROOT, 'apps/docs/public'),
    vpConfig: resolve(ROOT, 'apps/docs/.vitepress/config.mts'),
  },
  tokens: {
    css: resolve(ROOT, 'packages/tokens/tokens.css'),
  },
};

/** 把絕對路徑縮短為 ROOT-相對路徑，用於輸出訊息時更簡潔。 */
export function rel(p) {
  return p.startsWith(ROOT + '/') ? p.slice(ROOT.length + 1) : p;
}
