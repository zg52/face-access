<!--
 * @Author: your name
 * @Date: 2021-04-25 16:21:15
 * @LastEditTime: 2021-04-25 19:29:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitee\pc\face-recognition-access\src\views\device-manage\device-list\components\DeviceUpdate.vue
-->
<style lang="scss" scoped>
    .updates {
        ::v-deep .el-dialog__body {
            padding-top: 5px;
        }
        ::v-deep {
            .el-step__title.is-finish {
                color: #333;
            }
        }
        .tit {
            margin-bottom:30px;
        }
        .box {
            width: 100%;
            border: 1px #8a16ff solid;
            border-radius: 9px;
            margin: 0 auto;
            background: #F9F0FF;
            padding: 20px;
            padding-top: 2px!important;

        }
        h4 {
            font-weight: bold;
            color: #333;
            font-size: 15px;
        }
    }
    .form {
        padding-top: 30px;
    }
    .el-icon-upload2 {
        font-size: 15px;
    }
    .d {
        padding-left: 20px;
        cursor: pointer;
        &:hover {
        color: #8a16ff;
        }
    }
    .tip {
        color: #999;
        font-size: 12px;
        padding-left: 60px;
    }

</style>
<template>
    <div class="updates">
        <el-dialog
            title="设备升级"
            :visible.sync="updateParams.updateVisible"
            width="60%"
            >
            <div class="cont">
                <div class="tit">当前升级的设备类型：{{ updateParams.deviceType }}</div>
              <div class="box">
                  <h4>更新流程说明</h4>
                 <el-steps :active="4" >
                  <el-step title="上传固件"></el-step>
                  <el-step title="确认更新"></el-step>
                  <el-step title="查看更新状态"></el-step>
                  <el-step title="完成/重试更新"></el-step>
                </el-steps>
              </div>
              <el-form ref="form" class="form" :model="form" label-position="right" label-width="110px">
                  <el-form-item label="选择更新类型：">
                      <el-radio-group v-model="updateType" @change="updateTypeHandle">
                          <el-radio v-for="(updateType, index) of updateTypes" :key="index" :disabled="index === 1 ? true : false" :label="updateType.value" :value="updateType.id"></el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="上传升级包：">
                 <el-upload
                        class="uploader"
                        ref="uploadZip"
                        :action="action"
                        :before-upload="beforeZipUpload"
                        :on-error="zipError"
                        :on-success="handleZipSuccess"
                        >
                      <el-button slot="trigger"><i class="el-icon-upload2"></i> 上传文件</el-button> <span class="d"><i class="el-icon-download"></i> 获取固件</span>
                      <span class="tip"><i class="el-icon-info"></i> 注意：上传文件大小不能超过200M, 且文件命名格式为：文件名 + 版本号，两者之间用‘-’分隔，如：app-v1.1.apk</span>
                      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadZip">上传到服务器</el-button> -->              

                      <div slot="tip" class="el-upload__tip"></div>
                    </el-upload>

                  </el-form-item>
                   <el-form-item label="新应用版本号："><el-input class="w100" disabled type="text" v-mode="v"></el-input></el-form-item>
                  
                  
              </el-form>
            </div>
            <div slot="footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="updateHandle">下一步</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

import { proxyUrl_1 } from '@/api/public'
import { deviceUpdate } from '@/api/device-manage'

export default {
    props: {
        updateParams: {
            type: Object
        },
    },
   data() {
       return {
        action: proxyUrl_1,
        updateVisible: true,
        updateTypes: [
            {
               id: 1,
               value: '应用'
               
           },
            {
                id: 0,
                value: '系统'
                
            },
        ],
       updateType: '应用',
       v: null,
        form: {
            upgrade_type: null,
            file: null,
            deviceid: null
        }
       }
   },
   methods: {
       updateTypeHandle() {
       if(this.updateType == this.updateTypes[0].value) {
           this.form.upgrade_type  = this.updateTypes[0].id
       } else {
          this.form.upgrade_type  = this.updateTypes[1].id
       }
       },
       cancel() {
           this.updateParams.updateVisible = false
           this.$message('已取消升级')
       },
       beforeZipUpload(file) {
    return this.zipRule(file.type, file.size, file)
  },
   handleZipSuccess(res, file) {
     if(res === 'success') {
         this.form.file = file
    //    this.open1(`${ file.raw.name } 上传成功`, '成功', 'success')
     } else{
       this.$message.error(res.msg)
    //    this.open1(`${ file.raw.name } 上传失败，请重试`, '失败', 'error')
     }
    },
  zipError(err, file, fileList) {
    if(this.zipType(file.raw.type, file.raw.name)) {
       this.open1(`${ file.raw.name } 上传失败，请重试`, '失败', 'error')
    }
  },
  zipType(fileType, fileName) {
     let zipFormat = fileName.lastIndexOf('.')
   return fileType === 'application/vnd.android.package-archive' || (fileName).substr(zipFormat + 1).includes('apk')
  },
  zipRule(fileType, fileSize, fileRaw) {
  console.log("🚀 ~ file: DeviceUpdate.vue ~ line 183 ~ zipRule ~ fileRaw", fileRaw)
      
     const isLt1M = fileSize / 1024 / 1024 < 500
        if (!this.zipType(fileType, fileRaw.name)) { 
          this.$message.error('上传压缩包只能是 apk 格式！', 4000)
          } else if (this.zipType(fileType, fileRaw.name) && !isLt1M) {
             this.$message.error('上传zip大小不能超过500MB！', 4000)
          } else if (!this.zipType(fileType, fileRaw.name) && !isLt1M) {
             this.$message.error('上传zip大小不能超过200MB,只能是 apk 格式！', 4000)
          }
        return this.zipType(fileType, fileRaw.name) && isLt1M
    },
    updateHandle() {
        let formData = new FormData(),
            // params = 
        
        deviceUpdate().then((res) => {

        })
    }
   }
}
</script>