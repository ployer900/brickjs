/**
 * 定义view基类，继承于UIEvent类
 */
import util from '../../utils/index.js';

export default class UIView extends UIEvent {
  constructor(width, height) {
    super(width);
    this._width = width;
    this._height = height;
    this._style = {};
    this._el = null;
  }
  _serializeStyle() {
    const { _style } = this;
    return Object.keys(_style).map(key => `${util.toJoin(key)}:${_style[key]}`).join(';');
  }
  _setStyleAttribute() {
    this._el.setAttribute('style', this._serializeStyle());
  }
  addStyle(style = {})  {
    this._style = style;
    return this;
  }
  addTarget(target, selector) {
    this._el.addEventListener('click', function() {
      target.selector();
    });
    return this;
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
    return this;
  }
}
