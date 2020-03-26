import axios from '@/libs/api.request'
const baseUrl = '/bravo-mall-authorization/api/v1/api-resource'

/**
 * 新建资源
 * @param {*} param0 
 */
export const postApiResourceApi = ({
  name,
  url,
  version,
  belongTo,
  parId,
  level,
  description
}) => {
  return axios.request({
    url: baseUrl,
    data: {
      name,
      url,
      version,
      belongTo,
      parId,
      level,
      description
    },
    method: 'post'
  })
}

/**
 * 分页获取资源
 * @param {*} param0 
 */
export const pageApiResourceApi = ({
  current,
  size
}) => {
  return axios.request({
    url: baseUrl + '/page',
    params: {
      current,
      size
    }
  })
}

/**
 * 获取所有根节点子树
 */
export const getAllRootTree = () => {
  return axios.request({
    url: baseUrl + '/tree/all'
  })
}