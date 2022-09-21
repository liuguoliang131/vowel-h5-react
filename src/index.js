import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.js'
// ios穿透问题
document.getElementsByName('html')[0].addEventListener('touchmove', function (e) {
  e.preventDefault()
})
const rootDOM = document.getElementById('root')
const root = ReactDOM.createRoot(rootDOM)
root.render(
  // <React.StrictMode>  严格模式会让react组件触发两次
  <App />
)
