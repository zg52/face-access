<!--
 * @Author: your name
 * @Date: 2021-07-16 16:57:08
 * @LastEditTime: 2021-07-27 13:52:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\face-recognition-access\src\views\device-manage\set-device\setDevice.vue
-->
<style lang="scss" scoped>
.app-container {
  background: #fafafa;
}
.left {
  width: 450px;
  height: 95vh;
  &::v-deep .custom-tree-node {
    font-size: 14px;
  }
}
.left,.right {
  background: #fff;
  border-radius: 10px;
  padding:20px;
  box-shadow: 0 0 10px #eee;
}
.right {
    width: 100%;
    margin-left: 20px;
}
.line,.noline {
    padding:5px;
    border-radius: 20px;
    display: inline-block;
    font-size: 12px;
}
.line {
    color: #42d885;
}
.noline {
    color: #ffba00;
}
.list_params {
    padding-left: 17px;
    & >li {
      padding: 26px 0 12px;
      border-bottom: 1px #C0C4CC dashed;
    }
    &>li:first-child {
      padding-top: 10px;
    }
     &>li:last-child {
     border-bottom: none;
    }
    height: 700px;
    overflow-y: auto;
    &::-webkit-scrollbar {
    width: 5px;
}
    &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
}
&::-webkit-scrollbar-track {
    background: #efefef;
    border-radius: 10px;
}
&::-webkit-scrollbar-corner {
    border-radius: 10px;
}
}
.left ::v-deep .el-tree-node.is-expanded > .el-tree-node__children {
    font-size: 14px;
}
.right {
    &::v-deep {
        .el-checkbox {
            line-height: 35px;
        margin-right:25px;
        }
    }
    &::v-deep {
        .el-switch__core {
position: relative;
    top: 8px;
    margin-right: 20px;
}
    }
    &::v-deep .el-radio-group {
        position: relative;
        top:10px;
    }
    padding-bottom: 40px;
    &::v-deep {
     .el-checkbox {
        font-weight: bold;
      }
    }
    &::v-deep {
      .el-form-item__label {
        font-weight: inherit;
      }
    }
}
.el-icon-warning-outline{
        position: relative;
    left: -21px;
    top: 10px;
    font-size: 14px;
    cursor: pointer;
}
.x {
    line-height: 36px;
    padding-right: 10px;
    font-size: 16px;
}
.b {
  color: #999;
  font-weight: bold;
}
.xuan {
  font-size: 14px;
   width:100%;
   height:80px;
   background:#fff;
   box-shadow: 0 0 10px #ccc;
   position: fixed;
   bottom: 0;
   left:0;
   z-index: 99;
   div {
     line-height: 80px;
   }
    }
    .dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
    }
    .dot_success {
      background: #13ce66;
    }
    .dot_error {
      background: red;
    }
    .errorTip {
      font-size: 12px;
      color: #999;
      padding-top: 10px;
      i {
        position: relative;
        top:1px;
      }
    }
</style>

