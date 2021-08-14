<!--
 * @Author: your name
 * @Date: 2021-05-06 19:03:49
 * @LastEditTime: 2021-07-26 19:22:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitee\pc\face-recognition-access\src\views\device-manage\device-list\components\DeviceActivation.vue
-->
<style lang="scss" scoped>
.config ::v-deep .el-dialog__body {
    padding:0;
}
ul {
    li {
        i {
            padding-left: 12px;
            padding-right: 12px;
        }
        &>span:first-child {
            font-weight: bold;
            padding-right: 10px;
        }
        &>span:nth-child(2) {
            padding-left: 30px;
            
        }
        span + div {padding-left: 16px;padding-top: 10px;}
        border-bottom: 1px #DCDFE6 solid;
        padding-bottom: 15px;
        padding-top:15px;
        line-height: 20px;
    }
    padding-right: 40px;
}
</style>
<template>
  <div class="config">
    <el-dialog :title="`设备设置信息 - ${ deviceName }`" top="0" width="70%" :visible.sync="deviceConfigShow">
    <ul>
        <li><span>1. 人脸识别</span><div v-if="deviceConfig.faceThreshold !== null && deviceConfig.faceThreshold !== ''"><span>阈值：{{ deviceConfig.faceThreshold }}</span></div>
            <div v-else>未设置</div></li>
         <li><span>2. 活体检测</span><div v-if="deviceConfig.livingDetect !== null && deviceConfig.livingDetect !== ''"><span>状态：{{ deviceConfig.livingDetect | switchFilter }} <i>|</i> </span> <span>阈值：{{ deviceConfig.livingDetectThreshold }}</span></div>
         <div v-else>未设置</div>
         </li>
        <li><span>3. 最大识别失败次数：</span>{{ deviceConfig.maxFailureTime }}次</li>
        <li><span>4. 通行方向</span>{{ deviceConfig.direction | directionFilter }}</li>
        <li><span>5. 体温监测</span><div v-if="deviceConfig.temperature !== null && deviceConfig.temperature !== ''"><span>状态：{{ deviceConfig.temperature | switchFilter }} <i>|</i> </span> <span>温度上限：{{ deviceConfig.highTemperature }}°C <i>|</i> </span><span>温度下限：{{ deviceConfig.lowTemperature }}°C</span></div>
            <div v-else>未设置</div>
        </li>
       <li><span>6. 数据同步</span><div v-if="deviceConfig.dataSyncCrontab !== null && deviceConfig.dataSyncCrontab !== ''"><span>状态：{{ deviceConfig.dataSync | switchFilter }} <i>|</i> </span> <span>星期：{{ deviceConfig.dataSyncCrontab | weekComput }} <i>|</i> </span><span>时间：{{ deviceConfig.dataSyncCrontab | filterTime }}</span></div>
            <div v-else>未设置</div>
       </li>
       <li><span>7. 身份证信息采集</span><div v-if="deviceConfig.identityInfo !== null && deviceConfig.identityInfo !== ''"><span>状态：{{ deviceConfig.identityInfo | switchFilter }}</span></div>
            <div v-else>未设置</div>
       </li>
       <li><span>8. 保存照片</span><div v-if="deviceConfig.savePhoto !== null && deviceConfig.savePhoto !== ''"><span>状态：{{ deviceConfig.savePhoto | switchFilter }}</span></div><div v-else>未设置</div></li>
       <li><span>9. 语音播报</span><div v-if="deviceConfig.speech !== null && deviceConfig.speech !== ''"><span>状态：{{ deviceConfig.speech | switchFilter }} <i>|</i> </span> <span>音量：{{ deviceConfig.speechVolume }} <i>|</i> </span><span>语速：{{ deviceConfig.speechSpeed }} <i>|</i></span><span>语音种类：{{ deviceConfig.speechAnnouncer }}<i>|</i></span>
       <span>识别成功播报内容：{{ deviceConfig.speechScenes[0].content }}<i>|</i></span><span>识别失败播报内容：{{ deviceConfig.speechScenes[1].content }}</span></div>
         <div v-else>未设置</div>
       </li>
       <li><span>10. 补光灯亮度</span><div class="pl24" v-if="deviceConfig.fillInLight !== null && deviceConfig.fillInLight !== ''"><span>状态：{{ deviceConfig.fillInLight | switchFilter }} <i>|</i> </span> <span>数值：{{ deviceConfig.fillInLightLuminance }}</span></div>
            <div v-else>未设置</div>
       </li>
       <li><span>11. 超时进入待机界面：</span>{{ deviceConfig.screenSaver }}秒</li>
       <li><span>12. 定时重启</span><div v-if="deviceConfig.restart !== null && deviceConfig.restart !== ''" class="pl24"><span>状态：{{ deviceConfig.restart | switchFilter }} <i>|</i> </span> <span>星期：{{ deviceConfig.restartCrontab | weekComput }} <i>|</i> </span><span>时间：{{ deviceConfig.restartCrontab | filterTime}}</span></div>
            <div v-else>未设置</div>
       </li>
       <li><span>13. 日志上传</span><div v-if="deviceConfig.log !== null && deviceConfig.log !== ''" class="pl24"><span>状态：{{ deviceConfig.log | switchFilter }} <i>|</i> </span> <span>星期：{{ deviceConfig.logUploadCrontab | weekComput }} <i>|</i> </span><span>时间：{{ deviceConfig.logUploadCrontab | filterTime}}</span></div>
       <div v-else>未设置</div>
       </li>
       <li><span>14. 屏幕亮度：</span><a v-if="deviceConfig.screenLuminance !== null && deviceConfig.screenLuminance !== ''">{{ deviceConfig.screenLuminance }}</a>
           <div v-else>未设置</div></li>
    </ul>
      <div slot="footer">
        <el-button @click="deviceConfigHide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { weekParams } from '@/utils/business'
