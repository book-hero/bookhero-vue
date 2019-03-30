import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faPlus } from '@fortawesome/pro-regular-svg-icons'
import { faCompactDisc } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Loader from './components/loader'

library.add(faSearch, faCompactDisc, faPlus)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('loader', Loader)

// this is the auth guard to make sure you are signed in before going anywhere.
router.beforeEach(async (to, from, next) => {
  if (!store.state.auth.isLoggedIn) await store.dispatch('triggerPlugin')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    setTimeout(() => { // This is to make sure stuff runs right.
      if (!store.state.auth.isLoggedIn) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    }, 0)
  }
  next()
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
