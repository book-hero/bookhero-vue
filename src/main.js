import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
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

  if (to.matched.some(record => record.meta.requiresAuth)) {
    setTimeout(() => { // This is to make sure stuff runs right.
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
