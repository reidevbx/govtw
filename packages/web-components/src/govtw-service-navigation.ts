import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { adoptStyles, takeChildElements, whenParsed } from './internal/light-dom.js';

let idCounter = 0;

/**
 * light DOM 元件的樣式，以 adoptedStyleSheets 掛到所在 root。
 * 容器寬度 40rem 以下收合成「選單」按鈕（依容器寬度，不依螢幕寬度）。
 */
const styles = css`
  govtw-service-navigation {
    display: block;
    container: govtw-service-navigation / inline-size;
    font-size: var(--govtw-service-navigation-font-size);
    border-block-end: 1px solid var(--govtw-service-navigation-border-color);
  }

  govtw-service-navigation > nav > ul {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--govtw-service-navigation-gap);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  govtw-service-navigation > nav > ul > li {
    display: flex;
    margin: 0;
  }

  govtw-service-navigation > nav > ul > li > a {
    display: flex;
    align-items: center;
    min-block-size: var(--govtw-service-navigation-item-min-height);
    font-weight: var(--govtw-service-navigation-font-weight);
    color: var(--govtw-service-navigation-color);
    text-decoration-line: underline;
    text-decoration-thickness: var(--govtw-service-navigation-underline-thickness);
    text-underline-offset: var(--govtw-service-navigation-underline-offset);
    /* 預留目前頁指示線的空間，避免切換時跳動 */
    border-block-end: var(--govtw-service-navigation-current-indicator-width) solid transparent;
  }

  govtw-service-navigation > nav > ul > li > a:hover {
    text-decoration-thickness: var(--govtw-service-navigation-hover-underline-thickness);
  }

  govtw-service-navigation > nav > ul > li > a[aria-current='page'] {
    font-weight: var(--govtw-service-navigation-current-font-weight);
    text-decoration-line: none;
    border-block-end-color: var(--govtw-service-navigation-current-indicator-color);
  }

  govtw-service-navigation a:focus-visible {
    outline: var(--govtw-service-navigation-focus-width) solid transparent;
    color: var(--govtw-service-navigation-focus-color);
    background-color: var(--govtw-service-navigation-focus-bg);
    text-decoration: none;
    box-shadow: 0 -2px var(--govtw-service-navigation-focus-bg), 0 4px var(--govtw-service-navigation-focus-color);
  }

  govtw-service-navigation > nav > .govtw-service-navigation__toggle {
    display: none;
  }

  @container govtw-service-navigation (max-width: 40rem) {
    govtw-service-navigation > nav > .govtw-service-navigation__toggle {
      display: inline-flex;
      align-items: center;
      min-block-size: var(--govtw-service-navigation-item-min-height);
      margin: 0;
      padding: 0;
      font: inherit;
      font-weight: var(--govtw-service-navigation-font-weight);
      color: var(--govtw-service-navigation-toggle-color);
      background: none;
      border: 0;
      cursor: pointer;
    }

    govtw-service-navigation > nav > .govtw-service-navigation__toggle:focus-visible {
      outline: var(--govtw-service-navigation-focus-width) solid transparent;
      color: var(--govtw-service-navigation-focus-color);
      background-color: var(--govtw-service-navigation-focus-bg);
      box-shadow: 0 -2px var(--govtw-service-navigation-focus-bg), 0 4px var(--govtw-service-navigation-focus-color);
    }

    govtw-service-navigation:not([open]) > nav > ul {
      display: none;
    }

    govtw-service-navigation > nav > ul {
      flex-direction: column;
    }

    /* 窄螢幕改用左側指示線 */
    govtw-service-navigation > nav > ul > li > a {
      border-block-end: 0;
      border-inline-start: var(--govtw-service-navigation-current-indicator-width) solid transparent;
      padding-inline-start: var(--govtw-service-navigation-gap);
    }

    govtw-service-navigation > nav > ul > li > a[aria-current='page'] {
      border-inline-start-color: var(--govtw-service-navigation-current-indicator-color);
    }
  }
`;

/**
 * govtw-service-navigation — 主選單
 *
 * 參考 GOV.UK Service navigation：https://design-system.service.gov.uk/components/service-navigation/
 *
 * 作者寫 `<a>` 子元素；目前頁由作者加 `aria-current="page"`（元件無法得知網址對應）。
 * 元件以 light DOM 包成 `<nav aria-label><ul><li>`。只支援單層，不做下拉。
 * 容器寬度 40rem 以下收合成「選單」按鈕。
 *
 * 限制：只在頁面解析完成後包裝一次；之後新增或移除子元素不會重新包裝。
 *
 * @example
 * <govtw-service-navigation>
 *   <a href="/">首頁</a>
 *   <a href="/services" aria-current="page">申辦服務</a>
 *   <a href="/news">最新消息</a>
 * </govtw-service-navigation>
 */
@customElement('govtw-service-navigation')
export class GovtwServiceNavigation extends LitElement {
  /** nav 地標的可讀名稱 */
  @property({ type: String }) label = '主選單';

  /** 窄螢幕收合按鈕的文字 */
  @property({ type: String, attribute: 'toggle-text' }) toggleText = '選單';

  /** 窄螢幕時選單是否展開 */
  @property({ type: Boolean, reflect: true }) open = false;

  @state() private items?: Element[];

  private readonly listId = `govtw-service-navigation-${++idCounter}`;

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    adoptStyles(this.getRootNode(), styles);
    if (this.items) return;
    whenParsed(() => {
      if (!this.items) this.items = takeChildElements(this);
    });
  }

  private toggle() {
    this.open = !this.open;
  }

  render() {
    if (!this.items) return nothing;
    return html`
      <nav aria-label=${this.label}>
        <button
          class="govtw-service-navigation__toggle"
          type="button"
          aria-expanded=${this.open ? 'true' : 'false'}
          aria-controls=${this.listId}
          @click=${this.toggle}
        >${this.toggleText}</button>
        <ul id=${this.listId} role="list">${this.items.map((item) => html`<li>${item}</li>`)}</ul>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-service-navigation': GovtwServiceNavigation;
  }
}
