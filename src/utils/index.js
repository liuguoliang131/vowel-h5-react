/* eslint-disable no-undef */
import {
  USER_INFO,
  TOKEN
} from './uniField'
import { Toast } from 'antd-mobile'

// let webUrl = ''
// if(process.env.NODE_ENV==='development') {
//   webUrl = 'localhost'
// }else if(process.env.NODE_ENV==='test') {

// }else {

// }
let timer = null
const utils = {
  // 是否有App全局变量 判断是否在app内
  ownApp: (success, fail) => {
    try {
      if (App) {
        return success()
      } else {
        if (fail) {
          return fail()
        } else {
          Toast.show({
            content: '即将跳转到元音符App下载页面'
          })
          setTimeout(() => {
            window.location.href = 'https://h5.yuanyinfu.com/h5/app'
          }, 2000)
        }
      }
    } catch (error) {
      if (fail) {
        fail()
      } else {
        Toast.show({
          content: '即将跳转到元音符App下载页面'
        })
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          window.location.href = 'https://h5.yuanyinfu.com/h5/app'
        }, 2000)
      }
    }
  },
  goLogin: () => {
    App.postMessage(JSON.stringify({
      type: 'goLogin',
      params: {}
    }))
  },

  isLogin: () => {
    utils.ownApp(() => {
      const is = App.postMessage(JSON.stringify({
        type: 'isLogin',
        params: {},
        callback: 'isLoginResult'
      }))
      if (!is) {
        this.goLogin()
      }
    }, () => {
      window.location.href = window.location.origin + `/#/login?back=${window.location.hash.replace('#', '')}`
    })
  },

  isLoginResult: (value) => {
    alert('isLoginResult: ' + value)
  },
  // 分享到微信和朋友圈
  // shareTitle：分享标题 shareDesc：分享描述  shareUrl：分享的链接 shareCover：封面图链接
  shareWebToWX: (shareTitle, shareDesc, shareUrl, shareCover) => {
    App.postMessage(JSON.stringify({
      type: 'shareWebToWX',
      params: { shareTitle, shareDesc, shareUrl, shareCover }
    }))
  },

  openMiniProgram: (username, path) => {
    App.postMessage(JSON.stringify({
      type: 'openMiniProgram',
      params: { username, path }
    }))
  },
  // 跳转APP
  openAppPage: (pageJSON) => {
    // {"page":"myScorePage","params":{}, "isNeedLogin": true}
    App.postMessage(JSON.stringify({
      type: 'openAppPage',
      params: pageJSON
    }))
  },
  // 获取用户登陆后的信息
  getUserInfo: () => {
    const info = localStorage.getItem(USER_INFO)
    return info ? JSON.parse(info) : null
  },
  setUserInfo: (obj) => {
    localStorage.setItem(USER_INFO, JSON.stringify(obj))
  },
  delUserInfo: () => {
    localStorage.removeItem(USER_INFO)
  },
  // 获取token
  getToken: () => {
    const token = localStorage.getItem(TOKEN)
    return token || ''
  },
  setToken: (data) => {
    localStorage.setItem(TOKEN, data)
  },
  delToken: () => {
    localStorage.removeItem(TOKEN)
  },
  // 跳转页面
  hashPush: (hash = '/', params = {}) => {
    const paramArr = []
    Object.keys(params).forEach(item => {
      paramArr.push(`${item}=${params[item]}`)
    })
    let toPath = window.location.origin + `/#${hash}`
    if (paramArr.length) {
      toPath = toPath + '?' + paramArr.join('&')
    }
    window.location.href = toPath
  },
  // 获取URL params参数
  getUrlParams: (url = window.location.href) => {
    const params = {}
    if (url.includes('?')) {
      const strArr = url.split('?')
      if (strArr.length > 1) {
        const strArr1 = strArr[1].split('&')
        strArr1.forEach(item => {
          const strArr2 = item.split('=')
          params[strArr2[0]] = strArr2[1]
        })
        return params
      } else {
        return params
      }
    } else {
      return params
    }
  },
  // 返回年月日时分秒
  getTimeData: (date) => {
    const time = new Date(date)
    let y = time.getFullYear()
    let mon = time.getMonth() + 1
    let dd = time.getDate()
    let hh = time.getHours()
    let MM = time.getMinutes()
    let ss = time.getSeconds()
    y = y < 10 ? `0${y}` : y
    mon = mon < 10 ? `0${mon}` : mon
    dd = dd < 10 ? `0${dd}` : dd
    hh = hh < 10 ? `0${hh}` : hh
    MM = MM < 10 ? `0${MM}` : MM
    ss = ss < 10 ? `0${ss}` : ss
    return {
      y,
      mon,
      dd,
      hh,
      MM,
      ss
    }
  }
}
export default utils
