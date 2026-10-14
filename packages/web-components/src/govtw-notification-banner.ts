import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const DEFAULT_HEADING = { info: '重要訊息', success: '成功' } as const;

/**
 * govtw-notification-banner — 通知橫幅
 *
 * 參考 GOV.UK Notification banner：https://design-system.service.gov.uk/components/notification-banner/
 *
 * 頁面頂端的公告，如系統維護、反詐騙提醒（info），或操作成功（success）。
 * - info：`role="region"` 地標
 * - success：`role="alert"`，出現時自動取得焦點，螢幕閱讀器立即念出
 *
 * 加 `dismissible` 才顯示關閉按鈕（GOV.UK 不支援，台灣維護公告常見）。
 * 按下時發出可取消的 `govtw-dismiss` 事件；未取消則隱藏元件。元件不記住關閉狀態。
 *
 * @example
 * <govtw-notification-banner>本網站將於 115 年 10 月 15 日 17:00–20:00 暫停服務。</govtw-notification-banner>
 */
@customElement('govtw-notification-banner')
export class GovtwNotificationBanner extends LitElement {
  /** 類型 */
  @property({ type: String, reflect: true }) type: 'info' | 'success' = 'info';

  /** 標題；預設 info 為「重要訊息」、success 為「成功」 */
  @property({ type: String }) heading = '';

  /** 顯示關閉按鈕 */
  @property({ type: Boolean, reflect: true }) dismissible = false;

  /** success 類型不自動取得焦點（與 error-summary 一致） */
  @property({ type: Boolean, attribute: 'no-autofocus' }) noAutofocus = false;

  static styles = css`
    :host {
      display: block;
      --_color: var(--govtw-notification-banner-info-color);
    }

    :host([type='success']) {
      --_color: var(--govtw-notification-banner-success-color);
    }

    :host([hidden]) {
      display: none;
    }

    .banner {
      border: var(--govtw-notification-banner-border-width) solid var(--_color);
      background: var(--_color);
    }

    .banner:focus {
      outline: var(--govtw-notification-banner-focus-width) solid var(--govtw-notification-banner-focus-color);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--govtw-notification-banner-header-padding-y) var(--govtw-notification-banner-header-padding-x);
      color: var(--govtw-notification-banner-header-color);
    }

    h2 {
      margin: 0;
      font-size: inherit;
      font-weight: var(--govtw-notification-banner-header-font-weight);
      line-height: 1.5;
      color: inherit;
    }

    .dismiss {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--govtw-notification-banner-dismiss-size);
      block-size: var(--govtw-notification-banner-dismiss-size);
      margin-block: calc((var(--govtw-notification-banner-dismiss-size) - 1.5em) / -2);
      padding: 0;
      font: inherit;
      font-size: 1.5em;
      line-height: 1;
      color: inherit;
      background: none;
      border: 2px solid transparent;
      cursor: pointer;
    }

    .dismiss:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--govtw-notification-banner-focus-width) var(--govtw-notification-banner-focus-color);
    }

    .body {
      padding: var(--govtw-notification-banner-body-padding);
      color: var(--govtw-notification-banner-body-color);
      background: var(--govtw-notification-banner-body-bg);
    }

    ::slotted(:first-child) {
      margin-block-start: 0;
    }

    ::slotted(:last-child) {
      margin-block-end: 0;
    }
  `;

  protected firstUpdated() {
    if (this.type === 'success' && !this.noAutofocus) {
      this.renderRoot.querySelector<HTMLElement>('.banner')?.focus();
    }
  }

  private handleDismiss() {
    const proceed = this.dispatchEvent(
      new CustomEvent('govtw-dismiss', { bubbles: true, composed: true, cancelable: true }),
    );
    if (proceed) this.hidden = true;
  }

  render() {
    const isSuccess = this.type === 'success';
    const heading = this.heading || DEFAULT_HEADING[this.type] || DEFAULT_HEADING.info;
    return html`
      <div
        class="banner"
        role=${isSuccess ? 'alert' : 'region'}
        aria-labelledby="heading"
        tabindex=${isSuccess ? '-1' : nothing}
      >
        <div class="header">
          <h2 id="heading">${heading}</h2>
          ${this.dismissible
            ? html`<button class="dismiss" type="button" aria-label="關閉通知" @click=${this.handleDismiss}><span aria-hidden="true">×</span></button>`
            : nothing}
        </div>
        <div class="body"><slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-notification-banner': GovtwNotificationBanner;
  }
}
