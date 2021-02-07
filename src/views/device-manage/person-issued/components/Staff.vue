<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-01-25 14:21:47
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
   .app-container1 {
       padding-top: 6px;
   }
</style>
<template>
  <div class="app-container1">
    <el-form :model="roles" :inline="true">
        <el-form-item label="设备名称">
        <el-select v-model="value" placeholder="请选择">
          <el-option>
          </el-option> </el-select></el-form-item>
       <el-form-item label="设备ID">
        <el-select v-model="value" placeholder="请选择">
          <el-option>
          </el-option> </el-select></el-form-item>
 
      <el-form-item label="下发人"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入姓名搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="员工姓名"
        ><el-input
          class="w100"
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
        class="w130"
          v-model.trim="roles.roleName"
          placeholder="输入手机号搜索"
        ></el-input
      ></el-form-item>
 
      <el-form-item label="部门">
        <el-select v-model="value" placeholder="请选择">
          <el-option>
          </el-option> </el-select
      ></el-form-item>
      <el-form-item label="职务">
        <el-select v-model="value" placeholder="运营">
          <el-option>
          </el-option> </el-select
      ></el-form-item>
 
      <el-form-item label="门禁卡号">
        <el-input v-model.trim="roles.roleName" placeholder="输入部门搜索" ></el-input>
        </el-form-item>
      <el-form-item label="IC卡号"
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
          start-placeholder="结束日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="下发时间">
        <el-date-picker
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="下发日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="下发状态">
        <el-select v-model="roles.status" class="w100">
          <el-option>已下发</el-option>
            <el-option
          >未下发</el-option>
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
        ><svg-icon icon-class="guide" />  一键下发</el-button>
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
       <el-table-column align="center" label="所在设备" width="100">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
             <el-table-column align="center" label="所在设备ID" width="100">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
     <el-table-column align="center" label="性别" width="90">
        <template>
         女
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
       <el-table-column align="center" label="下发状态" width="140">
        <template>          
            已下发 </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template> fff </template>
      </el-table-column>
     <el-table-column align="center" label="下发人">
        <template> fff </template>
      </el-table-column>
      <el-table-column align="center" label="创建人">
        <template> fff </template>
      </el-table-column>
      <el-table-column label="操作" width="190" fixed="right">
        <template slot-scope="scope">
          
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
          >  <el-switch
             class="mt10"
            size="mini"
            active-text=""
            inactive-text="下发"
            @change="changeUserStatus(scope.$index, scope.row)"
          ></el-switch></template
        >
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
  </div>
</template>
<script>
import { addStaff } from '@/api/people-manage/staffManage'
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
    handleAddRole() {
        this.$message.success('张三 已下发至设备SHFFJEF')  
    },
    onSearch(){

    },
    onDelete() {

    },
    onExport() {

    }
  },
  created() {

  },
  mounted() {
  },
};
</script>
