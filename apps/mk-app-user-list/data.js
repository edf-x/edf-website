export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-user-list',
		children: [{
			name: 'header',
			component: '::div',
			className: 'mk-app-user-list-header',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-user-list-header-left',
				children: ['姓名:', {
					name: 'nickname',
					component: 'Input',
					placeholder: '请输入姓名查询',
					value: '{{data.filter.nickname}}',
					onChange: '{{$nameChange}}'
				}, '性别:', {
						name: 'sex',
						component: 'Select',
						allowClear: true,
						value: '{{data.filter.sex}}',
						onChange: '{{$sexChange}}',
						children: [{
							name: 'option1',
							component: 'Select.Option',
							value: '0',
							children: '男'
						}, {
							name: 'option2',
							component: 'Select.Option',
							value: '1',
							children: '女'
						}]
					}, '生日:', {
						name: 'birthdayRange',
						component: 'DatePicker.RangePicker',
						format: 'YYYY-MM-DD',
						value: '{{$getBirthdayRange()}}',
						onChange: '{{$birthdayRangeChange}}'
					}, {
						name: 'clear',
						component: 'Button',
						type: 'softly',
						children: '清空条件',
						onClick: '{{$clearFilter}}'
					}]
			},{
				name: 'right',
				component: '::div',
				className: 'mk-app-user-list-right',
				children: [{
						name: 'auth',
						component: 'Button',
						type: 'softly',
						children: '角色授权',
						onClick: '{{$roleUpdate}}'
					},{
						name: 'del',
						component: 'Button',
						type: 'softly',
						children: '删除',
						onClick: '{{$batchDelDetail}}'
					},{
						name: 'setting',
						component: 'Button',
						type: 'softly',
						children: '栏目设置',
						onClick: '{{$columnSetting}}'
					}]
			}]
		}, {
			name: 'content',
			className: 'mk-app-user-list-content',
			component: 'Layout',
			children: [{
				name: 'dataGrid',
				component: 'DataGrid',
				headerHeight: 35,
				rowHeight: 35,
				enableSequence: true,
				startSequence: '{{(data.pagination.current-1)*data.pagination.pageSize + 1}}',
				rowsCount: "{{$getListRowsCount()}}",
				columns: "{{$getListColumns()}}"
			}]
		}, {
			name: 'footer',
			className: 'mk-app-user-list-footer',
			component: 'Layout',
			children: [{
				name: 'pagination',
				component: 'Pagination',
				showSizeChanger: true,
				pageSize: '{{data.pagination.pageSize}}',
				current: '{{data.pagination.currentPage}}',
				total: '{{data.pagination.totalData}}',
				onChange: '{{$pageChanged}}',
				onShowSizeChange: '{{$pageChanged}}'
			}]
		}]
	}
}


export function getInitState() {
	return {
		data: {
			columns: [],
			list: [],
			pagination: { currentPage: 1, totalPage: 0, totalData: 0, pageSize: 20 },
			filter: {},
			other: {}
		}
	}
}
