<template>
  <div class="main">

    <basics-table :data="tableData"
                  :params="tableParams"
                  :loading.sync="loading"
                  :searchFormElement="searchFormElement"
                  :header="tableConfig.getHeader()"
                  @handleRefresh="getDataList"
                  @handleSubmit="handleSubmitSearch"></basics-table>

    <basics-pagination class="pagination"
                       :total="pageTotal"
                       @handlePageParams="handlePageParams"
                       @handleSizeChange="handleSizeChange"
                       @handleCurrentChange="handleCurrentChange"></basics-pagination>

  </div>
</template>

<script>
import tableConfig from './config';
import { findPageListApi, deleteListApi } from '@/api/accessRecord.js';

export default {
  data () {
    return {
      tableData: [],
      tableParams: {
        pageNum: null,
        pageSize: null
      },
      pageTotal: null,
      idKey: 'idAccessRecord',
      loading: false
    }
  },
  computed: {
    tableConfig () {
      return tableConfig(this)
    },
    searchFormElement () {
      return this.tableConfig.getSearchElement()
    },
  },
  mounted () {
    this.getDataList(this.tableParams)
  },
  methods: {
    /**
     * 获取表格数据
     */
    getDataList (params) {
      findPageListApi(params).then(response => {
        this.tableData = response.dataList
        this.pageTotal = response.total
        this.loading = false
      })
    },
    /**
     * 获取表格参数
     */
    handlePageParams (val) {
      this.tableParams.pageNum = val.currentPage
      this.tableParams.pageSize = val.pageSize
    },
    /** 分页变动 */
    handleSizeChange (val) {
      this.tableParams.pageSize = val
      this.getDataList(this.tableParams)
    },
    /** 分页变动 */
    handleCurrentChange (val) {
      this.tableParams.pageNum = val
      this.getDataList(this.tableParams)
    },
    /**点击表格删除--异步请求 */
    handleDelete (data) {
      this.$confirm("此操作将把这条数据放进回收站, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let postData = {}
          postData[this.idKey] = data[this.idKey]
          deleteListApi(postData).then((response) => {
            if (response.statusCode === 200) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.getDataList()
            } else {
              this.$message({
                type: "error",
                message: response.message,
              });
            }
          });
        })
        .catch();
    },
    handleSubmitSearch (data) {
      let province = data.region[0]
      let city = data.region[1]
      console.log({ ...this.tableParams, province, city });
      this.getDataList({ ...this.tableParams, province, city })
    }

  }
}
</script>
<style lang='scss' scoped>
.main {
  .pagination {
    margin-top: 10px;
  }
}
</style>