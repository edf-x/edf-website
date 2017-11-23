import config from './../config'
import { tree } from 'mk-utils'
const { dbProvider, dbConfig, webProvider } = config.current
const models = dbProvider && new dbProvider(
    dbConfig,
    {
        user: [
            { id: 10, name: '张三', mobile: '13334445556', password: '1' },
            { id: 11, name: '李国', mobile: '13334445557', password: '1' },
        ],
        role: [
            { id: 10, name: '管理员' },
            { id: 20, name: '用户' },
        ],
        userRole: [
            { id: 1, userId: 10, roleId: 10 },
            { id: 2, userId: 11, roleId: 20 },
        ],
        menu: [
            { id: 20, name: '个人设置', code: '20', parentId: 0, appName: 'mk-app-my-setting' },
            { id: 21, name: '菜单预置', code: '21', parentId: 0, appName: 'mk-app-portal-menu' },
            { id: 31, name: '用户管理', code: '31', parentId: 30 },
            { id: 30, name: '系统管理', code: '30', parentId: 0 },
        ],
        operation: [
            { id: 100, name: '查看', dependentId: null },
            { id: 900, name: '操作', dependentId: 100 },
        ],
        menuOperation: [
            { id: 1000, menuId: 10, operationId: 100 },
            { id: 1001, menuId: 10, operationId: 900 },
            { id: 1002, menuId: 20, operationId: 100 },
            { id: 1003, menuId: 20, operationId: 900 },
        ],
        menuOperationRole: [
            { id: 1004, menuOperationId: 1000, roleId: 10 },
            { id: 1005, menuOperationId: 1001, roleId: 10 },
            { id: 1006, menuOperationId: 1002, roleId: 10 },
            { id: 1007, menuOperationId: 1003, roleId: 10 },
            { id: 1008, menuOperationId: 1000, roleId: 20 },
            { id: 1009, menuOperationId: 1001, roleId: 20 },
            { id: 1010, menuOperationId: 1002, roleId: 20 },
            { id: 1011, menuOperationId: 1003, roleId: 20 },
        ]
    }, {
        user: {
            name: 'user',
            fields: '*',
            roleList: {
                name: 'userRole',
                fields: '*',
                where: {
                    userId: '$parent.id'
                }
            }
        },
        menu: {
            name: 'menu',
            fields: '*',
            operations: {
                name: 'menuOperation',
                fields: '*',
                where: {
                    menuId: '$parent.id',
                    roleId: '$where.roleIds'
                }
            }
        },
    }
)

models.initModels()

let myServiceDefine = ({ user, menu }) => {
    let myServices = {
        user: {
            logout: (data, ctx) => true
        },
        portal: {
            init: async (data, ctx) => {
                let users = await user.view({ id: ctx.token.userId })
                if (!users[0]) {
                    throw { code: '100', message: '用户不存在' }
                }
                let roleIds = user.roleList && user.roleList.map(r => r.roleId)
                let menus = await menu.view({ where: {}, orderBy: { code: 'asc' }, args: { roleIds } })
                return { user: users[0], menu: menus }
            }
        }
    }
    return myServices
}

let service = models && models.toService(myServiceDefine)
webProvider && webProvider({
    '/v1/portal/init': service.portal.init,
    '/v1/user/logout': (data, ctx) => {
        let r = service.user.logout(data, ctx)
        r.token = ''
        return r
    },
})