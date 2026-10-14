import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { adoptStyles, restoreListRole, takeChildElements, whenParsed } from './internal/light-dom.js';

let idCounter = 0;

/**
 * light DOM 元件的樣式，以 adoptedStyleSheets 掛到所在 root。
 * 作者的錯誤清單（`<ul><li><a>`）在 light DOM，才能套用到巢狀的連結。
 */
const styles = css`
  govtw-error-summary {
    display: block;
  }

  govtw-error-summary > .govtw-error-summary {
    display: flex;
    flex-direction: column;
    gap: var(--govtw-error-summary-gap);
    padding: var(--govtw-error-summary-padding);
    border: var(--govtw-error-summary-border-width) solid var(--govtw-error-summary-border-color);
  }

  govtw-error-summary > .govtw-error-summary:focus {
    outline: var(--govtw-error-summary-focus-width) solid var(--govtw-error-summary-focus-color);
  }

  govtw-error-summary .govtw-error-summary__heading {
    margin: 0;
    font-size: var(--govtw-error-summary-heading-font-size);
    font-weight: var(--govtw-error-summary-heading-font-weight);
  }

  govtw-error-summary .govtw-error-summary__body > :first-child {
    margin-block-start: 0;
  }

  govtw-error-summary .govtw-error-summary__body > :last-child {
    margin-block-end: 0;
  }

  govtw-error-summary .govtw-error-summary__body ul {
    padding-inline-start: 0;
    list-style: none;
  }

  govtw-error-summary .govtw-error-summary__body a {
    font-weight: var(--govtw-error-summary-heading-font-weight);
    color: var(--govtw-error-summary-link-color);
    text-decoration-line: underline;
    text-underline-offset: var(--govtw-error-summary-underline-offset);
  }

  govtw-error-summary .govtw-error-summary__body a:focus-visible {
    outline: var(--govtw-error-summary-focus-width) solid transparent;
    color: var(--govtw-error-summary-focus-text);
    background-color: var(--govtw-error-summary-focus-color);
    text-decoration: none;
    box-shadow: 0 -2px var(--govtw-error-summary-focus-color), 0 4px var(--govtw-error-summary-focus-text);
  }
`;

/**
 * govtw-error-summary — 錯誤摘要
 *
 * 參考 GOV.UK Error summary：https://design-system.service.gov.uk/components/error-summary/
 *
 * 表單驗證失敗時放在頁面頂端，列出所有錯誤，每項連到對應欄位。
 * 作者寫 `<ul><li><a href="#欄位id">錯誤訊息</a></li></ul>`；元件以 light DOM 包上標題與 `role="alert"` 容器。
 *
 * - 出現時自動取得焦點，螢幕閱讀器立即念出（`no-autofocus` 可關閉）
 * - 點錯誤連結時，把焦點移到對應欄位。表單元件設了 delegatesFocus，`focus()` 會轉到內部 input
 *
 * 限制：只在頁面解析完成後包裝一次；之後新增或移除子元素不會重新包裝。
 *
 * @example
 * <govtw-error-summary>
 *   <ul><li><a href="#name">請輸入姓名</a></li></ul>
 * </govtw-error-summary>
 * <govtw-text-input id="name" label="姓名" error="請輸入姓名"></govtw-text-input>
 */
@customElement('govtw-error-summary')
export class GovtwErrorSummary extends LitElement {
  /** 標題 */
  @property({ type: String }) heading = '有問題需要處理';

  /** 出現時不自動取得焦點 */
  @property({ type: Boolean, attribute: 'no-autofocus' }) noAutofocus = false;

  @state() private items?: Element[];

  private hasFocused = false;

  private readonly headingId = `govtw-error-summary-heading-${++idCounter}`;

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

  protected updated() {
    // 第一次渲染出內容後聚焦一次
    if (this.items && !this.noAutofocus && !this.hasFocused) {
      this.hasFocused = true;
      this.querySelector<HTMLElement>(':scope > .govtw-error-summary')?.focus();
    }
  }

  private handleClick(event: MouseEvent) {
    const link = (event.target as Element).closest('a');
    const href = link?.getAttribute('href');
    if (!href?.startsWith('#')) return;

    const id = decodeURIComponent(href.slice(1));
    const root = this.getRootNode() as Document | ShadowRoot;
    const target = root.getElementById?.(id) ?? document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    // 先捲到欄位頂端（讓標籤也在畫面內），再聚焦且不再捲動
    target.scrollIntoView({ block: 'start' });
    target.focus({ preventScroll: true });
  }

  render() {
    if (!this.items) return nothing;
    return html`
      <div
        class="govtw-error-summary"
        role="alert"
        aria-labelledby=${this.headingId}
        tabindex="-1"
        @click=${this.handleClick}
      >
        <h2 class="govtw-error-summary__heading" id=${this.headingId}>${this.heading}</h2>
        <div class="govtw-error-summary__body">${this.items}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-error-summary': GovtwErrorSummary;
  }
}
