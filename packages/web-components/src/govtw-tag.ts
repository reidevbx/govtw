import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * govtw-tag — 標籤
 *
 * 參考 GOV.UK Tag：https://design-system.service.gov.uk/components/tag/
 *
 * 顯示項目的狀態或分類（如「審核中」「已完成」）。純顯示，不可點擊。
 * 顏色只是輔助，文字本身要能表達狀態。
 *
 * @example
 * <govtw-tag color="green">已完成</govtw-tag>
 */
@customElement('govtw-tag')
export class GovtwTag extends LitElement {
  /** 顏色 */
  @property({ type: String, reflect: true }) color: 'grey' | 'blue' | 'green' | 'yellow' | 'red' = 'grey';

  static styles = css`
    :host {
      display: inline-block;
      padding: var(--govtw-tag-padding-y) var(--govtw-tag-padding-x);
      font-size: var(--govtw-tag-font-size);
      font-weight: var(--govtw-tag-font-weight);
      line-height: 1.25;
      color: var(--govtw-tag-grey-color);
      background-color: var(--govtw-tag-grey-bg);
      border-radius: var(--govtw-tag-border-radius);
      /* Windows 高對比模式下保留邊界 */
      outline: 1px solid transparent;
    }

    :host([color='blue']) {
      color: var(--govtw-tag-blue-color);
      background-color: var(--govtw-tag-blue-bg);
    }

    :host([color='green']) {
      color: var(--govtw-tag-green-color);
      background-color: var(--govtw-tag-green-bg);
    }

    :host([color='yellow']) {
      color: var(--govtw-tag-yellow-color);
      background-color: var(--govtw-tag-yellow-bg);
    }

    :host([color='red']) {
      color: var(--govtw-tag-red-color);
      background-color: var(--govtw-tag-red-bg);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-tag': GovtwTag;
  }
}
