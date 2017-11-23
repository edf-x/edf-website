// /**
//  * mock.js 提供应用截获ajax请求，为脱离后台测试使用
//  * 模拟查询更改内存中mockData,并返回数据
//  */

// import { fetch } from 'mk-utils'
import './server/service'
// const mockData = fetch.mockData

// function init() {
//     if (!mockData.editableTable) {
//         mockData.editableTable = []
//         for (let i = 0; i < 5; i++) {
//             mockData.editableTable.push({
//                 id: i,
//                 name: '查看' + (i + 1),
//                 parentId: '0',
//                 isEndNode: 1
//             })
//         }
//     }
// }


// fetch.mock('/v1/operation/query', (option) => {

//     init()

//     return {
//         result: true, value: mockData.editableTable
//     }
// })

// fetch.mock('/v1/operation/save', (option) => {
//     mockData.editableTable = option

//     return {
//         result: true, value: true
//     }
// })

