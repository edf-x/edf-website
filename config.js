import { Toast, Notification, Modal } from 'mk-component'
import { fetch } from 'mk-utils'
// import { websql } from './../../../mk-js/core/mk-orm/src' 
import { websql } from 'mk-orm'
// import './mock.js' //脱离后台测试，启用mock，否则这行注释

var _options = {}

//配置fetch
fetch.config({
	mock: false, //脱离后台测试，启用mock，否则这行注释 

	//fetch支持切面扩展（before,after），对restful api统一做返回值或者异常处理
	after: (response, url, data, header) => {
		// console.log(JSON.stringify({
		// 	url, data, vale: response.value
		// }))
		if (response.result) {
			if (response.token) { //登录后设置accessToken,根据需要调整
				fetch.config({ token: response.token })
			}
			return response.value
		}
		else {
			Toast.error(response.error.message)
			throw { url, response }
		}
	}
})

function config(options) {
	Object.assign(_options, options)

	//对应用进行配置，key会被转换为'^<key>$'跟app名称正则匹配
	_options.apps && _options.apps.config({
		'*': {
			//webapi,//正式网站应该有一个完整webapi对象，提供所有web请求函数
			webProvider: fetch.mock,
			dbProvider: websql,
			dbConfig: {
				name: 'test'
			},
		},
		'mk-app-root': {
			startAppName: 'mk-app-login',
		}
	})

	require('./mock.js')
	_options.targetDomId = 'app' //react render到目标dom
	_options.startAppName = 'mk-app-root' //启动app名，需要根据实际情况配置

	_options.toast = Toast //轻提示使用组件，mk-meta-engine使用
	_options.notification = Notification //通知组件
	_options.modal = Modal //模式弹窗组件
	return _options
}

config.current = _options

export default config