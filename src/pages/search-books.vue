<template>
  <div>
    <search-bar @run-search="runSearch"></search-bar>
    <loader v-if="isLoading"></loader>
    <search-results v-if="!isLoading && results.length > 0" :results="results"></search-results>
  </div>
</template>

<script>
import SearchBar from '../components/books/search-bar'
import SearchResults from '../components/books/search-results'

export default {
  components: {
    SearchBar,
    SearchResults
  },
  data() {
    return {
      isLoading: false
      // results: []
    }
  },
  computed: {
    results() {
      return this.$store.state.books.searchResults
    }
  },
  methods: {
    async runSearch(term) {
      this.isLoading = true
      await this.$store.dispatch('searchBooks', term)

      // openLibraryApi
      //   .request({ params: { title: term } })
      //   .then(result => {
      //     this.results = result.data.docs
      //     console.log(result)
      //   })
      //   .finally(() => {
      this.isLoading = false
      //   })
    }
  }
}
</script>
