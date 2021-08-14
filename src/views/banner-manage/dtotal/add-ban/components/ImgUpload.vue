<!--
 * @Author: your name
 * @Date: 2021-06-10 11:45:08
 * @LastEditTime: 2021-06-21 17:18:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\face-recognition-access\src\views\banner-manage\dtotal\add-ban\components\ImgUpload.vue
-->
<style lang="scss" scoped>
.addBan {
  border: 1px #DCDFE6 solid;
  padding: 15px;width: 88%;padding-top:5px;
    &::v-deep .el-upload--picture-card {
    background: transparent;
    width: 230px;    margin-top: 10px;

  }
  &::v-deep .el-upload-list--picture-card .el-upload-list__item {
      width: 230px;
  }
  &::v-deep .el-upload-list--picture-card .el-upload-list__item {
    margin-bottom:-15px;margin-top: 10px;
  }
  .tip {
    font-size: 16px;
    i {
      font-size: 24px;
      position: relative;
      top:3px;
    }
  }
  &::v-deep .el-dialog__body {
    padding:0;
    padding-left: 20px;
  }
  &::v-deep .el-upload-dragger {
    border:none;
    width: 230px;
    height: 148px;
    background: transparent;
  }
  &::v-deep {
    .el-icon-delete {
      display: none;
    }
  }
}
    .el-icon-upload {
      font-size: 25px;
      display: block;color: #c0c4cc;
      position: relative;
      top: -4px;
    }
    .el-icon-upload + i {
    top: -85px;
    width: 100%;
    text-align: center;
    display: block;
    font-size: 14px;
    position: relative;
    }
    .desTip {
        margin:0;
        position: relative;
        top:9px;
    }
 
    .banUp {
      border-bottom: 1px #eee solid;
      padding-bottom: 10px;
      
    }
    .banTime{
    //   border-right: 1px #DCDFE6 solid;
    // padding-bottom: 120px;
    padding-right: 50px;
    margin-left: 20px;
    &::v-deep .el-form-item__label {
      top: 110px;
    position: relative;
    }
    }
    .banBtn {
 
    background: transparent;
    
    }
    .add_ban {
      border-left: 1px #eee solid;
      padding-left: 50px;
    padding-bottom: 47px;
    margin-top: 5px;
    }
    .banmsg {
          position: relative;
   left: -145px;
   p {
        margin:0;
        line-height: 28px;
        color: #777;
      }
}
</style>
<template>
    <div class="addBan" ref="addBan">
      <div class="banUp clearfix" v-for="(banUp, index) in banUps" :key="index"  @mouseenter.prevent="getUploadNum(index)">
        <el-form-item class="fl" :rules="{ required: true }" :label="`第${ index + 1 }个素材`"></el-form-item>
         <el-upload
               :ref="`upload${ banUp.id }`"
               :class="`avatar-uploader${ banUp.id } fl`"
               list-type="picture-card"
               :action="proxyUrl"
               :on-change="imgChangeHandle"
               :on-success="fileSuccess"
               :before-upload="imgBeforeHandle"
               :on-preview="handlePictureCardPreview"
               :on-exceed="imgExceedHandle"
               :on-error="imgError"
               :show-file-list="true"
               :before-remove="handleBeforeRemove"
               :on-remove="handleRemove"
               :on-progress="hadnleProgress"
               :limit="1"
               multiple
               drag
               >
               <span><i class="el-icon-upload"></i><i slot="tip">拖拽至此或点击上传</i></span>
          </el-upload>
           <el-form-item v-show="banUp.banTimeShow" class="banTime fl mt10" label="播放时长(单位：秒)：" :rules="{ required: banUp.format.indexOf('image') !== -1 ? true :  false }" label-width="170px">
            <div class="banmsg">
              <p>名称：{{ banUp.name }}</p>
              <p>格式：{{ banUp.format }}</p>
              <p>尺寸：{{ banUp.px }}</p>
              <p>大小：{{ banUp.size }}</p>
            </div>
            <div>
              <el-input-number v-if="banUp.format.indexOf('image') !== -1 ? true :  false" class="w150" v-model="banUp.time" @change="handleBanTimeChange(index)" :min="5" :max="60"></el-input-number>
              <span v-if="banUp.format.indexOf('image') !== -1 ? false : true">{{ banUp.video_duration }}</span>
            </div>
           </el-form-item>
           <div class="add_ban fl" v-show="banUp.banTimeBtn">
             <el-button @click.prevent="removeBan_el_handle(index)"><i class="el-icon-delete"></i> 删除</el-button>
             <el-button class="mt70 banBtn" type="primary" plain  @click="addBanHandle(index)"><i class="el-icon-circle-plus-outline"></i> 第 {{ index + 2 }} 个素材</el-button>
             </div>
      </div>

       <p class="desTip"><i class="el-icon-info"></i>上传素材文件支持图片（支持PNG、JPG、JPEG、BMP，大小不超过2M，尺寸为800px * 800px）、视频（支持avi、rmvb、mp4、wmv、vob，大小不超过20M，尺寸为800px * 800px）</p>
       <el-dialog :visible.sync="dialogVisible1" title="素材预览" id="video_img" :destroy-on-close="true">
         <img width="100%" :src="dialogImageUrl">
         </el-dialog>
    </div>
