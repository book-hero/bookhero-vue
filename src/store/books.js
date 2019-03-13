import { booksApi } from '../api'
import * as R from 'ramda'

export default {
  state: {

  },
  actions: {
    async getBooks() {
      const result = await booksApi.get()
      console.log({ result })
    },
    async addBook({ }, book) {
      console.log("hello")
      const authorsObject = book.authors.map(author => ({ name: author }))
      console.log(authorsObject)
      const bookInfo = R.assoc('authors', authorsObject, book)
      console.log(bookInfo)
      const result = await booksApi.post('', bookInfo)
      console.log({ result })
    }
  },
  mutations: {

  },
  getters: {

  }
}
