<!--
 * @Author: your name
 * @Date: 2021-02-03 19:56:03
 * @LastEditTime: 2021-02-22 17:51:58
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
           phone: '15652545652',
           intervieweePhone: '15652985625',
           name: '艾米',
           intervieweeName: '很好',
           idNum: '622826229811192711',
           address: 'w',
           reason: '233',
           remark: '面试',
           orgId: 1,
           visitorCompany: '1',
           status: 'auth',

           visitStartTime: null,
           visitEndTime: null,
           files: null,
         },
         btn_el: ['add']
    }
  },
  created() {
 
  }
}
</script>