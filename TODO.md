===========
统一接口参数

```json
{
  "timestamp": "123123123123",
  "reportTime": "2021-09-12 12:00:22",
  "projectName": "document.title",
  "host": "192.168.2.2",
  "url": "location.href",
  "userAgent": "userAgent.parse(navigator.userAgent).name",
  "client": "客户端",
  "borwser": "浏览器",
  "type": "error",
  "errorType": "vueError",
  "request": "请求接口信息",
  "response": "返回接口信息",
  "message": "错误信息",
  "filename": "异常的资源url",
  "lineno": "异常行号",
  "colno": "异常列号",
  "stack": "栈错误信息"
}
```

```text
TODO:
1.页面停留时间
2.某个功能埋点按钮点击
3.怎么统计同一个错误出现的次数
4.能将信息拿到并根据sourcemap文件找到源码报错的位置吗
5.每次刷新页面的时候控制台才会打印页面性能数据，我想要的是每次跳转页面或跳转路由，又或者是异步请求完成的时候也捕获，并且打印性能数据。
请问应该怎么做呢？非常感谢！！
6.合并多条记录上报
```
