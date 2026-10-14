import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

/**
 * govtw-captcha — 圖形驗證碼
 *
 * 參考來源：台灣政府網站調查（GOV.UK 不提供此元件）
 *
 * 驗證碼圖片、「換一張」與「語音播放」按鈕，加一個輸入框。
 *
 * - 語音版必備：缺少 `audio-src` 時 console 警告
 * - 「換一張」只發出 `govtw-refresh` 事件，元件不自己抓新圖；由作者更新 `src` 與 `audio-src`
 * - 換圖後輸入框清空
 *
 * @example
 * <govtw-captcha name="captcha" src="/captcha.png" audio-src="/captcha.mp3"></govtw-captcha>
 */
@customElement('govtw-captcha')
export class GovtwCaptcha extends LitElement {
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

  /** 驗證碼圖片網址 */
  @property({ type: String }) src = '';

  /** 圖片替代文字 */
  @property({ type: String }) alt = '圖形驗證碼';

  /** 語音驗證碼網址（必填） */
  @property({ type: String, attribute: 'audio-src' }) audioSrc = '';

  /** 輸入框的 inputmode；純數字驗證碼設 `numeric` */
  @property({ type: String }) inputmode = '';

  /** 最多可輸入的字數 */
  @property({ type: Number }) maxlength = 0;

  @property({ type: Boolean, reflect: true }) disabled = false;

  @query('audio') private audio?: HTMLAudioElement;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static styles = css`
    :host {
      display: block;
      outline: none !important;
      font-family: var(--govtw-captcha-font-family);
      font-size: var(--govtw-captcha-font-size);
      color: var(--govtw-captcha-color);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--govtw-captcha-stack-gap);
    }

    .form-group--error {
      padding-inline-start: var(--govtw-captcha-error-padding);
      border-inline-start: 4px solid var(--govtw-captcha-error-color);
    }

    .label {
      font-weight: var(--govtw-captcha-label-font-weight);
    }

    .hint {
      color: var(--govtw-captcha-hint-color);
    }

    .error-message {
      font-weight: var(--govtw-captcha-label-font-weight);
      color: var(--govtw-captcha-error-color);
    }

    .image {
      display: block;
      block-size: var(--govtw-captcha-image-height);
      inline-size: auto;
      border: 1px solid var(--govtw-captcha-image-border-color);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--govtw-captcha-actions-gap);
    }

    .action {
      min-block-size: 44px;
      padding: 0;
      font: inherit;
      color: var(--govtw-captcha-action-color);
      text-decoration-line: underline;
      text-underline-offset: var(--govtw-captcha-underline-offset);
      background: none;
      border: 0;
      cursor: pointer;
    }

    .action:focus-visible {
      outline: var(--govtw-captcha-focus-width) solid transparent;
      color: var(--govtw-captcha-focus-text);
      background-color: var(--govtw-captcha-focus-color);
      text-decoration: none;
      box-shadow: 0 -2px var(--govtw-captcha-focus-color), 0 4px var(--govtw-captcha-focus-text);
    }

    .input {
      box-sizing: border-box;
      inline-size: 10em;
      max-inline-size: 100%;
      margin: 0;
      padding: var(--govtw-captcha-padding);
      font: inherit;
      line-height: 1.5;
      color: var(--govtw-captcha-color);
      background: var(--govtw-captcha-bg);
      border: 2px solid var(--govtw-captcha-border-color);
      border-radius: var(--govtw-captcha-border-radius);
      -webkit-appearance: none;
      appearance: none;
    }

    .input:focus {
      outline: var(--govtw-captcha-focus-width) solid var(--govtw-captcha-focus-color);
      outline-offset: 0;
      box-shadow: inset 0 0 0 1px var(--govtw-captcha-border-color);
    }

    .input--error {
      border-color: var(--govtw-captcha-error-color);
    }

    .input--error:focus {
      border-color: var(--govtw-captcha-border-color);
    }

    .input:disabled,
    .action:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (!this.audioSrc) {
      console.warn('[govtw-captcha] 缺少 audio-src。驗證碼必須提供語音版，視障者才能使用（WCAG 1.1.1）');
    }
  }

  protected willUpdate(changed: PropertyValues<this>) {
    // 換了新圖，舊的輸入不再有效
    if (changed.has('src') && changed.get('src') !== undefined) this.value = '';
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('value')) this._internals.setFormValue(this.value);
  }

  formResetCallback() {
    this.value = '';
  }

  private _handleInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }

  private _handleChange(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private _refresh() {
    this.audio?.pause();
    this.dispatchEvent(new CustomEvent('govtw-refresh', { bubbles: true, composed: true }));
  }

  private _play() {
    if (!this.audio) return;
    this.audio.currentTime = 0;
    this.audio.play().catch(() => {
      // 播放失敗（如網址錯誤）時不中斷頁面；錯誤會出現在瀏覽器的 console
    });
  }

  render() {
    const hasError = !!this.error;
    const describedBy = [this.hint ? 'hint' : '', hasError ? 'error' : ''].filter(Boolean).join(' ');

    return html`
      <div class="form-group ${hasError ? 'form-group--error' : ''}">
        <label class="label" for="input">${this.label}</label>
        ${this.hint ? html`<span class="hint" id="hint">${this.hint}</span>` : nothing}
        ${hasError ? html`<span class="error-message" id="error">${this.error}</span>` : nothing}
        ${this.src ? html`<img class="image" src=${this.src} alt=${this.alt} />` : nothing}
        <div class="actions">
          <button class="action" type="button" ?disabled=${this.disabled} @click=${this._refresh}>換一張</button>
          ${this.audioSrc
            ? html`
              <button class="action" type="button" ?disabled=${this.disabled} @click=${this._play}>語音播放</button>
              <audio src=${this.audioSrc} preload="none"></audio>`
            : nothing}
        </div>
        <input
          class="input ${hasError ? 'input--error' : ''}"
          id="input"
          type="text"
          .value=${this.value}
          autocomplete="off"
          autocapitalize="none"
          spellcheck="false"
          inputmode=${this.inputmode || nothing}
          maxlength=${this.maxlength > 0 ? this.maxlength : nothing}
          ?disabled=${this.disabled}
          aria-invalid=${hasError ? 'true' : nothing}
          aria-describedby=${describedBy || nothing}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-captcha': GovtwCaptcha;
  }
}
