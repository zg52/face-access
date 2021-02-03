<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-02-03 13:58:48
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
    <el-form :model="pagingQuery" :inline="true">
      <el-form-item label="创建人"><el-input v-model.trim="pagingQuery.userId"></el-input></el-form-item>
      <el-form-item label="选择设备名称">
        <el-select v-model="pagingQuery.deviceName" placeholder="请选择">
         <el-option v-for="(deviceName, index) of deviceNames" :key="index" :deviceIds="deviceName.deviceIds" :value="deviceName.name"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="通行规则名称"><el-select v-model="pagingQuery.ruleName" placeholder="请选择"><el-option v-for="(ruleName, index) of ruleNames" :key="index" :value="ruleName"></el-option></el-select></el-form-item>
       <el-form-item label="选择通行方式">
        <div class="block">
             <el-cascader class="w250" v-model="pagingQuery.verificationModes" :options="passWay" :props="passWayProps" clearable @change="changeRuleNode"></el-cascader>
         </div>
      </el-form-item>
     <el-form-item label="通行人员类型">
        <el-select v-model="personType" class="w130" @change="personTypeHandle">
        <el-option v-for="(personType, index) of personTypes" :key="index" :value="personType.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通行时间-星期制">
        <div class="block">
             <el-cascader class="w250" v-model="pagingQuery.queryWeek" :options="queryWeek" :props="queryWeeksProps" clearable @change="changeRuleNode1"></el-cascader>
         </div>
      </el-form-item>
      <el-form-item label="通行时间-日期制">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions1"
          :default-time="['00:00:00', '23:59:59']"
          @change="changeDate1">
           </el-date-picker>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="createTime"
           type="datetime"
          align="right"
          unlink-panels
          start-placeholder="创建日期"
          :picker-options="pickerOptions"
          @change="changeDate">
        </el-date-picker>
      </el-form-item>
 
      <el-form-item label="状态">
        <el-select v-model="pagingQuery.status" class="w120" disabled>
            <el-option v-for="(ruleState, index) of ruleStates" :key="index" :value="ruleState.state"></el-option>
        </el-select>
      </el-form-item>
      
      <el-button type="success" @click="onSearch" class="search"> <i class="el-icon-search"></i><span>查询</span></el-button>
      <el-button type="warning" @click="onDeletes"> <i class="el-icon-delete"></i><span>批量删除</span></el-button>
      <el-button type="primary" @click="onExport"> <svg-icon icon-class="excel"/> <span>导出</span></el-button>
      <el-button type="primary"><router-link to="/traffic-rules/addRules"><svg-icon icon-class="edit"/> 新建通行规则</router-link></el-button>
    </el-form>
      
    <el-table :data="ruleList" border class="people_list" max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading" ref="multipleTable">
      <el-table-column width="50" type="selection" fixed></el-table-column>
      <el-table-column label="序列" :width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
      <el-table-column align="center" label="ID" width="80"> <template v-slot="scope">{{ scope.row.id }} </template></el-table-column>
      <el-table-column align="center" label="通行规则名称" width="120"><template v-slot="scope"> {{ scope.row.name }}</template></el-table-column>
      <el-table-column align="center" label="通行方式" width="80"><template v-slot="scope">{{ scope.row.verificationModes }}</template></el-table-column>
      <el-table-column align="center" label="通行人员类型" width="120"> <template v-slot="scope">{{ scope.row.value === 'employee' ? '员工' : '访客' }}</template></el-table-column>
      <el-table-column align="center" label="创建时间" width="108"><template v-slot="scope">{{ scope.row.createTime }}</template></el-table-column>
      <!-- <el-table-column align="center" label="通行人员数量" width="120"><template v-slot="scope"> {{ scope.row.dfs }} </template></el-table-column> -->
      <el-table-column align="center" label="通行星期" width="108"><template v-slot="scope">{{ scope.row.week | weekComput(scope.row.week) }}</template></el-table-column>
      <el-table-column align="center" label="通行日期+时间" width="300"><template v-slot="scope">{{ `${ scope.row.startDate } ${ scope.row.endTime } ~ ${ scope.row.startDate } ${ scope.row.endTime }` }}</template></el-table-column>
      <el-table-column align="center" label="规则描述"><template v-slot="scope">{{ scope.row.description }}</template> </el-table-column> 
      <el-table-column align="center" label="创建人"><template v-slot="scope">{{ scope.row.userId }}</template></el-table-column>
      
      <el-table-column align="left" label="操作" width="220" fixed="right">
        <template v-slot="scope">
          <el-button class="radius_45" type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i><span>编辑</span></el-button>
          <el-button class="radius_45 mt10" type="primary" size="mini"><i class="el-icon-view"></i><span>通行人员</span></el-button> 
          <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            title="确定要删除该规则？"
            @onConfirm="handleDelete(scope.$index, scope.row)">
            <el-button  class="radius_45 mt10" size="mini" type="danger" slot="reference"><i class="el-icon-delete"></i><span>删除</span></el-button>
          </el-popconfirm>
          </template>
      </el-table-column>
    </el-table>
    
    <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="pagingQuery['current']"
         :page-sizes="[10, 20, 40, 60, 80, 100, 200, 300, 400]"
         :page-size="pagingQuery['size']"
         layout="total, sizes, prev, pager, next, jumper"
         :total="pagingQuery['total']"
    ></el-pagination>
  </div>
