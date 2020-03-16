import axios from 'axios'
import store from '@/store'
import router from '@/router'
import Vue from 'vue'

import {
  getToken
} from '@/libs/util'
// import { Spin } from 'view-design'
import { Message } from 'view-design'
const addErrorLog = errorInfo => {
  const {
    method,
    params,
    statusText,
    status,
    request: {
      responseURL
    }
  } = errorInfo
  let info = {
    params,
    type: method.toUpperCase(),
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      withCredentials: true,
      // 处理的响应范围
      validateStatus: (status) => {
        return true
      }
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      console.log(res)
      const { data, status, statusText } = res

      // 业务未成功，记入错误日志
      if (data.status != 200) {
        let errorData = {
          // 请求类型
          method: res.config.method,
          // 请求参数，不支持get类型
          params: res.config.data || 'GET请求参数请查看URL',
          // 服务器返回状态码
          status,
          // 服务器返回状态码描述
          statusText,
          request: {
            responseURL: res.request.responseURL
          }
        }
        addErrorLog(errorData)
      }

      // 如果是未登录，跳转到首页
      if (data.status == 10) {
        store.dispatch('handleLogOut').then(() => {
          router.push({
            name: 'login'
          })
          Message.warning({
            content: '您已被登出，请重新登录',
            duration: 8
          })
        })
      }

      // 业务成功（200）,只返回业务数据
      if(status <= 300) {
        return Promise.resolve(data.resource)
      }
      // 业务失败，只返回异常信息
      else {
        const exception = data.exception
        return Promise.reject(new Error( exception ? exception.cause : '请求失败，请重试'))
      }
    })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
