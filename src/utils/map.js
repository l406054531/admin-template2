/**
 * 异步加载百度地图APIJS
 */
export function loadBaiduMapScript (type = 'BMap', url) {
  // const BMap_URL = "https://api.map.baidu.com/api?v=1.0&type=webgl&ak=XUj5fj5ZSP9YWP3Ap5QhjVXgeWfzeUuv"

  return new Promise((resolve, reject) => {
    window.init = function () {
      resolve(BMapGL)
    }
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `http://api.map.baidu.com/api?v=3.0&type=webgl&ak=XUj5fj5ZSP9YWP3Ap5QhjVXgeWfzeUuv&callback=init`
    document.head.appendChild(script)
  })
}