<template>
  <div class="content">
    <div class="wrapper">
      <!-- 按钮 -->
      <div>
        <button-groud @add="handleAdd"
                      @refresh="handleRefresh"
                      @handleBatchDel="handleBatchDel" />
        <div class="search-block">
          <search-form :formModel="searchFormModel"
                       :formElement="searchFormElement"
                       @handleSearch="handleSearch"> </search-form>

        </div>
      </div>
      <!-- 表格 -->
      <div class="main">
        <!-- handleUpdate 修改 handleDelete删除  tableDataList 表格数据 -->
        <div class="table">
          <my-table :tableHeader="tableHeader"
                    :params="tableParams"
                    :key="tableKey"
                    :idKey="idKey"
                    @handleUpdate="handleUpdate"
                    @handleDelete="handleDelete"
                    @handleViewImg="handleViewImg"
                    @handleSelectionChange="handleSelectionChange"
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
      <el-dialog title="头像预览"
                 width="350px"
                 :visible.sync="dialogVisibleImg"
                 :close-on-click-modal="false"
                 class="dialogClass">
        <div>
          <el-image :src="imgSrc"></el-image>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>

import myTable from './module/table';  //表格
import { addListApi, deleteListApi, updateListApi } from '@/api/user.js'; //异步方法
import { batchDelete } from '@/api/batch'; //异步方法
import { findAllList } from '@/api/role.js'; //异步方法
import { cosUrl } from '@/config';

export default {
  components: { myTable },
  //   name:"角色管理",
  data () {
    return {
      tableHeader: [ //表格头部
        { label: '', prop: '', type: 'selection' },
        { label: '-', prop: 'index', type: 'index' },
        { label: '用户账号', prop: 'username' },
        { label: '用户名称', prop: 'nickname' },
        { label: '角色', prop: 'userRole' },
        { label: '手机号码', prop: 'phone' },
        { label: '邮箱', prop: 'email' },
        { label: '操作', prop: 'operation', width: "130" },
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
        username: [{ required: true, message: '请输入用户账号', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        nickname: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
        userRole: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        // longitude: [{ validator: longitudeCheck, trigger: 'change' }],
      },
      dialogFormModel: {}, //表单双向绑定
      dialogFormElement: [
        { label: '用户账号', prop: 'username', type: 'input' },
        { label: '用户名称', prop: 'nickname', type: 'input' },
        { label: '角色', prop: 'userRole', type: 'select', selectLabel: 'elementName', selectValue: 'elementValue', typeselects: [] },
        { label: '', prop: 'idUser', type: 'id' },
      ], //表单元素
      FormElement: [ // 基础的表单元素
        { label: '用户账号', prop: 'username', type: 'input' },
        { label: '用户名称', prop: 'nickname', type: 'input' },
        { label: '角色', prop: 'userRole', type: 'select', selectLabel: 'elementName', selectValue: 'elementValue', typeselects: [] },
        { label: '手机号码', prop: 'phone', type: 'input' },
        { label: '邮箱', prop: 'email', type: 'input' },
        { label: '', prop: 'idUser', type: 'id' },
      ],
      search: {},
      multipleSelection: [],//勾选中数据的id数组值
      idKey: 'idUser',
      url: 'user',
      searchFormModel: {},// 搜索表单
      searchFormElement: [// 搜索表单的元素
        {
          label: "用户名称",
          prop: "nickname",
          type: "input",
          clear: () => {
            this.handleSearch()
          }
        },
      ],
      dialogVisibleImg: false,// 预览头像弹出框状态
      imgSrc: '',//头像图片地址
    };
  },
  mounted () {
    this.findAllRoleList()
  },
  methods: {
    /**点击新增 */
    handleAdd () {
      this.dialogTitle = '新增';
      let el = JSON.parse(JSON.stringify(this.FormElement))
      const obj = { label: '用户密码', prop: 'password', type: 'input', showPassword: true }
      el.splice(1, 0, obj)
      this.dialogFormElement = el
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
      this.dialogFormElement = this.FormElement
      this.register(false)
      //赋值
      for (let item of this.dialogFormElement) {
        this.dialogFormModel[item['prop']] = data[item['prop']]
      }
      this.dialogFormVisible = true;
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
      params.nickname = this.searchFormModel.nickname
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
    /**
     * 获取所有角色
     */
    findAllRoleList () {
      findAllList().then(response => {
        if (response.statusCode === 200) {
          let arr = response.dataList.map(item => {
            return { label: item.roleName, value: item.roleField }
          })
          for (let item of this.FormElement) {
            if (item.label === '角色') {
              item.typeselects = arr
            }
          }
        }
      })
    },
    /**
     * 头像预览
     */
    handleViewImg (data) {
      this.imgSrc = data.imgName == "" ? cosUrl + "user.png" : cosUrl + data.imgName
      this.dialogVisibleImg = true
    },
    /**
     * 批量删除
     */
    handleBatchDel () {
      let params = {}
      params[this.idKey] = this.multipleSelection.toString()
      batchDelete(params, this.url).then(() => {
        this.tableKey = Math.random() * 100 + new Date();
      })
    },
    /**
     * 勾选中的数据的id数组值
     */
    handleSelectionChange (idArr) {
      this.multipleSelection = idArr
    }
  }
}

</script>
<style lang='scss' scoped>
.content {
  height: 100%;
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
      height: 100%;

      .table {
        flex: 1;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
::v-deep {
  .el-dialog__body {
    text-align: center;
  }
}
</style>