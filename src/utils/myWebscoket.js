let websock = null
let lockReconnect = false;
let tt;
export function initWebSocket(wsUrl) {
    createWebSocket(wsUrl);
}
//重连函数
function reconnect(url) {
    if (lockReconnect) {
        return;
    };
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    tt && clearTimeout(tt);
    tt = setTimeout(function() {
        initWebSocket(url);
        lockReconnect = false;
    }, 20000);
}
//心跳检测
let heartCheck = {
    //每隔几秒测试一下心跳是否在继续
    timeout: 20000,
    timeoutObj: null,
    serverTimeoutObj: null,
    start: function() {
        let self = this;
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function() {
            self.serverTimeoutObj = setTimeout(function() {
                websock.close();
            }, self.timeout);

        }, this.timeout)
    }
};

function createWebSocket(wsUrl) { //初始化weosocket
    websock = new WebSocket(wsUrl);
    // websock.onclose = function() {
    //     reconnect(wsUrl);
    // }
    websock.onopen = function() {
        websocketOpen();
    }
    websock.onerror = function() {
        console.log('连接失败');
        reconnect(wsUrl);
    }
}

//数据接收
export function websocketonMessage(callback) {
    if (typeof callback == 'function') {
        websock.onmessage = callback
    }
}
//数据发送
export function websocketSend(e) {
    let data = JSON.stringify(e)
    websock.send(data)
}
//关闭
export function websocketClose() {
    // console.log("连接关闭");
    websock.close()
}

function websocketOpen() {
    // console.log("连接成功");
}

// initWebSocket();
// vue-native-websocket