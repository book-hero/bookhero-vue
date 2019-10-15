<template>
  <div id="main-layout">
    <nav-bar></nav-bar>
    <div class="content">
      <div id="right-column" class="col-2">
        <profile/>
      </div>
      <div id="middle-column" class="col">
        <router-view></router-view>
      </div>
      <div id="left-column" class="col-4">
        <book-list></book-list>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/navbar'
import BookList from '../components/books/book-list'
import Profile from '../components/profile/profile.vue'

export default {
  components: {
    NavBar,
    BookList,
    Profile
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
#main-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content {
  padding: 0px 20px 20px;
  display: flex;
  flex: auto;

  & > div {
    padding-top: 20px;
  }
}
#middle-column,
#left-column {
  height: 100%;
  overflow-y: auto;
}
</style>
