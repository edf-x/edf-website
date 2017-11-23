import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')
    }

    fieldChange = (name, value) => {
        this.injections.reduce('fieldChange', name, value)
    }

    btnClick = () => {
        const dbName = this.metaAction.gf('data.dbName')
        const sql = this.metaAction.gf('data.sql')
        if (dbName != this.dbName) {
            let arr = dbName.split(',')
            this.dbName = dbName
            let cfg = {
                name: arr[0] || 'test',
                version: arr[1] || '1.0',
                desc: arr[2] || 'mk-app-websql',
                size: arr[3] || 2 * 1024 * 1024
            }
            this.dbConfig = cfg
            this.db = window.openDatabase(cfg.name, cfg.version, cfg.desc, cfg.size)
        }

        this.db.transaction(function (tx) {
            tx.executeSql(sql, null, function (tx, rs) {
                console.log(sql + '执行sql成功,影响行数:' + rs.rows.length);
                console.log(JSON.stringify(Array.from(rs.rows)))
            }, function (tx, err) { 
                console.log(sql + '出错:' + err.message);
            });
        });

    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}