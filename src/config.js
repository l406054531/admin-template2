
const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  // 网站标题
  title: '管理端',
  // 接口地址
  // baseURL: 'http://47.106.221.76:3000',
  baseURL: isDev ? 'http://127.0.0.1:3000' : 'http://47.106.221.76:3000',
  // 登录接口地址
  loginURL: isDev ? 'http://127.0.0.1:3000' : 'http://47.106.221.76:3000',
  // loginURL: 'http://47.106.221.76:3000',
}