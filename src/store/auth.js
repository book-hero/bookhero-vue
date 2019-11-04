import axios from 'axios'
import * as R from 'ramda'
import { authApi } from '../api'
import router from '../router'

export default {
  state: {
    accessToken: '',
    isLoggedIn: false
  },
  actions: {
    async login({ commit }, info) {
      const result = await authApi.post('', info)

      // Check errors
      if (result.errors === undefined) {
        commit('setTokens', result)
        commit('setLogin', true)
      }

      return result
    },
    logout({ commit }) {
      commit('setTokens', { refresh: '', access: '' })
      commit('setLogin', false)
    },
    async refreshToken({ commit, dispatch }, options) {
      const refreshToken = localStorage.getItem('refreshToken')
      const result = await authApi.post('/refresh', { refresh: refreshToken })
      if (R.isNil(result.errors)) {
        commit('setTokens', result)
        commit('setLogin', true)

        if (options.action) {
          dispatch(options.action.type, options.action.payload)
        }
      } else {
        console.log('here?')
        if (result.errors.code === 'token_not_valid') {
          dispatch('logout')
          router.push({ name: 'login', params: { redirect: router.currentRoute.fullPath } })
          return false
        }
      }
      return true
    }
  },
  mutations: {
    setTokens(state, tokens) {
      if (tokens.refresh !== '') {
        localStorage.setItem('refreshToken', tokens.refresh)
      } else {
        localStorage.removeItem('refreshToken')
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`
      state.accessToken = tokens.access
    },
    setLogin(state, status) {
      state.isLoggedIn = status
    }
  },
  getters: {
    refreshToken() {
      return localStorage.getItem('refreshToken')
    }
  }
}
