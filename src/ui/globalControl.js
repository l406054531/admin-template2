/**全局控件 */
/**
 *  @Author: lx
 * @Description: 公共组件
 */
import Vue from 'vue'
import basicsForm from '@/components/Form';
// import searchForm from '@/components/Search-Form';
import ButtonGroud from '@/components/Operation/button-group'
// import excelButton from '@/components/Operation/Excel-button'
import myPagination from '@/components/Operation/pagination'
import buttonComponent from '@/components/Table/components/button-component.vue';
import { borderBox8 } from '@jiaminghi/data-view'

import basicsTable from '@/components/Table';
import basicsPagination from '@/components/Pagination';
import dialogForm from '@/components/Dialog-Form';
Vue.use(borderBox8)

Vue.component('myPagination', myPagination)
// Vue.component('excelButton', excelButton)
Vue.component('ButtonGroud', ButtonGroud)
Vue.component('basics-form', basicsForm)
// Vue.component('search-form', searchForm)
Vue.component('basicsTable', basicsTable)
Vue.component('basicsPagination', basicsPagination)
Vue.component('dialogForm', dialogForm)
Vue.component('buttonComponent', buttonComponent)