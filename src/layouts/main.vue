<template>
  <div id="main-layout">
    <nav-bar></nav-bar>
    <div class="content">
      <div id="right-column" class="col-3"></div>
      <div id="middle-column" class="col">
        <router-view></router-view>
      </div>
      <div id="left-column" class="col-3"></div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/navbar'
export default {
  components: {
    NavBar
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
#middle-column {
  height: 100%;
  overflow-y: auto;
}
</style>
