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
        { label: '标题', prop: 'title' },
        { label: '类型 ', prop: 'type' },
        { label: 'URL', prop: 'url' },
        { label: '状态', prop: 'status' },
        { label: '创建时间', prop: 'createTime' },
        { label: '创建人', prop: 'createUser' },

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
        { label: '标题', prop: 'title', type: 'input' },
        {
          label: '类型', prop: 'type', type: 'select', typeselects: [{
            label: 'markdown',
            value: 0
          },
          {
            label: '文件',
            value: 1
          }]
        },
        {
          label: '状态', prop: 'status', type: 'select', typeselects: [{
            label: '删除',
            value: 0
          }, {
            label: '正常',
            value: 1
          }, {
            label: '草稿',
            value: 2
          }, {
            label: '下架',
            value: 3
          }]
        },
        { label: '是否置顶', prop: 'isTop', type: 'select', typeselects: [{ label: '是', value: true }, { label: '否', value: false }] },
        { label: '是否加精', prop: 'isEssence', type: 'select', typeselects: [{ label: '是', value: true }, { label: '否', value: false }] },
        { label: '简介', prop: 'intro', type: 'textarea' },
        { label: '', prop: 'idArticle', type: 'id' },
      ]
    }
    getSearchElement () {
      return [
        { label: '标题', prop: 'title', type: 'input' },
        { label: '类型', prop: 'type', type: 'input' },
        { label: '状态', prop: 'status', type: 'input' }
      ]
    }
  }
  return new config(vm)
}
export const useConfig = createConfig
export default useConfig

