import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.js'
import utils from './utils/index'
// document.cookie = 'x-token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVVUlEIjoiYzI5YjU5ZDAtZmIwNC00Y2Y4LTk2NzAtMjAwNDI1Zjc2MzFjIiwiSUQiOjM3LCJQaG9uZSI6IjE1OTEwNjA1MDkxIiwiQnVmZmVyVGltZSI6ODY0MDAsImV4cCI6MTY2MzU2NDkyNCwiaXNzIjoiSEFIQU9vNjMyNDYzMSIsIm5iZiI6MTY2Mjk1OTEyNH0.FoN1BAtiuKJjmhZ6dsrlSlSywZ5krt54ZS16FmojY-3DM7jmiGsqlwBKw-tO6a-1mzZtAf4VaN2CfHjW9gEyCg'
if (document.cookie) {
  console.log(document.cookie)
  const arr = document.cookie.split('&')
  arr.forEach(item => {
    if (item.includes('x-token')) {
      const token = item.substring(8, item.length)
      console.log('x-token', token)
      utils.setToken(token)
    }
  })
} else {
  utils.delToken()
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>  严格模式会让react组件触发两次
  <App />
)
