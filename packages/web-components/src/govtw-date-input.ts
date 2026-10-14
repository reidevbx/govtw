import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

type Field = 'year' | 'month' | 'day';
const FIELDS: Field[] = ['year', 'month', 'day'];

/** 民國年與西元年的差 */
const ROC_OFFSET = 1911;

/**
 * govtw-date-input — 日期輸入
 *
 * 參考 GOV.UK Date input：https://design-system.service.gov.uk/components/date-input/
 *
 * 年、月、日三個數字欄位，包在元件自帶的 `<fieldset>` 中。台灣順序為「年 月 日」。
 * `calendar="roc"`（預設）年份欄為民國年，`calendar="gregorian"` 為西元年。
 *
 * 表單送出值：
 * - `{name}`：ISO 日期（如 `2026-10-14`）；日期不完整或不存在時為空字串
 * - `{name}-year`、`{name}-month`、`{name}-day`：使用者原始輸入，供伺服器驗證失敗時回填
 *
 * 元件不驗證日期是否合理；由作者或伺服器判斷後設定 `error`、`error-fields`。
 *
 * @example
 * <govtw-date-input name="birthday" legend="出生日期" hint="例如 78 7 2"></govtw-date-input>
 */
@customElement('govtw-date-input')
export class GovtwDateInput extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static formAssociated = true;

  /** 表單欄位名稱；三個原始值以 `{name}-year` 等名稱一併送出 */
  @property({ type: String }) name = '';

  /** 群組標題（fieldset 的 legend） */
  @property({ type: String }) legend = '';

  @property({ type: String }) hint = '';

  @property({ type: String }) error = '';

  /** 加紅框的欄位，空白分隔，如 `"day"`、`"month year"`；空值且有 error 時三欄都加 */
  @property({ type: String, attribute: 'error-fields' }) errorFields = '';

  /** 曆法：民國年或西元年 */
  @property({ type: String, reflect: true }) calendar: 'roc' | 'gregorian' = 'roc';

  /** ISO 日期（`YYYY-MM-DD`）。設定時會填入三個欄位 */
  @property({ type: String }) value = '';

  /** 設為 `bday` 時，月、日欄位加上生日自動填入；西元年時年份欄也加 */
  @property({ type: String }) autocomplete = '';

  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private parts: Record<Field, string> = { year: '', month: '', day: '' };

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static styles = css`
    :host {
      display: block;
      outline: none !important;
      font-family: var(--govtw-date-input-font-family);
      font-size: var(--govtw-date-input-font-size);
      color: var(--govtw-date-input-color);
    }

    fieldset {
      display: flex;
      flex-direction: column;
      gap: var(--govtw-date-input-stack-gap);
      min-inline-size: 0;
      margin: 0;
      padding: 0;
      border: 0;
    }

    .form-group--error {
      padding-inline-start: var(--govtw-date-input-field-gap);
      border-inline-start: 4px solid var(--govtw-date-input-error-color);
    }

    legend {
      padding: 0;
      margin-block-end: var(--govtw-date-input-stack-gap);
      font-size: var(--govtw-date-input-legend-font-size);
      font-weight: var(--govtw-date-input-legend-font-weight);
    }

    .hint {
      color: var(--govtw-date-input-hint-color);
    }

    .error-message {
      font-weight: var(--govtw-date-input-legend-font-weight);
      color: var(--govtw-date-input-error-color);
    }

    .fields {
      display: flex;
      flex-wrap: wrap;
      gap: var(--govtw-date-input-field-gap);
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: var(--govtw-date-input-label-gap);
    }

    input {
      box-sizing: border-box;
      margin: 0;
      padding: var(--govtw-date-input-padding);
      font: inherit;
      color: var(--govtw-date-input-color);
      background: var(--govtw-date-input-bg);
      border: 2px solid var(--govtw-date-input-border-color);
      border-radius: var(--govtw-date-input-border-radius);
      -webkit-appearance: none;
      appearance: none;
    }

    /* 寬度依位數：民國年 3 碼、西元年 4 碼、月日 2 碼 */
    .input--year { inline-size: calc(4ch + 2 * var(--govtw-date-input-padding) + 4px); }
    :host([calendar='gregorian']) .input--year { inline-size: calc(5ch + 2 * var(--govtw-date-input-padding) + 4px); }
    .input--month,
    .input--day { inline-size: calc(3ch + 2 * var(--govtw-date-input-padding) + 4px); }

    input:focus {
      outline: var(--govtw-date-input-focus-width) solid var(--govtw-date-input-focus-color);
      outline-offset: 0;
      box-shadow: inset 0 0 0 2px var(--govtw-date-input-border-color);
    }

    input[aria-invalid='true'] {
      border-color: var(--govtw-date-input-error-color);
    }

    input[aria-invalid='true']:focus {
      border-color: var(--govtw-date-input-border-color);
    }

    input:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;

  protected willUpdate(changed: PropertyValues<this>) {
    // 外部設定 value（ISO）時，拆成三個欄位；與目前欄位組出的值相同則不覆蓋使用者輸入
    if ((changed.has('value') || changed.has('calendar')) && this.value !== this.isoValue()) {
      this.parts = this.parseIso(this.value);
    }
  }

  protected updated() {
    this.syncFormValue();
  }

  formResetCallback() {
    this.value = '';
    this.parts = { year: '', month: '', day: '' };
  }

  /** 把 ISO 日期拆成欄位；格式不符時清空 */
  private parseIso(iso: string): Record<Field, string> {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    if (!match) return { year: '', month: '', day: '' };
    const year = Number(match[1]);
    return {
      year: String(this.calendar === 'roc' ? year - ROC_OFFSET : year),
      month: String(Number(match[2])),
      day: String(Number(match[3])),
    };
  }

  /** 由三個欄位組出 ISO 日期；不完整或日期不存在時回傳空字串 */
  private isoValue(): string {
    const { year, month, day } = this.parts;
    if (![year, month, day].every((part) => /^\d+$/.test(part))) return '';
    const y = Number(year) + (this.calendar === 'roc' ? ROC_OFFSET : 0);
    const m = Number(month);
    const d = Number(day);
    const date = new Date(Date.UTC(y, m - 1, d));
    const exists = date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
    if (!exists) return '';
    return `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }

  private syncFormValue() {
    if (!this.name) {
      this._internals.setFormValue(this.isoValue());
      return;
    }
    const data = new FormData();
    data.append(this.name, this.isoValue());
    for (const field of FIELDS) data.append(`${this.name}-${field}`, this.parts[field]);
    this._internals.setFormValue(data);
  }

  private handleInput(field: Field, event: Event) {
    this.parts = { ...this.parts, [field]: (event.target as HTMLInputElement).value };
    this.value = this.isoValue();
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }

  private handleChange() {
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private isFieldInError(field: Field): boolean {
    if (!this.error) return false;
    const listed = this.errorFields.split(/\s+/).filter(Boolean);
    return listed.length === 0 || listed.includes(field);
  }

  private autocompleteFor(field: Field) {
    if (this.autocomplete !== 'bday') return nothing;
    // 民國年與瀏覽器的生日年份（西元）格式不同，不加
    if (field === 'year' && this.calendar === 'roc') return nothing;
    return `bday-${field}`;
  }

  private renderField(field: Field, label: string) {
    return html`
      <div class="field">
        <label for=${field}>${label}</label>
        <input
          class="input--${field}"
          id=${field}
          type="text"
          inputmode="numeric"
          .value=${this.parts[field]}
          autocomplete=${this.autocompleteFor(field)}
          ?disabled=${this.disabled}
          aria-invalid=${this.isFieldInError(field) ? 'true' : nothing}
          @input=${(event: Event) => this.handleInput(field, event)}
          @change=${this.handleChange}
        />
      </div>
    `;
  }

  render() {
    const hasError = !!this.error;
    const describedBy = [this.hint ? 'hint' : '', hasError ? 'error' : ''].filter(Boolean).join(' ');
    const yearLabel = this.calendar === 'roc' ? '民國年' : '西元年';

    return html`
      <div class=${hasError ? 'form-group--error' : ''}>
        <fieldset aria-describedby=${describedBy || nothing}>
          ${this.legend ? html`<legend>${this.legend}</legend>` : nothing}
          ${this.hint ? html`<span class="hint" id="hint">${this.hint}</span>` : nothing}
          ${hasError ? html`<span class="error-message" id="error">${this.error}</span>` : nothing}
          <div class="fields">
            ${this.renderField('year', yearLabel)}
            ${this.renderField('month', '月')}
            ${this.renderField('day', '日')}
          </div>
        </fieldset>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-date-input': GovtwDateInput;
  }
}
