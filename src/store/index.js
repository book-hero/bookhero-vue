import Vue from 'vue'
import Vuex from 'vuex'

import jwtDecode from 'jwt-decode'
import * as R from 'ramda'

import attributes from './attributes'
import auth from './auth'
import books from './books'
import profile from './profile'

Vue.use(Vuex)

function tokenIsExpired(token, expireTime) {
  return !R.isNil(token) && jwtDecode(token).exp * 1000 - Date.now() > expireTime
}

const checkTokens = store => {
  store.subscribeAction(async(action, state) => {
    // Skip this for actions that don't need to refresh token
    const skipActionTypes = ['login', 'refreshToken']
    const expiryWindow = 10 * 60 * 100 // 10 min
    if (!skipActionTypes.includes(action.type)) {
      if (!tokenIsExpired(state.auth.accessToken, expiryWindow)) {
        store.dispatch('refreshToken', { action })
      }
    }
  })
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    initialized: false
  },
  actions: {
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
