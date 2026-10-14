import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { adoptStyles, restoreListRole, takeChildElements, whenParsed } from './internal/light-dom.js';

let idCounter = 0;

/**
 * light DOM 元件的樣式，以 adoptedStyleSheets 掛到所在 root。
 */
const styles = css`
  govtw-contents-list {
    display: block;
    font-size: var(--govtw-contents-list-font-size);
    color: var(--govtw-contents-list-color);
  }

  govtw-contents-list > nav > .govtw-contents-list__heading {
    margin: 0 0 var(--govtw-contents-list-heading-margin-bottom);
    font-size: var(--govtw-contents-list-heading-font-size);
    font-weight: var(--govtw-contents-list-heading-font-weight);
    line-height: 1.5;
  }

  /* 編號由作者寫在連結文字裡，元件不加清單符號 */
  govtw-contents-list ol,
  govtw-contents-list ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  govtw-contents-list li {
    margin: 0;
  }

  govtw-contents-list li > ol,
  govtw-contents-list li > ul {
    padding-inline-start: var(--govtw-contents-list-nested-indent);
  }

  govtw-contents-list a {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    min-block-size: 44px;
    padding-block: var(--govtw-contents-list-item-padding-y);
    color: var(--govtw-contents-list-link-color);
    text-decoration-line: underline;
    text-underline-offset: var(--govtw-contents-list-underline-offset);
  }

  govtw-contents-list a:focus-visible {
    outline: var(--govtw-contents-list-focus-width) solid transparent;
    color: var(--govtw-contents-list-focus-text);
    background-color: var(--govtw-contents-list-focus-color);
    text-decoration: none;
    box-shadow: inset 0 calc(-1 * var(--govtw-contents-list-focus-width)) var(--govtw-contents-list-focus-text);
  }
`;

/**
 * govtw-contents-list — 頁內目錄
 *
 * 參考來源：台灣政府網站調查（GOV.UK Design System 不提供此元件）
 *
 * 作者寫 `<ol>` 或 `<ul>`，每項是指向頁內標題的 `<a href="#id">`，最多兩層。
 * 元件以 light DOM 包上 `<nav>` 與可見的 `<h2>`，`<nav>` 以 `aria-labelledby` 指向標題。
 *
 * - 清單加 `role="list"`，Safari 才不會因 `list-style: none` 移除清單語意
 * - 中文編號（一、二、三）由作者寫在連結文字裡，與頁面標題一致；元件不加清單符號
 * - 不標示捲動到的段落，不固定在畫面上
 *
 * 限制：只在頁面解析完成後包裝一次；之後新增或移除子元素不會重新包裝。
 *
 * @example
 * <govtw-contents-list>
 *   <ol>
 *     <li><a href="#background">一、計畫緣起</a></li>
 *     <li><a href="#goals">二、計畫目標</a></li>
 *   </ol>
 * </govtw-contents-list>
 */
@customElement('govtw-contents-list')
export class GovtwContentsList extends LitElement {
  /** 可見的目錄標題，也是 nav 地標的名稱 */
  @property({ type: String }) heading = '目錄';

  @state() private items?: Element[];

  private readonly headingId = `govtw-contents-list-${++idCounter}`;

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
    return html`
      <nav aria-labelledby=${this.headingId}>
        <h2 class="govtw-contents-list__heading" id=${this.headingId}>${this.heading}</h2>
        ${this.items}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-contents-list': GovtwContentsList;
  }
}
