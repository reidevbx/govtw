import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * govtw-warning-text — 警告文字
 *
 * 參考 GOV.UK Warning text：https://design-system.service.gov.uk/components/warning-text/
 *
 * 驚嘆號圖示加粗體文字，提醒使用者不照做會有後果（如「密碼輸錯 3 次將鎖定」）。
 * 圖示 aria-hidden；文字前加視覺隱藏的「警告：」，讓螢幕閱讀器使用者也知道這是警告。
 *
 * @example
 * <govtw-warning-text>密碼連續輸錯 3 次，帳號將被鎖定 30 分鐘。</govtw-warning-text>
 */
@customElement('govtw-warning-text')
export class GovtwWarningText extends LitElement {
  /** 視覺隱藏的前綴文字，螢幕閱讀器會先念 */
  @property({ type: String, attribute: 'icon-label' }) iconLabel = '警告';

  static styles = css`
    :host {
      display: block;
    }

    .warning-text {
      display: flex;
      align-items: center;
      gap: var(--govtw-warning-text-gap);
      font-size: var(--govtw-warning-text-font-size);
      font-weight: var(--govtw-warning-text-font-weight);
      color: var(--govtw-warning-text-color);
    }

    .icon {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      inline-size: var(--govtw-warning-text-icon-size);
      block-size: var(--govtw-warning-text-icon-size);
      font-size: var(--govtw-warning-text-icon-font-size);
      font-weight: var(--govtw-warning-text-font-weight);
      line-height: 1;
      color: var(--govtw-warning-text-icon-color);
      background: var(--govtw-warning-text-icon-bg);
      border-radius: 50%;
      /* Windows 高對比模式下保留圓形邊界 */
      outline: 2px solid transparent;
      outline-offset: -2px;
      forced-color-adjust: none;
    }

    .label {
      position: absolute;
      inline-size: 1px;
      block-size: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
  `;

  render() {
    return html`
      <div class="warning-text">
        <span class="icon" aria-hidden="true">!</span>
        <strong><span class="label">${this.iconLabel}：</span><slot></slot></strong>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-warning-text': GovtwWarningText;
  }
}
