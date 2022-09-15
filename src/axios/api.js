import axios from './index'
import utils from '../utils'
// 获取验证码
export const captcha = (data) => {
  return axios({
    method: 'post',
    url: '/h5/base/captcha',
    data
  })
}
// 登录
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/h5/base/login',
    data,
    headers: {
      ak: 'hanhou-app',
      ts: Date.now(),
      sign: ''
    }
  })
}
// 我的活动列表
// eslint-disable-next-line camelcase
export const promotionListApi = (data) => {
  return axios({
    method: 'post',
    url: '/h5/promotion/list',
    data
  })
}

// 我的奖品列表
// eslint-disable-next-line camelcase
export const promotionPrizeListApi = (data) => {
  return axios({
    method: 'post',
    url: '/h5/promotion/prizeList',
    data
  })
}
// 我的课程章节列表
// eslint-disable-next-line camelcase
export const courseLessonListApi = (data) => {
  return axios({
    method: 'post',
    url: '/h5/course/lessonList',
    data
  })
}
// 活动详情
// eslint-disable-next-line camelcase
export const promotionActivityDetailApi = (data) => {
  return axios({
    method: 'post',
    url: '/h5/promotion/activityDetail',
    data
  })
}
// 抽奖
export const promotionPrizeDrawApi = (data) => {
  return axios({
    method: 'post',
    url: '/h5//promotion/prizeDraw',
    data
  })
}
// 轮播中奖数据
export const promotionDrawCycleListApi = (data) => {
  return axios({
    method: 'post',
    url: '/h5//promotion/drawCycleList',
    data
  })
}

// 海报
export const promotionSharePosterListApi = (data) => {
  return axios({
    method: 'post',
    url: '/h5//promotion/sharePoster',
    data
  })
}
