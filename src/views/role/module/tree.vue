<template>
  <div>
    <el-button type="success"
               size="small"
               @click="getCheckedNodes">保存</el-button>
    <div class="tree">
      <el-tree ref="tree"
               :data="treeData"
               :key="treeKey"
               show-checkbox
               default-expand-all
               node-key="idView"
               :default-checked-keys="defaultChecked"
               :expand-on-click-node="false"
               :props="defaultProps">
      </el-tree>
    </div>

  </div>
</template>

<script>

import { findAllListApi } from '@/api/viewManage'
import { addMandateListApi,findAllManDate } from "@/api/mandate"
import { formatTree } from "@/utils"
export default {
  props: {
    currentRoleInfo: Object
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      defaultExpanded: [],//默认展开的节点
      defaultChecked: [],//默认选择的节点
      treeKey: null,
      allPageList: [],//全部的页面
      rolePageList: [],//角色授权的页面
    };
  },

  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.findAllList()
      this.findPermission({ role: this.currentRoleInfo.roleField })
    },
    //获取所有的页面
    findAllList() {
      findAllListApi().then(response => {
        this.allPageList = response.dataList
        this.treeData = formatTree(response.dataList, "idParent", "idView")
      })
    },
    //获取角色授权的页面
    findPermission(params) {
      findAllManDate(params).then(response => {
        this.rolePageList = response.dataList
        let data = formatTree(response.dataList, "idParent", "idView")
        for (let item of data) {
          if (item.children) {
            this.defaultExpanded.push(item.idView)
            for (let cItem of item.children) {
              this.defaultChecked.push(cItem.idView)
            }
          } else {
            this.defaultChecked.push(item.idView)
          }
        }
        this.treeKey = new Date() + Math.random() * 100
      })
    },
    // 保存 --异步
    getCheckedNodes() {
      let allData = this.$refs.tree.getCheckedNodes(false, true).map(item => { //获取所有勾选中的选项
        return item
      })
      // 参数
      let postData = {
        role: this.currentRoleInfo.roleField,
        data: allData
      }
      addMandateListApi(postData).then(response => {
        if (response.statusCode === 200) {
          this.$message({
            type: "success",
            message: "更新成功",
          });
          this.$emit("closeDrawer")
        }
      })
    }
  }
}

</script>
<style lang='scss' scoped>
.el-button {
  margin-left: 20px;
}
.tree {
  padding: 20px;
}
</style>