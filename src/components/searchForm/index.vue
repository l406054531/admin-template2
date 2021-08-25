<template>
  <el-form :inline="true"
           :model="formModel"
           class="demo-form-inline">
    <template v-for="(item,index) in formElement">
      <el-form-item :key="index"
                    :label="item.label"
                    :prop="item.prop"
                    :label-width="labelWidth">
        <!-- 输入框 -->
        <el-input clearable
                  :disabled="item.disabled"
                  v-if="item.type==='input'"
                  v-model="formModel[item.prop]"
                  @change="item.change?item.change():''"
                  @blur="item.blur?item.blur($event):''"
                  :placeholder="item.placeholder"></el-input>
        <!-- 选择器    带搜索 filterable  多选multiple-->
        <el-select v-if="item.type==='select'"
                   v-model="formModel[item.prop]"
                   :clearable="item.clearable"
                   :filterable="item.filterable"
                   :multiple="item.multiple"
                   :placeholder="item.placeholder"
                   @blur="item.blur?item.blur($event,formModel[item.prop]):''"
                   @change="item.change?item.change(item):''">
          <el-option v-for="(selectedItem,index) in item.typeselects"
                     :key="index"
                     :label="selectedItem.label"
                     :value="selectedItem.value">
          </el-option>
          <!-- :label="item.selectLabel?selectedItem[selectLabel]: selectedItem.label"
                         :value="item.selectValue?selectedItem[selectValue]: selectedItem.value"> -->
        </el-select>
        <!-- 级联选择器 -->
        <!-- :show-all-levels="false" 仅显示最后一级 -->
        <el-cascader v-if="item.type==='cascader'"
                     v-model="formModel[item.prop]"
                     clearable
                     :disabled="item.disabled"
                     :filterable="item.filterable"
                     :show-all-levels="item.levels"
                     :props="{ checkStrictly: item.check,label:item.propsLabel?item.propsLabel:'label',value:item.propsValue?item.propsValue:'label' }"
                     :placeholder="item.placeholder"
                     :options="item.options"
                     @change="item.change?item.change(item):''"></el-cascader>
        <!-- 日期时间选择器 -->
        <!-- 选传： format日期显示格式  默认0年1月2日  0.1.2 ,  valueFormat存储格式见 https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi 时间戳timestamp  -->
        <el-date-picker v-if="item.type==='date'"
                        v-model="formModel[item.prop]"
                        :type="item.dateType"
                        :placeholder="item.placeholder"
                        :picker-options="item.pickerOptions"
                        :format="item.format"
                        :value-format="item.valueFormat">
        </el-date-picker>
      </el-form-item>

    </template>

    <el-form-item>
      <el-button type="primary"
                 @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
// import vueJsonEditor from 'vue-json-editor'
export default {
  //   components: { vueJsonEditor },
  data () {
    return {
    }
  },
  props: {
    labelWidth: {
      type: String,
      default: "120px"
    },
    formSize: {
      type: String,
      default: "small"
    },
    formModel: { //表单双向绑定
      type: Object,
      default: () => { }
    },
    formElement: { //表单元素
      type: Array,
      default: () => []
    },
    inline: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    handleSearch () {
      this.$emit("handleSearch")
    }
  },
  mounted () {

  },
  created () {

  },

}
</script>
<style lang="scss" scoped>
.el-form {
  padding-right: 20px;
  .el-form-item {
    // .el-input {
    //   width: 90%;
    // }
    ::v-deep {
      .el-form-item__label {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .el-select {
      width: 100%;
    }
    .el-cascader {
      width: 100%;
    }
    .el-date-editor.el-input {
      width: 100%;
    }
  }
  ::v-deep {
    // .json-save-btn {
    //   display: none;
    // }
    .jsoneditor {
      height: 400px;
      max-height: 400px;
      overflow: auto;
    }
  }
}
</style>