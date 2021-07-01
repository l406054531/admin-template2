import { constantRoutes } from '@/router'
import { homeRoutes } from '@/router/homeRoutes'
// import { manageRoutes } from '@/router/manageRoutes'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(route, asyncRoutes) {
    const hasRoute = asyncRoutes.some(i => {
        if (i.code === route.code) {
            route.orderNo = i.orderNo // 给原路由表加orderNo字段，用于排序
            if (route.meta && route.meta.title) { // 给原路由表加title字段，用于显示菜单名
                route.meta.title = i.name
            }
            return true
        }
    })
    return hasRoute
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes allRoutes
 * @param asyncRoutes
 */
export function filterAsyncRoutes(routes, asyncRoutes) {
    const res = []
    routes.forEach(route => {
        const tmp = {...route }
        if (hasPermission(tmp, asyncRoutes)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, asyncRoutes)
            }
            res.push(tmp)
        }
    })
    return res
}



function hasP(allRoutes, asyncRoute) {
    return allRoutes.some(route => {
        // 根路由与授权路由的code匹配
        if (route.code === asyncRoute.code) {
            return true
        }
        // 如果有children路由并且children只有一个
        else if (route.children && route.children.length === 1) {
            // 子路由与授权路由的code匹配
            return route.children[0].code === asyncRoute.code
        }
        return false
    })

}


const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({ commit }, asyncRoutes) {
        return new Promise(resolve => {
            // debugger
            let pageRoutes = [].concat(homeRoutes)
                // 测试环境先隐藏
                // let accessedRoutes = sortTree(filterAsyncRoutes(pageRoutes, asyncRoutes), 'orderNo') // 路由排序
            let accessedRoutes = pageRoutes
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}