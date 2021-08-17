/**
 * 数据管理页面路由配置信息
 * @type {*[]}
 */
const Layout = () =>
    import ("@/layout")

export const homeRoutes = [{
        path: '/home',
        component: Layout,
        redirect: '/home/index',
        code: 'ShouYe',
        meta: { title: '首页' },
        children: [{
            path: 'index',
            name: 'home',
            code: 'ShouYe',
            component: () =>
                import ('@/views/home/index'),
            meta: { title: '首页', icon: 'icon-shouye', affix: true }
        }]
    },

]