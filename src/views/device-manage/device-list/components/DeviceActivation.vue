<!--
 * @Author: your name
 * @Date: 2021-05-06 19:03:49
 * @LastEditTime: 2021-05-07 17:27:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitee\pc\face-recognition-access\src\views\device-manage\device-list\components\DeviceActivation.vue
-->
<style lang="scss" scoped>
.action {
	justify-content: space-around;
  .cc {
    height: 367px;
    width: 2px;
    background: #dfe4ed;
  }
  ::v-deep.el-input.is-disabled .el-input__inner {
    border: none;
  }
  ::v-deep.el-form--label-top .el-form-item__label {
    padding: 0 !important;
  }
}
.form,
.erCode {
  width: 314px;margin-left: -53px;
}
.erCode {
  text-align: center;
}
#qrcode{
    display: inline-block;
	width: 200px;
	height: 200px;
    ::v-deep img {
		// padding:20px;
    }
}
.erbtn {
	margin: 0 auto;
	padding: 10px;
	cursor: pointer;
	span {
		padding:0 10px;
	}
}
.tip {color: #999;white-space: wrap;}
</style>
<template>
  <div>
    <el-dialog title="设备激活信息" :visible.sync="actionShow"  :close-on-click-modal="false" :before-close="actionHide">
      <div class="action flex">
        <el-form
          class="form"
          ref="form"
          :model="mqtt_deviceId_http"
          labelPosition="top"
          size="big"
        >
          <el-form-item label="MqttServerUrl"><el-input v-model="mqtt_deviceId_http.mqtt" disabled></el-input></el-form-item>
          <el-form-item label="HttpServerUrl"><el-input v-model="mqtt_deviceId_http.http" disabled></el-input></el-form-item>
          <el-form-item label="设备标识"><el-input v-model="mqtt_deviceId_http.uniqueDeviceIdentifier" disabled></el-input></el-form-item>
        </el-form>
        <i class="cc"></i>
        <div class="erCode">
          <h3>激活二维码</h3>
          <h4 class="themeColor">{{ deviceName }}</h4>
		  <div v-loading="loading" element-loading-spinner="el-icon-loading"> <div id="qrcode" class="qrcode" ref="qrCodeUrl"></div></div>
		  <div class="erbtn"><span class="themeColor" type="primary" @click.prevent="creatQrCode">刷新</span><span class="themeColor" @click="downloadImg">下载</span></div>
		  <p class="tip"><i class="el-icon-info"></i> 您可拍照或者下载此码，在设备端进行扫码激活</p>
        </div>
      </div>
	  <a id="downloadImg"></a>
      <div slot="footer">
        <el-button @click="actionHide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
	export default {
		props: {
			mqtt_deviceId_http: {
				type: Object
			},
			actionShow: {
				type: Boolean
			},
			deviceName: {
				type: String
			},
		},
		data() {
			return {
			loading: true
			}
		},
		watch: {
       deviceName() {
		   setTimeout(() => {
			   this.creatQrCode()
		   });
	   }
		},
	methods: {
	actionHide() {
		this.$emit('actionHide')
			},
	creatQrCode() {
	    this.loading = true
		this.$refs.qrCodeUrl.innerHTML = ''
		let txt = `${ this.mqtt_deviceId_http.mqtt }#${ this.mqtt_deviceId_http.http }#${ this.mqtt_deviceId_http.uniqueDeviceIdentifier }`
		console.log(txt)
		console.log(this.encode(txt))
		setTimeout(() => {
		new QRCode(this.$refs.qrCodeUrl, {
			text: this.encode(txt),
            width: 200,
            height: 200,
            colorDark: '#000',
            colorLight: '#fff',
            correctLevel: QRCode.CorrectLevel.L
        })
	    this.loading = false}, 400)
    },
	 downloadImg(){
          var img = document.getElementById('qrcode').getElementsByTagName('img')[0]
          var canvas = document.createElement('canvas')
          canvas.width = 240
          canvas.height = 260
		  canvas.style.padding = '40px'
          canvas.getContext('2d').drawImage(img, 20, 30)
          var url = canvas.toDataURL('image/png')
          document.getElementById('downloadImg').setAttribute('href', url)
          document.getElementById('downloadImg').setAttribute('download', `${ this.deviceName }激活码.jpg`)
          document.getElementById('downloadImg').click()
        },
	  encode(str){
		let encode = encodeURI(str);
		let base64 = btoa(encode);
		return base64
}
},
created() {
},
mounted() {
this.$nextTick(() => {
	new Promise((resolve) => {
		if(this.$refs.qrCodeUrl) {
			resolve()
		}
	}).then(() => {
	this.creatQrCode()
	this.loading = false
	})
	
})
}
	}
</script>