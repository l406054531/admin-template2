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
        zoomLevel: 8,//缩放等级
        longitude: 108.327649,// 中心点经度
        latitude: 22.824988, // 中心点纬度
        openPositioning: false,//是否开启定位
      },

    };
  },
  mounted() {
    this.initMap()
  },
  methods: {
    async initMap() {
      let { longitude, latitude, zoomLevel, openPositioning } = this.mapExamples
      const BMapGL = await loadBaiduMapScript('BMapGL')
      var map = new BMapGL.Map("allmap", {
        restrictCenter: false
      });
      var point = new BMapGL.Point(longitude, latitude);
      map.centerAndZoom(point, zoomLevel);
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      map.addControl(new BMapGL.ScaleControl()); // 添加比例尺控件
      map.addControl(new BMapGL.ZoomControl()); // 添加缩放控件
    //   map.addControl(new BMapGL.NavigationControl3D()); // 添加3D控件
      map.setHeading(0);
      map.setTilt(50);
      map.setMapStyleV2({
        styleId: '87329fbddf446fb069a56d009f579151'
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
    height: 100%;
    background-color: #091220;
  }
}
</style>