export default {
  props: {
    deviceConfigShow: {
      type: Boolean,
      default: false
    },
    deviceName: {
      type: String,
      default: '面板机'
    },
    deviceConfig: {
     type: Object,
     default: {}
    }
  },
  filters: {
    switchFilter(val) {
        if(val === true || val === 'open') {
            return '开启'
        } else {
            return '关闭'
        }
    },
    directionFilter(val) {
        return val === 'in' ? '进' : '出'
    },
    weekComput(value) {
        if(value) {
			let val = value.replaceAll(' ', ''),
			      nums = val.substr(0, val.indexOf('*'))
			if(nums) {
			  let weekStr = []
			    weekParams().forEach((item, index) => {
			      nums.includes(item.id) ? weekStr.push(`${ item.value }`) : ''
			      })
			   if(nums.length === 13) {
			     return '周一至周日'
			   } else if(nums.includes('1,2,3,4,5,6') && nums.length === 11) {
			      return '周一 至 周六'
			   } else if(nums.includes('1,2,3,4,5') && nums.length === 9) {
			      return '周一 至 周五'
			   } else if(nums.includes('1,2,3,4') && nums.length === 7) {
			      return '周一 至 周四'
			   } else if(nums.includes('1,2,3') && nums.length === 5) {
			      return '周一 至 周三'
			   } else if(nums === '7') {
			       return '周日'
			   }else {
			      return '周' + weekStr.join('、')
			   }
			  } else {
			    return ''
			  }
		} else {
			return ''
		}
  },
  filterTime(val) {
	if(val) {
	let time = val.replaceAll(' ', '')
	    return time.slice(time.indexOf('*')+1)
	} else {
	return ''
}
  }
  },
  data() {
    return {
    }
  },
  methods: {
    deviceConfigHide() {
      this.$emit("deviceConfigHide");
    },
  },
  created() {
  },
  mounted() {
  },
}
</script>