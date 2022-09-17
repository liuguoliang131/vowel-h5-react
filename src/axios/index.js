import axios from 'axios'
import utils from '../utils/index'
import { Toast } from 'antd-mobile'
const NODE_ENV = process.env.NODE_ENV
// console.log('NODE_ENV', NODE_ENV, process.env.REACT_APP_BASE_API)
let toast = null
const instance = axios.create({
  baseURL: '/api',
  timeout: 20000,
  headers: {
    'x-token': '',
    ak: 'hanhou-app',
    sign: ''
  }
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  console.log('config', config)
  // 在发送请求之前做些什么
  toast = Toast.show({
    content: '请求中',
    duration: 0,
    maskClickable: false,
    icon: 'loading'

  })
  config.headers.ts = Date.now()
  // config.headers['x-token'] = utils.isApp() ? utils.getAppToken() : utils.getToken()
  utils.ownApp(() => {
    config.headers['x-token'] = utils.getAppToken()
  }, () => {
    config.headers['x-token'] = utils.getToken()
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  console.log('response', response)
  toast.close()
  if (response.data.code !== 0) {
    Toast.show({
      icon: 'fail',
      content: response.data.msg || 'error'
    })
    if (response.data.code === 700 || response.data.code === 701 || response.data.code === 702) {
      utils.delUserInfo()
      utils.delToken()
      // 首先判断是不是APP内 如果是APP调APP登录，不是跳H5登录
      utils.isLogin()
    }
  }
  // 对响应数据做点什么
  return response.data
}, function (error) {
  console.log('axios error:', error)
  toast.close()
  Toast.show({
    icon: 'fail',
    content: error.message
  })
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
