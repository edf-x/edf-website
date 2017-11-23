export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-user-card',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-user-card-header',
			_visible: '{{!data.other.isPop}}',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-user-card-header-left',
				children: [{
					name: 'page',
					component: 'Button.Group',
					children: [{
						name: 'prev',
						component: 'Button',
						type: 'softly',
						size: 'small',
						icon: 'left',
						onClick: '{{$prev}}'
					}, {
						name: 'next',
						component: 'Button',
						type: 'softly',
						size: 'small',
						icon: 'right',
						onClick: '{{$next}}'
					}]
				}]
			}, {
				name: 'right',
				component: 'Layout',
				className: 'mk-app-user-card-header-right',
				children: [{
					name: 'add',
					component: 'Button',
					children: '新增',
					type: 'primary',
					style: { marginRight: 10 },
					onClick: '{{$add}}'
				},{
					name: 'save',
					component: 'Button',
					children: '保存',
					type: 'primary',
					style: { marginRight: 10 },
					onClick: '{{$save}}'
				}]
			}]
		}, {
			name: 'form',
			component: 'Form',
			className: 'mk-app-user-card-form',
			children: [{
				name: 'nicknameItem',
				component: 'Form.Item',
				label: '姓名',
				required: true,
				validateStatus: "{{data.other.error.nickname?'error':'success'}}",
				help: '{{data.other.error.nickname}}',
				children: [{
					name: 'nickname',
					component: 'Input',
					value: '{{data.form.nickname}}',
					onChange: `{{(e)=>$fieldChange('data.form.nickname',e.target.value)}}`,
				}]
			}, {
				name: 'sexItem',
				component: 'Form.Item',
				label: '性别',
				required: true,
				children: [{
					name: 'sex',
					component: 'Select',
					showSearch: false,
					value: "{{data.form.sex == 0 ? '男' : data.form.sex == 1 ? '女' : ''}}",
					onChange: "{{(v)=>$setField('data.form.sex', v)}}",
					children: [{
						name: 'man',
						component: 'Select.Option',
						value: '0',
						children: '男'
					}, {
						name: 'woman',
						component: 'Select.Option',
						value: '1',
						children: '女'
					}]
				}]
			}, {
				name: 'mobileItem',
				component: 'Form.Item',
				label: '手机',
				required: true,
				validateStatus: "{{data.other.error.mobile?'error':'success'}}",
				help: '{{data.other.error.mobile}}',
				children: [{
					name: 'mobile',
					component: 'Input.Number',
					value: '{{data.form.mobile}}',
					onChange: `{{(v)=>$fieldChange('data.form.mobile',v)}}`,
				}]
			}, {
				name: 'birthdayItem',
				component: 'Form.Item',
				label: '生日',
				required: true,
				children: [{
					name: 'birthday',
					component: 'DatePicker',
					value: '{{$stringToMoment(data.form.birthday)}}',
					onChange: "{{(v)=>$sf('data.form.birthday', $momentToString(v,'YYYY-MM-DD'))}}",
				}]
			}, {
				name: 'departmentItem',
				component: 'Form.Item',
				label: '部门',
				children: [{
					name: 'department',
					component: 'Input',
					value: '{{data.form.department}}',
					onChange: "{{(e)=>$setField('data.form.department',e.target.value)}}"
				}]
			}, /*{
				name: 'departmentItem',
				component: 'Form.Item',
				label: '部门',
				children: [{
					name: 'department',
					component: 'Select',
					dropdownFooter: {
						name: 'add',
						component: 'Button',
						type: 'primary',
						style: { width: '100%' },
						children: '新增',
						onClick: '{{$addDepartment}}'
					},
					value: '{{data.form.department}}',
					onFocus: '{{$departmentFocus}}',
					onChange: "{{(v)=>$setField('data.form.department', v)}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: '{{data.other.departments[_rowIndex].code}}',
						children: '{{data.other.departments[_rowIndex].name}}',
						_power: 'for in data.other.departments'
					}
				}]
			}, */{
				name: 'addressItem',
				component: 'Form.Item',
				label: '地址',
				children: [{
					name: 'address',
					component: 'Input',
					value: '{{data.form.address}}',
					onChange: "{{(e)=>$setField('data.form.address',e.target.value)}}"
				}]
			}, {
				name: 'roles',
				component: 'Form.Item',
				label: '角色',
				children: [{
					name: 'cb',
					component: 'Checkbox.Group', 
					options:'{{data.other.roles}}',
					value:'{{data.other.selectedRoles}}',
					onChange: '{{$selectRoles}}'
				}]
			}]
		}]
	}
}


export function getInitState(option) {
	var state = {
		data: {
			form: {
				name: '',
				sex: '0',
				birthday: '1981-1-1',
				mobile: '',
				department: '',
				address: ''
			},
			other: {
				departments: [],
				error: {}
			}
		}
	}

	state.data.other.isPop = !!option.isPop //是否弹出卡片使用

	return state
}