<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-02-23 16:47:29
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
    <el-form :model="addRules" label-width="120px" ref="el_addRules">
      
       <el-form-item label="选择设备名称：" prop="deviceIds" :rules="{ required: true,message: '请选择设备名称', trigger: 'change' }">
        <el-select v-model="deviceIds" placeholder="请选择" @change="changeDeviceIds" multiple filterable clearable>
         <el-option v-for="(deviceName, index) of getDeviceNames" :key="index" :label="deviceName.name" :value="deviceName.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择通行方式：" prop="getVerificationModes" :rules="{ required: true,message: '请选择通行方式', trigger: 'change' }">
       <div class="block">
            <el-cascader class="w250" v-model="addRules.getVerificationModes" :options="passWay" :props="passWayProps" clearable @change="changeRuleNode" @getCheckedNodes="getCheckedNodes"></el-cascader>
        </div>
      </el-form-item>
      <el-form-item label="通行规则名称：" prop="name" :rules="{ required: true, message: '通行规则名称不能为空', trigger: 'blur' }"><el-input class="w200" v-model.trim="addRules.name" placeholder="通行规则名称"></el-input></el-form-item>
      <el-form-item label="通行规则描述：" prop="description" :rules=" { required: true, message: '请输入描述信息', trigger: 'blur' }"><el-input class="w200" type="textarea" placeholder="请输入描述信息" v-model="addRules.description" maxlength="50" show-word-limit></el-input></el-form-item>
      <el-form-item label="通行人员类型：">
        <el-radio-group v-model="personTypeRadio" @change="personTypeHandle">
         <el-radio :label="personTypeList[0]" border>全部员工</el-radio>
         <el-radio :label="personTypeList[1]" @click.native="staffHandle" border>指定员工
           <!-- <sub class="p_num"> 已选102人</sub> -->
            </el-radio>
            <div class="mt10">
             <el-radio :label="personTypeList[2]" border>全部访客</el-radio>
             <el-radio :label="personTypeList[3]" @click.native="visitorHandle" border>指定访客
           <!-- <sub class="p_num"> 已选102人</sub> -->
            </el-radio>
         <!--  -->
           <!-- <el-radio :label="'ruleType_personType'" border>全部访客</el-radio> -->
         </div>
        </el-radio-group>
      </el-form-item>  
     <el-form-item label="选择通行时间：">
      <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="星期制" name="week">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            
            <el-checkbox-group v-model="checkedWeeks" @change="handleWeekChange">
            <el-checkbox v-for="(week, index) in weeks" :label="weeks[index]" :key="week.name">{{ week.name }}</el-checkbox>
          </el-checkbox-group>
          </el-tab-pane>
          <el-tab-pane label="日期制" name="dateTime">
             <el-date-picker
               v-model="dateTime"
               type="datetimerange"
               range-separator="至"
               start-placeholder="开始日期"
               end-placeholder="结束日期"
               @change="changeDateTime"
               >
            </el-date-picker>
          </el-tab-pane>
      </el-tabs>
    </el-form-item>
    <el-button type="primary" @click="handleAddRule"><svg-icon icon-class="guide" />  一键下发</el-button>
    <router-link to="/traffic-rules/rules" class="ml10"><el-button><i class="el-icon-view"></i> 查看已下发规则</el-button></router-link>
    </el-form>

     <el-dialog title="选择通行员工" :visible.sync="staff_dialogVisible" width="100%">
      <el-form :model="addRules" :inline="true">
      <el-form-item label="员工姓名"
        ><el-input
          class="w100"
          v-model.trim="addRules.roleName"
          placeholder="输入姓名搜索"
        ></el-input
      ></el-form-item>
 
      <el-form-item label="工号"
        ><el-input
          v-model.trim="addRules.roleName"
          placeholder="输入工号搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="电话"
        ><el-input
        class="w130"
          v-model.trim="addRules.roleName"
          placeholder="输入手机号搜索"
        ></el-input>
      </el-form-item>
 
  
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
    
     <el-table :data="staffLis" @selection-change="handleSelectionChange" border class="people_list" max-height="650">
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
      <!-- <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="pagingParams['current']"
         :page-sizes="[10, 20, 40, 60, 80, 100, 200, 300, 400]"
         :page-size="pagingParams['size']"
         layout="total, sizes, prev, pager, next, jumper"
         :total="pagingParams['total']"
    ></el-pagination> -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="staffHandleTo">确 定</el-button>
  </span>
</el-dialog>
 
  </div>
</template>
<script>
import { addRules } from'@/api/traffic-rules'
import { searchDevice } from '@/api/device-manage'
import { getStaffLis } from '@/api/people-manage/staffManage'
import { passWay, weekParams, getDeviceNames } from '@/utils/business'
import moment from "moment"

 var weekOptions = []
      weekParams().map((item, index) => {
         weekOptions.push({
          id: item.value === '日' ? 0 : index + 1,
          name: `星期${ item.value }`
       })
     })

//  通行人员类型字段
const personTypeList = [
      'ruleType-by_personType-employee', //全部员工
      'ruleType-personType-employeeIds', //指定员工
      'ruleType-by_personType-visitor', //全部访客
      'ruleType-personType-visitorIds'
      ]
const personTypeParam = ['by_personType', 'personType', 'employee', 'visitor']

