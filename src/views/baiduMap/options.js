export let scatter = { // 散点图配置
  type: 'scatter',
  coordinateSystem: 'bmap',
  symbol: 'pin',
  legendHoverLink: true,
  symbolSize: 40,

  // legendHoverLink: true,
  label: {
    show: true,
    formatter (value) {
      return value.data.value[2];
    },
    color: '#fff',
  },
  itemStyle: {
    normal: {
      color: '#D8BC37', //标志颜色
      shadowBlur: 1,
      shadowColor: 'D8BC37',
    },
  },
  data: [],
  showEffectOn: 'render',
  rippleEffect: {
    brushType: 'stroke',
  },
  hoverAnimation: true,
  zlevel: 1,
}