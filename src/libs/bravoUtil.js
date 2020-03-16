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