
import UIView from '../../core/UIView.js';
import UIText from '../text/UIText.js';

const BUTTON = 'button';
export default class UIButton extends UIView {
  constructor() {
    super();
    this._text = 'button';
    this._el = document.createElement(BUTTON);
  }
  setTitle(text) {
    this._text = text;
  }
  render() {
    this.addSubView(new UIText(this._text));
    return this._el;
  }
}
