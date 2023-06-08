下面是一份关于你编写的监控插件的 README:

# 监控插件

该插件用于监控 H5 项目和 Vue 项目中的错误信息、性能信息、接口参数和接口异常信息。你可以使用该插件来收集应用程序的运行数据，以便在生产环境中排查问题、优化性能和提高用户体验。

## 安装

你可以通过以下方式安装该插件：

### NPM 安装

```bash
npm install xr-monitor-sdk --save
或者
yarn add xr-monitor-sdk
```

### CDN 引入

你也可以通过 CDN 引入该插件：

```html
<script src="https://cdn.jsdelivr.net/npm/xr-monitor-sdk/dist/xr-monitor-sdk.js"></script>
```

## 使用

在你的项目中引入该插件之后，你可以使用以下方式来初始化和配置该插件：

```javascript
import MonitorPlugin from 'xr-monitor-sdk';

// 初始化插件启动插件
XrMonitor.init({
  // 配置项
  projectName: 'KFT',
  url: '', //必填 错误上报地址
  jsError: false
  promiseError: false,
  vueError: false, //配置是否需要记录vue错误信息
  vue: '', //如需监控vue错误信息，则需要传入vue实例
  actionLogs: true, //是否需要记录action
  performanceLogs: false, //是否需要记录性能
});
```

### 配置项

在初始化插件时，你可以传递以下配置项：

| 配置项          |            用途            | 默认 |
| :-------------- | :------------------------: | ---: |
| projectName     |          项目名称          | 可选 |
| url             |        url 请求接口        | 必填 |
| jsError         |        js 类型报错         | 可选 |
| promiseError    |      promise 类型报错      | 可选 |
| vueError        |          vue 错误          | 可选 |
| vue             | vue 实例必须 vueError 开启 | 可选 |
| actionLogs      |          操作日志          | 可选 |
| performanceLogs |          网页性能          | 可选 |

### TODO:

1.页面停留时间 ✅

2.某个功能埋点按钮点击

3.怎么统计同一个错误出现的次数

4.能将信息拿到并根据 sourcemap 文件找到源码报错的位置吗

5.每次刷新页面的时候控制台才会打印页面性能数据，我想要的是每次跳转页面或跳转路由，又或者是异步请求完成的时候也捕获，并且打印性能数据。
请问应该怎么做呢？非常感谢！！

6.合并多条记录上报 ---> 定时存入队列数组

## 贡献

如果你在使用该插件时发现了问题或者有任何建议，请随时提交 issue 或者 pull request。感谢你对该插件的支持！

## 许可证

该插件是基于 MIT 许可证发布的，详情请参见 LICENSE 文件。
