import axios from '@/libs/api.request'
import config from '@/config'

const baseUrl = "/bravo-mall-usercenter/api/v1"

/**
 * 用户登录
 * @param {string} phoneNumber  手机号
 * @param {string} smsCode  手机验证码
 */
export const login = (phoneNumber, smsCode) => {
  console.log(phoneNumber, smsCode)
  return axios.request({
    url: baseUrl + "/token/platform",
    data: {
      phoneNumber,
      smsCode
    },
    method: 'post',
    withCredentials: true
  })
}

/**
 * 获取用户信息
 * @param {*} token 
 */
export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

/**
 * 发送验证码
 * @param {string} phoneNumbers 手机号 
 */
export const sendSmsCode = async (phoneNumber) => {
  try {
    const body = await axios.request({
      url: baseUrl + '/sms/code',
      method: 'post',
      data: {
        phoneNumber: phoneNumber
      }
    })
    return "获取验证码成功！"
  }
  catch (e) {
    throw new Error(e.cause)
  }
}

/**
 * 用户登出
 * @param {*} token 
 */
export const logout = (token) => {
  return axios.request({
    url: baseUrl + '/user/logout',
    method: 'post'
  })
}

/**
 * 分页获取用户列表
 * @param {*} current 
 * @param {*} size 
 */
export const pageAdminVo = (current, size) => {
  return axios.request({
    url: baseUrl + '/user/adminVo/page',
    params: {
      current,
      size
    }
  })
}

/**
 * 搜索用户
 * @param {}} param0 
 */
export const searchUser = ({
  phone,
  username,
  uuid
}) => {
  return axios.request({
    url: baseUrl + '/user/adminVo/search',
    params: {
      phone,
      username,
      uuid
    }
  })
}

/***************************** 待实现的 ***************************************/
export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
