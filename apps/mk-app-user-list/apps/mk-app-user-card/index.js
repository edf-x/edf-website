import config from './config'
import * as data from './data'

export default {
	name: "mk-app-user-card",
	version: "1.0.7",
	description: "mk-app-user-card",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-user-card")
	}
}