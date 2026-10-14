import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * govtw-skip-link — 跳至主要內容
 *
 * 參考 GOV.UK Skip link：https://design-system.service.gov.uk/components/skip-link/
 *
 * 放在頁面最前面，平時視覺隱藏，鍵盤聚焦時顯示。
 * 讓鍵盤與螢幕閱讀器使用者略過頁首與導覽，直接到主內容（WCAG 2.2 SC 2.4.1）。
 *
 * 點擊後把焦點移到目標元素；目標不可聚焦時暫時加 tabindex="-1"，失焦後移除。
 *
 * @example
 * <govtw-skip-link href="#main-content"></govtw-skip-link>
 * ...
 * <main id="main-content">...</main>
 */
@customElement('govtw-skip-link')
export class GovtwSkipLink extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** 主內容的錨點，格式為 #id */
  @property({ type: String }) href = '#main-content';

  static styles = css`
    :host {
      display: block;
      outline: none !important;
    }

    /* 未聚焦時視覺隱藏，但仍留在 Tab 順序與無障礙樹中 */
    :host(:not(:focus-within)) {
      position: absolute !important;
      inline-size: 1px !important;
      block-size: 1px !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      clip-path: inset(50%) !important;
      white-space: nowrap !important;
      border: 0 !important;
    }

    a {
      display: block;
      padding: var(--govtw-skip-link-padding-y) var(--govtw-skip-link-padding-x);
      font-family: inherit;
      font-size: var(--govtw-skip-link-font-size);
      line-height: inherit;
      color: var(--govtw-skip-link-color);
      background-color: var(--govtw-skip-link-bg);
      text-decoration-line: underline;
      text-decoration-thickness: var(--govtw-skip-link-underline-thickness);
      text-underline-offset: var(--govtw-skip-link-underline-offset);
    }

    /* 背景已是 focus 黃色，outline 透明保留給 Windows 高對比模式 */
    a:focus {
      outline: var(--govtw-skip-link-focus-width) solid transparent;
      outline-offset: 0;
    }
  `;

  private handleClick() {
    const id = decodeURIComponent(this.href.replace(/^#/, ''));
    if (!id) return;

    // 先在元件所在的 root 找（支援放在 Shadow DOM 內，如 DemoBlock），再退回 document
    const root = this.getRootNode() as Document | ShadowRoot;
    const target = root.getElementById?.(id) ?? document.getElementById(id);
    if (!target) return;

    const addedTabindex = !target.hasAttribute('tabindex');
    if (addedTabindex) {
      target.setAttribute('tabindex', '-1');
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
    target.focus();
  }

  render() {
    return html`<a href=${this.href} @click=${this.handleClick}><slot>跳至主要內容</slot></a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-skip-link': GovtwSkipLink;
  }
}
