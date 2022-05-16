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
                     :disabled="addChildrenShow"
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
                     @node-click="handleNodeClick">
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
          <basics-form labelWidth="100px"
                       formSize="mini"
                       btnText="保存"
                       :rowData="rowData"
                       :rules="rules"
                       :formElement="formElement"
                       @handleSubmit="updateData"></basics-form>
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
        <basics-form labelWidth="100px"
                     btnText="提交"
                     submitBtn
                     :rules="rules"
                     :formElement="formElement"
                     @handleSubmit="addData"></basics-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import useHttp from "@/utils/http"
import { formatTree } from '@/utils';
export default {
  data () {
    const pathReg = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入路径'));
      }
      const reg = /^\/[A-Za-z0-9]{4,8}$/g
      if (reg.test(value)) {
        callback()
      } else {
        callback('格式错误，/开头后面至少4位、至多8位字母或数字')
      }
    }
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
        path: [{ required: true, validator: pathReg, trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
      },
      formModel: {}, //表单双向绑定
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
      rowData: {},
      httpUrl: 'view'
    };
  },
  computed: {
    useViewHttp () {
      return useHttp(this.httpUrl, this)
    },
    addChildrenShow () {
      // 新增子级菜单按钮的状态
      return !this.showForm;
    },
  },
  mounted () {
    this.findAllList()
  },

  methods: {
    /**点击新增一级菜单按钮 */
    handleAdd (title) {
      this.drawerTitle = title;
      this.drawerShow = true;
    },
    /**获取所有的页面--异步请求 */
    findAllList () {
      this.useViewHttp.getAllData((result) => {
        this.allPageList = result.dataList;
        this.treeData = formatTree(result.dataList, 'idParent', 'idView');
      })
    },
    /**点击节点时 */
    handleNodeClick (data, node, self) {
      this.showForm = true;
      this.menusNodeName = data.title;
      this.idParent = data[this.idKey];
      this.rowData = data;
    },
    updateData (data) {
      this.useViewHttp.updateData(data)
    },
    addData (data) {
      const idParent = this.idParent
      this.useViewHttp.addData({ ...data, idParent }, () => {
        this.findAllList()
        this.drawerShow = false
      })
    },
    handleDelete (node, data) {
      this.useViewHttp.deleteData(data, 'idView', () => {
        this.findAllList()
        this.rowData = {}
      })
    }
  }


}
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