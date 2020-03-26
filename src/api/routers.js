import axios from '@/libs/api.request'

export const getRouters = () => {
  return axios.request({
    url: '/bravo-mall-authorization/api/v1/authority/webpage/router'
  })
}