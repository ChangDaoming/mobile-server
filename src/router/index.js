import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/LoginView.vue'

const routes = [
  // 路由配置
  // 路由重定向
  { path: '/', redirect: '/home' },
  {
    path: '/login',
    name: 'loginview',
    component: Login
  },
  // 路由懒加载 首页
  {
    path: '/home',
    name: 'homeview',
    component: () => import('../views/HomeView.vue'),
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'indexview',
        component: () => import('../views/IndexView.vue')
      },
      {
        path: '/user',
        name: 'userview',
        component: () => import('../views/uesr/UserView.vue')
      },
      {
        path: '/slide',
        name: 'slideview',
        component: () => import('../views/slide/SlideView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 挂载路由导航守卫,避免用户未登录就能访问须授权页面
router.beforeEach((to, form, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数,表示放行
  // next() 放行  next('/login') 强制跳转
  if (to.path.toLowerCase() === '/login') return next()
  const isToken = localStorage.getItem('token')
  if (!isToken) return next('/login')
  next()
})

export default router
