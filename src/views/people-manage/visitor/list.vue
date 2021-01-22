<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-01-21 16:37:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
.people_list {
  // margin-top: 24px;
}
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
    <el-form :model="roles" :inline="true">
         <el-form-item label="创建人"
        ><el-input
         class="w100"
          v-model.trim="roles.roleName"
          placeholder="输入姓名搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="来访人姓名"
        ><el-input
         class="w100"
          v-model.trim="roles.roleName"
          placeholder="输入姓名搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="性别">  <el-select class="w100" v-model="value" placeholder="请选择">
          <el-option
          >
          </el-option> </el-select></el-form-item>
      <el-form-item label="所在公司"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入工号搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="电话"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入电话搜索"
        ></el-input
      ></el-form-item>
            <el-form-item label="住址"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入电话搜索"
        ></el-input
      ></el-form-item>
            <el-form-item label="身份证号"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入电话搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="被访人姓名"
        ><el-input
        class="w100"
          v-model.trim="roles.roleName"
        ></el-input
      ></el-form-item>
            <el-form-item label="被访人电话"
        ><el-input
          class="w130"
          v-model.trim="roles.roleName"
          placeholder="输入被访人电话搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="来访事由"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入来访事由搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="来访时间">
        <el-date-picker
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="来访日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
            <el-form-item label="预约时间">
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
      <el-form-item label="授权状态">
        <el-select v-model="roles.status">
          <el-option>已授权</el-option>
           <el-option>未授权</el-option>
          <el-option>已过期</el-option>
          <el-option>已拒绝</el-option>
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
      <el-button type="primary" @click="onExport">
        <svg-icon icon-class="edit" /> <span>新增访客</span></el-button
      >
    </el-form>
    
    <el-table :data="rolesList" border class="people_list" max-height="650">
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

      <el-table-column align="center" label="来访人姓名" width="100">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
     <el-table-column align="center" label="来访人头像" width="140">
        <template>
          <img src="../../../assets/image/2.png" alt="" width="140" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别" width="100">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
            <el-table-column align="center" label="所在公司" width="100">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
            <el-table-column align="center" label="电话" width="100">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
         <el-table-column align="center" label="住址" width="100">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="身份证号" width="80">
        <template slot-scope="scope">
          {{ scope.row.dfs }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="被访人姓名" width="100">
        <template slot-scope="scope">
          {{ scope.row.dfs }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="被访人电话" width="108">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="来访事由" width="108">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
 
     <el-table-column align="center" label="来访时间" width="108">
        <template slot-scope="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="预约时间" width="108">
        <template slot-scope="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.updataTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="140">
        <template>
           已授权
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template> fff </template>
      </el-table-column>
            <el-table-column align="center" label="创建人" width="100">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="210" fixed="right">
        <template slot-scope="scope">
            <el-switch
            size="mini"
            active-text="通过"
            inactive-text="拒绝"
            @change="changeUserStatus(scope.$index, scope.row)"
          ></el-switch>
            <el-switch
            class="mt10"
            size="mini"
            active-text="拉黑"
            inactive-text="正常"
            @change="changeUserStatus(scope.$index, scope.row)"
          ></el-switch><br>
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
            ><i class="el-icon-delete"></i><span>删除</span></el-button></template>
      </el-table-column>
    </el-table>

      <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="pagingParams['current']"
         :page-sizes="[10, 20, 40, 60, 80, 100, 200, 300, 400]"
         :page-size="pagingParams['size']"
         layout="total, sizes, prev, pager, next, jumper"
         :total="pagingParams['total']"
    ></el-pagination>
          <el-dialog title="新增访客" :visible.sync="userFormVisible" width="1000px">
     <div v-loading="addSave_loading"  element-loading-text="拼命保存中"  element-loading-spinner="el-icon-loading">
    <el-form :model="addUserForm" label-width="auto" :rules="libraryRule" ref="addLibraryRule" class="addUserForm" :inline="true">
      <el-form-item label="访客姓名："><el-input v-model="username" style="width: 160px"></el-input></el-form-item>
        <el-form-item label="性别："><el-input v-model="username" class="w100"></el-input></el-form-item>
             <el-form-item label="所在公司："><el-input v-model="username"></el-input></el-form-item>
          <el-form-item label="电话："><el-input v-model="username"></el-input></el-form-item>
           <el-form-item label="住址："><el-input v-model="username"></el-input></el-form-item>
           <el-form-item label="身份证号："><el-input v-model="username"></el-input></el-form-item>
           <el-form-item label="被访人姓名："><el-input v-model="username"></el-input></el-form-item>
      <el-form-item label="被访人电话：" prop="displayName" :rules="{ required: true, message: '脸库名称不能为空'}">
        <el-input v-model.trim="addUserForm.displayName" placeholder="工号" maxlength="30"></el-input>
      </el-form-item>
       <el-form-item label="访问事由：" prop="displayName" :rules="{ required: true, message: '脸库名称不能为空'}">
        <el-input v-model.trim="addUserForm.displayName" placeholder="工号" maxlength="30"></el-input>
      </el-form-item>
           <el-form-item label="访问时间：">
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
 
     <el-form-item label="备注：" prop="description"><el-input class="w400"
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="textarea">
</el-input></el-form-item><br>
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
  </div>
</template>
<script>
import { addList } from "@/api/people-manage/staff-manage";
export default {
  name: "",
  data() {
    return {
      userFormVisible:true,
      value: 1,
      pickerOptions: [],
      roles: [
        {
          roleName: "",
        },
      ],
      addUserForm: [
        
      ],
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
  methods: {
    onSearch(){

    },
    onDelete() {

    },
    onExport() {

    }
  },
  created() {
    addList({ username: "yang", password: "12345678" }).then(() => {});
  },
  mounted() {},
};
</script>
