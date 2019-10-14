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
          v-on:finish-action="finishBookModal(userBook)"
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
          v-on:start-action="startBook({id: userBook.id, status: 2})"
        ></book-tile>
      </div>
    </catch-zero-state>
    <portal to="modal" v-if="openFinishModal">
      <finish-book-modal :book="finishedBook" @close="openFinishModal = false"></finish-book-modal>
    </portal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CatchZeroState from './catch-zero-state'
import BookTile from './book-tile'
import FinishBookModal from './finish-book-modal'

export default {
  data() {
    return {
      finishedBook: {},
      openFinishModal: false
    }
  },
  components: {
    CatchZeroState,
    BookTile,
    FinishBookModal
  },
  methods: {
    finishBookModal(book) {
      this.finishedBook = book
      this.openFinishModal = true
    },
    ...mapActions({
      removeBook: 'removeBookFromList',
      startBook: 'updateBookStatus'
    })
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

<style scoped>
</style>
