/**
 * 定义view基类，继承于UIViewEvent类
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
  setAttribute(attr, value) {
    if (typeof attr === 'undefined') {
      throw new TypeError(
        `attr name can't be undefined.`
      );
    }
    if (typeof value === 'undefined') {
      if (typeof attr === 'string') {
        throw new TypeError(
          `value can't be undefined.`
        );
      }
      if (typeof attr === 'object') {
        const attrs = Object.keys(attr).filter(key => attr[key]);
        (attrs || []).forEach((key, i) => {
          this._el[key] = attr[key];
        });
      }
    } else {
      this._el[attr] = value;
    }
  }
  addClass(classname) {
    this._classname = classname;
    this.setAttribute('className', classname);
  }
  addTarget(target, selector) {
    if (this._el instanceof Element) {
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
    if (!(this._el instanceof Element)) {
      throw new TypeError(
        `parent view must be a Element.`
      );
    }
    this._el.appendChild(view.render());
  }
  render() {
    return this._el;
  }
}
