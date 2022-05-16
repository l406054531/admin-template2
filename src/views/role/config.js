import getDefaultOperate from '@/components/Table/default-operate.js';
import buttonComponent from '@/components/Table/components/button-component.vue';
const createConfig = (vm) => {
  const config = class {
    constructor(vm) {
      this.vm = vm
    }
    getHeader () {
      const vm = this.vm
      const header = [
        { label: '', prop: '', type: 'selection' },
        { label: '-', prop: 'index', type: 'index' },
        { label: '角色字段', prop: 'roleField' },
        { label: '角色名称', prop: 'roleName' },
        {
          prop: 'operate',
          label: '操作',
          render (row) {
            return vm.$createElement(buttonComponent, {
              props: {
                list: [
                  {
                    label: '权限分配',
                    type: 'text',
                    click: () => vm.handlePermissionAssignmen(row)
                  },
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
      ]
      return header
    }
    getDefaultSort () {
      return {
        prop: 'date'
      }
    }
    getFormElement () {
      return [
        { label: '角色字段', prop: 'roleField', type: 'input' },
        { label: '角色名称', prop: 'roleName', type: 'input' },
        { label: '', prop: 'idRole', type: 'id' },
      ]
    }
    getSearchElement () {
      return [
        {
          label: "角色名称",
          prop: "roleName",
          type: "input",
        }
      ]
    }
  }
  return new config(vm)
}
export const useConfig = createConfig
export default useConfig

