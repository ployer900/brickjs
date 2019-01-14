/**
 * uiview
 */
import UIView from '../../core/UIView.js';
import UIRawText from '../text/UIRawText.js';
import { ELEMENT_TAG } from '../../const.js';

export default class UIViewComponent extends UIView {
  constructor() {
    super();
    this.view = document.createElement(ELEMENT_TAG.VIEW);
  }
}
