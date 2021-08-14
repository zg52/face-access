<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-05-06 11:45:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
.updateRecords {
    ::v-deep.el-dialog__body {
        padding-bottom:0;
        padding-top: 8px;
    }
}
.cons {margin-top:12px;}
</style>
<template>
<div class="updateRecords">
<el-dialog
    title="设备升级记录"
    :visible.sync="updateRecordsShow"
    :before-close="recordsHide1"
    width="80%" top="0"
    >
     <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="最近升级" name="first"></el-tab-pane>
    <el-tab-pane label="历史升级" name="second"></el-tab-pane>
  </el-tabs>
  <div class="cons">
      <el-form :model="pagingQuery" :inline="true" ref="pagingQuery">
        <el-form-item label="设备名称">
        <el-select v-model.trim="pagingQuery.deviceId" placeholder="请选择" filterable clearable>
         <el-option v-for="(deviceName, index) of getDeviceNames" :key="index" :label="deviceName.name" :value="deviceName.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="升级状态"><el-select v-model.trim="pagingQuery.status" clearable><el-option v-for="(UpdateStatus, index) of deviceUpdateStatus" :key="index" :label="UpdateStatus.value" :value="UpdateStatus.id"></el-option></el-select></el-form-item>
      <el-form-item label="升级时间">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始时间"
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
    </el-form>
    
    <el-table :data="tableData" max-height="650" @selection-change="handleSelectionChange" element-loading-spinner="el-icon-loading" v-loading="table_loading"  ref="multipleTable" border>
      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
      <el-table-column label="序列" width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
      <el-table-column align="center" label="设备名称"><template v-slot="scope">{{ scope.row.deviceId | getDeviceId_name }}</template></el-table-column>
       <el-table-column align="center" label="升级类型" width="80"><template v-slot="scope">{{ scope.row.upgradeType == 1 ? '应用' : '系统' }}</template></el-table-column>
      <el-table-column align="center" label="设备标识"><template v-slot="scope">{{ scope.row.uniqueDeviceIdentifier }} </template></el-table-column>
      <el-table-column align="center" label="设备型号"><template v-slot="scope">{{ scope.row.deviceId | filterModel }} </template></el-table-column>
      <el-table-column align="center" label="当前版本" width="80"><template v-slot="scope">{{ scope.row.upgradeVersion }}</template></el-table-column>
      <el-table-column align="center" label="在线状态" width="80"><template v-slot="scope"><span :class="onelineClass" :id="`oneline${ scope.row.id }`">{{ scope.row.deviceId | filterOnline }}</span></template></el-table-column>
      <el-table-column align="center" label="更新状态"><template v-slot="scope"><span :class="statusClass(scope.row)">{{ scope.row.status | filterStatus }}</span></template></el-table-column>
      <el-table-column align="center" label="下发时间" width="200"><template v-slot="scope">{{ scope.row.createTime }}</template></el-table-column>
      <el-table-column align="center" label="升级时间" width="200"><template v-slot="scope">{{ scope.row.updateTime | filterDate }}</template></el-table-column>
       <el-table-column align="center" label="操作人"><template v-slot="scope">{{ scope.row.operator }}</template></el-table-column>
      <el-table-column align="center" fixed="right" width="117" label="操作"><template v-slot="scope"><el-button class="radius_45" size="mini" type="primary" @click="toUpgrade(scope.row)"><svg-icon icon-class="update"/> 重新升级</el-button></template></el-table-column>
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
    <div slot="footer">
         <el-button @click="recordsHide" v-show="prevBtnShow()">上一步</el-button><el-button @click="recordsHide1">关 闭</el-button>
    </div>
</el-dialog>
</div>
</template>

<script>
import { deviceUpdateRecords, deviceUpdate } from '@/api/device-manage'
import { getDeviceNames, getDeviceUpdateStatus, getDeviceISOnline } from '@/utils/business'
import { pickerOptions } from '@/utils'
import moment from 'moment'
import Cookies from 'js-cookie'
import bus from '@/views/eventBus.js'

let vm

