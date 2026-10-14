import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { adoptStyles, takeChildElements, whenParsed } from './internal/light-dom.js';

let idCounter = 0;

/** 容器寬度低於此值（px，即 40rem）時改為全部展開 */
const NARROW_WIDTH = 640;

/**
 * light DOM 元件的樣式，以 adoptedStyleSheets 掛到所在 root。
 */
const styles = css`
  govtw-tabs {
    display: block;
    color: var(--govtw-tabs-color);
  }

  govtw-tabs > .govtw-tabs__list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--govtw-tabs-gap);
    margin: 0;
    padding: 0;
    border-block-end: var(--govtw-tabs-border-width) solid var(--govtw-tabs-border-color);
  }

  govtw-tabs .govtw-tabs__tab {
    margin: 0 0 calc(-1 * var(--govtw-tabs-border-width));
    padding: var(--govtw-tabs-tab-padding-y) var(--govtw-tabs-tab-padding-x);
    font: inherit;
    color: var(--govtw-tabs-link-color);
    text-decoration-line: underline;
    text-underline-offset: var(--govtw-tabs-underline-offset);
    background: var(--govtw-tabs-unselected-bg);
    border: var(--govtw-tabs-border-width) solid transparent;
    cursor: pointer;
  }

  govtw-tabs .govtw-tabs__tab[aria-selected='true'] {
    color: var(--govtw-tabs-color);
    text-decoration-line: none;
    background: var(--govtw-tabs-selected-bg);
    border-color: var(--govtw-tabs-border-color);
    border-block-end-color: var(--govtw-tabs-selected-bg);
  }

  govtw-tabs .govtw-tabs__tab:focus-visible {
    outline: var(--govtw-tabs-focus-width) solid transparent;
    color: var(--govtw-tabs-focus-color);
    background-color: var(--govtw-tabs-focus-bg);
    text-decoration: none;
    box-shadow: 0 -2px var(--govtw-tabs-focus-bg), 0 4px var(--govtw-tabs-focus-color);
  }

  govtw-tabs[mode='tabs'] > [role='tabpanel'] {
    padding: var(--govtw-tabs-panel-padding);
    border: var(--govtw-tabs-border-width) solid var(--govtw-tabs-border-color);
    border-block-start: 0;
  }

  govtw-tabs[mode='tabs'] > [role='tabpanel']:focus-visible {
    outline: var(--govtw-tabs-focus-width) solid var(--govtw-tabs-focus-bg);
  }

  govtw-tabs > section > :first-child {
    margin-block-start: 0;
  }

  govtw-tabs > section > :last-child {
    margin-block-end: 0;
  }
`;

/**
 * govtw-tabs — 頁籤
 *
 * 參考 GOV.UK Tabs：https://design-system.service.gov.uk/components/tabs/
 *
 * 作者寫多個 `<section data-label="頁籤名稱">`，元件在前面產生 tablist（全部 light DOM，
 * 讓 aria-controls、aria-labelledby 的 id 可以互相參照）。
 *
 * - 方向鍵左右切換、Home／End 到第一個／最後一個（WAI-ARIA Tabs pattern，自動啟用）
 * - 網址 `#id` 與某個 section 的 id 相同時，預設選中該頁籤
 * - 容器寬度 40rem 以下：不顯示頁籤，所有內容依序展開（不留 tab 語意）
 *
 * 限制：只在頁面解析完成後包裝一次；之後新增或移除 section 不會重新包裝。
 *
 * @example
 * <govtw-tabs>
 *   <section data-label="申辦資格"><h2>申辦資格</h2>…</section>
 *   <section data-label="應備文件"><h2>應備文件</h2>…</section>
 * </govtw-tabs>
 */
@customElement('govtw-tabs')
export class GovtwTabs extends LitElement {
  /** tablist 的可讀名稱 */
  @property({ type: String }) label = '';

  /** 目前模式；由容器寬度決定，反映到屬性供 CSS 使用 */
  @property({ type: String, reflect: true }) mode: 'tabs' | 'list' = 'tabs';

  @state() private panels?: HTMLElement[];

  @state() private selected = 0;

  private readonly baseId = `govtw-tabs-${++idCounter}`;

  private resizeObserver?: ResizeObserver;

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    adoptStyles(this.getRootNode(), styles);
    whenParsed(() => {
      if (!this.panels) {
        this.panels = takeChildElements(this).filter((el): el is HTMLElement => el instanceof HTMLElement);
        this.panels.forEach((panel, i) => {
          panel.id ||= `${this.baseId}-panel-${i}`;
        });
        const fromHash = this.panels.findIndex((panel) => `#${panel.id}` === location.hash);
        if (fromHash >= 0) this.selected = fromHash;
      }
      this.resizeObserver ??= new ResizeObserver(() => {
        this.mode = this.clientWidth < NARROW_WIDTH ? 'list' : 'tabs';
      });
      this.resizeObserver.observe(this);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }

  private tabId(i: number) {
    return `${this.baseId}-tab-${i}`;
  }

  private select(i: number, focus = false) {
    if (!this.panels) return;
    const count = this.panels.length;
    this.selected = (i + count) % count;
    if (focus) {
      this.updateComplete.then(() => this.querySelector<HTMLElement>(`#${this.tabId(this.selected)}`)?.focus());
    }
  }

  private handleKeydown(event: KeyboardEvent) {
    const moves: Record<string, number> = {
      ArrowRight: this.selected + 1,
      ArrowLeft: this.selected - 1,
      Home: 0,
      End: (this.panels?.length ?? 1) - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    this.select(moves[event.key], true);
  }

  /** 依模式設定 section 的 role、hidden 等屬性 */
  protected updated() {
    this.panels?.forEach((panel, i) => {
      if (this.mode === 'tabs') {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', this.tabId(i));
        panel.setAttribute('tabindex', '0');
        panel.hidden = i !== this.selected;
      } else {
        panel.removeAttribute('role');
        panel.removeAttribute('aria-labelledby');
        panel.removeAttribute('tabindex');
        panel.hidden = false;
      }
    });
  }

  render() {
    if (!this.panels) return nothing;
    const tablist = this.mode === 'tabs'
      ? html`
        <div class="govtw-tabs__list" role="tablist" aria-label=${this.label || nothing} @keydown=${this.handleKeydown}>
          ${this.panels.map((panel, i) => html`
            <button
              class="govtw-tabs__tab"
              type="button"
              role="tab"
              id=${this.tabId(i)}
              aria-controls=${panel.id}
              aria-selected=${i === this.selected ? 'true' : 'false'}
              tabindex=${i === this.selected ? '0' : '-1'}
              @click=${() => this.select(i)}
            >${panel.dataset.label ?? `頁籤 ${i + 1}`}</button>
          `)}
        </div>`
      : nothing;
    return html`${tablist}${this.panels}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-tabs': GovtwTabs;
  }
}
