"use strict";function ownKeys(t,e){var r,n=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)),n}function _objectSpread2(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(r),!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,_toPropertyKey(n.key),n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _defineProperty(e,t,r){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _toPrimitive(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"==typeof e?e:String(e)}var BASE_URL="https://egg-v1.fml.ink/logs";function onload(e){"complete"===document.readyState?e():window.addEventListener("load",e)}function getLines(e){return e.split("\n").slice(1).map(function(e){return e.replace(/^\s+at\s+/g,"")}).join("^")}function getLastEvent(){var t;return["click","touchstart","mousedown","keydown","mouseover"].forEach(function(e){document.addEventListener(e,function(e){t=e},{capture:!0,passive:!0})}),t}function getSelectors(e){return e.reverse().filter(function(e){return e!==document&&e!==window}).map(function(e){return e.id?"".concat(e.nodeName.toLowerCase(),"#").concat(e.id):e.className&&"string"==typeof e.className?"".concat(e.nodeName.toLowerCase(),".").concat(e.className):e.nodeName.toLowerCase()}).join(" ")}function resourceGetSelector(e){if(Array.isArray(e))return getSelectors(e);for(var t=[];e;)t.push(e),e=e.parentNode;return getSelectors(t)}function getSelector(e){return e?(e=e[0].document.activeElement).classList+"_"+e.id+"_"+e.localName:""}function today_now(){var e=(new Date).getFullYear(),t=(new Date).getMonth()+1,r=(new Date).getDate(),n=(new Date).getHours(),o=(new Date).getMinutes()<10?"0"+(new Date).getMinutes():(new Date).getMinutes(),a=(new Date).getSeconds()<10?"0"+(new Date).getSeconds():(new Date).getSeconds();return"".concat(e,"-").concat(t,"-").concat(r," ").concat(n,":").concat(o,":").concat(a)}function checkOptions(e){if(!e)throw new Error("options不能为空");if(""===e.url)throw new Error("url不能为空");if(e.vueError&&""==e.vue)throw new Error("vue实例不能为空");return!0}var version_1="1.0.4",parse=function(e){var t={full:e,name:name(e)};return t.version=version(e,t.name),t.fullName=t.name+" "+t.version,t.os=os(e),t};function version(e,t){return(t="safari"===t?"version":t)?new RegExp(t+"[\\/ ]([\\d\\w\\.-]+)","i").exec(e)&&RegExp.$1||"":(t=e.match(/version[\/ ]([\d\w\.]+)/i))&&1<t.length?t[1]:""}var operatingSystems={iPad:/ipad/i,iPhone:/iphone/i,"Windows Vista":/windows nt 6\.0/i,"Windows 7":/windows nt 6\.\d+/i,"Windows 2003":/windows nt 5\.2+/i,"Windows XP":/windows nt 5\.1+/i,"Windows 2000":/windows nt 5\.0+/i,"OS X $1.$2":/os x (\d+)[._](\d+)/i,Linux:/linux/i,Googlebot:/googlebot/i},osNames=Object.keys(operatingSystems);function os(e){for(var r,t=0,n=osNames.length;t<n;++t)if(r=operatingSystems[osNames[t]].exec(e))return~osNames[t].indexOf("$1")?osNames[t].replace(/\$(\d+)/g,function(e,t){return r[t]}):osNames[t];return""}var names=["opera","konqueror","firefox","chrome","epiphany","safari","msie","curl"];function name(e){e=e.toLowerCase();for(var t=0,r=names.length;t<r;++t)if(-1!==e.indexOf(names[t]))return names[t];return""}var userAgent$1={version:version_1,parse:parse},userAgent=userAgent$1;function getExtraData(){return{timestamp:(new Date).getTime(),reportTime:today_now(),projectName:document.title,host:"127.0.0.1",url:location.href,userAgent:userAgent.parse(navigator.userAgent).fullName,borwser:userAgent.parse(navigator.userAgent).name,client:userAgent.parse(navigator.userAgent).os}}var Report=function(){function e(){_classCallCheck(this,e),this.url=BASE_URL,this.xhr=new XMLHttpRequest}return _createClass(e,[{key:"send",value:function(){var e,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},r=_objectSpread2(_objectSpread2({},getExtraData()),t);for(e in r)"number"==typeof r[e]&&(r[e]="".concat(r[e]));t=JSON.stringify({__logs__:[r]});navigator.sendBeacon?navigator.sendBeacon(this.url,t):(this.xhr.open("POST",this.url,!0),this.xhr.setRequestHeader("Content-Type","application/json"),this.xhr.setRequestHeader("x-log-apiversion","0.6.0"),this.xhr.setRequestHeader("x-log-bodyrawsize",t.length),this.xhr.onload=function(){},this.xhr.onerror=function(e){},this.xhr.send(t))}}]),e}(),report=new Report;function jsErrorHandle(t){window.addEventListener("error",function(e){e.target&&(e.target.src||e.target.href)?report.send({projectName:t.projectName,type:"error",errorType:"resourceError",filename:e.target.src||e.target.href,tagName:e.target.tagName,selector:resourceGetSelector(e.target)}):report.send({projectName:t.projectName,type:"error",errorType:"jsError",message:e.message,filename:e.filename,lineno:e.lineno,colno:e.colno,stack:getLines(e.error.stack),selector:e.composedPath?getSelector(e.composedPath()):""})},!0)}function promiseErrorHandle(c){window.addEventListener("unhandledrejection",function(e){var t,r,n,o=0,a=0,i="",s=e.reason;"string"==typeof s?n=s:"object"===_typeof(s)&&(n=s.message,s.stack&&(r=(t=s.stack.match(/at\s+(.+):(\d+):(\d+)/))[1],o=t[2],a=t[3]),i=getLines(s.stack)),report.send({projectName:c.projectName,type:"error",errorType:"promiseError",message:n,filename:r,lineno:o,colno:a,stack:i,selector:e.composedPath?getSelector(e.composedPath()):""})},!0)}function vueErrorHandler(o){Vue.config.errorHandler=function(e,t,r){try{var n={projectName:o.projectName,message:e.message,stack:e.stack,info:r};"[object Object]"===Object.prototype.toString.call(t)&&(n.componentName=t._isVue?t.$options.name||t.$options._componentTag:t.name,n.propsData=t.$options.propsData),report.send({type:"error",errorType:"vueError",message:JSON.stringify(n)})}catch(e){}}}function handleReport(e){var t=e.projectName,r=e.type,n=e.method,o=e.request,e=e.response;report.send({projectName:t,type:"xhr",eventType:r,method:n||"",duration:"",response:e?JSON.stringify(e):"",request:o?JSON.stringify(o):""})}function httpErrorHandle(u){var e=window.XMLHttpRequest,n=e.prototype.open,t=(e.prototype.open=function(e,t,r){return t.match(/sockjs/)||t.match(/logs/)||(this.logData={method:e,url:t,async:r}),n.apply(this,arguments)},e.prototype.send);e.prototype.send=function(s){var c,e,p=this;return this.logData&&(c=Date.now(),this.addEventListener("load",(e=function(i){return function(e){var t,r=Date.now()-c-2,n=p.status,o=p.statusText,a="";a=!s||""===(t=void 0===(t=JSON.parse(s).method)?"":t)?p.logData.url.split("/").slice(-2).join("/"):t,report.send({projectName:u.projectName,type:"xhr",eventType:i,pathname:p.logData.url,status:n+"-"+o,method:a||"",duration:r,response:p.response?JSON.stringify(p.response):"",request:s||""})}})("load"),!1),this.addEventListener("error",e("error"),!1),this.addEventListener("abort",e("abort"),!1)),t.apply(this,arguments)}}function historyPageTrackerReport(){function e(n){var o=window.history[n];return function(e){var t=o.apply(this,arguments),r=new Event(n);return r.arguments=arguments,window.dispatchEvent(r),t}}window.addEventListener("pushState",function(){}),window.addEventListener("replaceState",function(){}),window.history.pushState=e("pushState"),window.history.replaceState=e("replaceState"),window.addEventListener("load",function(){}),window.addEventListener("unload",function(){}),window.addEventListener("popstate",function(){})}function hashPageTrackerReport(){window.addEventListener("hashchange",function(){}),window.addEventListener("load",function(){});var n,o;window.history.pushState=(n="pushState",o=window.history[n],function(e){var t=o.apply(this,arguments),r=new Event(n);return r.arguments=arguments,window.dispatchEvent(r),t}),window.addEventListener("pushState",function(){})}function performanceHandle(){var d,f;PerformanceObserver&&(new PerformanceObserver(function(e,t){e=e.getEntries();d=e[0],t.disconnect()}).observe({entryTypes:["element"]}),new PerformanceObserver(function(e,t){e=e.getEntries();f=e[0],t.disconnect()}).observe({entryTypes:["largest-contentful-paint"]}),new PerformanceObserver(function(e,t){var r,n,o=getLastEvent(),e=e.getEntries()[0];e&&(r=e.processingStart-e.startTime,n=e.duration,0<r||0<n)&&report.send({type:"performance",eventType:"firstInputDelay",inputDelay:r,duration:n,startTime:e.startTime,selector:o?resourceGetSelector(o.path||o.target):""}),t.disconnect()}).observe({type:"performance",buffered:!0})),onload(function(){setTimeout(function(){var e=performance.timing,t=e.fetchStart,r=e.connectStart,n=e.connectEnd,o=e.requestStart,a=e.responseStart,i=e.responseEnd,s=e.domLoading,c=e.domInteractive,p=e.domContentLoadedEventStart,u=e.domContentLoadedEventEnd,e=e.loadEventStart,n=(report.send({type:"performance",eventType:"timing",connectTime:n-r,ttfbTime:a-o,responseTime:i-a,parseDOMTime:e-s,domContentLoadedTime:u-p,timeToInteractive:c-t,loadTIme:e-t}),performance.getEntriesByName("first-paint")[0]),r=performance.getEntriesByName("first-contentful-paint")[0];report.send({type:"performance",eventType:"paint",firstPaint:n?n.startTime:"",firstContentfulPaint:r?r.startTime:"",firstMeaningfulPaint:d?d.startTime:"",largestContentfulPaint:f?f.startTime:""})},3e3)})}var xrMonitor=function(){var t=function(){function t(e){_classCallCheck(this,t),this.options=e,this.init()}return _createClass(t,[{key:"init",value:function(){var e,t,r,n;checkOptions(this.options),e=this.options,n=e.jsError,t=e.promiseError,r=e.vueError,e.performance,n&&jsErrorHandle(e),t&&promiseErrorHandle(e),r&&vueErrorHandler(e),(n=this.options).actionLogs&&httpErrorHandle(n),this.options.performanceLogs&&performanceHandle(),this.options.pageRouter&&(hashPageTrackerReport(),historyPageTrackerReport())}},{key:"report",value:function(e){handleReport(_objectSpread2(_objectSpread2({},this.options),e))}}]),t}();return t.init=function(e){return new t(e)},t}();module.exports=xrMonitor;
