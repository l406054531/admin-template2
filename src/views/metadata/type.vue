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
        { label: '类型名称', prop: 'typeName', type: 'input' },
        { label: '类型字段', prop: 'typeField', type: 'input' },
      ],
      dialogVisible: false,
      rowData: {},
      rules: {
        typeName: { required: true, message: '请输入类型名称', trigger: 'blur' },
        typeField: { required: true, message: '请输入类型字段', trigger: 'blur' },
      },
      dialogTitle: '新增类型',
      idKey: 'idMetadataType'
    }
  },
  computed: {
    header () {
      return [
        { label: '-', prop: '', type: 'index' },
        { label: '类型名称', prop: 'typeName' },
        { label: '类型字段', prop: 'typeField' },
        getDefaultOperate(this)
      ]
    },
    useTypeHttp () {
      return useHttp('metadata-type', this)
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
        this.useTypeHttp.updateData(data, () => {
          this.handleTypeSubmit()
        })
      } else {
        this.useTypeHttp.addData(data, () => {
          this.handleTypeSubmit()
        })
      }
    },
    handleTypeSubmit () {
      this.$emit('handleTypeSubmit')
      this.dialogVisible = false
    },
    handleRefresh () { },
    /**点击表格删除--异步请求 */
    handleDelete (data) {
      this.useTypeHttp.deleteData(data, this.idKey, () => {
        this.handleTypeSubmit()
      })
    },
  }


}
</script>
<style lang='scss' scoped>
</style>