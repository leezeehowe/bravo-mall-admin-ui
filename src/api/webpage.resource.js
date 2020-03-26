import axios from '@/libs/api.request'
const baseUrl = '/bravo-mall-authorization/api/v1/webpage-resource'

/**
 * 分页获取资源
 * @param {*} param0 
 */
export const pageApi = ({
    current = 1,
    size = 5,
    level = 0,
    id = 0,
    status = 0,
    parId = 0
}) => {
    return axios.request({
        url: baseUrl + "/page",
        params: {
            current,
            size,
            level,
            id,
            status,
            parId
        }
    })
}

/**
 * 新建一个资源
 * @param {*} param0 
 */
export const postResource = ({
    name,
    parId,
    text,
    type,
    description,
    level
}) => {
    return axios.request({
        url: baseUrl,
        method: 'post',
        data: {
            name,
            parId,
            text,
            type,
            description,
            level
        }
    })
}

/**
 * 获取最大深度
 */
export const getDeepestLevel = () => {
    return axios.request({
        url: '/bravo-mall-authorization/api/v1/tree/level/webpage_resource'
    })
}

/**
 * 获取后台管理系统页面资源
 */
export const getAdminWebpageResourceTree = () => {
    return axios.request({
        url: baseUrl + '/tree/all'
    })
}