</template>
<script>
import { getRules, deleteRules } from'@/api/traffic-rules'
import { pickerOptions } from '@/utils'
import moment from 'moment'

const optionsWeek = [
  { id: 1, value: '一' },
  { id: 2, value: '二' },
  { id: 3, value: '三' },
  { id: 4, value: '四' },
  { id: 5, value: '五' },
  { id: 6, value: '六' },
  { id: 0, value: '日' }
]
export default {
  name: 'rulesList',
  data() {
    return {
      userFormVisible: true,
      value: 1,
      table_loading: false,
       pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        pickerOptions1: pickerOptions(),
        multipleSelection: [], //多选删除
        date: null,
        props: { multiple: true },
        createTime: null,

//  设备名称
        // deviceName: null,
        deviceNames: [
           {
             name: '设备1',
             id: 1
           },
            {
             name: '设备2',
             id: 1
           }
         ],
         
// 规则名称
    // ruleName: '常客',
       ruleNames: [ '常客','访客' ],

//  通行方式
       verificationModes: [],
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
       }
       ],

// 通行人员类型
      personType: null,
      personTypes: [
        {
          name: '员工',
          value: 'employee'
        },
        {
          name: '访客',
          value: 'vistor'
        }
      ],
      ruleStates: [
        {
          value: '正常'
        },
        {
          value: '禁用'
        }
       ],
       
  // 通行时间
      queryWeeksProps: { multiple: true },
      queryWeek: [],
      ruleList: [
        {
          name: "阿娃",
          description: "算法应用院",
          createTime: "2020 01.12",
          updataTime: "2020 02.13",
          switch: 1,
          value:'employee',
          dfs: 9988983,
          phone: 15652655412,
          job: "打杂专员",
          sex: "女",
          entryTime: "2023-12-12",
            startDate: '2021-12-21',
       endDate: '2021-09-32',
       startTime: '06:00:00',
       endTime: '06:00:00',
       week: '56'

        },
      ],
     pagingQuery: {
       userId: null,
       deviceName: null,
       name: '',
       ruleName: null,
       verificationModes: null,
       ruleType: 'personType',
       value: null,
       createTime: null,
       queryWeek: null,
       startDate: null,
       endDate: null,
       startTime: null,
       endTime: null,

       current: 1,
       size: 20,
       total: 10,
       status: ''
      },
    }
  },
  computed: {
   
  },
  filters: {
    weekComput(value) {
          let weekStr = []
          optionsWeek.forEach((item, index) => {
            value.includes(item?.id) ? weekStr.push(`周${ item?.value }`) : ''
            })
         if(value.length === 7) {
           return '周一至周日'
         } else {
            return weekStr.join('，')
         }
  }
  },
  methods: {
    
 // 获取通行方式参数
    changeRuleNode() {
        let newArr = []
        this.verificationModes.map((x) => {
         x.forEach(() => newArr.push(x[x.length - 1]))
        })
      this.pagingQuery['verificationModes'] =  this.pagingQuery['verificationModes'] ?? Array.from(new Set(newArr))
    },

 // 获取通行星期参数
    changeRuleNode1() {
      let queryWeek = this.pagingQuery,
          querWeekStr = []
          if(queryWeek['queryWeek'].length !== 0) {
                queryWeek['queryWeek'].forEach((item, index) => {
                 querWeekStr.push(item[0])
              })
              querWeekStr = querWeekStr.join()
               queryWeek['queryWeek'] = querWeekStr
          }
    },

 // 获取通行日期时间参数
    changeRuleNode1() {
      let queryWeek = this.pagingQuery,
          querWeekStr = []
          if(queryWeek['queryWeek'].length !== 0) {
                queryWeek['queryWeek'].forEach((item, index) => {
                 querWeekStr.push(item[0])
              })
              querWeekStr = querWeekStr.join()
               queryWeek['queryWeek'] = querWeekStr
          }
    },

// 获取通行人员类型参数
    personTypeHandle() {
      let _p = this.personTypes,
          param = this.pagingQuery
          this.personType === _p[0]['name'] ? param.value = _p[0]['value'] : param.value = _p[1]['value']
    },
    
// 查设备列表
    onSearch(){
      this.pagingQuery.current = 1
      this.getRuleList()
    },
    getRuleList() {
      let _this = this
      this.table_loading = true
      getRules(this.pagingQuery).then((res) => {
         if(res.code === 0 && res.data.rescords.length !== 0) {
               _this.table_loading = false
               this.ruleList = res.data.rescords
               this.$message.success(res.msg)
            }
      })
    },

// 单删设备
    handleDelete(x, y) {
      deleteRules(y.id).then((res) => {
        if (res.code == 0 && res.data) {
          this.$message.success({message: res.msg})
          this.onSearch()
        } else {
          this.$message.warning({message: res.msg})
        }
      }).catch(() => {
      })
    },

// 批量删规则
    onDeletes() {
       if (this.multipleSelection.length !== 0) {
        this.$confirm("此操作将永久删除已选规则, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              deleteRules(this.multipleSelection[i].id).then((res) => {
                if (res.code == 0 && res.data) {
                  if(i + 1 >= this.multipleSelection.length) {
                  this.onSearch()
                  this.$message.success({message: res.msg})
                  } 
                }
              })
            }
          }).catch(() => {
             this.$message.info({message: '已取消删除'})
             this.$refs.multipleTable.clearSelection()
          })
      } else {
        this.$message.warning('请在列表中勾选要删除的规则')
      }
    },
    onExport() {

    },

