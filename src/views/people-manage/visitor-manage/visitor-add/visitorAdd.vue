<!--
 * @Author: your name
 * @Date: 2021-02-03 19:56:03
 * @LastEditTime: 2021-07-02 16:21:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸辨识云\html\face-recognition-access\src\views\people-manage\visitor-manage\visitor-add\index.vue
-->

<template>
  <div>
    <VisitorFromHandle :btn_el="btn_el" :addVisitorForm="addVisitorForm" />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import VisitorFromHandle from '../components/VisitorFromHandle'
// import { getGender, getFaceType} from '../components/index'
export default {
  components: { VisitorFromHandle },
  data() {
    return {
      addVisitorForm: {
           operator: this.$store.getters.username,
           gender: 'male', // 默认性别男
           faceType: 'id', // 默认证件照
           phone: '',
           email: '',
           intervieweePhone: '',
           name: '',
           intervieweeName:'',
           idNum: '',
           address: '',
           reason: '',
           remark: '',
           orgId: 1,
           orgName: '',
           visitorCompany: '',
           status: 'auth',

           visitStartTime: '',
           visitEndTime: '',
           files: null,
         },
         btn_el: ['add']
    }
  },
  methods: {
  ...mapActions('user', ['getCompany'])
    
  },
  created() {
    this.getCompany().then(res => {
      this.addVisitorForm.orgId = res.organizationId
       this.addVisitorForm.orgName = res.organizationName
   })
  }
}
</script>