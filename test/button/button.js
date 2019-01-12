import UIViewController from '../../src/ui.framework/UIViewController.js';
import UIButton from '../../src/ui.framework/button/UIButton.js';
import UIText from '../../src/ui.framework/text/UIText.js';
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
    const innerButton = new UIButton();
    innerButton.addClass(s.innerButton);
    innerButton.setTitle('addSubView');
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
