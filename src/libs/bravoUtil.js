import { hasOneOf } from '@/libs/tools'
/**
 * 获取一个可遍历数据类型的片段，从0开始数
 * @param {*} start 开始
 * @param {*} end 结束，不包括该序号的值
 */
export const getFragmentFromIterable = (iterable, start, end) => {
  const res = new Set()
  // 若是可遍历
  if (iterable && iterable[Symbol.iterator]) {
    const arr = [...iterable]
    for (let index = start; index < (end > arr.length ? arr.length : end); index++) {
      const element = arr[index];
      res.add(element instanceof Array ? element[1] : element)
    }
  }
  return res
}

/**
 * 把实体类对象数组转map，id做主键
 * @param {对象数组} arr 
 * @param {id的属性名} idField 
 */
export const entityArrToMap = (arr, idField = 'id') => {
  const map = new Map()
  arr.forEach(v => {
    map.set(v[idField], v)
  })
  return map
}

/**
 * 判断一个节点是否拥有子节点
 * ：判断依据是children属性
 * @param {*} node 
 */
export const hasChildren = (node) => {
  return node.children instanceof Array && node.children.length > 0 ? true : false;
}

/**
 * 过滤出叶子节点
 * @param {*} array 
 */
export const filterLeaf = (array) => {
  const result = [];
  array.forEach(node => {
    if(!hasChildren(node)) {
      result.push(Object.assign({}, node));
    }
  })
  return result;
}

/**
 * 从所给的数组中获取以下节点，返回新数组，不改变原数组。
 * 1. 全选的父节点
 * ：hasChilren() === true && indeterminate !== false && checked === true
 * 2. 选中的叶子节点,且该节点有兄弟节点未选中，
 * ：hasChildren() === false && checked === true  
 */
export const getCheckedNode = (array) => {
  const result = []
  array.forEach(node => {
    if(
        (hasChildren(node) && !node.indeterminate && node.checked)
          ||
        (!hasChildren(node) && node.checked)
      ) {
        result.push(node);
      }
  })
  return result;
}

export const getAllowableMenuList = (menuList, routerAuthorityList) => {
  // console.log(menuList)
  const routePermissionJudge = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } 
      else {
        if(!hasOneOf([item.name], routerAuthorityList)) {
          item.meta.hideInMenu = true;          
        }
      }
    })
  }
  return routePermissionJudge(menuList)
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }
  return routePermissionJudge(routes)
}

/**
 * 从payload中提取属性到外层。
 * @param {*} payloadNodeArr payloadNode列表
 * @param {*} mapArr  映射关系，一个二维数组，即要提取的属性在外层json的别名。['映射到外层JSON的属性名', 'payload中的属性名', '默认值']
 */
export const peekAttributeFromPayloadToOutside = (payloadNodeArr, mapArr, condition) => {
  const recursion = (list) => {
    list.forEach(node => {
      if(condition instanceof Function ? condition.call(null, node) : true) {
        mapArr.forEach(map => {
          node[map[0]] = node.payload[map[1]] ? node.payload[map[1]] : map[2];
        })
      }
      if(node.children instanceof Array && node.children.length > 0) {
        recursion(node.children);
      }
    })
  }
  recursion(payloadNodeArr);
}


export const wrapWithBeenIssuedResourceId = (payloadNodeArr, authorityList) => {
  const idList = authorityList.map(at => at.resourceId);
  const condition = (node) => {
    return hasOneOf([node.payload.id], idList);
  }
  peekAttributeFromPayloadToOutside(payloadNodeArr, [["checked", null, true]], condition); 
  console.log(payloadNodeArr);
}

/**
 * B \ A = B - A = { x | x∈B，x ∉ A}。
 * @param {Array} B 集合B
 * @param {Array} A 集合A
 */
export const relativeComplement = (B, A) => {
  const result = [];
  
  B.forEach(item => {
    if(!hasOneOf([item], A)) {
      result.push(JSON.parse(JSON.stringify(item)));
    }
  })

  return result;
}