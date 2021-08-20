<template>
  <div class="top">
    <template v-for="(item,index) in dataList">
      <col-block :key="index"
                 :header="item.header"
                 :center="item.center"
                 :buttom="item.buttom"
                 :unit="item.unit"
                 :showProgress="item.showProgress"></col-block>
    </template>
  </div>
</template>

<script>
import colBlock from "./module.vue"
export default {
  components: { colBlock },
  data() {
    return {
      dataList: [
        {
          header: {
            title: '访问量',
            type: 'success',
            tag: '日'
          },
          center: {
            leftName: '日占比',
            rightName: '周占比'
          },
          buttom: {
            name: '总访问量'
          },
          unit: ''
        },
        {
          header: {
            title: '销售额',
            type: '',
            tag: '周'
          },
          center: {
            leftName: '日占比',
            rightName: '周占比'
          },
          buttom: {
            name: '总销售额'
          },
          unit: '￥',
          showProgress:true
        },
        {
          header: {
            title: '订单量',
            type: 'warning',
            tag: '周'
          },
          center: {
            leftName: '日同比',
            rightName: '周同比'
          },
          buttom: {
            name: '转换率'
          },
          unit: ''
        },
        {
          header: {
            title: '成交额',
            type: 'danger',
            tag: '月'
          },
          center: {
            leftName: '月同比',
            rightName: '月同比'
          },
          buttom: {
            name: '总成交额'
          },
          unit: '￥'
        },
      ]
    };
  },
}

</script>
<style lang='scss' scoped>
.top {
  display: grid;
  grid-template-columns: repeat(4, 24%);
  justify-content: space-between;
}
</style>