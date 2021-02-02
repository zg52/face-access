<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-02-02 17:05:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8a16ff;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border:1px #8a16ff dashed;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .camera {
margin-left: 30px;
    margin-top: 44px;
    i {
      font-size: 20px;
    }
  }
  .des {
   color: #999;
    font-size: 12px;
    padding-left: 30px;
    line-height: 16px;
  }
</style>
<template>
  <div class="app-container">
    <!-- <el-form :model="roles" :inline="true">
      <el-form-item label="创建人"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入姓名搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="员工姓名"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入姓名搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="性别">  <el-select class="w100" v-model="value" placeholder="请选择">
          <el-option>
          </el-option> </el-select></el-form-item>
      <el-form-item label="工号"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入工号搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="电话"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入手机号搜索"
        ></el-input
      ></el-form-item>
            <el-form-item label="住址"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入电话搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="邮箱"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入手机号搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="部门">
        <el-select v-model="value" placeholder="请选择">
          <el-option>
          </el-option> </el-select
      ></el-form-item>
      <el-form-item label="职务"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入部门搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="入职时间">
        <el-date-picker
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="离职时间">
        <el-date-picker
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="门禁卡号">
        <el-input v-model.trim="roles.roleName" placeholder="输入部门搜索" ></el-input>
        </el-form-item>
      <el-form-item label="IC卡号"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入部门搜索"
        ></el-input
      ></el-form-item>
 
      <el-form-item label="创建时间">
        <el-date-picker
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="有无人脸">
        <el-select v-model="roles.status" class="w100">
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="roles.status" class="w100">
          <el-option>在职</el-option>
            <el-option
           
          >离职</el-option>
        </el-select>
      </el-form-item>
      <el-button type="success" @click="onSearch" class="search">
        <i class="el-icon-search"></i><span>查询</span></el-button
      >
      <el-button type="warning" @click="onDelete">
        <i class="el-icon-delete"></i><span>批量删除</span></el-button
      >
      <el-button type="primary" @click="onExport">
        <svg-icon icon-class="excel" /> <span>导出</span></el-button
      >
      <el-button type="primary" @click="handleAddRole"
        ><svg-icon icon-class="edit" /> 新增员工</el-button>
    </el-form> -->
    <!-- <el-table :data="rolesList" border class="people_list" max-height="650">
      <el-table-column
        width="50"
        type="selection"
        fixed
      ></el-table-column>
      <el-table-column label="序列" width="60" align="center">
        <template>1</template></el-table-column
      >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="员工姓名" width="80">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="已注册人脸" width="140">
        <template>
          <img src="../../../../assets/image/1.png" alt="" width="140" />
        </template>
      </el-table-column>
     <el-table-column align="center" label="性别" width="100">
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="部门" width="100">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="身份证号" width="80">
        <template slot-scope="scope">
          {{ scope.row.dfs }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="工号" width="80">
        <template slot-scope="scope">
          {{ scope.row.dfs }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话" width="108">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
         <el-table-column align="center" label="住址" width="108">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱" width="108">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="职务" width="108">
        <template slot-scope="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
     <el-table-column align="center" label="门禁卡" width="108">
        <template slot-scope="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="IC卡" width="108">
        <template slot-scope="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="入职时间" width="108">
        <template slot-scope="scope">
          {{ scope.row.entryTime }}
        </template>
      </el-table-column>
            <el-table-column align="center" label="离职时间" width="108">
        <template slot-scope="scope">
          {{ scope.row.entryTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.updataTime }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="状态" width="140">
        <template>          
            在职 </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template> fff </template>
      </el-table-column>
     <el-table-column align="center" label="创建人">
        <template> fff </template>
      </el-table-column>
      <el-table-column align="left" label="操作" width="190" fixed="right">
        <template slot-scope="scope">
            <el-switch
            size="mini"
            active-text="离职"
            inactive-text="在职"
            @change="changeUserStatus(scope.$index, scope.row)"
          ></el-switch>
          <el-button
            class="radius_45"
            type="primary"
            size="mini"
            @click="handleEdit(scope)"
            ><i class="el-icon-edit"></i><span>编辑</span></el-button
          >
          <el-button
            class="radius_45 mt10"
            type="primary"
            size="mini"
            ><i class="el-icon-notebook-2"></i><span>详情</span></el-button
          >

          <el-button
            class="radius_45 mt10"
            type="danger"
            size="mini"
            ><i class="el-icon-delete"></i><span>删除</span></el-button
          ></template
        >
      </el-table-column>
    </el-table> -->

    <el-dialog title="新增员工" :visible.sync="addStaffFormVisible" width="1000px">
     <div v-loading="addSave_loading"  element-loading-text="拼命保存中"  element-loading-spinner="el-icon-loading">
    <el-form :model="addStaffForm" label-width="auto" :rules="addStaffRule" ref="addLibraryRule" class="addStaffForm" :inline="true">
       <el-form-item label="创建人："><el-input v-model="username" class="w160" disabled></el-input></el-form-item>
       <el-form-item label="员工姓名：" prop="name"><el-input v-model="addStaffForm.name" class="w160"></el-input></el-form-item>
       <el-form-item label="性别："><el-select class="w100" v-model="pagingParams.gender"><el-option v-for="(gender, index) of genders" :key="index" :value="gender.value"></el-option></el-select></el-form-item>
       <el-form-item label="电话：" prop="phone"><el-input v-model="addStaffForm.phone"></el-input></el-form-item>
       <el-form-item label="住址：" prop="address"><el-input v-model="addStaffForm.address"></el-input></el-form-item>
       <el-form-item label="身份证号：" prop="idNum"><el-input v-model="addStaffForm.idNum"></el-input></el-form-item>
       <el-form-item label="邮箱：" prop="mail"><el-input v-model="addStaffForm.mail"></el-input></el-form-item>
       <el-form-item label="工号：" prop="companyId"> <el-input v-model.trim="addStaffForm.companyId" maxlength="30"></el-input> </el-form-item>
       <el-form-item label="职务："><el-input v-model="addStaffForm.position" class="w150"></el-input></el-form-item>
       <el-form-item label="所属部门：">
         <el-select v-model="addStaffForm.region" placeholder="超级管理员" disabled>
           <el-option label="人力组" value="shanghai"></el-option>
           <el-option label="行政组" value="beijing"></el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="IC卡号：" prop="icCardId"><el-input v-model.trim="addStaffForm.icCardId" maxlength="30"></el-input></el-form-item>
      <el-form-item label="门禁卡号：" prop="gateCardId"><el-input v-model.trim="addStaffForm.gateCardId" maxlength="30"></el-input></el-form-item>
      <el-form-item label="入职时间：">
        <el-date-picker
          v-model="enrollTime"
           type="datetime"
          align="right"
          unlink-panels
          start-placeholder="创建日期"
          :picker-options="pickerOptions"
          @change="changeDate">
        </el-date-picker>
        </el-form-item>
        <el-form-item label="头像类型：">
          <el-radio-group v-model="addStaffForm.face_type"><el-radio v-for="(faceType, index) of faceTypes" :key="index" :label="faceType.id">{{ faceType.name }}</el-radio></el-radio-group>
        </el-form-item>
        <el-form-item label="备注：" prop="description"><el-input class="w400" type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input></el-form-item><br>
          <el-form-item label="头像采集：" prop="description">
              <el-upload
             class="avatar-uploader fl"
             action="https://jsonplaceholder.typicode.com/posts/"
             :show-file-list="false"
             :on-success="handleAvatarSuccess"
             :before-upload="beforeAvatarUpload">
             <img v-if="imageUrl" :src="imageUrl" class="avatar">
             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
           </el-upload>
           <div class="fl">
               <el-button type="primary" class="camera"><i class="el-icon-camera-solid" /></el-button>
               <p class="des">上传图片文件支持PNG、JPG、<br>JPEG、BMP，图片大小不超过2M</p>
           </div>
          </el-form-item>
     </el-form>
    <div slot="footer" class="dialog-footer t_right">
      <el-button type="primary" @click="resetFaceLibraryForm('addLibraryRule')"><i class="el-icon-folder-add" /><span>批量导入</span></el-button>
      <el-button @click="resetFaceLibraryForm('addLibraryRule')">重 置</el-button>
      <el-button @click="faceFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addFaceLibraryHandler('addLibraryRule')" :disabled="addSave_loading"><i :class="{'el-icon-loading':addSave_loading}"></i> &nbsp;保 存</el-button>
    </div>
     </div>
  </el-dialog> 
  
      <!-- <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="pagingParams['current']"
         :page-sizes="[10, 20, 40, 60, 80, 100, 200, 300, 400]"
         :page-size="pagingParams['size']"
         layout="total, sizes, prev, pager, next, jumper"
         :total="pagingParams['total']"
    ></el-pagination> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { addStaff } from '@/api/people-manage/staffManage'
const genders = [
   { value: '男', id: 'MALE' }, 
   { value: '女', id: 'FEMALE' }
 ]
const faceTypes = [
   { id: 'zj', name: '证件照' }, 
   { id: 'sh', name: '生活照' } 
]
export default {
  name: "",
  data() {
    return {
      addSave_loading: false,
      addStaffFormVisible: true,
      value: 1,
      genders: genders,
      faceTypes: faceTypes,
      pickerOptions: [],
      roles: [
        {
          roleName: "",
        },
      ],
      addStaffForm:  {
           name: '',
           gender: genders[0].value,
           phone: '',
           address: '',
           idNum: '',
           mail: '',
           companyId: '',
           position: '',
           icCardId: '',
           gateCardId: '',
           enrollTime: '',
           face_type: faceTypes[0].id,
           files: ''
         },
      addStaffRule:[],
      rolesList: [
        {
          name: "阿娃",
          description: "算法应用院",
          createTime: "2020 01.12",
          updataTime: "2020 02.13",
          switch: 1,
          dfs: 9988983,
          phone: 15652655412,
          job: "打杂专员",
          sex: "女",
          entryTime: "2023-12-12",
        },
        {
          name: "阿龙",
          description: "超管",
          createTime: "2020 01.12",
          updataTime: "2020 02.13",
          switch: 1,
        },
      ],
     pagingParams: {
        username: "",
        email: "",
        // appkey: "",
        // secret:"",
        createDateFrom: "",
        createDateTo: "",
        current: 1, //默认当前页数为1
        size: 10,
        total: 0,
        status: "",
        // type:'0',
      },
    };
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  methods: {
    onSearch(){

    },
    onDelete() {

    },
    onExport() {

    }
  },
  created() {
    console.log(addStaff())
  },
  mounted() {
    console.log()
  },
};
</script>
