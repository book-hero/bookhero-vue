import axios from 'axios'
import { authApi, booksApi } from '../api'

export default {
  state: {
    accessToken: ''
  },
  actions: {
    async login({ commit }, info) {
      const result = await authApi.post('/', info)

      // Check errors
      if (result.errors === undefined) commit('setTokens', result)

      return result
    },
    async refreshToken() {
      const refreshToken = localStorage.getItem('refreshToken')
      const result = await authApi.post('/refresh', { refresh: refreshToken })
      commit('setTokens', result)
    }
  },
  mutations: {
    setTokens(state, tokens) {
      localStorage.setItem('refreshToken', tokens.refresh)
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`
      state.accessToken = tokens.access
    }
  },
  getters: {
    refreshToken() {
      return localStorage.getItem('refreshToken')
    }
  }
}
