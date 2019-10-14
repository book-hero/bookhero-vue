import Vue from 'vue'
import Router from 'vue-router'
import Contribute from './pages/contribute'
import Discover from './pages/discover'
import Feed from './pages/feed'
import Main from './layouts/main'
import Login from './pages/login'
import Error from './pages/error'

Vue.use(Router)

export default new Router({
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
      component: Error,
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
