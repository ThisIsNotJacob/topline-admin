import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  const userinfo = window.localStorage.getItem('user_info')
  if (to.path !== '/login') {
    if (!userinfo) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    if (userinfo) {
      next(false)
    } else {
      next()
    }
  }
})
router.afterEach(() => {
  nprogress.done()
})
export default router
