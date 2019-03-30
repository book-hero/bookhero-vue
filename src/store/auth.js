import axios from 'axios'
import { authApi, booksApi } from '../api'

export default {
  state: {
    accessToken: '',
    isLoggedIn: false
  },
  actions: {
    triggerPlugin() { },
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
    async refreshToken({ commit }) {
      const refreshToken = localStorage.getItem('refreshToken')
      const result = await authApi.post('/refresh', { refresh: refreshToken })
      commit('setTokens', result)
      commit('setLogin', true)
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
    },
  }
}
