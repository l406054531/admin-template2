<template>
  <el-dialog :title="dialogTitle"
             :visible.sync="dialogVisible"
             :close-on-click-modal="false"
             width="550px"
             class="dialogClass"
             :before-close="handleCloseDialog">
    <basics-form ref="basicsForm"
                 :showSubmit="false"
                 :rowData="rowData"
                 :rules="rules"
                 :formElement="formElement"> </basics-form>
    <!--弹出框按钮 -->
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="handleCloseDialog"
                 size="small">取 消</el-button>
      <el-button type="primary"
                 size="small"
                 @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>
export default {
  props: {
    rules: Object,
    formElement: { //表单元素
      type: Array,
      default: () => []
    },
    rowData: Object,
    dialogTitle: String,
    dialogVisible: Boolean
  },
  methods: {
    handleCloseDialog () {
      this.$emit("update:dialogVisible", false)
      this.$refs.basicsForm.resetForm()
    },
    handleSubmit () {
      const data = this.$refs.basicsForm.handleSubmit()
      data && this.$emit("handleSubmit", data)
    },
  }
}
</script>
<style lang="scss" scoped>
</style>