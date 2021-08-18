export function Map() {
    return new Promise(function(resolve, reject) {
        window.init = function() {
            resolve(BMap)
        }
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://api.map.baidu.com/api?v=3.0&ak=XUj5fj5ZSP9YWP3Ap5QhjVXgeWfzeUuv`
        script.onerror = reject
        document.head.appendChild(script)
    })
}
/**
 * 异步加载百度地图APIJS
 */
export function loadBaiduMapScript(url) {

    // console.log("初始化百度地图脚本...");
    // if (!url) {
    //     console.log("百度地图脚本url为空...")
    //     return
    // }
    const BMap_URL = "https://api.map.baidu.com/api?v=3.0&ak=XUj5fj5ZSP9YWP3Ap5QhjVXgeWfzeUuv"

    return new Promise((resolve, reject) => {
        // debugger
        // 如果已加载直接返回
        // if (typeof BMap !== 'undefined') {
        //     resolve(BMap)
        //     return true
        // }
        // console.log(BMap);
        // 百度地图异步加载回调处理
        // window.onBMapCallback = function() {
        //         console.log('百度地图脚本初始化成功...')
        //         resolve(BMap)
        //     }

        // 插入script脚本
        let scriptNode = document.createElement('script')
        scriptNode.setAttribute('type', 'text/javascript')
        scriptNode.setAttribute('src', BMap_URL)
        document.body.appendChild(scriptNode)
        resolve(BMap)
    })
}