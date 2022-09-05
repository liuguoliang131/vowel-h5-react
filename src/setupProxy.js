// const { createProxyMiddleware } = require('http-proxy-middleware')
// module.exports = function (app) {
//   app.use(createProxyMiddleware('/api', //遇见/api-elm前缀的请求,就会触发该代理配置
//     {
//       target: "http://localhost:9000", //请求转发给谁（能返回数据的服务器地址）
//       changeOrigin: true,  //控制服务器收到的响应头中Host字段的值
//       pathRewrite: { '^/api': '' } //重写请求路径，保证交给后台服务器是正常地请求地址（必须配置）
//     }))
// }

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:9000',
      changeOrigin: true,
      pathRewrite: { '^/api': '/giao' }
    })
  );
};