<!--
 * @Author: your name
 * @Date: 2021-06-22 10:34:11
 * @LastEditTime: 2021-07-02 18:04:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\face-recognition-access\src\views\system-manage\multi-tenant\add-tenant\index.vue
-->
<template>
  <div>
    <AddEdit :formParams="formParams" :btnShow="btnShow"/>
  </div>
</template>
<script>
import '../utils/index'
export default {
  data() {
    return {
      formParams: {
        name: '',
        phone: '',
        email: '',
        address: '',
        creditCode: '',
        companyName: '',
        userName: '',
        nickName: '',
        contact: '',
        pass: '',
        checkPsw: '',
        description: ''
      },
      btnShow: ['add'],
      isReset: true
    }
  }
}
</script>