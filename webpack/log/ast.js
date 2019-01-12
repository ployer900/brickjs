import UIView from '../../src/ui.framework/view/UIView.js';
import UIButton from '../../src/ui.framework/button/UIButton.js';
import UIColor from '../../src/ui.framework/color/UIColor.js';
import UIText from '../../src/ui.framework/text/UIText.js';
const innerButton = new UIButton();
const target = {
  selector() {
    console.log('button callback.');
  }

};
innerButton.addSubView(new UIText('addSubView.')).addStyle({
  display: 'block',
  width: '120px',
  height: '120px',
  color: UIColor.Red,
  backgroundColor: UIColor.Gray,
  fontSize: '12px',
  border: '1px solid #CCC'
}).addTarget(target);
const wrapperButton = new UIButton();
wrapperButton.addSubView(innerButton).addStyle({
  display: 'block',
  width: '220px',
  height: '220px',
  color: UIColor.Green,
  backgroundColor: UIColor.Blue,
  fontSize: '12px',
  border: '1px solid #CCC'
});
document.body.appendChild(wrapperButton.render());