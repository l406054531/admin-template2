<template>
  <div class="content">
    <div class="grid">
      <el-card>
        <div class="wrapper">
          <el-button type="success"
                     size="small"
                     @click="handleAdd('新增一级菜单')">新增一级菜单</el-button>
          <el-button type="primary"
                     size="small"
                     :disabled="AddChildrenShow"
                     @click="handleAdd('新增子级菜单')">新增子级菜单</el-button>
          <div class="tree">
            <el-tree ref="tree"
                     :data="treeData"
                     :key="treeKey"
                     default-expand-all
                     node-key="idPage"
                     :expand-on-click-node="false"
                     :highlight-current="true"
                     :props="defaultProps"
                     @node-click="nodeClick">
              <span class="custom-tree-node"
                    slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button type="text"
                             size="mini"
                             @click="() => handleDelete(node, data)">删除</el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </el-card>

      <el-card>
        <el-row>编辑菜单：{{ menusNodeName }}</el-row>
        <el-divider></el-divider>
        <el-alert type="success"
                  title="从菜单列表选择一项后，进行编辑"
                  show-icon
                  :closable="false"></el-alert>
        <div v-show="showForm"
             style="margin-top:10px">
          <basics-form ref="myform"
                       labelWidth="100px"
                       formSize="mini"
                       btnText="保存"
                       :rowData="rowData"
                       :rules="rules"
                       :formElement="formElement"
                       @handleSubmit="updateData"></basics-form>
          <!-- <el-button type="success"
                     size="mini"
                     @click="updateData">保存</el-button> -->
        </div>
      </el-card>
    </div>
    <el-drawer :title="drawerTitle"
               :visible.sync="drawerShow"
               :direction="direction"
               :destroy-on-close="true"
               size="23%">
      <el-divider></el-divider>
      <div style="height:80%;">
        <my-form ref="myform"
                 labelWidth="100px"
                 :rules="rules"
                 :formModel="AddFormModel"
                 :dialogFormElement="formElement"></my-form>
      </div>
      <el-divider></el-divider>
      <div style="padding:0 10px;float:right">
        <el-button type="success"
                   @click="handleSubmit">提交</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  findAllListApi,
  addListApi,
  deleteListApi,
  updateListApi,
} from '@/api/viewManage';
import { formatTree } from '@/utils';
export default {
  data () {
    return {
      treeData: [],
      treeKey: null,
      defaultProps: {
        children: 'children',
        label: 'title',
      },
      dialogTitle: '新增',
      dialogFormVisible: false, //弹出框状态
      rules: {
        //表单验证
        path: [{ required: true, message: '请输入路径', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
      },
      formModel: {}, //表单双向绑定
      AddFormModel: {}, //表单双向绑定
      formElement: [
        //表单元素
        { label: '路径', prop: 'path', type: 'input' },
        { label: '名称', prop: 'name', type: 'input' },
        { label: '标题', prop: 'title', type: 'input' },
        { label: '图标', prop: 'icon', type: 'input' },
        { label: '', prop: 'idPage', type: 'id' },
      ],
      idKey: 'idView',
      idParent: 0,
      showForm: false, // 右侧from表单状态
      menusNodeName: '', //导航节点的名称
      drawerTitle: '', //抽屉标题
      drawerShow: false, //抽屉状态
      direction: 'rtl', //抽屉状态
      rowData: {}
    };
  },
  mounted () {
    this.findAllList();
  },
  computed: {
    AddChildrenShow () {
      // 新增子级菜单按钮的状态
      return !this.showForm;
    },
  },
  methods: {
    /**弹出框取消按钮*/
    handleCloseDialog () {
      this.dialogFormVisible = false;
      this.register();
    },
    /**重置表单 */
    register (flag = true) {
      this.formModel = {};
      this.formElement.forEach((item) => {
        this.$set(this.formModel, item.prop, '');
      });
      if (flag) {
        this.$refs['myform'].$refs['myform'].resetFields();
      }
    },
    /**弹出框确定按钮*/
    handleDialogSubmit () {
      if (flag) {
        switch (this.dialogTitle) {
          case '新增':
            this.saveData();
            break;
          case '编辑':
            this.updateData();
            break;
        }
      } else {
        return false;
      }
    },
    /**点击新增一级菜单按钮 */
    handleAdd (title) {
      this.drawerTitle = title;
      this.drawerShow = true;
      //   this.dialogFormVisible = true
      //   this.dialogTitle = "新增"
      //   this.idParent = 0
    },

    /**新增子节点 */
    handleNode (data) {
      this.dialogFormVisible = true;
      this.dialogTitle = '新增';
      this.idParent = data.idPage;
    },
    /*删除节点*/
    handleDelete (node, data) {
      this.$confirm('此操作将把这条数据删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          //id根据当前模块需要的id进行修改
          //   let id = data.id
          let postData = {};
          postData[this.idKey] = data[this.idKey];
          deleteListApi(postData).then((response) => {
            if (response.statusCode === 200) {
              this.$message({
                type: 'success',
                message: '删除成功',
              });
              this.findAllList();
              this.showForm = false;
            } else {
              this.$message({
                type: 'error',
                message: response.message,
              });
            }
          });
        })
        .catch();
    },
    /**编辑节点 */
    handleEdit (data) {
      this.dialogTitle = '编辑';
      this.register(false);
      for (let item of this.formElement) {
        this.formModel[item['prop']] = data[item['prop']];
      }
      this.dialogFormVisible = true;
    },
    /**获取所有的页面--异步请求 */
    findAllList () {
      findAllListApi().then((response) => {
        this.allPageList = response.dataList;
        this.treeData = formatTree(response.dataList, 'idParent', 'idView');
        this.treeKey = new Date() + Math.random() * 1000;
      });
    },
    /**新增--异步请求 */
    saveData (postData) {
      addListApi(postData).then((response) => {
        console.log(response);
        if (response.statusCode === 200) {
          this.drawerShow = false;
          this.findAllList();
          this.$message({
            type: 'success',
            message: '新增成功',
          });
        }
      });
    },
    /**编辑--异步操作 */
    updateData () {
      let postData = JSON.parse(JSON.stringify(this.formModel));
      updateListApi(postData).then((response) => {
        if (response.statusCode === 200) {
          this.$message({
            type: 'success',
            message: '保存成功',
          });
        }
      });
    },
    /**
     * 点击节点时
     */
    nodeClick (data, node, self) {
      this.showForm = true;
      this.menusNodeName = data.title;
      this.idParent = data[this.idKey];
      this.rowData = data;
      console.log(data);
    },
    /**
     * 弹出框提交按钮
     */
    handleSubmit () {
      let data = JSON.parse(JSON.stringify(this.AddFormModel));
      data.idParent = this.drawerTitle == '新增一级菜单' ? '0' : this.idParent;
      //   console.log(data);
      this.saveData(data);
    },
  },
};
</script>
<style lang="scss" scoped>
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

  width: 100%;
  padding: 10px;
  .grid {
    display: grid;
    grid-template-columns: 35% 64%;
    grid-gap: 1%;
    .wrapper {
      width: 100%;
      height: 100%;
      .tree {
        margin-top: 15px;
      }
    }
  }
}
</style>
