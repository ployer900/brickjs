import UIView from '../../core/UIView.js';

export default class UIText extends UIView {
  constructor(text) {
    super()
    this._el = document.createTextNode(text);
  }
  render() {
    return this._el;
  }
}
