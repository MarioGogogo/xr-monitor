import report from '../utils/report';
import { getLastEvent, getLines, getSelector } from '../utils/utils';

export function promiseErrorHandle() {
  /**
   * 捕获未处理的Promise异常
   */
  window.addEventListener(
    'unhandledrejection',
    (event) => {
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
        type: 'error', //小类型 这是一个错误
        errorType: 'promiseError', //JS执行错误
        message: message, //报错信息
        filename: filename, //哪个文件报错了
        lineno: line,
        colno: column,
        stack,
        selector: event.composedPath ? getSelector(event.composedPath()) : '', //代表最后一个操作的元素
      });
    },
    true
  );
}
