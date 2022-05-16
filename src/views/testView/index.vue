<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },

  mounted () {
    this.$nextTick(() => {
      /** @type {HTMLCanvasElement} */
      const canvas = document.querySelector('#canvas')
      const context = canvas.getContext('2d')
      canvas.style.border='1px solid red'
      context.beginPath()
      context.moveTo(100,100);
      context.lineTo(300,100)
      context.stroke()
    })
  },

  methods: {}


}
</script>
<style lang='scss' scoped>
</style>