<template>
  <el-pagination @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="pagination.currentPage"
                 :page-sizes="pagination.pageSizes"
                 :page-size="pagination.pageSize"
                 :layout="layout"
                 :small="small?'small':''"
                 :total="total">
  </el-pagination>
</template>

<script>
export default {
  props: {
    total: Number,
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pagination: {
        currentPage: 1,
        pageSize: 15,
        pageSizes: [15, 30, 45, 60]
      }
    }
  },
  mounted () {
    this.$emit('handlePageParams', this.pagination)
  },
  methods: {
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.$emit('handleCurrentChange', val)
    }
  },

}
</script>
<style lang='scss' scoped>
</style>