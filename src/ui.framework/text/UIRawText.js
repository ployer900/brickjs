import UIView from '../../core/UIView.js';

export default class UIText extends UIView {
  constructor(text) {
    super()
    this.view = document.createTextNode(text);
  }
}
