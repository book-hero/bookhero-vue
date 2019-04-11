<template>
  <div class="list-group">
    <book-tile
      v-for="(book, index) in books"
      :key="index"
      :book="book"
      addAction
      v-on:add-action="addBook"
    ></book-tile>
  </div>
</template>

<script>
import BookTile from './book-tile'
export default {
  components: {
    BookTile
  },
  computed: {
    books() {
      return this.results.slice(0, 10)
    }
  },
  methods: {
    addBook(book) {
      this.$store.dispatch('addBookToList', book)
    }
  },
  props: {
    results: Array
  }
}
</script>
