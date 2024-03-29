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