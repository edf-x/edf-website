import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import { fromJS } from 'immutable'
import config from './config'
import moment from 'moment'
import { Menu, Checkbox, DataGrid } from 'mk-component'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')

        const page = this.metaAction.gf('data.pagination').toJS()
        this.load(page)
    }

    load = async (page, entity = {}) => {
        const response = await this.webapi.user.queryPageList({ page, entity })
        const columns = await this.webapi.columnDetail.findByColumnCode('userList')
        response.columns = columns
        response.filter = entity
        this.injections.reduce('load', response) 
    }

    reload = async () => {
        const page = this.metaAction.gf('data.pagination').toJS()
        const entity = this.metaAction.gf('data.filter').toJS()
        this.load(page, entity)
    }

    getListRowsCount = () => {
        return this.metaAction.gf('data.list').size
    }

    getListColumns = () => {
        const users = this.metaAction.gf('data.list').toJS()
        const columns = this.metaAction.gf('data.columns').toJS()
        let { Column, Cell } = DataGrid
        let cols = [
            <Column name='select' columnKey='select' flexGrow={1} width={40}
                header={<Cell name='cb'><Checkbox checked={this.isSelectAll()} onChange={this.selectAll()}></Checkbox></Cell>}
                cell={(ps) => {
                   return <Cell name='cell'><Checkbox onChange={this.selectRow(ps.rowIndex)}></Checkbox></Cell>
                }}
            />,
            <Column name='select' columnKey='select' flexGrow={1} width={30}
                header={<Cell name='cb'></Cell>}
                cell={(ps) => {
                return <Cell name='cell'><a onClick={this.editRow(ps.rowIndex)} class='anticon anticon-edit mkicon-showy'></a></Cell>
                }}
            />            
        ]
        columns.forEach(op => {
            if (op.isVisible == 1) {
                let col = <Column name={op.id} columnKey={op.id} flexGrow={1} width={op.width}
                    header={<Cell name='header'>{op.caption}</Cell>}
                    cell={(ps) => {
                        if (op.fieldName == 'code') {
                            return <Cell><a onClick={this.modifyDetail(users[ps.rowIndex].id)}>{users[ps.rowIndex][op.fieldName]}</a></Cell>  
                        }
                        if (op.fieldName == 'sex') {
                            return <Cell>{users[ps.rowIndex].sex == 0 ? '男': users[ps.rowIndex].sex == 1 ? '女' : ''}</Cell>
                        }
                        return <Cell>{users[ps.rowIndex][op.fieldName]}</Cell>            
                    }}
                />
                cols.push(col)
            }
        })
        return cols
    }

    isSelectAll = () => {
        const lst = this.metaAction.gf('data.list')
        if (!lst || lst.size == 0)
            return false

        return lst.every(o => o.get('selected'))
    }

    selectAll = () => (e) => {
        this.injections.reduce('selectAll', e.target.checked)
    }

    selectRow = (rowIndex) => (e) => {
        this.injections.reduce('selectRow', rowIndex, e.target.checked)
    }

    pageChanged = (currentPage, pageSize) => {
        const entity = this.metaAction.gf('data.filter').toJS()
        this.load({ currentPage, pageSize }, entity)
    }

    nameChange = (e) => {
        const pagination = this.metaAction.gf('data.pagination').toJS(),
            filter = this.metaAction.gf('data.filter').toJS()

        filter.nickname = e.target.value
        this.load(pagination, filter)
    }

    sexChange = (v) => {
        const pagination = this.metaAction.gf('data.pagination').toJS(),
            filter = this.metaAction.gf('data.filter').toJS()

        filter.sex = v
        this.load(pagination, filter)
    }

    getBirthdayRange = () => {
        const birthdayRange = this.metaAction.gf('data.filter.birthdayRange')
        if (birthdayRange) {
            return birthdayRange.toJS()
        }
    }

    birthdayRangeChange = (dates) => {
        const pagination = this.metaAction.gf('data.pagination').toJS(),
            filter = this.metaAction.gf('data.filter').toJS()

        filter.birthdayRange = dates
        this.load(pagination, filter)
    }

    clearFilter = () => {
        const pagination = this.metaAction.gf('data.pagination').toJS(),
            filter = {}
        this.load(pagination, filter)
    }

    refresh = () => {
        const pagination = this.metaAction.gf('data.pagination').toJS(),
            filter = this.metaAction.gf('data.filter').toJS()

        this.load(pagination, filter)
    }

    editRow = (rowIndex) => async (...args) => {
        const row = this.metaAction.gf(`data.list.${rowIndex}`).toJS()

        const ret = await this.metaAction.modal('show', {
            title: '用户',
            children: this.metaAction.loadApp('mk-app-user-card?from=list', {
                store: this.component.props.store,
                personId: row.id,
                isPop:true
            })
        })

        if (ret) {
            this.refresh()
        }
    }

    roleUpdate = async () => {
        const lst = this.metaAction.gf('data.list')
        if (!lst || lst.size == 0)
        {
            this.metaAction.toast('error', '请选中要授权的用户')
            return
        }
        const selectRows = lst.filter(o => o.get('selected'))

        if (!selectRows || selectRows.size == 0)
        {
            this.metaAction.toast('error', '请选中要授权的用户')
            return
        }

        if (!selectRows || selectRows.size != 1)
        {
            this.metaAction.toast('error', '每次只能授权一个用户')
            return
        }

        const id = selectRows.map(o => o.get('id')).toJS()

        const ret = await this.metaAction.modal('show', {
            title: '用户',
            children: this.metaAction.loadApp('mk-app-user-card?from=list', {
                store: this.component.props.store,
                personId: id[0],
                isPop:true
            })
        })

        if (ret) {
            this.refresh()
        }
    }

    batchDelDetail = async () => {
        const lst = this.metaAction.gf('data.list')
        if (!lst || lst.size == 0)
        {
            this.metaAction.toast('error', '请选中要删除的用户')
            return
        }
        const selectRows = lst.filter(o => o.get('selected'))

        if (!selectRows || selectRows.size == 0)
        {
            this.metaAction.toast('error', '请选中要删除的用户')
            return
        }

        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认要删除选中用户，删除后这些用户将无法登录?'
        })

        if(!ret)
            return

        const ids = selectRows.map(o => o.get('id')).toJS()
        await this.webapi.user.delDetail({ ids })
        this.metaAction.toast('success', '删除成功')
        
        this.refresh()
    }

    columnSetting = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '栏目设置',
            children: this.metaAction.loadApp('mk-app-column-setting', {
                store: this.component.props.store,
                columnCode: "userList"
            })
        })

        if (ret) {
            this.reload()
        }
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}