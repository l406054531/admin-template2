<template>
  <span class="dropdown">
    <el-upload class="upload-demo"
               action=""
               :auto-upload="false"
               :on-change="inputImportExcel"
               style="display:none">
      <el-button size="small"
                 ref="fileInput"
                 type="primary">点击上传</el-button>
    </el-upload>
    <!-- <input ref="fileInput"
           type="file"
           @change="inputImportExcel"
           style="display:none" /> -->
    <el-dropdown @command="handleCommand">
      <el-button type="primary">
        数据导入导出<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="import">{{importExcelTitle}}</el-dropdown-item>
        <el-dropdown-item command="exprot">{{exprotExcelTitle}}</el-dropdown-item>
        <el-dropdown-item command="excelTemplate">{{excelTemplate}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </span>

</template>

<script>
import { importExcel } from '@/vendor/importExcel';
import { downloadExcelTemplate } from "@/api/excel"
export default {
  props: {
    importBtn: {
      type: Boolean,
      default: true
    },
    exprotBtn: {
      type: Boolean,
      default: true
    },
    // 按钮类型
    type: {
      type: String,
      default: 'primary'
    },
    // 按钮尺寸
    size: {
      type: String,
      default: ''
    },
    // 是否显示图标
    icon: {
      type: Boolean,
      default: true
    },
    importExcelTitle: {
      type: String,
      default: "导入Excel"
    },
    exprotExcelTitle: {
      type: String,
      default: "导出Excel"
    },
    excelTemplate: {
      type: String,
      default: "下载导入模板"
    },
    url: String
  },
  methods: {
    /**点击导出excel */
    handleExprotExcel() {
      this.$emit("handleExprotExcel")
    },
    /**选择文件后触发事件 */
    inputImportExcel(file) {
      let uploadFie = file.raw
      importExcel(uploadFie, (json) => {
        let data = {
          json,
          file: uploadFie
        }
        this.$emit("hanldeImportExcel", data)
      })
    },
    handleCommand(command) {
      if (command == "import") {
        this.$refs.fileInput.$el.click()
      } else if (command == "exprot") {
        this.$emit("handleExprotExcel")
      } else if (command == 'excelTemplate') {
        let api = downloadExcelTemplate(this.url)
        let alink = document.createElement("a")
        alink.setAttribute("href", api)
        alink.click()
      }
    }
  }
}

</script>
<style lang='scss' scoped>
.el-button-group {
  margin-left: 20px;
}
.dropdown {
  float: right;
  padding-left: 15px;
}
// .el-dropdown-menu {
//   li:last-child {
//     color: red !important;
//   }
// }
</style>