<template>
  <div>
    <search-bar @run-search="runSearch"></search-bar>
    <loader v-if="isLoading"></loader>
    <search-results v-if="!isLoading && results.length > 0" :results="results"></search-results>
  </div>
</template>

<script>
import axios from 'axios'
import SearchBar from '../components/search-bar'
import SearchResults from '../components/search-results'

export default {
  components: {
    SearchBar,
    SearchResults
  },
  data() {
    return {
      isLoading: false,
      results: []
    }
  },
  methods: {
    runSearch(term) {
      this.isLoading = true

      axios.get(
        `http://openlibrary.org/search.json?title=${encodeURIComponent(
          term
        )}`
      ).then((result) => {
        this.results = result.data.docs
        console.log(result)
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
