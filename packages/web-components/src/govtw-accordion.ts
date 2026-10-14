import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * govtw-accordion — 手風琴
 *
 * 參考 GOV.UK Accordion：https://design-system.service.gov.uk/components/accordion/
 *
 * 由 `<govtw-accordion>` 與多個 `<govtw-accordion-section>` 組成。
 * 每段的標題按鈕與內容在同一個 Shadow DOM 內，`aria-controls` 可正常參照。
 * 容器提供「全部展開／全部收合」按鈕。
 *
 * - 網址 `#id` 與某段的 `id` 相同時，該段自動展開
 * - 不支援巢狀
 * - 收合內容不保證能被瀏覽器頁內搜尋找到
 *
 * @example
 * <govtw-accordion>
 *   <govtw-accordion-section heading="如何申請？">…</govtw-accordion-section>
 *   <govtw-accordion-section heading="需要多久？">…</govtw-accordion-section>
 * </govtw-accordion>
 */
@customElement('govtw-accordion')
export class GovtwAccordion extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** 各段標題的層級（2–6），套用到所有 section */
  @property({ type: Number, attribute: 'heading-level' }) headingLevel = 2;

  @state() private allOpen = false;

  static styles = css`
    :host {
      display: block;
      outline: none !important;
      color: var(--govtw-accordion-color);
    }

    .controls {
      display: flex;
      justify-content: flex-end;
      margin-block-end: var(--govtw-accordion-gap);
    }

    button {
      padding: 0;
      font: inherit;
      color: var(--govtw-accordion-toggle-color);
      text-decoration-line: underline;
      text-underline-offset: var(--govtw-accordion-underline-offset);
      background: none;
      border: 0;
      cursor: pointer;
    }

    button:focus-visible {
      outline: var(--govtw-accordion-focus-width) solid transparent;
      color: var(--govtw-accordion-focus-color);
      background-color: var(--govtw-accordion-focus-bg);
      text-decoration: none;
      box-shadow: 0 -2px var(--govtw-accordion-focus-bg), 0 4px var(--govtw-accordion-focus-color);
    }

    .sections {
      border-block-start: var(--govtw-accordion-border-width) solid var(--govtw-accordion-border-color);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('govtw-accordion-toggle', this.syncAllOpen);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('govtw-accordion-toggle', this.syncAllOpen);
  }

  private get sections(): GovtwAccordionSection[] {
    return [...this.querySelectorAll(':scope > govtw-accordion-section')] as GovtwAccordionSection[];
  }

  private syncAllOpen = () => {
    const sections = this.sections;
    this.allOpen = sections.length > 0 && sections.every((section) => section.open);
  };

  private toggleAll() {
    const next = !this.allOpen;
    for (const section of this.sections) section.open = next;
    this.allOpen = next;
  }

  render() {
    return html`
      <div class="controls">
        <button type="button" aria-expanded=${this.allOpen ? 'true' : 'false'} @click=${this.toggleAll}>
          ${this.allOpen ? '全部收合' : '全部展開'}
        </button>
      </div>
      <div class="sections"><slot @slotchange=${this.syncAllOpen}></slot></div>
    `;
  }
}

/**
 * govtw-accordion-section — 手風琴的一段
 *
 * 標題按鈕包在 `role="heading"` 內（層級取自父層的 `heading-level`），
 * 按鈕以 `aria-expanded` 表示狀態，`aria-controls` 指向同一個 Shadow DOM 內的內容。
 */
@customElement('govtw-accordion-section')
export class GovtwAccordionSection extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** 段落標題 */
  @property({ type: String }) heading = '';

  /** 是否展開 */
  @property({ type: Boolean, reflect: true }) open = false;

  static styles = css`
    :host {
      display: block;
      outline: none !important;
      border-block-end: var(--govtw-accordion-border-width) solid var(--govtw-accordion-border-color);
    }

    .heading {
      margin: 0;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--govtw-accordion-gap);
      inline-size: 100%;
      padding: var(--govtw-accordion-padding-y) 0;
      font: inherit;
      font-size: var(--govtw-accordion-heading-font-size);
      font-weight: var(--govtw-accordion-heading-font-weight);
      text-align: start;
      color: var(--govtw-accordion-color);
      background: none;
      border: 0;
      cursor: pointer;
    }

    .toggle {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      gap: 0.4em;
      font-size: var(--govtw-accordion-toggle-font-size);
      font-weight: normal;
      color: var(--govtw-accordion-toggle-color);
      text-decoration-line: underline;
      text-underline-offset: var(--govtw-accordion-underline-offset);
    }

    /* 箭頭：收合時向下，展開時向上 */
    .toggle::after {
      content: '';
      inline-size: 0.45em;
      block-size: 0.45em;
      border-block-end: 2px solid currentColor;
      border-inline-end: 2px solid currentColor;
      transform: translateY(-25%) rotate(45deg);
    }

    :host([open]) .toggle::after {
      transform: translateY(25%) rotate(-135deg);
    }

    button:focus-visible {
      outline: var(--govtw-accordion-focus-width) solid transparent;
      background-color: var(--govtw-accordion-focus-bg);
      box-shadow: 0 -2px var(--govtw-accordion-focus-bg), 0 4px var(--govtw-accordion-focus-color);
    }

    button:focus-visible,
    button:focus-visible .toggle {
      color: var(--govtw-accordion-focus-color);
    }

    .content {
      padding-block-end: var(--govtw-accordion-content-padding-bottom);
    }

    .content[hidden] {
      display: none;
    }

    ::slotted(:first-child) {
      margin-block-start: 0;
    }

    ::slotted(:last-child) {
      margin-block-end: 0;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.id && location.hash === `#${this.id}`) this.open = true;
  }

  private get headingLevel(): number {
    const level = (this.closest('govtw-accordion') as GovtwAccordion | null)?.headingLevel ?? 2;
    return Math.min(Math.max(level, 2), 6);
  }

  private toggle() {
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent('govtw-accordion-toggle', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="heading" role="heading" aria-level=${this.headingLevel}>
        <button type="button" aria-expanded=${this.open ? 'true' : 'false'} aria-controls="content" @click=${this.toggle}>
          <span>${this.heading}</span>
          <span class="toggle" aria-hidden="true">${this.open ? '收合' : '展開'}</span>
        </button>
      </div>
      <div class="content" id="content" ?hidden=${!this.open}><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-accordion': GovtwAccordion;
    'govtw-accordion-section': GovtwAccordionSection;
  }
}
