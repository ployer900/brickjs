/**
 * 图片
 */
import UIView from '../../core/UIView.js';
import { ELEMENT_TAG } from '../const.js';

const ATTR = {
  SRC: 'src',
  ALT: 'alt',
};
export default class UIImageView extends UIView {
  constructor(url, alt) {
    super();
    this._url = url;
    this._alt = alt;
    this._el = document.createElement(ELEMENT_TAG.IMAGE);
    this.setAttribute({ [ATTR.SRC]: url, [ATTR.ALT]: alt });
  }
  setImageUrl(url) {
    this._url = url;
    this.setAttribute(ATTR.SRC, url);
  }
  setAlt(alt) {
    this._alt = alt;
    this.setAttribute(ATTR.ALT, alt);
  }
  render() {
    return this._el;
  }
}
