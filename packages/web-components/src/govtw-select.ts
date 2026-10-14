import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

/**
 * govtw-select — 選擇清單
 *
 * 從預先定義的選項中讓使用者擇一。多數情況請優先使用 radio（≤6 項）
 * 或 autocomplete；select 適合「選項多到 radio 顯得擁擠、且使用者已知道想選什麼」。
 *
 * 選項以 light DOM 的 `<option>` / `<optgroup>` 傳入，元件會在 slotchange
 * 時 clone 進內部 `<select>`，與原生 HTML 用法一致。
 *
 * @example
 * <govtw-select name="country" label="國家">
 *   <option value="">請選擇</option>
 *   <option value="tw">台灣</option>
 *   <option value="jp">日本</option>
 * </govtw-select>
 */
@customElement('govtw-select')
export class GovtwSelect extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static formAssociated = true;

  @property({ type: String }) label = '';
  @property({ type: String }) hint = '';
  @property({ type: String }) error = '';
  @property({ type: String }) name = '';
  @property({ type: String }) value = '';
  @property({ type: String }) autocomplete = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  @query('select') private _select!: HTMLSelectElement;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static styles = css`
    :host {
      display: block;
      outline: none !important;
    }

    /*
     * GOV.UK-inspired select:
     * - 明確的 label + 可選的 hint / error
     * - 2px 邊框，focus 時黃色 ring + 黑色粗邊框
     * - error 時左側紅色邊線 + 紅色邊框
     * - 原生 <select>，依靠瀏覽器/作業系統的下拉 UI；箭頭自己畫（原生箭頭不受 padding 控制，會貼齊右邊框）
     */

    .form-group {
      margin-bottom: var(--govtw-spacing-6);
    }

    .form-group--error {
      border-left: 4px solid var(--govtw-select-error-color);
      padding-left: var(--govtw-spacing-4);
    }

    /* ===== Label ===== */
    .label {
      display: block;
      font-family: var(--govtw-select-font-family);
      font-size: var(--govtw-select-font-size);
      font-weight: 700;
      color: var(--govtw-select-color);
      margin-bottom: var(--govtw-spacing-1);
    }

    /* ===== Hint ===== */
    .hint {
      display: block;
      font-family: var(--govtw-select-font-family);
      font-size: var(--govtw-select-font-size);
      color: var(--govtw-select-hint-color);
      margin-bottom: var(--govtw-spacing-2);
    }

    /* ===== Error message ===== */
    .error-message {
      display: block;
      font-family: var(--govtw-select-font-family);
      font-size: var(--govtw-select-font-size);
      font-weight: 700;
      color: var(--govtw-select-error-color);
      margin-bottom: var(--govtw-spacing-2);
    }

    /* ===== Select ===== */
    .select-wrapper {
      position: relative;
      display: inline-block;
      max-width: 100%;
    }

    /* 向下箭頭：用文字色的邊框畫，深色主題跟著變色；強制色彩模式下邊框會改用系統色 */
    .select-wrapper::after {
      content: '';
      position: absolute;
      inset-inline-end: var(--govtw-spacing-3);
      top: 50%;
      inline-size: 0.45em;
      block-size: 0.45em;
      border-block-end: 2px solid var(--govtw-select-color);
      border-inline-end: 2px solid var(--govtw-select-color);
      transform: translateY(-75%) rotate(45deg);
      pointer-events: none;
    }

    .select-wrapper--disabled::after {
      opacity: 0.5;
    }

    .select {
      -webkit-appearance: none;
      appearance: none;
      font-family: var(--govtw-select-font-family);
      font-size: var(--govtw-select-font-size);
      line-height: 1.5;
      color: var(--govtw-select-color);
      background: var(--govtw-select-bg);
      border: 2px solid var(--govtw-select-border-color);
      border-radius: var(--govtw-select-border-radius);
      padding: var(--govtw-spacing-2);
      /* 右側留出箭頭空間，選項文字不會壓到箭頭 */
      padding-inline-end: calc(var(--govtw-spacing-3) * 2 + 0.45em);
      max-width: 100%;
      box-sizing: border-box;
      margin: 0;
    }

    /* ===== Focus — 黃色 ring + 黑色粗邊框 ===== */
    .select:focus {
      outline: var(--govtw-select-focus-width) solid var(--govtw-select-focus-color);
      outline-offset: 0;
      border-color: var(--govtw-select-border-color);
      box-shadow: inset 0 0 0 1px var(--govtw-select-border-color);
    }

    /* ===== Error ===== */
    .select--error {
      border-color: var(--govtw-select-error-color);
    }

    .select--error:focus {
      border-color: var(--govtw-select-border-color);
    }

    /* ===== Disabled ===== */
    .select:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--govtw-select-disabled-bg);
    }

    /* light DOM 的 <option> 透過 hidden slot 接收，不顯示在元件外觀上 */
    slot {
      display: none;
    }
  `;

  private _handleSlotChange(e: Event) {
    if (!this._select) return;
    const slot = e.target as HTMLSlotElement;
    const elements = slot.assignedElements({ flatten: false });

    this._select.replaceChildren(
      ...elements
        .filter((el) => el.tagName === 'OPTION' || el.tagName === 'OPTGROUP')
        .map((el) => el.cloneNode(true)),
    );

    if (this.value) {
      this._select.value = this.value;
      this._internals.setFormValue(this.value);
    } else {
      this.value = this._select.value;
    }
  }

  private _handleChange(e: Event) {
    this.value = (e.target as HTMLSelectElement).value;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('value')) {
      this._internals.setFormValue(this.value);
      if (this._select && this._select.value !== this.value) {
        this._select.value = this.value;
      }
    }
  }

  formResetCallback() {
    if (!this._select) return;
    for (const opt of this._select.querySelectorAll('option')) {
      opt.selected = opt.defaultSelected;
    }
    this.value = this._select.value;
  }

  render() {
    const hasError = !!this.error;
    const selectId = 'select';
    const hintId = 'hint';
    const errorId = 'error';

    const describedBy = [
      this.hint ? hintId : '',
      hasError ? errorId : '',
    ].filter(Boolean).join(' ') || undefined;

    return html`
      <div class="form-group ${hasError ? 'form-group--error' : ''}">
        ${this.label
          ? html`<label class="label" for=${selectId}>${this.label}</label>`
          : nothing}
        ${this.hint
          ? html`<span class="hint" id=${hintId}>${this.hint}</span>`
          : nothing}
        ${hasError
          ? html`<span class="error-message" id=${errorId}>${this.error}</span>`
          : nothing}
        <span class="select-wrapper ${this.disabled ? 'select-wrapper--disabled' : ''}"><select
          class="select ${hasError ? 'select--error' : ''}"
          id=${selectId}
          name=${this.name || nothing}
          autocomplete=${this.autocomplete || nothing}
          ?disabled=${this.disabled}
          aria-invalid=${hasError ? 'true' : nothing}
          aria-describedby=${describedBy || nothing}
          @change=${this._handleChange}
        ></select></span>
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-select': GovtwSelect;
  }
}