<template>
  <div class="app-container">
    <div class="flex">
      <div class="left">
        <div class="lis_tit"><i></i> <span>选择设备</span></div>
        <el-input class="w200" v-model="filterText" placeholder="输入设备名称进行过滤" clearable></el-input><el-button @click="getTree" class="ml10" type="primary"><i class="el-icon-refresh-left"></i> 刷新</el-button>
        <el-tree v-loading="treeLoading" class="mt20" :data="treeData" show-checkbox node-key="id" :filter-node-method="filterNode" @check="getNode" default-expand-all ref="tree">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.name }}</span>
        <span :class="data.isLine == true ? 'line' : 'noline'" v-if="data.isLine == null ? false : true">{{ data.isLine == true ? '在线' : '离线'}}</span>
      </span>
    </el-tree>
      </div>
      
      <div class="right">
        <div class="lis_tit"><i></i> <span>设备远程信息设置</span></div>
        <el-checkbox class="pl15" v-model="CHECKED" @change="CHECKED_HANDLE">全选</el-checkbox>
        <el-form ref="listParams.rule" :model="listParams.form" :rules="listParams.rule" inline>
           <el-checkbox-group v-model="checkedList" @change="checkedChange">
        <ul class="list_params">
            <li class="flex">
             <span class="x">1.</span>
             <el-checkbox v-model="listParams.checked1" label="1"><span>人脸识别</span></el-checkbox>
             <el-popover placement="top-start" width="270" trigger="hover" content='阈值范围为：0.00 ~ 1.00，阈值越大，识别精度越高'> <i slot="reference" class="el-icon-warning-outline"></i>
          </el-popover>
             <el-form-item label="阈值：" prop="faceThreshold" v-if="checkedList.includes('1')">
               <el-input-number placeholder="0~1之间任意数值" class="w200" v-model="listParams.form.faceThreshold" controls-position="right" :precision="2" :step="0.01" :min="0" :max="1"></el-input-number>
             </el-form-item>
            </li>
            
             <li class="flex">
             <span class="x">2.</span>
             <el-checkbox v-model="listParams.checked2.checked" label="2"><span>活体检测</span></el-checkbox>
             <el-popover placement="top-start" width="270" trigger="hover" content='阈值范围为：0.00 ~ 1.00，阈值越大，检测精度越高'>
             <i slot="reference" class="el-icon-warning-outline"></i>
          </el-popover>
           <div v-if="checkedList.includes('2')">
               <el-switch
                 v-model="listParams.checked2.switch"
                 active-color="#8d1eff"
                 inactive-color="#ccc">
         </el-switch>
             <el-form-item label="阈值：" prop="livingDetectThreshold">
                <el-input-number placeholder="0~1之间任意数值" :disabled="!listParams.checked2.switch" class="w200" v-model="listParams.form.livingDetectThreshold" controls-position="right" :precision="2" :step="0.01" :min="0" :max="1"></el-input-number>
             </el-form-item>
           </div>
            </li>

             <li class="flex">
             <span class="x">3.</span>
             <el-checkbox v-model="listParams.checked3" label="3"><span>最大识别失败次数</span></el-checkbox>
             <el-popover placement="top-start" width="60" trigger="hover" content='1~3之间整数值'>
             <i slot="reference" class="el-icon-warning-outline"></i>
          </el-popover>
             <el-form-item label="整数值：" prop="maxFailureTime" v-if="checkedList.includes('3')">
                <el-input-number placeholder="0~3之间整数值" class="w200" v-model="listParams.form.maxFailureTime" controls-position="right" :min="1" :max="3"></el-input-number>
             </el-form-item>
            </li>

            <li class="flex">
             <span class="x">4.</span>
             <el-checkbox v-model="listParams.checked4.checked" label="4"><span>通行方向</span></el-checkbox>
             <el-radio-group v-model="setParams.direction" v-if="checkedList.includes('4')">
           <el-radio label="in">进</el-radio>
           <el-radio label="out">出</el-radio>
          </el-radio-group>
          </li>

            <li class="flex">
             <span class="x">5.</span>
             <el-checkbox v-model="listParams.checked5.checked" label="5"><span>体温检测（°C）</span></el-checkbox>
              <el-popover placement="top-start" width="160" trigger="hover" content='取值范围为：33.0°C ~ 43.0°C'>
             <i slot="reference" class="el-icon-warning-outline"></i>
          </el-popover>
             <div v-if="checkedList.includes('5')">
                <el-switch
                 v-model="listParams.checked5.switch"
                 active-color="#8d1eff"
                 inactive-color="#ccc">
            </el-switch>
                 <el-form-item label="温度上限：" prop="highTemperature">
                   <el-input-number class="w150" placeholder="33.0 ~ 43.0" :precision="1" :step="0.1" :disabled="!listParams.checked5.switch" v-model="listParams.form.highTemperature" controls-position="right" :min="33.0" :max="43.0"></el-input-number>
                   </el-form-item>
                 <el-form-item label="温度下限：" prop="lowTemperature">
                   <el-input-number class="w150" placeholder="33.0 ~ 43.0" :precision="1" :step="0.1" :disabled="!listParams.checked5.switch" v-model="listParams.form.lowTemperature" controls-position="right" :min="33.0" :max="43.0"></el-input-number>
                 </el-form-item>
             </div>
            </li>

          <li class="flex">
             <span class="x">6.</span>
             <el-checkbox v-model="listParams.checked6.checked" label="6"><span>数据自动同步</span></el-checkbox>
           <div v-if="checkedList.includes('6')">
               <el-switch v-model="listParams.checked6.switch" active-color="#8d1eff" inactive-color="#ccc"></el-switch>
        <el-form-item label="星期：" prop="dataSyncWeek">
          <el-select :disabled="!listParams.checked6.switch" v-model="listParams.form.dataSyncWeek" placeholder="请选择" multiple filterable clearable>
         <el-option v-for="(weekName, index) of week" :key="index" :label="weekName.name" :value="weekName.id"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="时间：" prop="dataSyncTime">
          <div class="block">
               <el-time-picker :disabled="!listParams.checked6.switch" arrow-control v-model="listParams.form.dataSyncTime" placeholder="任意时间点" @change="changeTime6" >
             </el-time-picker>
           </div>
        </el-form-item>
           </div>
            </li>

             <li class="flex">
             <span class="x">7.</span>
             <el-checkbox v-model="listParams.checked7.checked" label="7"><span>身份证信息采集</span></el-checkbox>
             <el-switch v-if="checkedList.includes('7')" v-model="listParams.checked7.switch" active-color="#8d1eff" inactive-color="#ccc"></el-switch>
            </li>

             <li class="flex">
             <span class="x">8.</span>
             <el-checkbox v-model="listParams.checked8.checked" label="8"><span>保存底库照片</span></el-checkbox>
              <el-switch v-if="checkedList.includes('8')" v-model="listParams.checked8.switch" active-color="#8d1eff" inactive-color="#ccc"></el-switch>
            </li>

             <li class="flex">
             <span class="x">9.</span>
             <el-checkbox v-model="listParams.checked9.checked" label="9"><span>语音播报</span></el-checkbox>
           <div v-if="checkedList.includes('9')">
               <el-switch v-model="listParams.checked9.switch" active-color="#8d1eff" inactive-color="#ccc"></el-switch>
        <div class="block mt10">
             <el-form-item label="播报音量(0 ~ 100):" prop="speechVolume"><el-input-number :disabled="!listParams.checked9.switch" class="w100" v-model="listParams.form.speechVolume" controls-position="right" :min="0" :max="100"></el-input-number></el-form-item>
             <el-form-item label="播报语速(0  ~ 100):" prop="speechSpeed"><el-input-number :disabled="!listParams.checked9.switch" class="w100" v-model="listParams.form.speechSpeed" controls-position="right" :min="0" :max="100"></el-input-number></el-form-item>
            <el-form-item label="语音种类:">
            <el-select v-model="setParams.speechAnnouncer" class="w130" :disabled="!listParams.checked9.switch">
            <el-option v-for="(item, index) of speechAnnouncer" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item> <br>
          <el-form-item label="识别成功播报:">
             <el-radio-group v-model="listParams.checked9.radio1" :disabled="!listParams.checked9.switch" style="top:0" @change="changeChecked9Radio('speechScenes1_content')">
           <el-radio label="default">默认</el-radio>
           <el-radio label="custom">自定义</el-radio>
          </el-radio-group>
          </el-form-item><br>
          <el-form-item style="margin-left: 184px;margin-top: -14px;" v-if="listParams.checked9.radio1 === 'custom'" prop="speechScenes1_content">
            <el-input class="w300" :disabled="!listParams.checked9.switch" v-model="listParams.form.speechScenes1_content" maxlength="30" type="textarea" show-word-limit placeholder="请输入1~30个字符" clearable></el-input>
            <div class="mt5" v-if="listParams.checked9.switch"><span class="b">插入变量：</span><el-button @click="radio1_apedVar" size="mini" plain>姓名</el-button><el-button @click="radio1_apedVar" size="mini" plain>部门</el-button><el-button @click="radio1_apedVar" size="mini" plain>公司</el-button></div>
          </el-form-item>
           <br>
          <el-form-item label="识别失败播报:">
             <el-radio-group v-model="listParams.checked9.radio2" :disabled="!listParams.checked9.switch" style="top:0" @change="changeChecked9Radio('speechScenes2_content')">
           <el-radio label="default">默认</el-radio>
           <el-radio label="custom">自定义</el-radio>
          </el-radio-group>
          </el-form-item><br>
          <el-form-item style="margin-left: 184px;margin-top: -14px;" v-if="listParams.checked9.radio2 === 'custom'" prop="speechScenes2_content">
            <el-input class="w300" :disabled="!listParams.checked9.switch" v-model="listParams.form.speechScenes2_content" maxlength="30" type="textarea" show-word-limit placeholder="请输入1~30个字符"></el-input>
            <div class="mt5" v-if="listParams.checked9.switch"><span class="b">插入变量：</span><el-button @click="radio2_apedVar" size="mini" plain>姓名</el-button><el-button @click="radio2_apedVar" size="mini" plain>部门</el-button><el-button @click="radio2_apedVar" size="mini" plain>公司</el-button></div>
          </el-form-item>
        </div>
           </div>
            </li>

          <li class="flex">
             <span class="x">10.</span>
             <el-checkbox v-model="listParams.checked10.checked" label="10"><span>补光灯</span></el-checkbox>
             <el-popover placement="top-start" width="200" trigger="hover" content='取值范围为0 ~ 100'>
             <i slot="reference" class="el-icon-warning-outline"></i>
          </el-popover>
           <div v-if="checkedList.includes('10')">
               <el-switch
                 v-model="listParams.checked10.switch"
                 active-color="#8d1eff"
                 inactive-color="#ccc">
         </el-switch>
          <el-form-item label="数值：" prop="livingDetectThreshold">
                <el-input-number placeholder="0~100之间整数值" :disabled="!listParams.checked10.switch" class="w200" v-model="listParams.form.fillInLightLuminance" controls-position="right" :min="0" :max="100"></el-input-number>
             </el-form-item>
           </div>
            </li>

         <li class="flex">
             <span class="x">11.</span>
             <el-checkbox v-model="listParams.checked11" label="11"><span>屏幕亮度</span></el-checkbox>
             <el-popover placement="top-start" width="200" trigger="hover" content='取值范围为0 ~ 100'>
             <i slot="reference" class="el-icon-warning-outline"></i>
          </el-popover>
             <el-form-item label="数值：" v-if="checkedList.includes('11')" prop="screenLuminance">
                <el-input-number placeholder="0~100之间整数值" class="w200" v-model="listParams.form.screenLuminance" controls-position="right" :min="0" :max="100"></el-input-number>
               </el-form-item>
            </li>

            <li class="flex">
             <span class="x">12.</span>
             <el-checkbox v-model="listParams.checked12" label="12"><span>超时进入待机界面</span></el-checkbox>
             <el-popover placement="top-start" width="200" trigger="hover" content='取值范围为1 ~ 59'>
             <i slot="reference" class="el-icon-warning-outline"></i>
          </el-popover>
             <el-form-item label="超时时间（秒）" v-if="checkedList.includes('12')" prop="screenSaver">
               <el-input-number placeholder="1~59之间整数值" class="w200" v-model="listParams.form.screenSaver" controls-position="right" :min="1" :max="59"></el-input-number>
               </el-form-item>
            </li>

        <li class="flex">
             <span class="x">13.</span>
             <el-checkbox v-model="listParams.checked13.checked" label="13"><span>定时重启</span></el-checkbox>
           <div v-if="checkedList.includes('13')">
               <el-switch v-model="listParams.checked13.switch" active-color="#8d1eff" inactive-color="#ccc">
         </el-switch>
        <el-form-item label="星期：" prop="restartWeek">
          <div class="block">
             <el-select :disabled="!listParams.checked13.switch" v-model="listParams.form.restartWeek" placeholder="请选择" multiple filterable clearable>
         <el-option v-for="(weekName, index) of week" :key="index" :label="weekName.name" :value="weekName.id"></el-option>
        </el-select>
           </div>
        </el-form-item>
        <el-form-item label="时间：" prop="restartTime">
          <div class="block">
               <el-time-picker :disabled="!listParams.checked13.switch" arrow-control v-model="listParams.form.restartTime" placeholder="任意时间点" @change="changeTime13">
             </el-time-picker>
           </div>
        </el-form-item>
           </div>
            </li>
        <li class="flex">
             <span class="x">14.</span>
             <el-checkbox v-model="listParams.checked14" label="14">管理员密码</el-checkbox>
             <el-form-item label="输入密码：" prop="password" v-if="checkedList.includes('14')"><el-input  type="password" maxlength="8" :show-password="true" class="w220" v-model="listParams.form.password" placeholder="6 ~ 8位数字" clearable></el-input></el-form-item>
             <el-form-item label="确认密码：" prop="passwordConfirm" v-if="checkedList.includes('14')"><el-input  type="password" maxlength="8" :show-password="true" class="w220" v-model="listParams.form.passwordConfirm" placeholder="6 ~ 8位数字" clearable></el-input></el-form-item>
            </li>

          <li class="flex">
             <span class="x">15.</span>
             <el-checkbox v-model="listParams.checked15.checked" label="15"><span>日志上传</span></el-checkbox>
           <div v-if="checkedList.includes('15')">
               <el-switch v-model="listParams.checked15.switch" active-color="#8d1eff" inactive-color="#ccc"></el-switch>
        <el-form-item label="星期：" prop="logUploadWeek">
          <div class="block">
             <el-select :disabled="!listParams.checked15.switch" v-model="listParams.form.logUploadWeek" placeholder="请选择" multiple filterable clearable>
         <el-option v-for="(weekName, index) of week" :key="index" :label="weekName.name" :value="weekName.id"></el-option>
        </el-select>
           </div>
        </el-form-item>
        <el-form-item label="时间：" prop="logUploadTime">
          <div class="block">
               <el-time-picker :disabled="!listParams.checked15.switch" arrow-control v-model="listParams.form.logUploadTime" placeholder="任意时间点" @change="changeTime15">
             </el-time-picker>
           </div>
        </el-form-item>
           </div>
            </li>
        </ul>
      </el-checkbox-group>
        </el-form>
      </div>
    </div>
    <transition name="el-zoom-in-bottom">
   <div class="xuan" v-show="xuanShow">
        <div class="flexcenter">
          <div class="ml20">已选择<span class="themeColor"> {{ setParams.deviceIds.length }} </span>个设备</div> <i class="pl15">|</i>
         <div class="ml20">已选择<span class="themeColor"> {{ checkedList.length }} </span>项设置</div>
        <div class="ml20">
          <el-button type="primary" @click="submitSetParams('listParams.rule')"><svg-icon icon-class="guide" /> 下发设置项</el-button>
          <el-button @click="xuanShow = false">取消</el-button>
        </div>
        </div>
      </div>
    </transition>

    <el-dialog
      title="下发进度"
      :visible.sync="dialogVisible"
      width="450px"
      :close-on-click-modal="false"
      >
      <div class="t_center">
        <div>
          <el-progress v-if="statusCode == 0" type="circle" :percentage="percentage" :color="colors"></el-progress>
          <el-progress v-else type="circle" :percentage="30" status="exception"></el-progress>
         <p v-html="successTip"></p>
         <div class="deivce_name">
           <p v-for="(name, index) of yetDevices" :key="index"><i class="dot" :class="statusCode == 0 ? 'dot_success' : 'dot_error'"></i> {{ name }}</p>
         </div>
         <p v-if="statusCode != 0" class="errorTip"><i class="el-icon-info"></i> 请检查设备工作状态后重试，也可关闭此界面，稍后重试</p>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
        <el-button v-show="statusCode !== 0" type="primary" @click="submitSetParams('listParams.rule')">重试</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {  getDeviceNames } from '@/utils/business'
