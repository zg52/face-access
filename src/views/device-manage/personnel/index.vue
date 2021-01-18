<!--
 * @Author: your name
 * @Date: 2021-01-15 17:56:08
 * @LastEditTime: 2021-01-18 15:20:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\device-manage\personnel\index.vue
-->
<style scoped>
.app-container {
  padding-top:10px;
}
  
</style>
<template>
<div class="app-container">
  <el-tabs :tab-position="tabPosition">
    <el-tab-pane label="员工下发"><Staff /></el-tab-pane>
    <el-tab-pane label="访客下发"><Visitor /></el-tab-pane>
    <el-tab-pane label="其他" disabled>其他</el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import Staff from './components/Staff'
import Visitor from './components/Visitor.vue';
  export default {
    components: {
      Staff,
      Visitor
    },
    data() {
      return {
        tabPosition: 'top'
      };
    }
  };
</script>
