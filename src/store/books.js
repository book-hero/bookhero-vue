import { userBooksApi, booksApi } from '../api'

export default {
  state: {
    searchResults: [],
    userBooks: []
  },
  actions: {
    /* async */ addBook({ commit }, book) {
      return booksApi.post('', book)
    },
    async getBookList({ commit }) {
      const result = await userBooksApi.get('')
      commit('setBookList', result)
    },
    async searchBooks({ commit }, term) {
      const results = await booksApi.get('/search', { title: term })
      commit('setSearchResults', results)
    },
    async addBookToList({ dispatch, state }, inBook) {
      if (state.userBooks.filter(book => book.book.id === inBook.id).length < 1) {
        const book = inBook.id === 'OL' ? await dispatch('addBook', inBook) : inBook
        const bookToAdd = { book, book_id: book.id, status: 1 }
        await userBooksApi.post('', bookToAdd)
        dispatch('getBookList')
      }
    },
    async removeBookFromList({ dispatch }, bookId) {
      await userBooksApi.delete('/' + bookId)
      dispatch('getBookList')
    },
    async updateBookStatus({ dispatch }, book) {
      await userBooksApi.patch('/' + book.id, { status: book.status })
      dispatch('getBookList')
    },
    async finishBook({ dispatch }, data) {
      await userBooksApi.post(`/${data.book}/finish`, data)
      dispatch('getBookList')
    }
  },
  mutations: {
    setSearchResults(state, results) {
      state.searchResults = results
    },
    setBookList(state, result) {
      state.userBooks = result
    }
  },
  getters: {

  }
}
