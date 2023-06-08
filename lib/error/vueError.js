import report from '../utils/report';
export function vueErrorHandler(options) {
  Vue.config.errorHandler = (error, vm, info) => {
    console.log('%c Line:4 🌰 error, vm, info', 'font-size:18px;color:#ffffff;background:#7f8fa6', error, vm, info);
    try {
      let metaData = {
        projectName: options.projectName,
        message: error.message,
        stack: error.stack,
        info: info,
      };
      if (Object.prototype.toString.call(vm) === '[object Object]') {
        metaData.componentName = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;
        metaData.propsData = vm.$options.propsData;
      }
      report.send({
        type: 'error', //小类型 这是一个错误
        errorType: 'vueError', //JS执行错误
        message: JSON.stringify(metaData),
      });
    } catch (error) {
      console.log('%c Line:21 🍣 vueError', 'font-size:18px;color:#ffffff;background:#FF6666', error);
    }
  };
}
