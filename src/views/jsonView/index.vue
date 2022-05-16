<template>
  <div class="main">
    <div class="json-view">
      <el-input type="textarea"
                :rows="15"
                placeholder="请输入内容"
                v-model="textarea"
                @change="handleChange">
      </el-input>
      <el-card>
        <json-viewer :value="jsonData"></json-viewer>
      </el-card>
    </div>
  </div>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
export default {
  components: { JsonViewer },
  data () {
    return {
      jsonData: [],
      textarea: ''
    }
  },

  mounted () { },

  methods: {
    handleChange () {
      try {
        this.jsonData = JSON.parse(this.textarea)
      } catch (error) {
        this.$message({
          message: '格式不对',
          type: 'warning'
        });
      }
    }
  }


}
</script>
<style lang='scss' scoped>
.json-view {
  display: flex;
  justify-content: space-around;
  .el-textarea {
    flex: 0.5;
  }
  .el-card {
    flex: 1;
  }
}
</style>