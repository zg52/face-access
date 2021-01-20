<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-01-20 11:34:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
.p_num {
  color: #999;
  font-size: 12px;
  
}
</style>
<template>
  <div class="app-container">
    <el-form :model="roles" label-width="120px">
       <el-form-item label="选择设备ID：">
        <el-select v-model="value" placeholder="请选择">
          <el-option>
          </el-option> </el-select></el-form-item>
   <el-form-item label="选择通行方式：">
       <div class="block">
  <el-cascader
    :options="options"
    :props="props"
    clearable></el-cascader>
 </div>
           </el-form-item>
      <el-form-item label="通行规则名称：" 
        ><el-input
        class="w200"
          v-model.trim="roles.roleName"
          placeholder="常客"
        ></el-input
      ></el-form-item>
      <el-form-item label="通行规则描述：" 
               ><el-input
               class="w200"
         type="textarea"
         placeholder="请输入内容"
         v-model="roles.roleName"
         maxlength="50"
         show-word-limit
       ></el-input></el-form-item>
    <el-form-item label="通行人员类型：">
      <el-radio-group v-model="radio">
    <el-radio :label="3" border @click.native="yg">员工 <sub class="p_num">已选102人</sub></el-radio>
    <el-radio :label="6" border>访客  <sub class="p_num">已选102人</sub></el-radio>
  </el-radio-group>
        </el-form-item>
     <el-form-item label="选择通行时间：">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
    <el-tab-pane label="星期制" name="first">
  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
  </el-checkbox-group>
    </el-tab-pane>
    <el-tab-pane label="日期制" name="second">
       <el-date-picker
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
    </el-tab-pane>
  </el-tabs>
       
      </el-form-item>
    <el-button type="primary" @click="handleAddRole"
        ><svg-icon icon-class="guide" />  一键下发</el-button>
    </el-form>

    <el-dialog
  title="选择通行人员"
  :visible.sync="dialogVisible"
  width="100%"
  :before-close="handleClose">
      <el-form :model="roles" :inline="true">
 
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
 
      <el-button type="success" @click="onSearch" class="search">
        <i class="el-icon-search"></i><span>查询</span></el-button
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
      <el-table-column align="center" label="员工姓名" width="80">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="已注册人脸" width="140">
        <template>
          <img src="../../assets/image/1.png" alt="" width="140" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="通行规则" width="90">
        <template>
         默认规则
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
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>   
 
  </div>
</template>
<script>
import { addList } from "@/api/people-manage/staff-manage";
export default {
  name: "",
  data() {
     const cityOptions = ['星期一', '星期二', '星期三', '星期四', '星期五'];
    return {
       checkAll: false,
        checkedCities: ['星期一', '星期二'],
        cities: cityOptions,
        isIndeterminate: true,
      dialogVisible: true,
      radio: null,
       props: { multiple: true },
       options: [
         {
          label: '刷脸',
       },
       {
          label: '指纹',
       },
       {
          label: '二维码',
       },
         {
          label: '刷卡',
          children: [
            {
            value: 'shejiyuanze',
            label: '门禁卡',
           },
           {
            value: 'shejiyuanze',
            label: 'IC卡',
           },
           {
            value: 'shejiyuanze',
            label: '身份证',
           }
          ]
       },
        
       ],
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
    yg() {
    //  this.radio3 = 3
    },
    handleAddRole() {
        this.$message.success('张三 已下发至设备SHFFJEF')  
    },
    onSearch(){

    },
    onDelete() {

    },
    onExport() {

    },
     handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
  },
  created() {
    addList({ username: "yang", password: "12345678" }).then(() => {});
  },
  mounted() {},
};
</script>
