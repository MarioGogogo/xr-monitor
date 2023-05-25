import report from '../utils/report';
/**
 * history路由监听
 */
export function historyPageTrackerReport() {
  let beforeTime = Date.now(); // 进入页面的时间
  let beforePage = ''; // 上一个页面

  // 获取在某个页面的停留时间
  function getStayTime() {
    let curTime = Date.now();
    let stayTime = curTime - beforeTime;
    beforeTime = curTime;
    return stayTime;
  }

  /**
   * 重写pushState和replaceState方法
   * @param {*} name
   * @returns
   */
  const createHistoryEvent = function (name) {
    // 拿到原来的处理方法
    const origin = window.history[name];
    return function (event) {
      // if (name === 'replaceState') {
      //   const { current } = event;
      //   const pathName = location.pathname;
      //   if (current === pathName) {
      //     let res = origin.apply(this, arguments);
      //     return res;
      //   }
      // }

      let res = origin.apply(this, arguments);
      let e = new Event(name);
      e.arguments = arguments;
      window.dispatchEvent(e);
      return res;
    };
  };

  // history.pushState
  window.addEventListener('pushState', function () {
    listener();
  });

  // history.replaceState
  window.addEventListener('replaceState', function () {
    listener();
  });

  window.history.pushState = createHistoryEvent('pushState');
  window.history.replaceState = createHistoryEvent('replaceState');

  /**
   *
   * 计算页面停留时间
   */
  function listener() {
    const stayTime = getStayTime(); // 停留时间
    const currentPage = window.location.href; // 页面路径
    console.log('%c Line:63 🥔 页面停留时间', 'font-size:18px;color:#ffffff;background:#CC9966', beforePage + ' | ' + currentPage + '|' + stayTime);
    // report('visit', {
    //   stayTime,
    //   page: beforePage,
    // });
    beforePage = currentPage;
  }

  // 页面load监听
  window.addEventListener('load', function () {
    // beforePage = location.href;
    listener();
  });

  // unload监听
  window.addEventListener('unload', function () {
    listener();
  });

  // history.go()、history.back()、history.forward() 监听
  window.addEventListener('popstate', function () {
    listener();
  });
}

/**
 * hash路由监听
 */
export function hashPageTrackerReport() {
  let beforeTime = Date.now(); // 进入页面的时间
  let beforePage = ''; // 上一个页面

  function getStayTime() {
    let curTime = Date.now();
    let stayTime = curTime - beforeTime;
    beforeTime = curTime;
    return stayTime;
  }

  function listener() {
    const stayTime = getStayTime();
    const currentPage = window.location.href;
    report('visit', {
      stayTime,
      page: beforePage,
    });
    beforePage = currentPage;
  }

  // hash路由监听
  window.addEventListener('hashchange', function () {
    listener();
  });

  // 页面load监听
  window.addEventListener('load', function () {
    listener();
  });

  const createHistoryEvent = function (name) {
    const origin = window.history[name];
    return function (event) {
      // if (name === 'replaceState') {
      //   const { current } = event;
      //   const pathName = location.pathname;
      //   if (current === pathName) {
      //     let res = origin.apply(this, arguments);
      //     return res;
      //   }
      // }

      let res = origin.apply(this, arguments);
      let e = new Event(name);
      e.arguments = arguments;
      window.dispatchEvent(e);
      return res;
    };
  };

  window.history.pushState = createHistoryEvent('pushState');

  // history.pushState
  window.addEventListener('pushState', function () {
    listener();
  });
}
