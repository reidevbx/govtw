import { LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { adoptStyles, whenParsed } from './internal/light-dom.js';

/**
 * light DOM 元件的樣式，以 adoptedStyleSheets 掛到所在 root。
 * 作者自己寫 `<table>`，元件只加樣式；元件本身當水平捲動容器。
 */
const styles = css`
  govtw-table {
    display: block;
    max-inline-size: 100%;
    overflow-x: auto;
    font-size: var(--govtw-table-font-size);
    color: var(--govtw-table-color);
  }

  govtw-table:focus-visible {
    outline: var(--govtw-table-focus-width) solid var(--govtw-table-focus-color);
    outline-offset: 2px;
  }

  govtw-table > table {
    inline-size: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }

  govtw-table > table > caption {
    margin-block-end: var(--govtw-table-caption-gap);
    font-size: var(--govtw-table-caption-font-size);
    font-weight: var(--govtw-table-caption-font-weight);
    text-align: start;
  }

  govtw-table th,
  govtw-table td {
    padding: var(--govtw-table-cell-padding-y) var(--govtw-table-cell-padding-x) var(--govtw-table-cell-padding-y) 0;
    text-align: start;
    vertical-align: top;
    border-block-end: var(--govtw-table-border-width) solid var(--govtw-table-border-color);
  }

  govtw-table th:last-child,
  govtw-table td:last-child {
    padding-inline-end: 0;
  }

  govtw-table th {
    font-weight: var(--govtw-table-header-font-weight);
  }

  /* 數字欄靠右並使用等寬數字，方便上下比較 */
  govtw-table .govtw-table__numeric {
    text-align: end;
    font-variant-numeric: tabular-nums;
  }
`;

/**
 * govtw-table — 表格
 *
 * 參考 GOV.UK Table：https://design-system.service.gov.uk/components/table/
 *
 * 作者直接寫原生 `<table>`（含 `<caption>`、`<th scope>`），元件以 light DOM 只加樣式。
 * 元件本身是水平捲動容器：表格比容器寬時，自動加上 `role="region"`、`tabindex="0"`，
 * 名稱取自 `<caption>`，讓鍵盤使用者能聚焦後用方向鍵捲動。不會溢出時不加，避免多一個 Tab 停留點。
 *
 * @example
 * <govtw-table>
 *   <table>
 *     <caption>各縣市申辦件數</caption>
 *     <thead><tr><th scope="col">縣市</th><th scope="col" class="govtw-table__numeric">件數</th></tr></thead>
 *     <tbody><tr><th scope="row">臺北市</th><td class="govtw-table__numeric">1,234</td></tr></tbody>
 *   </table>
 * </govtw-table>
 */
@customElement('govtw-table')
export class GovtwTable extends LitElement {
  private resizeObserver?: ResizeObserver;

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    adoptStyles(this.getRootNode(), styles);
    whenParsed(() => {
      this.resizeObserver ??= new ResizeObserver(() => this.updateScrollRegion());
      this.resizeObserver.observe(this);
      const table = this.querySelector(':scope > table');
      if (table) this.resizeObserver.observe(table);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }

  /** 表格溢出時才成為可聚焦的捲動區域 */
  private updateScrollRegion() {
    const overflowing = this.scrollWidth > this.clientWidth;
    if (overflowing) {
      const caption = this.querySelector(':scope > table > caption')?.textContent?.trim();
      this.setAttribute('role', 'region');
      this.setAttribute('tabindex', '0');
      this.setAttribute('aria-label', caption || '表格');
    } else {
      this.removeAttribute('role');
      this.removeAttribute('tabindex');
      this.removeAttribute('aria-label');
    }
  }

  // 作者的 <table> 留在原位，元件不渲染任何內容
  render() {
    return null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-table': GovtwTable;
  }
}
