<template>
  <div class="list-group-item">
    <img :src="`http://covers.openlibrary.org/b/id/${book.open_library_cover_id}-M.jpg`">
    <div>
      <h5>{{fullTitle}}</h5>
      <p>{{authors}}</p>
    </div>
    <div class="actions">
      <font-awesome-icon
        title="Add to Book List"
        v-if="addAction"
        :icon="['far', 'plus']"
        size="lg"
        class="add-button"
        @click="$emit('add-action', book)"
      ></font-awesome-icon>
      <font-awesome-icon
        title="Remove from Book List"
        v-if="removeAction"
        :icon="['far', 'minus']"
        size="lg"
        class="add-button"
        @click="$emit('remove-action')"
      ></font-awesome-icon>
      <font-awesome-icon
        :title="`Start reading ${book.title}`"
        v-if="startAction"
        :icon="['far', 'book-alt']"
        size="lg"
        class="add-button"
        @click="$emit('start-action')"
      ></font-awesome-icon>
      <font-awesome-icon
        :title="`Finish reading ${book.title}`"
        v-if="finishAction"
        :icon="['far', 'book-open']"
        size="lg"
        class="add-button"
        @click="$emit('finish-action')"
      ></font-awesome-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true
    },
    addAction: {
      type: Boolean,
      default: false
    },
    removeAction: {
      type: Boolean,
      default: false
    },
    startAction: {
      type: Boolean,
      default: false
    },
    finishAction: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    fullTitle() {
      if (this.book.subtitle !== null) { return `${this.book.title}: ${this.book.subtitle}` }
      return this.book.title
    },
    authors() {
      if (this.book.authors === undefined) return ''
      const authorList = this.book.authors.map(author => author.name)
      return authorList.join(', ')
    }
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
