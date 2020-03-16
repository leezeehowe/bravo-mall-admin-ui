import Mock from 'mockjs'

const word = [
    {
        id: 1,
        word: '法轮功'
    }
]

let word_id = 1

export const addWord = req => {
    req = JSON.parse(req.body)
    let word = req.word
    if (word !== '') {
        return {
            status: '200',
            data: {
                id: word_id++,
                ip: '127.0.0.1',
                userId: 1,
                word,
                createTime: 1576293639000,
                updateTime: 1576293639000
            },
            msg: '添加敏感词成功'
        }
    }
    else {
        return {
            status: -1,
            msg: '敏感词不能为空'
        }
    }
}


export const deleteWord = req => {
    req = JSON.parse(req.body)
    return {
        status: '200',
        msg: '删除敏感词成功'
    }
}

export const search = req => {
    console.log(req)
    if(req.url.indexOf("草") > 0) {
        return {
            status: '200',
            data: {
                total: 4,
                list: [
                    {
                        id: 1,
                        ip: '127.0.0.1',
                        userId: 1,
                        word: '操蛋哦',
                        createTime: 1576293639000,
                        updateTime: 1576293639000
                    },
                    {
                        id: 1,
                        ip: '127.0.0.1',
                        userId: 1,
                        word: '操蛋哦',
                        createTime: 1576293639000,
                        updateTime: 1576293639000
                    },
                    {
                        id: 1,
                        ip: '127.0.0.1',
                        userId: 1,
                        word: '操蛋哦',
                        createTime: 1576293639000,
                        updateTime: 1576293639000
                    },
                    {
                        id: 1,
                        ip: '127.0.0.1',
                        userId: 1,
                        word: '操蛋哦',
                        createTime: 1576293639000,
                        updateTime: 1576293639000
                    }
                ],
                pageNum: 1,
                pageSize: 10
            }
        }
    }
    else if(req.url.indexOf("妈") > 0){
        return {
            status: '200',
            data: {
                total: 4,
                list: [
                    {
                        id: 1,
                        ip: '127.0.0.1',
                        userId: 1,
                        word: '妈蛋',
                        createTime: 1576293639000,
                        updateTime: 1576293639000
                    },
                    {
                        id: 1,
                        ip: '127.0.0.1',
                        userId: 1,
                        word: '妈蛋',
                        createTime: 1576293639000,
                        updateTime: 1576293639000
                    }
                ],
                pageNum: 1,
                pageSize: 10
            }
        }
    }
    else {
        return {
            status: '200',
            data: {
                total: 4,
                list: [

                ],
                pageNum: 1,
                pageSize: 10
            }
        } 
    }
}