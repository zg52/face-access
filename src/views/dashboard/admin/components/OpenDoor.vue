<template>
    <div :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

  this.chart.setOption( {
      title: {
        text: '今日开门施监控',
        textStyle: {
          color: '#333',
          fontSize: 14
        }
    },
 textStyle: {
      color: '#8a16ff'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['刷脸', '刷卡', '二维码', '指纹']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {
              show: true, 
              readOnly: false,
               emphasis: {
                 iconStyle: {
                   borderColor: '#8a16ff'
                 }
               }
               },
            magicType: {
              show: true,
             type: ['line', 'bar', 'red'],
              emphasis: {
                 iconStyle: {
                   borderColor: '#8a16ff'
                 }
               }
             },
            restore: {
              show: true,
               emphasis: {
                 iconStyle: {
                   borderColor: '#8a16ff'
                 }
               }
            },
            saveAsImage: {
              show: true,
               emphasis: {
                 iconStyle: {
                   borderColor: '#8a16ff'
                 }
               }
            }
        },
        iconStyle: {
          borderColor:'#d1a9fb',
        }
    },
    xAxis: {
        type: 'category',
        name: '时间',
        boundaryGap: false,
        data: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时']
    },
    yAxis: {
        type: 'value',
        name: '人数'
    },
    series: [
        {
            name: '刷脸',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,0,20]
        },
        {
            name: '刷卡',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,0,20]
        },
        {
            name: '二维码',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,0,20]
        },
        {
            name: '指纹',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,0,20]
        },
    ]
}
)
    }
  }
}
</script>
