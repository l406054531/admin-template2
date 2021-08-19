/*
 * @Author: lct
 * @Date: 2021-03-09 15:15:11
 * @LastEditTime: 2021-03-09 15:16:53
 * @LastEditors: Please set LastEditors
 * @Description: Base64解密token
 * @FilePath: \web\src\utils\Base64.js
 */
let Base64 = require('js-base64').Base64

/**
 * 解密第二段token，并返回
 * token分三段，以应为句号隔开
 * @param token
 */
export function decodeToken(token) {
    if (!token) {
        console.log(new Error('token is undefined!'))
        return
    }
    let arr = token.split('.')
        // let res = JSON.parse(Base64.decode(arr[1]))
        // console.log(Date.parse(new Date()))
        // console.log(new Date().getTime())
        // console.log(Math.round(new Date() / 1000))
        //
        // console.log(res.exp)
        // console.log(moment(parseInt(res.exp)).format('YYYY-MM-DD HH:mm:ss'))
        // console.log(moment.unix(1588223304).format('YYYY-MM-DD HH:mm:ss'))
        // return
    return JSON.parse(Base64.decode(arr[1]))
}

/**
 * 获取token指定值
 * @param token
 * @param key
 * @returns {*}
 */
export function decodeTokenByKey(token, key) {
    let res = decodeToken(token)
    return res[key]
}