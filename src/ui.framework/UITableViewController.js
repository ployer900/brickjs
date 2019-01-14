/**
 * table
 */
import UIViewController from './UIViewController.js';
import UIView from '../core/UIView.js';
import { ELEMENT_TAG } from '../const.js';

class UIFragment extends UIView {
  constructor() {
    super();
    this.view = document.createDocumentFragment();
  }
}

export default class UITableViewController extends UIViewController {
  constructor(datasource = []) {
    super();
    this.delegate = null;
    this.dataSource = datasource;
    this._fragment = new UIFragment();
  }
  setDataSource(dataSource) {
    this.dataSource = dataSource;
  }
  onClickRow(row, e) {
    console.log('onClickRow', row, e);
  }
  renderRowView(row) {
    return document.createElement(ELEMENT_TAG.VIEW);
  }
  renderView() {
    this.dataSource.forEach((row, i) => {
      this._fragment.addSubView(this.renderRowView(row));
    });
    this.addSubView(this._fragment);
  }
  refresh() {
    this.renderView();
  }
}
