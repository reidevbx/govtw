import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * govtw-card — 卡片
 *
 * 參考來源：台灣政府網站調查（GOV.UK 不提供此元件）
 *
 * 標題連結、說明與選用的圖片。整張卡都可以點，但只有標題是連結：
 * 連結的 `::after` 擴大到整張卡，螢幕閱讀器只念標題，不會把整段說明念成連結文字。
 *
 * - 標題用 `heading`、`href`、`heading-level`（預設 3）屬性
 * - 說明用 default slot；說明內不要放連結（會被標題連結的點擊範圍蓋住）
 * - 圖片用 `slot="image"`，多半是裝飾，設 `alt=""`
 * - `target="_blank"` 時標題後加「（另開新視窗）」
 *
 * @example
 * <govtw-card heading="戶籍謄本申請" href="/services/household">
 *   線上申請電子戶籍謄本，免臨櫃。
 * </govtw-card>
 */
@customElement('govtw-card')
export class GovtwCard extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: String }) heading = '';
  @property({ type: String }) href = '';

  /** 標題層級（2–6） */
  @property({ type: Number, attribute: 'heading-level' }) headingLevel = 3;

  /** 設為 `_blank` 時另開新視窗，標題後加「（另開新視窗）」 */
  @property({ type: String }) target = '';

  static styles = css`
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      outline: none !important;
      overflow: hidden;
      font-size: var(--govtw-card-font-size);
      color: var(--govtw-card-color);
      background: var(--govtw-card-bg);
      border: var(--govtw-card-border-width) solid var(--govtw-card-border-color);
      border-radius: var(--govtw-card-border-radius);
    }

    ::slotted([slot='image']) {
      display: block;
      inline-size: 100%;
      block-size: auto;
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: var(--govtw-card-gap);
      padding: var(--govtw-card-padding);
    }

    .heading {
      margin: 0;
      font-size: var(--govtw-card-heading-font-size);
      font-weight: var(--govtw-card-heading-font-weight);
    }

    a {
      color: var(--govtw-card-link-color);
      text-decoration-line: underline;
      text-underline-offset: var(--govtw-card-underline-offset);
    }

    /* 擴大點擊範圍到整張卡 */
    a::after {
      content: '';
      position: absolute;
      inset: 0;
    }

    :host(:hover) a {
      text-decoration-thickness: var(--govtw-card-hover-underline-thickness);
    }

    a:focus-visible {
      outline: var(--govtw-card-focus-width) solid transparent;
      color: var(--govtw-card-focus-text);
      background-color: var(--govtw-card-focus-color);
      text-decoration: none;
      box-shadow: 0 -2px var(--govtw-card-focus-color), 0 4px var(--govtw-card-focus-text);
    }

    /* 聚焦時整張卡也加框，讓使用者看出點擊範圍 */
    a:focus-visible::after {
      box-shadow: inset 0 0 0 var(--govtw-card-focus-width) var(--govtw-card-focus-text);
    }

    .description ::slotted(*) {
      margin: 0;
    }
  `;

  private get level(): number {
    return Math.min(Math.max(this.headingLevel, 2), 6);
  }

  render() {
    const newWindow = this.target === '_blank';
    return html`
      <slot name="image"></slot>
      <div class="body">
        <div class="heading" role="heading" aria-level=${this.level}>
          ${this.href
            ? html`<a
                href=${this.href}
                target=${this.target || nothing}
                rel=${newWindow ? 'noopener' : nothing}
              >${this.heading}${newWindow ? '（另開新視窗）' : ''}</a>`
            : this.heading}
        </div>
        <div class="description"><slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-card': GovtwCard;
  }
}
