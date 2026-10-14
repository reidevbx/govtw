import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * govtw-search — 搜尋框
 *
 * GOV.UK 無獨立元件（參考 Header 內的搜尋）。台灣政府網站每頁都有站內搜尋。
 *
 * 渲染 `<form role="search">`：可見 label、`<input type="search">`、原生 `<button type="submit">`。
 * 送出前發出可取消的 `govtw-search` 事件；呼叫 preventDefault() 可改由 JavaScript 處理（如 SPA）。
 *
 * @example
 * <govtw-search action="/search" label="搜尋本網站"></govtw-search>
 */
@customElement('govtw-search')
export class GovtwSearch extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** 表單送出網址；空值時送到目前頁 */
  @property({ type: String }) action = '';

  /** 表單送出方式 */
  @property({ type: String }) method: 'get' | 'post' = 'get';

  /** 查詢參數名稱 */
  @property({ type: String }) name = 'q';

  /** 標籤文字，同時作為 search 地標的名稱 */
  @property({ type: String }) label = '搜尋本網站';

  /** 視覺隱藏標籤（螢幕閱讀器仍會念） */
  @property({ type: Boolean, reflect: true, attribute: 'hide-label' }) hideLabel = false;

  /** 預設查詢文字 */
  @property({ type: String }) value = '';

  /** 送出按鈕文字 */
  @property({ type: String, attribute: 'button-text' }) buttonText = '搜尋';

  static styles = css`
    :host {
      display: block;
      outline: none !important;
      font-family: var(--govtw-search-font-family);
      font-size: var(--govtw-search-font-size);
      color: var(--govtw-search-color);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: var(--govtw-search-label-gap);
      margin: 0;
    }

    label {
      font-weight: var(--govtw-search-label-font-weight);
    }

    :host([hide-label]) label {
      position: absolute;
      inline-size: 1px;
      block-size: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    .row {
      display: flex;
    }

    input {
      flex: 1;
      min-inline-size: 0;
      min-block-size: var(--govtw-search-min-height);
      margin: 0;
      padding: var(--govtw-search-padding);
      font: inherit;
      color: var(--govtw-search-color);
      background: var(--govtw-search-bg);
      border: 2px solid var(--govtw-search-border-color);
      border-inline-end: 0;
      border-radius: var(--govtw-search-border-radius) 0 0 var(--govtw-search-border-radius);
      box-sizing: border-box;
      -webkit-appearance: none;
      appearance: none;
    }

    button {
      min-block-size: var(--govtw-search-min-height);
      margin: 0;
      padding: 0 var(--govtw-search-button-padding-x);
      font: inherit;
      font-weight: var(--govtw-search-button-font-weight);
      color: var(--govtw-search-button-color);
      background: var(--govtw-search-button-bg);
      /* transparent border 確保 Windows 高對比模式下邊界可見 */
      border: 2px solid transparent;
      border-radius: 0 var(--govtw-search-border-radius) var(--govtw-search-border-radius) 0;
      cursor: pointer;
    }

    /* ===== Focus — 黃色 ring，與 text-input、button 一致 ===== */
    input:focus {
      outline: var(--govtw-search-focus-width) solid var(--govtw-search-focus-color);
      outline-offset: 0;
      box-shadow: inset 0 0 0 2px var(--govtw-search-border-color);
    }

    button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--govtw-search-focus-width) var(--govtw-search-focus-color);
    }
  `;

  private handleSubmit(event: SubmitEvent) {
    const input = this.renderRoot.querySelector('input');
    const proceed = this.dispatchEvent(
      new CustomEvent('govtw-search', {
        detail: { value: input?.value ?? '' },
        bubbles: true,
        composed: true,
        cancelable: true,
      }),
    );
    if (!proceed) event.preventDefault();
  }

  render() {
    return html`
      <form
        role="search"
        aria-labelledby="label"
        action=${this.action}
        method=${this.method}
        @submit=${this.handleSubmit}
      >
        <label id="label" for="input">${this.label}</label>
        <div class="row">
          <input
            id="input"
            type="search"
            name=${this.name}
            .value=${this.value}
            enterkeyhint="search"
          />
          <button type="submit">${this.buttonText}</button>
        </div>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-search': GovtwSearch;
  }
}
