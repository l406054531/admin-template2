<template>
  <div id="map"
       style="height:100%;"></div>
</template>
 
<script> 

import './lib/leaflet-echarts';
import './lib/leaflet.css';
// import 'leaflet/dist/leaflet.css'
// import 'leaflet-echarts/lib/echarts.source.js';
// import * as L from 'leaflet';

export default {
  data () {
    return {
      center: [31.983924430916854, 111.11485294093147],//地图中心点
      zoom: 5, //地图缩放等级
    }
  },
  mounted () {
    let map = L.map('map', {
      center: this.center,
      zoom: this.zoom,
      closePopupOnClick: false, // 不希望用户单击地图时popup弹出窗口关闭
      logoControl: false, // 隐藏logo版权
      zoomControl: false, // 缩放控件
      attributionControl: false // 隐藏文字版权
    });
    L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}').addTo(map)//地图底图样式
    this.$emit('loaded', { map, L });
  }
}
</script>
<style  scoped>
</style>