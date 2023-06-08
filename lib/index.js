import { jsErrorHandle } from './error/jsError.js';
import { promiseErrorHandle } from './error/promiseError';
import { vueErrorHandler } from './error/vueError.js';
import { httpErrorHandle } from './http/index.js';
import { hashPageTrackerReport, historyPageTrackerReport } from './pageStay/index.js';
import { performanceHandle } from './performance/index.js';
import { checkOptions } from './utils/utils.js';

class xrMonitor {
  constructor(options) {
    this.options = options;
  }
  static init(options) {
    //检查参数配置是否合法
    checkOptions(options);
    const monitor = new xrMonitor(options);
    monitor.tool_error();
    monitor.tool_http();
    monitor.tool_performance();
    monitor.tool_pageRouter();
    return monitor;
  }
  tool_error() {
    const { jsError, promiseError, vueError, performance } = this.options;
    jsError && jsErrorHandle(this.options);
    promiseError && promiseErrorHandle(this.options);
    vueError && vueErrorHandler(this.options);
  }
  tool_http() {
    const { actionLogs } = this.options;
    actionLogs && httpErrorHandle(this.options);
  }
  tool_performance() {
    const { performanceLogs } = this.options;
    performanceLogs && performanceHandle(this.options);
  }
  tool_pageRouter() {
    const { pageRouter } = this.options;
    if (pageRouter) {
      hashPageTrackerReport(this.options);
      historyPageTrackerReport(this.options);
    }
  }
}

export default xrMonitor;
