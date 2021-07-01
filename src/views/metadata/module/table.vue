<template>
  <div>
    <el-table :data="tableData"
              border
              style=" min-height: 730px"
              highlight-current-row
              @selection-change="handleSelectionChange"
              :cell-style="{padding: '4px'}"
              :ref="defaultSelected?'mytable':''"
              height="690">
      <template v-for="(item, index) in tableHeader">
        <el-table-column v-if="item.prop==='dataOperation'"
                         :label="item.label"
                         align="center"
                         :key="index"
                         :prop="item.prop"
                         :min-width="item.width">
          <template slot-scope="scope">
            <span>启用:</span>
            <el-switch v-model="scope.row.enable"
                       active-color="#13ce66">
            </el-switch>
            <el-button type="primary"
                       plain
                       size="small"
                       @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="danger"
                       plain
                       size="small"
                       @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column v-else-if="item.prop==='typeOperation'"
                         :label="item.label"
                         align="center"
                         :key="index"
                         :prop="item.prop"
                         :min-width="item.width">
          <template slot-scope="scope">
            <el-button type="primary"
                       plain
                       size="small"
                       @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="danger"
                       plain
                       size="small"
                       @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column v-else-if="item.type=='selection'"
                         :type="item.type"
                         :key="index"
                         align="center"
                         :min-width="item.width">
        </el-table-column>
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
import { findPageListApi } from '@/api/metadata';
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

  },
  data () {
    return {
      tableData: [],
    }
  },
  mounted () {
    this.findPageList(this.params)
    console.log(this.params);

  },
  watch: {
    params: function (value, oldValue) {
      debugger
    }
  },
  methods: {
    /**获取数据列表 */
    findPageList (data) {
      let getData = JSON.stringify(data);
      findPageListApi({ params: getData }).then(response => {
        if (response.status === 0) {
          this.tableData = response.data
          this.$emit('tableTotal', response.data.total)
        }
      })
    },
    /**点击删除 */
    handleDelete (data) {
      let key = this.params.idKey
      let params = {}
      params[key] = data[key]
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteList(params, this.params.url).then(response => {
            if (response.status === 0) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.findPortPageList(this.params)
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
    /**批量数据 */
    handleSelectionChange (val) {
      let key = this.params.idKey
      let idArr = val.map(item => {
        return item[key]
      })
      this.$emit("handleSelectionChange", idArr)
    },
    /**恢复 */
    handleUpdate (data) {
      let key = this.params.idKey
      let params = {}
      params[key] = data[key]
      this.$confirm("此操作将恢复该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          revertList(params, this.params.url).then(response => {
            if (response.status === 0) {
              this.$message({
                type: "success",
                message: "恢复成功",
              });
              this.findPortPageList(this.params)
            } else {
              this.$message({
                type: "error",
                message: response.message,
              });
            }
          });
        })
        .catch();
    }
  },

}
</script>

<style lang="scss" scoped>
.el-switch {
  margin-right: 10px;
}
</style>
