import Vue from 'vue'
import { deepestLevelApi, pageApi } from '@/api/role'

const state = {
  // 目前角色最大层级
  deepestLevel: 0,
  // 角色图，键：层级 值：Map<id, entity>
  roleStore: {}
}

const getters = {
  /**
   * 根据层级数获取中文释义
   */
  levelName: (state) => ({ level }) => {
    return `${(level + 1)}级角色`
  },
  /**
   * 根据角色id获取角色中文名
   * 角色id为零代表系统创建
   */
  roleName: (state) => ({ id, level }) => {
    console.log(`role-store#roleName: id=${id} level=${level}`)
    let name
    if (id == 0) {
      name = '系统创建'
    }
    else {
      const arr = getters.roleArrByLevel(state)(level)
      const node = arr[arr.length - id + 1]
      name = node ? node.name : id + ''
    }
    return name
  },
  /**
   * 根据角色层级获取角色数组
   */
  roleArrByLevel: (state) => (level) => state.roleStore[level] || [],
  deepestLevel: (state) => state.deepestLevel
}

const mutations = {
  setRecords: (state, { level, arr }) => {
    const roleStore = state.roleStore
    const tempArr = arr instanceof Array ? arr : !arr ? [] : arr
    // 按id降序排序
    tempArr.sort((f, s) => s.id - f.id)
    if (roleStore[level] instanceof Array) {
      roleStore[level].concat(tempArr)
    }
    else {
      roleStore[level] = tempArr
    }
    state.roleStore = Object.assign({}, roleStore)
  },
  setDeepestLevel: (state, level) => {
    if (typeof level === "number") {
      state.deepestLevel = level
    }
  }
}
const actions = {

  /**
  * 获取角色树最深层级
  */
  handleFetchDeepestLevel: async ({ commit, state }) => {
    const deepestLevel = await deepestLevelApi()
    commit('setDeepestLevel', deepestLevel)
  },

  /**
  * 获取角色分页数据
  */
  handleGetPage: async ({ commit }, { current, size, id, level, parId, status }) => {
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

    // 存到store中
    commit('setRecords', { level, arr: records })

    // 返回数据给视图层
    res.pagination = {
      current,
      size,
      pages,
      total
    }
    res.records = records
    return res
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}