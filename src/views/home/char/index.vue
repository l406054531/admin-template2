<template>
  <div>
    <v-chart :options="options"
             style="width:100%;height:400px"></v-chart>
  </div>
</template>

<script>
import { listOption } from './options'
export default {
  data() {
    return {
    };
  },
  computed: {
    options() {
      return listOption
    }
  }
}

</script>
<style lang='scss' scoped>
</style>