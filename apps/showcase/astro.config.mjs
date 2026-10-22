import { defineConfig } from 'astro/config'

export default defineConfig({
  vite: {
    resolve: {
      // 與 apps/docs 一致：直接吃 web-components 的 TS 原始碼，不需先 build
      conditions: ['source'],
    },
  },
})
