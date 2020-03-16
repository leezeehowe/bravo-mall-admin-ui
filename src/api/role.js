const baseUrl = '/bravo-mall-authorization/api/v1/'
import axios from '@/libs/api.request'

export const pageApi = ({
    current = 1, 
    size = 5,
    level = 0,
    id = 0,
    status = 0,
    parId = 0
}) => {
    return axios.request({
        url: baseUrl + "role/page",
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

export const deepestLevelApi = () => {
    return axios.request({
        url: baseUrl + "role/deepestLevel"
    })
}