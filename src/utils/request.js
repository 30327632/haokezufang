import Axios from 'axios'
import {Toast} from "antd-mobile"
import {API_URL} from "./url"
const axios = Axios.create({
    baseURL: API_URL
  })
  // 请求前的拦截器  两个回调函数  一个是成功之后的  一个是失败之后的
  axios.interceptors.request.use((config)=>{
    Toast.loading('Loading...', 1,null);
    return config
  },(error)=>{
    return Promise.reject(error)
  })

  // 响应之后的拦截器
 axios.interceptors.response.use((response)=>{
  // 全局销毁
   Toast.hide()
   return response.data
 },(error)=>{
   return Promise.reject(error)
 })
 export default axios

  