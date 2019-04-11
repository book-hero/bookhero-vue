import { booksApi } from '../api'
import * as R from 'ramda'

export default {
  state: {
    searchResults: []
  },
  actions: {
    async getBooks() {
      const result = await booksApi.get()
      console.log({ result })
    },
    async addBook({ }, book) {
      // first add a book to the database
      const result = await booksApi.post('', book)
      return result
    },
    async searchBooks({ commit }, term) {
      const results = await booksApi.get('/search', { title: term })
      commit('setSearchResults', results)
      console.log(results)
    }
  },
  mutations: {
    setSearchResults(state, results) {
      state.searchResults = results
    }
  },
  getters: {

  }
}
