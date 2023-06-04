(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.XrMonitor = factory());
})(this, (function () { 'use strict';

  /**
   * 阿里云日志上报系统这里不做处理
   * @type {string}
   */
  const BASE_URL = 'http://127.0.0.1:7001/logs';
  // this.url = `http://${project}.${host}/logstores/${logStore}/track`; //阿里云上报的路径

  function onload(callback) {
    if (document.readyState === 'complete') {
      callback();
    } else {
      window.addEventListener('load', callback);
    }
  }
  function getLines(stack) {
    return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, '')).join('^');
  }
  function getLastEvent() {
    let lastEvent;
    ['click', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach(eventType => {
      document.addEventListener(eventType, event => {
        lastEvent = event;
      }, {
        capture: true,
        //捕获阶段
        passive: true //默认不阻止默认事件
      });
    });

    return lastEvent;
  }
  function getSelectors(path) {
    return path.reverse().filter(element => {
      return element !== document && element !== window;
    }).map(element => {
      let selector = '';
      if (element.id) {
        return `${element.nodeName.toLowerCase()}#${element.id}`;
      } else if (element.className && typeof element.className === 'string') {
        return `${element.nodeName.toLowerCase()}.${element.className}`;
      } else {
        selector = element.nodeName.toLowerCase();
      }
      return selector;
    }).join(' ');
  }
  function resourceGetSelector(pathsOrTarget) {
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
  function getSelector(path) {
    if (!path) return '';
    const {
      document
    } = path[0];
    const {
      activeElement
    } = document;
    return activeElement.classList + '_' + activeElement.id + '_' + activeElement.localName;
  }
  function today_now() {
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = new Date().getDate();
    let hh = new Date().getHours();
    let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
    let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
    return `${yy}-${mm}-${dd} ${hh}:${mf}:${ss}`;
  }

  /*!
   * user-agent
   * Copyright(c) 2010-2011 TJ Holowaychuk.
   * Authored by TJ Holowaychuk
   * MIT Licensed
   */

  /**
   * Library version.
   */

  var version_1 = '1.0.4';

  /**
   * Parse the given user-agent string into an object of usable data.
   *
   * Example:
   *
   *      var userAgent = require('user-agent')
   *      userAgent.parse('Mozilla/5.0 (Windows; U; Windows NT 5.1; en) AppleWebKit/526.9 (KHTML, like Gecko) Version/4.0dp1 Safari/526.8')
   *      // => { name: 'safari', version: '4.0dp1', os: 'Windows XP', full: '... same string as above ...' }
   *
   * @param  {String} str
   * @return {Object}
   * @api public
   */

  var parse = function(str) {
    var agent = { full: str, name: name(str) };
    agent.version = version(str, agent.name);
    agent.fullName = agent.name + ' ' + agent.version;
    agent.os = os(str);
    return agent;
  };

  /**
   * Get the browser version based on the given browser name.
   *
   * @param  {String} str
   * @param  {String} name
   * @return {String}
   * @api private
   */

  function version(str, name) {
    if (name === 'safari') name = 'version';
    if (name){
  	  return new RegExp(name + '[\\/ ]([\\d\\w\\.-]+)', 'i').exec(str) && RegExp.$1 || '';
    }else {
  	  var m=str.match(/version[\/ ]([\d\w\.]+)/i);
  	  return m && m.length>1 ? m[1] : '';
    }  
  }

  /**
   * Supported operating systems.
   */

  var operatingSystems = {
      'iPad': /ipad/i
    , 'iPhone': /iphone/i
    , 'Windows Vista': /windows nt 6\.0/i
    , 'Windows 7': /windows nt 6\.\d+/i
    , 'Windows 2003': /windows nt 5\.2+/i
    , 'Windows XP': /windows nt 5\.1+/i
    , 'Windows 2000': /windows nt 5\.0+/i
    , 'OS X $1.$2': /os x (\d+)[._](\d+)/i
    , 'Linux': /linux/i
    , 'Googlebot': /googlebot/i
  };

  var osNames = Object.keys(operatingSystems);

  /**
   * Get operating system from the given user-agent string.
   *
   * @param  {String} str
   * @return {String}
   * @api private
   */

  function os(str) {
    var captures;
    for (var i = 0, len = osNames.length; i < len; ++i) {
      if (captures = operatingSystems[osNames[i]].exec(str)) {
        return ~osNames[i].indexOf('$1')
          ? osNames[i].replace(/\$(\d+)/g, function(_, n){
            return captures[n]
          }) : osNames[i];
      }
    }
    return '';
  }

  /**
   * Supported browser names.
   */

  var names = [
     'opera'
   , 'konqueror'
   , 'firefox'
   , 'chrome'
   , 'epiphany'
   , 'safari'
   , 'msie'
   , 'curl'
  ];

  /**
   * Get browser name for the given user-agent string.
   *
   * @param  {String} str
   * @return {String}
   * @api private
   */

  function name(str) {
    str = str.toLowerCase();
    for (var i = 0, len = names.length; i < len; ++i) {
      if (str.indexOf(names[i]) !== -1) return names[i];
    }
    return '';
  }

  var userAgent$1 = {
  	version: version_1,
  	parse: parse
  };

  var userAgent = userAgent$1;

  /**
   * 全局上报信息配置
   */
  function getExtraData() {
    return {
      timestamp: new Date().getTime(),
      reportTime: today_now(),
      projectName: document.title,
      host: '127.0.0.1',
      //本地ip 后端会转成客户端ip
      url: location.href,
      userAgent: userAgent.parse(navigator.userAgent).fullName,
      borwser: userAgent.parse(navigator.userAgent).name,
      client: userAgent.parse(navigator.userAgent).os

      //用户ID
    };
  }
  //gif图片做上传 图片速度 快没有跨域 问题，
  class Report {
    constructor() {
      this.url = BASE_URL;
      this.xhr = new XMLHttpRequest();
    }
    send(data = {}) {
      let extraData = getExtraData();
      let log = {
        ...extraData,
        ...data
      };
      //对象 的值不能是数字
      for (let key in log) {
        if (typeof log[key] === 'number') {
          log[key] = `${log[key]}`;
        }
      }
      console.table(log);
      let body = JSON.stringify({
        __logs__: [log]
      });
      if (navigator.sendBeacon) {
        // 浏览器支持 sendBeacon
        navigator.sendBeacon(this.url, body);
      } else {
        // 浏览器不支持 sendBeacon
        // 使用其他方式传输数据
        this.xhr.open('POST', this.url, true);
        this.xhr.setRequestHeader('Content-Type', 'application/json'); //请求体类型
        this.xhr.setRequestHeader('x-log-apiversion', '0.6.0'); //版本号
        this.xhr.setRequestHeader('x-log-bodyrawsize', body.length); //请求体的大小
        this.xhr.onload = function () {
          // console.log(this.xhr.response);
        };
        this.xhr.onerror = function (error) {
          //console.log(error);
        };
        this.xhr.send(body);
      }
    }
  }
  var report = new Report();

  function jsErrorHandle() {
    //监听全局未捕获的错误
    window.addEventListener('error', function (event) {
      //错误事件对象
      console.log('%c Line:12 🍪 path', 'font-size:18px;color:#ffffff;background:#CC9966', event.composedPath());
      //这是一个脚本加载错误 图片  video资源缺少
      if (event.target && (event.target.src || event.target.href)) {
        report.send({
          type: 'error',
          //小类型 这是一个错误
          errorType: 'resourceError',
          //js或css资源加载错误
          filename: event.target.src || event.target.href,
          //哪个文件报错了
          tagName: event.target.tagName,
          //SCRIPT
          selector: resourceGetSelector(event.target) //代表最后一个操作的元素
        });
      } else {
        report.send({
          type: 'error',
          //小类型 这是一个错误
          errorType: 'jsError',
          //JS执行错误
          message: event.message,
          //报错信息
          filename: event.filename,
          //哪个文件报错了
          lineno: event.lineno,
          colno: event.colno,
          stack: getLines(event.error.stack),
          selector: event.composedPath ? getSelector(event.composedPath()) : '' //代表最后一个操作的元素
        });
      }
    }, true);
  }

  function promiseErrorHandle() {
    /**
     * 捕获未处理的Promise异常
     */
    window.addEventListener('unhandledrejection', event => {
      console.log(event);
      let message;
      let filename;
      let line = 0;
      let column = 0;
      let stack = '';
      let reason = event.reason;
      if (typeof reason === 'string') {
        message = reason;
      } else if (typeof reason === 'object') {
        //说明是一个错误对象
        message = reason.message;
        //at http://localhost:8080/:23:38
        if (reason.stack) {
          let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
          filename = matchResult[1];
          line = matchResult[2];
          column = matchResult[3];
        }
        stack = getLines(reason.stack);
      }
      //上报
      report.send({
        type: 'error',
        //小类型 这是一个错误
        errorType: 'promiseError',
        //JS执行错误
        message: message,
        //报错信息
        filename: filename,
        //哪个文件报错了
        lineno: line,
        colno: column,
        stack,
        selector: event.composedPath ? getSelector(event.composedPath()) : '' //代表最后一个操作的元素
      });
    }, true);
  }

  function vueErrorHandler() {
    Vue.config.errorHandler = (error, vm, info) => {
      console.log('%c Line:4 🌰 error, vm, info', 'font-size:18px;color:#ffffff;background:#7f8fa6', error, vm, info);
      try {
        let metaData = {
          message: error.message,
          stack: error.stack,
          info: info
        };
        if (Object.prototype.toString.call(vm) === '[object Object]') {
          metaData.componentName = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;
          metaData.propsData = vm.$options.propsData;
        }
        report.send({
          type: 'error',
          //小类型 这是一个错误
          errorType: 'vueError',
          //JS执行错误
          message: JSON.stringify(metaData)
        });
      } catch (error) {
        console.log('%c Line:21 🍣 vueError', 'font-size:18px;color:#ffffff;background:#FF6666', error);
      }
    };
  }

  function httpErrorHandle() {
    let XMLHttpRequest = window.XMLHttpRequest;
    let oldOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, async) {
      //NOTE:这里会造成死循环 必须排除  logs上次监控
      if (!url.match(/sockjs/) && !url.match(/logs/)) {
        this.logData = {
          method,
          url,
          async
        };
      }
      return oldOpen.apply(this, arguments);
    };
    //axios 背后有两种 如果 browser XMLHttpRequest  node http
    let oldSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function (body) {
      if (this.logData) {
        let startTime = Date.now(); //在发送之前记录一下开始的时间
        //XMLHttpRequest  readyState 0 1 2 3 4
        //status 2xx 304 成功 其它 就是失败
        let handler = type => event => {
          let duration = Date.now() - startTime - 2; //持续时间
          let status = this.status; //200 500
          let statusText = this.statusText; // OK Server Error
          report.send({
            type: 'xhr',
            eventType: type,
            //load error abort
            pathname: this.logData.url,
            //请求路径
            status: status + '-' + statusText,
            //状态码
            duration,
            //持续时间
            response: this.response ? JSON.stringify(this.response) : '',
            //响应体
            request: body || ''
          });
        };
        this.addEventListener('load', handler('load'), false);
        this.addEventListener('error', handler('error'), false);
        this.addEventListener('abort', handler('abort'), false);
      }
      return oldSend.apply(this, arguments);
    };
  }

  /**
   * history路由监听
   */
  function historyPageTrackerReport() {
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
  function hashPageTrackerReport() {
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
      console.log('%c Line:63 🥔 页面停留时间', 'font-size:18px;color:#ffffff;background:#CC9966', beforePage + ' | ' + currentPage + '|' + stayTime);
      // report('visit', {
      //   stayTime,
      //   page: beforePage,
      // });
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

  function performanceHandle() {
    let FMP, LCP;
    // 增加一个性能条目的观察者
    if (PerformanceObserver) {
      new PerformanceObserver((entryList, observer) => {
        let perfEntries = entryList.getEntries();
        FMP = perfEntries[0]; //startTime 2000以后
        observer.disconnect(); //不再观察了
      }).observe({
        entryTypes: ['element']
      }); //观察页面中的意义的元素

      new PerformanceObserver((entryList, observer) => {
        let perfEntries = entryList.getEntries();
        LCP = perfEntries[0];
        observer.disconnect(); //不再观察了
      }).observe({
        entryTypes: ['largest-contentful-paint']
      }); //观察页面中的意义的元素

      new PerformanceObserver((entryList, observer) => {
        let lastEvent = getLastEvent();
        let firstInput = entryList.getEntries()[0];
        console.log('%c Line:25 🍆 FID', 'font-size:18px;color:#ffffff;background:#FFCC99', firstInput);
        if (firstInput) {
          //  startTime开点击的时间 差值就是处理的延迟
          let inputDelay = firstInput.processingStart - firstInput.startTime;
          let duration = firstInput.duration; //处理的耗时
          if (inputDelay > 0 || duration > 0) {
            console.log('%c Line:30 👨🏻‍🏫 首次输入延迟日志上报', 'font-size:18px;color:#ffffff;background:#c23616');
            report.send({
              type: 'performance',
              //用户体验指标
              eventType: 'firstInputDelay',
              //首次输入延迟
              inputDelay,
              //延时的时间
              duration,
              //处理的时间
              startTime: firstInput.startTime,
              selector: lastEvent ? resourceGetSelector(lastEvent.path || lastEvent.target) : ''
            });
          }
        }
        observer.disconnect(); //不再观察了
      }).observe({
        type: 'performance',
        buffered: true
      }); //观察页面中的意义的元素
    }

    //用户的第一次交互 点击页面
    onload(function () {
      setTimeout(() => {
        const {
          fetchStart,
          connectStart,
          connectEnd,
          requestStart,
          responseStart,
          responseEnd,
          domLoading,
          domInteractive,
          domContentLoadedEventStart,
          domContentLoadedEventEnd,
          loadEventStart
        } = performance.timing;
        report.send({
          type: 'performance',
          //用户体验指标
          eventType: 'timing',
          //统计每个阶段的时间
          connectTime: connectEnd - connectStart,
          //连接时间
          ttfbTime: responseStart - requestStart,
          //首字节到达时间
          responseTime: responseEnd - responseStart,
          //响应的读取时间
          parseDOMTime: loadEventStart - domLoading,
          //DOM解析的时间
          domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart,
          timeToInteractive: domInteractive - fetchStart,
          //首次可交互时间
          loadTIme: loadEventStart - fetchStart //完整的加载时间
        });

        let FP = performance.getEntriesByName('first-paint')[0];
        let FCP = performance.getEntriesByName('first-contentful-paint')[0];
        //开始发送性能指标
        // console.log('FP', FP);
        // console.log('FCP', FCP);
        // console.log('FMP', FMP);
        // console.log('LCP', LCP);
        report.send({
          type: 'performance',
          //用户体验指标
          eventType: 'paint',
          //统计每个阶段的时间
          firstPaint: FP ? FP.startTime : '',
          firstContentfulPaint: FCP ? FCP.startTime : '',
          firstMeaningfulPaint: FMP ? FMP.startTime : '',
          largestContentfulPaint: LCP ? LCP.startTime : ''
        });
      }, 3000);
    });
  }

  class xrMonitor {
    constructor(options) {
      this.options = options;
    }
    static init(options) {
      const monitor = new xrMonitor(options);
      monitor.tool_error();
      monitor.tool_http();
      monitor.tool_performance();
      monitor.tool_pageRouter();
      return monitor;
    }
    tool_error() {
      const {
        jsError,
        promiseError,
        vueError,
        performance
      } = this.options;
      jsError && jsErrorHandle();
      promiseError && promiseErrorHandle();
      vueError && vueErrorHandler();
    }
    tool_http() {
      const {
        httpError
      } = this.options;
      httpError && httpErrorHandle();
    }
    tool_performance() {
      const {
        performance
      } = this.options;
      performance && performanceHandle();
    }
    tool_pageRouter() {
      const {
        pageRouter
      } = this.options;
      pageRouter === 'hash' && hashPageTrackerReport();
      pageRouter === 'history' && historyPageTrackerReport();
    }
  }

  return xrMonitor;

}));
