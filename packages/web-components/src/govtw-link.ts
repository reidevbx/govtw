import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('govtw-link')
export class GovtwLink extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: String }) href = '';
  @property({ type: String }) target = '';
  @property({ type: String }) rel = '';
  @property({ type: Boolean, reflect: true, attribute: 'no-visited' }) noVisited = false;
  @property({ type: Boolean, reflect: true, attribute: 'no-underline' }) noUnderline = false;
  /** target="_blank" 時不自動加「（另開新視窗）」。只在連結周圍已有說明時使用 */
  @property({ type: Boolean, attribute: 'no-new-window-text' }) noNewWindowText = false;

  static styles = css`
    :host {
      display: inline;
      outline: none !important;
    }

    /*
     * GOV.UK-inspired link technique:
     * - 預設：底線 1px，色彩為品牌連結色
     * - hover：底線加粗至 3px，顏色加深
     * - focus：黃色背景 + 黑色粗底線，移除原本底線
     * - visited：紫色，可用 no-visited 屬性關閉
     * - active：顏色加深
     */

    a {
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      color: var(--govtw-link-color);
      text-decoration-line: underline;
      text-decoration-thickness: var(--govtw-link-underline-thickness);
      text-decoration-skip-ink: none;
      text-underline-offset: var(--govtw-link-underline-offset);
      cursor: pointer;
    }

    a:visited {
      color: var(--govtw-link-visited-color);
    }

    :host([no-visited]) a:visited {
      color: var(--govtw-link-color);
    }

    :host([no-underline]) a {
      text-decoration-line: none;
    }

    :host([no-underline]) a:hover {
      text-decoration-line: underline;
    }

    a:hover {
      color: var(--govtw-link-hover-color);
      text-decoration-thickness: var(--govtw-link-hover-underline-thickness);
    }

    /*
     * Focus & Active — GOV.UK 雙色指標：
     * 黃色背景 (#fd0) + 黑色粗底線
     * 確保在任何背景色上都有足夠對比度
     */
    a:active,
    a:focus-visible,
    a:visited:active,
    a:visited:focus-visible,
    :host([no-visited]) a:visited:active,
    :host([no-visited]) a:visited:focus-visible {
      outline: var(--govtw-focus-width) solid transparent;
      background-color: var(--govtw-link-focus-bg);
      color: var(--govtw-link-focus-color);
      text-decoration: none;
      box-shadow:
        0 -2px var(--govtw-link-focus-bg),
        0 4px var(--govtw-link-focus-underline-color);
    }
  `;

  render() {
    // 無 href 時不渲染 anchor，避免 href="#" 這種會捲回頂端的 placeholder 語意
    if (!this.href) {
      return html`<slot></slot>`;
    }

    // target="_blank" 時自動補上 rel="noopener noreferrer" 防止反向 tabnabbing
    const autoRel = this.target === '_blank' && !this.rel
      ? 'noopener noreferrer'
      : this.rel;

    // 另開新視窗時加可見提示，讓所有使用者都知道（不只放在 title）
    const newWindowText = this.target === '_blank' && !this.noNewWindowText
      ? '（另開新視窗）'
      : nothing;

    return html`
      <a
        href=${this.href}
        target=${this.target || nothing}
        rel=${autoRel || nothing}
      ><slot></slot>${newWindowText}</a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-link': GovtwLink;
  }
}
