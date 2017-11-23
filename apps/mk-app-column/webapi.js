/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */

import { fetch } from 'mk-utils'

export default {
    column: {
        query: (option) => fetch.post('/v1/column/query', option),
        del: (option)  => fetch.post('/v1/column/delete', option)
    },
    columnDetail: {
        init: (option) => fetch.post('/v1/columnDetail/init', option),
        delDetail: (option)  => fetch.post('/v1/columnDetail/batchDelete', option),
        findByColumnCode: (code) => fetch.post('/v1/columnDetail/findByColumnCode', code)
    }
}