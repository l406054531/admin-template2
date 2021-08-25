<template>
  <div class="main">
    <v-chart :options="options"
             style="width:100%;height:400px"></v-chart>
  </div>
</template>

<script>
import { listOption } from './options'
export default {
  data () {
    return {
    };
  },
  computed: {
    options () {
      return listOption
    }
  }
}

</script>
<style lang='scss' scoped>
.main {
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>