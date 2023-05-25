import { jsErrorHandle } from './error/jsError.js';
import { promiseErrorHandle } from './error/promiseError';
import { vueErrorHandler } from './error/vueError.js';
import { httpErrorHandle } from './http/index.js';
import { performanceHandle } from './performance/index.js';
class xrMonitor {
  constructor(options) {
    this.options = options;
  }
  static init(options) {
    const monitor = new xrMonitor(options);
    monitor.tool_error();
    monitor.tool_http();
    monitor.tool_performance();
    return monitor;
  }
  tool_error() {
    console.log('%c Line:14 👨🏻‍🏫 根据配置参数按需提供功能模块', 'font-size:18px;color:#ffffff;background:#FFCC99', this.options);
    const { jsError, promiseError, vueError, httpError, performance } = this.options;
    jsError && jsErrorHandle();
    promiseError && promiseErrorHandle();
    vueError && vueErrorHandler();
    httpError && httpErrorHandle();
    performance && performanceHandle();
  }
  tool_http() {}
  tool_performance() {}
}

export default xrMonitor;
