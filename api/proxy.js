const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = (req, res) => {
  let target = ''
  target = 'http://47.106.221.76:3000/'
  //创建代理对象并转发请求
  createProxyMiddleware({
    target,
    change0rigin: true,
    pathRewrite: {
      //通过路径重写，去除请求路径中的`/ api '
      //例如/ api/user/login将被转发到 http: / / target/user/ login
      '^/ ': '/'
    }
  })(req, res)
}
