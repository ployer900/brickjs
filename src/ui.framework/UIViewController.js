/**
 * 控制器
 */
import UIController from '../core/UIController.js';

export default class UIViewController extends UIController {
  constructor() {
    super();
  }
  renderView() {}
  render() {
    this.renderView();
    return super.render();
  }
}
