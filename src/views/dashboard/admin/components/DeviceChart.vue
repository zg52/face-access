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

  this.chart.setOption({
    title: {
        text: '设备在线/离线实施监控',
        textStyle: {
          color: '#333',
          fontSize: 14
        }
    },
    textStyle: {
      color: '#8a16ff'
    },
    color:['#8a16ff','#d1a9fb',],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['在线', '离线']
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
    calculable: true,
    xAxis: [
        {
            type: 'category',
            name: '星期',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '数量',
        }
    ],
    series: [
        {
            name: '在线',
            type: 'bar',
            data: [1,2,3,4,5,6,7],
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        },
        {
            name: '离线',
            type: 'bar',
            data: [1,1,2,0,0,0,1],
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }
    ]
}
)
    }
  }
}
</script>
