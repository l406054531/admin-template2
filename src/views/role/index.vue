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
                 :dialogVisible.sync="dialogVisible"
                 :formElement="formElement"
                 :rowData="rowData"
                 :rules="rules"
                 :dialogTitle="dialogTitle"
                 @handleSubmit="handleSubmit"></dialog-form>
    <el-drawer title="权限分配"
               size="20%"
               :visible.sync="drawer"
               :direction="direction">
      <tree :currentRoleInfo="currentRoleInfo"
            @closeDrawer="drawer=false"
            v-if="drawer" />
    </el-drawer>
  </div>
</template>

<script>
import useConfig from './config';
import useHttp from "@/utils/http"
import tree from './module/tree.vue';
export default {
  name:'role',
  components: { tree },
  data () {
    return {
      tableData: [],
      tableParams: {
        pageNum: null,
        pageSize: null
      },
      pageTotal: null,
      rowData: {},
      rules: {
        roleField: [{ required: true, message: '请输入字段', trigger: 'blur' }],
        roleName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      },
      dialogTitle: '',
      loading: true,
      idKey: 'idRole',
      httpUrl: 'role',
      currentRoleInfo: {},//点击权限分配后的当前条角色的信息
      drawer: false,
      direction: 'rtl',//抽屉方向,
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
    useRoleHttp () {
      return useHttp(this.httpUrl, this)
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    /** 获取user数据 */
    getDataList (params = this.tableParams) {
      this.useRoleHttp.getPageList(params, (result) => {
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
        this.useRoleHttp.updateData(data, () => {
          this.handleCloseDialog()
        })
      } else if (this.dialogTitle == '新增') {
        this.useRoleHttp.addData(data, () => {
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
      this.handleOpenDialog({}, '新增')
    },
    /**点击修改按钮 */
    handleUpdate (data) {
      this.handleOpenDialog(data, '编辑')
    },
    /**点击表格删除--异步请求 */
    handleDelete (data) {
      this.useRoleHttp.deleteData(data, this.idKey, () => {
        this.getDataList()
      })
    },
    handleSubmitSearch (data) {
      this.getDataList({ ...this.tableParams, ...data })
    },
    /** 点击权限分配 */
    handlePermissionAssignmen (data) {
      this.currentRoleInfo = data
      this.drawer = true
    },
  }
}
</script>
<style lang='scss' scoped>
</style>