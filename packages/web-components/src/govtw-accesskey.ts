import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * 樣式以 adoptedStyleSheets 掛到元件所在的 root（document 或 ShadowRoot），
 * 因為本元件渲染在 light DOM，static styles 不會生效。
 * 選擇器以 tag 開頭限定範圍，避免影響頁面其他元素。
 */
const styles = css`
  govtw-accesskey {
    display: inline-block;
  }

  govtw-accesskey > a {
    display: inline-block;
    font-size: var(--govtw-accesskey-font-size);
    line-height: 1;
    color: var(--govtw-accesskey-color);
    text-decoration: none;
  }

  govtw-accesskey > a:focus {
    outline: var(--govtw-accesskey-focus-width) solid transparent;
    color: var(--govtw-accesskey-focus-color);
    background-color: var(--govtw-accesskey-focus-bg);
    box-shadow: 0 0 0 var(--govtw-accesskey-focus-width) var(--govtw-accesskey-focus-bg);
  }

  /* 可讀名稱只給輔助科技 */
  govtw-accesskey .govtw-accesskey__label {
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
`;

/**
 * govtw-accesskey — 導盲磚
 *
 * 台灣政府網站無障礙慣例：在頁面各區塊開頭放「:::」定位點，搭配 accesskey 快速鍵，
 * 讓鍵盤與螢幕閱讀器使用者直接跳到上方、中央、下方等區塊。GOV.UK 無對應元件。
 *
 * 以 light DOM 渲染：錨點 id 可被頁面上的 `#AU` 連結找到，accesskey 不受 Shadow DOM 支援度影響。
 * 「:::」永遠顯示且 aria-hidden；可讀名稱用視覺隱藏文字。
 * 不加 aria-keyshortcuts：accesskey 的組合鍵依瀏覽器與平台而異，瀏覽器已會公開給輔助科技。
 *
 * @example
 * <govtw-accesskey key="U" label="上方功能區塊"></govtw-accesskey>
 * <govtw-accesskey key="C" label="中央內容區塊"></govtw-accesskey>
 * <govtw-accesskey key="Z" label="下方功能區塊"></govtw-accesskey>
 */
@customElement('govtw-accesskey')
export class GovtwAccesskey extends LitElement {
  /** 快速鍵字母（必填），建議 U（上方）、C（中央）、Z（下方） */
  @property({ type: String }) key = '';

  /** 區塊名稱，作為可讀名稱（必填），例如「中央內容區塊」 */
  @property({ type: String }) label = '';

  /** 錨點 id，預設 `A{key}`（如 AU） */
  @property({ type: String, attribute: 'anchor-id' }) anchorId = '';

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    adoptStyles(this.getRootNode());
  }

  render() {
    const key = this.key.trim().toUpperCase();
    if (!key || !this.label) {
      console.warn('[govtw-accesskey] 缺少必填屬性 key 或 label，不渲染定位點。', this);
      return html``;
    }

    const id = this.anchorId || `A${key}`;
    return html`<a
      id=${id}
      href=${`#${id}`}
      accesskey=${key}
    ><span aria-hidden="true">:::</span><span class="govtw-accesskey__label">${this.label}</span></a>`;
  }
}

/** 每個 root 只掛一次樣式表 */
function adoptStyles(root: Node) {
  const sheet = styles.styleSheet;
  if (!sheet) return;
  if (!(root instanceof Document || root instanceof ShadowRoot)) return;
  if (root.adoptedStyleSheets.includes(sheet)) return;
  root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-accesskey': GovtwAccesskey;
  }
}
