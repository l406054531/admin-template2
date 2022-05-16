<template>
  <div id="allmap"
       style="height:720px;width: 100%;"></div>
</template>

<script>
import "echarts/extension/bmap/bmap";
import { loadBaiduMapScript } from "@/utils/map"
export default {
  data () {
    return {
      mapExamples: {//地图实例配置
        zoomLevel: 6,//缩放等级
        longitude: 108.327649,// 中心点经度
        latitude: 32.824988, // 中心点纬度
        openPositioning: false,//是否开启定位
      },
      options: {
        bmap: {
          center: [108.332455, 32.910728],
          zoom: 5,//百度地图缩放等级
          roam: true,
        },
        series: [

        ],
      },
      myChart: null,// echarts 实例
    };
  },

  mounted () {
    this.initMapByEcharts()
    // this.initMap()
  },
  methods: {

    initMap () {
      let { longitude, latitude, zoomLevel, openPositioning } = this.mapExamples;
      const map = new BMapGL.Map("allmap", {
        restrictCenter: false,
      });
      const point = new BMapGL.Point(longitude, latitude);
      map.centerAndZoom(point, zoomLevel);
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      map.addControl(new BMapGL.ScaleControl()); // 添加比例尺控件
      // map.addControl(new BMap.ZoomControl()); // 添加缩放控件
      // map.addControl(new BMap.NavigationControl3D()); // 添加3D控件
      // map.setHeading(0);
      // map.setTilt(50);
      map.setMapStyleV2({
        styleId: "355244717d21a646729004c01255ec09",
      });
    },
    /**
     * @description 初始化echarts、地图
     */
    async initMapByEcharts () {
      const BMap = window.BMap
      let chartDom = document.getElementById('allmap');
      let myChart = this.$echarts.init(chartDom);
      this.myChart = myChart
      myChart.setOption(
        this.options
      );
      const map = myChart.getModel().getComponent('bmap').getBMap(); //获取地图实例
      map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
      map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
      map.setMapStyleV2({ styleId: "355244717d21a646729004c01255ec09" });
      this.$emit('loaded', { map, myChart });

      // loadBaiduMapScript().then(BMap => {
      //   console.log(BMap);
      //   let chartDom = document.getElementById('allmap');
      //   let myChart = this.$echarts.init(chartDom);
      //   this.myChart = myChart
      //   myChart.setOption(
      //     this.options
      //   );
      //   const map = myChart.getModel().getComponent('bmap').getBMap(); //获取地图实例
      //   map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
      //   map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
      //   map.setMapStyleV2({ styleId: "355244717d21a646729004c01255ec09" });
      //   this.$emit('loaded', { map, myChart });
      // })
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
    // height: 720px !important;
  }
}
</style>