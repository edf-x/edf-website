import { config, start, componentFactory } from 'mk-meta-engine'
import * as mkComponents from 'mk-component'
import myConfig  from './config'

import mk_app_column_detail from './apps/mk-app-column/apps/mk-app-column-detail/index.js'
import mk_app_column_setting from './apps/mk-app-column/apps/mk-app-column-setting/index.js'
import mk_app_column_type from './apps/mk-app-column/apps/mk-app-column-type/index.js'
import mk_app_column from './apps/mk-app-column/index.js'
import mk_app_devtools_test from './apps/mk-app-devtools/apps/mk-app-devtools-test/index.js'
import mk_app_devtools from './apps/mk-app-devtools/index.js'
import mk_app_enum_detail from './apps/mk-app-enum/apps/mk-app-tree-table-detail/index.js'
import mk_app_enum_type from './apps/mk-app-enum/apps/mk-app-tree-table-type/index.js'
import mk_app_enum from './apps/mk-app-enum/index.js'
import mk_app_forgot_password from './apps/mk-app-forgot-password/index.js'
import mk_app_login from './apps/mk-app-login/index.js'
import mk_app_modify_password_test from './apps/mk-app-modify-password/apps/mk-app-modify-password-test/index.js'
import mk_app_modify_password from './apps/mk-app-modify-password/index.js'
import mk_app_my_setting from './apps/mk-app-my-setting/index.js'
import mk_app_operation from './apps/mk-app-operation/index.js'
import mk_app_org_list from './apps/mk-app-org-list/index.js'
import mk_app_portal_about from './apps/mk-app-portal/apps/mk-app-portal-about/index.js'
import mk_app_portal_app1 from './apps/mk-app-portal/apps/mk-app-portal-app1/index.js'
import mk_app_portal_app2 from './apps/mk-app-portal/apps/mk-app-portal-app2/index.js'
import mk_app_portal from './apps/mk-app-portal/index.js'
import mk_app_portal_menu_detail from './apps/mk-app-portal-menu/apps/mk-app-portal-menu-detail/index.js'
import mk_app_portal_menu from './apps/mk-app-portal-menu/index.js'
import mk_app_proof_of_charge from './apps/mk-app-proof-of-charge/index.js'
import mk_app_agreement from './apps/mk-app-register/apps/mk-app-agreement/index.js'
import mk_app_register from './apps/mk-app-register/index.js'
import mk_app_role from './apps/mk-app-role-auth/apps/mk-app-role/index.js'
import mk_app_role_auth from './apps/mk-app-role-auth/index.js'
import mk_app_root_about from './apps/mk-app-root/apps/mk-app-root-about/index.js'
import mk_app_root_helloWorld from './apps/mk-app-root/apps/mk-app-root-helloWorld/index.js'
import mk_app_root from './apps/mk-app-root/index.js'
import mk_app_user_card from './apps/mk-app-user-list/apps/mk-app-user-card/index.js'
import mk_app_user_list from './apps/mk-app-user-list/index.js'
import mk_app_websql from './apps/mk-app-websql/index.js'

const apps = {
		
	[mk_app_column_detail.name]: mk_app_column_detail,	
	[mk_app_column_setting.name]: mk_app_column_setting,	
	[mk_app_column_type.name]: mk_app_column_type,	
	[mk_app_column.name]: mk_app_column,	
	[mk_app_devtools_test.name]: mk_app_devtools_test,	
	[mk_app_devtools.name]: mk_app_devtools,	
	[mk_app_enum_detail.name]: mk_app_enum_detail,	
	[mk_app_enum_type.name]: mk_app_enum_type,	
	[mk_app_enum.name]: mk_app_enum,	
	[mk_app_forgot_password.name]: mk_app_forgot_password,	
	[mk_app_login.name]: mk_app_login,	
	[mk_app_modify_password_test.name]: mk_app_modify_password_test,	
	[mk_app_modify_password.name]: mk_app_modify_password,	
	[mk_app_my_setting.name]: mk_app_my_setting,	
	[mk_app_operation.name]: mk_app_operation,	
	[mk_app_org_list.name]: mk_app_org_list,	
	[mk_app_portal_about.name]: mk_app_portal_about,	
	[mk_app_portal_app1.name]: mk_app_portal_app1,	
	[mk_app_portal_app2.name]: mk_app_portal_app2,	
	[mk_app_portal.name]: mk_app_portal,	
	[mk_app_portal_menu_detail.name]: mk_app_portal_menu_detail,	
	[mk_app_portal_menu.name]: mk_app_portal_menu,	
	[mk_app_proof_of_charge.name]: mk_app_proof_of_charge,	
	[mk_app_agreement.name]: mk_app_agreement,	
	[mk_app_register.name]: mk_app_register,	
	[mk_app_role.name]: mk_app_role,	
	[mk_app_role_auth.name]: mk_app_role_auth,	
	[mk_app_root_about.name]: mk_app_root_about,	
	[mk_app_root_helloWorld.name]: mk_app_root_helloWorld,	
	[mk_app_root.name]: mk_app_root,	
	[mk_app_user_card.name]: mk_app_user_card,	
	[mk_app_user_list.name]: mk_app_user_list,	
	[mk_app_websql.name]: mk_app_websql,
}

apps.config = (options) => {
	Object.keys(options).forEach(key => {
		const reg = new RegExp(`^${key == '*' ? '.*' : key}$`)
		Object.keys(apps).forEach(appName => {
			if (appName != 'config') {
				if (reg.test(appName)) {
					apps[appName].config(options[key])
				}
			}
		})
	})
}

apps.config({ '*': { apps } })

config(myConfig({ apps }))

Object.keys(mkComponents).forEach(key=>{
	componentFactory.registerComponent(key, mkComponents[key])
})
	
start()