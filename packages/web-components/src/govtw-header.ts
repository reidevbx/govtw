import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * govtw-header — 頁首
 *
 * 參考 GOV.UK Header：https://design-system.service.gov.uk/components/header/
 *
 * 只負責版面：logo、服務名稱、工具列、主選單四個區域。內容由作者以 named slot 傳入。
 * 寬度不足時工具列自動換到下一行（flex-wrap），不需要 media query。
 *
 * Slots：
 * - default：放在 logo 前面，供導盲磚等定位點使用
 * - logo：機關 logo（通常是包著 `<img>` 的首頁連結）
 * - service-name：服務或網站名稱
 * - tools：工具列（語言切換、字級切換、搜尋等），建議最多 5 項
 * - navigation：主選單，放 `<govtw-service-navigation>`
 *
 * @example
 * <govtw-header>
 *   <govtw-accesskey key="U" label="上方功能區塊"></govtw-accesskey>
 *   <a slot="logo" href="/"><img src="/logo.svg" alt="數位發展部"></a>
 *   <span slot="service-name">線上申辦服務</span>
 *   <govtw-search slot="tools" label="搜尋本網站" hide-label></govtw-search>
 *   <govtw-service-navigation slot="navigation">…</govtw-service-navigation>
 * </govtw-header>
 */
@customElement('govtw-header')
export class GovtwHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: var(--govtw-header-bg);
    }

    header {
      display: block;
    }

    .inner {
      max-inline-size: var(--govtw-header-max-width);
      margin-inline: auto;
      padding-inline: var(--govtw-header-padding-x);
    }

    .bar {
      border-block-end: var(--govtw-header-border-width) solid var(--govtw-header-border-color);
    }

    .bar > .inner {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--govtw-header-gap);
      padding-block: var(--govtw-header-padding-y);
    }

    .brand {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--govtw-header-gap);
    }

    .tools {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--govtw-header-gap);
    }

    ::slotted([slot='service-name']) {
      font-size: var(--govtw-header-service-name-font-size);
      font-weight: var(--govtw-header-service-name-font-weight);
      color: var(--govtw-header-service-name-color);
    }
  `;

  render() {
    return html`
      <header>
        <div class="bar">
          <div class="inner">
            <div class="brand">
              <slot></slot>
              <slot name="logo"></slot>
              <slot name="service-name"></slot>
            </div>
            <div class="tools">
              <slot name="tools"></slot>
            </div>
          </div>
        </div>
        <div class="inner">
          <slot name="navigation"></slot>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-header': GovtwHeader;
  }
}
