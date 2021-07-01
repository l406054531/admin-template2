/*
 * @Author: your name
 * @Date: 2021-02-01 19:01:32
 * @LastEditTime: 2021-02-02 11:58:55
 * @LastEditors: Please set LastEditors
 * @Description: 自定东区
 * @FilePath: \vue-cli4.x-project-template\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store
