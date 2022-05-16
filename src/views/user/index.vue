<template>
  <div class="test-view">
    <basics-table :data="tableData"
                  :header="useConfig.getHeader()"
                  :loading.sync="loading"
                  :searchFormElement="searchFormElement"
                  :params="tableParams"
                  @handleAdd="handleAdd"
                  @handleRefresh="getDataList"
                  @handleSubmit="handleSubmitSearch">
    </basics-table>
    <basics-pagination :total="pageTotal"
                       @handlePageParams="handlePageParams"
                       @handleSizeChange="handleSizeChange"
                       @handleCurrentChange="handleCurrentChange"></basics-pagination>
    <dialog-form ref="dialogForm"
                 :formElement="formElement"
                 :dialogVisible.sync="dialogVisible"
                 :rowData="rowData"
                 :rules="rules"
                 :dialogTitle="dialogTitle"
                 @handleSubmit="handleSubmit"></dialog-form>
  </div>
</template>

<script>
import useConfig from './config';
import useHttp from "@/utils/http"
export default {
  name: 'user',
  data () {
    return {
      tableData: [],
      tableParams: {
        pageNum: null,
        pageSize: null
      },
      pageTotal: null,
      rowData: {},
      rules: {   //表单验证
        username: [{ required: true, message: '请输入用户账号', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        nickname: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
        userRole: [{ required: true, message: '请选择角色', trigger: 'blur' }],
      },
      dialogTitle: '',
      loading: true,
      idKey: 'idUser',
      httpUrl: 'user',
      dialogVisible: false
    }
  },
  computed: {
    useConfig () {
      return useConfig(this)
    },
    formElement () {
      return this.useConfig.getFormElement()
    },
    searchFormElement () {
      return this.useConfig.getSearchElement()
    },
    useUserHttp () {
      return useHttp(this.httpUrl, this)
    }
  },
  mounted () {
    this.getDataList()
    this.findAllRoleList()
  },
  methods: {
    /** 获取user数据 */
    getDataList (params = this.tableParams) {
      this.useUserHttp.getPageList(params, (result) => {
        this.tableData = result.dataList
        this.pageTotal = result.total
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    },
    handlePageParams (val) {
      this.tableParams.pageNum = val.currentPage
      this.tableParams.pageSize = val.pageSize
    },
    /** 分页变动 */
    handleSizeChange (val) {
      this.tableParams.pageSize = val
      this.getDataList()
    },
    /** 分页变动 */
    handleCurrentChange (val) {
      this.tableParams.pageNum = val
      this.getDataList()
    },

    handleSubmit (data) {
      if (this.dialogTitle == '编辑') {
        this.useUserHttp.updateData(data, () => {
          this.handleCloseDialog()
        })
      } else if (this.dialogTitle == '新增') {
        this.useUserHttp.addData(data, () => {
          this.handleCloseDialog()
        })
      }
    },

    handleOpenDialog (data, title) {
      this.dialogTitle = title
      this.rowData = data
      this.dialogVisible = true
    },

    handleCloseDialog () {
      this.getDataList()
      this.dialogVisible = false
    },

    handleAdd () {
      this.formElement[1].disabled = false
      this.handleOpenDialog({}, '新增')
    },
    /**点击修改按钮 */
    handleUpdate (data) {
      this.formElement[1].disabled = true
      this.handleOpenDialog(data, '编辑')
    },
    /**点击表格删除--异步请求 */
    handleDelete (data) {
      this.useUserHttp.deleteData(data, this.idKey, () => {
        this.getDataList()
      })
    },
    /**获取所有角色 */
    findAllRoleList () {
      useHttp('role').getAllData((result) => {
        let arr = result.dataList.map(item => {
          return { label: item.roleName, value: item.roleField }
        })
        for (let item of this.formElement) {
          if (item.label === '角色') {
            item.typeselects = arr
          }
        }
      })
    },
    handleSubmitSearch (data) {
      this.getDataList({ ...this.tableParams, ...data })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>