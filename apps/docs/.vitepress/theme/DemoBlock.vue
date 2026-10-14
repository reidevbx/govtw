<template>
  <div class="demo-block-wrapper">
    <!-- Shadow DOM 隔離區：VitePress 樣式不會穿透進來 -->
    <div ref="hostRef" class="demo-block-preview" />
    <!-- 隱藏的 slot 渲染區，供 JS 讀取 HTML -->
    <div ref="sourceRef" style="display:none">
      <slot />
    </div>
    <div class="demo-block-actions">
      <a v-if="previewUrl" class="demo-block-toggle" :href="previewUrl" target="_blank" rel="noopener" title="在新分頁中預覽此範例">
        在新分頁預覽
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M7 1H11V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11 1L6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 7V10C9 10.5523 8.55228 11 8 11H2C1.44772 11 1 10.5523 1 10V4C1 3.44772 1.44772 3 2 3H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <template v-if="!noCode">
        <button class="demo-block-toggle" @click="open = !open">
          {{ open ? '隱藏原始碼' : '查看原始碼' }}
          <svg
            class="demo-block-arrow"
            :class="{ open }"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </template>
    </div>
    <div v-if="!noCode" v-show="open" class="demo-block-code">
      <slot name="code" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vitepress'

declare const __GOVTW_TOKENS_CSS__: string
const tokensCss: string = typeof __GOVTW_TOKENS_CSS__ !== 'undefined'
  ? __GOVTW_TOKENS_CSS__
  : ''

const props = defineProps({
  direction: {
    type: String,
    default: 'row',
  },
  noCode: {
    type: Boolean,
    default: false,
  },
  preview: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: '',
  },
})

const route = useRoute()

// preview prop 優先；否則從 route 推 /preview/<component>/<variant>.html
// 或 /preview/patterns/<pattern>/<variant>.html
const previewUrl = computed(() => {
  if (props.preview) return props.preview
  if (!props.variant) return ''
  const m = route.path.match(/\/(components|patterns)\/([^/]+?)(?:\.html)?\/?$/)
  if (!m) return ''
  return m[1] === 'patterns'
    ? `/preview/patterns/${m[2]}/${props.variant}.html`
    : `/preview/${m[2]}/${props.variant}.html`
})

const open = ref(false)
const hostRef = ref(null)
const sourceRef = ref(null)
let observer: MutationObserver | null = null

onMounted(async () => {
  await nextTick()

  const host = hostRef.value as HTMLElement | null
  const source = sourceRef.value as HTMLElement | null
  if (!host || !source) return

  const flexDir = props.direction === 'column' ? 'column' : 'row'
  const alignItems = props.direction === 'column' ? 'stretch' : 'center'

  const syncDarkMode = () => {
    const isDark = document.documentElement.classList.contains('dark')
    if (isDark) {
      host.setAttribute('data-theme', 'dark')
    } else {
      host.removeAttribute('data-theme')
    }
  }
  syncDarkMode()

  observer = new MutationObserver(syncDarkMode)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  const shadow = host.attachShadow({ mode: 'open' })

  const style = document.createElement('style')
  style.textContent = `
${tokensCss.replace(/:root/g, ':host').replace(/^(\[data-theme="[^"]+"\])/gm, ':host($1)')}

*, *::before, *::after { box-sizing: border-box; }
:host {
  display: block;
}
.demo-layout {
  display: flex;
  flex-direction: ${flexDir};
  flex-wrap: wrap;
  align-items: ${alignItems};
  gap: 12px;
  padding: 24px;
  font-family: var(--govtw-font-sans, system-ui, sans-serif);
  color: var(--govtw-color-text-primary, #1a1a1a);
}
.demo-state-label {
  font-size: 0.8rem;
  color: var(--govtw-color-text-secondary, #595959);
}
.color-swatch {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 260px;
}
.color-swatch__preview {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: var(--c);
  flex-shrink: 0;
}
.color-swatch__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.color-swatch__info code {
  font-family: var(--govtw-font-mono, monospace);
  font-size: 0.8rem;
}
.color-swatch__hex,
.color-swatch__desc {
  font-size: 0.75rem;
  color: var(--govtw-color-text-secondary, #595959);
}
.type-sample {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 0;
  border-bottom: 1px solid var(--govtw-color-border-default, #B0C4C5);
}
.type-sample:last-child {
  border-bottom: none;
}
.type-sample__label {
  font-size: 0.75rem;
  color: var(--govtw-color-text-secondary, #595959);
  font-family: var(--govtw-font-mono, monospace);
}
.type-sample__text {
  font-family: var(--govtw-font-sans, system-ui, sans-serif);
  color: var(--govtw-color-text-primary, #1a1a1a);
}
  `
  shadow.appendChild(style)

  const container = document.createElement('div')
  container.className = 'demo-layout'
  while (source.firstChild) {
    container.appendChild(source.firstChild)
  }
  shadow.appendChild(container)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.demo-block-wrapper {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
}

.demo-block-preview {
  min-height: 40px;
}

.demo-block-actions {
  display: flex;
  border-top: 1px solid var(--vp-c-divider);
  padding: 0;
}

.demo-block-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 1;
  padding: 8px;
  background: none;
  border: none;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.demo-block-toggle:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.demo-block-toggle + .demo-block-toggle {
  border-left: 1px solid var(--vp-c-divider);
}

.demo-block-arrow {
  transition: transform 0.2s;
}

.demo-block-arrow.open {
  transform: rotate(180deg);
}

.demo-block-code {
  border-top: 1px solid var(--vp-c-divider);
}

.demo-block-code :deep(div[class*='language-']) {
  margin: 0;
  border-radius: 0;
}
</style>
