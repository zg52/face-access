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
      chart: null,

     xValue: ['3-01', '3-02', '3-03', '3-05', '3-06', '3-07', '3-08', '3-09', '3-10', '3-11', '3-12', '3-13', '3-14', '3-15', '3-16', '3-17', '3-18', '3-19', '3-20', '3-21', '3-22', '3-23', '3-24', '3-25','3-26','03-27','03-28','03-29','03-30','今日'],
     face_swiping: [120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,0,20,20,20,20,20,20,20,20],
     swiping_card: [120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,0,20,20,20,20,20,20,20,20],
     qr_code: [120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,0,20,20,20,20,20,20,20,20],
     fingerprint: [120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,0,20,20,20,20,20,20,20,20]
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

  this.chart.setOption({
    color: ['#6EA5FF', '#F75B77', '#71D088', '#FFBC6E'],
    title: {
        text: '进门人数实时监控（近30天记录）',
        textStyle: {
          fontSize: 14
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['刷脸', '刷卡', '二维码', '指纹']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
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
                  //  borderColor: '#8a16ff'
                 }
               }
               },
            magicType: {
              show: true,
             type: ['line', 'bar', 'red'],
              emphasis: {
                 iconStyle: {
                  //  borderColor: '#8a16ff'
                 }
               }
             },
            restore: {
              show: true,
               emphasis: {
                 iconStyle: {
                  //  borderColor: '#8a16ff'
                 }
               }
            },
            saveAsImage: {
              show: true,
               emphasis: {
                 iconStyle: {
                  //  borderColor: '#8a16ff'
                 }
               }
            }
        },
        iconStyle: {
          // borderColor:'#d1a9fb',
        }
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: this.xValue
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '刷脸',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#6EA5FF'
                }, {
                    offset: 1,
                    color: '#6EA5FF'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: this.face_swiping
        },
        {
            name: '刷卡',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#F75B77'
                }, {
                    offset: 1,
                    color: '#F75B77'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: this.swiping_card
        },
        {
            name: '二维码',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#71D088'
                }, {
                    offset: 1,
                    color: '#71D088'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: this.qr_code
        },
        {
            name: '指纹',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            label: {
                show: true,
                position: 'top'
            },
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#FFBC6E'
                }, {
                    offset: 1,
                    color: '#FFBC6E'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: this.fingerprint
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
  },
}
</script>
