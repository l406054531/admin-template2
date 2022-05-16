import buttonComponent from './components/button-component.vue';
function getDefaultOperate (vm) {
  return {
    prop: 'operate',
    label: '操作',
    render (row) {
      return vm.$createElement(buttonComponent, {
        props: {
          list: [
            {
              label: '编辑',
              type: 'text',
              click: () => vm.handleUpdate(row)
            },
            {
              label: '删除',
              type: 'text',
              click: () => vm.handleDelete(row)
            },
          ]
        }
      })
    },
  }
}
export default getDefaultOperate