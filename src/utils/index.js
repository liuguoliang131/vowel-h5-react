/* eslint-disable no-undef */
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
  }
}
export default utils
