<template>
  <div class="main">
    <!-- 地图 -->
    <baiduMpa @loaded="loaded"></baiduMpa>
    <!-- 单选框 -->
    <dv-border-box-8 class="radio">
      <div>
        <el-radio-group v-model="radio">
          <template v-for="(item,index) in radioList">
            <el-radio :key="index"
                      :label="item.label"
                      @change="radioGroupChange(item)"></el-radio>
          </template>
        </el-radio-group>
      </div>
    </dv-border-box-8>

  </div>
</template>
<script>
import baiduMpa from "../../components/baiduMap"
import { findAllApi } from '@/api/accessRecord';
import { scatter } from './options';
export default {
  components: { baiduMpa },
  data () {
    return {
      myChart: null,// echarts实例
      map: null,// 地图实例
      options: { //echarts 配置
        // bmap: { //设置百度地图显示哪些东西
        //   center: [108.327649, 22.824988],
        //   zoom: 8,
        //   roam: true,
        // },
        tooltip: {
          // trigger: 'item',
          formatter: function (params) {
            if (typeof (params.value)[2] == "undefined") {
              return params.name + ' : ' + params.value;
            } else {
              return params.name + ' : ' + params.value[2];
            }

          }
        },
        visualMap: {
          show: false,
          min: 0,
          max: 500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {},
        },
        series: [],
      },
      radio: '访问数量',//单选框model
      radioList: [
        {
          label: '访问数量',
          value: {}
        },
        {
          label: '无',
          value: {
            coordinateSystem: 'bmap',
            data: []
          }
        },
      ]

    };
  },
  mounted () {
    this.getData()
  },
  computed: {
    scatter () {
      return scatter
    }
  },
  methods: {
    /**
     * @description 获取实例
     */
    loaded ({ map, myChart }) {
      this.myChart = myChart
      this.map = map
    },
    /**
     * @description 获取数据
     */
    getData () {
      findAllApi().then(response => {
        this.scatter.data = response.dataList
        console.log(response.dataList);
        this.options.series[0] = this.scatter
        this.radioList[0].value = this.scatter
        this.myChart.setOption(this.options);
      })
    },
    /**
     * @description 单选框change事件
     */
    radioGroupChange (v) {
      this.options.series[0] = v.value
      this.myChart.setOption(this.options);
    }
  }
}

</script>
<style lang='scss' scoped>
.main {
  height: 100%;
  .radio {
    width: 120px;
    height: 80px;
    padding: 20px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 999;
    // background: #fff;
    .el-radio-group {
      .el-radio {
        padding: 3px 0;
        ::v-deep {
          .el-radio__label {
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>