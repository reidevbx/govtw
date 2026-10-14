import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

type FontSize = 'small' | 'medium' | 'large';

const SIZES: { value: FontSize; label: string }[] = [
  { value: 'small', label: '小' },
  { value: 'medium', label: '中' },
  { value: 'large', label: '大' },
];

const ATTRIBUTE = 'data-font-size';

function isFontSize(value: unknown): value is FontSize {
  return value === 'small' || value === 'medium' || value === 'large';
}

/**
 * govtw-font-size-switcher — 字級切換
 *
 * 參考來源：台灣政府網站調查（GOV.UK 不提供此元件；WCAG 不要求，瀏覽器本身可縮放）
 *
 * 三個 `<button aria-pressed>`：小、中、大。切換時在 `<html>` 設 `data-font-size`，
 * `tokens.css` 依此把根字級設為 87.5%／100%／125%；所有以 rem 定義的字級一起縮放。
 *
 * - 選擇存到 localStorage（`storage-key`），下次載入自動套用；儲存失敗時不影響使用
 * - 同一頁有多個切換器時（如頁首與頁尾），會互相同步
 * - 切換時發出 `govtw-change` 事件，`detail.size` 為 `small`、`medium` 或 `large`
 *
 * @example
 * <govtw-font-size-switcher></govtw-font-size-switcher>
 */
@customElement('govtw-font-size-switcher')
export class GovtwFontSizeSwitcher extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** 群組的可讀名稱與可見標籤 */
  @property({ type: String }) label = '字級';

  /** localStorage 的 key；設為空字串時不儲存 */
  @property({ type: String, attribute: 'storage-key' }) storageKey = 'govtw-font-size';

  @state() private size: FontSize = 'medium';

  private observer?: MutationObserver;

  static styles = css`
    :host {
      display: block;
      outline: none !important;
      font-size: var(--govtw-font-size-switcher-font-size);
      color: var(--govtw-font-size-switcher-color);
    }

    .group {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--govtw-font-size-switcher-gap);
    }

    .label {
      color: var(--govtw-font-size-switcher-label-color);
    }

    button {
      min-inline-size: var(--govtw-font-size-switcher-button-size);
      min-block-size: var(--govtw-font-size-switcher-button-size);
      padding: 0;
      font: inherit;
      color: var(--govtw-font-size-switcher-button-color);
      background: var(--govtw-font-size-switcher-button-bg);
      border: 2px solid var(--govtw-font-size-switcher-button-border-color);
      border-radius: var(--govtw-font-size-switcher-button-border-radius);
      cursor: pointer;
    }

    /* 目前字級：反白加粗體，不只靠顏色 */
    button[aria-pressed='true'] {
      font-weight: var(--govtw-font-size-switcher-pressed-font-weight);
      color: var(--govtw-font-size-switcher-pressed-color);
      background: var(--govtw-font-size-switcher-pressed-bg);
      border-color: var(--govtw-font-size-switcher-pressed-bg);
    }

    button:focus-visible {
      outline: var(--govtw-font-size-switcher-focus-width) solid transparent;
      color: var(--govtw-font-size-switcher-focus-text);
      background: var(--govtw-font-size-switcher-focus-color);
      border-color: var(--govtw-font-size-switcher-focus-text);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    const root = document.documentElement;
    const current = root.getAttribute(ATTRIBUTE);
    if (isFontSize(current)) {
      this.size = current;
    } else {
      const stored = this.readStorage();
      if (isFontSize(stored)) {
        this.size = stored;
        root.setAttribute(ATTRIBUTE, stored);
      }
    }
    // 其他切換器或作者的程式改了 <html> 屬性時同步狀態
    this.observer = new MutationObserver(() => {
      const value = root.getAttribute(ATTRIBUTE);
      this.size = isFontSize(value) ? value : 'medium';
    });
    this.observer.observe(root, { attributes: true, attributeFilter: [ATTRIBUTE] });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer?.disconnect();
  }

  private readStorage(): string | null {
    if (!this.storageKey) return null;
    try {
      return localStorage.getItem(this.storageKey);
    } catch {
      return null;
    }
  }

  private writeStorage(size: FontSize) {
    if (!this.storageKey) return;
    try {
      localStorage.setItem(this.storageKey, size);
    } catch {
      // 私密瀏覽或停用儲存時寫入會失敗；字級仍會套用到本頁
    }
  }

  private select(size: FontSize) {
    if (size === this.size) return;
    this.size = size;
    document.documentElement.setAttribute(ATTRIBUTE, size);
    this.writeStorage(size);
    this.dispatchEvent(new CustomEvent('govtw-change', { detail: { size }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="group" role="group" aria-labelledby="label">
        <span class="label" id="label">${this.label}</span>
        ${SIZES.map(({ value, label }) => html`
          <button
            type="button"
            aria-pressed=${this.size === value ? 'true' : 'false'}
            @click=${() => this.select(value)}
          >${label}</button>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-font-size-switcher': GovtwFontSizeSwitcher;
  }
}
