<template>
  <div>
    <div id="app">
      <router-view></router-view>
      <portal-target name="modal"></portal-target>
      <!-- <main-layout></main-layout> -->
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
