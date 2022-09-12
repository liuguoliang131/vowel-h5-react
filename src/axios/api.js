import axios from './index'

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
export const promotion_list = (data) => {
  return axios({
    method: 'post',
    url: '/h5/promotion/list',
    data
  })
}

// 我的奖品列表
// eslint-disable-next-line camelcase
export const promotion_prizeList = (data) => {
  return axios({
    method: 'post',
    url: '/h5/promotion/prizeList',
    data
  })
}
// 我的课程章节列表
// eslint-disable-next-line camelcase
export const course_lessonList = (data) => {
  return axios({
    method: 'post',
    url: '/h5/course/lessonList',
    data
  })
}
// 活动详情
// eslint-disable-next-line camelcase
export const promotion_activityDetail = (data) => {
  return axios({
    method: 'post',
    url: '/h5/promotion/activityDetail',
    data
  })
}
