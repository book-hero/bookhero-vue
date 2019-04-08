import { userApi } from '../api'
import * as R from 'ramda'

export default {
  state: {
    bookList: []
  },
  actions: {
    async addBookToList({ commit }, book) {
      console.log(book)
      let result = await userApi.post('/books', bookInfo)
    },
    async getBookList({ commit }) {
      let result = await userApi.get('/books')
      console.log(result)
    }
  },
  mutations: {

  },
  getters: {

  }
}
