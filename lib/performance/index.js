import report from '../utils/report';
import { getLastEvent, resourceGetSelector, onload } from '../utils/utils';

export function performanceHandle() {
  let FMP, LCP;
  // 增加一个性能条目的观察者
  if (PerformanceObserver) {
    new PerformanceObserver((entryList, observer) => {
      let perfEntries = entryList.getEntries();
      FMP = perfEntries[0]; //startTime 2000以后
      observer.disconnect(); //不再观察了
    }).observe({ entryTypes: ['element'] }); //观察页面中的意义的元素

    new PerformanceObserver((entryList, observer) => {
      let perfEntries = entryList.getEntries();
      LCP = perfEntries[0];
      observer.disconnect(); //不再观察了
    }).observe({ entryTypes: ['largest-contentful-paint'] }); //观察页面中的意义的元素

    new PerformanceObserver((entryList, observer) => {
      let lastEvent = getLastEvent();
      let firstInput = entryList.getEntries()[0];
      console.log('%c Line:25 🍆 FID', 'font-size:18px;color:#ffffff;background:#FFCC99', firstInput);
      if (firstInput) {
        //  startTime开点击的时间 差值就是处理的延迟
        let inputDelay = firstInput.processingStart - firstInput.startTime;
        let duration = firstInput.duration; //处理的耗时
        if (inputDelay > 0 || duration > 0) {
          console.log('%c Line:30 👨🏻‍🏫 首次输入延迟日志上报', 'font-size:18px;color:#ffffff;background:#c23616');
          report.send({
            kind: 'experience', //用户体验指标
            type: 'firstInputDelay', //首次输入延迟
            inputDelay, //延时的时间
            duration, //处理的时间
            startTime: firstInput.startTime,
            selector: lastEvent ? resourceGetSelector(lastEvent.path || lastEvent.target) : '',
          });
        }
      }
      observer.disconnect(); //不再观察了
    }).observe({ type: 'first-input', buffered: true }); //观察页面中的意义的元素
  }

  //用户的第一次交互 点击页面
  onload(function () {
    setTimeout(() => {
      const { fetchStart, connectStart, connectEnd, requestStart, responseStart, responseEnd, domLoading, domInteractive, domContentLoadedEventStart, domContentLoadedEventEnd, loadEventStart } =
        performance.timing;
      report.send({
        type: 'timing', //统计每个阶段的时间
        connectTime: connectEnd - connectStart, //连接时间
        ttfbTime: responseStart - requestStart, //首字节到达时间
        responseTime: responseEnd - responseStart, //响应的读取时间
        parseDOMTime: loadEventStart - domLoading, //DOM解析的时间
        domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart,
        timeToInteractive: domInteractive - fetchStart, //首次可交互时间
        loadTIme: loadEventStart - fetchStart, //完整的加载时间
      });

      let FP = performance.getEntriesByName('first-paint')[0];
      let FCP = performance.getEntriesByName('first-contentful-paint')[0];
      //开始发送性能指标
      // console.log('FP', FP);
      // console.log('FCP', FCP);
      // console.log('FMP', FMP);
      // console.log('LCP', LCP);
      report.send({
        type: 'paint', //统计每个阶段的时间
        firstPaint: FP ? FP.startTime : '',
        firstContentfulPaint: FCP ? FCP.startTime : '',
        firstMeaningfulPaint: FMP ? FMP.startTime : '',
        largestContentfulPaint: LCP ? LCP.startTime : '',
      });
    }, 3000);
  });
}
