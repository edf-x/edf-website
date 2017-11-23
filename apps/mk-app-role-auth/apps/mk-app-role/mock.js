/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

let apiValue = value => ({ result: true, value })
let mock = {
    role: {
        create: (role) => {
            role.id = Math.random()
            mockData.role.push(role)
            return apiValue(role)
        },
        update: (role) => {
            let theRole = mockData.role.find(r => r.id == role.id)
            if (theRole) {
                Object.assign(theRole, role)
            }
            return apiValue(theRole)
        },
        findById: (id) => apiValue(mockData.role.find(r => r.id == id)),
    }
}


fetch.mock('/v1/role/create', mock.role.create)
fetch.mock('/v1/role/update', mock.role.update)
fetch.mock('/v1/role/findById', mock.role.findById)