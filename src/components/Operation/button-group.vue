<template>
  <!--<div>-->
  <!-- <el-button-group>
    <el-button v-if="add"
               :type="type"
               :size="size"
               :disabled="disabled"
               :icon="icon  ? 'el-icon-circle-plus-outline': ''"
               @click="handleAdd">{{addText}}
    </el-button>
    <el-button v-if="refresh"
               :type="type"
               :size="size"
               :icon="icon ? 'el-icon-refresh': ''"
               @click="handleRefresh">{{refreshText}}
    </el-button>
  </el-button-group> -->
  <!--</div>-->
  <el-dropdown @command="command">
    <el-button type="primary"
               size="small">
      更多操作<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <template v-for="(item,index) in dropdownItems">
        <el-dropdown-item :key="index"
                          v-if="item.show"
                          :command="item.value">{{item.label}}</el-dropdown-item>
      </template>
    </el-dropdown-menu>
  </el-dropdown>
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
  data () {
    return {
      dropdownItems: [
        {
          label: '新增',
          value: 'add',
          show: null
        },
        {
          label: '刷新',
          value: 'refresh',
          show: null
        },
        {
          label: '批量删除',
          value: 'batchDel',
          show: null,
        },

      ]
    }
  },
  mounted () {

    this.dropdownItems[0].show = this.add
    this.dropdownItems[1].show = this.refresh
    this.dropdownItems[2].show = this.del
  },
  methods: {
    handleAdd () {
      this.$emit('add')
    },
    handleDel () {
      this.$emit('handleBatchDel')
    },
    handleRefresh () {
      this.$emit('refresh')
    },
    command (v) {
      switch (v) {
        case 'add':
          this.handleAdd()
          break;
        case 'refresh':
          this.handleRefresh()
          break;
        case 'batchDel':
          this.handleDel()
          break;
        default:
          break;

      }
    }
  }
}
</script>

