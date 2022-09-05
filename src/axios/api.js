import axios from './index'

export const getTest = (params) => {
  return axios({
    method: 'get',
    url: '/api/hahaha',
    params
  })
}
export const deleteTest = (params) => {
  return axios({
    method: 'get',
    url: '/',
    params
  })
}
export const postTest = (data) => {
  return axios({
    method: 'post',
    url: '/',
    data
  })
}
export const putTest = (data) => {
  return axios({
    method: 'put',
    url: '/',
    data
  })
}
