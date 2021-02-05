
<template>
  <div>
    <FromHandle :btn_el="btn_el" :addStaffForm="addStaffForm" />
  </div>
</template>
<script>
import FromHandle from '../components/FromHandle'
// import { getGender, getFaceType} from '../components/index'
export default {
  components: { FromHandle },
  data() {
    return {
      addStaffForm: {
           operator: this.$store.getters.username,
           name: 'null',
           gender: 'MALE', // 默认性别男
           img_type: '0', // 默认证件照

           phone: '15652970356',
           address: 'w',
           idNum: '622826199811192711',
           mail: '2@163.com',
           employee_num: '32',
           companyId: 1,
           position: 'fwe',
           icCardId: '32',
           gateCardId: '32',
           enrollTime: '2012-03-03',
           files: null
         },
         btn_el: ['add']
    }
  },
  created() {
 
  }
}
</script>