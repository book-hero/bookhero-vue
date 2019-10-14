import Vue from 'vue'
import Vuex from 'vuex'

import jwtDecode from 'jwt-decode'

import attributes from './attributes'
import auth from './auth'
import books from './books'
import profile from './profile'

Vue.use(Vuex)

const checkTokens = store => {
  store.subscribeAction(async(action, state) => {
    // Skip this for actions that don't need to refresh token
    const skipActionTypes = ['login', 'refreshToken']
    if (skipActionTypes.filter(type => type === action.type).length > 0) {
<<<<<<< HEAD
      return
    }
    // Check if token needs refreshing
    if (state.auth.accessToken !== '') {
=======
      return true
    } else if (state.auth.accessToken !== '') {
      // Check if token needs refreshing
>>>>>>> ee0c3ae80fd191ec9243c6adc0bfcf4df3aae4f7
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
        return true
      }
    } else {
    // Refresh token if anything fails
      store.dispatch('refreshToken')
      return false
    }
  })
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    initialized: false
  },
  actions: {
<<<<<<< HEAD
    async init ({ dispatch }) {
      // Refresh token first!
      await dispatch('refreshToken')
      await dispatch('getBookList')
      await dispatch('getAttributes')
=======
    async init({ dispatch, commit }) {
      // Refresh token first!
      try {
        await dispatch('refreshToken')
        await dispatch('getBookList')

        commit('setInitialized', true)
      } catch {
        commit('setInitialized', false)
        // throw new Error('Unable to initialize app')
      }
    }
  },
  mutations: {
    setInitialized(state, value) {
      state.initialized = value
>>>>>>> ee0c3ae80fd191ec9243c6adc0bfcf4df3aae4f7
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
