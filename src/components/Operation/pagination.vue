<template>
  <div class="page">
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="paginationInfo.currentPage"
                   :page-sizes="paginationInfo.pagesizes"
                   :page-size="paginationInfo.pagesize"
                   :layout="layout"
                   :total="pagetotal"
                   :small="small?'small':''"
                   :pager-count="small?5:11">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagetotal: {
      type: Number,
      default: 0
    },
    paginationInfo: {
      type: Object,
      default: function () {
        return {
          currentPage: 1,
          pagesizes: [10, 20, 50, 100, 200],
          pagesize: 50
        }
      }
    },
    small: {
      type: Boolean,
      default: false
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  data() {
    return {
      // currentPage: 1,
      // pagesizes: [10, 20, 50, 100, 200],
      // pagesize: 50
    }
  },
  methods: {
    handleSizeChange(val) {
      this.paginationInfo.pagesize = val
      this.$emit('handleSizeChange', this.paginationInfo)
    },
    handleCurrentChange(val) {
      this.paginationInfo.currentPage = val
      this.$emit('handleCurrentChange', this.paginationInfo)
    }
  },
  mounted() {
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.page {
  margin-top: 3px;
}
</style>
