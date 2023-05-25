import report from '../utils/report';
export function httpErrorHandle() {
  let XMLHttpRequest = window.XMLHttpRequest;
  let oldOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url, async) {
    //NOTE:这里会造成死循环 必须排除  logs上次监控
    if (!url.match(/sockjs/) && !url.match(/logs/)) {
      this.logData = { method, url, async };
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
      let handler = (type) => (event) => {
        let duration = Date.now() - startTime - 2; //持续时间
        let status = this.status; //200 500
        let statusText = this.statusText; // OK Server Error
        report.send({
          type: 'xhr',
          eventType: type, //load error abort
          pathname: this.logData.url, //请求路径
          status: status + '-' + statusText, //状态码
          duration, //持续时间
          response: this.response ? JSON.stringify(this.response) : '', //响应体
          request: body || '',
        });
      };
      this.addEventListener('load', handler('load'), false);
      this.addEventListener('error', handler('error'), false);
      this.addEventListener('abort', handler('abort'), false);
    }
    return oldSend.apply(this, arguments);
  };
}
