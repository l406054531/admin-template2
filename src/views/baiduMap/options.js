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

export let options = { //echarts 配置
  // geo: {
  //   map: 'china'
  // },
  bmap: { //设置百度地图显示哪些东西
    // center: [108.327649, 22.824988],
    // zoom: 8,
    roam: true,
  },
  tooltip: {
    // trigger: 'item',
    formatter: function (params) {
      if (typeof (params.value)[2] == "undefined") {
        return params.name + ' : ' + params.value;
      } else {
        return params.data.city + params.data.district + ' : ' + params.value[2];
      }

    }
  },
  visualMap: {
    left: "1%",
    bottom: '8%',
    min: 0,
    max: 40000,
    pieces: [
      {
        min: 150,
        max: 200
      },
      {
        min: 100,
        max: 150
      },
      {
        min: 50,
        max: 100
      },
      {
        min: 5,
        max: 50
      },
      {
        max: 5
      }
    ],
    padding: 10,
    backgroundColor: "#fff",
    textStyle: {
      color: "rgba(8, 8, 8, 1)",
      textBorderColor: "rgba(0, 0, 0, 1)"
    },
    inRange: {
      color: ['#50a3ba', '#eac736', '#d94e5d']
    },
  },

  series: [
 
  ]

}