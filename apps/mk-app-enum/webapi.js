/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */

import { fetch } from 'mk-utils'

export default {
    enum: {
        query: (option) => fetch.post('/v1/enum/query', option),
        del: (option)  => fetch.post('/v1/enum/delete', option)
    },
    enumDetail: {
        init: (option) => fetch.post('/v1/enumDetail/init', option),
        delDetail: (option)  => fetch.post('/v1/enumDetail/batchDelete', option)
    },
    columnDetail: {
        findByColumnCode: (code) => fetch.post('/v1/columnDetail/findByColumnCode', code)
    }
}