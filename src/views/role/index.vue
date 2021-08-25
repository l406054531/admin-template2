<template>
  <div class="content">
    <div class="wrapper">
      <!-- 按钮 -->
      <div style="margin-bottom:10px">
        <button-groud @add="handleAdd"
                      @refresh="handleRefresh" />
        <!-- 
        <excelButton :url="url"
                     @handleExprotExcel="handleExprotExcel"
                     @hanldeImportExcel="hanldeImportExcel"></excelButton> -->

        <div class="search-block">
          <!-- <span>名称:</span>
          <el-input placeholder="请输入名称"
                    v-model="search.name"
                    @clear="handleSearch"
                    clearable>
          </el-input>
          <span>类别:</span>
          <el-select v-model="search.type"
                     placeholder="请选择"
                     filterable
                     clearable
                     @clear="handleSearch">
            <el-option v-for="item in portInfoList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.label">
            </el-option>
          </el-select>
          <el-button icon="el-icon-search"
                     @click="handleSearch"
                     circle></el-button> -->
        </div>

      </div>
      <!-- 表格 -->
      <div class="main">
        <!-- handleUpdate 修改 handleDelete删除  tableDataList 表格数据  handleSelectionChange 勾选中的数据  -->
        <div class="table">
          <my-table :tableHeader="tableHeader"
                    :params="tableParams"
                    :key="tableKey"
                    :idKey="idKey"
                    @handleUpdate="handleUpdate"
                    @handleDelete="handleDelete"
                    @tableDataList="tableDataList"
                    @handlePermissionAssignmen="handlePermissionAssignmen"
                    @handleSelectionChange="handleSelectionChange"
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
    <!-- 操作弹出框 -->
    <div>
      <el-dialog :title="dialogTitle"
                 :visible.sync="dialogFormVisible"
                 :close-on-click-modal="false"
                 width="550px"
                 class="dialogClass"
                 :before-close="handleCloseDialog">
        <!-- 表单 -->
        <my-form ref="myform"
                 labelWidth="100px"
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

      <el-drawer title="权限分配"
                 size="20%"
                 :visible.sync="drawer"
                 :direction="direction">
        <tree :currentRoleInfo="currentRoleInfo"
              @closeDrawer="closeDrawer"
              v-if="drawer" />
      </el-drawer>

    </div>
  </div>

</template>

<script>

import myTable from './module/table';  //表格
import tree from './module/tree.vue';  //表格
import { addListApi, deleteListApi, updateListApi } from '@/api/role.js'; //异步方法

export default {
  components: { myTable, tree },
  //   name:"角色管理",
  data () {
    return {
      tableHeader: [ //表格头部
        // { label: '', prop: '', type: 'selection' },
        { label: '-', prop: 'index', type: 'index' },
        { label: '角色字段', prop: 'roleField' },
        { label: '角色名称', prop: 'roleName' },
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
      dialogTitle: '新增',  //弹出框头部标题
      dialogFormVisible: false,  //弹出框状态
      rules: {   //表单验证
        roleField: [{ required: true, message: '请输入字段', trigger: 'blur' }],
        roleName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        // longitude: [{ validator: longitudeCheck, trigger: 'change' }],
      },
      dialogFormModel: {}, //表单双向绑定
      dialogFormElement: [  //表单元素
        { label: '角色字段', prop: 'roleField', type: 'input' },
        { label: '角色名称', prop: 'roleName', type: 'input' },
        { label: '', prop: 'idRole', type: 'id' },
      ],
      search: {

      },
      multipleSelection: [],//勾选框选择的内容
      idKey: 'idRole',

      drawer: false,//抽屉状态
      direction: 'rtl',//抽屉方向
      currentRoleInfo: {},//点击权限分配后的当前条角色的信息

    };
  },
  mounted () {

  },
  methods: {
    /**点击新增 */
    handleAdd () {
      this.dialogTitle = '新增';
      this.dialogFormVisible = true;
    },
    /**点击刷新 */
    handleRefresh () {
      this.tableParams.pageNum = 1;
      this.tableParams.pageSize = 20;
      this.paginationInfo.currentPage = 1;
      this.paginationInfo.pagesize = 20;
      this.tableKey = Math.random() * 100 + new Date();
    },
    /**点击表格修改 */
    handleUpdate (data) {
      this.dialogTitle = '编辑';
      this.register(false)
      //赋值
      for (let item of this.dialogFormElement) {
        this.dialogFormModel[item['prop']] = data[item['prop']]
      }
      this.dialogFormVisible = true;
    },
    /**已勾选的数据 */
    handleSelectionChange (val) {
      this.multipleSelection = val
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
    /**弹出框取消按钮*/
    handleCloseDialog () {
      this.dialogFormVisible = false;
      this.register()
    },
    /**重置表单 */
    register (flag = true) {
      this.dialogFormModel = {}
      this.dialogFormElement.forEach((item) => {
        this.$set(this.dialogFormModel, item.prop, "");
      });
      if (flag) {
        this.$refs['myform'].$refs['myform'].resetFields();
      }
    },
    /** 点击权限分配 */
    handlePermissionAssignmen (data) {
      this.currentRoleInfo = data
      this.drawer = true
    },
    /**点击表格删除--异步请求 */
    handleDelete (data) {
      this.$confirm("此操作将把这条数据删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //id根据当前模块需要的id进行修改
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
    /**新增数据-异步请求 */
    saveData () {
      let postData = JSON.parse(JSON.stringify(this.dialogFormModel));
      let obj = JSON.parse(JSON.stringify(postData))  //因为postData可能还会进行别的操作   所以重新定义一个obj
      addListApi(postData).then(response => {
        obj[this.idKey] = response.data
        if (response.statusCode === 200) {
          this.$message({
            type: "success",
            message: "新增成功",
          });
          this.total++
          this.tableData.unshift(obj)  // 异步完成后  在表格数据 索引0 新增输入的数据
          if (this.paginationInfo.pagesize <= this.size) { // 如果当前页数据的大小大于或者等于分页组件控制的每页数据大小  则删除数组最后一条数据（只是删除数组数据并不会影响元数据）
            this.tableData.pop()
          }
          this.handleCloseDialog()
        } else {
          this.$message({
            type: "error",
            message: response.message,
          });
        }
      })
    },
    /**修改数据-异步请求 */
    updateData () {
      let postData = JSON.parse(JSON.stringify(this.dialogFormModel));
      updateListApi(postData).then(response => {
        if (response.statusCode === 200) {
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.tableKey = Math.random() * 100 + new Date();
          this.handleCloseDialog()
        } else {
          this.$message({
            type: "error",
            message: response.message,
          });
        }
      })
    },
    /**搜索--异步请求 */
    handleSearch () {
      let params = {}
      params.pageNum = 1
      params.pageSize = this.paginationInfo.pagesize
      params.query = {}

      this.tableParams.query = params.query
      this.$refs.mytableRef.findPageList(params)
    },

    /**弹出框确定按钮*/
    handleDialogSubmit () {
      let flag = this.$refs["myform"].validateForm();
      if (flag) {
        switch (this.dialogTitle) {
          case "新增":
            this.saveData();
            break;
          case "编辑":
            this.updateData();
            break;
        }
      } else {
        return false;
      }
    },
    closeDrawer () {
      this.drawer = false
    }
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
      span {
        margin: 0 10px;
        color: rgb(143, 138, 138);
      }
      .el-input {
        width: 35%;
      }
      .el-button {
        margin-left: 20px;
      }
    }
    .main {
      width: 100%;
      .table {
        flex: 1;
      }
    }
  }
}
</style>