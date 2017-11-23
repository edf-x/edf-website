// /**
//  * mock.js 提供应用截获ajax请求，为脱离后台测试使用
//  * 模拟查询更改内存中mockData,并返回数据
//  */

// import { fetch } from 'mk-utils'

import './server/service'

// const mockData = fetch.mockData

// fetch.mock('/v1/menu/create', (option) => {
//     const id = mockData.menu.length
//     const v = { ...option, id }
//     mockData.menu.push(v)
//     return { result: true, value: v }
// })

// fetch.mock('/v1/menu/update', (option) => {
//     const v = mockData.menu.find(o => o.id == option.id) 
//     v.code = option.code
//     v.name = option.name
//     v.appName = option.appName
//     v.parentId = option.parentId
//     v.appProps = option.appProps
//     return { result: true, value: v }
// })

// fetch.mock('/v1/menu/findById', (id) => {
//     const v = mockData.menu.find(o => o.id == id)
//     return { result: true, value: v }
// })