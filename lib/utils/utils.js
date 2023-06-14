export function onload(callback) {
  if (document.readyState === 'complete') {
    callback();
  } else {
    window.addEventListener('load', callback);
  }
}
export function getLines(stack) {
  return stack
    .split('\n')
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ''))
    .join('^');
}

export function getLastEvent() {
  let lastEvent;
  ['click', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach((eventType) => {
    document.addEventListener(
      eventType,
      (event) => {
        lastEvent = event;
      },
      {
        capture: true, //捕获阶段
        passive: true, //默认不阻止默认事件
      }
    );
  });
  return lastEvent;
}

export function getSelectors(path) {
  return path
    .reverse()
    .filter((element) => {
      return element !== document && element !== window;
    })
    .map((element) => {
      let selector = '';
      if (element.id) {
        return `${element.nodeName.toLowerCase()}#${element.id}`;
      } else if (element.className && typeof element.className === 'string') {
        return `${element.nodeName.toLowerCase()}.${element.className}`;
      } else {
        selector = element.nodeName.toLowerCase();
      }
      return selector;
    })
    .join(' ');
}
export function resourceGetSelector(pathsOrTarget) {
  if (Array.isArray(pathsOrTarget)) {
    //可能是一个数组
    return getSelectors(pathsOrTarget);
  } else {
    //也有可有是一个对象
    let path = [];
    while (pathsOrTarget) {
      path.push(pathsOrTarget);
      pathsOrTarget = pathsOrTarget.parentNode;
    }
    return getSelectors(path);
  }
}
export function getSelector(path) {
  if (!path) return '';
  const { document } = path[0];
  const { activeElement } = document;
  return activeElement.classList + '_' + activeElement.id + '_' + activeElement.localName;
}

export function today_now() {
  let yy = new Date().getFullYear();
  let mm = new Date().getMonth() + 1;
  let dd = new Date().getDate();
  let hh = new Date().getHours();
  let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
  let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
  return `${yy}-${mm}-${dd} ${hh}:${mf}:${ss}`;
}

/**
 * 获取元素的dom路径
 * @param {*} element  e.target;  ---> *[@id="root"]/DIV[1]/DIV[2]/BUTTON[1]
 * @returns
 */
export function getPathTo(element) {
  if (element.id !== '') return '//*[@id="' + element.id + '"]';
  if (element === document.body) return element.tagName;

  let ix = 0;
  let siblings = element.parentNode.childNodes;
  for (let i = 0; i < siblings.length; i++) {
    let sibling = siblings[i];
    if (sibling === element) return getPathTo(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
  }
}

export function checkOptions(options) {
  if (!options) {
    throw new Error('options不能为空');
  }
  if (options.url === '') {
    throw new Error('url不能为空');
  }
  if (options.vueError && options.vue == '') {
    throw new Error('vue实例不能为空');
  }

  return true;
}
