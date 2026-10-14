import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * govtw-pagination — 分頁
 *
 * 參考 GOV.UK Pagination：https://design-system.service.gov.uk/components/pagination/
 *
 * 兩個 variant：
 * - 預設（numbered）：搜尋結果、列表頁，含頁碼與 ellipsis 自動計算
 * - block：線性閱讀內容（多頁指南），只顯示上/下一頁，可附描述標題
 *
 * 連結色彩、底線、focus 視覺直接消費 govtw-link 的 component token，
 * 確保兩者永遠視覺一致；pagination 自身只擁有「current/hover/ellipsis/label」
 * 等獨有 token。
 *
 * @example numbered
 * <govtw-pagination total="42" current="7" href-template="?page={n}"></govtw-pagination>
 *
 * @example block
 * <govtw-pagination
 *   variant="block"
 *   prev-href="/guide/3" prev-label="如何申辦"
 *   next-href="/guide/5" next-label="繳交申請費"
 * ></govtw-pagination>
 */
@customElement('govtw-pagination')
export class GovtwPagination extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** numbered 變體：總頁數 */
  @property({ type: Number }) total = 0;

  /** numbered 變體：當前頁，1-based */
  @property({ type: Number }) current = 1;

  /** numbered 變體：URL 模板，含 {n} 佔位符。例：`?page={n}` */
  @property({ type: String, attribute: 'href-template' }) hrefTemplate = '';

  /** block 變體切換 */
  @property({ type: String, reflect: true }) variant: 'default' | 'block' = 'default';

  /** block 變體：上一頁 href（首頁時省略） */
  @property({ type: String, attribute: 'prev-href' }) prevHref = '';

  /** block 變體：下一頁 href（末頁時省略） */
  @property({ type: String, attribute: 'next-href' }) nextHref = '';

  /** block 變體：上一頁的描述標題（如「如何申辦」） */
  @property({ type: String, attribute: 'prev-label' }) prevLabel = '';

  /** block 變體：下一頁的描述標題 */
  @property({ type: String, attribute: 'next-label' }) nextLabel = '';

  /** nav 的 aria-label，預設「頁數導覽」 */
  @property({ type: String, attribute: 'landmark-label' }) landmarkLabel = '頁數導覽';

  static styles = css`
    :host {
      display: block;
      outline: none !important;
    }

    nav {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--govtw-pagination-gap);
    }

    /* ===== Numbered variant ===== */

    ul {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--govtw-pagination-gap);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .item a,
    .ellipsis {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: var(--govtw-pagination-item-min-size);
      min-height: var(--govtw-pagination-item-min-size);
      padding: 0 0.5rem;
      box-sizing: border-box;
      text-decoration-line: underline;
      text-decoration-thickness: var(--govtw-link-underline-thickness);
      text-underline-offset: var(--govtw-link-underline-offset);
    }

    .item a {
      color: var(--govtw-link-color);
      cursor: pointer;
    }

    /* hover 排除當前頁，避免蓋掉 current 的藍底白字 */
    .item:not(.item--current) a:hover {
      background-color: var(--govtw-pagination-hover-bg);
      color: var(--govtw-link-hover-color);
      text-decoration-thickness: var(--govtw-link-hover-underline-thickness);
    }

    .item--current a {
      background-color: var(--govtw-pagination-current-bg);
      color: var(--govtw-pagination-current-color);
      font-weight: var(--govtw-pagination-current-weight);
      text-decoration-thickness: var(--govtw-link-hover-underline-thickness);
    }

    .ellipsis {
      color: var(--govtw-pagination-ellipsis-color);
      text-decoration: none;
      user-select: none;
    }

    /* ===== Prev / Next ===== */

    .nav-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      min-height: var(--govtw-pagination-item-min-size);
      padding: 0 0.5rem;
      color: var(--govtw-link-color);
      text-decoration-line: underline;
      text-decoration-thickness: var(--govtw-link-underline-thickness);
      text-underline-offset: var(--govtw-link-underline-offset);
      cursor: pointer;
    }

    .nav-link:hover {
      color: var(--govtw-link-hover-color);
      text-decoration-thickness: var(--govtw-link-hover-underline-thickness);
    }

    .nav-link__inner {
      display: inline-flex;
      flex-direction: column;
    }

    .nav-link__title {
      font-weight: var(--govtw-pagination-current-weight);
    }

    .nav-link__label {
      color: var(--govtw-pagination-label-color);
      font-size: var(--govtw-pagination-label-size);
      text-decoration: none;
    }

    .nav-link svg {
      flex: none;
      width: var(--govtw-pagination-icon-size);
      height: var(--govtw-pagination-icon-size);
      fill: currentColor;
    }

    /* ===== Block variant ===== */

    :host([variant='block']) nav {
      flex-direction: column;
      align-items: stretch;
      gap: 0;
    }

    :host([variant='block']) .nav-link {
      flex-direction: row;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.75rem 0;
      border-top: 1px solid var(--govtw-color-border-subtle);
    }

    :host([variant='block']) .nav-link:last-child {
      border-bottom: 1px solid var(--govtw-color-border-subtle);
    }

    :host([variant='block']) .nav-link svg {
      margin-top: 0.6em;
    }

    /* ===== Focus — 對齊 govtw-link 的 GOV.UK 雙色標 ===== */
    .item a:focus-visible,
    .item a:active,
    .nav-link:focus-visible,
    .nav-link:active {
      outline: var(--govtw-focus-width) solid transparent;
      background-color: var(--govtw-link-focus-bg);
      color: var(--govtw-link-focus-color);
      text-decoration: none;
      box-shadow:
        0 -2px var(--govtw-link-focus-bg),
        0 4px var(--govtw-link-focus-underline-color);
    }

    .nav-link:focus-visible .nav-link__label,
    .nav-link:active .nav-link__label {
      color: var(--govtw-link-focus-color);
    }

    /* ===== Responsive：小螢幕只保留首/末/當前±1 ===== */
    @media (max-width: 640px) {
      .item--collapsible,
      .ellipsis--collapsible {
        display: none;
      }
    }
  `;

  render() {
    if (this.variant === 'block') {
      return this.renderBlock();
    }
    return this.renderNumbered();
  }

  private renderNumbered(): TemplateResult | typeof nothing {
    const total = Math.max(0, Math.floor(this.total));
    if (total <= 1) return nothing;

    const current = Math.min(Math.max(1, Math.floor(this.current)), total);
    const items = computePageItems(current, total);

    return html`
      <nav aria-label=${this.landmarkLabel}>
        ${current > 1 ? this.renderNavLink('prev', this.hrefForPage(current - 1)) : nothing}
        <ul role="list">
          ${items.map((item) => this.renderItem(item, current))}
        </ul>
        ${current < total ? this.renderNavLink('next', this.hrefForPage(current + 1)) : nothing}
      </nav>
    `;
  }

  private renderBlock(): TemplateResult | typeof nothing {
    if (!this.prevHref && !this.nextHref) return nothing;

    return html`
      <nav aria-label=${this.landmarkLabel}>
        ${this.prevHref
          ? this.renderNavLink('prev', this.prevHref, this.prevLabel)
          : nothing}
        ${this.nextHref
          ? this.renderNavLink('next', this.nextHref, this.nextLabel)
          : nothing}
      </nav>
    `;
  }

  private renderItem(item: PageItem, current: number): TemplateResult {
    if (item.kind === 'ellipsis') {
      return html`
        <li class="item ${item.collapsible ? 'ellipsis--collapsible' : ''}" aria-hidden="true">
          <span class="ellipsis">⋯</span>
        </li>
      `;
    }
    const isCurrent = item.number === current;
    const itemClasses = [
      'item',
      isCurrent ? 'item--current' : '',
      item.collapsible ? 'item--collapsible' : '',
    ]
      .filter(Boolean)
      .join(' ');
    return html`
      <li class=${itemClasses}>
        <a
          href=${this.hrefForPage(item.number)}
          aria-label="第 ${item.number} 頁"
          aria-current=${isCurrent ? 'page' : nothing}
        >${item.number}</a>
      </li>
    `;
  }

  private renderNavLink(
    direction: 'prev' | 'next',
    href: string,
    label = '',
  ): TemplateResult {
    const isPrev = direction === 'prev';
    const title = isPrev ? '上一頁' : '下一頁';
    const icon = isPrev ? prevIcon : nextIcon;
    return html`
      <a class="nav-link" href=${href} rel=${direction}>
        ${isPrev ? icon : nothing}
        <span class="nav-link__inner">
          <span class="nav-link__title">${title}</span>
          ${label ? html`<span class="nav-link__label">${label}</span>` : nothing}
        </span>
        ${isPrev ? nothing : icon}
      </a>
    `;
  }

  private hrefForPage(n: number): string {
    if (!this.hrefTemplate) return `#${n}`;
    return this.hrefTemplate.replace(/\{n\}/g, String(n));
  }
}

