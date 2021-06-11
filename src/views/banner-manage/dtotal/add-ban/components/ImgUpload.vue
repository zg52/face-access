<!--
 * @Author: your name
 * @Date: 2021-06-10 11:45:08
 * @LastEditTime: 2021-06-11 19:09:23
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
}
    .el-icon-upload {
      font-size: 25px;
      display: block;color: #c0c4cc;
      position: relative;
      top: 46px;
    }
    .el-icon-upload + i {
    top: 20px;
    width: 100%;
    text-align: center;
    display: block;
    font-size: 14px;
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
            action="_api/api/v1/passing/blocklist"
            :on-change="imgChangeHandle"
            :on-success="fileSuccess"
            :before-upload="imgBeforeHandle"
            :on-preview="handlePictureCardPreview"
            :on-exceed="imgExceedHandle"
            :on-error="imgError"
            :show-file-list="true"
            :file-list="fileList"
            :before-remove="handleBeforeRemove"
            :on-remove="handleRemove"
            :limit="6"
            multiple
            >
            <span><i class="el-icon-upload"></i><i slot="tip">拖拽至此或点击上传</i></span>
       </el-upload>
        <el-button class="mt10" @click="resetFaceList"><i class="el-icon-refresh-right"></i> 清空</el-button>
       <p class="desTip w100w"><i class="el-icon-info"></i>{{ imgTip }}，最多可上传6张图片</p>

       <el-dialog :visible.sync="dialogVisible1"><img width="100%" :src="dialogImageUrl"></el-dialog>
       
       <el-dialog
         title="提示"
         :visible.sync="dialogVisible2"
         :close-on-click-modal="false"
         width="30%"
         >
         <span class="tip"><i class="el-icon-warning icon_warn"></i> 此操作将永久删除该文件, 是否继续?</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="delNoTip">不在提示</el-button>
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="removeImgHandle('ok')">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
import '@/../mock/proxyUrl'
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
            imgTip: imgTip(),
            dialogImageUrl: '',
            fileList: [],
            delState: null,
            fileUrllist: []
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
     this.$refs.upload.clearFiles()
        },
    faceUploadOut() {
      this.faceUploladVisible = false
      this.resetFaceList()
      },
    imgChangeHandle(file,fileList) {
    },
    imgBeforeHandle(file, fileList) {
        function imageType () { return ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp'].includes(file.type) }
        const isLt2M = file.size / 1024 / 1024 < 2
              if (!imageType()) {
                this.$message.error('上传人脸图片只能是四种格式（jpg/jpeg/png/bmp）!')
                } else if (!isLt2M) {
                 this.$message.error('上传人脸图片大小不能超过2MB!')
              } else { 
                  let format = file.type.substr(file.type.indexOf('/') + 1)
              }
            return imageType() && isLt2M
    },
     fileSuccess(res, file) {
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
         this.fileUrllist.push(file.url)
      })
      },
      removeImgHandle() {
            this.delState = true
      },
      handleBeforeRemove(file, fileList) {
        //  console.log("🚀 ~ file: ImgUpload.vue ~ line 165 ~ handleBeforeRemove ~ file", file)
         let face_el = document.getElementsByClassName('avatar-uploader')[0].getElementsByTagName('ul')[0]
         let ass = face_el.getElementsByTagName('li')
        let imgUrls = [...vm.fileUrllist]
        console.log(imgUrls)
        // console.log(this.fileUrllist)
        let imgUrl = ''
          Array.prototype.forEach.call(face_el.getElementsByTagName('li'), function (el, index) {
            // for(let i = 0; i< ass.length; i++) {
            //   let a = ass[i].getAttribute('style'),
            //          b = a.substr(17),
            //          c = b.substr(0, b.indexOf(')') - 1)
            //            console.log(vm.fileUrllist[i],c)
            //          if(imgUrls[i] === c) {
            //             // ass[i].style = 'display:none'
            //             face_el.removeChild(face_el.childNodes[i])
            //             imgUrls = imgUrls.splice(i, 1)
            //            break;
            //          }
            // }
            el.onclick = function() {
               face_el.removeChild(face_el.childNodes[index])
            }
                 

         })
        // for()
         return false
        //  return new Promise((resolve, reject) => {
        //   if(this.delState === true) {
        //        delBan({
        //          imgId: 1
        //          }).then((res) => {
        //          if(res.code === 0) {
        //            this.dialogVisible2 = false
        //         this.$message.success(`${ 'file.name' } 删除成功`)
        //          resolve()
        //          } else {
        //            this.$message.success(`${ 'file.name' } 删除失败`, 4000)
        //             this.delState = false
        //     }
        //   })
        // } else {
        //   if(sessionStorage.getItem('delImgNoTip') === 'true') {
           
        //      this.dialogVisible2 = false
        //       if(this.delState === true) {
        //         this.dialogVisible2 = false
        //         return resolve()
        //       } else {
        //         return reject()
        //       }
        //    } else {
        //      this.dialogVisible2 = true
        //   reject()
        //   }
        // }
        //   })
      },
      delNoTip() {
        sessionStorage.setItem('delImgNoTip', 'true')
        this.dialogVisible2 = false
      },
      handleRemove(file, fileList) {
        console.log(fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleDownload(file) {
        console.log(file);
      },
      imgExceedHandle(files, fileList) {
        this.$message({
                      message: files.length > 6 ? '单次最多可上传6张': '单次上传总数不能超过6张，请先清空',
                      type: "warning"
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