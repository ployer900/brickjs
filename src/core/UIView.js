/**
 * 定义view基类，继承于UIEvent类
 */
import UIViewEvent from './UIViewEvent.js';

let uid = 0;
export default class UIView extends UIViewEvent {
  constructor() {
    super();
    this._classname = null;
    this._el = null;
    this._uniqId = ++uid;
  }
  addClass(classname) {
    this._classname = classname;
    this._el.setAttribute('class', classname);
  }
  addTarget(target, selector) {
    if (this._el instanceof Element) {
      // 文本节点
      // 无事件的节点类型去除(依据nodeType值)
      this._el.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        (typeof target[selector] === 'function') && target[selector]();
      });
    }
  }
  addSubView(view) {
    if (
      (view instanceof UIView) &&
      (typeof view.render !== 'function')
    ) {
      throw new Error(
        `subview must be a instanceof UIView,
        and implement render function that return dom element`
      );
    }
    (this._el instanceof Element) && this._el.appendChild(view.render());
  }
  render() {
    return this._el;
  }
}
