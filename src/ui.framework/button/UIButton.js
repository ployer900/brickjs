
import UIView from '../../core/UIView.js';
import UIText from '../text/UIText.js';

const BUTTON = 'button';
export default class UIButton extends UIView {
  constructor(width, height, text) {
    super(width, height);
    this._text = text || 'button';
    this._el = document.createElement(BUTTON);
  }
  render() {
    this.addSubView(new UIText(this._text));
    return this._el;
  }
}
