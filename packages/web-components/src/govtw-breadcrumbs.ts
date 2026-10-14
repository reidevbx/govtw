import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { adoptStyles, takeChildElements, whenParsed } from './internal/light-dom.js';

/**
 * light DOM 元件的樣式，以 adoptedStyleSheets 掛到所在 root。
 * 選擇器以 tag 開頭限定範圍。
 */
const styles = css`
  govtw-breadcrumbs {
    display: block;
    font-size: var(--govtw-breadcrumbs-font-size);
    color: var(--govtw-breadcrumbs-color);
  }

  govtw-breadcrumbs > nav > ol {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--govtw-breadcrumbs-gap);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  govtw-breadcrumbs > nav > ol > li {
    display: flex;
    align-items: center;
    gap: var(--govtw-breadcrumbs-gap);
    margin: 0;
  }

  /* 分隔符號：CSS 畫的箭頭，不是文字，螢幕閱讀器不會念 */
  govtw-breadcrumbs > nav > ol > li + li::before {
    content: '';
    display: inline-block;
    inline-size: 0.4em;
    block-size: 0.4em;
    border-block-start: 1px solid var(--govtw-breadcrumbs-separator-color);
    border-inline-end: 1px solid var(--govtw-breadcrumbs-separator-color);
    transform: rotate(45deg);
  }

  govtw-breadcrumbs a {
    color: var(--govtw-breadcrumbs-color);
    text-decoration-line: underline;
    text-decoration-thickness: var(--govtw-breadcrumbs-underline-thickness);
    text-underline-offset: var(--govtw-breadcrumbs-underline-offset);
  }

  govtw-breadcrumbs a:hover {
    text-decoration-thickness: var(--govtw-breadcrumbs-hover-underline-thickness);
  }

  govtw-breadcrumbs a:focus-visible {
    outline: var(--govtw-breadcrumbs-focus-width) solid transparent;
    color: var(--govtw-breadcrumbs-focus-color);
    background-color: var(--govtw-breadcrumbs-focus-bg);
    text-decoration: none;
    box-shadow:
      0 -2px var(--govtw-breadcrumbs-focus-bg),
      0 4px var(--govtw-breadcrumbs-focus-color);
  }
`;

/**
 * govtw-breadcrumbs — 麵包屑
 *
 * 參考 GOV.UK Breadcrumbs：https://design-system.service.gov.uk/components/breadcrumbs/
 *
 * 作者寫 `<a>` 子元素，最後一項為目前頁（可用 `<span>`）。
 * 元件以 light DOM 把子元素包成 `<nav aria-label><ol><li>`，最後一項自動加 aria-current="page"。
 *
 * 限制：只在頁面解析完成後包裝一次；之後新增或移除子元素不會重新包裝。
 * 以 JavaScript 建立時，請先加好子元素再插入頁面。
 *
 * @example
 * <govtw-breadcrumbs>
 *   <a href="/">首頁</a>
 *   <a href="/services">申辦服務</a>
 *   <span>戶籍謄本</span>
 * </govtw-breadcrumbs>
 */
@customElement('govtw-breadcrumbs')
export class GovtwBreadcrumbs extends LitElement {
  /** nav 地標的可讀名稱 */
  @property({ type: String }) label = '麵包屑';

  @state() private items?: Element[];

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    adoptStyles(this.getRootNode(), styles);
    if (this.items) return;
    whenParsed(() => {
      if (this.items) return;
      const items = takeChildElements(this);
      items.at(-1)?.setAttribute('aria-current', 'page');
      this.items = items;
    });
  }

  render() {
    if (!this.items) return nothing;
    return html`
      <nav aria-label=${this.label}>
        <ol role="list">${this.items.map((item) => html`<li>${item}</li>`)}</ol>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-breadcrumbs': GovtwBreadcrumbs;
  }
}
