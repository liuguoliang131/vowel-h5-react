const http = require('http')

const app = http.createServer((req, res) => {
  // 查看收到的请求地址
  console.log('req.url:', req.url, 'res:', res)
  // 收到的url信息
  console.log(req.rawHeaders)
  if (req.url === '/h5/base/captcha') {
    res.end('通了')
  } else {
    console.log('url:', req.url)
    res.setHeader('Content-type', 'text/html;charset=utf8')
    const responseJson = JSON.stringify({ success: true, msg: '成功了哦' })
    res.end(responseJson)
  }
})

app.listen(9000, '192.168.110.122', () => {
  console.log('localhost:9000开启服务')
})
