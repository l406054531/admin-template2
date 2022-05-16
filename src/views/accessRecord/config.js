import getDefaultOperate from '@/components/Table/default-operate.js';
import { cityCascader } from '@public/static/json/cityCascader.json';
const createTableConfig = (self) => {
  const config = class {
    constructor(self) {
      this.self = self
    }
    getHeader () {
      const vm = this.self
      const header = [
        { label: '-', prop: 'index', type: 'index' },
        { label: '国家', prop: 'nation' },
        { label: '省', prop: 'province' },
        { label: '市', prop: 'city' },
        { label: '区域', prop: 'district' },
        { label: '城市编码', prop: 'adcode' },
        { label: '经度', prop: 'longitude' },
        { label: '纬度', prop: 'latitude' },
        { label: 'ip', prop: 'ip' },
        { label: '访问时间', prop: 'createTime', width: "100" },
        {
          prop: 'operate',
          label: '操作',
          render (row) {
            return vm.$createElement('el-button', {
              props: {
                type: 'danger',
                size: 'mini'
              },
              on: {
                click: () => vm.handleDelete(row)
              }
            }, '删除')
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
    getSearchElement () {
      return [
        {
          label: "地区",
          prop: "region",
          type: "cascader",
          options: cityCascader,
          check: true,
          filterable: true
        }
      ]
    }
  }
  return new config(self)
}
export const tableConfig = createTableConfig
export default tableConfig

