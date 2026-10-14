import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * govtw-details — 可展開說明
 *
 * 參考 GOV.UK Details：https://design-system.service.gov.uk/components/details/
 *
 * 收起不是每個人都需要的說明，點摘要文字展開。Shadow DOM 內使用原生 `<details>` / `<summary>`，
 * 鍵盤操作與螢幕閱讀器的展開狀態由瀏覽器提供。
 *
 * @example
 * <govtw-details summary="找不到身分證字號？">
 *   <p>身分證字號在國民身分證正面右上角…</p>
 * </govtw-details>
 */
@customElement('govtw-details')
export class GovtwDetails extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** 摘要文字（點擊展開的那一行） */
  @property({ type: String }) summary = '';

  /** 是否展開；與原生 details 的狀態同步 */
  @property({ type: Boolean, reflect: true }) open = false;

  static styles = css`
    :host {
      display: block;
      outline: none !important;
    }

    summary {
      display: inline-block;
      cursor: pointer;
      color: var(--govtw-details-summary-color);
      text-decoration-line: underline;
      text-decoration-thickness: var(--govtw-details-underline-thickness);
      text-underline-offset: var(--govtw-details-underline-offset);
    }

    /* 用 ::before 畫三角形，取代各瀏覽器不一致的原生 marker */
    summary::-webkit-details-marker {
      display: none;
    }

    summary::before {
      content: '';
      display: inline-block;
      margin-inline-end: var(--govtw-details-gap);
      border-block: 0.35em solid transparent;
      border-inline-start: 0.6em solid currentColor;
      vertical-align: 0.05em;
    }

    details[open] > summary::before {
      border-inline: 0.35em solid transparent;
      border-block: 0.6em solid currentColor;
      border-block-end: 0;
      vertical-align: 0.15em;
    }

    summary:hover {
      text-decoration-thickness: var(--govtw-details-hover-underline-thickness);
    }

    summary:focus-visible {
      outline: var(--govtw-details-focus-width) solid transparent;
      color: var(--govtw-details-focus-color);
      background-color: var(--govtw-details-focus-bg);
      text-decoration: none;
      box-shadow: 0 -2px var(--govtw-details-focus-bg), 0 4px var(--govtw-details-focus-color);
    }

    .content {
      margin-block-start: var(--govtw-details-gap);
      padding: var(--govtw-details-content-padding);
      border-inline-start: var(--govtw-details-content-border-width) solid var(--govtw-details-content-border-color);
    }

    ::slotted(:first-child) {
      margin-block-start: 0;
    }

    ::slotted(:last-child) {
      margin-block-end: 0;
    }
  `;

  private handleToggle(event: Event) {
    this.open = (event.target as HTMLDetailsElement).open;
  }

  render() {
    return html`
      <details ?open=${this.open} @toggle=${this.handleToggle}>
        <summary>${this.summary}</summary>
        <div class="content"><slot></slot></div>
      </details>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-details': GovtwDetails;
  }
}
