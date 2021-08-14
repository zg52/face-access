<!--
 * @Author: your name
 * @Date: 2021-06-22 15:20:35
 * @LastEditTime: 2021-06-22 15:20:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\face-recognition-access\src\components\Form\use.md
-->
<template>
  <div class="content-page">
    <div class="tab-content">
      <div class="ces-search">
        <Form 
          ref="refForm" 
          :action="action"
          labelWidth="130px" 
          :searchForm="searchForm" 
          width="280px" 
          :searchData="searchData" 
          :searchHandle="searchHandle" 
          :isHandle="true" 
          :limit="limit"
          @uploadImg="uploadImg"
          @onExceedLimits="onExceedLimits"
          :imgList="searchData.picture"
          :rules="rules">
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import Form from '@/components/Form'
// import { uploadFile } from "@/api/index"
export default {
  components: {
    Form
  },
  data() {
    let typeList = [
      { label: "批发", value: 1 },
      { label: "零售", value: 2 },
      { label: "餐饮", value: 3 },
    ]
    let statusList = [
      { label: "上线", value: 1 },
      { label: "待上线", value: 2 },
      { label: "下线", value: 3 },
    ]
    return {
      searchData: {
        projectName: "",
        introduce: "",
        Switch: false,
        type: "",
        status: 1,
        status1: 1,
        status2: [1, 2],
        date: "",
        time: "",
        dateTime: "",
        dateTimes: "",
        slider: 10,
        picture: ""
      },
      limit: 1,
      action: "/ImageServer/YmUpload_image",
      searchForm: [
        { label: '项目名称', prop: "projectName", type: "Input", placeholder:'请输入项目名称...', width: "320px" },
        { label: '项目描述', prop: "introduce", type: "Input", placeholder:'请输入项目描述...', width: "320px" },
        { label: '是否有营业', prop: "state", type: "Switch" },
        { label: '项目类型', prop: "type", type: "Select", placeholder:'请选择项目类型...', width: "320px", options: typeList, change: this.typeChange },
        { label: '项目状态', prop: "status", type: "Radio", radios: statusList},
        { label: '项目状态', prop: "status1", type: "RadioButton", radios: statusList},
        { label: '项目状态', prop: "status2", type: "Checkbox", checkboxs: statusList},
        { label: '日期', prop: "date", type: "Date", placeholder:'请选择日期...', width: "320px" },
        { label: '时间', prop: "time", type: "Time", placeholder:'请选择时间...', width: "320px" },
        { label: '日期时间', prop: "dateTime", type: "DateTime", placeholder:'请选择日期时间...', width: "320px" },
        { label: '日期范围', prop: "dateTimes", type: "datetimerange", placeholder:'请选择日期范围...', width: "320px" },
        { label: '进度', prop: "slider", type: "Slider"},
        { label: '照片', prop: "picture", type: "upload"},
      ],
      searchHandle:[ //查询和重置按钮
        { label:'保存', type:'primary', size: "small", handle:this.save }
      ],
      rules: {
        projectName: [ { required: true, message: "请输入项目名称...", trigger: "blur" } ],
        introduce: [ { required: true, message: "请输入项目描述...", trigger: "blur" } ],
        type: [{ required: true, message: "请选择项目类型...", trigger: "change" }],
        state: [{ required: true, message: "是否有营业...", trigger: "change" }],
        status: [{ required: true, message: "请选择项目状态...", trigger: "change" }],
        status1: [{ required: true, message: "请选择项目状态...", trigger: "change" }],
        status2: [{ required: true, message: "请选择项目状态...", trigger: "change" }],
        date: [{ required: true, message: "请选择日期...", trigger: "change" }],
        time: [{ required: true, message: "请选择时间...", trigger: "change" }],
        dateTime: [{ required: true, message: "请选择日期时间...", trigger: "change" }],
        dateTimes: [{ required: true, message: "请选择日期范围...", trigger: "change" }],
      }
    }
  },
  mounted() {
    
  },
  props: ['imgList'],
  methods: {
    save() {
      console.log(this.searchData, "保存")
      console.log(this.$refs.refForm, "@111")
      this.$refs.refForm.$children[0].validate((valid) => {
        if (valid) {
          console.log('success submit!!');
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    uploadImg(file) {
      console.log(file)
      let imgUploadForm = new FormData();
      imgUploadForm.append("file", file.file);
      uploadFile(imgUploadForm).then((res) => {
        this.searchData.picture = res.fileUrl
      });
    },
    onExceedLimits(file) {
      if (file.length >= 1) {
        this.$notify({
          title: "警告",
          message: "上传失败，一次只能上传1张图片哦~",
          type: "warning",
          duration: 2000,
        });
      }
    },
    typeChange(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-page {
  .tab-content {
    width: 100%;
    padding: 20px;
  }
}
</style>