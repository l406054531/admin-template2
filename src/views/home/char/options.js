import * as echarts from 'echarts'
let textStyle = {
  fontSize: 20,
  fontWeight: 400,
  fontFamily: "STCaiyun"
}
export let lineOption = {
  backgroundColor: '#fff',
  title: {
    text: '访问量',
    textStyle: textStyle,
    left: '1%',
    top: '1%',
    show: true,
  },
  legend: {
    x: 'center',
    y: 'top',
    show: true,
    top: '5%',
    right: '5%',
    itemWidth: 6,
    itemGap: 20,
    textStyle: {
      color: '#556677',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      label: {
        show: true,
        backgroundColor: '#fff',
        color: '#556677',
        borderColor: 'rgba(0,0,0,0)',
        shadowColor: 'rgba(0,0,0,0)',
        shadowOffsetY: 0,
      },
      lineStyle: {
        width: 0,
      },
    },
    backgroundColor: '#fff',
    textStyle: {
      color: '#5c6c7c',
    },
    padding: [10, 10],
    extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)',
  },
  grid: {
    top: '19%',
    y2: 88,
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 20,
    },
    {
      start: 0,
      end: 20,
    },
  ],
  xAxis: {
    type: 'category',
    data: [],
    axisLine: {
      show: true,
    },
    axisTick: {
      show: true,
    },
    axisLabel: {
      interval: 0,
      textStyle: {
        color: '#556677',
      },
      // 默认x轴字体大小
      fontSize: 12,
      // margin:文字到x轴的距离
      margin: 15,
    },
    axisPointer: {
      label: {
        // padding: [11, 5, 7],
        padding: [10, 0, 10, 0],
        /*
        除了padding[0]建议必须是0之外，其他三项可随意设置

        和CSSpadding相同，[上，右，下，左]

        如果需要下边线超出文字，设左右padding即可，注：左右padding最好相同

        padding[2]的10:

        10 = 文字距下边线的距离 + 下边线的宽度

        如：UI图中文字距下边线距离为7 下边线宽度为2

        则padding: [0, 0, 9, 0]

                    */
        // 这里的margin和axisLabel的margin要一致!
        margin: 15,
        // 移入时的字体大小
        fontSize: 12,
        backgroundColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#fff', // 0% 处的颜色
            },
            {
              // offset: 0.9,
              offset: 0.86,
              /*
0.86 = （文字 + 文字距下边线的距离）/（文字 + 文字距下边线的距离 + 下边线的宽度）

                      */
              color: '#fff', // 0% 处的颜色
            },
            {
              offset: 0.86,
              color: '#33c0cd', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#33c0cd', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
      },
    },
    boundaryGap: false,
  },
  yAxis: [
    {
      type: 'value',
      name: '次',
      axisTick: {
        show: false,
      },
      nameTextStyle: {
        align: "right",
        fontSize: 18,
        color: '#000',
        padding: [20, 0, 15, 0]
      },
      axisLine: {
        show: true,
      },
      axisLabel: {
        color: "#000",
        textStyle: {
          color: '#000',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },
    },
  ],
  series: [
    {
      name: '',
      type: 'line',
      data: [],
      symbolSize: 1,
      symbol: 'circle',
      smooth: true,
      yAxisIndex: 0,
      showSymbol: false,
      emphasis: {
        focus: 'series',
      },
      lineStyle: {
        width: 5,
        // color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
        //     {
        //         offset: 0,
        //         color: '#9effff',
        //     },
        //     {
        //         offset: 1,
        //         color: '#9E87FF',
        //     },
        // ]),
        shadowColor: 'rgba(158,135,255, 0.3)',
        shadowBlur: 10,
        shadowOffsetY: 20,
      },
      itemStyle: {
        normal: {
          color: "#1E90FF",
          borderColor: "#1E90FF",
        },
      },
      markPoint: {
        symbol: 'pin', //标记(气泡)的图形
        symbolSize: 50, //标记(气泡)的大小
        itemStyle: {
          // color: '#4587E7', //图形的颜色。
          borderColor: '#000', //图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
          borderWidth: 0, //描边线宽。为 0 时无描边。
          borderType: 'solid', //柱条的描边类型，默认为实线，支持 ‘solid’, ‘dashed’, ‘dotted’。
        },
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' },
        ],
      },
      // markLine: {
      //   data: [{ type: 'average', name: '平均值' }],
      // },
    }
  ],
};
export let barOption = {
  title: {
    // text: '世界人口总量',
    textStyle: textStyle,
    left: '1%',
    top: '1%',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    top: '3%'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    axisLine: {
      show: true,
    },
    data: []
  },
  yAxis: {
    name: '次',
    type: 'value',
    axisTick: {
      show: false,
    },
  },
  series: [
    {
      name: '2021年',
      type: 'bar',
      barWidth: '30%',
      itemStyle: {
        color: "rgb(250,200,88)"
      },
      data: []
    },
  ]
}