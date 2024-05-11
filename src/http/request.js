import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 添加请求头等前置处理
    const token = localStorage.getItem('token')
    // config.headers['Authorization'] =
    //   'Bearer' + ' ' + localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    // 请求错误处理
    console.log('Request Error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 响应后处理
    // if (response.status === 200 && response.data.code === 200) {
    if (response.status === 200) {
      // console.log('Response:', response)
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response.data)
    }
  },
  (error) => {
    console.log('Response Error:', error)
    return ElMessage.error('请求失败，请稍后再试')
  }
)

export default service
