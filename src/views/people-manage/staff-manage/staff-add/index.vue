<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-02-03 11:56:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8a16ff;
    width: 300px;
    height: 400px;
    line-height: 178px;
    text-align: center;
    border:1px #8a16ff dashed;
  }
  .camera {
margin-left: 30px;
    margin-top: 44px;
    i {
      font-size: 20px;
    }
  }
  .el-icon-plus {
position: absolute;
    top: 50%;
    font-size: 60px;
    margin-left: -30px;
    margin-top: -32px;
    color: #d7dae2;
}
  .des {
   color: #999;
    font-size: 12px;
    padding-left: 30px;
    line-height: 16px;
  }
  .img {position: absolute;left:0;top:0;}
    .photo {
    width: 300px;
    height: 400px;
    overflow: hidden;
    border: 1px #8a16ff dashed;
    background-size: contain;
    position: relative;
  }
  ::v-deep .el-loading-spinner i {
    font-size: 22px;
}
  ::v-deep .el-loading-text {
    margin-top: -18px;
  }
  .save_staff {
    justify-content: center;
    display: flex;
    margin-top: -22px;
  }
</style>
<template>
  <div class="app-container">
     <div v-loading="addSave_loading"  element-loading-text="拼命保存中"  element-loading-spinner="el-icon-loading">
     <el-form :model="addStaffForm" label-width="auto" :rules="addStaffRule" ref="addStaffFormRule" class="addStaffForm" :inline="true">
       <el-form-item label="创建人："><el-input v-model="username" class="w160" disabled></el-input></el-form-item>
       <el-form-item label="员工姓名：" prop="name"><el-input v-model="addStaffForm.name" class="w160" clearable></el-input></el-form-item>
       <el-form-item label="性别："><el-select class="w160" v-model="addStaffForm.gender"><el-option v-for="(gender, index) of genders" :key="index" :label="gender.value" :value="gender.id"></el-option></el-select></el-form-item>
       <el-form-item label="电话：" prop="phone"><el-input class="w160" v-model="addStaffForm.phone" clearable></el-input></el-form-item>
       <el-form-item label="职务："  prop="position"><el-input v-model="addStaffForm.position" class="w160" clearable></el-input></el-form-item>
      <el-form-item label="入职时间：">
        <el-date-picker class="w300" v-model="addStaffForm.enrollTime" type="date" align="right" unlink-panels start-placeholder="创建日期" @change="changeDate"></el-date-picker>
        </el-form-item>
       <el-form-item label="住址：" prop="address"><el-input class="w300" v-model="addStaffForm.address" clearable></el-input></el-form-item>
       <el-form-item label="身份证号：" prop="idNum"><el-input class="w300" v-model="addStaffForm.idNum" clearable></el-input></el-form-item>
       <el-form-item label="邮箱：" prop="mail"><el-input class="w300" v-model="addStaffForm.mail" clearable></el-input></el-form-item>
       <el-form-item label="工号：" prop="companyId"><el-input class="w300" v-model.trim="addStaffForm.companyId" maxlength="30" clearable></el-input> </el-form-item>
       <el-form-item label="所属部门：">
         <el-select class="w300" v-model="addStaffForm.region" placeholder="华捷艾米" disabled>
           <el-option label="人力组" value="shanghai"></el-option>
           <el-option label="行政组" value="beijing"></el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="IC卡号：" prop="icCardId"><el-input class="w300" v-model.trim="addStaffForm.icCardId" maxlength="30" clearable></el-input></el-form-item>
      <el-form-item label="门禁卡号：" prop="gateCardId"><el-input class="w300" v-model.trim="addStaffForm.gateCardId" maxlength="30" clearable></el-input></el-form-item>
      <el-form-item label="备注：" prop="description"><el-input class="w360" v-model="addStaffForm.description" type="textarea" :rows="2" placeholder="请输入内容"> </el-input></el-form-item>
      <el-form-item label="头像类型：">
        <el-radio-group v-model="img_type" @change="changeImgType"><el-radio v-for="(faceType, index) of faceTypes" :key="index" :label="faceType.name">{{ faceType.name }}</el-radio></el-radio-group>
      </el-form-item><br>
      <el-form-item label="头像采集：" prop="description">
          <el-upload
            class="avatar-uploader fl"
            :action="proxyUrl"
            :show-file-list="false"
            :on-change="imgChangeHandle"
            :on-success="fileSuccess"
            :before-upload="imgBeforeHandle"
            :on-error="imgError"
            :multiple="true"
            >
            <div class="photo" v-loading="imgUploading" element-loading-text="正在上传中..." element-loading-spinner="el-icon-loading">
           <i class="el-icon-plus"></i>
          <img class="img" v-if="imageUrl" :src="imageUrl" width="100%">
          </div>
       </el-upload>
       <div class="fl">
           <el-button type="primary" class="camera"><i class="el-icon-camera-solid" /></el-button>
           <p class="des">上传图片文件支持PNG、JPG、JPEG、BMP，图片大小不超过2M</p>
       </div>
      </el-form-item><br>
     <el-form-item class="save_staff">
        <el-button type="primary"><i class="el-icon-folder-add" /><span>批量导入</span></el-button>
        <el-button @click="resetAddStaffForm('addStaffFormRule')">重 置</el-button>
        <el-button type="primary" @click="saveStaffHandle('addStaffFormRule')" :disabled="addSave_loading"><i :class="{'el-icon-loading':addSave_loading}"></i> &nbsp;保 存</el-button>
     </el-form-item>
     </el-form>
     </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { saveStaff } from '@/api/people-manage/staffManage'
