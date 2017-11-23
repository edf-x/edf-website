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
            login: async ({ mobile, password }) => {
                debugger
                let users = await user.query({ mobile })
                debugger
                let curUser = users[0]
                if (!curUser) {
                    throw { code: '100', message: '用户不存在' }
                } else if (curUser.password != password) {
                    throw { code: '100', message: '密码不正确' }
                } else {
                    return curUser
                }
            }
        }
    }
    return myServices
}

let service = models && models.toService(myServiceDefine)

webProvider && webProvider({
    '/v1/user/login': async (u) => {
        let r = await service.user.login(u)
        if (r && r.result) {
            r.token = `${r.value.id},${r.value.mobile}`
        }
        return r
    }
})