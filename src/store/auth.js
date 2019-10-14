import axios from 'axios'
import router from '@/router'
import { authApi } from '../api'

export default {
  state: {
    accessToken: '',
    isLoggedIn: false
  },
  actions: {
    async login ({ commit }, info) {
      const result = await authApi.post('', info)

      // Check errors
      if (result.errors === undefined) {
        commit('setTokens', result)
        commit('setLogin', true)
      }

      return result
    },
    logout ({ commit }) {
      commit('setTokens', { refresh: '', access: '' })
      commit('setLogin', false)
    },
    async refreshToken ({ commit, dispatch }) {
      const refreshToken = localStorage.getItem('refreshToken')
      let result
      try {
        result = await authApi.post('/refresh', { refresh: refreshToken })
        commit('setTokens', result)
        commit('setLogin', true)
      } catch {
        console.log('hello')
        if (result.errors.code === 'token_not_valid') {
          dispatch('logout')
          router.replace('login')
        }
      }
    }
  },
  mutations: {
    setTokens (state, tokens) {
      if (tokens.refresh !== '') {
        localStorage.setItem('refreshToken', tokens.refresh)
      } else {
        localStorage.removeItem('refreshToken')
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`
      state.accessToken = tokens.access
    },
    setLogin (state, status) {
      state.isLoggedIn = status
    }
  },
  getters: {
    refreshToken () {
      return localStorage.getItem('refreshToken')
    }
  }
}
