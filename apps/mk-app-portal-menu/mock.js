// /**
//  * mock.js 提供应用截获ajax请求，为脱离后台测试使用
//  * 模拟查询更改内存中mockData,并返回数据
//  */

// import { fetch } from 'mk-utils'

// const mockData = fetch.mockData

import './server/service'

// function initMenu() {
//     if (mockData.menu && mockData.menu.length > 0)
//         return

//     mockData.menu = [{
//         id: 0,
//         cod: '000',
//         name: '开发平台',
//         children: [{
//             id: 1,
//             code: '100',
//             name: '系统设置',
//             children: [{
//                 id: 101,
//                 code: '10010',
//                 name: '个人设置',
//                 appName: 'mk-app-my-setting',
//                 appProps: '',
//                 parentId: 1
//             }, {
//                 id: 102,
//                 code: '10020',
//                 name: '门户菜单',
//                 appName: 'mk-app-portal-menu',
//                 appProps: '',
//                 parentId: 1
//             }, {
//                 id: 103,
//                 code: '10030',
//                 name: '角色设置',
//                 appName: 'mk-app-role-list',
//                 appProps: '',
//                 parentId: 1
//             }]
//         }, {
//             id: 2,
//             code: '20010',
//             name: '用户管理',
//             appName: 'mk-app-user-list',
//             appProps: '',
//             parentId: 1
//         }]
//     }]
// }


// fetch.mock('/v1/menu/init', (option) => {
//     var ret = query(option)
//     ret.value.menu = mockData.menu
//     return ret
// })

// fetch.mock('/v1/menu/query', (option) => {
//     return query(option)
// })

// function query(option) {
//     initMenu()

//     const { pagination, filter } = option

//     var data = mockData.menu

//     if (filter) {
//         if (filter.parentId) {
//             data = data.filter(o => o.parentId == filter.parentId)
//         }

//     }

//     var current = pagination.current
//     var pageSize = pagination.pageSize
//     var totalData = data.length
//     var totalPage = Math.round(totalData / pageSize) + (totalData % pageSize ? 1 : 0)
//     var start = (current - 1) * pageSize
//     var end = current * pageSize

//     start = start > data.length - 1 ? 0 : start
//     end = start > data.length - 1 ? pageSize : end
//     current = start > data.length - 1 ? 1 : current

//     var ret = {
//         result: true,
//         value: {
//             pagination: { currentPage, pageSize, totalPage ,totalData},
//             list: []
//         }
//     }
//     for (let j = start; j < end; j++) {
//         if (data[j])
//             ret.value.list.push(data[j])
//     }
//     return ret
// }



// fetch.mock('/v1/menu/deleteBatch', (option) => {

//     mockData.menu = mockData.menu.filter(m => option.find(id => id == m.id) === undefined)

//     return { result: true, value: true }
// })