//手动上报日志
import report from '../utils/report';

export function handleReport(options) {
  const { projectName, type, method, request, response } = options;
  report.send({
    projectName: projectName,
    type: 'xhr', //
    eventType: type,
    method: method || '', //请求方法名
    duration: '', //持续时间
    response: response ? JSON.stringify(response) : '', //返回响应
    request: request ? JSON.stringify(request) : '', //请求参数
  });
}
