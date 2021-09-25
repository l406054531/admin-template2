<template>
  <div class="main">
    <div class="top">
      <!-- <top-block></top-block> -->
      <visit-sum></visit-sum>
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
import topBlock from "./topBlock"
import aliIcon from "./icons"
import char from "./char"
import visitSum from './visitSum';
export default {
  components: { topBlock, aliIcon, char, visitSum },
  data () {
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
    margin-bottom: 20px;
  }
}
</style>