import router from './index'
import store from '@/store'
import { formatTree } from "@/utils"
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration

import { homeRoutes } from "@/router/homeRoutes"
const whiteList = ['/login', '/register']
import { getMenu, getToken } from '@/utils/cache';

router.beforeEach(async(to, from, next) => {
    document.title = to.meta.title
    NProgress.start()
    let token = getToken()
    let menu = getMenu()
    let isLogin = store.getters.isLogin

    if (token && menu) {

        if (!isLogin) {
            let hasMenus = homeRoutes.concat(generateRouter(JSON.parse(menu)))
            console.log(hasMenus);
            await store.dispatch("user/findIsLogin", hasMenus)
            router.addRoutes(hasMenus);
            if (to.path == "/") {
                next({ path: hasMenus[0].redirect })
            } else {
                next(to.path)
            }
        } else {
            if (to.path == "/" || to.path == "/login") {
                next({ path: from.path })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }

})

function generateRouter(userRouters) {
    let newRouters = userRouters.map((r) => {
        let routes = {
            name: r.name,
            meta: { title: r.title, icon: r.icon }
        }
        if (r.idParent == 0) {
            routes.component = () =>
                import ("@/layout")
            routes.path = r.path
        } else {
            routes.component = () =>
                // import (`@/views${r.path}/index.vue`)
                Promise.resolve(require(`@/views${r.path}/index.vue`).default)
            routes.path = r.name
        }
        if (r.children) {
            routes.children = generateRouter(r.children);
        }
        return routes;
    });
    return newRouters;
}

router.afterEach(() => {
    NProgress.done()
})