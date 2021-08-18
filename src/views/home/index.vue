<template>
  <div class="main">
    <baiduMpa />
  </div>
</template>
<script>
import baiduMpa from "../../components/baiduMap"
export default {
  components: { baiduMpa },
  data() {
    return {
    };
  },
}

</script>
<style lang='scss' scoped>
.main{
    height: 100%;
}
</style>