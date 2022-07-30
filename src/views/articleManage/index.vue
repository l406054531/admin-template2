<template>
  <div class="user">
    <basics-table :data="tableData"
                  :header="header"
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
  </div>
</template>

<script>
import useHttp from "@/utils/http"
import { findMetadataElements } from "@/api/metadata"
import getDefaultOperate from '@/components/Table/default-operate.js';
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
      loading: true,
      idKey: 'idArticle',
      httpUrl: 'article'

    }
  },
  computed: {
    searchFormElement () {
      return [
        { label: '标题', prop: 'title', type: 'input' },
        { label: '类型', prop: 'type', type: 'input' },
        { label: '状态', prop: 'status', type: 'input' }
      ]
    },
    useHttp () {
      return useHttp(this.httpUrl, this)
    },
    header () {
      const header = [
        { label: '', prop: '', type: 'selection' },
        { label: '-', prop: 'index', type: 'index' },
        { label: '标题', prop: 'title' },
        { label: '类型 ', prop: 'type' },
        { label: 'URL', prop: 'url' },
        { label: '状态', prop: 'status' },
        { label: '创建时间', prop: 'createTime' },
        { label: '创建人', prop: 'createUser' },
        getDefaultOperate(this) // .vue页面的data里定义有headerOperate就用.vue页面的headerOperate,没有就用默认的operate
      ]
      return header
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    /** 获取user数据 */
    getDataList (params = this.tableParams) {
      this.useHttp.getPageList(params, (result) => {
        this.tableData = result.dataList.map(item=>{
          item.labels=item.labels.split(",")
          return item
        })
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

    /**
     * @description 打开新增/编辑的窗口
     */
    handleOpenDialog (data, title) {
      this.dialogTitle = title
      this.rowData = data
    },
    /**
     * @description 关闭新增/编辑的窗口
     */
    handleCloseDialog () {
      this.getDataList()
    },

    handleAdd () {
      // this.handleOpenDialog({}, '新增')
      this.$router.push({
        path: '/manage/articleEdit',
        query: {
          title: '新增'
        }
      })
    },
    /**点击修改按钮 */
    handleUpdate (data) {
      // this.handleOpenDialog(data, '编辑')
      this.$router.push({
        path: '/manage/articleEdit',
        query: {
          title: '编辑',
          data
        }
      })
    },
    /**点击表格删除--异步请求 */
    handleDelete (data) {
      this.useHttp.deleteData(data, this.idKey, () => {
        this.getDataList()
      })
    },
    async handleMetadataElements () {
      const labels=findMetadataElements('article-label')
    },
    handleSubmitSearch () { }
  }
}
</script>
<style lang='scss' scoped>
</style>