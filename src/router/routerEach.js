import router from './index'
import store from '@/store'
import { generateRouter } from "@/utils"
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { homeRoutes } from "@/router/homeRoutes"
import { Storage } from '@/utils/Storage';// 浏览器缓存实例
import { StorageKey } from '@/config';// 浏览器缓存键名

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/register']

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
  NProgress.start()
  let token = Storage.get(StorageKey.tokenKey)
  let menu = Storage.get(StorageKey.menuKey)
  let isLogin = store.getters.isLogin
  if (token && menu) {
    if (!isLogin) {
      let hasMenus = homeRoutes.concat(generateRouter(menu))
      await store.dispatch("user/setIsLogin", true)
      await store.dispatch("user/setRoutes", hasMenus)
      router.addRoutes(hasMenus);
      to.path == "/" ? next({ path: hasMenus[0].redirect }) : next(to.path)
      // if (to.path == "/") return next({ path: hasMenus[0].redirect })
      // next(to.path)
    } else {
      to.path == "/" || to.path == "/login" ? next({ path: from.path }) : next()
      // if (to.path == "/" || to.path == "/login") return next({ path: from.path })
      // next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) return next()
    next('/login')
  }
})


router.afterEach(() => {
  NProgress.done()
})