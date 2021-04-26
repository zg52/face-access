<!--
 * @Author: your name
 * @Date: 2021-04-25 16:21:15
 * @LastEditTime: 2021-04-26 19:28:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitee\pc\face-recognition-access\src\views\device-manage\device-list\components\DeviceUpdate.vue
-->
<style lang="scss" scoped>
    .updates {
        ::v-deep .el-dialog__body {
            padding-top: 5px;
        }
        ::v-deep .el-upload-list__item {
            width: 32.5%;
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
            :close-on-click-modal="false"
            :before-close="beforeClose"
            width="60%"
            >
            <div class="cont"  v-loading="update_loading" element-loading-spinner="el-icon-loading" element-loading-text="升级中">
                <div class="tit">当前升级的设备类型：{{ updateParams.deviceType }}</div>
              <div class="box">
                  <h4>更新流程说明</h4>
                 <el-steps :active="4">
                  <el-step title="上传固件"></el-step>
                  <el-step title="确认更新"></el-step>
                  <el-step title="查看更新状态"></el-step>
                  <el-step title="完成/重试更新"></el-step>
                </el-steps>
              </div>
              <el-form ref="form" class="form" :model="form" label-position="right" label-width="120px">
                  <el-form-item label="选择更新类型：" :rules="{required: true}">
                      <el-radio-group v-model="updateType" @change="updateTypeHandle">
                          <el-radio v-for="(updateType, index) of updateTypes" :key="index" :disabled="index === 1 ? true : false" :label="updateType.value" :value="updateType.id"></el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="上传升级包：" :rules="{required: true}">
                 <el-upload
                        class="uploader"
                        ref="uploadZip"
                        :action="action"
                        :before-upload="beforeZipUpload"
                        :on-error="zipError"
                        :on-success="handleZipSuccess"
                        :on-remove="handleRemove"
                        :limit="1"
                        >
                      <el-button slot="trigger"><i class="el-icon-upload2"></i> 上传文件</el-button> 
                      <!-- <span class="d" @click="getBatchHandle"><i class="el-icon-download"></i> 获取固件</span> -->
                      <span class="tip"><i class="el-icon-info"></i> 注意：文件 &lt; 200M, 文件命名格式为：文件名 + 版本号，两者之间用‘-’分隔，如：app-v1.1.apk</span>
                      <div slot="tip" class="el-upload__tip"></div>
                    </el-upload>

                  </el-form-item>
                   <el-form-item label="新应用版本号："><el-input class="w100" disabled type="text" v-model="form.upgradeVersion"></el-input></el-form-item>
              </el-form>
            </div>
            <div slot="footer">
                  <el-popconfirm
                     confirmButtonText="确认"
                     cancelButtonText="继续升级"
                     title="确定要取消升级么？"
                     @onConfirm="cancel">
            <el-button class="mr30" slot="reference">取 消</el-button>
          </el-popconfirm>
                <el-button type="primary" :disabled="update_loading" @click="updateHandle">下一步</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

import { proxyUrl_1 } from '@/api/public'
import { deviceUpdate, downPatch } from '@/api/device-manage'
import Mock from '../../../../../mock/proxyUrl'

export default {
    props: {
        updateParams: {
            type: Object,
            default: false
        },
    },
   data() {
       return {
        action: proxyUrl_1,
        updateVisible: true,
        update_loading: false,
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
        form: {
            upgradeType: 1,
            file: null,
            deviceId: null,
            upgradeVersion: null,
            operator: this.$store.getters.username
            
        }
       }
   },
   methods: {
       getBatchHandle() {
           let t = this.updateTypes
           downPatch(this.updateType === t[0]?.value ? t[0]?.value : t[1]?.value)
       },
       updateTypeHandle() {
       if(this.updateType == this.updateTypes[0].value) {
           this.form.upgradeType  = this.updateTypes[0].id
       } else {
          this.form.upgradeType = this.updateTypes[1].id
       }
       },
       cancel() {
           this.updateParams.updateVisible = false
           this.$message('已取消升级')
           sessionStorage.removeItem('prevBtn')
           this.$router.go(0)
       },
       beforeZipUpload(file) {
    return this.zipRule(file.type, file.size, file)
  },
   handleZipSuccess(res, file) {
       let [fileName, index] = [file.name, file.name.lastIndexOf('-')]
           this.form.file = file.raw
           if(index !== -1) {
              this.form.upgradeVersion = fileName.substr(index+ 1, 4)
           }
    },
  zipError(err, file, fileList) {
    // if(this.zipType(file.raw.type, file.raw.name)) {
    //    this.open1(`${ file.raw.name } 上传失败，请重试`, '失败', 'error')
    // }
  },
  zipType(fileType, fileName) {
     let zipFormat = fileName.lastIndexOf('.')
   return fileType === 'application/vnd.android.package-archive' || (fileName).substr(zipFormat + 1).includes('apk')
  },
  zipRule(fileType, fileSize, fileRaw) {
     const isLt1M = fileSize / 1024 / 1024 < 200
     let [isNumber, fileName] = [/^[0-9]+.?[0-9]*$/, fileRaw.name]
   
        if (!this.zipType(fileType, fileRaw.name)) { 
          this.$message.error('上传压缩包只能是 apk 格式！', 4000)
          } else if (this.zipType(fileType, fileRaw.name) && !isLt1M) {
             this.$message.error('上传zip大小不能超过500MB！', 4000)
          } else if (!this.zipType(fileType, fileRaw.name) && !isLt1M) {
             this.$message.error('上传zip大小不能超过200MB,只能是 apk 格式！', 4000)
          } else if(fileName.lastIndexOf('-v') !== -1) {
              let vIndex = fileName.lastIndexOf('-v')
                  if(!isNumber.test(fileName[vIndex + 2])) {
                      this.$message.error('文件命名格式错误！', 4000)
                      return false
                  }
          }
        return this.zipType(fileType, fileRaw.name) && isLt1M
    },
    updateHandle() {
        let params = this.form
        sessionStorage.setItem('prevBtn', true)
         this.$emit('showRecords')
        if(params?.file !== null) {
            let formData = new FormData()
            for(let x in this.form) {
                formData.append(x, this.form[x])
            }
         this.update_loading = true
        deviceUpdate(formData).then((res) => {
            if(res.code === 0) {
                this.update_loading = false
                sessionStorage.setItem('prevBtn', true)
                this.$emit('showRecords')
            } else {
                this.update_loading = false
                this.$message.error(res.msg, 4000)
            }
        })
        } else {
            !params?.file ? this.$message.warning('请上传升级包!', 4000) : String
        }
    },
    handleRemove(file, fileList) {
     this.form.file = null
    },
    beforeClose(done) {
    this.$confirm('确定要取消升级？').then(_ => {
            done()
            this.cancel()
          }).catch(_ => {})
    }
   },
   created() {
       this.form.deviceId = this.updateParams.deviceId
   },
}
</script>