import { getDefaultOperateList } from '@/components/Table/default-operate.js';
import getDefaultOperate from '@/components/Table/default-operate.js';
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
        { label: '库名', prop: 'libraryName' },
        {
          label: '是否公开', prop: 'isPublic',
          render (row) {
            const str = row.isPublic == '1' ? '是' : '否'
            return vm.$createElement('el-tag', {
              props: {
                type: 'success'
              }
            },
              str)
          }
        },
        { label: '封面', prop: 'cover' },
        {
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
        { label: '库名', prop: 'libraryName', type: 'input' },
        { label: '是否公开', prop: 'isPublic', type: 'select', typeselects: [{ label: '是', value: '1' }, { label: '否', value: '0' }] },
        { label: '描述', prop: 'info', type: 'input' },
        { label: '', prop: this.vm.idKey, type: 'id' },
      ]
    }
    getSearchElement () {
      return [
        { label: '用户账号', prop: 'username', type: 'input' },
        { label: '用户名称', prop: 'nickname', type: 'input' }
      ]
    }
  }
  return new config(vm)
}
export const useConfig = createConfig
export default useConfig

