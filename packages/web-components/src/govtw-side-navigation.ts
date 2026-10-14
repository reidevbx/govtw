import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { adoptStyles, restoreListRole, takeChildElements, whenParsed } from './internal/light-dom.js';

/**
 * light DOM 元件的樣式，以 adoptedStyleSheets 掛到所在 root。
 */
const styles = css`
  govtw-side-navigation {
    display: block;
    font-size: var(--govtw-side-navigation-font-size);
    color: var(--govtw-side-navigation-color);
  }

  govtw-side-navigation ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  govtw-side-navigation li {
    margin: 0;
  }

  govtw-side-navigation li > ul {
    padding-inline-start: var(--govtw-side-navigation-nested-indent);
  }

  govtw-side-navigation a {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    min-block-size: 44px;
    padding: var(--govtw-side-navigation-item-padding-y) var(--govtw-side-navigation-item-padding-x);
    color: var(--govtw-side-navigation-link-color);
    text-decoration-line: underline;
    text-underline-offset: var(--govtw-side-navigation-underline-offset);
    border-inline-start: var(--govtw-side-navigation-current-border-width) solid transparent;
  }

  /* 目前頁：左側粗線加粗體，不只靠顏色 */
  govtw-side-navigation a[aria-current='page'] {
    font-weight: var(--govtw-side-navigation-current-font-weight);
    color: var(--govtw-side-navigation-current-color);
    text-decoration-line: none;
    border-inline-start-color: var(--govtw-side-navigation-current-border-color);
  }

  govtw-side-navigation a:focus-visible {
    outline: var(--govtw-side-navigation-focus-width) solid transparent;
    color: var(--govtw-side-navigation-focus-text);
    background-color: var(--govtw-side-navigation-focus-color);
    text-decoration: none;
    box-shadow: inset 0 calc(-1 * var(--govtw-side-navigation-focus-width)) var(--govtw-side-navigation-focus-text);
  }
`;

/**
 * govtw-side-navigation — 側邊選單
 *
 * 參考來源：台灣政府網站調查（GOV.UK Design System 不提供此元件）
 *
 * 作者寫巢狀 `<ul><li><a>`（最多兩層），目前頁的 `<a>` 加 `aria-current="page"`。
 * 元件以 light DOM 包上 `<nav aria-label>`，只加樣式。
 *
 * - 不支援收合：作者只輸出目前分支的第二層，其他分支只列第一層
 * - 搭配 `govtw-sidebar` 佈局使用
 *
 * 限制：只在頁面解析完成後包裝一次；之後新增或移除子元素不會重新包裝。
 *
 * @example
 * <govtw-side-navigation>
 *   <ul>
 *     <li><a href="/a">申辦服務</a></li>
 *     <li><a href="/b" aria-current="page">戶籍</a></li>
 *   </ul>
 * </govtw-side-navigation>
 */
@customElement('govtw-side-navigation')
export class GovtwSideNavigation extends LitElement {
  /** nav 地標的可讀名稱 */
  @property({ type: String }) label = '本單元選單';

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
      this.items = takeChildElements(this);
      restoreListRole(this.items);
    });
  }

  render() {
    if (!this.items) return nothing;
    return html`<nav aria-label=${this.label}>${this.items}</nav>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-side-navigation': GovtwSideNavigation;
  }
}
