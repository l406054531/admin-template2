import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/icons/index' // icon

import './ui/element-ui'
import '@/styles/index.scss' // global css
import './router/routerEach'
import './ui/globalControl' //全局控件

import "./icons/iconfont/iconfont.css"

// import "./directive"

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

import ECharts from 'vue-echarts'
Vue.component('v-chart', ECharts)

import countTo from 'vue-count-to';
Vue.component('count-to', countTo)

import moment from 'moment';
Vue.prototype.$moment = moment

import 'leaflet'
import 'leaflet/dist/leaflet.css'

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')