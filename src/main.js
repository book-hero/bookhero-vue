import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
<<<<<<< HEAD
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
=======
import Loader from './components/loader'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import FontAwesomeIcons from './libs/font-awesome'

library.add(...FontAwesomeIcons)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('loader', Loader)

// this is the auth guard to make sure you are signed in before going anywhere.
router.beforeEach(async(to, from, next) => {
  if (!store.state.initialized) {
    await store.dispatch('init')
  }

>>>>>>> ee0c3ae80fd191ec9243c6adc0bfcf4df3aae4f7
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
