import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/layout'
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}

export const constantRoutes = [

  {
    path: '/',
    component: Layout
  },
  // {
  //     path: '/redirect',
  //     component: Layout,
  //     hidden: true,
  //     children: [{
  //         path: '/redirect/:path*',
  //         component: () =>
  //             import ('@/views/redirect/index')
  //     }]
  // },
  {
    path: '/login',
    component: () =>
      import('@/views/login/index'),
    hidden: true,
    meta: { title: '登录页面' },
  },
  // {
  //     path: '/home',
  //     component: Layout,
  //     redirect: '/home/index',
  //     code: 'ShouYe',
  //     meta: { title: '首页', icon: 'dashboard' },
  //     children: [{
  //         path: 'index',
  //         name: 'home',
  //         code: 'ShouYe',
  //         component: () =>
  //             import ('@/views/home/index'),
  //         meta: { title: '首页1', icon: 'dashboard', affix: true }
  //     }]
  // },
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router