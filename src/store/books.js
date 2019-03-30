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
      const authorsObject = book.authors.map(author => ({ name: author }))
      const bookInfo = R.assoc('/authors', authorsObject, book)
      // first add a book to the database
      const result = await booksApi.post('/', bookInfo)
    }
  },
  mutations: {

  },
  getters: {

  }
}