// 修改规则
    handleEdit() {
      
    },
    
// 获取默认设备名称
    getDeviceName() {
      searchDevice(this.pagingQuery).then((res) => {
        let data = res.data.rescords
       if(res.code === 0 && data.length !== 0) {
            data.map((x,y) => {
              this.deviceNames.push({
                 name: x.name,
                 id: x.id
              })
            })
            // this.deviceName = this.deviceNames[0].name
            // this.pagingQuery.id = this.deviceNames[0].id
          } else {
             this.$message.warning('无可用设备，请先添加设备')
          }
      })
    },
    handleSizeChange(val) {
      this.pagingQuery.size = val
      this.getRuleList()
    },
    handleCurrentChange(val) {
      this.pagingQuery.size = val
      this.getRuleList()
    },
    handleSelectionChange(val) {
     this.multipleSelection = val
    },

// 转换通行时间
    changeDate1() {
      let _this = this,
          date = this.pagingQuery,
          dateItem = ['startDate', 'endDate', 'startTime', 'endTime']
          getDate()
          function getDate() {
           dateItem.map((item, index) => { 
             index <= 1 ? date[dateItem[index]] = moment(_this.date[index]).format('YYYY-MM-DD') : date[dateItem[index]] =  moment(_this.date[index]).format('hh:mm')
            })
          }
    },
    changeDate() {
      this.pagingQuery.createTime = moment(this.createTime).format('YYYY-MM-DD hh:mm')
    },
  },
  created() {
    // this.getDeviceName()
    {
     optionsWeek.map((item, index) => {
         this.queryWeek.push({
          value: item.value === '日' ? 0 : index + 1,
          label: `周${ item.value }`
       })
     })
    }
  },
  mounted() {},
};
</script>
