<template>
  <div>
    <el-table :data="tableData"
              border
              style="min-height: 730px"
              highlight-current-row
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
import { findAllMetadataElementList, findAllList } from '@/api/metadata';
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
    url: {
      type: String
    }
  },
  data () {
    return {
      tableData: [],
    }
  },
  mounted () {
    if (this.url == 'metadataType') {
      this.findAllList({}, this.url)
    } else {
      this.findAllList(this.params, this.url)
    }
  },
  methods: {
    /**获取数据列表 */
    findPageList (data) {
      let getData = JSON.stringify(data);
      findAllMetadataElementList({ params: getData }).then(response => {
        if (response.statusCode === 200) {
          this.tableData = response.dataList
          console.log(this.tableData);
          this.$emit('emitTableData', response)
        }
      })
    },
    findAllList (data, url) {
      let getData = JSON.stringify(data);
      findAllList({ params: getData }, url).then(response => {
        if (response.statusCode === 200) {
          this.tableData = response.dataList
          this.$emit('emitTableData', response)
        }
      })
    },
    parentEmitData (data) {
      this.tableData = data
    },
    /**点击删除 */
    handleDelete (row) {
      this.$emit('handleDelete', row)
    },
    handleUpdate (row) {
      this.$emit('handleUpdate', row)
    }
  },

}
</script>

<style lang="scss" scoped>
.el-switch {
  margin-right: 10px;
}
</style>
