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
console.log('utils')

let timer = null
const utils = {
  isApp: () => {
    try {
      if (App) {
        return true
      }
    } catch (error) {
      return false
    }
  }, // 是否在app内
  // 是否有App全局变量 判断是否在app内
  ownApp: (success, fail) => {
    try {
      if (App) {
        return success()
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
    utils.ownApp(() => {
      App.postMessage(JSON.stringify({
        type: 'goLogin',
        params: {}
      }))
    }, () => {
      const urlParams = utils.getUrlParams()
      // 如果url有参数 那么跳转到login进行登录 share_sign
      utils.hashPush('/login', {
        ...urlParams,
        back: '/layout/home'
      })
    })
  },

  isLogin: () => {
    utils.ownApp(() => {
      App.postMessage(JSON.stringify({
        type: 'isLogin',
        params: {},
        callback: 'isLoginResult'
      }))
    }, () => {
      if (!utils.getToken()) {
        const urlParams = utils.getUrlParams()
        // 如果url有参数 那么跳转到login进行登录 share_sign
        utils.hashPush('/login', {
          ...urlParams,
          back: '/layout/home'
        })
      }
    })
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
    // 跳转到支付
    // {"page":"musicDetailPage","isNeedLogin":false,"params":{"music_info_id":0}}
    utils.ownApp(() => {
      App.postMessage(JSON.stringify({
        type: 'openAppPage',
        params: pageJSON
      }))
    })
  },

  // 获取用户登陆后的信息
  getUserInfo: () => {
    const info = sessionStorage.getItem(USER_INFO)
    return info ? JSON.parse(info) : null
  },
  setUserInfo: (obj) => {
    sessionStorage.setItem(USER_INFO, JSON.stringify(obj))
  },
  delUserInfo: () => {
    sessionStorage.removeItem(USER_INFO)
  },
  // 获取token
  getToken: () => {
    const token = sessionStorage.getItem(TOKEN)
    return token || ''
  },
  setToken: (data) => {
    sessionStorage.setItem(TOKEN, data)
  },
  delToken: () => {
    sessionStorage.removeItem(TOKEN)
  },
  // 如果是app环境下使用session
  setAppToken: (token) => {
    window.sessionStorage.setItem(TOKEN, token)
  },
  getAppToken: () => {
    return window.sessionStorage.getItem(TOKEN) || ''
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
          if (item.includes('share_sign=')) {
            const strArr2 = item.split('share_sign=')
            params.share_sign = strArr2[1]
          } else {
            const strArr2 = item.split('=')
            params[strArr2[0]] = strArr2[1]
          }
        })
        return params
      } else {
        return params
      }
    } else {
      return params
    }
  },
  // 获取hash值和后缀参数
  getHashQuery: (url = window.location.href) => {
    let hash = '/'
    if (url.includes('#')) {
      hash = url.split('#')[1]
    }
    const params = {
      path: hash,
      query: {

      }
    }
    if (hash.indexOf('?')) {
      const strArr = hash.split('?')
      params.path = strArr[0]
      if (strArr.length > 1) {
        const strArr1 = strArr[1].split('&')
        strArr1.forEach(item => {
          if (item.includes('share_sign=')) {
            const strArr2 = item.split('share_sign=')
            params.query.share_sign = strArr2[1]
          } else {
            const strArr2 = item.split('=')
            params.query[strArr2[0]] = strArr2[1]
          }
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
  },
  // 保存图片到本地
  saveBase64Image: (base64Img) => {
    App.postMessage(JSON.stringify({
      type: 'saveBase64Image',
      params: { img: base64Img }
    }))
  }
}
window.isLoginResult = function (token) {
  if (!token) {
    // 假如是home页 不需要去登陆
    if (utils.getHashQuery().path !== '/layout/home') {
      utils.goLogin()
    }
  } else {
    utils.setAppToken(token)
  }
}
export default utils
