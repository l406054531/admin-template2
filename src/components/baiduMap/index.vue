<template>
  <div id="allmap"
       style="height:720px"></div>
</template>

<script>
import { loadBaiduMapScript } from '@/utils/map.js'
require("echarts/extension/bmap/bmap");
export default {
  data () {
    return {
      mapExamples: {//地图实例配置
        zoomLevel: 5,//缩放等级
        longitude: 108.327649,// 中心点经度
        latitude: 22.824988, // 中心点纬度
        openPositioning: false,//是否开启定位
      },
      options: {
        bmap: {
          center: [31.983924430916854, 111.11485294093147].reverse(),//百度地图中心点
          zoom: 6,//百度地图缩放等级
          roam: true,
        },
      },
      myChart: null,// echarts 实例
    };
  },

  mounted () {
    this.initMapByEcharts()
    // this.initMap()
  },
  methods: {
    /**
     * @description 初始化echarts、地图
     */
    async initMapByEcharts () {
      let chartDom = document.getElementById('allmap');
      let myChart = this.$echarts.init(chartDom);
      this.myChart = myChart
      let option = this.options
      myChart.setOption(option);
      const map = myChart.getModel().getComponent('bmap').getBMap(); //获取地图实例
      map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
      map.addControl(new BMapGL.MapTypeControl());
      map.addControl(new BMapGL.ScaleControl()); // 添加比例尺控件
      map.setMapStyleV2({ styleId: "355244717d21a646729004c01255ec09" });
      this.$emit('loaded', { map, myChart });
    },
    async initMap () {
      // const mapDiv = document.querySelector("#allmap")
      // let myChar = this.$echarts.init(mapDiv)
      // myChar.setOption(this.options)
      // var bmap = myChar.getModel().getComponent('bmap').getBMap();
      // console.log(bmap);
      // bmap.addControl(new BMap.MapTypeControl());
      let { longitude, latitude, zoomLevel, openPositioning } = this.mapExamples
      const BMapGL = await loadBaiduMapScript('BMap')
      var map = new BMapGL.Map("allmap", {
        restrictCenter: false
      });
      var point = new BMapGL.Point(longitude, latitude);
      map.centerAndZoom(point, zoomLevel);
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      // map.addControl(new BMapGL.ScaleControl()); // 添加比例尺控件
      // map.addControl(new BMapGL.ZoomControl()); // 添加缩放控件
      // //   map.addControl(new BMapGL.NavigationControl3D()); // 添加3D控件
      // // map.setHeading(0);
      // // map.setTilt(50);
      map.setMapStyleV2({
        styleId: '355244717d21a646729004c01255ec09'
      });
      if (openPositioning) {
        this.getGeolocation()
      }
    },
    /**
     * @author lx
     * @dateTime 2021-8-9
     * @remark 获取定位
     */
    getGeolocation (BMap, map) {
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
        }
        else {
          alert('未授权!');
        }
      });
    }
  }
}

</script>
<style lang='scss' scoped>
::v-deep {
  .ec-extension-bmap {
    // width: 99% !important;
    height: 720px !important;
  }
}
</style>