import UIButton from '../../src/ui.framework/button/UIButton.js';
import UIText from '../../src/ui.framework/text/UIText.js';
import s from './button.css';

const innerButton = new UIButton();

const target = {
  innerTarget() {
    console.log('button callback.');
  },
  outerTarget() {
    console.log('outerButton click callback.');
  }
};
innerButton.addClass(s.innerButton);
innerButton.addSubView(new UIText('addSubView.'));
innerButton.addTarget(target, 'innerTarget');

const outerButton = new UIButton();
outerButton.addClass(s.outerButton);
outerButton.addSubView(innerButton);
outerButton.addTarget(target, 'outerTarget');

const wrapperButton = new UIButton();
wrapperButton.addClass(s.wrapperButton);
wrapperButton.addSubView(outerButton);

document.body.appendChild(wrapperButton.render());
