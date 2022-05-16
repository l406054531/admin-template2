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
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibGlhbmd4IiwiYSI6ImNsMms2aHdkbzAwcDgzYm5vYTZ4a3oxc3UifQ.NuBCSatZSFBzYf9u-UjN8w'
}).addTo(map);
    this.$emit('loaded', { map, L });
  }
}
</script>
<style  scoped>
</style>