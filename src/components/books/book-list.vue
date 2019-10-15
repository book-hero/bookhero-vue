<template>
  <div id="book-list">
    <h4>Book List</h4>
    <catch-zero-state emptyText="You don't have any books in your booklist!">
      <div class="list-group" v-if="userBooks.length > 0">
        <h6>Currently Reading</h6>
        <book-tile
          :book="userBook.book"
          removeAction
          finishAction
          v-for="userBook in currentlyReading"
          :key="userBook.book.id"
          v-on:remove-action="removeBook(userBook.id)"
          v-on:finish-action="finishBook(userBook.id)"
        ></book-tile>
        <br>
        <h6>Coming Up</h6>
        <book-tile
          :book="userBook.book"
          removeAction
          startAction
          v-for="userBook in toRead"
          :key="userBook.book.id"
          v-on:remove-action="removeBook(userBook.id)"
          v-on:start-action="startBook(userBook.id)"
        ></book-tile>
      </div>
    </catch-zero-state>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CatchZeroState from '../catch-zero-state'
import BookTile from './book-tile'

export default {
  data() {
    return {}
  },
  components: {
    CatchZeroState,
    BookTile
  },
  methods: {
    removeBook(id) {
      this.$store.dispatch('removeBookFromList', id)
    },
    startBook(id) {
      this.$store.dispatch('updateBookStatus', { id, status: 2 })
    },
    finishBook(id) {
      this.$store.dispatch('updateBookStatus', { id, status: 3 })
    }
  },
  computed: {
    currentlyReading() {
      return this.userBooks.filter(book => book.status === 2)
    },
    toRead() {
      return this.userBooks.filter(book => book.status === 1)
    },
    ...mapState({
      userBooks: state => state.profile.userBooks
    })
  }
}
</script>
