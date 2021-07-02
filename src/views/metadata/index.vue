<template>
  <div class="main">

    <div class="type">
      <el-button type="primary"
                 size="small"
                 plain
                 @click="typeManageClick">类型管理</el-button>
    </div>
    <div class="menu"
         :key="menuKey">
      <el-divider content-position="left">类型</el-divider>
      <div v-for="(item,index) in menuDataList"
           :key="index">
        <el-row>
          <el-link @click="activeLinkClick(item)"
                   :type="activeLink==item.typeField?'warning':'primary'"
                   :underline="false">
            {{item.typeName}}
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
      <my-table ref="table"
                v-if="menuDataList.length>0"
                :key="tableKey"
                :tableHeader="tableHeader"
                :params="params"
                :url="url"
                @handleDelete="handleDelete"
                @handleUpdate="handleUpdate"
                @handleSelectionChange="handleSelectionChange"
                @emitTableData="emitTableData"></my-table>
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
import { findAllMetadataTypeList, deleteMetadataTypeListApi, addListApi, deleteListApi } from "@/api/metadata"
export default {
  components: { myTable },
  data() {
    return {
      menuDataList: [], //左侧选项
      activeLink: '',//活跃的导航
      typeTableHeader: [ //新增类型的表格头部
        // { label: '', prop: '', type: 'selection' },
        { label: '-', prop: '', type: 'index' },
        { label: '名称', prop: 'typeName' },
        { label: '代码', prop: 'typeField' },
        { label: '操作', prop: 'dataOperation' }
      ],
      dataTableHeader: [  //新增数据的表格头部
        // { label: '', prop: '', type: 'selection' },
        { label: '-', prop: '', type: 'index' },
        { label: '名称', prop: 'elementName' },
        { label: '值', prop: 'elementValue' },
        { label: '操作', prop: 'dataOperation' }
      ],
      params: { typeField: '' },//默认参数
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
      typeDialogFormElement: [{ label: '名称', prop: 'typeName', type: 'input' }, { label: '代码', prop: 'typeField', type: 'input' }],//新增类型的表单元素
      typeDialogFormModel: {},//新增类型的双向绑定
      dataRules: {},//新增数据的表单验证
      dataDialogFormElement: [{ label: '名称', prop: 'elementName', type: 'input' }, { label: '值', prop: 'elementValue', type: 'input' }],//新增数据的表单元素
      dataDialogFormModel: {},//新增数据的双向绑定
      addTtile: '新增数据',//新增按钮的标题
      metadataTypeList: [],//所有的类型
      tableData: [],//表格数据
      dialogFormModel: {},
      menuKey: null,
    };
  },
  computed: {
    rules() {
      return this.addTtile === '新增类型' ? this.typeRules : this.dataRules
    },
    dialogFormElement() {
      return this.addTtile === '新增类型' ? this.typeDialogFormElement : this.dataDialogFormElement
    },
    // dialogFormModel() {
    //   return this.addTtile === '新增类型' ? this.typeDialogFormModel : this.dataDialogFormModel
    // },
    tableHeader() {
      return this.addTtile === '新增类型' ? this.typeTableHeader : this.dataTableHeader
    },
    url() {
      return this.addTtile === '新增类型' ? "metadataType" : "metadataElement"
    }
  },
  watch: {
    addTtile: {
      handler(val) {
        this.dialogFormModel = val === '新增类型' ? this.typeDialogFormModel : this.dataDialogFormModel
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.findAllMetadataTypeList()
  },
  methods: {
    emitTableData(v) {
      this.total = v.total
      this.tableData = v.data
    },
    activeLinkClick(item) {
      this.addTtile = "新增数据"
      this.dialogTitle = "新增"
      this.activeLink = item.typeField
      this.params.typeField = item.typeField
      this.tableKey = Math.random() * 100 + new Date()
    },
    /**操作页码 */
    handleSizeChange(paginationInfo) {
      this.params.pageNum = paginationInfo.currentPage;
      this.params.pageSize = paginationInfo.pagesize;
      this.paginationInfo.currentPage = paginationInfo.currentPage;
      this.paginationInfo.pagesize = paginationInfo.pagesize;
      this.tableKey = Math.random() * 100 + new Date();
    },
    /**勾选的数据 */
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    returnMessage(msg) {
      return this.$message({
        type: "warning",
        message: msg,
      });
    },
    /**弹出框取消按钮*/
    handleCloseDialog() {
      this.dialogFormVisible = false;
      this.register()
    },
    /**重置表单 */
    register(flag = true) {
      this.dialogFormModel = {}
      this.dialogFormElement.forEach((item) => {
        this.$set(this.dialogFormModel, item.prop, "");
      });
      if (flag) {
        this.$refs['myform'].$refs['myform'].resetFields();
      }
    },
    /**弹出框确定按钮 */
    handleDialogSubmit() {
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
    /**类型管理的点击事件 */
    typeManageClick() {
      this.addTtile = '新增类型'
      this.tableKey = Math.random() * 100 + new Date()

    },
    /**新增数据按钮的点击事件 */
    addBtnClick() {
      this.dialogFormVisible = true
      this.dialogTitle = "新增"
    },
    /**查询元数据所有类别 */
    findAllMetadataTypeList() {
      findAllMetadataTypeList().then(response => {
        if (response.status === 0) {
          this.metadataTypeList = response.data
          this.menuDataList = response.data.map(item => {
            return { typeName: item.typeName, typeField: item.typeField }
          })
          if (response.data.length > 0) {
            this.activeLink = response.data[0].typeField
            this.params.typeField = response.data[0].typeField
          }
          this.menuKey = Math.random() * 100 + new Date()
        }
      })
    },
    /**点击删除按钮 */
    handleDelete(row) {
      //   deleteListApi
      this.$confirm("此操作将把这条数据删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let postData = {}
          if (this.url === 'metadataElement') {
            postData['idMetadataElement'] = row['idMetadataElement']
          } else {
            postData['idMetadataType'] = row['idMetadataType']
          }
          deleteListApi(postData, this.url).then((response) => {
            if (response.status === 0) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.tableKey = Math.random() * 100 + new Date();

              if (this.url === 'metadataType') {
                this.findAllMetadataTypeList()
              }
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
    /**点击编辑按钮 */
    handleUpdate(row) {
      this.dialogTitle = "编辑"
      this.register(false)
      //赋值
      for (let item of this.dialogFormElement) {
        this.dialogFormModel[item['prop']] = row[item['prop']]
      }
      this.dialogFormVisible = true;
    },
    /**新增--异步请求 */
    saveData() {
      if (this.url == 'metadataElement') {
        this.dialogFormModel.typeField = this.activeLink
      }
      addListApi(this.dialogFormModel, this.url).then(response => {
        if (response.status === 0) {
          this.$message({
            type: "success",
            message: "新增",
          });
          this.tableKey = Math.random() * 100 + new Date()
          if (this.url === 'metadataType') {
            this.findAllMetadataTypeList()
          }
          this.handleCloseDialog()
        }
      })
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