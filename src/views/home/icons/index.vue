<template>
  <div class="aliIcon">
    <template v-for="(item,index) in icons">
      <div class="block"
           :key="index">
        <div class="icon">
          <i :class="'iconfont '+item.icon"></i>
          <p>{{item.name}}</p>
        </div>

      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        {
          icon: 'icon-tubiaozhizuomoban',
          name: '地图'
        },
        {
          icon: 'icon-yonghu',
          name: '用户'
        },
        {
          icon: 'icon-mima',
          name: '密码'
        },
        {
          icon: 'icon-yonghu1',
          name: '用户'
        },
        {
          icon: 'icon-guanli',
          name: '管理'
        },
        {
          icon: 'icon-yuanshujuguanli',
          name: '元数据管理'
        },
        {
          icon: 'icon-shouye',
          name: '首页'
        },
        {
          icon: 'icon-lvcha',
          name: '绿茶'
        },
      ]
    };
  },
}

</script>
<style lang='scss' scoped>
.aliIcon {
  display: grid;
  grid-template-columns: repeat(8, 195px);
  justify-content: space-between;
  .block {
    height: 78px;
    text-align: center;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    .icon {
      padding: 10px;
      i {
        font-size: 35px;
      }
      p {
        font-size: 14px;
        padding: 2px 0;
      }
    }
  }
}
</style>