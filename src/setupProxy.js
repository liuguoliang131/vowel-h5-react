
const { createProxyMiddleware } = require('http-proxy-middleware')
// process.env.REACT_APP_BASE_API
module.exports = function (app) {
  // eslint-disable-next-line no-unused-expressions
  app.use(
    createProxyMiddleware('/api', {
      host: '192.168.110.122:3000',
      target: 'http://124.70.107.130:8033',
      changeOrigin: true,
      pathRewrite: { '^/api': '/' }
    })
  // eslint-disable-next-line no-sequences
  )

  // app.use(
  //   '/',
  //   createProxyMiddleware({
  //     target: 'http://localhost:3000',
  //     changeOrigin: false
  //   })
  // )
}

// const proxy = require('http-proxy-middleware')
// module.exports = function (app) {
//   app.use(proxy('/api', { target: 'http://124.70.107.130:8033' }))
//   app.use(proxy('/*.svg', { target: 'http://localhost:5000/' }))
// }
