import Vue from 'vue'
import Router from 'vue-router'
import Contribute from './pages/contribute'
import Discover from './pages/discover'
import Feed from './pages/feed'
import Main from './layouts/main'
import Login from './pages/login'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/error/:code',
      name: 'error',
      component: () => import('./pages/error'),
      props: true
    },
    {
      path: '/',
      name: 'home',
      component: Main,
      redirect: { name: 'feed' },
      meta: { requiresAuth: true },
      children: [
        {
          path: '/contribute',
          name: 'contribute',
          component: Contribute
        },
        {
          path: '/discover',
          name: 'discover',
          component: Discover
        },
        {
          path: '/feed',
          name: 'feed',
          component: Feed
        }
      ]
    }
  ]
})

function authGuard(to, from, next) {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    setTimeout(() => {
      // This is to make sure stuff runs right.
      if (!store.state.auth.isLoggedIn) {
        console.log('authGuard')
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    }, 150)
  }
  next()
}

// this is the auth guard to make sure you are signed in before going anywhere.
router.beforeEach(authGuard)

export default router
