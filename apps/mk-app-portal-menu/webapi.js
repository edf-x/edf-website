/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */

import { fetch } from 'mk-utils'

export default {
    menu: {
        queryPageList: (option) => fetch.post('/v1/menu/queryPageList', option),
        deleteBatch: (option)  => fetch.post('/v1/menu/deleteBatch', option)
    },
    columnDetail: {
        findByColumnCode: (code) => fetch.post('/v1/columnDetail/findByColumnCode', code)
    }
}