</template>
<script>
import Mock from '@/../mock/proxyUrl'
import {proxyUrl_1, imgUrl } from '@/api/public'
import { uploadBan, delBan } from '@/api/banner-mannage'
import { imgTip } from '@/utils/txtTip'
let vm

export default {
    data() {
        return {
            save_loading: false,
            imgUploading: false,
            dialogVisible1: false,
            dialogVisible2: false,
            proxyUrl: proxyUrl_1,
            dialogImageUrl: '',
            dialogVideoUrl: '',
            banTimeShow: false,
            MB: (1024 * 1024), // 1字节＝1/1048576M约为0.000001M
            
            banUps: [
              {
                id: 0,
                banTimeShow: false,
                banTimeBtn: false,
                time: 5,
                timeShow: true,
                name: '',
                format: '',
                px: '800px * 800px',
                size: '',
                video_duration: 0,
                imageId: null
              },
            ],
            uploadNum: null,
            imgTip: imgTip(),
            video_img_width: 'auto',
            fileList: [],
            delState: null,
            fileStatus: null,
            upLoadParams: {
              imageId: [],
              banTime: []
            },
            imageId: [],
            banTime: {
              one: 1
            },
           'videoObj.duration': 0
        }
    },
    methods: {
    getUploadNum(index) {
      this.uploadNum = index
    },
    addBanHandle(index) {
      this.banUps.push({
          id: index + 1,
          banTimeShow: false,
          banTimeBtn: false,
          time: 5,
          timeShow: true,
          name: '',
          format: '',
          px: '800px * 800px',
          size: '',
          video_duration: null,
          imageId: null
      })
      new Promise((reslove) => {
        this.banUps[0] ? reslove() : String
      }).then(() => {
        this.btnFalse(index)
        
      })

    },
    cutImageName(filename) {
      let fileReg = /\.{1}[a-z]{1,}$/
        if (fileReg.exec(filename) !== null) {
            return (filename.slice(0, fileReg.exec(filename).index))
        } else {
            return filename
        }
    },
    resetFaceList() {
        this.$confirm('此操作将永久删除当前已上传文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              this.$refs.upload.clearFiles(), this.fileList = []
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })    
        })
        },
    faceUploadOut() {
      this.faceUploladVisible = false
      this.resetFaceList()
      },
    imgChangeHandle(file,fileList) {
    },
    async imgBeforeHandle(file) {
     console.log("🚀 ~ file: ImgUpload.vue ~ line 246 ~ imgBeforeHandle ~ file", file)
     return await new Promise((RESOLVE, REJECT) => {
      if(file.type) {
        const fileType = file.type.substr(0, file.type.indexOf('/'))
        const isLt2M = file.size / 1024 / 1024 < 2
        const readers = new FileReader()
           
        if(fileType === 'image') {
        function imageType () { return ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp'].includes(file.type) }

          if (!imageType()) {
                this.$message.error('上传图片只能是四种格式（jpg/jpeg/png/bmp）!')
                this.fileStatus = false, REJECT()
                } else if (!isLt2M) {
                 this.$message.error('上传图片大小不能超过2MB!')
                 this.fileStatus = false, REJECT()
              } else { 
                  this.fileStatus = true
                  new Promise((reslove) => {
                           readers ? reslove() : String
                         }).then(() => {
                            readers.readAsDataURL(file)
                            readers.onload = function (e) {
                            let url = e.target.result,
                                img = new Image()
                                img.src = url
                                img.onload = function () { 
                                    pxRule([img.width, 800], [img.height, 800], '图片')
                                  }
                        }
                         })
              }
                
// 视频
        } else if(fileType === 'video') {
                const isLt50M = file.size / 1024 / 1024 < 100
                      if (!vType()) {
                        this.$message.error('上传视频只能是四种格式（avi、rmvb、mp4、wmv、vob）!')
                        this.fileStatus = false, REJECT()
                        } else if (!isLt50M) {
                         this.$message.error('上传视频大小不能超过50MB!')
                         this.fileStatus = false, REJECT()
                      } else {
                          this.fileStatus = true
                          
                          let ul_el = document.getElementsByClassName(`avatar-uploader${ vm.uploadNum }`)[0].getElementsByTagName('ul')[0]
                          let videoUrl = URL.createObjectURL(file),
		                            videoObj = document.createElement('video')
                                videoObj.setAttribute('autoplay','true'), videoObj.setAttribute('class', 'video_avatar')

/**
 * @description: 视频流转为url
 */
                          new Promise((resolve, reject) => {
		                          videoObj.onloadedmetadata = function (evt) {
		                            URL.revokeObjectURL(videoUrl)
		                            videoObj.width = videoObj.videoWidth
                                console.log("🚀 ~ file: ImgUpload.vue ~ line 222 ~ newPromise ~ videoObj.videoWidth", videoObj.videoWidth)
		                            videoObj.height = videoObj.videoHeight
		                            resolve(videoObj)
	                          }
		                           videoObj.src = videoUrl
		                           videoObj.load()
                               }).then(res => {
                                 let video_width = res.width, video_height = res.height
                                 new Promise(resove1 => ul_el ? resove1() : String).then(() => {
                                   let li_el = ul_el.getElementsByTagName('li')[0], el_icon_zoom = li_el.getElementsByClassName('el-icon-zoom-in')[0], video_img_el = document.getElementById('video_img')
                                       li_el.insertBefore(videoObj, li_el.childNodes[0])
                                       li_el.removeChild(li_el.childNodes[1])
                                       
                                       el_icon_zoom.onclick = function () {
                                         video_img_el.style.width = video_width
                                         setTimeout(() => {
                                           let el_dialog__body = video_img_el.getElementsByClassName('el-dialog__body')[0]
                                               el_dialog__body.getElementsByTagName('img')[0].style.display = 'none'
                                           readers.onload = (evt) => {
                                             let video_el = document.createElement('video')
                                                 video_el.autoplay = 'true', video_el.controls = 'true'
                                                 video_el.src = evt.target.result
                                                 el_dialog__body.appendChild(video_el)
                                              }
                                              readers.readAsDataURL(file)
                                         },100)
                                       }
                                       
                                       new Promise((reslove) => {
                                         let video_duration = videoObj.duration
                                         if(video_duration) reslove(video_duration)
                                       }).then((res) => {
                                         Number(res) >= 5 ? (vm['videoObj.duration'] = res, vm.banUps[vm.uploadNum].video_duration = res) : (vm.$message.error('视频播放时长不能小于5秒！', 4000), REJECT())
                                       }).catch(() => {
                                         vm['videoObj.duration'] = 0
                                       })
                                       
                             })
                              pxRule([video_width, 800], [video_height, 800], '视频')
                          },(err)=>{
                      	return Promise.reject()
                      })
                      }
                function vType () { return ['video/x-ms-wmv', 'video/mp4'].includes(file.type) }
        } else {
          REJECT()
        }
        
        function pxRule(w, h, name) {
          console.log("🚀 ~ file: ImgUpload.vue ~ line 261 ~ pxRule ~ w, h", w, h)
          try {
          if(w[0] !== w[1]) {
            vm.$message.error(`${ file.name } ${ name }宽度不是800px!`, 4000), vm.fileStatus = false; REJECT()
          } else if(h[0] !== h[1]) {
            vm.$message.error(`${ file.name } ${ name }高度不是800px!`, 4000), vm.fileStatus = false; REJECT()
          } else {
            RESOLVE()
          }
        } catch{
          vm.fileStatus = false
          REJECT()
            }
           }
      } else {
        REJECT()
      }
  })
    },
    btnFalse(index) {
          vm.$set(vm.banUps[index], 'banTimeBtn', false)
        },
     fileSuccess(res, file, fileList) {
      //  setTimeout(() => {
        if(res.code === 0) {
          let upLoadParams = this.upLoadParams,
              fileType = file.raw.type.substr(0, file.raw.type.indexOf('/')),
                fileName = file.name, 
                raw = file.raw,
                avatar_uploader = document.getElementsByClassName(`avatar-uploader${ this.uploadNum }`)[0], 
                el_upload_picture_card = avatar_uploader.getElementsByClassName('el-upload--picture-card')[0], 
                face_el = avatar_uploader.getElementsByTagName('ul')[0]

           this.banUps[this.uploadNum]['imageId'] = res.code // 获取成功的imageId
           this.upLoadParams['imageId'].push(res.code)       // 获取imageId
           this.upLoadParams['banTime'].push(res.msg)        // 获取播放时长
           
           new Promise((reslove) => {
             if(upLoadParams['imageId'].length !== 0) reslove()
           }).then(() => {
             this.getimageIdHadnle(upLoadParams)
           })


             this.$message.success(`${ file.name } 上传成功`)
             el_upload_picture_card.style.display = 'none', this.$set(this.banUps[this.uploadNum], 'banTimeShow', true), this.$set(this.banUps[this.uploadNum], 'banTimeBtn', true)
             
             if(this.uploadNum === 7) {
               this.btnFalse(this.uploadNum)
               this.banUps.forEach((item) => {
                vm.$set(item, 'banTimeBtn', false)
               })
         }
         
// 获取图片信息
        this.banUps[this.uploadNum]['name'] = fileName, this.banUps[this.uploadNum]['format'] = raw.type, this.banUps[this.uploadNum]['size'] = `${ (Number(raw.size) / this.MB).toFixed(3) }M`
         
       if(fileType === 'image') {
             this.fileList = fileList
              new Promise((resolve) => {
                  face_el ? resolve() : String
              }).then(() => {
                Array.prototype.forEach.call(face_el.getElementsByTagName('li'), function (el, index) {
                  let img_el = el.getElementsByTagName('img')[0]
                  if (img_el) {
                       el.style = 'background:url(' +  img_el.getAttribute('src') + ') top center no-repeat;background-size: contain'
                       el.removeChild(el.childNodes[0]) 
                  }
          })
       })
       } else if(fileType === 'video') {
         
       }
      }
      //  },100)
      },
      removeImgHandle() {
            this.delState = true
      },
      handleBeforeRemove(file, fileList) {
        const fileType = file.raw.type.substr(0, file.raw.type.indexOf('/'))
        if(fileType === 'image') {
          let face_el = document.getElementsByClassName(`avatar-uploader${ this.uploadNum }`)[0].getElementsByTagName('ul')[0]
          Array.prototype.forEach.call(face_el.getElementsByTagName('li'), function (el, index) {
            el.onclick = function() {
             vm.fileStatus = true
             }
          })
         if(this.fileStatus) {
          return new Promise((resolve, reject) => {
           // if(this.delState === true) {
                delBan({
                  imageId: 1
                  }).then((res) => {
                  if(res.code === 0) {
                   //  this.dialogVisible2 = false
                    this.$message.success(`${ 'file.name' } 删除成功`)
                  resolve()
                  } else {
                    reject()
                    this.$message.success(`${ 'file.name' } 删除失败`, 4000)
             }
           })
           })          
        } 
        } else if(fileType === 'video') {
        } else {
          return true
        }
      },
      hadnleProgress(event, file, fileList) {
      // console.log("🚀 ~ file: ImgUpload.vue ~ line 266 ~ hadnleProgress ~ file", file)

      },
      getimageIdHadnle(upLoadParams) {
        this.$emit('getImageIdHandle', upLoadParams)
        return upLoadParams || this.upLoadParams
      },
      submitUpload() {
        // this.$refs.upload.submit()
      },
      delNoTip() {
        sessionStorage.setItem('delImgNoTip', 'true')
      },
      handleRemove(file, fileList) {
        // console.log(fileList)
      },

// 物理删除上传元素节点
      removeBan_el_handle(index) {
         let face_el = document.getElementsByClassName('avatar-uploader0')[0]
         
       let banUpsCory = [...this.banUps]
           if(index === 0) {
             [].splice.call(banUpsCory, index, 0)
             this.banUps =  banUpsCory
             this.banUps = [{
                id: 0,
                banTimeShow: false,
                banTimeBtn: false,
                time: 5,
                timeShow: true,
                name: '',
                format: '',
                px: '',
                size: '',
                video_duration: 0,
                imageId: null
              }]
              new Promise((resolve) => {
                face_el ? resolve(face_el) : String
                }).then((el) => {
                let el_upload_picture_card = el.getElementsByClassName('el-upload--picture-card')[0],
                    del = face_el.getElementsByClassName('el-upload-list__item-delete')[0]
                    del.click()
                    el_upload_picture_card.style.display = 'inline-block'
              })
           } else {
             [].splice.call(banUpsCory, index, 1)
             this.banUps =  banUpsCory
             this.banUps[index - 1].banTimeBtn = true
           }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible1 = true
      },
      imgExceedHandle(files, fileList) {
        this.$message({
                      message: files.length > 6 ? '单次最多可上传1张': '单次上传总数不能超过1张',
                      type: "warning"
                  })
       },
     imgError(err, file, fileList) {
       this.$message({
                message: `${ file.name }上传失败，请重试`,
                 type: "error"
            })
     },
     handleBanTimeChange() {
     },

    },
    created() {
      vm = this
    },
    mounted() {
    }
    }
</script>