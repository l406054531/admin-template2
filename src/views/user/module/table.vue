<template>
  <div>
    <!-- prop 需要排序的字段 -->
    <el-table :data="tableData"
              border
              style="width: 100%; min-height: 500px"
              highlight-current-row
              :default-sort="{prop: '', order: ''}"
              @sort-change="sortChange"
              @selection-change="handleSelectionChange"
              :cell-style="{padding: '4px'}"
              :ref="defaultSelected?'mytable':''"
              height="600">
      <template v-for="(item, index) in tableHeader">
        <el-table-column v-if="item.prop==='operation'"
                         :label="item.label"
                         align="center"
                         :key="index"
                         :prop="item.prop"
                         :min-width="item.width">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       @click="handleResetPassword(scope.row)">重置密码<i class="el-icon-refresh" /></el-button>
            <el-button type="text"
                       size="small"
                       @click="handleViewImg(scope.row)">头像预览<i class="el-icon-refresh" /></el-button>
            <el-button type="text"
                       size="small"
                       @click="handleUpdate(scope.row)">编辑<i class="el-icon-edit" /></el-button>
            <el-button type="text"
                       size="small"
                       @click="handleDelete(scope.row)">删除<i class="el-icon-delete" /></el-button>

            <!-- <el-button type="text"
                       size="small"
                       @click="handleUserBinding(scope.row)">用户绑定<i class="el-icon-delete" /></el-button> -->

          </template>
        </el-table-column>

        <el-table-column v-else-if="item.type=='selection'"
                         :type="item.type"
                         :key="index"
                         align="center"
                         :min-width="item.width">
        </el-table-column>
        <!-- sortable排序  具体参考element文档 -->
        <el-table-column v-else
                         :label="item.label"
                         :type="item.type"
                         :sortable="item.sortable"
                         :key="index"
                         :prop="item.prop"
                         align="center"
                         :min-width="item.width">
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { findPageListApi, resetPassword } from '@/api/user.js';
export default {
  name: 'Mytable',
  props: {
    defaultSelected: {
      type: Boolean,
      default: false
    },
    tableHeader: {
      type: Array,
      default: function () {
        return [
        ]
      }
    },
    params: {
      type: Object,
      default: function () {
        return {}
      }
    },
    idKey: {
      type: String
    }

  },
  data () {
    return {
      Appdata: [], // user 表的data数据
      tableData: [],
    }
  },
  mounted () {
    this.findPageList(this.params)
  },
  methods: {
    /**获取数据列表 */
    findPageList (params) {
      findPageListApi(params).then(response => {
        if (response.statusCode === 200) {
          this.tableData = response.dataList
          this.$emit('tableDataList', response)
        }
      })
    },
    //搜索成功传过来的数据
    searchData (data) {
      this.tableData = data
    },
    /** 点击修改**/
    handleUpdate (data) {
      this.$emit('handleUpdate', data)
    },
    /** 点击删除**/
    handleDelete (data) {
      this.$emit('handleDelete', data)
    },
    /**图片预览 */
    handleViewImg (data) {
      this.$emit('handleViewImg', data)
    },
    /**排序 */
    sortChange (column) {
      let params = JSON.parse(JSON.stringify(this.params));
      let order = column.order === 'ascending' ? 'asc' : 'desc'
      params.sort = {}
      params.sort[column.prop] = order
      this.findPageList(params)
    },
    /**点击重置密码 */
    handleResetPassword (data) {
      this.$confirm("此操作将把密码重置为123456, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          resetPassword({ idUser: data.idUser }).then(response => {
            if (response.statusCode === 200) {
              this.$message({
                type: "success",
                message: "重置成功"
              });
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
    //勾选中的数据
    handleSelectionChange (val) {
      let idArr = val.map(item => {
        return item[this.idKey]  //根据当前模块需要的id进行修改
      })
      this.$emit("handleSelectionChange", idArr)
    },
  },

}
</script>

<style lang="scss" scoped>
</style>
