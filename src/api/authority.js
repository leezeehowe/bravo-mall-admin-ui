const baseUrl = '/bravo-mall-authorization/api/v1/authority'
import axios from '@/libs/api.request'

/**
 * 给角色授权
 * @param {*} param0 
 */
export const postAuthority = ({
  roleId,
  webpage,
  api
}) => {
  return axios.request({
      url: baseUrl,
      method: 'post',
      data: {
          roleId,
          webpage,
          api
      }
  })
}

/**
 * 删除角色的授权
 * @param {*} param0 
 */
export const deleteAuthority = ({
  roleId,
  webpage,
  api
}) => {
  return axios.request({
      url: baseUrl,
      method: 'delete',
      data: {
          roleId,
          webpage,
          api
      }
  })
}

/**
 * 获取指定角色的菜单权限和api权限
 * @param {*} roleId 
 */
export const getAuthority = (roleId) => {
  return axios.request({
      url: baseUrl,
      params: {
        roleId
      }
  })
}