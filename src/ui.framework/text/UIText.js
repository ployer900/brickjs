/**
 * text
 */
import UIView from '../../core/UIView.js';
import { ELEMENT_TAG } from '../../const.js';
import UIRawText from './UIRawText.js';

const DEFAULT_TEXT = 'span';
export default class UIText extends UIView {
  constructor(text) {
    super();
    this.view = document.createElement(ELEMENT_TAG.TEXT);
    text && this.setText(text);
  }
  setText(text) {
    this._text = text || DEFAULT_TEXT;
    this.addSubView(new UIRawText(this._text));
  }
}
