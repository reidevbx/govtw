import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/** 民國年與西元年的差 */
const ROC_OFFSET = 1911;

/**
 * govtw-document-list — 文件列表
 *
 * 參考 GOV.UK Document list（GOV.UK Publishing Components）：https://components.publishing.service.gov.uk/component-guide/document_list
 *
 * 新聞、公告、法規等列表。`<govtw-document-list>` 內放多個 `<govtw-document-list-item>`，
 * 每項有標題連結、日期、發布單位，標籤用 `slot="tags"`。
 *
 * - 容器為 `role="list"`，每項為 `role="listitem"`
 * - 日期以 `<time datetime>` 輸出 ISO 值；畫面預設顯示民國年
 * - 標題不截斷
 *
 * @example
 * <govtw-document-list>
 *   <govtw-document-list-item heading="公告標題" href="/news/1" date="2026-10-14" unit="資訊處"></govtw-document-list-item>
 * </govtw-document-list>
 */
@customElement('govtw-document-list')
export class GovtwDocumentList extends LitElement {
  /** 日期顯示的曆法，套用到所有項目 */
  @property({ type: String, reflect: true }) calendar: 'roc' | 'gregorian' = 'roc';

  static styles = css`
    :host {
      display: block;
      font-size: var(--govtw-document-list-font-size);
      color: var(--govtw-document-list-color);
      border-block-start: var(--govtw-document-list-border-width) solid var(--govtw-document-list-border-color);
    }
  `;

  protected updated() {
    for (const item of this.querySelectorAll('govtw-document-list-item')) item.requestUpdate();
  }

  render() {
    return html`<div role="list"><slot></slot></div>`;
  }
}

/**
 * govtw-document-list-item — 文件列表的一項
 */
@customElement('govtw-document-list-item')
export class GovtwDocumentListItem extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: String }) heading = '';
  @property({ type: String }) href = '';

  /** ISO 日期，如 `2026-10-14` */
  @property({ type: String }) date = '';

  /** 發布單位 */
  @property({ type: String }) unit = '';

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--govtw-document-list-gap);
      padding-block: var(--govtw-document-list-item-padding-y);
      outline: none !important;
      border-block-end: var(--govtw-document-list-border-width) solid var(--govtw-document-list-border-color);
    }

    a {
      font-size: var(--govtw-document-list-heading-font-size);
      font-weight: var(--govtw-document-list-heading-font-weight);
      color: var(--govtw-document-list-link-color);
      text-decoration-line: underline;
      text-underline-offset: var(--govtw-document-list-underline-offset);
    }

    a:visited {
      color: var(--govtw-document-list-link-visited-color);
    }

    a:focus-visible {
      outline: var(--govtw-document-list-focus-width) solid transparent;
      color: var(--govtw-document-list-focus-text);
      background-color: var(--govtw-document-list-focus-color);
      text-decoration: none;
      box-shadow: 0 -2px var(--govtw-document-list-focus-color), 0 4px var(--govtw-document-list-focus-text);
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--govtw-document-list-gap) var(--govtw-document-list-meta-gap);
      margin: 0;
      color: var(--govtw-document-list-meta-color);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'listitem');
  }

  private get calendar(): 'roc' | 'gregorian' {
    return (this.closest('govtw-document-list') as GovtwDocumentList | null)?.calendar ?? 'roc';
  }

  /** ISO 日期轉成「115 年 10 月 14 日」；格式不符時原樣顯示 */
  private formatDate(iso: string): string {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    if (!match) return iso;
    const year = Number(match[1]) - (this.calendar === 'roc' ? ROC_OFFSET : 0);
    return `${year} 年 ${Number(match[2])} 月 ${Number(match[3])} 日`;
  }

  render() {
    return html`
      ${this.href
        ? html`<a href=${this.href}>${this.heading}</a>`
        : html`<span>${this.heading}</span>`}
      <p class="meta">
        ${this.date ? html`<time datetime=${this.date}>${this.formatDate(this.date)}</time>` : nothing}
        ${this.unit ? html`<span>${this.unit}</span>` : nothing}
        <slot name="tags"></slot>
      </p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-document-list': GovtwDocumentList;
    'govtw-document-list-item': GovtwDocumentListItem;
  }
}
