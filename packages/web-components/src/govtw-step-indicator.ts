import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { adoptStyles, restoreListRole, takeChildElements, whenParsed } from './internal/light-dom.js';

const DONE_CLASS = 'govtw-step-indicator__step--done';
const DONE_TEXT_CLASS = 'govtw-step-indicator__done-text';

/**
 * light DOM 元件的樣式，以 adoptedStyleSheets 掛到所在 root。
 */
const styles = css`
  govtw-step-indicator {
    display: block;
    container: govtw-step-indicator / inline-size;
    font-size: var(--govtw-step-indicator-font-size);
    color: var(--govtw-step-indicator-color);
  }

  govtw-step-indicator > .govtw-step-indicator__summary {
    margin: 0;
    font-weight: var(--govtw-step-indicator-summary-font-weight);
  }

  govtw-step-indicator > ol {
    display: flex;
    flex-wrap: wrap;
    gap: var(--govtw-step-indicator-step-gap);
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: govtw-step;
  }

  govtw-step-indicator > ol > li {
    display: flex;
    align-items: center;
    gap: var(--govtw-step-indicator-gap);
    margin: 0;
    color: var(--govtw-step-indicator-upcoming-color);
    counter-increment: govtw-step;
  }

  /* 步驟編號：圓圈。已完成實心、目前粗框、未到細框，不只靠顏色區分 */
  govtw-step-indicator > ol > li::before {
    content: counter(govtw-step);
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    inline-size: var(--govtw-step-indicator-marker-size);
    block-size: var(--govtw-step-indicator-marker-size);
    font-size: var(--govtw-step-indicator-marker-font-size);
    background: var(--govtw-step-indicator-bg);
    border: var(--govtw-step-indicator-marker-border-width) solid var(--govtw-step-indicator-upcoming-border-color);
    border-radius: 50%;
  }

  govtw-step-indicator > ol > li.govtw-step-indicator__step--done {
    color: var(--govtw-step-indicator-color);
  }

  govtw-step-indicator > ol > li.govtw-step-indicator__step--done::before {
    color: var(--govtw-step-indicator-done-color);
    background: var(--govtw-step-indicator-done-bg);
    border-color: var(--govtw-step-indicator-done-bg);
  }

  govtw-step-indicator > ol > li[aria-current='step'] {
    font-weight: var(--govtw-step-indicator-current-font-weight);
    color: var(--govtw-step-indicator-color);
  }

  govtw-step-indicator > ol > li[aria-current='step']::before {
    border-width: calc(2 * var(--govtw-step-indicator-marker-border-width));
    border-color: var(--govtw-step-indicator-current-border-color);
  }

  /* 寬度足夠時摘要只給螢幕閱讀器；窄時改為只顯示摘要 */
  govtw-step-indicator > .govtw-step-indicator__summary {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  govtw-step-indicator .govtw-step-indicator__done-text {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  @container govtw-step-indicator (max-width: 40rem) {
    govtw-step-indicator > .govtw-step-indicator__summary {
      position: static;
      inline-size: auto;
      block-size: auto;
      margin: 0;
      overflow: visible;
      clip-path: none;
      white-space: normal;
    }

    govtw-step-indicator > ol {
      display: none;
    }
  }
`;

/**
 * govtw-step-indicator — 步驟指示
 *
 * 參考來源：台灣政府網站調查（GOV.UK 只在標題上方寫「第 x 步，共 n 步」）
 *
 * 作者寫 `<ol><li>`，每個 `<li>` 是一個步驟名稱；`current` 指定目前第幾步（從 1 開始）。
 * 總步數由 `<li>` 數量決定。元件以 light DOM 加樣式與狀態：
 *
 * - 目前步驟加 `aria-current="step"`
 * - 已完成步驟加視覺隱藏文字「（已完成）」
 * - 容器寬度 40rem 以下：只顯示「第 2 步，共 4 步」，隱藏步驟清單
 *
 * 步驟只顯示、不可點擊；回到前一步用 back-link。
 *
 * 限制：只在頁面解析完成後取得一次 `<ol>`；之後替換 `<ol>` 不會重新取得。
 *
 * @example
 * <govtw-step-indicator current="2">
 *   <ol><li>填寫資料</li><li>上傳文件</li><li>確認送出</li></ol>
 * </govtw-step-indicator>
 */
@customElement('govtw-step-indicator')
export class GovtwStepIndicator extends LitElement {
  /** 目前第幾步，從 1 開始 */
  @property({ type: Number }) current = 1;

  @state() private list?: HTMLOListElement;

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    adoptStyles(this.getRootNode(), styles);
    if (this.list) return;
    whenParsed(() => {
      if (this.list) return;
      const list = takeChildElements(this).find((el): el is HTMLOListElement => el instanceof HTMLOListElement);
      if (!list) console.warn('[govtw-step-indicator] 需要一個 <ol> 子元素');
      if (list) restoreListRole([list]);
      this.list = list;
    });
  }

  private get steps(): HTMLLIElement[] {
    return this.list ? [...this.list.children].filter((el): el is HTMLLIElement => el instanceof HTMLLIElement) : [];
  }

  /** 依 current 設定每一步的狀態 */
  protected updated() {
    this.steps.forEach((step, i) => {
      const done = i < this.current - 1;
      step.classList.toggle(DONE_CLASS, done);
      if (i === this.current - 1) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');

      let doneText = step.querySelector(`:scope > .govtw-step-indicator__done-text`);
      if (done && !doneText) {
        doneText = document.createElement('span');
        doneText.className = DONE_TEXT_CLASS;
        doneText.textContent = '（已完成）';
        step.append(doneText);
      } else if (!done) {
        doneText?.remove();
      }
    });
  }

  render() {
    if (!this.list) return nothing;
    const total = this.steps.length;
    return html`
      <p class="govtw-step-indicator__summary">第 ${this.current} 步，共 ${total} 步</p>
      ${this.list}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'govtw-step-indicator': GovtwStepIndicator;
  }
}
