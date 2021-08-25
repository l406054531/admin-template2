/**全局控件 */
/**
 *  @Author: lx
 * @Description: 公共组件
 */
import Vue from 'vue'
import myForm from '@/components/Form';
import searchForm from '@/components/searchForm';
import ButtonGroud from '@/components/Operation/button-group'
// import excelButton from '@/components/Operation/Excel-button'
import myPagination from '@/components/Operation/pagination'

import { borderBox8 } from '@jiaminghi/data-view'

Vue.use(borderBox8)

Vue.component('myPagination', myPagination)
// Vue.component('excelButton', excelButton)
Vue.component('ButtonGroud', ButtonGroud)
Vue.component('my-form', myForm)
Vue.component('search-form', searchForm)