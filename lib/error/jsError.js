import report from '../utils/report';
import { getLastEvent, getLines, resourceGetSelector, getSelector } from '../utils/utils';

export function jsErrorHandle() {
  //监听全局未捕获的错误
  window.addEventListener(
    'error',
    function (event) {
      //错误事件对象
      console.log('%c Line:12 🍪 path', 'font-size:18px;color:#ffffff;background:#CC9966', event.composedPath());
      //这是一个脚本加载错误 图片  video资源缺少
      if (event.target && (event.target.src || event.target.href)) {
        report.send({
          type: 'error', //小类型 这是一个错误
          errorType: 'resourceError', //js或css资源加载错误
          filename: event.target.src || event.target.href, //哪个文件报错了
          tagName: event.target.tagName, //SCRIPT
          selector: resourceGetSelector(event.target), //代表最后一个操作的元素
        });
      } else {
        report.send({
          type: 'error', //小类型 这是一个错误
          errorType: 'jsError', //JS执行错误
          message: event.message, //报错信息
          filename: event.filename, //哪个文件报错了
          lineno: event.lineno,
          colno: event.colno,
          stack: getLines(event.error.stack),
          selector: event.composedPath ? getSelector(event.composedPath()) : '', //代表最后一个操作的元素
        });
      }
    },
    true
  );
}
