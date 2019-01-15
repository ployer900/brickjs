import reconcile from './diff.js';

let rootInstance = null;
const render = (element, container) => {
  const prevInstance = rootInstance;
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance;
}

export default render;
