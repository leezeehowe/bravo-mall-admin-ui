import {pageApi, deepestLevelApi} from '@/api/role'

/**
* 获取角色分页数据
*/
 export const handleGetPage  = async ({ current, size, id, level, parId, status }) => {
  // 向服务器请求数据
  const res = {}
  const { records, total, pages } = await pageApi({
    current,
    size,
    level,
    id,
    status,
    parId
  });

  // 返回数据给视图层
  res.pagination = {
    current,
    size,
    pages,
    total
  }
  res.records = records
  return res
}

export const handleGetdeeepestLevel = async() => {
  return await deepestLevelApi()
}