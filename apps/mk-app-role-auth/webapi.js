/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */

import { fetch } from 'mk-utils'

export default {
    menuOperation: {
        query: (option) => fetch.post('/v1/menuOperation/query', option),
        save: (option)  => fetch.post('/v1/menuOperation/save', option),
    },
    role: {
        init: (option) => fetch.post('/v1/role/init', option),
        query: (option) => fetch.post('/v1/role/query', option),
        delete: (option) => fetch.post('/v1/role/delete', option)
    }
}