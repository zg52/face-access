<!--
 * @Author: your name
 * @Date: 2021-06-22 10:34:11
 * @LastEditTime: 2021-07-02 17:04:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\face-recognition-access\src\views\system-manage\multi-tenant\add-tenant\index.vue
-->
<style lang="scss"scoped>
.form_params {
width: 550px;
}
</style>
<template>
    <div class="flex app-container">
       <Form 
          class="form_params"
          ref="refForm"
          labelWidth="95px"
          :formItem="formItem"
          width="300px"
          :formParams="formParams"
          :searchHandle="searchHandle"
          :isHandle="true"
          :isReset="isReset"
          :rules="rules"
          :isShowRequired="isShowRequired"
          >
        <template v-slot:default>
          <router-link v-show="btnShow.includes('add')" class="to_list" to="/system-manage/multi-tenant/tenant-list"><el-button><i class="el-icon-view"></i> 查看租户列表</el-button></router-link>
          <slot name="cacelBtn"></slot>
        </template>
        </Form>
    </div>
</template>
<script>
import Form from '@/components/Form'
import { validPhone, validatePass, validateChars, validateCreditCode, validateChinese } from '@/utils/validate.js'
import { addTenant, editTenant } from '@/api/multi-tenant'
import md5 from 'js-md5'
let vm

export default {
  components: {
    Form
  },
  props: {
      formParams: {
          type: Object,
          default: {}
      },
      btnShow: {
          type: Array,
          default: []
      },
      isReset: {
          type: Boolean,
          default: true
      },
      userNameShow: {
        type: Boolean,
        default: true
      }
  },
  data() {
      let validateName = (rule, value, callback) => {
          value === ''
        ? callback(new Error("请输入租户名"))
        : validateChars(value)
        ? callback(new Error("不能输入特殊字符"))
        : String
          callback()
       },
      validatePsw1 = (rule, value, callback) => {
      value === ""
        ? callback(new Error("请输入密码"))
        : !validatePass(value)
        ? callback(new Error("请输入6~16位数字、字母和符号组合的密码"))
        : this.formParams.checkPsw !== ""
        ? callback()
        : String
          callback()
    },
     validatePsw2 = (rule, value, callback) => {
      value === ""
        ? callback(new Error("请再次输入密码"))
        : value !== this.formParams.pass
        ? callback(new Error("两次输入密码不一致!"))
        : String
          callback()
    },
    validateCredit = (rule, value, callback) => {
       value === ''
        ? callback(new Error("请输入社会统一信用代码"))
        : !validateCreditCode(value)
        ? callback(new Error("信用代码格式不正确"))
        : String
          callback()
       },
    validatePhone = (rule, value, callback) => {
        !validPhone(value) ? callback(new Error("手机号格式错误")) : callback()
         callback()
       },
    validateUserName = (rule, value, callback) => {
       value === ''
         ? callback(new Error("请输入账号"))
         : validateChinese(value)
         ? callback(new Error("不能输入中文或特殊字符"))
         : String
           callback()
       }
    function notNull(notNullName) { return [{required: true, message: `请输入${ notNullName }`, trigger: 'blur' }] }
    
    return {
      formParams: {
        name: null,
        phone: null,
        email: null,
        address: null,
        creditCode: null,
        companyName:null,
        userName: null,
        nickName: null,
        contact:null,  
        pass: null,
        checkPsw: null,
        description: null
      },
      isReset: true,
      isResetParams: false,
      isShowRequired: false,
      formItem: [
        { label: '账号：', prop: 'userName', type: 'Input', placeholder:'请输入账号' },
        { label: '租户名：', prop: 'name', type: 'Input', placeholder:'请输入租户名' },
        { label: '企业名称：', prop: 'companyName', type: 'Input', placeholder:'请输入企业名称' },
        { label: '联系人：', prop: 'contact', type: 'Input', placeholder:'请输入联系人' },
        { label: '手机号：', prop: 'phone', type: 'Input', placeholder:'请输入手机号' },
        { label: '邮箱：', prop: 'email', type: 'Input', placeholder:'请输入邮箱' },
        { label: '地址：', prop: 'address', type: 'Input', placeholder:'请输入联系地址' },
        { label: '信用代码：', prop: 'creditCode', type: 'Input', placeholder:'请输入社会统一信用代码' },
        { label: '密码：', prop: 'pass', type: 'Pass', placeholder:'请输入密码' },
        { label: '确认密码：', prop: 'checkPsw', type: 'Pass', placeholder:'请再次输入入密码' },
        { label: '描述：', prop: 'description', type: 'Input', placeholder:'描述信息' },
      ],
      rules: {
        contact: notNull('联系人'),
        address: notNull('联系地址'),
        companyName: notNull('企业名称'),
        name: { required: true, validator: validateName, trigger: 'blur' },
        pass: { required: true, validator: validatePsw1, trigger: 'blur' },
        checkPsw: { required: true, validator: validatePsw2, trigger: 'blur '},
        creditCode: { required: true, validator: validateCredit, trigger: 'blur' },
        userName: { required: true, validator: validateUserName, trigger: 'blur' },
        phone: [notNull('手机号')[0], { validator: validatePhone, trigger: "blur" }],
        email: [notNull('邮箱')[0], { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
        },
        searchHandle:[
          { label:'保存', type:'primary', size: '', handle:this.save }
        ],
  }
  },
  methods: {
    save() {
      this.$refs.refForm.$children[0].validate((valid) => {
        if (valid) {
            let params = { ...this.formParams }
            if(this.btnShow.includes('add')) {
                addMsg()
            } else {
                editMsg()
            }
          
          params.pass = md5(params.pass).toUpperCase()

          function addMsg() {
            addTenant(params).then((res) => {
              if(res.code === 0) {
                vm.$message.success(res.msg)
                vm.$refs.refForm.$children[0].resetFields()
              } else {
                vm.$message.error(res.msg)
              }
          })
          }
          function editMsg() {
            editTenant(vm.formParams, vm.formParams.id).then((res) => {
              res.code === 0 ? (vm.$message.success(res.msg), vm.$emit('refreshTableData')) : vm.$message.error(res.msg)
            })
          }
        }
      })
    },
  },
  beforeCreate() {
      vm = this
  },
  mounted() {
      if(!this.userNameShow) {
      this.formItem.map((item, index, arr) => {
        if(item.prop === 'checkPsw' || item.prop === 'pass') {
          arr.splice(index, 1)
        }
      })
     this.formItem.splice(0, 1)
     this.formItem.splice(7, 1)
    }
  }
}
</script>

