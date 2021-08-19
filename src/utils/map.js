/**
 * 异步加载百度地图APIJS
 */
export function loadBaiduMapScript(type = 'BMapGL', url) {
    const BMap_URL = "https://api.map.baidu.com/api?v=1.0&type=webgl&ak=XUj5fj5ZSP9YWP3Ap5QhjVXgeWfzeUuv"

    return new Promise((resolve, reject) => {
        // 如果已加载直接返回    
        if (type === 'BMap' && typeof BMap !== 'undefined') {
            resolve(BMap);
        } else if (type === 'BMapGL' && typeof BMapGL !== 'undefined') {
            resolve(BMapGL);
        }

        // 百度地图异步加载回调处理
        window.onBMapCallback = function() {
            console.log('百度地图脚本初始化成功...');
            const t = eval(type)
            resolve(t);
        };
        // 插入script脚本
        let scriptNode = document.createElement('script');
        scriptNode.setAttribute('type', 'text/javascript');
        scriptNode.setAttribute('src', BMap_URL);
        document.body.appendChild(scriptNode);
    })
}