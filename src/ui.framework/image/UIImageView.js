/**
 * 图片
 */
import UIView from '../../core/UIView.js';
import Image from './Image.js';
import Error from '../../Error.js';
import Log from '../../Log.js';
import { ELEMENT_TAG } from '../../const.js';

const ATTR = {
  SRC: 'src',
  ALT: 'alt',
};
export default class UIImageView extends UIView {
  constructor(image) {
    super();
    this.view = document.createElement(ELEMENT_TAG.IMAGE);
    this.image = null;
    if (image) {
      if (!(image instanceof Image)) {
        Error.throwTypeError(`image must be a instanceof Image.`);
      }
      this.image = image;
      this.setAttribute({ [ATTR.SRC]: image.imageUrl, [ATTR.ALT]: image.imageAlt });
    }
  }
  setImage(image) {
    if (!(image instanceof Image)) {
      Error.throwTypeError(`image must be a instanceof Image.`);
    }
    this.image = image;
    this.setAttribute({ [ATTR.SRC]: image.imageUrl, [ATTR.ALT]: image.imageAlt });
  }
}
