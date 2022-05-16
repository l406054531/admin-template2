import { login } from '@/api/user';

import { formatTree } from "@/utils"

import { StorageKey } from '@/config';

import { Storage } from '@/utils/Storage';


const tokenKey = StorageKey.tokenKey
const menuKey = StorageKey.menuKey
const userinfoKey = StorageKey.userinfoKey

const state = {
  token: Storage.get(tokenKey),
  userInfo: Storage.get(userinfoKey),
  isLogin: false,
  routes: null,
  name: "",
}
const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },
  USER_INFO (state, data) {
    state.userInfo = data
  },
  SET_NAME (state, name) {
    state.name = name
  },
  SET_isLogin (state, isLogin) {
    state.isLogin = isLogin
  },
  SET_ROUTES (state, routes) {
    state.routes = routes
  }
}
const actions = {
  login ({ commit }, usetInfo) {
    return new Promise((resolve, reject) => {
      login(usetInfo).then(response => {
        let { access_token, menus, data } = response
        menus = formatTree(menus, "idParent", "idView")
        Storage.set(tokenKey, access_token)
        Storage.set(menuKey, menus)
        Storage.set(userinfoKey, data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  async setIsLogin ({ commit }, val) {
    commit("SET_isLogin", val)
  },
  async setRoutes ({ commit }, routes) {
    commit("SET_ROUTES", routes)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}