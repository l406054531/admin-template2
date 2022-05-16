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
        { label: '用户账号', prop: 'username' },
        {
          label: '用户名称',
          prop: 'nickname',
          render (row) {
            return vm.$createElement('el-tag', {
              props: {
                type: 'success'
              },
              on: {
                click: () => vm.click(row)// 示例
              }
            },
              row.nickname)
          },
        },
        { label: '角色', prop: 'userRole' },
        { label: '手机号码', prop: 'phone' },
        { label: '邮箱', prop: 'email' },
        vm.headerOperate ? vm.headerOperate : getDefaultOperate(vm) // .vue页面的data里定义有headerOperate就用.vue页面的headerOperate,没有就用默认的operate
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
        { label: '用户账号', prop: 'username', type: 'input' },
        { label: '用户密码', prop: 'password', type: 'input', showPassword: true, disabled: false },
        { label: '用户名称', prop: 'nickname', type: 'input' },
        { label: '角色', prop: 'userRole', type: 'select', selectLabel: 'elementName', selectValue: 'elementValue', typeselects: [] },
        { label: '手机号码', prop: 'phone', type: 'input' },
        { label: '邮箱', prop: 'email', type: 'input' },
        { label: '', prop: 'idUser', type: 'id' },
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

