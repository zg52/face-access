<!--
 * @Author: your name
 * @Date: 2021-02-07 18:19:07
 * @LastEditTime: 2021-07-27 10:08:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\face-recognition-access\src\views\people-manage\staff-manage\staff-add\staffAdd.vue
-->

<template>
  <div>
    <StaffFromHandle :btn_el="btn_el" :addStaffForm="addStaffForm" />
  </div>
</template>
<script>
import StaffFromHandle from '../components/StaffFromHandle'
// import { getGender, getFaceType} from '../components/index'
export default {
  components: { StaffFromHandle },
  data() {
    return {
      addStaffForm: {
           operator: this.$store.getters.username,
           name: '',
           gender: 'male', // 默认性别男
           faceType: 'id', // 默认证件照

           phone: '',
           address: '',
           idNum: '',
           mail: '',
           employee_num: '',
           companyId: 1,
           groupIds: [],
           position: '',
           icCardId: '',
           gateCardId: '',
           enrollTime: '',
           files: ''
         },
         btn_el: ['add']
    }
  },
  created() {
 
  }
}
</script>