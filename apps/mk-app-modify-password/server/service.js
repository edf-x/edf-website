import config from './../config'
const { dbProvider, dbConfig, webProvider } = config.current
const models = dbProvider && new dbProvider(
    dbConfig,
    {
        user: [
            { id: 10, name: '张三', mobile: '13334445556', password: '1' },
        ]
    }
)

let myServiceDefine = ({ user }) => {
    let myServices = {
        user: {
            modifyPassword: async (userObj) => {
                let users = await user.query({ mobile: userObj.mobile })
                if (users.length == 0) {
                    throw { code: '100', message: '用户不存在' }
                }
                if (users[0].password != userObj.oldPassword) {
                    throw { code: '100', message: '旧密码不正确' }
                }
                let userData = { id: users[0].id, password: userObj.password }
                let result = await user.update(userData)
                return result
            }
        },
    }
    return myServices
}

let service = models && models.toService(myServiceDefine)

webProvider && webProvider({
    '/v1/user/modifyPassword': service.user.existsMobile,
})
