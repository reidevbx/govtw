import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * govtw-panel — 完成面板
 *
 * 參考 GOV.UK Panel：https://design-system.service.gov.uk/components/panel/
 *
 * 交易完成頁最上方的醒目區塊，顯示「申請已送出」與案件編號。一頁只放一個。
 * 標題由作者以 `slot="title"` 傳入 `<h1>`；元件把標題顏色改為繼承面板文字色。
 *
 * @example
 * <govtw-panel>
 *   <h1 slot="title">申請已送出</h1>
 *   案件編號<br><strong>A1150001234</strong>
 * </govtw-panel>
 */
@customElement('govtw-panel')
export class GovtwPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .panel {
      display: flex;
      flex-direction: column;
      gap: var(--govtw-panel-gap);
      padding: var(--govtw-panel-padding);
      font-size: var(--govtw-panel-font-size);
      text-align: center;
      color: var(--govtw-panel-color);
      background: var(--govtw-panel-bg);
      /* Windows 高對比模式下保留邊界 */
      border: 5px solid transparent;
    }

    /* tokens.css 給 h1 設了文字色與 margin，這裡改為繼承面板樣式 */
    ::slotted([slot='title']) {
      margin: 0;
      color: inherit;
    }
  `;

  render() {
    return html`
      <div class="panel">
        <slot name="title"></slot>
        <div><slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-panel': GovtwPanel;
  }
}