export default {
  name: "addRules",
  data() {
    return {
        checkAll: false,
        staff_dialogVisible: false,
        checkedWeeks: weekOptions.slice(0, 5),
        weeks: weekOptions,
        isIndeterminate: true,
        dialogVisible: false,
        activeName: 'week',
        multipleSelection: [],
        personTypeRadio: personTypeList[0], //默认指定全员工
        personTypeList: personTypeList,
        dateTime: null,
        //  [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]

//  设备名称
        deviceIds: [],
        getDeviceNames: [],
         verificationModes: [],
         addRules: {
           deviceIds: [],
           getVerificationModes: [],
           verificationModes: [], // 发给后台转换后的参数
           name: null,
           description: 'hh',
          //  ruleType: 'personType', 

// 指定员工id/或访客id
           personType: 'employee', // 默认为全员工
           
// 指定全部人员（全部员工和全部访客————后台自动添加人员id）或手动指定人员（指定员工id和全访客id）=== by_person_type -> employee/visitor || person_type -> employee(指定id)/visitor(指定id)
           ruleType: 'by_person_type', // 默认为人员类型

           personIds: null, //  指定人员（员工）的id
           visitorIds: null,  //  指定人员（访客）的id
           week: '1,2,3,4,5', // 默认通行星期为周一到周五
           startDate: null,
           endDate: null,
           startTime: null,
           endTime: null
         },

// 通行方式
       passWayProps: { multiple: true },
       passWay: passWay(),
      userFormVisible:true,
      value: 1,
      pickerOptions: [],
 
      addUserForm: [
        
      ],
      staffLis: [
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
          id:21
        },
        {
          name: "阿龙",
          description: "超管",
          createTime: "2020 01.12",
          updataTime: "2020 02.13",
          switch: 1,
        },
      ],
     deiveParams: {
        current: 1,
        size: 10,
      },
    }
  },
  methods: {

// 获取设备id参数
    changeDeviceIds() {
       this.addRules.deviceIds = this.deviceIds
    },

// 获取通行方式参数
    changeRuleNode() {
        let newArr = [],
            a = this.addRules
            a['getVerificationModes'].map((x) => {
              x.forEach(() => newArr.push(x[x.length - 1]))
            })
           a['verificationModes'] = Array.from(new Set(newArr))

    },

// 获取通行人员类型参数
    personTypeHandle() {
     let p = this.personTypeRadio,
         pLis =  this.personTypeList,
         a = this.addRules
         function personType(TYPE, PERSONID) { return (a['ruleType'] = TYPE, a['personType'] = PERSONID) }
           switch(p) {
             case pLis[0] : personType(personTypeParam[0], personTypeParam[2]);break
             case pLis[1] : personType(personTypeParam[1], personTypeParam[2]);break
             case pLis[2] : personType(personTypeParam[0],personTypeParam[3]);break
             case pLis[3] : personType(personTypeParam[1],personTypeParam[3]);break
             default : personType(personTypeParam[0], personTypeParam[2])
           }
    },

// 指定员工下发规则
    staffHandle() {
      let a = this.addRules
          a['visitorIds'] = null
          this.staff_dialogVisible = true

// 获取员工列表
          getStaffLis().then((res) => {
            // this.staffLis = res.data
          })
    },
    staffHandleTo() {
      let personIds = []
        if (this.multipleSelection.length !== 0) {

// 获取员工id
        for (let i = 0; i < this.multipleSelection.length; i++) {
           personIds.push(this.multipleSelection[i].id)
        }
            personIds.length !== 0 ? (this.addRules['personIds'] = personIds, this.staff_dialogVisible = false) : this.$message.warning('请勾选要通行的员工')
         } else {
           this.$message.warning('请勾选要通行的员工')
         }
    },
    
// 指定访客下发规则
     visitorHandle() {
       this.personIds = null
      //  a['visitorIds'] = null
    },

  // 选择通行时间
    handleCheckAllChange(val) {
       this.checkedWeeks = val ? weekOptions : []
       this.isIndeterminate = false
    },
    handleWeekChange(value) {
        let [checkedCount, weekId] = [value.length, []]
        this.checkAll = checkedCount === this.weeks.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.weeks.length
        value.map(item =>  weekId.push(item.id))
        let weekSort = weekId.sort()
        this.addRules.week = weekSort.join(',')
      },
    getCheckedNodes(leafOnly) {
    },

// 发起新增通行规则
    handleAddRule() {
      let [_this, getVerificationModes] = [this, this.addRules.getVerificationModes]
      function setVerificationModes () {return _this.$set(_this.addRules, 'getVerificationModes', getVerificationModes)}
      this.$refs['el_addRules'].validate((valid) => {
          if (valid) {
            // this.addRules.getVerificationModes = 'null'
            addRules(this.addRules).then((res) => {
              // setVerificationModes()
              if(res.code === 0) {
                this.$message.success(res.msg)
                
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            return false
          }
        })
    },
    onSearch(){
    },
    onDelete() {

    },
    onExport() {

    },
   changeDateTime() {
   var _this = this,
       addDate = this.addRules,
       d = ['startDate', 'endDate', 'startTime', 'endTime']
    function dataTimeHandle(x, conversionMode, num) {
       return moment(_this.dateTime[num]).format(conversionMode)
    }
    for(let i = 0; i < d.length; i++) {
       if(i <= 1) {
         addDate[d[i]] = dataTimeHandle(d['startDate'], 'YYYY-MM-DD', 0)
         console.log("🚀 ~ file: addRul", dataTimeHandle(d['startDate'], 'YYYY-MM-DD', 0))
       } else {
         addDate[d[i]] = dataTimeHandle(d[i], 'hh:mm', i)
       }
    }
    },
    handleSizeChange(val) {
      this.pagingParams.size = val
      this.getDeviceList()
    },
    handleCurrentChange(val) {
      this.pagingParams.size = val
      this.getDeviceList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
  },
  created() {
   getDeviceNames().then((res) => {
       this.getDeviceNames = res
    })
  },
  mounted() {
  },
}
</script>
