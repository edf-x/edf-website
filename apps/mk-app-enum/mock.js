/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

fetch.mock('/v1/enum/init', (option) => {
     var ret = query(option)
     ret.value.enumTypes = mockData.enumTypes
     return ret
 })

fetch.mock('/v1/enumType/query', (option) => {
    initEnum()
    return mockData.enumTypes
})

fetch.mock('/v1/enum/query', (option) => {
    return query(option)
})

function query(option) {
    initEnum()

    const { pagination, filter } = option

    var data = mockData.enum

    if (filter) {
        if (filter.type) {
            data = data.other.filter(o => {
                return o.type.toString().substr(0, filter.type.toString().length) == filter.type
            })
        }

    }

    var current = pagination.current
    var pageSize = pagination.pageSize
    var start = (current - 1) * pageSize
    var end = current * pageSize

    start = start > data.length - 1 ? 0 : start
    end = start > data.length - 1 ? pageSize : end
    current = start > data.length - 1 ? 1 : current

    var ret = {
        result: true,
        value: {
            pagination: { current, pageSize, total: data.length },
            list: []
        }
    }
    for (let j = start; j < end; j++) {
        if (data[j])
            ret.value.list.push(data[j])
    }

    return ret
}


fetch.mock('/v1/enumType/del', (option) => {
    const del = (types) => {
        types.forEach((t, index) => {
            if (t.id == option.id) {
                types.splice(index, 1)
                return true
            } else if (t.children) {
                del(t.children)
            }
        })
    }
    del(mockData.enumTypes)

    return { result: true, value: true }
})


fetch.mock('/v1/enum/del', (option) => {
    option.ids.forEach(id => {
        let index = mockData.enum.findIndex(o => o.id == id)
        
        if (index || index === 0)
            mockData.enum.splice(index, 1)
    })

    return { result: true, value: true }
})