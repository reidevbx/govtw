import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

/**
 * govtw-file-upload — 檔案上傳
 *
 * 參考 GOV.UK File upload：https://design-system.service.gov.uk/components/file-upload/
 *
 * 包住原生 `<input type="file">`，只加標籤、提示、錯誤與樣式。
 *
 * - 不提供拖放區；原生欄位在所有瀏覽器與輔助科技都能操作
 * - 不檢查檔案大小與格式；`accept` 交給瀏覽器篩選，錯誤由作者或伺服器判斷後設定 `error`
 * - 表單送出時，所有選取的檔案以 `name` 為欄位名稱送出
 *
 * @example
 * <govtw-file-upload name="photo" label="上傳照片" hint="JPG 或 PNG，10 MB 以內" accept=".jpg,.png"></govtw-file-upload>
 */
@customElement('govtw-file-upload')
export class GovtwFileUpload extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static formAssociated = true;

  @property({ type: String }) name = '';
  @property({ type: String }) label = '';

  /** 建議寫允許的格式與大小上限 */
  @property({ type: String }) hint = '';

  @property({ type: String }) error = '';

  /** 允許的副檔名或 MIME type，如 `.pdf,.jpg` */
  @property({ type: String }) accept = '';

  @property({ type: Boolean }) multiple = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  @query('input') private input?: HTMLInputElement;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  /** 目前選取的檔案 */
  get files(): FileList | null {
    return this.input?.files ?? null;
  }

  static styles = css`
    :host {
      display: block;
      outline: none !important;
      font-family: var(--govtw-file-upload-font-family);
      font-size: var(--govtw-file-upload-font-size);
      color: var(--govtw-file-upload-color);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--govtw-file-upload-stack-gap);
    }

    .form-group--error {
      padding-inline-start: var(--govtw-file-upload-error-padding);
      border-inline-start: 4px solid var(--govtw-file-upload-error-color);
    }

    .label {
      font-weight: var(--govtw-file-upload-label-font-weight);
    }

    .hint {
      color: var(--govtw-file-upload-hint-color);
    }

    .error-message {
      font-weight: var(--govtw-file-upload-label-font-weight);
      color: var(--govtw-file-upload-error-color);
    }

    input {
      max-inline-size: 100%;
      margin: 0;
      font: inherit;
      color: inherit;
    }

    input::file-selector-button {
      min-block-size: 44px;
      margin-inline-end: var(--govtw-file-upload-button-gap);
      padding: 0 var(--govtw-file-upload-button-padding-x);
      font: inherit;
      color: var(--govtw-file-upload-button-color);
      background: var(--govtw-file-upload-button-bg);
      border: 2px solid var(--govtw-file-upload-button-border-color);
      border-radius: var(--govtw-file-upload-button-border-radius);
      cursor: pointer;
    }

    input:focus {
      outline: var(--govtw-file-upload-focus-width) solid var(--govtw-file-upload-focus-color);
      outline-offset: 0;
      box-shadow: inset 0 0 0 4px var(--govtw-file-upload-focus-text);
    }

    input:focus::file-selector-button {
      color: var(--govtw-file-upload-focus-text);
      background: var(--govtw-file-upload-focus-color);
      border-color: var(--govtw-file-upload-focus-text);
    }

    .input--error::file-selector-button {
      border-color: var(--govtw-file-upload-error-color);
    }

    input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    input:disabled::file-selector-button {
      cursor: not-allowed;
    }
  `;

  formResetCallback() {
    if (this.input) this.input.value = '';
    this._syncFormValue();
  }

  private _syncFormValue() {
    const files = this.input?.files;
    if (!files?.length) {
      this._internals.setFormValue(null);
      return;
    }
    const data = new FormData();
    for (const file of files) data.append(this.name, file);
    this._internals.setFormValue(data);
  }

  private _handleChange() {
    this._syncFormValue();
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  render() {
    const hasError = !!this.error;
    const describedBy = [this.hint ? 'hint' : '', hasError ? 'error' : ''].filter(Boolean).join(' ');

    return html`
      <div class="form-group ${hasError ? 'form-group--error' : ''}">
        ${this.label ? html`<label class="label" for="input">${this.label}</label>` : nothing}
        ${this.hint ? html`<span class="hint" id="hint">${this.hint}</span>` : nothing}
        ${hasError ? html`<span class="error-message" id="error">${this.error}</span>` : nothing}
        <input
          class=${hasError ? 'input--error' : ''}
          id="input"
          type="file"
          accept=${this.accept || nothing}
          ?multiple=${this.multiple}
          ?disabled=${this.disabled}
          aria-invalid=${hasError ? 'true' : nothing}
          aria-describedby=${describedBy || nothing}
          @change=${this._handleChange}
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-file-upload': GovtwFileUpload;
  }
}
