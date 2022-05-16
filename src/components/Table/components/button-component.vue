
<template>
  <div class="button-component">
    <template v-for="item in list">
      <el-button :key="item.label"
                 :type="item.type"
                 :icon="item.icon"
                 :size="size"
                 @click="item.click">{{item.label}}</el-button>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    list: Array,
    size: {
      type: String,
      default: 'mini'
    }
  },
}
</script>
