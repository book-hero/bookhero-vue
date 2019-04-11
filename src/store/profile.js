import { userApi } from '../api'

export default {
  state: {
    userBooks: []
  },
  actions: {
    async getBookList({ commit }) {
      let result = await userApi.get('/books')
      commit('setBookList', result)
    },
    async addBookToList({ dispatch }, book) {
      let newBook
      if (book.id === "OL") {
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
    setBookList(state, result) {
      state.userBooks = result
    }
  },
  getters: {

  }
}
