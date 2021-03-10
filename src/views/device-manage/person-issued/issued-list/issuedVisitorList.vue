<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-03-10 14:39:56
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
      <el-form-item label="所在公司">
        <el-select class="w300" v-model="pagingQuery.deviceIds" placeholder="请选择" disabled filterable clearable>
         <el-option v-for="(deviceName, index) of getDeviceNames" :key="index" :label="deviceName.name" :value="deviceName.id"></el-option>
        </el-select>
      </el-form-item>
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
      <el-form-item label="状态">
        <el-select v-model="pagingQuery.status" placeholder="请选择" filterable clearable>
         <el-option v-for="(personStatus, index) of get_issuePersonStatus" :key="index" :label="personStatus.value" :value="personStatus.id"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="身份证号"><el-input class="w200" v-model.trim="pagingQuery.idNum" clearable></el-input></el-form-item>
      <el-button type="success" @click="onSearch" class="search"> <i class="el-icon-search"></i><span>查询</span></el-button>
      <el-button type="warning" @click="onDeletes"> <i class="el-icon-delete"></i><span>批量删除</span></el-button>
      <el-button type="primary" @click="onExport"> <svg-icon icon-class="excel"/> <span>导出</span></el-button>
       <el-button type="primary" @click="refreshPagingQuery" class="search"> <i class="el-icon-refresh"></i><span>重置</span></el-button>
      <el-button type="primary"><router-link to="/device-manage/person-issued/issued-add/issuedAdd?tab=1"><svg-icon icon-class="guide"/> 去下发访客</router-link></el-button>
    </el-form>
    
    <el-table :data="painingQueryList" border class="people_list" max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading" ref="multipleTable">
      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
      <el-table-column width="50" type="selection" fixed ></el-table-column>
      <el-table-column label="序列" width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
      <el-table-column align="center" label="姓名" width="140"><template v-slot="scope">{{ scope.row.name }}</template></el-table-column>
       <el-table-column align="center" label="已注册人脸" width="95">
        <template v-slot="scope"><img :src="`${ getImgUrl + scope.row.imageId}`" width="100%" /></template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="90"><template v-slot="scope"> {{ scope.row.status | filter_issuePersonStatus }} </template></el-table-column>
      <el-table-column align="center" label="设备标识" width="200"><template v-slot="scope"> {{ scope.row.uniqueDeviceIdentifier }} </template></el-table-column>
      <el-table-column align="center" label="所在设备" width="200"> <template v-slot="scope"> {{ scope.row.deviceId | getDeviceId_name }} </template></el-table-column>
       <el-table-column align="center" label="身份证号" width="200"> <template v-slot="scope"> {{ scope.row.idNum }} </template></el-table-column>
      <el-table-column align="center" label="所在公司" width="260"> <template v-slot="scope"> {{ scope.row.personOrganizationId }} </template></el-table-column>
      <el-table-column align="center" label="创建日期" width="230"> <template v-slot="scope"> {{ scope.row.createTime | filterDate}} </template></el-table-column>
       <el-table-column align="left" label="操作" width="auto">
        <template v-slot="scope">
          <el-popconfirm
           v-show="scope.row.status != 'removing' ? true : false"
            confirmButtonText="确认"
            cancelButtonText="取消"
            title="确定要删除该通行人员？"
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

import { getDeviceNames, get_issuePersonStatus } from '@/utils/business'
import { beenIssuedVisitor, deleteDevicePerson } from '@/api/person-issued/index'
import { pickerOptions } from '@/utils'
import { imgUrl } from '@/api/public'
import moment from 'moment'

let vm

export default {
  name: 'issuedVisitorList',
  data() {
    return {
      date: null,
      table_loading: true,
      pickerOptions: pickerOptions(),
      getDeviceNames: [],
      getImgUrl: imgUrl(),
      multipleSelection: [],
      get_issuePersonStatus: get_issuePersonStatus(),
      
      pagingQuery: {
        operator: null,
        name: null,
        deviceIds: null,
        createTimeFrom: null,
        createTimeTo: null,
        gateCardId: null,
        icCardId: null,
        idNum: null,
        status: 'normal',

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
      this.getbeenIssuedVisitorList()
    },
    getbeenIssuedVisitorList() {
      this.table_loading = true
      let params = this.pagingQuery
      beenIssuedVisitor(this.pagingQuery).then((res) => {
         if(res.code === 0) {
          if(res.data.records != null) {
           this.painingQueryList = []
           this.table_loading = false
           params.size = res.data.size
           params.current = res.data.current
           params.total = res.data.total
           this.painingQueryList = res.data.records
            } else {
            this.table_loading = false
            }
         } else {
            this.$message.error(res.msg)
            this.table_loading = false
         }
      })
    },

    handleDelete(x, row) {
      deleteDevicePerson({ids: row.id}).then((res) => {
        if (res.code == 0) {
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
                if (res.code == 0) {
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
      this.getbeenIssuedVisitorList()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.getbeenIssuedVisitorList()
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