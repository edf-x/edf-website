export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-websql',
		children: [{
			name: 'dblabel',
			component: '::span',
			children: 'db name:'
		}, {
			name: 'dbname',
			component: '::input',
			onChange: "{{(e)=>$fieldChange('data.dbName', e.target.value)}}",
			value: '{{data.dbName}}',
		}, {
			name: 'sqllabel',
			component: '::span',
			children: 'sql:'
		}, {
			name: 'sql',
			component: 'Input',
			type: 'textarea',
			autosize: { minRows: 5, maxRows: 30 },
			onChange: "{{(e)=>$fieldChange('data.sql', e.target.value)}}",
			value: '{{data.sql}}'
		}, {
			name: 'excute',
			component: '::button',
			children: '执行',
			onClick: '{{$btnClick}}' //btnClick在action中声明
		}]
	}
}

export function getInitState() {
	return {
		data: {
			content: 'hello world'
		}
	}
}