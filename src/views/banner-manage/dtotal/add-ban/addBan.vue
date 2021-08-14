<!--
 * @Author: your name
 * @Date: 2021-06-04 17:23:44
 * @LastEditTime: 2021-06-21 11:26:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\face-recognition-access\src\views\banner-manage\addBan\addBan.vue
-->
<style lang="scss" scoped>
.banForm {
    width: 500px;
    
}
</style>
<template>
    <div class="app-container">
        <el-form class="banForm" ref="banForm" :model="banForm" :rules="banFormRule" label-width="100px">
            <!-- <el-form-item label="广告类型：">
                <el-radio-group v-model="banType" @change="banTypeHandle">
                   <el-radio v-for="(banTit, index) of banTypeList" :key="index" :label="banTit.id">{{ banTit.name }}</el-radio>
                </el-radio-group>
            </el-form-item> -->
            <el-form-item label="广告名称：" prop="adTitle"><el-input maxlength="30" v-model.trim="banForm.adTitle" placeholder="请输入广告名称" clearable></el-input></el-form-item>
            <el-form-item label="广告类型：" prop="adTitle"><el-input maxlength="30" v-model.trim="banForm.type" placeholder="如：教育/商超/咨询/服务/技术" clearable></el-input></el-form-item>
            <el-form-item class="w100w" label="广告素材：" :rules="{required: true}">
              <ImgUpload @getImageIdHandle="getImageIdHandle" />
            </el-form-item>
            <el-form-item label="播放时间：" prop="banTime">
               <el-date-picker
                  v-model="banForm.banTime"
                  type="datetimerange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00']"
                  @change="changeDate"
                  >
             </el-date-picker>
            </el-form-item>
            <el-form-item label="选择广告库："><el-input v-model.trim="banForm.banTit" placeholder="请选择广告库" disabled></el-input></el-form-item>
              <el-form-item label="描述："><el-input v-model.trim="banForm.description" placeholder="请输入描述信息"></el-input></el-form-item>
             <el-form-item label="投放页面：">
                <el-radio-group v-model="banForm.page" @change="banTypeHandle">
                   <el-radio v-for="(page, index) of pages" :key="index" :label="page.id">{{ page.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <div class="text-center w90w">
                <el-button type="primary" @click="handleAdd_edit('banForm')" :disabled="SateLoading" v-loading="SateLoading"><i class="el-icon-check"></i> 保存</el-button>
                 <router-link to="/banner-manage/dtotal/ban-list/banList" class="ml10"><el-button><i class="el-icon-view"></i> 查看广告列表</el-button></router-link>
                </div>
        </el-form>
    </div>
</template>
<script>
import { validateChars } from '@/utils/validate'
import { uploadBanMsg } from '@/api/banner-mannage'
import moment from 'moment'
import './index'
let vm 

export default {
    name: 'addBan',
    data() {
     let validateAdTitle = (rule, value, callback) => {
      value === ""
        ? callback(new Error("请输入广告名称"))
        : validateChars(value)
        ? callback(new Error("广告名不能出现特殊符号"))
        : callback()
    }
        function notNull(notNullName) { return [{required: true, message: `请输入${ notNullName }`, trigger: "blur" }] }
        return {
            banType: 1,
            SateLoading: false,
            banTypeList: [
                {
                     id: 1,
                    name: '图片'
                },
                {
                    id: 2,
                    name: '视频'
                }
            ],
            pages: [
                {
                    id: 1,
                    name: '待机页面'
                },
                {
                    id: 2,
                    name: '识别页面'
                }
            ],
           banForm: {
               adTitle: '',
            //    banTit: 'dd',
               createTimeFrom: '',
               createTimeTo: '',
               banTime: null,
               description: '',
               page: 1,
               imageId: [],
               banTime: []
            },
            banFormRule: {
                adTitle: [notNull('广告名称')[0], { validator: validateAdTitle, trigger: "blur"  }],
                banTime: notNull('播放时间')
            }
        }
    },
    methods: {
        banTypeHandle() {
        },
    handleAdd_edit(el) {
      this.$refs[el].validate((valid) => {
          if (valid) {
              let params = {...this.banForm}
              let formData = new FormData()
              for(let i in params) {
                  formData.append(i, params[i])
              }
              if(this.banForm.imageId.length !== 0) {
                uploadBanMsg(formData).then(res => {
                    if(res.code === 0) {
                        this.$message.success(res.msg)
                    } else {
                        this.$message.error(res.msg)
                    }
                })               
              } else {
                  this.$message.warning('请上传广告图', 4000)
              }
          }
        })
    },
    getImageIdHandle(upLoadParams) {
        this.banForm.imageId = upLoadParams?.['imageId']
        this.banForm.banTime = upLoadParams?.['banTime']
        return upLoadParams
    },
    changeDate() {
    let _p = this.banForm
      _p.banTime && _p.banTime.length
        ? ((_p.createTimeFrom = moment( _p.banTime[0]).format("YYYY-MM-DD HH:DD:ss")),
          (_p.createTimeTo = moment( _p.banTime[1]).format("YYYY-MM-DD HH:DD:ss")))
        :  _p.createTimeFrom = _p.createTimeTo = null
    }
    },
    created() {
      vm = this
    }
}
</script>

