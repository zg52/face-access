<!--
 * @Author: your name
 * @Date: 2021-01-15 17:56:08
 * @LastEditTime: 2021-02-26 16:47:39
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
  <el-tabs v-model="activeName" :tab-position="tabPosition">
      <el-tab-pane v-for="(tab, index) of tabs" :label="tab.value" :key="index">
         <StaffRecords v-if="isShow1"/>
         <VisitorRecords v-if="isShow2"/>
         <StrangerRecords v-if="isShow3"/>
    </el-tab-pane>
    <!-- <el-tab-pane label="其他" disabled>其他</el-tab-pane> -->
  </el-tabs>
</div>
</template>
<script>
import StaffRecords from './StaffRecords'
import VisitorRecords from './VisitorRecords'
import StrangerRecords from './StrangerRecords'
  export default {
    components: {
      StaffRecords,
      VisitorRecords,
      StrangerRecords
    },
    data() {
      return {
        tabs: [
          {
            value: '员工通行记录',
          },
          {
            value: '访客通行记录',
          },
          {
            value: '陌生人',
          }
        ],
        tabPosition: 'top',
        activeName: 0,
        isShow1: true,
        isShow2: false,
        isShow3: false
      };
    },
    watch: {
      activeName(val) {
         this.$router.push(`${ this.$route.path }?tab=${ val }`)
         sessionStorage.setItem('personRecords', val)
         if(val == 0) {
           this.isShow2 = false, this.isShow3 = false, this.isShow1 = true
         } else if(val == 1) {
           this.isShow1 = false, this.isShow3 = false, this.isShow2 = true
         } else {
           this.isShow1 = false, this.isShow2 = false, this.isShow3 = true
         }
       }
    },
    created() {
      const tab = this.$route.query.tab
       if (tab) {
         this.activeName = tab
       }
    let getTabIndex = sessionStorage.getItem('personRecords')
        this.activeName = getTabIndex
        this.$router.push(`${ this.$route.path }?tab=${ getTabIndex }`)
    },
    mounted() {
    }
  };
</script>
