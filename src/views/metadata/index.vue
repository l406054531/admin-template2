<template>
  <div class="main">
    <!-- <el-dropdown @command="handleCommand">
      <el-button type="primary">
        更多操作<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="revert">批量恢复</el-dropdown-item>
        <el-dropdown-item command="delete">批量删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
    <div class="type">
      <el-button type="primary"
                 size="small"
                 plain
                 @click="typeManageClick">类型管理</el-button>
    </div>
    <div class="menu">
      <el-divider content-position="left">类型</el-divider>
      <div v-for="(item,index) in menuDataList"
           :key="index">
        <el-row>
          <el-link @click="activeLinkClick(item)"
                   :type="activeLink==item.value?'warning':'primary'"
                   :underline="false">
            {{item.name}}
          </el-link>
          <el-divider></el-divider>
        </el-row>
      </div>
    </div>
    <div class="table">
      <div class="add">
        <el-button type="primary"
                   size="small"
                   plain
                   @click="addBtnClick">{{addTtile}}</el-button>
      </div>
      <my-table :key="tableKey"
                :tableHeader="tableHeader"
                :params="params"
                @handleSelectionChange="handleSelectionChange"
                @tableTotal="tableTotal"></my-table>
      <div class="content-paging">
        <my-pagination v-on:handleSizeChange="handleSizeChange"
                       @handleCurrentChange="handleSizeChange"
                       :pagetotal="total"
                       :paginationInfo="paginationInfo"></my-pagination>
      </div>
    </div>
    <!-- 弹出框 -->
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogFormVisible"
               :close-on-click-modal="false"
               width="500px"
               class="dialogClass"
               :before-close="handleCloseDialog">
      <!-- 表单 -->
      <my-form ref="myform"
               labelWidth="80px"
               :rules="rules"
               :formModel="dialogFormModel"
               :dialogFormElement="dialogFormElement"></my-form>
      <!--弹出框按钮 -->
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary"
                   @click="handleDialogSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import myTable from './module/table';

