<template>
  <!-- 
    updateTime:21.5.13
    updateContent:新增了type为id的情况  
 -->
  <el-form ref="myform"
           :rules="rules"
           :model="formModel"
           :size="formSize"
           :inline="inline"
           class="demo-form-inline">
    <template v-for="(item,index) in dialogFormElement">
      <div :key="index">
        <el-col :span="item.colSpan">
          <!-- 经纬度 -->
          <el-form-item :label="item.label"
                        :prop="item.prop"
                        :label-width="labelWidth"
                        v-if="item.type==='coordinate'">
            <template v-for="(cItem,cIndex) in item.children">
              <el-input clearable
                        v-model="formModel[cItem.prop]"
                        :key="cIndex"
                        :placeholder="cItem.placeholder"
                        @change="cItem.change?cItem.change():''"></el-input>

            </template>
          </el-form-item>
          <el-form-item v-else
                        :label="item.label"
                        :prop="item.prop"
                        :label-width="labelWidth">
            <!-- 输入框 -->
            <el-input clearable
                      :disabled="item.disabled"
                      :show-password="item.showPassword"
                      v-if="item.type==='input'"
                      v-model="formModel[item.prop]"
                      @change="item.change?item.change():''"
                      @blur="item.blur?item.blur($event):''"
                      :placeholder="item.placeholder"></el-input>
            <!-- 占位-->
            <el-input clearable
                      v-if="item.type==='none'"
                      v-model="formModel[item.prop]"
                      @change="item.change?item.change():''"
                      :placeholder="item.placeholder"
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
            <el-button type="primary"
                       v-if="item.type==='btn'"
                       @click="onQuerySubmit">查询</el-button>
            <!-- <vue-json-editor v-if="item.type === 'json'"
                             v-model="formModel[item.prop]"
                             :showBtns="false"
                             :mode="item.mode"
                             lang='zh'
                             @json-change="item.change" /> -->
          </el-form-item>
        </el-col>
      </div>
    </template>

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
    colSpan: {
      type: Number,
      // default: ''
    },
    formModel: { //表单双向绑定
      type: Object,
      default: () => { }
    },
    rules: { //表单验证
      type: Object,
      default: () => { }
    },
    dialogFormElement: { //表单元素
      type: Array,
      default: () => []
    },
    inline: {
      type: Boolean,
      default: false
    },
    showBtn: {
      type: Boolean,
      default: false
    },
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
    onQuerySubmit () {
      this.$emit("onQuerySubmit")
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