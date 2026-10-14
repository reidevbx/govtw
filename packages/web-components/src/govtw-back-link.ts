import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * govtw-back-link — 返回連結
 *
 * 參考 GOV.UK Back link：https://design-system.service.gov.uk/components/back-link/
 *
 * 放在多步驟表單頁面頂端，讓使用者回到上一步。`href` 必填，指向實際的上一步網址；
 * 不提供 `history.back()`，因為使用者可能從其他網站或書籤直接進入此頁。
 *
 * @example
 * <govtw-back-link href="/apply/step-1"></govtw-back-link>
 */
@customElement('govtw-back-link')
export class GovtwBackLink extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** 上一步的網址（必填） */
  @property({ type: String }) href = '';

  static styles = css`
    :host {
      display: inline-block;
      outline: none !important;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: var(--govtw-back-link-gap);
      font-size: var(--govtw-back-link-font-size);
      color: var(--govtw-back-link-color);
      text-decoration-line: underline;
      text-decoration-thickness: var(--govtw-back-link-underline-thickness);
      text-underline-offset: var(--govtw-back-link-underline-offset);
    }

    /* 左箭頭：CSS 畫的，不是文字 */
    a::before {
      content: '';
      display: inline-block;
      inline-size: var(--govtw-back-link-chevron-size);
      block-size: var(--govtw-back-link-chevron-size);
      border-block-start: 1px solid currentColor;
      border-inline-start: 1px solid currentColor;
      transform: rotate(-45deg);
    }

    a:focus-visible {
      outline: var(--govtw-back-link-focus-width) solid transparent;
      color: var(--govtw-back-link-focus-color);
      background-color: var(--govtw-back-link-focus-bg);
      text-decoration: none;
      box-shadow: 0 -2px var(--govtw-back-link-focus-bg), 0 4px var(--govtw-back-link-focus-color);
    }
  `;

  render() {
    if (!this.href) {
      console.warn('[govtw-back-link] 缺少必填屬性 href，不渲染連結。', this);
      return nothing;
    }
    return html`<a href=${this.href}><slot>返回</slot></a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-back-link': GovtwBackLink;
  }
}
