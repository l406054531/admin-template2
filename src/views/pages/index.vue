<template>
  <div class="content">
    <div class="wrapper">
      <el-button type="success"
                 @click="handleAdd"
                 size="small">新增一级菜单</el-button>
      <div class="tree">
        <el-tree ref="tree"
                 :data="treeData"
                 :key="treeKey"
                 default-expand-all
                 node-key="idPage"
                 :expand-on-click-node="false"
                 :props="defaultProps">
          <span class="custom-tree-node"
                slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text"
                         size="mini"
                         @click="() => handleNode(data)">
                新增
              </el-button>
              <el-button type="text"
                         size="mini"
                         @click="() => handleEdit(data)">
                编辑
              </el-button>
              <el-button type="text"
                         size="mini"
                         @click="() => handleDelete(node, data)">
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>

    <!-- 操作弹出框 -->
    <div>
      <el-dialog :title="dialogTitle"
                 :visible.sync="dialogFormVisible"
                 :close-on-click-modal="false"
                 width="500px"
                 class="dialogClass"
                 :before-close="handleCloseDialog">
        <!-- 表单 -->
        <my-form ref="myform"
                 labelWidth="50px"
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
  </div>

</template>

<script>
import { findAllListApi, addListApi, deleteListApi, updateListApi } from "@/api/pages"
import { formatTree } from "@/utils"
export default {
  components: {},
  data() {
    return {
      name: "页面管理",
      treeData: [],
      treeKey: null,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      dialogTitle: '新增',
      dialogFormVisible: false,  //弹出框状态
      rules: {   //表单验证
        path: [{ required: true, message: '请输入路径', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
      },
      dialogFormModel: {}, //表单双向绑定
      dialogFormElement: [  //表单元素
        { label: '路径', prop: 'path', type: 'input' },
        { label: '名称', prop: 'name', type: 'input' },
        { label: '标题', prop: 'title', type: 'input' },
        { label: '图标', prop: 'icon', type: 'input' },
        { label: '', prop: 'idPage', type: 'id' },
      ],
      idKey: 'idPage',
      idParent: 0,
    };
  },
  mounted() {
    this.findAllList()
  },
  methods: {
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
    /**弹出框确定按钮*/
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
    /**点击新增一级菜单按钮 */
    handleAdd() {
      this.dialogFormVisible = true
      this.dialogTitle = "新增"
      this.idParent = 0
    },

    /**新增子节点 */
    handleNode(data) {
      this.dialogFormVisible = true
      this.dialogTitle = "新增"
      this.idParent = data.idPage
    },
    /*删除节点*/
    handleDelete(node, data) {
      this.$confirm("此操作将把这条数据删除, 是否继续?", "提示", {
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
            if (response.status === 0) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.findAllList()
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
    /**编辑节点 */
    handleEdit(data) {
      this.dialogTitle = "编辑"
      this.register(false)
      for (let item of this.dialogFormElement) {
        this.dialogFormModel[item['prop']] = data[item['prop']]
      }
      this.dialogFormVisible = true;
    },
    /**获取所有的页面--异步请求 */
    findAllList() {
      findAllListApi().then(response => {
        this.allPageList = response.data
        this.treeData = formatTree(response.data, "idParent", "idPage")
        this.treeKey = new Date() + Math.random() * 1000
      })
    },
    /**新增--异步请求 */
    saveData() {
      let postData = JSON.parse(JSON.stringify(this.dialogFormModel));
      postData.idParent = this.idParent
      addListApi(postData).then(response => {
        if (response.status === 0) {
          this.findAllList()
          this.$message({
            type: "success",
            message: "新增成功",
          });
          this.handleCloseDialog()
        }

      })
    },
    /**编辑--异步操作 */
    updateData() {
      let postData = JSON.parse(JSON.stringify(this.dialogFormModel));
      updateListApi(postData).then(response => {
        if (response.status === 0) {
          this.findAllList()
          this.$message({
            type: "success",
            message: "编辑成功",
          });
          this.handleCloseDialog()
        }

      })
    },
  }
}

</script>
<style lang='scss' scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.content {
  height: 100%;
  min-width: 1360px;
  width: 100%;
  .wrapper {
    width: 100%;
    padding: 20px;
    height: 100%;
    .tree {
      height: 90%;
      width: 20%;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-top: 15px;
      padding: 10px;
    }
  }
}
</style>