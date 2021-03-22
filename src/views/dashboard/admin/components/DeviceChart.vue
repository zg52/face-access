<template>
    <div :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { bas } from '@/api/dashboard' 

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
      chart: null,
      online: [1,2,3,40,0,0,0],
      offline: [1,2,3,40,0,0,0],
      fault: [1,0,0,2,0,0,0,0],
      Xvalue: ['03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '今日']
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

  this.chart.setOption({
    title: {
        text: '设备在线/离线/故障实时监控',
        textStyle: {
          color: '#8a16ff',
          fontSize: 14
        }
    },
    textStyle: {
      color: '#8a16ff'
    },
    color:['#8a16ff','#b572f9', '#dec9f3'],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: [
          // '在线', '离线', 
          '故障']
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
            name: '日期',
            data: this.Xvalue,
            axisLine: {
            lineStyle: {
            color: '#8a16ff' ,
            }
       },
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '数量',
            axisLine: {
            lineStyle: {
            color: '#8a16ff' ,
            }
       },
        }
    ],
    series: [
        // {
        //     name: '在线',
        //     type: 'bar',
        //     data: this.online,
        //     markLine: {
        //         data: [
        //             {type: 'average', name: '平均值'}
        //         ]
        //     }
        // },
        // {
        //     name: '离线',
        //     type: 'bar',
        //     data: this.offline,
        // },
        {
            name: '故障',
            type: 'bar',
            data: this.fault,
        }
    ]
}
)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
      
// 每30分刷新
  setInterval(() => {
        
      },(1000 * 60) * 30)
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }
}
</script>
