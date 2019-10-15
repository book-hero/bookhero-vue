<template>
  <form class="input-group mb-3" @submit.prevent="$emit('run-search', searchTerm)">
    <input
      v-model="searchTerm"
      type="text"
      class="form-control"
      placeholder="Search Book Titles"
      aria-label="Search Book Titles"
      aria-describedby="searchAddOn"
    >
    <div class="input-group-append">
      <button class="btn btn-info" id="searchAddOn" type="submit">
        <font-awesome-icon :icon="['far', 'search']" size="lg"></font-awesome-icon>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: ''
    }
  },
  methods: {
    searchEvent() {
    }
  }
}
</script>

<style scoped>
.input-group-append button {
  padding: 0.75rem 1.25rem;
}
</style>
