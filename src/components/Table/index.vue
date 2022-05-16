 <template>
  <div class="main">
    <el-button type="primary"
               size="small"
               @click="handleAdd">新增</el-button>
    <el-button type="primary"
               size="small"
               @click="handleRefresh">刷新</el-button>
    <basics-form inline
                 submitBtn
                 :formElement="searchFormElement"
                 @handleSubmit="handleSubmit"> </basics-form>
    <el-table :data="data"
              class="table"
              ref="tableRef"
              highlight-current-row
              border
              v-loading="loading"
              :default-sort="{ prop: defaultSort.prop, order: defaultSort.order }"
              :height="height ? height : 620"
              :cell-style="{ padding: '5px 0' }"
              @sort-change="handleSortChange"
              @selection-change="handleSelectionChange">
      <template v-for="(item, index) in header">
        <el-table-column v-if="item.render"
                         :key="index"
                         :prop="item.prop"
                         :label="item.label"
                         :align="align"
                         :min-width="item.width">
          <template slot-scope="scope">
            <label-component :init="item.render(scope.row)"></label-component>
          </template>
        </el-table-column>
        <!-- sortable排序  具体参考element文档 -->
        <el-table-column v-else
                         :key="index"
                         :prop="item.prop"
                         :label="item.label"
                         :type="item.type"
                         :align="align"
                         :sortable="item.sortable"
                         :min-width="item.width"
                         :index="setIndex">
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
import labelComponent from './components/label-component.vue';
export default {
  components: {
    labelComponent,
  },
  props: {
    data: Array,
    header: Array,
    height: Number,
    defaultSort: {
      type: Object,
      default: () => {
        return {
          prop: '',
          order: ''
        }
      }
    },
    align: {
      type: String,
      default: 'center'
    },
    params: Object,
    searchFormElement: Array,
    loading: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleAdd () {
      this.$emit('handleAdd')
    },
    handleRefresh () {
      this.$emit("update:loading", true)
      this.$emit('handleRefresh')
    },
    handleSortChange (column) {
      this.$emit('handleSortChange', column)
    },
    handleSelectionChange (selection) {
      this.$emit('handleSelectionChange', selection)
    },
    handleSubmit (data) {
      this.$emit("handleSubmit", data)
    },
    setIndex (index) {
      if (!this.params) return index
      let { pageNum, pageSize } = this.params
      index = pageSize * (pageNum - 1) + 1 + index
      return index
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  .table {
    width: 100%;
    min-height: 500px;
    margin: 5px 0;
  }
}
</style>
