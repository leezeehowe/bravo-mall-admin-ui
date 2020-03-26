const baseUrl = '/bravo-mall-authorization/api/v1/role'
import axios from '@/libs/api.request'

/**
 * 分页获取角色
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
 * 获取最深层级
 */
export const deepestLevelApi = () => {
    return axios.request({
        url: baseUrl + "/deepestLevel"
    })
}

/**
 * 创建角色
 * @param {*} param0 
 */
export const postRole = ({
    name,
    description,
    level,
    parId
}) => {
    return axios.request({
        url: baseUrl,
        data: {
            name,
            description,
            level,
            parId
        },
        method: 'post'
    });
}

/**
 * 获取所有根节点的子树
 */
export const getAllRootTree = () => {
    return axios.request({
        url: baseUrl + '/tree/all'
    });
}

/**
 * 颁发角色
 */
export const issueRole = ({
    roleId,
    issuedUserExternalId
}) => {
    return axios.request({
        url: '/bravo-mall-authorization/api/v1/role-issue',
        method: 'post',
        data: {
            roleId,
            issuedUserExternalId
        }
    });
}
