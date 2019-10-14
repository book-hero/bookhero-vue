<template>
  <modal
    @close="$emit('close')"
    title="Well Done!"
    confirmText="Finish"
    @confirm-action="finishBook({id: book.id, selectedDescriptor, status: 3})"
  >
    <div>
      <h6>Congratulations on finishing {{fullTitle}}!</h6>
      <p>Which of these statements do you feel was most true about your experience reading {{fullTitle}}?</p>
      <ul>
        <li v-for="question of attributeQuestions" :key="question.id" class="form-check">
          <input
            type="radio"
            class="form-check-input"
            :id="`question_${question.id}`"
            v-model="selectedDescriptor"
            :value="question.id"
          >
          <label :for="`question_${question.id}`" class="form-check-label">{{question.descriptor}}</label>
        </li>
      </ul>
    </div>
  </modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      selectedDescriptor: 0,
      bookTitle: ''
    }
  },
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  methods: {
    finishBook(bookInfo) {
      this.$store.dispatch('finishBook', bookInfo)
      this.$emit('close')
    }
  },
  computed: {
    fullTitle() {
      return `${this.book.book.title}${
        this.book.book.subtitle ? ': ' + this.book.book.subtitle : ''
      }`
    },
    attributeQuestions() {
      return this.$store.getters.randomDescriptorList()
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>
