<!--
 * @Author: your name
 * @Date: 2021-06-04 17:23:44
 * @LastEditTime: 2021-06-11 10:38:17
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
            <el-form-item label="广告类型：" :rules="{required: true}">
                <el-radio-group v-model="banType" @change="banTypeHandle">
                   <el-radio v-for="(banTit, index) of banTypeList" :key="index" :label="banTit.id">{{ banTit.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="广告名称：" prop="adTitle"><el-input maxlength="30" v-model="banForm.adTitle" placeholder="请输入广告名称"></el-input></el-form-item>
            <el-form-item class="w100w" label="广告素材：" :rules="{required: true}">
              <ImgUpload />
            </el-form-item>
            <el-form-item label="播放时间："><el-input v-model.trim="banForm.banTit" placeholder="请输入广告名称"></el-input></el-form-item>
            <el-form-item label="选择广告库："><el-input v-model.trim="banForm.banTit" placeholder="请输入广告名称"></el-input></el-form-item>
            <el-form-item label="投放页面："><el-input v-model.trim="banForm.banTit" placeholder="请输入广告名称"></el-input></el-form-item>
            <div class="text-center"><el-button type="primary" @click="handleAdd_edit('banForm')" :disabled="SateLoading" v-loading="SateLoading"><i class="el-icon-check"></i> 保存</el-button></div>
        </el-form>
    </div>
</template>
<script>
import { validateChars } from '@/utils/validate'

import './index'
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
            
           banForm: {
               adTitle: '',
               banTit: 'dd'
            },
            banFormRule: {
                adTitle: [notNull('广告名称')[0], { validator: validateAdTitle, trigger: "blur"  }]
            }
        }
    },
    methods: {
        banTypeHandle() {
        },
    handleAdd_edit(el) {
      this.$refs[el].validate((valid) => {
          if (valid) {
 
            
          } else {
            return false
          }
        })
    },
    }
}
</script>

