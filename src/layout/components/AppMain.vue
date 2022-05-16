<template>
  <section class="app-main">
    <transition name="fade-transform"
                mode="out-in">
      <!-- <keep-alive :include="cachedViews"> -->
      <router-view :key="key" />
      <!-- </keep-alive> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.path
    },
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
  }
}
</script>

<style scoped>
.app-main {
  padding: 10px;
  overflow: auto;
}
</style>

