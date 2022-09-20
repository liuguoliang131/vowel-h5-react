/* eslint-disable no-empty */
import axios from 'axios'
import utils from '../utils/index'
import { Toast } from 'antd-mobile'
import md5 from 'js-md5'
const NODE_ENV = process.env.NODE_ENV
// console.log('NODE_ENV', NODE_ENV, process.env.REACT_APP_BASE_API)
let toast = null
const onlykey = 'U6LMVF9aNxg7Jgw5TMqL0CHiw4aT8ipuqlNCkdA9H50=' // key
const instance = axios.create({
  baseURL: '/api',
  timeout: 20000,
  headers: {
    'x-token': '',
    ak: 'hanhou-app',
    sign: '',
    app_id: 'yyf_h5'
  }
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // console.log('config', config)
  // 在发送请求之前做些什么
  toast = Toast.show({
    content: '请求中',
    duration: 0,
    maskClickable: false,
    icon: 'loading'

  })
  const ts = Date.now()
  config.headers.ts = ts
  config.headers['x-token'] = utils.getToken()
  if (config.method === 'get') {

  } else if (config.method === 'post') {
    const { data } = config
    const attrList = []
    Object.keys(data).sort().forEach((key, idx) => {
      attrList[idx] = key + '=' + data[key]
    })
    const afterUrl = attrList.join('&') // 参数串
    // console.log('sort', afterUrl)
    // console.log(afterUrl + '&ak=' + onlykey + '&ts=' + ts)
    const sign = md5(afterUrl + '&ak=' + 'hanhou-app' + '&ts=' + ts + onlykey)
    // console.log('sign:', sign)
    config.headers.sign = sign
  }
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
      duration: 2000,
      content: response.data.msg
    })
    if (response.data.code === 700 || response.data.code === 701 || response.data.code === 702) {
      utils.delUserInfo()
      utils.delToken()
      // 首先判断是不是APP内 如果是APP调APP登录，不是跳H5登录
      if (!utils.isApp()) {
        utils.goLogin()
      }
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
