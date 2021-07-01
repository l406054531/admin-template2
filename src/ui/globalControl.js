/**全局控件 */
/**
 *  @Author: lx
 * @Description: 公共组件
 */
import Vue from 'vue'
import myForm from '@/components/Form';
import ButtonGroud from '@/components/Operation/button-group'
// import excelButton from '@/components/Operation/Excel-button'
import myPagination from '@/components/Operation/pagination'

Vue.component('myPagination', myPagination)
    // Vue.component('excelButton', excelButton)
Vue.component('ButtonGroud', ButtonGroud)
Vue.component('my-form', myForm)