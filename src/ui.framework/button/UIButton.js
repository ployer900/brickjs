
import UIView from '../view/UIView.js';
import UIText from '../text/UIText.js';
import UIColor from '../color/UIColor.js';

const BUTTON = 'button';
export default class UIButton extends UIView {
  constructor(width, height, text) {
    super(width, height);
    this._text = text || 'button';
    this._el = document.createElement(BUTTON);
    return this;
  }
  render() {
    this._setStyleAttribute();
    this.addSubView(new UIText(this._text));
    return this._el;
  }
}
