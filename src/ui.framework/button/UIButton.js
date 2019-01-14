/**
 * button
 */
import UIView from '../../core/UIView.js';
import UIRawText from '../text/UIRawText.js';
import { ELEMENT_TAG } from '../../const.js';

const DEFAULT_TEXT = 'button';
export default class UIButton extends UIView {
  constructor(text) {
    super();
    this.view = document.createElement(ELEMENT_TAG.BUTTON);
    text && this.setTitle(text);
  }
  setTitle(text) {
    this._text = text || DEFAULT_TEXT;
    this.addSubView(new UIRawText(this._text));
  }
}
