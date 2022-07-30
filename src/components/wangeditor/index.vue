<template>
  <!-- https://www.wangeditor.com/-->
  <div id="main">
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  props: {
    htmlContent: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      editor: null
    };
  },
  mounted () {
    this.wangeditorInit()
  },
  methods: {
    wangeditorInit () {
      this.editor = new E('#main')
      const editor = this.editor
      editor.create()
      editor.config.height = 500
      editor.config.onchange = (newHtml) => {
        this.wangEditorChange(newHtml)
      }
      //   this.setWangeditorHtml()
    },
    /**富文本set内容 */
    setWangeditorHtml (v) {
      this.editor.txt.html(v)
    },
    /**富文本change事件 */
    wangEditorChange (newHtml) {
      this.$emit("wangEditorChange", newHtml)
    },
    getEditorText () {
      const text = this.editor.txt.text()
      return text
    }
  }
}

</script>
<style lang='scss' scoped>
#main {
  width: 100%;
  margin: 0 auto;
}
</style>