<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-01-08 17:16:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<template>
  <div>
    员工列表efewafweafewafaew
  </div>
</template>
<script>
import { addList } from '@/api/people-manage/staff-manage'
export default {
  name: '',
  data() {
    return {

    }
  },
  created() {
    addList({ username: 'yang', password: '12345678' }).then(() => {

    })
  },
  mounted() {
  }

}
</script>