import { weekParams } from '@/utils/business'
import { deviceSets } from '@/api/device-manage'
import { validatePass1 } from '@/utils/validate.js'
import moment from 'moment'
let id = 1000, 
    vm

/**
 * @description: 默认参数
 * 
  //  温度上限 43  下限33
    // 音量：100
    // 语速： 50
    // 屏幕亮度 100
    // 补光灯 0 ~100   默认：80
    // 屏幕0~100： 默认100
    // 超时待机： 10
    // 定时重启 周日 4:30
    // 日志上传  周日  8:30
 */

  export default {
    data() {
    let validatePsw1 = (rule, value, callback) => {
      value === ""
        ? callback(new Error("请输入密码"))
        : !validatePass1(value)
        ? callback(new Error("请输入6~8位数字"))
        : this.listParams.form.passwordConfirm !== ""
        ? callback()
        : String
          callback()
    },
    validatePsw2 = (rule, value, callback) => {
      value === ""
        ? callback(new Error("请再次输入密码"))
        : value !== this.listParams.form.password
        ? callback(new Error("两次输入密码不一致!"))
        : String
          callback()
    }
        function notNull(notNullName) { return {required: true, message: `请输入${ notNullName }`, trigger: "blur" } }
      return {
        percentage: 10,
        percentageStatus: null,
        statusCode: 0,
        colors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#8a16ff', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#5cb87a', percentage: 100}
        ],
        dialogVisible: false,
        CHECKED: false,
        yetDevices: [],
        successTip: '正在下发设置项到所选设备，请耐心等待...',
        getDeviceNames: [],
        filterText: '',
        treeLoading: true,
        week: [],
        weeksProps: { multiple: true },
        xuanShow: false,
        speechAnnouncer: [
            {
                id: 'xiaofeng',
                name:'xiaofeng'
            },
            {
                id: 'xiaoyan',
                name:'xiaoyan'
            }
        ],
        
      checkedArr: [],
      checkedList: [],
      treeData: [],
      listParams: {
          form: {
              faceThreshold:0.80,
              livingDetectThreshold:0.90,
              maxFailureTime:1,
              highTemperature: 38.5,
              lowTemperature: 34.0,
              dataSyncWeek: [7],
              dataSyncTime: new Date(2021, 9, 10, 0, 0),
              speechVolume: 100,
              speechSpeed: 50,
              fillInLightLuminance: 80,
              screenLuminance: 100,
              screenSaver: 10,
              restartWeek: [7],
              restartTime: new Date(2021, 9, 10, 4, 30),
              // param6: '',
              speechScenes1_content: '验证成功',
              speechScenes2_content: '验证失败',
              logUploadWeek: [7],
              logUploadTime: new Date(2021, 9, 10, 8, 30),
              password: '',
              passwordConfirm: '',
              
              param10: '',
              param11: '',
              param12: '',
          },
          rule: {
              faceThreshold: notNull('人脸识别阈值'),
              livingDetectThreshold: notNull('活体检测阈值'),
              maxFailureTime: notNull('最大识别次数'),
              highTemperature: notNull('温度上限值'),
              lowTemperature: notNull('温度下限值'),
              speechVolume: notNull('播报音量'),
              speechSpeed: notNull('播报语速'),
              speechScenes1_content: notNull('识别成功播报信息'),
              speechScenes2_content: notNull('识别失败播报信息'),
              dataSyncWeek: notNull('数据同步星期'),
              dataSyncTime: notNull('数据同步时间'),
              fillInLightLuminance: notNull('补光灯数值'),
              screenLuminance: notNull('屏幕亮度数值'),
              screenSaver: notNull('超时进入待机界面数值'),
              restartWeek: notNull('定时重启星期'),
              restartTime: notNull('定时重启时间'),
              logUploadWeek: notNull('日志上传星期'),
              logUploadTime: notNull('日志上传时间'),
              password: { required: true, validator: validatePsw1, trigger: 'blur' },
              passwordConfirm: [{required: true, validator: validatePsw2, trigger: 'blur' }],
          },
          checked1: true,
          checked2: {
              checked: true,
              switch: true
          },
          checked3: true,
          checked4: {
              checked: true,
              radio: 'in'
          },
          checked5: {
             checked: true,
             switch: true,
              num1: '',
              num2: '40'
          },
           checked6: {
              switch: true,
              checked: true,
          },
          checked7: {
            checked: true,
            switch: true
          },
          checked8: {
            checked: true,
            switch: true
          },
          checked9: {
              checked: true,
              switch: true,
              num1: '',
              num2: '40',
              radio1: 'custom',
              radio2: 'custom'
          },
           checked10: {
              checked: true,
              switch: true
          },
            checked11: true,
            checked12: true,
            checked13: {
              switch: true,
              checked: true,
          },
          checked14: true,
          checked15: {
              switch: true,
              checked: true,
          },
      },
      setParams: {
         deviceIds: [],
         
         faceThreshold: null, // 1
         
         livingDetect: null,  // 2 是否开启活体检测
         livingDetectThreshold: null, // 活体检测阈值

         maxFailureTime: null,	// 3 最大识别失败次数
         
         direction: 'in', // 4 通行方向

         highTemperature: null,	 // 5 体温监测温度上限
         temperature: 'close', // 是否开启体温监测,
         lowTemperature: null,	// 体温监测温度下限

         dataSync: null,	// 6 是否开启数据同步,可用值:CLOSE,OPEN
         dataSyncWeek: null,	// 数据同步星期限定
         dataSyncTime: '00:00:00',	// 数据同步时间限定
         
         identityInfo: null,	// 7 是否开启身份证信息采集
         savePhoto: false,	 // 8 是否保存照片
         
         speech: false,	// 9 是否开启语音播报
         speechVolume: null,	 // 播报音量
         speechSpeed: null,	// 播报语速
         speechAnnouncer: 'xiaoyan', // 语音种类,可用值:XIAOFENG,XIAOYAN
         'speechScenes[0].code': 'success',	// 成功播报 默认值：welcome
         'speechScenes[0].content': null,	// 成功播报内容
          'speechScenes[1].code': 'fail',	// 失败播报
         'speechScenes[1].content': null,	// 失败播报内容
          
         fillInLightLuminance: null,	// 10 补光灯亮度
         fillInLight: null,
        //  screenLuminance : 100, // 屏幕亮度
         screenSaver: null,	 //12 超时进入待机界面数值

          restart: null, //	13 是否开启定时重启
          restartTime:'04:30:00', //	定时重启时间限定
          restartWeek:null, //	定时重启星期限定

          password: null,	// 14 管理员密码
          passwordConfirm: null,	// 管理员密码确认
          
          log: null,	// 15 是否开启日志
          logUploadWeek: [], // 日志上传星期限定
          logUploadTime: '08:30:00', // 日志上传时间限定
      },
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      },
    },
    methods: {
      submitSetParams(el) {
      let form = this.listParams.form, setParams = this.setParams, listParams = this.listParams
 
        if(setParams.deviceIds.length !== 0) {
          if(this.checkedList.length !== 0) {
           this.$refs[el].validate((valid, warMsg) => {
             if (valid) {
            issuedSet()
             } else {
               this.$message.warning('请输入必填设置项')
             }
           })
          } else {
            this.$message.warning('请至少选择一项信息设置')
          }
      } else {
            this.$message.warning('请选择设备')
          }
      
      function issuedSet() {
        //  setParams['faceThreshold'] = form['faceThreshold']

        //   setParams['livingDetect'] = listParams['checked2'].switch ? 'open' : 'close'
        //   setParams['livingDetectThreshold'] = form['livingDetectThreshold']

        //   setParams['maxFailureTime'] = form['maxFailureTime']  // 3
          
        //   setParams['temperature'] = listParams['checked5'].switch ? 'open' : 'close'
        //   setParams['highTemperature'] = form['highTemperature']
        //   setParams['lowTemperature'] = form['lowTemperature']

        //   setParams['dataSync'] = listParams['checked6'].switch ? 'open' : 'close'
          // setParams['dataSyncWeek'] = form['dataSyncWeek']

        //   setParams['identityInfo'] = listParams.checked7.switch ? 'open' : 'close'

        //   setParams['savePhoto'] = listParams.checked8 ? true : false
          
        //   setParams['speech'] = listParams['checked9'].switch ? true : false
        //   setParams['speechVolume'] = form['speechVolume']
        //   setParams['speechScenes[0].content'] = form['speechScenes1_content']
        //   setParams['speechScenes[1].content'] = form['speechScenes2_content']
        //   setParams['speechSpeed'] = listParams['checked9'].num2

        //   setParams['fillInLight'] = listParams.checked10 ? 'open' : 'close'
        //   setParams['fillInLightLuminance'] = form['fillInLightLuminance']

        //    setParams['screenSaver'] = form['param12']
        //    setParams['fillInLightLuminance'] = form['param10']

        //    setParams['restart'] = listParams.checked13 ? 'open' : 'close'
          //  setParams['restartWeek'] = form['restartWeek']

          //  setParams['logUploadWeek'] = form['logUploadWeek']

        //    setParams['password'] = form['password']
        //    setParams['passwordConfirm'] = form['passwordConfirm']

        //    setParams['log'] = listParams['checked15'].switch ? 'open' : 'close'
          
            
       let submitParams = { ...vm.setParams }, formData = new FormData()
       let a = {
         deviceIds: setParams['deviceIds']
       }
       
       
      vm.checkedList.includes('1') ? a.faceThreshold= form['faceThreshold'] : delete a.faceThreshold

      if(vm.checkedList.includes('2')) {
        if(listParams['checked2'].switch) {
           a.livingDetectThreshold = form['livingDetectThreshold'], a.livingDetect = 'open'
        } else {
           a.livingDetect = 'close', delete a.livingDetectThreshold
        }
      } else {
        delKey(['livingDetect', 'livingDetectThreshold'])
      }
        vm.checkedList.includes('3') ? a.maxFailureTime = form['maxFailureTime'] : delete a.maxFailureTime
        vm.checkedList.includes('4') ? a.direction= setParams['direction'] : delete a.direction
      if(vm.checkedList.includes('5')) {
        if(listParams['checked5'].switch) {
           a.temperature = 'open', a.lowTemperature = form['lowTemperature'], a.highTemperature = form['highTemperature']
        } else {
           a.temperature = 'close', delKey(['lowTemperature', 'highTemperature'])
        }
      } else {
        delKey(['lowTemperature', 'highTemperature'])
      }

       if(vm.checkedList.includes('6')) {
        if(listParams['checked6'].switch) {
           a.dataSync = 'open', a.dataSyncWeek = form['dataSyncWeek'], a.dataSyncTime = setParams['dataSyncTime']
        } else {
           a.dataSync = 'close', delKey(['dataSyncWeek', 'dataSyncTime'])
        }
      } else {
        delKey(['dataSyncWeek', 'dataSyncTime'])
      }

    if(vm.checkedList.includes('7')) {
        if(listParams['checked7'].switch) {
           a.identityInfo = 'open'
        } else {
           a.identityInfo = 'close'
        }
      } else {
        delete a.identityInfo
      }

     if(vm.checkedList.includes('8')) {
        if(listParams['checked8'].switch) {
           a.savePhoto = true
        } else {
           a.savePhoto = false
        }
      } else {
        delete a.savePhoto
      }

    if(vm.checkedList.includes('9')) {
      // var delKey9 = ['speechVolume', 'speechSpeed', 'speechAnnouncer','speechScenes[0].code', 'speechScenes[1].code', 'speechScenes[0].content', 'speechScenes[1].content']
        if(listParams['checked9'].switch) {
           a.speech = true, a.speechVolume = form['speechVolume'], a.speechSpeed = form['speechSpeed'], a.speechAnnouncer = setParams['speechAnnouncer']

// 默认 / 自定义
        a['speechScenes[0].code'] = 'success', a['speechScenes[1].code'] = 'fail'
        if(vm.listParams.checked9.radio1 != 'default') {
          a['speechScenes[0].content'] = form['speechScenes1_content']
        }
        if(vm.listParams.checked9.radio2 != 'default') {
           a['speechScenes[1].content'] = form['speechScenes2_content']
        }
        } else {
           a.speech = false; delKey(['speechVolume', 'speechSpeed', 'speechAnnouncer','speechScenes[0].code', 'speechScenes[1].code', 'speechScenes[0].content', 'speechScenes[1].content'])
        }
      } else {
           delete a.speech; delKey(['speechVolume', 'speechSpeed', 'speechAnnouncer','speechScenes[0].code', 'speechScenes[1].code', 'speechScenes[0].content', 'speechScenes[1].content'])
      }

      if(vm.checkedList.includes('10')) {
        if(listParams['checked10'].switch) {
           a.fillInLight = 'open', a.fillInLightLuminance = form['fillInLightLuminance']
        } else {
           a.fillInLight = 'close', delete a.fillInLightLuminance
        }
      } else {
        delKey(['fillInLight','fillInLightLuminance'])
      }

      vm.checkedList.includes('11') ? a.screenLuminance = form['screenLuminance'] : delete a.screenLuminance
      vm.checkedList.includes('12') ? a.screenSaver = form['screenSaver'] :  delete a.screenSaver
  
      
      if(vm.checkedList.includes('13')) {
        if(listParams['checked13'].switch) {
           a.restart = 'open', a.restartWeek = form['restartWeek'], a.restartTime = setParams['restartTime']
        } else {
           a.restart = 'close', delKey(['restartWeek','restartTime'])
        }
      } else {
        delKey(['restartWeek','restartTime'])
    }

      if(vm.checkedList.includes('14')) {
         a.password = form['password'], a.passwordConfirm = form['passwordConfirm']
      } else {
        delete a.password
        delete a.passwordConfirm
      }

     if(vm.checkedList.includes('15')) {
        if(listParams['checked15'].switch) {
           a.log = 'open', a.logUploadWeek = form['logUploadWeek'], a.logUploadTime = setParams['logUploadTime']
        } else {
           a.log = 'close', delKey(['logUploadWeek','logUploadTime'])
        }
      } else {
        delKey(['logUploadWeek','logUploadTime'])
    }
      
     for(let item in a) { 
         formData.append(item, a[item])
      }
     
     deviceSets(formData).then(res => {
         vm.dialogVisible = true, vm.increase(100, false), vm.percentageStatus = null
       if(res.code === 0) {
         vm.statusCode = 0, vm.percentage = 100
         vm.successTip = '<i class="el-icon-circle-check green"></i> 下发成功'
         vm.$message.success('下发成功')
         vm.xuanShow = false, vm.checkedList = [], vm.CHECKED = false
       } else {
         vm.statusCode = res.code
         vm.successTip = '<i class="el-icon-circle-close red"></i> 下发失败'
         vm.$message.error('下发失败')
       }
     })

     function delKey(keyArr) {
       keyArr.forEach((item, index) => {
         delete a[item]
       })
     }
      }
      },
     filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1
      },
      getNode(nodeObj, SelectedObj) {
        let setParams = this.setParams
      this.yetDevices = [], this.yetDevices.push(nodeObj.name)
	   let deviceArr = SelectedObj.checkedKeys
		  if(deviceArr[0] === '人脸识别闸机') {
			  deviceArr.splice(0, 1)
		  }
      setParams.deviceIds = deviceArr
      this.xuanShow = setParams.deviceIds.length !== 0 ? true : false
   
    },
    getTree() {
       getDeviceNames().then((res) => {
       this.getDeviceNames = res
       this.treeData = [{
         id: '类型：人脸识别闸机',
         name: '类型：人脸识别闸机',
         children: res
     }]
     this.treeLoading = false
    })
    },
    changeChecked9Radio(str) {
      let param = this.listParams.checked9
      if(str === 'speechScenes1_content') {
        if(param['radio1'] === 'default') {
          this.listParams.form[str]  = '验证成功'
        }
      } else {
         if(param['radio2'] === 'default') {
          this.listParams.form[str]  = '验证失败'
        }
      }
    },
    increase(resultNUm, isClear) {
        let timer = setInterval(() => {
          this.percentage += 1.5
        if (this.percentage > 100) {
          this.percentage = resultNUm
          clearInterval(timer)
         }
         if(isClear) {
          clearInterval(timer)
         }
        }, 400)
    },

