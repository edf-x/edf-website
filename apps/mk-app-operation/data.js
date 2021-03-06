export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-operation',
		onMouseDown: '{{$mousedown}}',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-operation-header',
			children: [{
				name: 'save',
				component: 'Button',
				type: 'softly',
				onClick: '{{$save}}',
				children: '保存'
			}]
		}, {
			name: 'table',
			component: 'DataGrid',
			headerHeight: 50,
			rowsCount: '{{data.list.length}}',
			rowHeight: 50,
			readonly: false,
			enableSequence: true,
			enableAddDelrow: true,
			startSequence: 1,
			onAddrow: '{{$addrow}}',
			onDelrow: '{{$delrow}}',
			columns: [{
				name: 'id',
				component: 'DataGrid.Column',
				columnKey: 'id',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: 'ID'
				},
				cell: {
					name: 'cell',
					component: "DataGrid.TextCell",
					className: "{{$getCellClassName(_ctrlPath)}}",
					value: "{{data.list[_rowIndex].id}}",
					//onChange: "{{(e)=>$sf('data.list.' + _rowIndex + '.id', e.target.value)}}",
					_power: '({rowIndex})=>rowIndex',
				}
			},{
				name: 'name',
				component: 'DataGrid.Column',
				columnKey: 'name',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '名称'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Input' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath)}}",
					value: "{{data.list[_rowIndex].name}}",
					onChange: "{{(e)=>$sf('data.list.' + _rowIndex + '.name', e.target.value)}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'parentId',
				component: 'DataGrid.Column',
				columnKey: 'parentId',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '上级'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Select' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath)}}",
					value: "{{data.list[_rowIndex].parentId}}",
					onChange: "{{(v)=>$sf('data.list.' + _rowIndex + '.parentId', v)}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'isEndNode',
				component: 'DataGrid.Column',
				columnKey: 'isEndNode',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '末级'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Select' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath)}}",
					showSearch: false,
					value: `{{{
						if(!data.list[_rowIndex].isEndNode) return undefined
						return $isFocus(_ctrlPath)
							? data.list[_rowIndex].isEndNode
							: (data.list[_rowIndex].isEndNode == 1 ? '是' : '否')
					}}}`,
					onChange: `{{(v)=>$sf('data.list.'+ _rowIndex + '.isEndNode', v)}}`,
					_excludeProps: "{{$isFocus(_ctrlPath)? ['onClick'] : ['children'] }}",
					_power: '({rowIndex})=>rowIndex',
					children: [{
						name: 'yes',
						component: 'Select.Option',
						value: '1',
						children: '是'
					}, {
						name: 'no',
						component: 'Select.Option',
						value: '0',
						children: '否'
					}],
				}
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			list: [],
			other: {}
		}
	}
}