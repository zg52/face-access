<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-02-05 19:06:09
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
      
       <el-form-item label="选择设备名称：">
        <el-select v-model="deviceName" placeholder="请选择">
         <el-option v-for="(deviceName, index) of deviceNames" :key="index" :deviceIds="deviceName.deviceIds" :value="deviceName.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择通行方式：" prop="verificationModes">
       <div class="block">
            <el-cascader class="w250" v-model="verificationModes" :options="passWay" :props="passWayProps" clearable @change="changeRuleNode" @getCheckedNodes="getCheckedNodes"></el-cascader>
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
         <el-radio :label="personTypeList[2]" @click.native="visitorHandle" border>指定访客
           <!-- <sub class="p_num"> 已选102人</sub> -->
            </el-radio>
         <!-- <div class="mt10"> -->
           <!-- <el-radio :label="'ruleType_personType'" border>全部访客</el-radio> -->
         <!-- </div> -->
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
    <el-button type="primary" @click="handleAddRule"><svg-icon icon-class="guide" />  一键下发</el-button></el-form>

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
import moment from "moment"
 const optionsNum = ['一', '二', '三', '四', '五', '六', '日'] //  星期制
 var weekOptions = []
     optionsNum.map((item, index) => {
         weekOptions.push({
          id: item === '日' ? 0 : index + 1,
          name: `星期${ item }`
       })
     })
     
const personTypeList = ['ruleType_personType_employee', 'ruleType_personIds_arr', 'ruleType_visitorIds_arr'] //  通行人员类型字段
export default {
  name: "",
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
        personTypeRadio: personTypeList[0], //默认指定所有员工
        personTypeList: personTypeList,
        dateTime: null,
        //  [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]

//  设备名称
        deviceName: '',
        deviceNames: [
           {
             name: '设备1',
             deviceIds: 1
           },
            {
             name: '设备2',
             deviceIds: 1
           }
         ], 
         verificationModes: [['face']],
         addRules: {
           deviceIds: '',
           verificationModes: ['face'],
           name: null,
           description: null,
           ruleType: 'personType', // 指定人员（指定员工和指定访客）或全部人员（全员工和全访客）
           personType: 'employee', // 指定人员或全部人员的类别
           personIds: null, //  指定人员（员工）的id
           visitorIds: null,  //  指定人员（访客）的id
           week: [1,2,3,4,5],
           startDate: null,
           endDate: null,
           startTime: null,
           endTime: null
         },
// 通行方式
       passWayProps: { multiple: true },
       passWay: [
          {
            label: '刷脸',
            value: 'face'
          },
          {
            label: '指纹',
            value: 'fingerprint'
          },
          {
            label: '二维码',
            value: 'qr_code'
          },
          {
            label: '刷卡',
            value: 'card',
              children: [
                {
                 label: '门禁卡',
                 value: 'wg_card'
               },
               {
                label: 'IC卡',
                value: 'ic_card'
              },
              {
                label: '身份证',
                value: 'identity_card'
              }
          ]
       },
       {
           label: '刷脸 + 刷卡',
           value: 'faceCard',
            children: [
              {
                label: '刷脸 + 门禁卡',
                value: 'face,wg_card'
              },
              {
                label: '刷脸 + IC卡',
                value: 'face,ic_card'
              },
              {
                label: '刷脸 + 身份证',
                value: 'face,identity_card'
              }
            ]
       }
       ],
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
    }
  },
  methods: {

// 获取通行方式参数
    changeRuleNode() {
        let newArr = []
        this.verificationModes.map((x) => {
         x.forEach(() => newArr.push(x[x.length - 1]))
        })
      this.addRules['verificationModes'] =  this.addRules['verificationModes'] ?? Array.from(new Set(newArr))
    },

// 获取通行人员类型参数
    personTypeHandle() {
     let p = this.personTypeRadio,
         pLis =  this.personTypeList,
         a = this.addRules
         function employee() { return (a['ruleType'] = 'personType', a['personType'] = 'employee') }
           switch(p) {
             case pLis[0] : employee();break
             case pLis[1] : (a['ruleType'] = 'personIds');break
             case pLis[2] : (a['ruleType'] = 'visitorIds');break
             default : employee()
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
        let checkedCount = value.length,
            weekId = []
        this.checkAll = checkedCount === this.weeks.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.weeks.length
        value.map(item =>  weekId.push(item.id))
        this.addRules.week = weekId.sort()


      },
    getCheckedNodes(leafOnly) {
    },
    handleAddRule() {
      this.$refs['el_addRules'].validate((valid) => {
          if (valid) {
            addRules(this.addRules).then((res) => {
              if(res.code === 0 && res.data.length !==0) {
                this.$message.success(res.msg)
              }
            }).catch(() => {

        })
          } else {
            return false
          }
        })
        this.$message.success('张三 已下发至设备SHFFJEF')  
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
    console.log(_this.addRules)



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
// 获取默认设备名称
    getDeviceName() {
      searchDevice(this.pagingParams).then((res) => {
        let data = res.data.rescords
       if(res.code === 0 && data.length !== 0) {
            data.map((x,y) => {
              this.deviceNames.push({
                 name: x.name,
                 deviceIds: x.id
              })
            })
            this.deviceName = this.deviceNames[0].name
            this.addRules.deviceIds = this.deviceNames[0].id
          } else {
             this.$message.warning('无可用设备，请先添加设备')
          }
      })
    }
  },
  created() {
    // this.getDeviceName()
    console.log(addRules())

  },
  mounted() {

  },
};
</script>
