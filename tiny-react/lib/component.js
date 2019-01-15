import reconcile from './diff.js';

// 更新组件
const updateInstance = (internalInstance) => {
  const parentDom = internalInstance.dom.parentNode;
  const element = internalInstance.element;
  reconcile(parentDom, internalInstance, element);
}

export default class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
  }
  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState);
    updateInstance(this.__internalInstance);
  }
}
