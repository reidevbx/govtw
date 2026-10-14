import { LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { adoptStyles } from './internal/light-dom.js';

/**
 * light DOM 元件的樣式，以 adoptedStyleSheets 掛到所在 root。
 * 作者自己寫 `<dl>`，元件只加樣式，不改寫結構。
 * 容器寬度 40rem 以下改為上下堆疊。
 */
const styles = css`
  govtw-summary-list {
    display: block;
    container: govtw-summary-list / inline-size;
  }

  govtw-summary-list > dl {
    margin: 0;
  }

  govtw-summary-list > dl > div {
    display: flex;
    flex-wrap: wrap;
    gap: var(--govtw-summary-list-gap);
    padding-block: var(--govtw-summary-list-row-padding-y);
    border-block-end: var(--govtw-summary-list-border-width) solid var(--govtw-summary-list-border-color);
  }

  govtw-summary-list[no-border] > dl > div {
    border-block-end: 0;
  }

  govtw-summary-list > dl > div > dt {
    flex: 0 0 var(--govtw-summary-list-key-width);
    margin: 0;
    font-weight: var(--govtw-summary-list-key-font-weight);
  }

  govtw-summary-list > dl > div > dd {
    flex: 1 1 0;
    margin: 0;
  }

  /* 第二個 dd 是動作欄（如「變更」），靠右 */
  govtw-summary-list > dl > div > dd + dd {
    flex: 0 0 auto;
    text-align: end;
  }

  govtw-summary-list > dl > div > dd > :first-child {
    margin-block-start: 0;
  }

  govtw-summary-list > dl > div > dd > :last-child {
    margin-block-end: 0;
  }

  @container govtw-summary-list (max-width: 40rem) {
    govtw-summary-list > dl > div {
      flex-direction: column;
    }

    govtw-summary-list > dl > div > dt,
    govtw-summary-list > dl > div > dd,
    govtw-summary-list > dl > div > dd + dd {
      flex: none;
      text-align: start;
    }
  }
`;

/**
 * govtw-summary-list — 摘要清單
 *
 * 參考 GOV.UK Summary list：https://design-system.service.gov.uk/components/summary-list/
 *
 * 以「標題：內容」成對列出資訊，用於申請確認頁、內容頁的資訊欄。
 * 作者直接寫原生 `<dl>`，每列用 `<div>` 包 `<dt>` 與 `<dd>`；動作連結放在第二個 `<dd>`。
 * 元件以 light DOM 渲染，只加樣式，不改寫結構。
 *
 * @example
 * <govtw-summary-list>
 *   <dl>
 *     <div>
 *       <dt>姓名</dt>
 *       <dd>王小明</dd>
 *       <dd><a href="/name">變更<span class="govtw-visually-hidden">姓名</span></a></dd>
 *     </div>
 *   </dl>
 * </govtw-summary-list>
 */
@customElement('govtw-summary-list')
export class GovtwSummaryList extends LitElement {
  /** 不顯示列與列之間的分隔線 */
  @property({ type: Boolean, reflect: true, attribute: 'no-border' }) noBorder = false;

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    adoptStyles(this.getRootNode(), styles);
  }

  // 作者的 <dl> 留在原位，元件不渲染任何內容
  render() {
    return null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-summary-list': GovtwSummaryList;
  }
}
