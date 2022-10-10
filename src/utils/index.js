/* eslint-disable no-undef */
import options, {
  USER_INFO,
  TOKEN
} from './uniField'
import { Toast } from 'antd-mobile'
console.log('utils')

let timer = null
// 微信内自带浏览器顶级对象叫App  不要和它重名
const utils = {
  isApp: () => {
    try {
      if (HSApp) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }, // 是否在app内
  // 是否有App全局变量 判断是否在app内
  ownApp: (success, fail) => {
    try {
      if (HSApp) {
        return success()
      }
    } catch (error) {
      if (fail) {
        fail()
      } else {
        if (process.env.NODE_ENV === 'development') return false
        Toast.show({
          content: '即将跳转到元音符App下载页面'
        })
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          window.location.href = options.downloadUrl
        }, 2000)
      }
    }
  },
  goLogin: () => {
    utils.ownApp(() => {
      HSApp.postMessage(JSON.stringify({
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
  // 有异步问题，暂时弃用
  isLogin: () => {
    if (utils.isApp()) {
      HSApp.postMessage(JSON.stringify({
        type: 'isLogin',
        params: {},
        callback: 'isLoginResult'
      }))
    } else {
      if (!utils.getToken()) {
        const urlParams = utils.getUrlParams()
        // 如果url有参数 那么跳转到login进行登录 share_sign
        utils.hashPush('/login', {
          ...urlParams,
          back: '/layout/home'
        })
      }
    }
  },

  // 分享到微信和朋友圈
  // shareTitle：分享标题 shareDesc：分享描述  shareUrl：分享的链接 shareCover：封面图链接
  shareWebToWX: (shareTitle, shareDesc, shareUrl, shareCover) => {
    HSApp.postMessage(JSON.stringify({
      type: 'shareWebToWX',
      params: { shareTitle, shareDesc, shareUrl, shareCover }
    }))
  },

  openMiniProgram: (username, path) => {
    HSApp.postMessage(JSON.stringify({
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
      HSApp.postMessage(JSON.stringify({
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
  // 保存内存图片到本地 base64
  saveBase64Image: (base64Img) => {
    HSApp.postMessage(JSON.stringify({
      type: 'saveBase64Image',
      params: { img: base64Img }
    }))
  },
  // 保存url图片到本地
  saveUrlImage: (img) => {
    HSApp.postMessage(JSON.stringify({
      type: 'saveUrlImage',
      params: { img }
    }))
  },
  // 判断应用系统
  isWhatSysTem: () => {
    const userMessage = navigator.userAgent
    const isAndroid = userMessage.indexOf('Andriod') > -1 || userMessage.indexOf('Adr') > -1 // 当前为Andriod环境
    // console.log('isAndroid', isAndroid)
    const isIOS = !!userMessage.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // 当前为IOS环境
    // console.log('isIOS', isIOS)
    if (isAndroid) {
      return 1
    } else if (isIOS) {
      return 2
    } else {
      return 3
    }
  },
  // 分享base64图片到微信 微博
  // share_way: 微信wxFriend、timeline、微博weibo
  // share_title：标题
  shareBase64Image: ({ img, share_way, share_title }) => {
    HSApp.postMessage(JSON.stringify({
      type: 'shareBase64Image',
      params: {
        img,
        share_way,
        share_title
      }
    }))
  },
  // 分享url图片到微信 微博
  shareUrlImage: ({ img, share_way, share_title }) => {
    HSApp.postMessage(JSON.stringify({
      type: 'shareUrlImage',
      params: {
        img,
        share_way,
        share_title
      }
    }))
  },
  // 获取APP信息
  getAppConfig: () => {
    if (utils.isApp()) {
      HSApp.postMessage(JSON.stringify({
        type: 'getAppConfig',
        params: {},
        callback: 'appConfig'
      }))
    }
  }

}
window.isLoginResult = function (token) {
  if (!token) {
    utils.goLogin()
  } else {
    utils.setAppToken(token)
  }
}
// 获取app信息的回调 保存
window.appConfig = function (config) {
  alert('appConfig', config)
  let AppConfigInfo = JSON.stringify({
    'version-code': '1710'
  })
  if (typeof config === 'string') {
    AppConfigInfo = config
  } else {
    AppConfigInfo = JSON.stringify(config)
  }
  window.localStorage.setItem('AppConfigInfo', AppConfigInfo)
}

export default utils
