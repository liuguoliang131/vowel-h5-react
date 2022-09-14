/* eslint-disable no-undef */
import {
  USER_INFO,
  TOKEN
} from './uniField'
const utils = {
  goLogin: () => {
    App.postMessage(JSON.stringify({
      type: 'goLogin',
      params: {}
    }))
  },

  isLogin: () => {
    App.postMessage(JSON.stringify({
      type: 'isLogin',
      params: {},
      callback: 'isLoginResult'
    }))
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
  }
}
export default utils
