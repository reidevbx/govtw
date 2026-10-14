import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * govtw-attachment — 附件下載
 *
 * 參考 GOV.UK Attachment（GOV.UK Publishing Components）：https://components.publishing.service.gov.uk/component-guide/attachment
 *
 * 一份文件一個 `<govtw-attachment>`，標題用 `heading` 屬性；每種格式一個 `<govtw-attachment-file>`。
 * 同一份文件有 PDF 與 ODT 等多種格式時，放在同一個標題下。
 *
 * @example
 * <govtw-attachment heading="第 5 次會議紀錄">
 *   <govtw-attachment-file href="/files/5.pdf" format="PDF" size="245 KB"></govtw-attachment-file>
 *   <govtw-attachment-file href="/files/5.odt" format="ODT" size="38 KB"></govtw-attachment-file>
 * </govtw-attachment>
 */
@customElement('govtw-attachment')
export class GovtwAttachment extends LitElement {
  /** 文件標題 */
  @property({ type: String }) heading = '';

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--govtw-attachment-gap);
      font-size: var(--govtw-attachment-font-size);
      color: var(--govtw-attachment-color);
    }

    .heading {
      margin: 0;
      font-weight: var(--govtw-attachment-heading-font-weight);
    }

    .files {
      display: flex;
      flex-wrap: wrap;
      gap: var(--govtw-attachment-gap) var(--govtw-attachment-files-gap);
    }
  `;

  protected updated() {
    // 檔案連結的可讀名稱含標題，標題改變時一併更新
    for (const file of this.querySelectorAll('govtw-attachment-file')) file.requestUpdate();
  }

  render() {
    return html`
      ${this.heading ? html`<p class="heading">${this.heading}</p>` : nothing}
      <div class="files"><slot></slot></div>
    `;
  }
}

/**
 * govtw-attachment-file — 附件的一種格式
 *
 * 可見文字為「PDF（245 KB）」；前面加視覺隱藏的文件標題，
 * 螢幕閱讀器念「第 5 次會議紀錄 PDF（245 KB）」。格式只用文字標示，不用圖示。
 */
@customElement('govtw-attachment-file')
export class GovtwAttachmentFile extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: String }) href = '';

  /** 檔案格式，如 `PDF`、`ODT`、`ODS` */
  @property({ type: String }) format = '';

  /** 檔案大小，如 `245 KB` */
  @property({ type: String }) size = '';

  static styles = css`
    :host {
      display: inline-block;
      outline: none !important;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: var(--govtw-attachment-gap);
      min-block-size: 44px;
      color: var(--govtw-attachment-link-color);
      text-decoration-line: underline;
      text-underline-offset: var(--govtw-attachment-underline-offset);
    }

    a:visited {
      color: var(--govtw-attachment-link-visited-color);
    }

    a:focus-visible {
      outline: var(--govtw-attachment-focus-width) solid transparent;
      color: var(--govtw-attachment-focus-text);
      background-color: var(--govtw-attachment-focus-color);
      text-decoration: none;
      box-shadow: 0 -2px var(--govtw-attachment-focus-color), 0 4px var(--govtw-attachment-focus-text);
    }

    .format {
      padding: 0 var(--govtw-attachment-format-padding-x);
      font-size: var(--govtw-attachment-format-font-size);
      font-weight: var(--govtw-attachment-format-font-weight);
      line-height: 1.5;
      border: 1px solid currentColor;
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
  `;

  private get heading(): string {
    return (this.closest('govtw-attachment') as GovtwAttachment | null)?.heading ?? '';
  }

  render() {
    if (!this.href) {
      console.warn('[govtw-attachment-file] 缺少 href');
      return nothing;
    }
    return html`
      <a href=${this.href}>
        ${this.heading ? html`<span class="visually-hidden">${this.heading} </span>` : nothing}
        <span class="format">${this.format}</span>
        ${this.size ? html`<span>（${this.size}）</span>` : nothing}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-attachment': GovtwAttachment;
    'govtw-attachment-file': GovtwAttachmentFile;
  }
}
