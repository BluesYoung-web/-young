/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */
export declare const triggerEvent: (elm: Element, name: keyof WindowEventMap, ...opts: any[]) => Element;
/**
 * 触发 “mouseup” 和 “mousedown” 事件
 * @param {Element} elm
 * @param {*} opts
 */
export declare const triggerClick: (elm: Element, ...opts: any[]) => Element;
