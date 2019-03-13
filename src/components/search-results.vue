<template>
  <div class="list-group">
    <div class="list-group-item" v-for="(book, index) in books" :key="index">
      <img :src="`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`">
      <div>
        <h5>{{book.title}}</h5>
        <p>{{book.author_name !== undefined ? book.author_name.join(', ') : ''}}</p>
      </div>
      <div class="actions">
        <!-- <button class="btn btn-sm btn-success"> -->
        <font-awesome-icon
          :icon="['far', 'plus']"
          size="lg"
          class="add-button"
          @click="addBook(book)"
        ></font-awesome-icon>
        <!-- </button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    books() {
      return this.results.slice(0, 10)
    }
  },
  methods: {
    addBook(book) {
      const bookInfo = {
        title: book.title,
        authors: book.author_name,
        open_library_cover_id: book.cover_i
      }
      this.$store.dispatch('addBook', bookInfo)
    }
  },
  props: {
    results: Array
  }

}
</script>

<style lang="scss" scoped>
.list-group-item {
  display: flex;

  &:hover {
    background-color: #f7f7f7;
  }

  img {
    margin-right: 15px;
    max-width: 55px;
    width: auto;
    align-self: center;
  }

  .actions {
    position: absolute;
    right: 0;
    bottom: 0;
    // padding: 0.75rem 1rem;

    .add-button {
      color: #4bbf73;
      padding: 0.75rem 1rem;
      padding: 5px;
      width: 30px;
      height: 30px;
      cursor: pointer;

      &:hover {
        color: #307810;
      }
    }
  }
}
</style>
