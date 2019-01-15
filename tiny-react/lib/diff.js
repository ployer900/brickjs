// 创建component实例
const createPublicInstances = (element, internalInstance) => {
  const { type, props } = element;
  const publicInstance = new type(props);
  publicInstance.__internalInstance = internalInstance;
  return publicInstance;
};

// 属性更新
const updateDomProperties = (dom, prevProps, nextProps) => {
  const isEvent = name => name.startsWith('on');
  const isAttribute = name => !isEvent(name) && name !== 'children';

  Object.keys(prevProps).filter(isEvent).forEach(name => {
    const eventType = name.toLowerCase().substring(2);
    dom.removeEventListener(eventType, prevProps[name]);
  });
  Object.keys(prevProps).filter(isAttribute).forEach(name => {
    dom[name] = null;
  });

  Object.keys(nextProps).filter(isEvent).forEach(name => {
    const eventType = name.toLowerCase().substring(2);
    dom.addEventListener(eventType, nextProps[name]);
  });
  Object.keys(nextProps).filter(isAttribute).forEach(name => {
    dom[name] = nextProps[name];
  });
};

let i = 0;

// 实例化(根据element创建dom)
const instantiate = (element) => {
  const { type, props } = element;
  const isDomElement = typeof type === 'string';
  if (isDomElement) {
    // 普通标签组件
    const isTextElement = type === 'TEXT ELEMENT';
    const dom = isTextElement ? document.createTextNode(props.nodeValue)
      :document.createElement(type);
    updateDomProperties(dom, [], props);
    const childElements = props.children || [];
    const childInstances = childElements.map(instantiate);  // 子节点变量
    const childDoms = childInstances.map(instance => instance.dom);
    childDoms.forEach(childDom => dom.appendChild(childDom));
    return { element, dom, childInstances }; // 对于普通标签组件可以有多个子节点
  } else {
    // Component组件
    const instance = {};
    const publicInstance = createPublicInstances(element, instance);
    const childElement = publicInstance.render();
    const childInstance = instantiate(childElement);
    const dom = childInstance.dom;
    Object.assign(instance, { dom, element, childInstance, publicInstance }); // 对于component组件只能有一个子节点
    return instance;
  }
};

// diff
// parentDom 父节点
// instance 当前节点实例(包含dom, childInstances, element)
// 新的element(虚拟节点)
const reconcile = (parentDom, instance, element) => {
  // 当前节点为空，新增
  if (instance == null) {
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    return newInstance;
  } else if(element == null) {
    // 虚拟节点不存在，删除相应dom节点
    parentDom.removeChild(instance.dom);
    return null;
  } else if (typeof element.type === 'string') {
    // 节点类型相同，更新属性
    updateDomProperties(instance.dom, instance.element.props, element.props);
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  } else if(instance.element.type !== element.type) {
    // 节点替换
    const newInstance = instantiate(element);
    parentDom.replaceChild(newInstance.dom, instance.dom);
    return newInstance;
  } else {
    instance.publicInstance.props = element.props;
    const childElement = instance.publicInstance.render();
    const oldChildInstance = instance.childInstance;
    const childInstance = reconcile(parentDom, oldChildInstance, childElement);
    instance.dom = childInstance.dom;
    instance.childInstance = childInstance;
    instance.element = element;
    return instance;
  }
};

/// 子节点diff
const reconcileChildren = (instance, element) => {
  const dom = instance.dom;
  const childInstances = instance.childInstances;
  const nextChildElements = element.props.children;
  const newChildInstances = [];
  const count = Math.max(childInstances.length, nextChildElements.length);
  for (let i = 0; i < count; i++) {
    const childInstance = childInstances[i];
    const childElement = nextChildElements[i];
    const newChildInstance = reconcile(dom, childInstance, childElement);
    newChildInstances.push(newChildInstance);
  }
  return newChildInstances.filter(instance => instance != null);
};

export default reconcile;
