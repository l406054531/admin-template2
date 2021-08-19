/*
 * @Author: your name
 * @Date: 2021-02-02 11:02:48
 * @LastEditTime: 2021-04-07 15:14:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-cli4.x-project-template\src\config.js
 */
const isDev = process.env.NODE_ENV === 'development'
module.exports = {
    // 网站标题
    title: '管理端',
    // 接口地址
    baseURL: 'http://47.106.221.76:3000',
    // baseURL: isDev ? 'http://127.0.0.1:3000' : 'http://47.106.221.76:3000',
    // 登录接口地址
    loginURL: 'http://47.106.221.76:3000',
}