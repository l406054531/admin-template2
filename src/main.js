/*
 * @Author: lct
 * @Date: 2021-02-01 19:01:32
 * @LastEditTime: 2021-04-07 13:11:54
 * @LastEditors: Please set LastEditors
 * @Description: 项目主入口文件
 * @FilePath: \vue-cli4.x-project-template\src\main.js
 */
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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')