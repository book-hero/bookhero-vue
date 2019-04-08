<template>
  <div id="book-list">
    <h4>Book List</h4>
    <font-awesome-icon icon="compact-disc" @click="$store.dispatch('getBookList')"></font-awesome-icon>
    <catch-zero-state emptyText="You don't have any books in your booklist!">
      <div class="list-group" v-if="books.length > 0">
        <book-tile :book="book" removeAction finishReadingAction v-i></book-tile>
        <br>
        <book-tile :book="book" removeAction startReadingAction></book-tile>
        <book-tile :book="book" removeAction startReadingAction></book-tile>
      </div>
    </catch-zero-state>
  </div>
</template>

<script>
import CatchZeroState from './catch-zero-state'
import BookTile from './book-tile'

export default {
  data() {
    return {}
  },
  components: {
    CatchZeroState,
    BookTile
  },
  computed: {
    books() {
      return []
      // return this.$store.state.profile
    },
    currentlyReading() {
      return books.filter(book => book.status_id === 2)
    },
    toRead() {
      return this.books.filter(book => book.status_id === 1)
    }
  }
}
</script>
