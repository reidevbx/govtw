import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

type Platform = 'line' | 'facebook' | 'x' | 'email';

const PLATFORM_NAMES: Record<Platform, string> = {
  line: 'LINE',
  facebook: 'Facebook',
  x: 'X',
  email: 'Email',
};

/**
 * govtw-page-tools — 頁面工具列
 *
 * 參考來源：台灣政府網站調查（GOV.UK 不提供此元件）
 *
 * 「列印」按鈕加分享連結。每個項目都有可見文字，不只用圖示。
 *
 * - 列印是 `<button>`，呼叫 `window.print()`
 * - 分享是真實網址的 `<a>`，不用 `javascript:` 或 `href="#"`；在同一分頁開啟，不另開新視窗
 * - 瀏覽器支援 Web Share API（`navigator.share`）時，分享連結改成單一「分享」按鈕，開啟系統分享選單
 *
 * @example
 * <govtw-page-tools></govtw-page-tools>
 * <govtw-page-tools platforms="line facebook x email"></govtw-page-tools>
 */
@customElement('govtw-page-tools')
export class GovtwPageTools extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** 分享平台，空白分隔：`line`、`facebook`、`x`、`email` */
  @property({ type: String }) platforms = 'line facebook email';

  /** 分享的網址；預設為目前頁面 */
  @property({ type: String }) url = '';

  /** 分享的標題；預設為 `document.title` */
  @property({ type: String, attribute: 'share-title' }) shareTitle = '';

  /** 不顯示列印按鈕 */
  @property({ type: Boolean, attribute: 'no-print' }) noPrint = false;

  /** 不使用 Web Share API，一律顯示各平台連結 */
  @property({ type: Boolean, attribute: 'no-native-share' }) noNativeShare = false;

  @state() private canShare = false;

  static styles = css`
    :host {
      display: block;
      outline: none !important;
      font-size: var(--govtw-page-tools-font-size);
      color: var(--govtw-page-tools-color);
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0 var(--govtw-page-tools-gap);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      display: flex;
      align-items: center;
      margin: 0;
    }

    .label {
      color: var(--govtw-page-tools-label-color);
    }

    a,
    button {
      display: inline-flex;
      align-items: center;
      min-block-size: 44px;
      padding: 0;
      font: inherit;
      color: var(--govtw-page-tools-link-color);
      text-decoration-line: underline;
      text-underline-offset: var(--govtw-page-tools-underline-offset);
      background: none;
      border: 0;
      cursor: pointer;
    }

    a:focus-visible,
    button:focus-visible {
      outline: var(--govtw-page-tools-focus-width) solid transparent;
      color: var(--govtw-page-tools-focus-text);
      background-color: var(--govtw-page-tools-focus-color);
      text-decoration: none;
      box-shadow: 0 -2px var(--govtw-page-tools-focus-color), 0 4px var(--govtw-page-tools-focus-text);
    }

    .visually-hidden {
      position: absolute !important;
      inline-size: 1px !important;
      block-size: 1px !important;
      margin: -1px !important;
      padding: 0 !important;
      overflow: hidden !important;
      clip-path: inset(50%) !important;
      white-space: nowrap !important;
      border: 0 !important;
    }

    @media print {
      :host {
        display: none;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.canShare = typeof navigator.share === 'function';
  }

  private get shareUrl() {
    return this.url || location.href;
  }

  private get resolvedTitle() {
    return this.shareTitle || document.title;
  }

  private platformHref(platform: Platform): string {
    const url = encodeURIComponent(this.shareUrl);
    const title = encodeURIComponent(this.resolvedTitle);
    switch (platform) {
      case 'line':
        return `https://social-plugins.line.me/lineit/share?url=${url}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      case 'x':
        return `https://x.com/intent/tweet?url=${url}&text=${title}`;
      case 'email':
        return `mailto:?subject=${title}&body=${url}`;
    }
  }

  private get platformList(): Platform[] {
    return this.platforms
      .split(/\s+/)
      .filter((name): name is Platform => name in PLATFORM_NAMES);
  }

  private print() {
    window.print();
  }

  private share() {
    navigator.share({ title: this.resolvedTitle, url: this.shareUrl }).catch(() => {
      // 使用者取消分享時會 reject，不需處理
    });
  }

  render() {
    const useNative = this.canShare && !this.noNativeShare;
    return html`
      <ul role="list">
        ${this.noPrint ? nothing : html`<li><button type="button" @click=${this.print}>列印</button></li>`}
        ${useNative
          ? html`<li><button type="button" @click=${this.share}>分享</button></li>`
          : html`
            <li class="label" aria-hidden="true">分享到</li>
            ${this.platformList.map((platform) => html`
              <li>
                <a href=${this.platformHref(platform)}><span class="visually-hidden">分享到 </span>${PLATFORM_NAMES[platform]}</a>
              </li>
            `)}`}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-page-tools': GovtwPageTools;
  }
}
