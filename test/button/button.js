import UIViewController from '../../src/ui.framework/UIViewController.js';
import UIButton from '../../src/ui.framework/button/UIButton.js';
import UIImageView from '../../src/ui.framework/image/UIImageView.js';
import s from './button.css';

class UIPageController extends UIViewController {
  constructor() {
    super();
  }
  innerTarget() {
    console.log('button callback.');
  }
  outerTarget() {
    console.log('outerButton click callback.');
  }
  render() {
    const image = new UIImageView();
    image.setImageUrl('https://p0.meituan.net/waimaipoi/fd5a0fb27081972600aa2da6e0d3c9374019.jpeg@180w_132h_1e_1c');
    image.setAlt('shopImage');
    image.addClass(s.shopImage);

    const innerButton = new UIButton();
    innerButton.addClass(s.innerButton);
    innerButton.setTitle('addSubView');
    innerButton.addSubView(image);
    innerButton.addTarget(this, 'innerTarget');

    const outerButton = new UIButton();
    outerButton.addClass(s.outerButton);
    outerButton.addSubView(innerButton);
    outerButton.addTarget(this, 'outerTarget');

    const wrapperButton = new UIButton();
    wrapperButton.addClass(s.wrapperButton);
    wrapperButton.addSubView(outerButton);
    return wrapperButton.render();
  }
}

document.getElementById('app').appendChild(new UIPageController().render());
