<template>
  <div class="element">
    <basics-table :data="tableData"
                  :header="header"
                  :loading.sync="loading"
                  @handleAdd="handleAdd"
                  @handleRefresh="handleRefresh">
    </basics-table>
    <dialog-form ref="dialogForm"
                 :width="450"
                 :formElement="formElement"
                 :dialogVisible.sync="dialogVisible"
                 :rowData="rowData"
                 :rules="rules"
                 :dialogTitle="dialogTitle"
                 @handleSubmit="handleSubmit"></dialog-form>
  </div>
</template>

<script>
import getDefaultOperate from '@/components/Table/default-operate.js';
import useHttp from "@/utils/http"
export default {
  props: {
    tableData: Array,
    typeField: String
  },
  data () {
    return {
      loading: false,
      formElement: [
        { label: '元素名称', prop: 'elementName', type: 'input' },
        { label: '元素值', prop: 'elementValue', type: 'input' },
      ],
      dialogVisible: false,
      rowData: {

      },
      rules: {
        elementName: { required: true, message: '请输入元素名称', trigger: 'blur' },
        elementValue: { required: true, message: '请输入元素值', trigger: 'blur' },
      },
      dialogTitle: '新增元素',
      idKey: 'idMetadataElement'
    }
  },
  computed: {
    header () {
      return [
        { label: '-', prop: '', type: 'index' },
        { label: '元素名称', prop: 'elementName' },
        { label: '元素值', prop: 'elementValue' },
        getDefaultOperate(this)
      ]
    },
    useElementHttp () {
      return useHttp('metadata-element', this)
    },
  },
  mounted () {

  },
  methods: {
    /**
     * @description: 打开新增/编辑的窗口
     * @param {*} data
     * @param {*} title
     * @return {*}
     */
    handleOpenDialog (data, title) {
      this.dialogTitle = title
      this.rowData = data
      this.dialogVisible = true
    },
    handleAdd () {
      this.dialogVisible = true
      this.handleOpenDialog({}, this.dialogTitle)
    },
    /**点击修改按钮 */
    handleUpdate (data) {
      this.handleOpenDialog(data, '编辑')
    },
    handleSubmit (data) {
      if (this.dialogTitle == '编辑') {
        this.useElementHttp.updateData(data, () => {
          this.handleElementSubmit()
        })
      } else {
        this.useElementHttp.addData({ typeField: this.typeField, ...data }, () => {
          this.handleElementSubmit()
        })
      }
    },
    handleElementSubmit () {
      this.$emit('handleElementSubmit')
      this.dialogVisible = false
    },
    handleRefresh () {
      this.handleElementSubmit()
      this.loading = false
    },
    /**点击表格删除--异步请求 */
    handleDelete (data) {
      this.useElementHttp.deleteData(data, this.idKey, () => {
        this.handleElementSubmit()
      })
    },
  }


}
</script>
<style lang='scss' scoped>
</style>