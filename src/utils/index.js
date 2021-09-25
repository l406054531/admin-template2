import moment from 'moment';

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime (time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}
export function formatTree (data, pid, id) {
  let parents = data.filter(p => p[pid] == 0),
    children = data.filter(c => c[pid] != 0);
  dataToTree(parents, children);

  function dataToTree (parents, children) {
    parents.map((p) => {
      children.map((c, i) => {
        if (c[pid] == p[id]) {
          let _c = JSON.parse(JSON.stringify(children));
          _c.splice(i, 1);
          dataToTree([c], _c);
          if (p.children) {
            p.children.push(c);
          } else {
            p.children = [c];
          }
        }
      })
    })
  }
  return parents;
}

/**
 * @author lx
 * @param {*} endDate 
 * @returns 
 * 返回日期所在年的周数
 */
export function getYearWeek (endDate) {
  //本年的第一天
  var beginDate = new Date(endDate.getFullYear(), 0, 1);
  //星期从0-6,0代表星期天，6代表星期六
  var endWeek = endDate.getDay();
  if (endWeek == 0) endWeek = 7;
  var beginWeek = beginDate.getDay();
  if (beginWeek == 0) beginWeek = 7;
  //计算两个日期的天数差
  var millisDiff = endDate.getTime() - beginDate.getTime();
  var dayDiff = Math.floor((millisDiff + (beginWeek - endWeek) * (24 * 60 * 60 * 1000)) / 86400000);
  return Math.ceil(dayDiff / 7) + 1;
}


/**
 * @params dateTime时间  format时间格式 默认YYYY-MM-DD HH:mm:ss
 * @description 获取传入时间的当天的开始时间和结束时间
 */
export function getDayStartEndTime (dateTime, format = "YYYY-MM-DD HH:mm:ss") {
  let startTime = moment(new Date(new Date(new Date(dateTime).toLocaleDateString()).getTime())).format(format)
  let endTime = moment(new Date(new Date(new Date(dateTime).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)).format(format)
  return {
    startTime,
    endTime
  }
}

/**
 * @description 数组对象去重
 */
export function deWeightThree (arr, key) {
  let map = new Map();
  for (let item of arr) {
    if (!map.has(item[key])) {
      map.set(item[key], item);
    }
  }
  return [...map.values()];
}
/**
 * @description 数组去重
 */
export function deWeightArr (arr) {
  return Array.from(new Set(arr))
}