// 追加变量
    apedVar(key, e) {
       let param = this.listParams.form
          param[key] = `${ param[key] }{${ e.target.innerText }}`  
    },
    radio1_apedVar(e) {
      this.apedVar('speechScenes1_content', e)
    },
    radio2_apedVar(e) {
       this.apedVar('speechScenes2_content', e) 
    },
    checkedChange() {
      this.xuanShow = this.checkedList.length !== 0 ? true : false
    },
    changeWeek(str) {
    //   if(str === 'checked6') {
    //       weeks('dataSyncWeek')
    //   } else if(str === 'checked13') {
    //     weeks('restartWeek')
    //   } else if(str === 'checked15') {
    //     weeks('ogUploadWeek')
    //   }
    // function weeks(w) {
    //     let queryWeek = vm.setParams,
    //         querWeekStr = []
    //         if(queryWeek[w].length !== 0) {
    //               queryWeek[w].forEach((item, index) => {
    //                querWeekStr.push(item[0])
    //             })
    //             querWeekStr = querWeekStr.join()
    //              queryWeek[w] = querWeekStr
    //         }
    // }
    },
    CHECKED_HANDLE() {
        if(this.CHECKED) {
          this.checkedList = Array.from({ length: 15 }).map(( item, index ) => (index + 1).toString())
          this.xuanShow = true
        } else {
          this.checkedList = []
        }
    },
   changeTime(checked, timeParam) {
      let _p = this.listParams.form[checked]
      this.setParams[timeParam] = _p ? moment(_p).format("HH:mm:ss") : '00:00:00'
    },
    changeTime6() {
      this.changeTime('dataSyncTime','dataSyncTime')
    },
    changeTime13() {
      this.changeTime('restartTime','restartTime')
    },
    changeTime15() {
      this.changeTime('logUploadTime','logUploadTime')
    }
    },
    created() {
        vm = this
      this.getTree()
      weekParams().map((item, index) => {
         this.week.push({
          id: item.value === '日' ? 7 : index + 1,
          name: `周${ item.value }`
       })
     })
    }
  }
</script>