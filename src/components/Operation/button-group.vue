<template>
  <!--<div>-->
  <el-button-group>
    <el-button v-if="add"
               :type="type"
               :size="size"
               :disabled="disabled"
               :icon="icon  ? 'el-icon-circle-plus-outline': ''"
               @click="handleAdd">{{addText}}
    </el-button>
    <!--      <el-button-->
    <!--        v-if="del"-->
    <!--        :type="type"-->
    <!--        :size="size"-->
    <!--        :icon="icon ? 'el-icon-delete': ''"-->
    <!--        @click="handleDel"-->
    <!--      >{{delText}}</el-button>-->
    <el-button v-if="refresh"
               :type="type"
               :size="size"
               :icon="icon ? 'el-icon-refresh': ''"
               @click="handleRefresh">{{refreshText}}
    </el-button>
  </el-button-group>
  <!--</div>-->
</template>

<script>
export default {
  name: 'ButtonGroup',
  props: {
    // 是否显示新增按钮
    add: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否显示删除按钮
    del: {
      type: Boolean,
      default: true
    },
    // 是否显示刷新按钮
    refresh: {
      type: Boolean,
      default: true
    },
    // 自定义新增按钮显示文字
    addText: {
      type: String,
      default: '新增'
    },
    // 自定义删除按钮显示文字
    delText: {
      type: String,
      default: '删除'
    },
    // 自定义刷新按钮显示文字
    refreshText: {
      type: String,
      default: '刷新'
    },
    // 按钮类型
    type: {
      type: String,
      default: 'primary'
    },
    // 按钮尺寸
    size: {
      type: String,
      default: '' //  原来为size="small"，修改为默认大小。 update on 2020/03/02
    },
    // 是否显示图标
    icon: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleAdd() {
      this.$emit('add')
    },
    handleDel() {
      this.$emit('del')
    },
    handleRefresh() {
      this.$emit('refresh')
    }
  }
}
</script>