export default {
  components: { myTable },
  data () {
    return {
      menuDataList: [  //左侧选项
        {
          name: '港口信息',
          value: 'port', //接口路径url
          idKey: 'idPort' //请求接口需要的idkey
        },
        {
          name: '泊位信息',
          value: 'portBerth',//接口路径url
          idKey: 'idBerth'//请求接口需要的idkey
        },
        {
          name: '月吞吐量',
          value: 'portThroughputMonth',//接口路径url
          idKey: 'idThroughputMonth'//请求接口需要的idkey
        },
        {
          name: '年吞吐量',
          value: 'portThroughput',//接口路径url
          idKey: 'idThroughput'//请求接口需要的idkey
        },
        {
          name: '北部湾港航线',
          value: 'shipRouting', //接口路径url
          idKey: 'idShipRouting '//请求接口需要的idkey
        },
      ],
      activeLink: 'port',//活跃的导航
      typeTableHeader: [ //新增类型的表格头部
        { label: '', prop: '', type: 'selection' },
        { label: '-', prop: '', type: 'index' },
        { label: '名称', prop: 'name' },
        { label: '代码', prop: 'description' }, { label: '操作', prop: 'TypeOperation' }
      ],
      dataTableHeader: [  //新增数据的表格头部
        { label: '', prop: '', type: 'selection' },
        { label: '-', prop: '', type: 'index' },
        { label: '名称', prop: 'name' },
        { label: '操作', prop: 'dataOperation' }
      ],
      params: { pageNum: 1, pageSize: 20, query: { type: 'roles' } },//默认参数
      total: 0,   //数据总条数
      paginationInfo: {   // 分页的信息
        currentPage: 1,
        pagesizes: [20, 50, 100, 200, 300],
        pagesize: 20  //默认每页固定条数
      },
      tableKey: null,
      multipleSelection: [],//勾选的数据
      dialogTitle: "",//弹出框标题
      dialogFormVisible: false,//弹出框状态
      typeRules: {},//新增类型的表单验证
      typeDialogFormElement: [{ label: '名称', prop: 'typeName', type: 'input' }, { label: '代码', prop: 'description', type: 'input' }],//新增类型的表单元素
      typeDialogFormModel: {},//新增类型的双向绑定
      dataRules: {},//新增数据的表单验证
      dataDialogFormElement: [],//新增数据的表单元素
      dataDialogFormModel: {},//新增数据的双向绑定
      addTtile: '新增数据',//新增按钮的标题
    };
  },
  computed: {
    rules () {
      return this.addTtile === '新增类型' ? this.typeRules : this.dataRules
    },
    dialogFormElement () {
      return this.addTtile === '新增类型' ? this.typeDialogFormElement : this.dataDialogFormElement
    },
    dialogFormModel () {
      return this.addTtile === '新增类型' ? this.typeDialogFormModel : this.dataDialogFormModel
    },
    tableHeader () {
      return this.addTtile === '新增类型' ? this.typeTableHeader : this.dataTableHeader
    },
  },
  methods: {
    tableTotal (val) {
      this.total = val
    },
    activeLinkClick (item) {
      this.addTtile = "新增数据"
      this.activeLink = item.value
      this.params.url = item.value
      this.params.idKey = item.idKey
      this.tableKey = Math.random() * 100 + new Date()
    },
    /**操作页码 */
    handleSizeChange (paginationInfo) {
      this.params.pageNum = paginationInfo.currentPage;
      this.params.pageSize = paginationInfo.pagesize;
      this.paginationInfo.currentPage = paginationInfo.currentPage;
      this.paginationInfo.pagesize = paginationInfo.pagesize;
      this.tableKey = Math.random() * 100 + new Date();
    },
    /**勾选的数据 */
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCommand (command) {
      if (command == "revert") {
        this.handleBatchRevert()
      } else if (command == "delete") {
        this.handleBatchDelete()
      }
    },
    /**批量删除 */
    handleBatchDelete () {
      if (this.multipleSelection == 0) {
        return this.returnMessage("请勾选需要删除的数据")
      }
      this.$confirm("此操作将永久删除勾选中数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeBatchList(this.multipleSelection, this.params.url).then(response => {
            if (response.status === 0) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.tableKey = Math.random() * 100 + new Date()
            } else {
              this.$message({
                type: "error",
                message: response.message,
              });
            }
          })
        })
        .catch();
    },
    /**批量恢复 */
    handleBatchRevert () {
      if (this.multipleSelection == 0) {
        return this.returnMessage("请勾选需要恢复的数据")
      }
      this.$confirm("此操作将恢复勾选中数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          revertBatchList(this.multipleSelection, this.params.url).then(response => {
            if (response.status === 0) {
              this.$message({
                type: "success",
                message: "恢复成功",
              });
              this.tableKey = Math.random() * 100 + new Date()
            } else {
              this.$message({
                type: "error",
                message: response.message,
              });
            }
          })
        })
        .catch();

    },
    returnMessage (msg) {
      return this.$message({
        type: "warning",
        message: msg,
      });
    },
    /**弹出框取消按钮 */
    handleCloseDialog () {
      this.dialogFormVisible = false
    },
    /**弹出框确定按钮 */
    handleDialogSubmit () {

    },
    /**类型管理的点击事件 */
    typeManageClick () {
      this.addTtile = '新增类型'
    },
    /**新增按钮的点击事件 */
    addBtnClick () {
      this.dialogFormVisible = true
      this.dialogTitle = this.addTtile
    }
  }
}

</script>
<style lang='scss' scoped>
.main {
  .el-dropdown {
    position: absolute;
    right: 30px;
  }
  .type {
    position: absolute;
    left: 2%;
    top: 5%;
  }
  .menu {
    width: 13%;
    max-height: 760px;
    min-height: 760px;
    overflow: auto;
    border: 1px solid #dfe6ec;
    border-radius: 8px;
    margin: 50px 20px 0 20px;
    padding: 10px 20px 20px;
    // padding-top: 15px;
    float: left;
    .el-row {
      height: 60px;
      text-align: center;
    }
    .divider {
      background-color: #e6a23c;
    }
  }
  .table {
    float: left;
    margin-top: 50px;
    width: 84%;
    .add {
      position: absolute;
      top: 5%;
    }
    // max-height: 780px;
    // min-height: 780px;
  }
}
</style>