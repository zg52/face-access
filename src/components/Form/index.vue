<template>
    <div>
        <el-form class="form" ref="formParams" :model="formParams"  :rules="rules"  :size="size"  :label-width="labelWidth" :hide-required-asterisk="isShowRequired" :width="width">
            <el-form-item v-for="(item, index) in formItem" :prop="item.prop" :label="item.label" :key='index' class="formItem">
<!-- 输入框 -->
                <el-input v-if="item.type==='Input'"  v-model.trim="formParams[item.prop]"  size=""  :style="{width:item.width}" :placeholder="item.placeholder" clearable></el-input>
                <el-input v-if="item.type==='Pass'" :show-password="true" type="password"  v-model.trim="formParams[item.prop]"  size=""  :style="{width:item.width}" :placeholder="item.placeholder" clearable></el-input>
<!-- 下拉框 -->
                <el-select v-if="item.type==='Select'" v-model.trim="formParams[item.prop]" size="" @change="item.change(formParams[item.prop])"  :style="{width:item.width}" clearable>
                    <el-option v-for="op in item.options" :label="op.label" :value="op.value" :key="op.value"></el-option>
                </el-select>
<!-- 单选 -->
                <el-radio-group v-if="item.type==='Radio'" v-model.trim="formParams[item.prop]">
                    <el-radio v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio>
                </el-radio-group>
<!-- 单选按钮 -->
                <el-radio-group v-if="item.type==='RadioButton'" v-model.trim="formParams[item.prop]" @change="item.change && item.change(formParams[item.prop])" clearable>
                    <el-radio-button v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio-button>
                </el-radio-group>
<!-- 复选框 -->
                <el-checkbox-group v-if="item.type==='Checkbox'" v-model.trim="formParams[item.prop]" clearable>
                    <el-checkbox v-for="ch in item.checkboxs" :label="ch.value" :key="ch.value">{{ch.label}}</el-checkbox>
                </el-checkbox-group>
<!-- 日期 -->
                <el-date-picker v-if="item.type==='Date'" v-model.trim="formParams[item.prop]" clearable></el-date-picker>
<!-- 时间 -->
                <el-time-select v-if="item.type==='Time'" v-model.trim="formParams[item.prop]" clearable></el-time-select>
<!-- 日期时间 -->
                <el-date-picker v-if="item.type==='DateTime'" type='datetime' v-model.trim="formParams[item.prop]" :disabled="item.disable && item.disable(formParams[item.prop])" clearable></el-date-picker>
<!-- 日期范围 -->
                <el-date-picker v-if="item.type==='datetimerange'" type='datetimerange' v-model.trim="formParams[item.prop]"  range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期" clearable></el-date-picker>
<!-- 滑块 -->
                <el-slider v-if="item.type==='Slider'" v-model.trim="formParams[item.prop]"></el-slider>
<!-- 开关 -->
                <el-switch v-if="item.type==='Switch'" v-model.trim="formParams[item.prop]" ></el-switch>
<!-- 上传照片 -->
                <el-upload
                    v-if="item.type==='upload'"
                    ref="upload"
                    :multiple="true"
                    :action="action"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-exceed="onExceedLimit"
                    :http-request="handleSuccess"
                    accept=".JPG,.png,.GIF"
                    :limit="limit"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
<!-- 按钮 -->
            <div v-if='isHandle' class="handle">
                <div v-for='(item , index) in searchHandle' :key="index">
                    <el-button v-show="isReset" @click="resetAddStaffForm"  :size="item.size || size"><i class="el-icon-refresh"></i><span>重 置</span></el-button>
                    <el-button class="ml10 save mr10" :type="item.type" :size="item.size || size" @click='item.handle()'><i class="el-icon-check"></i> {{item.label}}</el-button>
                    <slot></slot>
                </div>
            </div>
    </el-form>
    </div>
</template>

<script>
export default  {
    props: {
        isHandle:{
            type:Boolean,
            default: true
        },
        isReset: {
            type: Boolean,
            default: true  
        },
        labelWidth:{
            type:String,
            default: '80px'
        },
        width:{
            type:String,
            default: '200px'
        },
        size:{
            type:String,
            default: ''
        },
        rules:{
            type:Object,
            required: true
            // default: function(){
			// 	return { }
			// }
        },
        formItem:{
            type:Array, 
            default: []
        },
        searchHandle:{
            type:Array,
            default: ()=>[]
        },
        formParams:{
            type:Object,
            default: function(){
				return {}
			}
        },
        limit:{
            type:Number
        },
        action: String,
        imgList: String,
        isShowRequired:{
            type:Boolean,
            default: true
        }
    },
    mounted() {
        console.log(this.imgList)
    },
    watch: {
        imgList: {
            handler(newVal, oldVal) {
                console.log(newVal, oldVal)
                this.fileList = []
                this.fileList.push({url: this.imgList})
            },
            deep: true
        }
    },
    data() {
        return {
            fileList: [],
            dialogImageUrl: "",
            dialogVisible: false
        }
    },
    methods: {
        resetAddStaffForm() { 
          this.$refs['formParams'].resetFields()
     },
        handleSuccess(file) {
            this.$emit('uploadImg', file)
        },
        onExceedLimit(file) {
            this.$emit('onExceedLimits', file)
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
    }
}
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
}
.handle {
    text-align: center;
}
</style>