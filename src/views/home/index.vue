<template>
  <div class="main">
    <div class="top">
      <top-block></top-block>
    </div>
    <div class="icon">
      <ali-icon></ali-icon>
    </div>
    <div class="char">
      <char />
    </div>
  </div>
</template>
<script>
import topBlock from "./topBlock/index"
import aliIcon from "./icons/index.vue"
import char from "./char/index.vue"
export default {
  components: { topBlock, aliIcon, char },
  data() {
    return {

    };
  },
}

</script>
<style lang='scss' scoped>
.main {
  height: 100%;
  .icon {
    margin-top: 20px;
  }
}
</style>