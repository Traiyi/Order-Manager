/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
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
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}


/**
 *  函数防抖
 *  @param {Function} func  包装的函数
 *  @param {num} delay      延迟时间
 *  @param {boolean} immediate 第一次滚动会执行两次  开始滚动和结束滚动的时候
 *  @return {*}
 */

export function debounce(func, delay, immediate = false) {
  let timer,
    context = this;
  return (...args) => {
    if (immediate) {
      func.apply(context, args);
      immediate = false;
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

/**
 *  通过高德获取geoJson
 *  @param {string} abcode     行政区code
 *  @param {string} geoJson    上一次获取的geoJson数据
 *  @return {}
 */

export function getGeoJson(adcode, geoJson = []) {
  return new Promise((resolve, reject) => {
    AMapUI.loadUI(["geo/DistrictExplorer"], (DistrictExplorer) => {
      var districtExplorer = new DistrictExplorer();
      districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
        if (error) {
          console.error(error);
          reject(error);
          return;
        }
        let Json = areaNode.getSubFeatures();
        let mapJson = {
          features: [],
        };
        if (Json.length === 0) {
          Json = geoJson.features.filter(
            (item) => item.properties.adcode == adcode
          );
        }
        mapJson.features = Json;
        resolve(mapJson);
      });
    });
  });
}

/**
 *  通过高德获取地图信息
 *  @param {string} abcode  行政区code
 *  @return {}
 */

export function getMapInfo(abcode) {
  return new Promise((resolve, reject) => {
    var district = new AMap.DistrictSearch();
    district.search(abcode, function(status, result) {
      if (status != "complete") {
        reject(new Error("获取地图数据失败"));
        return;
      }
      const data = result.districtList[0];
      if (
        (data.level === "district" &&
          data.districtList[0].level === "street") ||
        !data.districtList
      ) {
        resolve([data]);
      }
      resolve(data.districtList);
    });
  });
}
