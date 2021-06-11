<!--
 * @Author: your name
 * @Date: 2021-06-07 10:42:07
 * @LastEditTime: 2021-06-07 19:02:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\face-recognition-access\src\views\banner-manage\banList\op.vue
-->
<!--<template>
  <div><slot v-if="true"></slot></div>
</template>
-->
<script>
export default {
  props: ["el", "title"],
  data() {
    return {
      ops: 12
    }
  },
  render(h, params) {
      return (
      <div><span  onClick={(e) => { this.opss() }}>{this.ops}</span></div>
    )
    // return h (
    //   'div',
    //    {
    //     value: 'dddd',
    //     domProps: {
    //     // innerHTML: `<div>
    //     // </div>`
    //     },
    //     on: {
    //       click: () => {
    //         alert(0)
    //       }
    //     } 
    //    },
    //   [
    //     h('h1','list'),
    //     this.$slots.default //不具名插槽
    //   ]
    // )
  },
  methods: {
    opss() {
      alert(0)
    }
  },
  created() {
  },
  mounted() {
  
  }
}
</script>
 