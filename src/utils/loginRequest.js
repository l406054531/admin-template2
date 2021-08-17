import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance 实例配置
const service = axios.create({
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    baseURL: "http://122.9.49.91/manage", // 'http://192.168.1.3:8066'
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 30 * 1000, // request timeout
    transformRequest: [function(data) {
        // 对 data 进行任意转换处理
        return JSON.stringify(data)
    }],
    headers: {}
})

// 登录请求拦截
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)


// 登录响应拦截
service.interceptors.response.use(
    response => {
        if (response.statusCode === 200) {
            // 如果没有接收到token，则报错并停止登录
            if (!response.headers['authorization']) {
                Message({
                    message: '登录失败，无法接收token',
                    type: 'error',
                    duration: 2 * 1000
                })
                return Promise.reject(new Error('登录失败，无法接收token'))
            }
            // 正常返回结果
            return response
        } else {
            Message({
                message: response.statusCode + ' ' + response.statusText,
                type: 'error',
                duration: 2 * 1000
            })
            return Promise.reject(new Error(response.statusCode + ' ' + response.statusText))
        }
    }, error => {
        if (error && error.response) {
            switch (error.response.statusCode) {
                case 400:
                    error.message = '错误请求'
                    break
                case 401:
                    error.message = '未授权或帐号密码错误，请重新登录'
                    break
                case 403:
                    error.message = '拒绝访问'
                    break
                case 404:
                    error.message = '请求错误,未找到该资源'
                    break
                case 405:
                    error.message = '请求方法未允许'
                    break
                case 408:
                    error.message = '请求超时'
                    break
                case 500:
                    error.message = '服务器端出错'
                    break
                case 501:
                    error.message = '网络未实现'
                    break
                case 502:
                    error.message = '网络错误'
                    break
                case 503:
                    error.message = '服务不可用'
                    break
                case 504:
                    error.message = '网络超时'
                    break
                case 505:
                    error.message = 'http版本不支持该请求'
                    break
                default:
                    error.message = `连接错误${error.response.statusCode}`
            }
        } else {
            error.message = "连接到服务器失败"
        }
        console.warn(error.message)
        Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000
        })
        return Promise.reject(error)
    }
)

export default service