/* ===== Helpers ===== */

type PageItem =
  | { kind: 'page'; number: number; collapsible: boolean }
  | { kind: 'ellipsis'; collapsible: boolean };

/**
 * 算出要顯示的頁碼序列。規則對齊 GOV.UK：
 * - 一律顯示首頁、末頁
 * - 顯示當前頁前後各 1
 * - 中間有空隙（>1）插入 ellipsis
 *
 * 標記 `collapsible: true` 的項目在 mobile 用 CSS 隱藏，
 * 只剩首頁、當前頁、末頁。
 *
 * 例（current=7, total=42）：[1, …, 6, 7, 8, …, 42]
 */
function computePageItems(current: number, total: number): PageItem[] {
  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);
  for (let n = current - 1; n <= current + 1; n++) {
    if (n >= 1 && n <= total) pages.add(n);
  }
  const sorted = [...pages].sort((a, b) => a - b);

  const items: PageItem[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const n = sorted[i];
    const isFirst = n === 1;
    const isLast = n === total;
    const isCurrentBand = Math.abs(n - current) <= 1;
    const collapsible = !isFirst && !isLast && n !== current && isCurrentBand;
    items.push({ kind: 'page', number: n, collapsible });

    const next = sorted[i + 1];
    if (next !== undefined && next - n > 1) {
      // mobile 把 current±1 收起後沒有空隙，所以 ellipsis 也跟著收
      items.push({ kind: 'ellipsis', collapsible: true });
    }
  }
  return items;
}

/* ===== SVG icons (GOV.UK style chevron) ===== */

const chevronIcon = (path: string) => html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15 13"
    aria-hidden="true"
    focusable="false"
  >
    <path d=${path} />
  </svg>
`;

const prevIcon = chevronIcon(
  'm6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z',
);
const nextIcon = chevronIcon(
  'm8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z',
);

declare global {
  interface HTMLElementTagNameMap {
    'govtw-pagination': GovtwPagination;
  }
}
