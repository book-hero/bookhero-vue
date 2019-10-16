import Vue from 'vue'
// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import FontAwesomeIcons from './libs/font-awesome'
// Components
import Loader from './components/loader'
import Modal from './components/modal'
// Plugins
import PortalVue from 'portal-vue'

// Font Awesome
library.add(...FontAwesomeIcons)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Components
Vue.component('modal', Modal)
Vue.component('loader', Loader)

// Plugins
Vue.use(PortalVue)
