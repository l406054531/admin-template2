<template>
  <div class="main">
    <v-chart :options="lineOption"
             class="chart"></v-chart>
    <v-chart :options="barOption"
             class="chart"></v-chart>
  </div>
</template>

<script>
import { listOption, lineOption, barOption } from './options'
import { findAllApi } from '@/api/accessRecord';
import { deWeightThree } from '@/utils';
export default {
  data () {
    return {
      lineOption: lineOption,// 折线图配置
      barOption: barOption,// 柱状图配置
    };
  },
  mounted () {
    this.getData()
  },
  methods: {
    /**
     * @description 获取数据
     * @createTime 21/8/30
     */
    getData () {
      findAllApi().then((response) => {
        let dateData = []// 日期
        let cityData = []// 城市
        response.dataList.forEach(item => {
          item.createTime = item.createTime.substr(0, 10) // 截取日期时间
          dateData.push(item.createTime) // push 日期
          if (item.city !== "") {
            cityData.push({ city: item.city })
          }
        })
        /**折线图 */
        dateData = Array.from(new Set(dateData)) // 日期去重
        let lineData = []  // 折线数据
        dateData.forEach(date => {
          let i = 0
          response.dataList.forEach(item => {
            if (item.createTime == date) { // 判断日期相同时
              i++
            }
          })
          lineData.push(i)
        })
        this.lineOption.series[0].data = lineData
        this.lineOption.xAxis.data = dateData

        /**柱状图 */
        cityData = deWeightThree(cityData, 'city') // 城市去重
        cityData.forEach(cItem => {
          let i = 0
          response.dataList.forEach(item => {
            if (item.city == cItem.city) { // 判断去重后的城市与后端返回数据的城市相同时
              i++
            }
          })
          cItem.value = i
        })
        cityData.sort((a, b) => { // 数字大小排序
          return b.value - a.value
        })
        let barData = [] // 柱状图数据
        let xData = [] // Y轴数据
        cityData.forEach(item => {
          barData.push(item.value)
          xData.push(item.city)
        })
        this.barOption.series[0].data = barData
        this.barOption.xAxis.data = xData
      })
    }
  }
}

</script>
<style lang='scss' scoped>
.main {
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  .chart {
    width: 50%;
    height: 480px;
  }
}
</style>