import axios from 'axios'

const httpHelper = {}
// 配置Vue插件
httpHelper.install = function fn (Vue) {
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log(config, '-----config')
    console.log(config.url, '===-----url=')
    if (config.url !== 'login') {
      const token = sessionStorage.getItem('token')
      config.headers.common['Authorization'] = token
    }

    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

  axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
  Vue.prototype.$http = axios
}

export default httpHelper
