<template>
  <div id="profile">
    <div class="prof-pic-wrapper">
    <profile-image />
    </div>
    </div>
</template>

<style scoped>
#profile {
  height: 100%;
}

.prof-pic-wrapper {
  width: 150px;
  height: 150px;
}
</style>

<script>
import ProfileImage from './profile-image.vue'

export default {
  components: {
    ProfileImage
  },
  async mounted() {
    await this.$store.dispatch('getAttributes')
  }
}
</script>
