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
import { findSameCoordinateAll } from '@/api/accessRecord';
import { scatter, options } from './options';
export default {
  components: { baiduMpa },
  data () {
    return {
      myChart: null,// echarts实例
      map: null,// 地图实例

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

  },
  computed: {
    scatter () {
      return scatter
    },
    options () {
      return options
    },
  },
  methods: {
    /**
     * @description 获取实例
     */
    loaded ({ map, myChart }) {
      this.myChart = myChart
      this.map = map
      this.getData()
    },
    /**
     * @description 获取数据
     */
    getData () {
      findSameCoordinateAll().then(response => {
        this.scatter.data = response.dataList
        console.log(response.dataList);
        this.options.series[0] = this.scatter
        this.radioList[0].value = this.scatter
        // console.log(this.myChart.setOption);
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