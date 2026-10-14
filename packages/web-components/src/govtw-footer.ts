import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

/**
 * govtw-footer — 頁尾
 *
 * 參考 GOV.UK Footer：https://design-system.service.gov.uk/components/footer/
 *
 * 只負責版面。台灣政府網站頁尾的固定內容（機關資訊、政策連結、無障礙標章、更新日期）
 * 由作者以 named slot 傳入。寬度不足時標章自動換到下一行。
 *
 * Slots：
 * - default：放在頁尾最前面，供導盲磚等定位點使用（與 header 一致）
 * - navigation：網站地圖連結群組（選用）；有內容時下方顯示分隔線
 * - contact：機關名稱、地址、電話、服務時間
 * - meta：政策連結（隱私權政策、資訊安全政策、政府網站資料開放宣告）
 * - updated：更新日期，建議用 `<time datetime>`
 * - badge：無障礙標章
 *
 * @example
 * <govtw-footer>
 *   <govtw-accesskey key="Z" label="下方功能區塊"></govtw-accesskey>
 *   <address slot="contact">數位發展部｜100057 臺北市中正區延平南路 143 號</address>
 *   <ul slot="meta">…</ul>
 *   <p slot="updated">更新日期：<time datetime="2026-10-14">115-10-14</time></p>
 *   <a slot="badge" href="…"><img src="…" alt="通過 AA 等級無障礙網頁檢測"></a>
 * </govtw-footer>
 */
@customElement('govtw-footer')
export class GovtwFooter extends LitElement {
  /** navigation slot 是否有內容，用來決定是否顯示分隔線 */
  @state() private hasNavigation = false;

  static styles = css`
    :host {
      display: block;
      font-size: var(--govtw-footer-font-size);
      color: var(--govtw-footer-color);
      background: var(--govtw-footer-bg);
      border-block-start: var(--govtw-footer-border-width) solid var(--govtw-footer-border-color);
    }

    footer {
      display: block;
    }

    .inner {
      display: flex;
      flex-direction: column;
      gap: var(--govtw-footer-gap);
      max-inline-size: var(--govtw-footer-max-width);
      margin-inline: auto;
      padding: var(--govtw-footer-padding-y) var(--govtw-footer-padding-x);
    }

    .navigation[hidden] {
      display: none;
    }

    .navigation {
      padding-block-end: var(--govtw-footer-gap);
      border-block-end: var(--govtw-footer-divider-width) solid var(--govtw-footer-divider-color);
    }

    .main {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--govtw-footer-gap);
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: var(--govtw-footer-gap);
      flex: 1 1 var(--govtw-footer-info-min-width);
    }

    /* 內容首尾的 margin 由 gap 控制，避免雙倍空隙 */
    ::slotted(*) {
      margin-block: 0;
    }
  `;

  private handleNavigationSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    this.hasNavigation = slot.assignedElements().length > 0;
  }

  render() {
    return html`
      <footer>
        <div class="inner">
          <slot></slot>
          <div class="navigation" ?hidden=${!this.hasNavigation}>
            <slot name="navigation" @slotchange=${this.handleNavigationSlotChange}></slot>
          </div>
          <div class="main">
            <div class="info">
              <slot name="contact"></slot>
              <slot name="meta"></slot>
              <slot name="updated"></slot>
            </div>
            <slot name="badge"></slot>
          </div>
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-footer': GovtwFooter;
  }
}
