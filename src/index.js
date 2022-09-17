import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.js'
import utils from './utils/index'
import { Toast } from 'antd-mobile'
// document.cookie = 'x-token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVVUlEIjoiZWM1MmQ5NDUtZmJiNS00MTk2LThkZWQtYWVhMDRiNGJlYjEzIiwiSUQiOjEwMDAzMiwiUGhvbmUiOiIxNTgwMTI1MjM5MiIsIkJ1ZmZlclRpbWUiOjg2NDAwLCJleHAiOjE2NjM5MDQ0ODcsImlzcyI6IkhBSEFPbzYzMjQ2MzEiLCJuYmYiOjE2NjMyOTg2ODd9.k8JSInMzNt2lhD2AXPwEb_9yb9RyBHdDfRuO272zxsxa20R3o7kKhdPFOH6vjsCDqN6B2BrYI8QLzrMRFiBUMA'
// utils.ownApp(() => {
//   if (document.cookie) {
//     console.log(document.cookie)
//     const arr = document.cookie.split('&')
//     arr.forEach(item => {
//       if (item.includes('x-token')) {
//         const token = item.substring(8, item.length)
//         console.log('x-token', token)
//         utils.setToken(token)
//       }
//     })
//   } else {
//     utils.delToken()
//   }
// }, () => {

// })
// Toast.show({
//   content: 'index'
// })
utils.isLogin()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>  严格模式会让react组件触发两次
  <App />
)
