<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-02-24 10:44:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
  
</style>
<template>
  <div class="app-container1">
    <el-form :model="pagingQuery" :inline="true">
      <el-form-item label="创建人"><el-input class="w100" v-model.trim="pagingQuery.operator" clearable></el-input></el-form-item>
      <el-form-item label="姓名"><el-input class="w100" v-model.trim="pagingQuery.name" clearable></el-input></el-form-item>
      <el-form-item label="所在设备">
        <el-select v-model="pagingQuery.deviceIds" placeholder="请选择" filterable clearable>
         <el-option v-for="(deviceName, index) of getDeviceNames" :key="index" :label="deviceName.name" :value="deviceName.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="门禁卡号"><el-input v-model.trim="pagingQuery.gateCardId" clearable></el-input></el-form-item>
      <el-form-item label="IC卡号"><el-input v-model.trim="pagingQuery.icCardId" clearable></el-input></el-form-item>
       <el-form-item label="身份证号"><el-input class="w200" v-model.trim="pagingQuery.idNum" clearable></el-input></el-form-item>
       <el-form-item label="创建日期">
        <el-date-picker
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建日期"
          end-placeholder="截止日期"
          :picker-options="pickerOptions"
          :default-time="['00:00:00', '23:59:59']"
          @change="changeDate"
          clearable
          >
        </el-date-picker>
      </el-form-item>
      <el-button type="success" @click="onSearch" class="search"> <i class="el-icon-search"></i><span>查询</span></el-button>
      <el-button type="warning" @click="onDeletes"> <i class="el-icon-delete"></i><span>批量删除</span></el-button>
      <el-button type="primary" @click="onExport"> <svg-icon icon-class="excel"/> <span>导出</span></el-button>
       <el-button type="primary" @click="refreshPagingQuery" class="search"> <i class="el-icon-refresh"></i><span>重置</span></el-button>
      <el-button type="primary"><router-link to="/device-manage/person-issued/issued-add/issuedAdd?tab=0"><svg-icon icon-class="guide"/> 去下发员工</router-link></el-button>
    </el-form>
    
    <el-table :data="painingQueryList" border class="people_list" max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading" ref="multipleTable">
      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
      <el-table-column width="50" type="selection" fixed ></el-table-column>
      <el-table-column label="序列" width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
      <el-table-column align="center" label="姓名" width="140"><template v-slot="scope">{{ scope.row.name }}</template></el-table-column>
       <el-table-column align="center" label="已注册人脸" width="140">
        <template v-slot="scope"><img :src="`${ getImgUrl + scope.row.imageId}`" alt="" width="140" /></template>
      </el-table-column>
      <el-table-column align="center" label="所在设备" width="200"> <template v-slot="scope"> {{ scope.row.deviceId | getDeviceId_name }} </template></el-table-column>
       <el-table-column align="center" label="身份证号" width="200"> <template v-slot="scope"> {{ scope.row.idNum }} </template></el-table-column>
      <el-table-column align="center" label="门禁卡" width="260"> <template v-slot="scope"> {{ scope.row.gateCardId }} </template></el-table-column>
      <el-table-column align="center" label="IC卡" width="260"> <template v-slot="scope"> {{ scope.row.icCardId }} </template></el-table-column>
      <el-table-column align="center" label="创建日期" width="230"> <template v-slot="scope"> {{ scope.row.createTime | filterDate}} </template></el-table-column>
       <el-table-column align="left" label="操作" width="120" fixed="right">
        <template v-slot="scope">
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

import { getDeviceNames } from '@/utils/business'
import { beenIssuedEmployee, deleteDevicePerson } from '@/api/person-issued/index'
import { pickerOptions } from '@/utils'
import { imgUrl } from '@/api/public'
import moment from 'moment'

let vm

export default {
  name: 'issuedStaffList',
  data() {
    return {
      date: null,
      table_loading: true,
      pickerOptions: pickerOptions(),
      getDeviceNames: [],
      getImgUrl: imgUrl(),
      multipleSelection: [],
      
      pagingQuery: {
        operator: null,
        name: null,
        deviceIds: null,
        createTimeFrom: null,
        createTimeTo: null,
        gateCardId: null,
        icCardId: null,
        idNum: null,

        current: 1,
        size: 20,
        total: null,
      },
      painingQueryList: [],
    }
  },
  filters: {
   getDeviceId_name(value) {
    let txt = null
      vm.getDeviceNames.map((item, index) => {
         item.id == value ? txt = item.name : null
      })
      return txt
  }
  },
  methods: {
    onSearch(){
      this.pagingQuery.current = 1
      this.getbeenIssuedEmployeeList()
    },
    getbeenIssuedEmployeeList() {
      this.table_loading = true
      let params = this.pagingQuery
      beenIssuedEmployee(this.pagingQuery).then((res) => {
         if(res.code === 0) {
           this.painingQueryList = []
           this.table_loading = false
           params.size = res.data.size
           params.current = res.data.current
           params.total = res.data.total
           this.painingQueryList = res.data.records
         } else {
            this.$message.error(res.msg)
            this.table_loading = false
         }
      })
    },

    handleDelete(x, row) {
      deleteDevicePerson({ids: row.id}).then((res) => {
        if (res.code == 0 && res.data) {
          this.$message.success({message: res.msg})
          this.onSearch()
        } else {
          this.$message.error({message: res.msg})
        }
      })
    },

// 批量删规则
    onDeletes() {
       if (this.multipleSelection.length !== 0) {
        this.$confirm("此操作将永久删除已选设备通行人员, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              deleteDevicePerson({ids:this.multipleSelection[i].id}).then((res) => {
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
        this.$message.warning('请在列表中勾选要删除的设备通行人员')
      }
    },
    onExport() {

    },
   changeDate() {
    let _p = this.pagingQuery
      this.date && this.date.length
        ? ((_p.createTimeFrom = moment( this.date[0]).format("YYYY-MM-DD")),
          (_p.createTimeTo = moment( this.date[1]).format("YYYY-MM-DD")))
        :  _p.createTimeFrom = _p.createTimeTo = null
    },
    handleSizeChange(val) {
      this.pagingQuery.size = val
      this.getbeenIssuedEmployeeList()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.getbeenIssuedEmployeeList()
    },
    handleSelectionChange(val) {
     this.multipleSelection = val
    },
    refreshPagingQuery() {
      this.pagingQuery = {}
      this.onSearch()
    }
  },
  created() {
    vm = this
   getDeviceNames().then((res) => {
       this.getDeviceNames = res
    })
    this.onSearch()
  },
  mounted() {},
}
</script>