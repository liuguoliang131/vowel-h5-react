// 全局字段
const envName = process.env.NODE_ENV
export const USER_INFO = 'userInfo'
export const TOKEN = 'token'
export const APP_DOWNLOAD_URL = 'https://h5.yuanyinfu.com/h5/app'
// 开发环境
const devOptions = {
  downloadUrl: 'https://h5.yuanyinfu.com/h5/app'
}
// 测试环境
const testOptions = {
  downloadUrl: 'https://h5.yuanyinfu.com/h5/app'

}
// 生产环境
const prodOptions = {
  downloadUrl: 'https://share.yuanyinfu.com/h5/app'
}
let options = null
if (envName === 'development') {
  options = {
    ...devOptions
  }
} else if (envName === 'test') {
  options = {
    ...testOptions
  }
} else {
  options = {
    ...prodOptions
  }
}
export default options