import moment from 'moment'
import Mock from '../../../../../mock/proxyUrl'

// import { pickerOptions } from '@/utils'
const genders = [
   { value: '男', id: 'MALE' },
   { value: '女', id: 'FEMALE' }
 ]
const faceTypes = [
   { id: 0, name: '证件照' },
   { id: 1, name: '生活照' }
]
export default {
  name: 'staff-add',
  data() {
    function notNull(notNullName) { return [{required: true, message: `员工${ notNullName }不能为空`, trigger: "blur" }] }
    return {
      addSave_loading: false,
      addStaffFormVisible: true,
      imgUploading: false,
      proxyUrl: 'http://www.zg.com',
      genders: genders,
      faceTypes: faceTypes,
      imageUrl: '',
      img_type: faceTypes[0].name,
      files: null,
      addStaffForm: {
           name: null,
           gender: genders[0].id,
           phone: null,
           address: null,
           idNum: null,
           mail: null,
           companyId: null,
           position: null,
           icCardId: null,
           gateCardId: null,
           enrollTime: null,
           img_type: faceTypes[0].id,
         },
      addStaffRule: {
          name: notNull('姓名'),
          phone: notNull('电话'),
          position: notNull('职务'),
          address: notNull('住址'),
          idNum: notNull('身份证号'),
          mail: notNull('邮箱地址'),
          companyId: notNull('工号')
        },
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  methods: {
    
// 提交员工信息
  async saveStaffHandle(el) {
    console.log("🚀 ~ file: index.vue ~ line 192 ~ saveStaffHandle ~ el", this.addStaffForm)
    let _this = this
      //  this.$refs[el].validate((valid) => {
        // if (valid) {
        this.httpRequest()
      // }
    //  })
  },
  changeDate() {
   let a = this.addStaffForm
       a['enrollTime'] =  moment(a['enrollTime']).format('YYYY-MM-DD')
  },
  changeImgType() {
    this.addStaffForm.img_type = this.img_type == 0 ? 0 : 1
  },
   resetAddStaffForm(e) { 
    this.$refs[e].resetFields()
   },

// --------------------------------人脸图上传-----------------------------
//  截取图片名
    cutImageName(filename) {
      let fileReg = /\.{1}[a-z]{1,}$/
        if (fileReg.exec(filename) !== null) {
            return (filename.slice(0, fileReg.exec(filename).index))
        } else {
            return filename
        }
    },
    
// 清空已传图片
    resetFaceList() {
     this.$refs.upload.clearFiles()
        },
      faceUploadOut() {
      this.faceUploladVisible = false
      this.resetFaceList()
      },
 
// 修改图片时
    imgChangeHandle(file,fileList) {
    
    },

// 上传图片前
    imgBeforeHandle(file, fileList) {
      let _this = this
        function imageType () { return ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp'].includes(file.type) }
        const isLt2M = file.size / 1024 / 1024 < 2;
              if (!imageType()) { 
                this.$message.error('上传人脸图片只能是四种格式（jpg/jpeg/png/bmp）!')
                } 
              else if (!isLt2M) {
                 this.$message.error('上传人脸图片大小不能超过2MB!')
              } else { 
                  let format = file.type.substr(file.type.indexOf('/') + 1)
              }
            return imageType() && isLt2M
    },
     fileSuccess(res, file) {
       this.imgUploading = true
        setTimeout(() => {
          this.imgUploading = false
          this.imageUrl = URL.createObjectURL(file.raw)
          this.files = file.raw
           }, 700)
      },
   async httpRequest(content){
         let _this = this,
          formData = new FormData()
          formData.append('files', this.files)
          formData.append('rqParam', new Blob([JSON.stringify(this.addStaffForm)], { type:"application/json" }))
           saveStaff(this.addStaffForm).then((res) => {
                if(res.code === 0 && res.data[0].isSuccess) {
                      this.$message({
                             message: content.file.name + '员工保存成功',
                              type: "success"
                        });
                     }
                },(err) => {
                  console.log(err)
                  }).catch((err) => {
                  console.log(err)

                })
            },
    async submitImg() {
      this.$refs.upload.submit()
    },
 
// 上传失败
     imgError(err, file, fileList) {
     console.log("🚀 ~ file: index.vue ~ line 254 ~ imgError ~ err", err)
       
          //  this.$message({
          //           message: '上传失败，请重试',
          //            type: "error"
          //       })
     },
     handlePictureCardPreview(file) {
             this.dialogImageUrl = file.url
               this.fdImageVisible = true
             },

  },
  created() {
  },
  mounted() {
    console.log()
  },
};
</script>
