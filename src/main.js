import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './globals'

// this is the auth guard to make sure you are signed in before going anywhere.
router.beforeEach(async (to, from, next) => {
  if (to.name === 'error') next()
  if (!store.state.auth.isLoggedIn) {
    try {
      await store.dispatch('init')
    } catch {
      next({ name: 'error', params: { code: 200 } })
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    setTimeout(() => {
      // This is to make sure stuff runs right.
      if (!store.state.auth.isLoggedIn) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    }, 150)
  }
  next()
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
