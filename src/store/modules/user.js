import { login } from '@/api/user';
import { formatTree } from "@/utils"
import { getToken, setToken, setMenu, getUserInfo, setUserInfo } from '@/utils/cache';
const state = {
    token: getToken(),
    userInfo: getUserInfo(),
    isLogin: false,
    routes: null,
}
const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },
    USER_INFO(state, data) {
        state.userInfo = data
    },
    SET_isLogin(state, isLogin) {
        state.isLogin = isLogin
    },
    SET_ROUTES(state, routes) {
        state.routes = routes
    }
}
const actions = {
    login({ commit }, usetInfo) {
        return new Promise((resolve, reject) => {
            login(usetInfo).then(response => {
                let { token, menu, data } = response
                menu = JSON.stringify(formatTree(menu, "idParent", "idPage"));
                data = JSON.stringify(data);
                commit("SET_TOKEN", token)
                commit("USER_INFO", data)
                setToken(token)
                setUserInfo(data)
                setMenu(menu)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    async findIsLogin({ commit }, routes) {
        commit("SET_isLogin", true)
        commit("SET_ROUTES", routes)
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}