import type { CSSResult } from 'lit';

/**
 * 把樣式掛到元件所在的 root（document 或 ShadowRoot），每個 root 只掛一次。
 *
 * 給 light DOM 元件用：它們的 static styles 不會生效。
 * 在 connectedCallback 呼叫；元件被搬進其他 root（如 DemoBlock 的 Shadow DOM）時會再次觸發，樣式隨之掛上。
 */
export function adoptStyles(root: Node, styles: CSSResult) {
  const sheet = styles.styleSheet;
  if (!sheet) return;
  if (!(root instanceof Document || root instanceof ShadowRoot)) return;
  if (root.adoptedStyleSheets.includes(sheet)) return;
  root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
}

/**
 * 取出作者寫在元件內的子元素並從 DOM 移除，交給元件重新包裝（如包進 `<li>`）。
 *
 * 只取元素節點，忽略空白文字。須在第一次 render 前呼叫，且只呼叫一次：
 * 元件被搬移時 connectedCallback 會再次觸發，屆時子元素已是元件自己渲染的結構。
 */
export function takeChildElements(host: HTMLElement): Element[] {
  const items = [...host.children];
  for (const item of items) item.remove();
  return items;
}

/**
 * 頁面解析完成後再執行 callback。
 *
 * 元件 script 在 `<head>` 同步載入時，瀏覽器一建立元素就會觸發 connectedCallback，
 * 此時子元素尚未解析。等 DOMContentLoaded 才能取到作者寫的完整子元素。
 */
export function whenParsed(callback: () => void) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
  } else {
    callback();
  }
}
