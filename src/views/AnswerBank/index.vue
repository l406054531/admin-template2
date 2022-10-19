<template>
  <div class="answer-bank">
    <basics-table :data="tableData"
                  :header="tableHeader"
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

    <el-drawer title="导入文件"
               :visible.sync="drawer"
               direction="rtl"
               size="100%"
               :before-close="handleCloseDrawer">
      <importFile />
    </el-drawer>
  </div>
</template>

<script>
import useConfig from './config';
import useHttp from "@/utils/http"
import { findMetadataElements } from "@/api/metadata"
import { getDefaultOperateList } from '@/components/Table/default-operate';
export default {
  components: {
    importFile: () => import("./importFile.vue")
  },
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

      },
      dialogTitle: '',
      loading: true,
      idKey: 'idAnswerBank',
      httpUrl: 'answer-bank',
      dialogVisible: false,
      drawer: false
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
    myHttp () {
      return useHttp(this.httpUrl, this)
    },
    tableHeader () {
      const _this = this
      return [
        { label: '', prop: '', type: 'selection' },
        { label: '-', prop: 'index', type: 'index' },
        { label: '库名', prop: 'libraryName' },
        {
          label: '是否公开', prop: 'isPublic',
          render (row) {
            const str = row.isPublic == '1' ? '是' : '否'
            return _this.$createElement('el-tag', {
              props: {
                type: 'success'
              }
            },
              str)
          }
        },
        { label: '封面', prop: 'cover' },
        {
          prop: 'operate',
          label: '操作',
          render (row) {
            return _this.$createElement('buttonComponent', {
              props: {
                list: [
                  {
                    label: '导入文件',
                    type: 'text',
                    click: () => _this.handleOpenDrawer(row)
                  },
                  ...getDefaultOperateList.call(_this, row)
                ]
              }
            })
          },
        }
      ]
    }
  },
  mounted () {
    this.getDataList()
    this.handleMetadataElements()
  },
  methods: {
    /** 获取user数据 */
    getDataList (params = this.tableParams) {
      this.myHttp.getPageList(params, (result) => {
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
        this.myHttp.updateData(data, () => {
          this.handleCloseDialog()
        })
      } else if (this.dialogTitle == '新增') {
        this.myHttp.addData(data, () => {
          this.handleCloseDialog()
        })
      }
    },
    /**
     * @description 打开新增/编辑的窗口
     */
    handleOpenDialog (data, title) {
      this.dialogTitle = title
      this.rowData = data
      this.dialogVisible = true
    },
    /**
     * @description 关闭新增/编辑的窗口
     */
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
      this.myHttp.deleteData(data, this.idKey, () => {
        this.getDataList()
      })
    },
    async handleMetadataElements () {
      const roles = await findMetadataElements('role')
      for (let item of this.formElement) {
        if (item.label === '角色') {
          item.typeselects = roles.dataList.map(item => {
            return { label: item.elementName, value: item.elementValue }
          })
        }
      }
    },
    handleSubmitSearch (data) {
      this.getDataList({ ...this.tableParams, ...data })
    },
    handleOpenDrawer () {
      this.drawer = true
    },
    handleCloseDrawer () {
      this.drawer = false
    }
  }
}
</script>
<style lang='scss' scoped>
</style>