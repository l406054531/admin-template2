<template>
  <div class="main">
    <!-- <baidu-map id="allmap"
               :scroll-wheel-zoom="true"
               @ready="mapReady">
    </baidu-map> -->
    <div id="allmap"></div>

  </div>
</template>

<script>
import { loadBaiduMapScript } from '@/utils/map.js'
export default {
  data() {
    return {
      mapExamples: {//地图实例配置
        zoomLevel: 12,//缩放等级
        zoomisOpen: true,// 是否开启缩放
        longitude: 108.327649,// 中心点经度
        latitude: 22.824988, // 中心点纬度
        openPositioning: true,//是否开启定位
      },

    };
  },
  mounted() {
    //   console.log(Map);
    loadBaiduMapScript().then(BMapGL => {
      // console.log(BMapGL);
      //   console.log(BMap);
      this.initMap(BMapGL)
    })
    this.$nextTick(() => {

    })
    //   var map = new BMapGL.Map("container");
    //   var point = new BMapGL.Point(116.404, 39.915);
    //   map.centerAndZoom(point, 15); 
  },
  methods: {
    initMap(BMapGL) {
      console.log(BMapGL);
      var map = new BMapGL.Map("allmap");
      var point = new BMapGL.Point(116.404, 39.915);
    //   map.setHeading(64.5);
    //   map.setTilt(73);
      map.centerAndZoom(point, 15);
    },
    /**
     * @author lx
     * @dateTime 2021-7-29
     * @remark 初始化地图
     */
    mapReady({ BMap, map }) {
      let { longitude, latitude, zoomLevel, openPositioning } = this.mapExamples
      let point = new BMap.Point(longitude, latitude);
      map.centerAndZoom(point, zoomLevel);// 地图初始化，同时设置地图展示级别
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      //   map.setHeading(64.5);
      //   map.setTilt(73);
      map.addControl(new BMap.NavigationControl()); //平移缩放控件
      map.setMapStyleV2({
        styleId: '87329fbddf446fb069a56d009f579151'
      });
      //   map.addControl(new BMap.ScaleControl());//比例尺

      if (openPositioning) {
        this.getGeolocation(BMap, map)
      }

    },
    /**
     * @author lx
     * @dateTime 2021-8-9
     * @remark 获取定位
     */
    getGeolocation(BMap, map) {
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
.main {
  width: 100%;
  height: 100%;
  #allmap {
    width: 100%;
    // height: 100vh;
    height: 100%;
    margin: 0 auto;
  }
}
</style>