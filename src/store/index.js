import Vue from 'vue'
import Vuex from 'vuex'

import jwtDecode from 'jwt-decode'

import attributes from './attributes'
import auth from './auth'
import books from './books'
import profile from './profile'

Vue.use(Vuex)

const checkTokens = store => {
  store.subscribeAction(async (action, state) => {
    // Skip this for actions that don't need to refresh token
    const skipActionTypes = ['login', 'refreshToken']
    if (skipActionTypes.filter(type => type === action.type).length > 0) {
      return
    }
    // Check if token needs refreshing
    if (state.auth.accessToken !== '') {
      const tokenExpiryWindow = 600 // milliseconds (10 min)
      const tokenExpiry = jwtDecode(state.auth.accessToken).exp
      const now = parseInt(
        Date.now()
          .toString()
          .slice(0, -3)
      )
      // if token has more than 10 minutes left
      if (tokenExpiry - now > tokenExpiryWindow) {
        // This token is fine, don't do anything
        return
      }
    }
    // Refresh token if anything fails
    store.dispatch('refreshToken')
  })
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions: {
    async init ({ dispatch }) {
      // Refresh token first!
      await dispatch('refreshToken')
      await dispatch('getBookList')
      await dispatch('getAttributes')
    }
  },
  plugins: [checkTokens],
  modules: {
    attributes,
    auth,
    books,
    profile
  }
})
