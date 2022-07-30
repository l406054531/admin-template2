/*
 * @Author: l406054531 406054531@qq.com
 * @Date: 2021-09-25 17:04:18
 * @LastEditors: l406054531 406054531@qq.com
 * @LastEditTime: 2022-07-24 16:17:41
 * @FilePath: \admin-template2\src\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const isDev = process.env.NODE_ENV === 'development'
const url = isDev ? 'http://127.0.0.1:3000' : 'http://47.106.221.76:3000'
// const url = "https://www.liangx.top/blog-server/"
module.exports = {
  // 网站标题
  title: '管理端',
  // 接口地址
  baseURL: url,
  // cos读取图片的地址
  cosUrl: 'https://liangx-1302611204.cos.ap-nanjing.myqcloud.com/userImg/',
  // 浏览器缓存的键
  StorageKey: {
    tokenKey: 'token',
    menuKey: 'menu',
    userinfoKey: 'userInfo'
  }

}