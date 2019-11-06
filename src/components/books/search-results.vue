<template>
  <div class="list-group">
    <book-tile
      v-for="(book, index) in books"
      :key="index"
      :book="book"
      :addAction="canAdd(book)"
      v-on:add-action="addBook"
    ></book-tile>
  </div>
</template>

<script>
import BookTile from './book-tile'
import { mapState } from 'vuex'

export default {
  components: {
    BookTile
  },
  computed: {
    books() {
      return this.results.slice(0, 10)
    },
    ...mapState({
      userBooks: state => state.books.userBooks
    })
  },
  methods: {
    addBook(book) {
      this.$store.dispatch('addBookToList', book)
    },
    canAdd(book) {
      console.log({ book })
      console.log({ userBooks: this.userBooks })
      return !this.userBooks.find(b => b.book.id === book.id)
    }
  },
  props: {
    results: Array
  }
}
</script>
