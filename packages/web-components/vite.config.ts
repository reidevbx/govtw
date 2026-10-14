import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({ tsconfigPath: './tsconfig.build.json' }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'govtw-button': resolve(__dirname, 'src/govtw-button.ts'),
        'govtw-checkbox': resolve(__dirname, 'src/govtw-checkbox.ts'),
        'govtw-text-input': resolve(__dirname, 'src/govtw-text-input.ts'),
        'govtw-fieldset': resolve(__dirname, 'src/govtw-fieldset.ts'),
        'govtw-stack': resolve(__dirname, 'src/govtw-stack.ts'),
        'govtw-sidebar': resolve(__dirname, 'src/govtw-sidebar.ts'),
        'govtw-cluster': resolve(__dirname, 'src/govtw-cluster.ts'),
        'govtw-container': resolve(__dirname, 'src/govtw-container.ts'),
        'govtw-textarea': resolve(__dirname, 'src/govtw-textarea.ts'),
        'govtw-link': resolve(__dirname, 'src/govtw-link.ts'),
        'govtw-radio': resolve(__dirname, 'src/govtw-radio.ts'),
        'govtw-pagination': resolve(__dirname, 'src/govtw-pagination.ts'),
        'govtw-inset-text': resolve(__dirname, 'src/govtw-inset-text.ts'),
        'govtw-select': resolve(__dirname, 'src/govtw-select.ts'),
        'govtw-skip-link': resolve(__dirname, 'src/govtw-skip-link.ts'),
        'govtw-accesskey': resolve(__dirname, 'src/govtw-accesskey.ts'),
        'govtw-breadcrumbs': resolve(__dirname, 'src/govtw-breadcrumbs.ts'),
        'govtw-search': resolve(__dirname, 'src/govtw-search.ts'),
        'govtw-service-navigation': resolve(__dirname, 'src/govtw-service-navigation.ts'),
        'govtw-header': resolve(__dirname, 'src/govtw-header.ts'),
        'govtw-footer': resolve(__dirname, 'src/govtw-footer.ts'),
        'govtw-tag': resolve(__dirname, 'src/govtw-tag.ts'),
        'govtw-warning-text': resolve(__dirname, 'src/govtw-warning-text.ts'),
        'govtw-details': resolve(__dirname, 'src/govtw-details.ts'),
        'govtw-back-link': resolve(__dirname, 'src/govtw-back-link.ts'),
        'govtw-panel': resolve(__dirname, 'src/govtw-panel.ts'),
        'govtw-notification-banner': resolve(__dirname, 'src/govtw-notification-banner.ts'),
      },
      formats: ['es'],
    },
    outDir: 'dist',
    target: 'es2022',
    minify: false,
  },
})
