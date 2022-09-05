const http = require("http");

const app = http.createServer((req, res) => {
  // 查看收到的请求地址
  console.log('req.url:', req.url, 'res:', res);
  // 收到的url信息
  console.log(req.rawHeaders);
  if (req.url === "/account/test") {
    res.end("hello world!!");

  } else {
    console.log('url:', req.url)
    res.setHeader("Content-type", "text/html;charset=utf8");
    let responseJson = JSON.stringify({ success: true, msg: '成功了哦' })
    res.end(responseJson)
  }

});

app.listen(9000, "localhost", () => {
  console.log("localhost:9000开启服务");

});