<template>
  <div class="main">
    <!-- 地图 -->
    <leafletMap @loaded="loaded"></leafletMap>
    <!-- 单选框 -->
    <!-- <dv-border-box-8 class="radio">
      <div>
        <el-radio-group v-model="radio">
          <template v-for="(item,index) in radioList">
            <el-radio :key="index"
                      :label="item.label"
                      @change="radioGroupChange(item)"></el-radio>
          </template>
        </el-radio-group>
      </div>
    </dv-border-box-8> -->
  </div>
</template>

<script>
import leafletMap from '@/components/leafletMap/index.vue';
import { findSameCoordinateAll } from '@/api/accessRecord';
import { scatter, options } from './options';
export default {
  components: { leafletMap },
  data () {
    return {
      L: null,//leaflet实例
      map: null,//地图实例
      radio: '访问数量',//单选框model
      radioList: [//单选框列表
        {
          label: '访问数量',// 显示的文字
          value: {}// echarts图表数据
        },
        {
          label: '无',
          value: {
            type: 'scatter',
            coordinateSystem: 'geo',
            data: []
          },
        },
      ],
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    scatter () {// 散点图配置
      return scatter
    },
    options () {// echarts配置
      return options
    },
  },
  methods: {
    /**
     * @description 获取地图实例
     */
    loaded ({ map, L }) {
      this.L = L
      this.map = map
    },
    /**
     * @description 获取后端数据--访问记录
     */
    getData () {
      findSameCoordinateAll().then(response => {
        this.scatter.data = response.dataList
        this.options.series[0] = this.scatter
        this.radioList[0].value = this.scatter
        this.L.overlayEcharts(this.options).addTo(this.map);//绘制echarts
      })
    },
    /**
     * @description 单选框Change事件  重新绘制echarts
     */
    radioGroupChange (v) {
      this.options.series[0] = v.value
      this.L.overlayEcharts(this.options).addTo(this.map);//绘制echarts
      const { lng, lat } = this.map.getCenter()//获取当前中心点
      const zoom = this.map.getZoom()//获取当前缩放等级
      this.map.setView([lat, lng], zoom)//重新设置缩放等级以及中心点
    }
  }

}
</script>
<style lang="scss"  scoped>
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