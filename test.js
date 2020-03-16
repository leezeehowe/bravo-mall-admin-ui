const getFragmentFromIterable = (iterable, start, end) => {
    const res = new Set()
    // 若是可遍历
    if (iterable && iterable[Symbol.iterator]) {
        const arr = [...iterable]
        for (let index = start; index < ( end > arr.length ? arr.length : end); index++) {
            const element = arr[index];
            res.add(element)
        }
    }
    return res
}


let map = new Map()
map.set(1, 1)
Vue.set(map, 2, 2)

console.log(_m)