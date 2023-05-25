import { BASE_URL } from '../config';
import { today_now } from './utils';
import userAgent from 'user-agent';

/**
 * 全局上报信息配置
 */
function getExtraData() {
  return {
    timestamp: new Date().getTime(),
    reportTime: today_now(),
    projectName: document.title,
    host: '127.0.0.1', //本地ip 后端会转成客户端ip
    url: location.href,
    userAgent: userAgent.parse(navigator.userAgent).fullName,
    borwser: userAgent.parse(navigator.userAgent).name,
    client: userAgent.parse(navigator.userAgent).os,

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
    let log = { ...extraData, ...data };
    //对象 的值不能是数字
    for (let key in log) {
      if (typeof log[key] === 'number') {
        log[key] = `${log[key]}`;
      }
    }
    console.table(log);
    let body = JSON.stringify({
      __logs__: [log],
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
export default new Report();
