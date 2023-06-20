import { jsErrorHandle } from './error/jsError.js';
import { promiseErrorHandle } from './error/promiseError';
import { vueErrorHandler } from './error/vueError.js';
import { handleReport } from './handle-report/index.js';
import { httpErrorHandle } from './http/index.js';
import { hashPageTrackerReport, historyPageTrackerReport } from './pageStay/index.js';
import { performanceHandle } from './performance/index.js';
import { checkOptions } from './utils/utils.js';

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
      console.log('%c Line:40 🧑🏻‍🚀 xrMonitor初始化成功', 'font-size:18px;color:#ffffff;background:#669966');
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
