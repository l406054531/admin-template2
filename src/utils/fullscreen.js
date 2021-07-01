

/**
 * @description: 是否支持全屏+判断浏览器前缀
 * @param {Function} fn 不支持全屏的回调函数 这里设了一个默认值
 */
export function isFullscreen(fn) {
  let prefixName = ''
  let isFullscreenData = true
  let fullscreenEnabled = false;
  // 判断浏览器前缀
  if (document.fullscreenEnabled) {
    fullscreenEnabled = document.fullscreenEnabled;
  } else if (document.webkitFullscreenEnabled) {
    fullscreenEnabled = document.webkitFullscreenEnabled;
    prefixName = 'webkit';
  } else if (document.mozFullScreenEnabled) {
    fullscreenEnabled = document.mozFullScreenEnabled;
    prefixName = 'moz';
  } else if (document.msFullscreenEnabled) {
    fullscreenEnabled = document.msFullscreenEnabled;
    prefixName = 'ms';
  }
  if (!fullscreenEnabled) {
    if (fn !== undefined) fn(); // 执行不支持全屏的回调
    isFullscreenData = false;
  }
  let obj = {}
  obj.prefixName = prefixName
  obj.isSuportFullScreen = isFullscreenData
  obj.fullscreenEnabled = fullscreenEnabled
  return obj
}

/**
 * @description: 将传进来的元素全屏
 * @param {String} domName 要全屏的dom名称
 */
export function Fullscreen(domName, prefixName) {
  const element = document.getElementById(domName); // 获取dom
  const methodName = prefixName === '' ? 'requestFullscreen' : `${prefixName}RequestFullScreen`; // API前缀
  element[methodName](); // 调用全屏
}

export function exitFullscreen(prefixName) {
  const methodName =
    prefixName === ''
      ? 'exitFullscreen'
      : `${prefixName}ExitFullscreen`; // API 前缀
  document[methodName](); // 调用
}

/**
 * @description: 检测有没有元素处于全屏状态
 * @return 布尔值
 */
export function isElementFullScreen() {
  const fullscreenElement =
    document.fullscreenElement ||
    document.msFullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement; // 有前缀的f是大写，没前缀是小写
  if (fullscreenElement === null) {
    return false; // 当前没有元素在全屏状态
  } else {
    return true; // 有元素在全屏状态
  }
}