export default {
  props: {
   updateRecordsShow: {
       type: Boolean,
       default: false
   },
   deviceList: {
     type: Array
   }
  },
  data() {
    return {
      activeName: 'first',
      getDeviceNames: [],
      deviceUpdateStatus: getDeviceUpdateStatus,
      pickerOptions: pickerOptions(),
      deviceISOnline: getDeviceISOnline(),
      date: null,
      multipleSelection: [],
      updateRecordsShow1: true,
      table_loading: true,
      onelineClass: null,

      pagingQuery: {
        deviceId: null,
        timeFrom: null,
        timeTo: null,
        status: null,
        
        current: 1, 
        size: 100,
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
  filterStatus(value) {
	  let txt
    for(let i = 0; i < getDeviceUpdateStatus.length; i++) {
	  switch(getDeviceUpdateStatus[i].id) {
		  case value : txt = getDeviceUpdateStatus[i].value;break;
	  }
    }
	return txt
  },
   filterOnline(value) {
     let txt = null
      vm.deviceList.map((item, index) => {
         item.id == value ? txt = item.online : null
      })
      return txt == vm.deviceISOnline[0].id ? vm.deviceISOnline[0].value : vm.deviceISOnline[1].value
    },
    filterUniqueDeviceIdentifier(value) {
     let txt = null
      vm.deviceList.map((item, index) => {
         item.id == value ? txt = item.uniqueDeviceIdentifier : null
      })
      return txt
    },
     filterModel(value) {
     let txt = null
      vm.deviceList.map((item, index) => {
         item.id == value ? txt = item.model : null
      })
      return txt
    }
  },
  watch: {
    clearSelectionState(val) {
      this.$refs.multipleTable.clearSelection()
    }
  },
  computed: {
  },
  methods: {
    handleClick(tab, event) {
        this.dataToogle()
      },
  dataToogle() {
    this.activeName === 'first' ? this.getTablelist(Cookies.get('apkSerialNumber')) : this.getTablelist(null)
	
	// sessionStorage.setItem('apkSerialNumber', res.data)
  },
     getTablelist(apkSerialNumber) {
      let [params] = [this.pagingQuery]
      for(let o in params) {
        if(!params[o] && params[o] !== 0) {
          delete params[o]
        }
      }
      if(apkSerialNumber) {
        params.serialNumber = apkSerialNumber
      } else {
        delete params.serialNumber
      }
      this.table_loading = true
      deviceUpdateRecords(params).then((res) => {
        this.tableData = []
        if(res.code === 0) {
          // console.log(this.pagingQuery.deviceId)
        params.size = res.data.size
        params.current = res.data.current
        params.total = res.data.total

        if(res.data.records.length !== 0) {
        this.tableData = res.data.records
        this.tableData.forEach(function (item) {
         item.online = null
        })

// 获取设备在线状态、标识
    //   for(let i = 0; i < this.deviceList.length; i++) {
    //      if([this.deviceList[i].id] == this.tableData[i].deviceId - 0) {
    //       this.tableData[i].online = this.deviceList[i].online  // 在线离线
    //     }
    //   }
    //   let d = null
    //   for(let i = 0; i < this.tableData.length; i++) {
    //     if(this.tableData[i].online == true) { // 找出在线的多个设备的状态
    //        d = this.tableData[i].deviceId;
    //     }
    //   }
    //  for(let n = 0; n < this.tableData.length; n++) {
    //           if(d == this.tableData[n].deviceId) { //  找出同个id都在线的设备在线状态
    //             this.tableData[n].online = true
    //           }
    //        }
        }
        this.table_loading = false
        // new Promise.resolver().then(() => {
        //   console.log(document.querySelector('oneline271'))
        // })
        Promise.resolve()

        } else {
          this.$message.error(res.msg)
          this.table_loading = false
        }
      })
    },
    onSearch() {
      let params = this.pagingQuery
      params.current = 1
      this.dataToogle()
    },
  changeDate3() {
    // console.log( this.date)
    let _p = this.pagingQuery
      this.date && this.date.length
        ? ((_p.timeFrom = moment( this.date[0]).format("YYYY-MM-DD HH:mm:ss")),
          (_p.timeTo = moment( this.date[1]).format("YYYY-MM-DD HH:mm:ss")))
        :  _p.timeFrom = _p.timeTo = null
    },

// 重新升级
    toUpgrade(row) {
      let fileId = null,
          onelineId
      
     for(let i = 0; i < this.deviceList.length; i++) {
         if([this.deviceList[i].id] == row.deviceId - 0) {
           onelineId = this.deviceList[i].online
        }
      }

      if(row.upgradeUrl) {
        let index = row.upgradeUrl.lastIndexOf('=')
        fileId = row.upgradeUrl.substr(index + 1)
      }
      
      if(onelineId) {
        deviceUpdate({
          ids: row.deviceId,
          uniqueDeviceIdentifier: row.uniqueDeviceIdentifier,
          operator: row.operator,
          version: row.upgradeVersion,
          upgradeType: row.upgradeType == 1 ? 'APP' : 'OS',
          fileId: fileId
        }).then(res => {
          if(res.code === 0) {
            this.$message.success(res.msg)
            this.dataToogle()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.$message.error('设备不可用,请检查设备的状态及是否在线', 4000)
      }
    },
    handleSizeChange(val) {
      this.pagingQuery.size = val
      this.dataToogle()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.dataToogle()
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
    },
	statusClass(row) {
		let s;
		switch(row.status) {
			case 1 : s = 'green'; break;
			case 3 : s = 'red'; break;
		}
		return s
	}
  },
  created() {

    vm = this
   getDeviceNames().then((res) => {
       this.getDeviceNames = res
    })
	  this.onSearch()
	  bus.$on('apkSerialNumberSearch',res => {
	  				this.onSearch()
	   })
  },
  mounted() {
    this.prevBtnShow()
  }
}
</script>