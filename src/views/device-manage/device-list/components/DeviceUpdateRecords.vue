<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-04-26 19:22:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
.updateRecords {
    ::v-deep.el-dialog__body {
        padding-bottom:0
    }
}
</style>
<template>
<div class="updateRecords">
<el-dialog
    title="设备升级记录"
    :visible.sync="updateRecordsShow"
    :before-close="recordsHide1"
    width="70%" top="0"
    >
    <div>
  <div>
      <el-form :model="pagingQuery" :inline="true" ref="pagingQuery">
        <el-form-item label="设备名称">
        <el-select v-model="pagingQuery.deviceId" placeholder="请选择" filterable clearable>
         <el-option v-for="(deviceName, index) of getDeviceNames" :key="index" :label="deviceName.name" :value="deviceName.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="更新状态"><el-select v-model="pagingQuery.status" clearable><el-option v-for="(UpdateStatus, index) of deviceUpdateStatus" :key="index" :label="UpdateStatus.value" :value="UpdateStatus.id"></el-option></el-select></el-form-item>
      <el-form-item label="更新时间">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建时间"
          end-placeholder="结束时间"
          :picker-options="pickerOptions"
          :default-time="['00:00:00', '23:59:59']"
          @change="changeDate3"
          clearable
          >
        </el-date-picker>
      </el-form-item>

      <el-button type="success" @click="onSearch" class="search"> <i class="el-icon-search"></i><span>查询</span></el-button>
       <el-button type="primary" @click="refreshPagingQuery" class="search"> <i class="el-icon-refresh"></i><span>刷新</span></el-button>
       <!-- <router-link to="/device-manage/person-issued/issued-list/issuedList?tab=0" class="ml10"><el-button type="primary"><i class="el-icon-view"></i> 已下发员工</el-button></router-link> -->
       <!-- <el-button class="ml10" type="primary" :disabled="table_loading" @click="handleIssuedPerson"><svg-icon icon-class="guide" />  一键下发</el-button> -->
    </el-form>
    
    <el-table :data="tableData" max-height="650" @selection-change="handleSelectionChange" element-loading-spinner="el-icon-loading" v-loading="table_loading"  ref="multipleTable" border>
      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
      <el-table-column label="序列" width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
      <el-table-column align="center" label="设备名称"> <template v-slot="scope"> {{ scope.row.name }} </template></el-table-column>
      <el-table-column align="center" label="设备标识"> <template v-slot="scope"> {{ scope.row.name }} </template></el-table-column>
      <el-table-column align="center" label="当前版本"> <template v-slot="scope"> {{ scope.row.name }} </template></el-table-column>
      <el-table-column align="center" label="在线状态"> <template v-slot="scope"> {{ scope.row.name }} </template></el-table-column>
      <el-table-column align="center" label="更新状态"> <template v-slot="scope"> {{ scope.row.name }} </template></el-table-column>
      <el-table-column align="center" label="升级时间"><template v-slot="scope">{{ scope.row.createTime | filterDate }}</template></el-table-column>
      <el-table-column align="center" label="操作"><template v-slot="scope"><el-button class="radius_45" size="mini" type="primary" @click="toUpgrade(scope.row)"><svg-icon icon-class="update"/> 重新升级</el-button></template></el-table-column>
    </el-table> 
    
    <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="pagingQuery['current']"
         :page-sizes="[40, 60, 80, 100, 200, 300, 400, 600, 800, 1000]"
         :page-size="pagingQuery['size']"
         layout="total, sizes, prev, pager, next, jumper"
         :total="pagingQuery['total']"
          ></el-pagination>
  </div>
  </div>
    <div slot="footer">
         <el-button @click="recordsHide" v-show="prevBtnShow()">上一步</el-button><el-button @click="recordsHide1">关 闭</el-button>
    </div>
</el-dialog>
</div>
</template>

<script>
import { deviceUpdateRecords, toUpdateDevice } from '@/api/device-manage'
import { getStaffList } from '@/api/people-manage/staffManage'
import { getDeviceNames, getDeviceUpdateStatus } from '@/utils/business'
import { pickerOptions } from '@/utils'
import moment from 'moment'

let vm

export default {
  components: {
  },
  props: {
   updateRecordsShow: {
       type: Boolean,
       default: false
   }
  },
  data() {
    return {
      getDeviceNames: [],
      deviceUpdateStatus: getDeviceUpdateStatus,
      pickerOptions: pickerOptions(),
      date: null,
      multipleSelection: [],
      updateRecordsShow1: true,
      table_loading: true,

      pagingQuery: {
        deviceId: null,
        createTimeFrom: null,
        createTimeTo: null,
        status: null,
        
        current: 1, 
        size: 10,
        total: null,
      },
      tableData: [],
    }
  },
  filters: {
        getDeviceId_name(value) {
    let txt = null
      vm.getDeviceNames.map((item, index) => {
         item.id == value ? txt = item.name : null
      })
      return txt
  },
  },
  watch: {
    clearSelectionState(val) {
      this.$refs.multipleTable.clearSelection()
    }
  },
  computed: {
  },
  methods: {
     getStaffList() {
      let [params] = [this.pagingQuery]
      this.table_loading = true
      getStaffList(this.pagingQuery).then((res) => {
        this.tableData = []
        if(res.code === 0) {
        params.size = res.data.size
        params.current = res.data.current
        params.total = res.data.total

        if(res.data.records.length !== 0) {
        this.tableData = res.data.records
        }
        this.table_loading = false
        } else {
          this.$message.error(res.msg)
          this.table_loading = false
        }
      })
    },
    onSearch() {
      let params = this.pagingQuery
      params.current = 1
      this.getStaffList()
    },
  changeDate(item) {
     let a = this.pagingQuery
         a[item] =  moment(a[item]).format('YYYY-MM-DD')
  },
  changeDate1() {
    this.changeDate('enrollTime')
  },
  changeDate3() {
    let _p = this.pagingQuery
      this.date && this.date.length
        ? ((_p.createTimeFrom = moment( this.date[0]).format("YYYY-MM-DD HH:mm")),
          (_p.createTimeTo = moment( this.date[1]).format("YYYY-MM-DD HH:mm")))
        :  _p.createTimeFrom = _p.createTimeTo = null
    },

// 重新升级
    toUpgrade(row) {
        toUpdateDevice({deviceId: row.deviceId}).then(res => {
            
        })
    },
    handleSizeChange(val) {
      this.pagingQuery.size = val
      this.getStaffList()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.getStaffList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('employeeIds', this.multipleSelection)
    },
    refreshPagingQuery() {
      this.pagingQuery = {}
      this.date = null
      this.onSearch()
    },
    recordsHide1() {
      this.$emit('recordsHide', true)
      sessionStorage.removeItem('prevBtn')
    },
     recordsHide() {
      this.$emit('recordsHide', false)
    },
     prevBtnShow() {
        return sessionStorage.getItem('prevBtn') ? true : false
    }
  },
  created() {
    vm = this
   getDeviceNames().then((res) => {
       this.getDeviceNames = res
    })
  this.onSearch()

  },
  mounted() {
    this.prevBtnShow()
  }
}
</script>
