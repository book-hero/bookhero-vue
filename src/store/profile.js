import { userApi } from '../api'

export default {
  state: {
    userBooks: []
  },
  actions: {
    async getBookList({ commit }) {
      const result = await userApi.get('/books')
      commit('setBookList', result)
    }
  },
  mutations: {
    setBookList(state, result) {
      state.userBooks = result
    }
  },
  getters: {

  }
}
