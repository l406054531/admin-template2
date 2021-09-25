export let scatter = { // 散点图配置
  type: 'scatter',
  coordinateSystem: 'geo',
  symbol: 'pin',
  legendHoverLink: true,
  symbolSize: 40,
  label: {
    show: true,
    formatter (params) {
      return params.value[2];
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

export let options = {// echarts配置
  visualMap: {
    left: "1%",
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
    inRange: {
      color: ['#50a3ba', '#eac736', '#d94e5d']
    },
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    formatter: function (params) {
      if (typeof (params.value)[2] == "undefined") {
        return params.name + ' : ' + params.value;
      } else {
        // params.data.province +
        return params.data.city + params.data.district + ' : ' + params.value[2];
      }

    }
  },
  geo: {
    map: 'china',
    aspectScale: 0.75, //长宽比
    zoom: 1,
    roam: false,
    itemStyle: {
      normal: {
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [{
            offset: 0,
            color: '#09132c' // 0% 处的颜色
          }, {
            offset: 1,
            color: '#274d68'  // 100% 处的颜色
          }],
          globalCoord: true // 缺省为 false
        },
        shadowColor: 'rgb(58,115,192)',
        shadowOffsetX: 10,
        shadowOffsetY: 11
      },
      emphasis: {
        areaColor: '#2AB8FF',
        borderWidth: 5,
        color: 'green',
        label: {
          show: false
        }
      }
    },
  },
  series: [],
}