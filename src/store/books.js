import { userApi, booksApi } from '../api'

export default {
  state: {
    searchResults: []
  },
  actions: {
    async getBooks() {
      const result = await booksApi.get()
      console.log({ getBooks: result })
    },
    async addBook({ commit }, book) {
      // first add a book to the database
      const result = await booksApi.post('', book)
      return result
    },
    async searchBooks({ commit }, term) {
      const results = await booksApi.get('/search', { title: term })
      commit('setSearchResults', results)
      console.log({ searchBooks: results })
    },
    async addBookToList({ dispatch }, book) {
      let newBook
      if (book.id === 'OL') {
        newBook = await dispatch('addBook', book)
      }
      const id = (newBook !== undefined) ? newBook.id : book.id
      const bookToAdd = { book: newBook || book, book_id: id, status: 1 }
      await userApi.post('/books', bookToAdd)
      dispatch('getBookList')
    },
    async removeBookFromList({ dispatch }, bookId) {
      await userApi.delete('/books/' + bookId)
      dispatch('getBookList')
    },
    async updateBookStatus({ dispatch }, book) {
      await userApi.patch('/books/' + book.id, { status: book.status })
      dispatch('getBookList')
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
