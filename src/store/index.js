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
  return (!R.isNil(token) && token !== '') && jwtDecode(token).exp * 1000 - Date.now() > expireTime
}

function minutesToMilliseconds(min) {
  return min * 60 * 100
}

const checkTokens = store => {
  store.subscribeAction(async(action, state) => {
    // Skip this for actions that don't need to refresh token
    const skipActionTypes = ['login', 'refreshToken']
    const expiryWindow = minutesToMilliseconds(10) // 10 min
    if (!skipActionTypes.includes(action.type)) {
      if (!tokenIsExpired(state.auth.accessToken, expiryWindow)) {
        store.dispatch('refreshToken', { action })
      }
    }
  })
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [checkTokens],
  modules: {
    attributes,
    auth,
    books,
    profile
  }
})
