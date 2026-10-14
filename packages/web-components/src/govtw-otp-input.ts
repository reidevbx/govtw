import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * govtw-otp-input — 一次性驗證碼
 *
 * GOV.UK 無對應元件（台灣自訂）。
 *
 * 輸入簡訊或 Email 收到的一次性驗證碼，附「重新傳送驗證碼」按鈕與倒數。
 *
 * - 輸入框固定 `inputmode="numeric"`、`autocomplete="one-time-code"`；不限制長度、不自動送出
 * - 載入時開始倒數 `resend-delay` 秒；倒數期間按鈕設 `aria-disabled`，仍可聚焦
 * - 倒數文字每秒更新但不宣告；倒數結束時 live region 宣告一次
 * - 按下重新傳送只發出 `govtw-resend` 事件並重新倒數，實際寄送由作者處理
 *
 * @example
 * <govtw-otp-input name="otp" hint="驗證碼 10 分鐘內有效"></govtw-otp-input>
 */
@customElement('govtw-otp-input')
export class GovtwOtpInput extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static formAssociated = true;

  @property({ type: String }) name = '';
  @property({ type: String }) value = '';
  @property({ type: String }) label = '驗證碼';
  @property({ type: String }) hint = '';
  @property({ type: String }) error = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** 可以重新傳送前的等待秒數 */
  @property({ type: Number, attribute: 'resend-delay' }) resendDelay = 60;

  /** 剩餘秒數；0 表示可以重新傳送 */
  @state() private remaining = 0;

  /** live region 的文字；只在倒數結束時設定 */
  @state() private announcement = '';

  private _internals: ElementInternals;

  private _deadline = 0;

  private _timer?: ReturnType<typeof setInterval>;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static styles = css`
    :host {
      display: block;
      outline: none !important;
      font-family: var(--govtw-otp-input-font-family);
      font-size: var(--govtw-otp-input-font-size);
      color: var(--govtw-otp-input-color);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--govtw-otp-input-stack-gap);
    }

    .form-group--error {
      padding-inline-start: var(--govtw-otp-input-resend-padding-x);
      border-inline-start: 4px solid var(--govtw-otp-input-error-color);
    }

    .label {
      font-weight: var(--govtw-otp-input-label-font-weight);
    }

    .hint {
      color: var(--govtw-otp-input-hint-color);
    }

    .error-message {
      font-weight: var(--govtw-otp-input-label-font-weight);
      color: var(--govtw-otp-input-error-color);
    }

    .input {
      box-sizing: border-box;
      inline-size: 100%;
      max-inline-size: 23ex;
      margin: 0;
      padding: var(--govtw-otp-input-padding);
      font: inherit;
      line-height: 1.5;
      color: var(--govtw-otp-input-color);
      background: var(--govtw-otp-input-bg);
      border: 2px solid var(--govtw-otp-input-border-color);
      border-radius: var(--govtw-otp-input-border-radius);
      -webkit-appearance: none;
      appearance: none;
    }

    .input:focus {
      outline: var(--govtw-otp-input-focus-width) solid var(--govtw-otp-input-focus-color);
      outline-offset: 0;
      box-shadow: inset 0 0 0 1px var(--govtw-otp-input-border-color);
    }

    .input--error {
      border-color: var(--govtw-otp-input-error-color);
    }

    .input--error:focus {
      border-color: var(--govtw-otp-input-border-color);
    }

    .resend {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--govtw-otp-input-resend-gap);
    }

    .resend-button {
      min-block-size: 44px;
      padding: 0 var(--govtw-otp-input-resend-padding-x);
      font: inherit;
      color: var(--govtw-otp-input-resend-color);
      background: var(--govtw-otp-input-resend-bg);
      border: 2px solid var(--govtw-otp-input-resend-border-color);
      border-radius: var(--govtw-otp-input-border-radius);
      cursor: pointer;
    }

    .resend-button[aria-disabled='true'] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .resend-button:focus-visible {
      outline: var(--govtw-otp-input-focus-width) solid transparent;
      color: var(--govtw-otp-input-focus-text);
      background: var(--govtw-otp-input-focus-color);
      border-color: var(--govtw-otp-input-focus-text);
    }

    .countdown {
      color: var(--govtw-otp-input-countdown-color);
    }

    .input:disabled,
    .resend-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--govtw-otp-input-disabled-bg);
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

  connectedCallback() {
    super.connectedCallback();
    this._startCountdown();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._timer);
  }

  formResetCallback() {
    this.value = '';
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('value')) {
      this._internals.setFormValue(this.value);
    }
  }

  private _startCountdown() {
    clearInterval(this._timer);
    this.announcement = '';
    this._deadline = Date.now() + Math.max(this.resendDelay, 0) * 1000;
    this._tick();
    if (this.remaining > 0) this._timer = setInterval(this._tick, 1000);
  }

  /** 以截止時間計算剩餘秒數，避免 setInterval 延遲累積 */
  private _tick = () => {
    this.remaining = Math.max(Math.ceil((this._deadline - Date.now()) / 1000), 0);
    if (this.remaining > 0) return;
    if (this._timer !== undefined) {
      clearInterval(this._timer);
      this._timer = undefined;
      this.announcement = '現在可以重新傳送驗證碼';
    }
  };

  private _resend() {
    if (this.remaining > 0 || this.disabled) return;
    this.dispatchEvent(new CustomEvent('govtw-resend', { bubbles: true, composed: true }));
    this._startCountdown();
  }

  private _handleInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }

  private _handleChange(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  render() {
    const hasError = !!this.error;
    const describedBy = [this.hint ? 'hint' : '', hasError ? 'error' : ''].filter(Boolean).join(' ');
    const waiting = this.remaining > 0;

    return html`
      <div class="form-group ${hasError ? 'form-group--error' : ''}">
        ${this.label ? html`<label class="label" for="input">${this.label}</label>` : nothing}
        ${this.hint ? html`<span class="hint" id="hint">${this.hint}</span>` : nothing}
        ${hasError ? html`<span class="error-message" id="error">${this.error}</span>` : nothing}
        <input
          class="input ${hasError ? 'input--error' : ''}"
          id="input"
          type="text"
          .value=${this.value}
          inputmode="numeric"
          autocomplete="one-time-code"
          autocapitalize="none"
          spellcheck="false"
          ?disabled=${this.disabled}
          aria-invalid=${hasError ? 'true' : nothing}
          aria-describedby=${describedBy || nothing}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
        <div class="resend">
          <button
            class="resend-button"
            type="button"
            aria-disabled=${waiting ? 'true' : nothing}
            aria-describedby=${waiting ? 'countdown' : nothing}
            ?disabled=${this.disabled}
            @click=${this._resend}
          >重新傳送驗證碼</button>
          ${waiting ? html`<span class="countdown" id="countdown">${this.remaining} 秒後可重新傳送</span>` : nothing}
        </div>
        <div class="visually-hidden" aria-live="polite">${this.announcement}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-otp-input': GovtwOtpInput;
  }
}
