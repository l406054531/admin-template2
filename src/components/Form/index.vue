<template>
  <el-form ref="myform"
           :model="formModel"
           :rules="rules"
           :inline="inline"
           :style="{'float':inline?'right':''}"
           :class="[inline?'demo-form-inline':'']"
           :size="formSize">
    <el-col :span="colSpan">
      <template v-for="(item,index) in formElement">
        <el-form-item :key="index"
                      :label="item.label"
                      :prop="item.prop"
                      :label-width="labelWidth"
                      :style="{width:formItemWidth?formItemWidth:''}">
          <el-input clearable
                    :disabled="item.disabled"
                    :show-password="item.showPassword"
                    v-if="item.type==='input'"
                    v-model="formModel[item.prop]"
                    @change="item.change?item.change():''"
                    @blur="item.blur?item.blur($event):''"
                    :placeholder="item.placeholder"></el-input>
          <!-- 占位-->
          <el-input v-if="item.type==='none'"
                    style="visibility: hidden;"></el-input>
          <!-- id-->
          <el-input clearable
                    v-if="item.type==='id'"
                    v-model="formModel[item.prop]"
                    @change="item.change?item.change():''"
                    :placeholder="item.placeholder"
                    style="display:none;"></el-input>
          <!-- 文本域 -->
          <el-input clearable
                    v-if="item.type==='textarea'"
                    type="textarea"
                    :rows="item.rows?item.rows:5"
                    v-model="formModel[item.prop]"
                    :placeholder="item.placeholder"></el-input>
          <!-- 选择器    带搜索 filterable  多选 multiple-->
          <el-select v-if="item.type==='select'"
                     v-model="formModel[item.prop]"
                     clearable
                     :filterable="item.filterable"
                     :multiple="item.multiple"
                     :placeholder="item.placeholder"
                     @blur="item.blur?item.blur($event,formModel[item.prop]):''"
                     @change="item.change?item.change({value:formModel[item.prop],...item}):''">
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
      <slot></slot>
      <el-form-item>
        <div :class="[inline?'':'vertical']"
             v-if="submitBtn">
          <el-button type="primary"
                     size="small"
                     @click="handleSubmit">{{btnText}}</el-button>
        </div>
      </el-form-item>
    </el-col>
  </el-form>

</template>

<script>
export default {
  data () {
    return {
      formModel: {}
    }
  },
  props: {
    labelWidth: {
      type: String,
      default: "80px"
    },
    formSize: {
      type: String,
      default: "small"
    },
    formElement: { //表单元素
      type: Array,
      default: () => []
    },
    rules: Object,
    inline: {
      type: Boolean,
      default: false
    },
    submitBtn: {
      type: Boolean,
      default: false
    },
    rowData: {
      type: Object,
      default: () => { }
    },
    btnText: {
      type: String,
      default: '查询'
    },
    formItemWidth: String,
    colSpan: Number

  },
  watch: {
    // rowData: {
    //   deep: true,
    //   immediate: true,
    //   handler (val) {
    //     if (val) {
    //       this.formModel = JSON.parse(JSON.stringify(val))
    //     }
    //   }
    // }
    rowData (val) {
      this.formModel = JSON.parse(JSON.stringify(val))
    }
  },
  mounted () {
    // this.formModel=JSON.parse(JSON.stringify(this.rowData))
    const unWatch = this.$watch("formModel", (newVal, oldVal) => {
      unWatch(); // 取消监听
    });
  },
  computed: {

  },
  methods: {
    validateForm () {
      let flag = null
      this.$refs['myform'].validate((valid) => {
        if (valid) {
          flag = true
        } else {
          flag = false
        }
      })
      return flag
    },
    resetForm () {
      this.$refs['myform'].resetFields();
    },
    handleSubmit () {
      let flag = this.validateForm();
      if (flag) {
        this.$emit("handleSubmit", this.formModel)
        return this.formModel
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.el-form {
  padding-right: 20px;
  ::v-deep {
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
}
.demo-form-inline {
  ::v-deep {
    .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
  }
}
.vertical {
  display: flex;
  justify-content: flex-end;
}
</style>