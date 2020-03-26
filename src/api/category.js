const baseUrl = '/bravo-mall-commodity/api/v1/category'
import axios from '@/libs/api.request'

/**
 * 分页获取类目
 * @param {*} param0 
 */
export const pageCategory = ({
  current,
  size,
  parId=0,
  level
}) => {
  return axios.request({
    url: baseUrl + "/page", 
    params: {
      current,
      size,
      parId,
      level
    }
  })
}

/**
 * 创建一个类目
 * @param {*} param0 
 */
export const createCategory = ({
  name,
  parId,
  productUnit,
  icon,
  description
}) => {
  return axios.request({
    url: baseUrl,
    method: 'post',
    data: {
      name,
      parId,
      productUnit,
      icon,
      description
    }
  })
}