<!--
 * @Author: your name
 * @Date: 2021-06-10 11:45:08
 * @LastEditTime: 2021-06-16 18:38:00
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
    }
</style>
<template>
    <div class="addBan">
    <el-upload
            ref="upload"
            class="avatar-uploader"
            list-type="picture-card"
            :action="proxyUrl"
            :data="upLoadParams"
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
        <el-button class="mt10" @click="resetFaceList" v-show="fileList.length !== 0"><i class="el-icon-delete"></i> 清空</el-button>
        <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
       <p class="desTip w100w"><i class="el-icon-info"></i>上传素材文件支持图片（支持PNG、JPG、JPEG、BMP，大小不超过2M，尺寸为800px x 800px）、视频（支持avi、rmvb、mp4、wmv、vob，大小不超过20M，尺寸为800px x 800px）</p>

       <el-dialog :visible.sync="dialogVisible1" title="素材预览" id="video_img" :destroy-on-close="true">
         <img width="100%" :src="dialogImageUrl">
         </el-dialog>
       
       <!-- <el-dialog
         title="提示"
         :visible.sync="dialogVisible2"
         :close-on-click-modal="false"
         width="30%"
         >
         <span class="tip"><i class="el-icon-warning icon_warn"></i> 此操作将永久删除当前已上传文件, 是否继续?</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="delNoTip">不在提示</el-button> -->
    <!-- <el-button @click="dialogVisible2 = false">取 消</el-button> -->
    <!-- <el-button type="primary" @click="removeImgHandle('ok')">确 定</el-button> -->
  <!-- </span>  -->
<!-- </el-dialog> -->
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
            
            imgTip: imgTip(),
            video_img_width: 'auto',
            fileList: [],
            delState: null,
            fileStatus: null,
            upLoadParams: [],
            imgId: []
        }
    },
    methods: {
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
     return await new Promise((RESOLVE, REJECT) => {
      if(file.type) {
        const fileType = file.type.substr(0, file.type.indexOf('/'))
        const isLt2M = file.size / 1024 / 1024 < 2
        const readers = new FileReader()
        console.log(file.type)
           
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
                const isLt50M = file.size / 1024 / 1024 < 50
                      if (!vType()) {
                        this.$message.error('上传视频只能是四种格式（avi、rmvb、mp4、wmv、vob）!')
                        this.fileStatus = false, REJECT()
                        } else if (!isLt50M) {
                         this.$message.error('上传视频大小不能超过50MB!')
                         this.fileStatus = false, REJECT()
                      } else {
                          this.fileStatus = true
                          
                          let ul_el = document.getElementsByClassName('avatar-uploader')[0].getElementsByTagName('ul')[0]
                          let videoUrl = URL.createObjectURL(file),
		                            videoObj = document.createElement('video')
                                videoObj.setAttribute('autoplay','true')

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
            alert(0)
            vm.$message.error(`${ file.name } ${ name }宽度不能大于800px!`, 4000), vm.fileStatus = false; REJECT()
          } else if(h[0] !== h[1]) {
            vm.$message.error(`${ file.name } ${ name }高度不能大于800px!`, 4000), vm.fileStatus = false; REJECT()
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
     fileSuccess(res, file, fileList) {
       const fileType = file.raw.type.substr(0, file.raw.type.indexOf('/'))
       if(fileType === 'image') {
         this.getImgIdHadnle(fileList), this.fileList = fileList
         let face_el = document.getElementsByClassName('avatar-uploader')[0].getElementsByTagName('ul')[0]
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
      },
      removeImgHandle() {
            this.delState = true
      },
      handleBeforeRemove(file, fileList) {
        const fileType = file.raw.type.substr(0, file.raw.type.indexOf('/'))
        if(fileType === 'image') {
          let face_el = document.getElementsByClassName('avatar-uploader')[0].getElementsByTagName('ul')[0]
          Array.prototype.forEach.call(face_el.getElementsByTagName('li'), function (el, index) {
            el.onclick = function() {
             vm.fileStatus = true
             }
          })
         if(this.fileStatus) {
          return new Promise((resolve, reject) => {
           // if(this.delState === true) {
                delBan({
                  imgId: 1
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
      console.log("🚀 ~ file: ImgUpload.vue ~ line 266 ~ hadnleProgress ~ file", file)

      },
      getImgIdHadnle(imgId) {
        this.$emit('getImgIdHadnle',imgId)
        return imgId || []
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      delNoTip() {
        sessionStorage.setItem('delImgNoTip', 'true')
      },
      handleRemove(file, fileList) {
        console.log(fileList)
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
    },
    created() {
      vm = this
    },
    mounted() {
    }
    }
</script>