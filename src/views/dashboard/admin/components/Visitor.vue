<!--
 * @Author: your name
 * @Date: 2021-01-21 10:35:12
 * @LastEditTime: 2021-03-15 18:14:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\face-recognition-access\src\views\dashboard\admin\components\Visitor.vue
-->
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
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
 
  this.chart.setOption({
    title: {
        text: '设备通行人数排行',
        textStyle: {
          color: '#FC7D02',
          fontSize: 14
        }
    },
    color:['#FC7D02'],
    textStyle: {
      color: '#FC7D02'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['人数']
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
                   borderColor: '#FC7D02'
                 }
               }
               },
            magicType: {
              show: true,
             type: ['line', 'bar', 'red'],
              emphasis: {
                 iconStyle: {
                   borderColor: '#FC7D02'
                 }
               }
             },
            restore: {
              show: true,
               emphasis: {
                 iconStyle: {
                   borderColor: '#FC7D02'
                 }
               }
            },
            saveAsImage: {
              show: true,
               emphasis: {
                 iconStyle: {
                   borderColor: '#FC7D02'
                 }
               }
            }
        },
        iconStyle: {
          borderColor:'#fc7d027a',
        }
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
          axisLine: {
            lineStyle: {
            color: '#FC7D02' ,
            }
       },
    },
    yAxis: {
        type: 'category',
        data: ['前门', '后门', '负一层'],
            axisLine: {
            lineStyle: {
            color: '#FC7D02' ,
            }
       },
    },
    series: [
        {
            name: '人数',
            type: 'bar',
            data: [3, 29, 20]
        },
    ]
}
)
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
}
</script>
