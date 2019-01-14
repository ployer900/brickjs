/**
 * 定义view基类，继承于UIViewEvent类
 */
import UIViewEvent from './UIViewEvent.js';
import Error from '../Error.js';
import { ELEMENT_TAG } from '../const.js';

let uid = 0;
export default class UIView extends UIViewEvent {
  constructor() {
    super();
    this.view = document.createElement(ELEMENT_TAG.VIEW);
    this.classname = null;
    this._uniqId = ++uid;
  }
  setAttribute(attr, value) {
    if (typeof attr === 'object') {
      const attrs = Object.keys(attr).filter(key => attr[key]);
      (attrs || []).forEach((key, i) => {
        this.view[key] = attr[key];
      });
    } else if (typeof attr === 'string') {
      this.view[attr] = value;
    } else {}
  }
  addClass(classname) {
    this.classname = classname;
    this.setAttribute('className', classname);
  }
  addTarget(target, selector, type = 'click') {
    if (
      !(this.view instanceof Node) &&
      (this.view.nodeType !== 3)
    ) {
      Error.throwTypeError(
        `view must be a instanceof Node(except TextNode),
        actual type if ${typeof this.view}`
      );
    }
    if (typeof selector !== 'function') {
      Error.throwTypeError(
        `selector expect a function,
        actual type is ${typeof selector}`
      )
    }
    this.view.addEventListener(type, (e) => {
      e.preventDefault();
      e.stopPropagation();
      selector(e);
    });
  }
  addSubView(view) {
    if (
      (view instanceof UIView) &&
      (typeof view.render !== 'function')
    ) {
      Error.throwTypeError(
        `subview must be a instanceof UIView,
        and implement render function that return dom element`
      );
    }
    if (
      !(this.view instanceof Node) ||
      (this.view.nodeType === 3)
    ) {
      Error.throwTypeError(
        `parent view must be a Node(except TextNode)`
      );
    }
    this.view.appendChild(view.render());
  }
  render() {
    return this.view;
  }
}
