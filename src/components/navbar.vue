<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Book Hero</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar"
      aria-controls="navbar"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbar">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{active: (routeName === 'feed')}">
          <router-link class="nav-link" :to="{name: 'feed'}">
            Feed
            <span v-if="routeName === 'discover'" class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item" :class="{active: (routeName === 'discover')}">
          <router-link class="nav-link" :to="{name: 'discover'}">Discover
            <span v-if="routeName === 'discover'" class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item" :class="{active: (routeName === 'contribute')}">
          <router-link class="nav-link" :to="{name: 'contribute'}">Contribute
            <span v-if="routeName === 'discover'" class="sr-only">(current)</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    routeName() {
      return this.$route.name
    }
  }
}
</script>

<style lang='scss' scoped>
.navbar {
  padding: 0.75rem 1rem;
}
</style>
