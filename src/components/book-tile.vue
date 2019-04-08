<template>
  <div class="list-group-item">
    <img :src="`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`">
    <div>
      <h5>{{book.title}}</h5>
      <p>{{book.author_name !== undefined ? book.author_name.join(', ') : ''}}</p>
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
        :title="`Start Reading ${book.title}`"
        v-if="startReadingAction"
        :icon="['far', 'book-alt']"
        size="lg"
        class="add-button"
        @click="$emit('start-action')"
      ></font-awesome-icon>
      <font-awesome-icon
        :title="`Finish Reading ${book.title}`"
        v-if="finishReadingAction"
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
    startReadingAction: {
      type: Boolean,
      default: false
    },
    finishReadingAction: {
      type: Boolean,
      default: false
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
