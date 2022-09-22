import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.js'
document.addEventListener('gesturestart', function (event) {
  event.preventDefault()
})
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>  严格模式会让react组件触发两次
  <App />
)
