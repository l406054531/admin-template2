<template>
  <div class="content">
    <div class="wrapper">
      <div>
        <el-button type="primary"
                   size="small"
                   @click="handleRefresh">刷新</el-button>
        <div class="search-block">
          <search-form :formModel="searchFormModel"
                       :formElement="searchFormElement"
                       @handleSearch="handleSearch"> </search-form>

        </div>
      </div>
      <!-- 表格 -->
      <div class="main">
        <!--handleDelete删除  tableDataList 表格数据 -->
        <div class="table">
          <my-table :tableHeader="tableHeader"
                    :params="tableParams"
                    :key="tableKey"
                    :idKey="idKey"
                    @handleDelete="handleDelete"
                    @tableDataList="tableDataList"
                    style="margin-bottom: 20px"
                    ref="mytableRef" />
        </div>
      </div>
      <!-- 分页 -->
      <div class="content-paging">
        <my-pagination v-on:handleSizeChange="handleSizeChange"
                       @handleCurrentChange="handleSizeChange"
                       :pagetotal="total"
                       :paginationInfo="paginationInfo"></my-pagination>
      </div>
    </div>
  </div>

</template>

<script>

import myTable from './module/table';  //表格
import { deleteListApi } from '@/api/accessRecord.js'; //异步方法
import { cityCascader } from '@public/static/json/cityCascader.json';
export default {
  components: { myTable },
  data () {
    return {
      tableHeader: [ //表格头部
        // { label: '', prop: '', type: 'selection' },
        { label: '-', prop: 'index', type: 'index' },
        { label: '国家', prop: 'nation' },
        { label: '省', prop: 'province' },
        { label: '市', prop: 'city' },
        { label: '区域', prop: 'district' },
        { label: '城市编码', prop: 'adcode' },
        { label: '经度', prop: 'longitude' },
        { label: '纬度', prop: 'latitude' },
        { label: 'ip', prop: 'ip' },
        { label: '访问时间', prop: 'createTime', width: "100" },
        { label: '操作', prop: 'operation', width: "80" },
      ],
      tableParams: { pageNum: 1, pageSize: 20 },  //表格请求参数
      tableKey: null,  //表格Key
      total: 0,   //数据总条数
      tableData: [],//表格数据
      size: 0,//当前页数据的大小
      paginationInfo: {   // 分页的信息
        currentPage: 1,
        pagesizes: [20, 50, 100, 200, 300],
        pagesize: 20  //默认每页固定条数
      },
      search: {},
      multipleSelection: [],//勾选框选择的内容
      idKey: 'idAccessRecord',
      searchFormModel: {},
      searchFormElement: [
        {
          label: "地区",
          prop: "region",
          type: "cascader",
          options: cityCascader,
          check: true,
          filterable: true
        },
      ]
    };
  },
  mounted () { },
  methods: {
    /**点击刷新 */
    handleRefresh () {
      this.tableParams.pageNum = 1;
      this.tableParams.pageSize = 20;
      this.paginationInfo.currentPage = 1;
      this.paginationInfo.pagesize = 20;
      this.tableKey = Math.random() * 100 + new Date();
    },
    /**表格数据 */
    tableDataList (data) {
      this.total = data.total
      this.size = data.size
      this.tableData = data.dataList
    },
    /**分页变动时 */
    handleSizeChange (paginationInfo) {
      this.tableParams.pageNum = paginationInfo.currentPage;
      this.tableParams.pageSize = paginationInfo.pagesize;
      this.paginationInfo.currentPage = paginationInfo.currentPage;
      this.paginationInfo.pagesize = paginationInfo.pagesize;
      this.tableKey = Math.random() * 100 + new Date();
    },
    /**点击表格删除--异步请求 */
    handleDelete (data) {
      this.$confirm("此操作将把这条数据放进回收站, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //id根据当前模块需要的id进行修改
          //   let id = data.id
          let postData = {}
          postData[this.idKey] = data[this.idKey]
          deleteListApi(postData).then((response) => {
            if (response.statusCode === 200) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.tableKey = Math.random() * 100 + new Date();
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

    /**搜索--异步请求 */
    handleSearch () {
      let params = {}
      let province = this.searchFormModel.region[0]
      let city = this.searchFormModel.region[1]
      if (province) {
        params.province = province
      }
      if (city) {
        params.city = city
      }
      params.pageNum = 1
      params.pageSize = this.paginationInfo.pagesize
      this.$refs.mytableRef.findPageList(params)
    },
  }
}

</script>
<style lang='scss' scoped>
.content {
  height: 100%;
  min-width: 1360px;
  width: 100%;
  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;

    padding: 10px;
    .search-block {
      float: right;
      height: 50px;
      span {
        margin: 0 10px;
        color: rgb(143, 138, 138);
      }
      .el-button {
        margin-left: 20px;
      }
    }
    .main {
      width: 100%;
      height: 100%;

      .table {
        flex: 1;
      }
    }
  }
}
</style>