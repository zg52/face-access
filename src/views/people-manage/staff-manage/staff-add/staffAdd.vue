<!--
 * @Author: your name
 * @Date: 2021-02-07 18:19:07
 * @LastEditTime: 2021-02-23 14:14:00
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
           name: '艾米',
           gender: 'male', // 默认性别男
           faceType: 'id', // 默认证件照

           phone: '15652970356',
           address: 'w',
           idNum: '622826229811192711',
           mail: '2fref@163.com',
           employee_num: '32323',
           companyId: 1,
           position: 'fwe',
           icCardId: '32',
           gateCardId: '32',
           enrollTime: '2021-03-03',
           files: null
         },
         btn_el: ['add']
    }
  },
  created() {
 
  }
}
</script>