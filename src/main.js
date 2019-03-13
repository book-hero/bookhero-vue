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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
