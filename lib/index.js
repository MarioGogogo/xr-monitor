import { jsErrorHandle } from './error/jsError.js';
import { promiseErrorHandle } from './error/promiseError';
import { vueErrorHandler } from './error/vueError.js';
import { handleReport } from './handle-report/index.js';
import { httpErrorHandle } from './http/index.js';
import { hashPageTrackerReport, historyPageTrackerReport } from './pageStay/index.js';
import { performanceHandle } from './performance/index.js';
import { checkOptions } from './utils/utils.js';

// class xrMonitor123123 {
//   static instance = null; // 添加静态属性
//   constructor(options) {
//     this.options = options;
//   }
//   static init(options) {
//     //检查参数配置是否合法
//     checkOptions(options);
//     const monitor = new xrMonitor(options);
//     monitor.#tool_error();
//     monitor.#tool_http();
//     monitor.#tool_performance();
//     monitor.#tool_pageRouter();
//     xrMonitor.instance = monitor; // 将初始化后的实例保存到静态属性中
//     return monitor;
//   }
//   static report(params) {
//     if (!xrMonitor.instance) {
//       // 判断实例是否存在
//       throw new Error('Please call xrMonitor.init() before calling xrMonitor.report().');
//     }
//     const options = xrMonitor.instance.options;
//     const reportParams = { ...options, ...params }; // 合并参数
//     handleReport(reportParams);
//   }
//   #tool_error() {
//     const { jsError, promiseError, vueError, performance } = this.options;
//     jsError && jsErrorHandle(this.options);
//     promiseError && promiseErrorHandle(this.options);
//     vueError && vueErrorHandler(this.options);
//   }
//   #tool_http() {
//     const { actionLogs } = this.options;
//     actionLogs && httpErrorHandle(this.options);
//   }
//   #tool_performance() {
//     const { performanceLogs } = this.options;
//     performanceLogs && performanceHandle(this.options);
//   }
//   #tool_pageRouter() {
//     const { pageRouter } = this.options;
//     if (pageRouter) {
//       hashPageTrackerReport(this.options);
//       historyPageTrackerReport(this.options);
//     }
//   }
// }

const xrMonitor = (() => {
  function tool_error(options) {
    const { jsError, promiseError, vueError, performance } = options;
    jsError && jsErrorHandle(options);
    promiseError && promiseErrorHandle(options);
    vueError && vueErrorHandler(options);
  }
  function tool_http(options) {
    const { actionLogs } = options;
    actionLogs && httpErrorHandle(options);
  }
  function tool_performance(options) {
    const { performanceLogs } = options;
    performanceLogs && performanceHandle(options);
  }
  function tool_pageRouter(options) {
    const { pageRouter } = options;
    if (pageRouter) {
      hashPageTrackerReport(options);
      historyPageTrackerReport(options);
    }
  }
  class xrMonitor {
    constructor(options) {
      this.options = options;
      this.init();
    }

    init() {
      console.log('xrMonitor初始化成功');
      checkOptions(this.options);
      tool_error(this.options);
      tool_http(this.options);
      tool_performance(this.options);
      tool_pageRouter(this.options);
    }

    report(params) {
      console.log('init options', this.options);
      const reportParams = { ...this.options, ...params }; // 合并参数
      handleReport(reportParams);
    }
  }

  xrMonitor.init = function (options) {
    return new xrMonitor(options);
  };

  return xrMonitor;
})();

export default xrMonitor;
