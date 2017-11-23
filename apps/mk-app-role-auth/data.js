export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-role-auth',
		children: [{
			name: 'left',
			component: 'Card',
			className: 'mk-app-role-auth-left',
			title: '角色预置',
			extra: {
				name: 'header',
				component: '::div',
				children: [{
					name: 'add',
					component: 'Button',
					type: "showy",
					shape: "circle",
					icon: 'plus',
					onClick: '{{$addRole}}'
				}, {
					name: 'modify',
					component: 'Button',
					type: "showy",
					shape: "circle",
					icon: 'edit',
					onClick: '{{$modifyRole}}'
				}, {
					name: 'delete',
					component: 'Button',
					type: "showy",
					shape: "circle",
					icon: 'close',
					onClick: '{{$delRole}}'
				}]

			},

			children: [{
				name: 'menu',
				component: 'Menu',
				selectedKeys: `{{[data.other && data.other.filter.roleId+'']}}`,
				onSelect: '{{$selectRole}}',
				children: '{{$loopMenuChildren(data.roles)}}'
			}]
		}, {
			name: 'content',
			component: 'Card',
			className: 'mk-app-role-auth-content',
			title: '权限',
			children: [{
				name: 'dataGrid',
				component: 'DataGrid',
				headerHeight: 35,
				rowHeight: 35,
				enableSequence: true,
				startSequence: 1,
				rowsCount: "{{$getListRowsCount()}}",
				columns: "{{$getOperationColumns()}}",
			}]
		}]
	}
}


export function getInitState() {
	return {
		data: {
			roles: [],
			menus: [],
			operations: [],
			other: { filter: {} }
		}
	}
}
