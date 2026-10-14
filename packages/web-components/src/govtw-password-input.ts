import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * govtw-password-input — 密碼輸入
 *
 * 參考 GOV.UK Password input：https://design-system.service.gov.uk/components/password-input/
 *
 * 密碼欄位加「顯示／隱藏」按鈕，讓使用者確認輸入內容。
 *
 * - 切換時以 live region 宣告「密碼已顯示」或「密碼已隱藏」
 * - 送出表單時自動切回隱藏，避免瀏覽器把明碼記進表單歷史
 * - `autocomplete` 預設 `current-password`；註冊或變更密碼時設 `new-password`
 *
 * @example
 * <govtw-password-input name="password" label="密碼"></govtw-password-input>
 */
@customElement('govtw-password-input')
export class GovtwPasswordInput extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static formAssociated = true;

  @property({ type: String }) name = '';
  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: String }) hint = '';
  @property({ type: String }) error = '';
  @property({ type: String }) autocomplete = 'current-password';
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private visible = false;

  /** live region 的文字；第一次切換前保持空白，避免載入時念出 */
  @state() private announcement = '';

  private _internals: ElementInternals;

  private _form: HTMLFormElement | null = null;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static styles = css`
    :host {
      display: block;
      outline: none !important;
      font-family: var(--govtw-password-input-font-family);
      font-size: var(--govtw-password-input-font-size);
      color: var(--govtw-password-input-color);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--govtw-password-input-stack-gap);
    }

    .form-group--error {
      padding-inline-start: var(--govtw-password-input-toggle-padding-x);
      border-inline-start: 4px solid var(--govtw-password-input-error-color);
    }

    .label {
      font-weight: var(--govtw-password-input-label-font-weight);
    }

    .hint {
      color: var(--govtw-password-input-hint-color);
    }

    .error-message {
      font-weight: var(--govtw-password-input-label-font-weight);
      color: var(--govtw-password-input-error-color);
    }

    .wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: var(--govtw-password-input-toggle-gap);
    }

    .input {
      flex: 1 1 15em;
      box-sizing: border-box;
      min-inline-size: 0;
      margin: 0;
      padding: var(--govtw-password-input-padding);
      font: inherit;
      line-height: 1.5;
      color: var(--govtw-password-input-color);
      background: var(--govtw-password-input-bg);
      border: 2px solid var(--govtw-password-input-border-color);
      border-radius: var(--govtw-password-input-border-radius);
      -webkit-appearance: none;
      appearance: none;
    }

    .input:focus {
      outline: var(--govtw-password-input-focus-width) solid var(--govtw-password-input-focus-color);
      outline-offset: 0;
      box-shadow: inset 0 0 0 1px var(--govtw-password-input-border-color);
    }

    .input--error {
      border-color: var(--govtw-password-input-error-color);
    }

    .input--error:focus {
      border-color: var(--govtw-password-input-border-color);
    }

    .toggle {
      min-inline-size: 5em;
      min-block-size: 44px;
      padding: 0 var(--govtw-password-input-toggle-padding-x);
      font: inherit;
      color: var(--govtw-password-input-toggle-color);
      background: var(--govtw-password-input-toggle-bg);
      border: 2px solid var(--govtw-password-input-toggle-border-color);
      border-radius: var(--govtw-password-input-border-radius);
      cursor: pointer;
    }

    .toggle:focus-visible {
      outline: var(--govtw-password-input-focus-width) solid transparent;
      color: var(--govtw-password-input-focus-text);
      background: var(--govtw-password-input-focus-color);
      border-color: var(--govtw-password-input-focus-text);
    }

    .input:disabled,
    .toggle:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--govtw-password-input-disabled-bg);
    }

    .visually-hidden {
      position: absolute !important;
      inline-size: 1px !important;
      block-size: 1px !important;
      margin: -1px !important;
      padding: 0 !important;
      overflow: hidden !important;
      clip-path: inset(50%) !important;
      white-space: nowrap !important;
      border: 0 !important;
    }
  `;

  formAssociatedCallback(form: HTMLFormElement | null) {
    this._form?.removeEventListener('submit', this._hideOnSubmit);
    this._form = form;
    this._form?.addEventListener('submit', this._hideOnSubmit);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._form?.removeEventListener('submit', this._hideOnSubmit);
  }

  formResetCallback() {
    this.value = '';
    this.visible = false;
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('value')) {
      this._internals.setFormValue(this.value);
    }
  }

  /** 送出時切回隱藏；不宣告，避免與頁面跳轉的朗讀重疊 */
  private _hideOnSubmit = () => {
    this.visible = false;
  };

  private _handleInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }

  private _handleChange(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private _toggle() {
    this.visible = !this.visible;
    this.announcement = this.visible ? '密碼已顯示' : '密碼已隱藏';
  }

  render() {
    const hasError = !!this.error;
    const describedBy = [this.hint ? 'hint' : '', hasError ? 'error' : ''].filter(Boolean).join(' ');

    return html`
      <div class="form-group ${hasError ? 'form-group--error' : ''}">
        ${this.label ? html`<label class="label" for="input">${this.label}</label>` : nothing}
        ${this.hint ? html`<span class="hint" id="hint">${this.hint}</span>` : nothing}
        ${hasError ? html`<span class="error-message" id="error">${this.error}</span>` : nothing}
        <div class="wrapper">
          <input
            class="input ${hasError ? 'input--error' : ''}"
            id="input"
            type=${this.visible ? 'text' : 'password'}
            .value=${this.value}
            autocomplete=${this.autocomplete || nothing}
            autocapitalize="none"
            spellcheck="false"
            ?disabled=${this.disabled}
            aria-invalid=${hasError ? 'true' : nothing}
            aria-describedby=${describedBy || nothing}
            @input=${this._handleInput}
            @change=${this._handleChange}
          />
          <button
            class="toggle"
            type="button"
            aria-controls="input"
            aria-label=${this.visible ? '隱藏密碼' : '顯示密碼'}
            ?disabled=${this.disabled}
            @click=${this._toggle}
          >${this.visible ? '隱藏' : '顯示'}</button>
        </div>
        <div class="visually-hidden" aria-live="polite">${this.announcement}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-password-input': GovtwPasswordInput;
  }
}
