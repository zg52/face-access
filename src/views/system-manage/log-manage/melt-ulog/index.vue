<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-07-15 18:57:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
.err_code {
  line-height: 24px;
    color: #a11;
    font-size: 14px;
}
  
</style>
<template>
  <div class="app-container">
    <el-form :model="pagingQuery" :inline="true">
     <el-form-item label="所属设备">
        <el-select v-model="pagingQuery.deviceId" placeholder="请选择" filterable clearable>
         <el-option v-for="(deviceName, index) of getDeviceNames" :key="index" :label="deviceName.name" :value="deviceName.id"></el-option>
        </el-select>
      </el-form-item>
    <el-form-item label="上报时间">
      <el-date-picker
        v-model="date"
        type="datetimerange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="操作时间"
        end-placeholder="结束时间"
        :picker-options="pickerOptions"
        @change="changeDate">
      </el-date-picker>
    </el-form-item>
      <el-button type="success" @click="onSearch" class="search"><i class="el-icon-search"></i><span>查询</span></el-button>
      <el-button type="primary" @click="refreshPagingQuery" class="search"> <i class="el-icon-refresh"></i><span>重置</span></el-button>
    </el-form>

    <el-table :data="tableData" v-loading="table_loading" element-loading-spinner="el-icon-loading" default-sort = "{prop: 'createTime', order: 'descending'}"  border max-height="650" sort>
        <el-table-column label="序列" :width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
        <el-table-column align="center" label="所属设备"><template v-slot="scope">{{ scope.row.deviceId | getDeviceId_name }}</template></el-table-column>
        <el-table-column align="center" label="设备标识"><template v-slot="scope">{{ scope.row.uniqueDeviceIdentifier }}</template></el-table-column>
        <el-table-column align="center" sortable label="上报时间" prop="createTime"><template v-slot="scope"> {{ scope.row.createTime | filterDate }} </template> </el-table-column>
        <el-table-column align="left" label="操作" fixed="right">
        <template v-slot="scope">
          <el-button class="radius_45 mr10" type="primary" size="mini" @click="lookLog(scope.row)"><i class="el-icon-view"></i><span>查看</span></el-button>
          <el-button class="radius_45" type="primary" size="mini" @click="downLog(scope.row)"><i class="el-icon-download"></i><span>下载</span></el-button>
          <el-button @click="showRulePerson(scope.row)" v-show="scope.row.ruleType === 'by_person' ? true : false" class="radius_45 mt10 ml0" type="primary" size="mini"><i class="el-icon-view"></i><span>通行人员</span></el-button> 
          <!-- <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            title="确定要删除该规则？"
            @onConfirm="handleDelete(scope.$index, scope.row)">
            <el-button  class="radius_45 mt10" size="mini" type="danger" slot="reference"><i class="el-icon-delete"></i><span>删除</span></el-button>
          </el-popconfirm> -->
          </template>
      </el-table-column>
    </el-table>
      <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="pagingQuery['current']"
         :page-sizes="[10, 20, 40, 60, 80, 100, 200, 300, 400, 500, 600, 700, 1200]"
         :page-size="pagingQuery['size']"
         layout="total, sizes, prev, pager, next, jumper"
         :total="pagingQuery['total']"
    ></el-pagination>

    <el-dialog
      title="日志内容"
      :visible.sync="dialogVisible"
      width="60%"
      :close-on-click-modal="false"
      >
      <div>
        <pre class="err_code" v-html="errCodeTxt">
        </pre>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="copyLogHandle"><i class="el-icon-document"></i> 复制</el-button>
        <el-button type="primary" @click="downLog"><i class="el-icon-download"></i>下载</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import { deviceLogLis, downloadDeviceLog } from'@/api/system-manage/meltlUog'
import { getDeviceNames, getDevice_handle_list } from '@/utils/business'
import { pickerOptions, getDates, copyhandle, DOWNFILE } from '@/utils'
let vm

export default {
  name: 'ulog',
  data() {
    return {
      table_loading: true,
      getDeviceNames: [],
      getOperations: getDevice_handle_list(),
      pickerOptions: pickerOptions(),
      date: null,
      props: { multiple: true },
      tableData: [],
      dialogVisible: false,


      errCodeTxt: ' warning  in ./src/views/device-manage/device-list/components/DeviceUpdate.vue?vue&type=script&lang=js&',
      pagingQuery: {
      operator: null,
      operationType: null,
      deviceId: null,
      createTimeFrom: null,
      createTimeTo: null,
      location: null,
      name: null,

      current: 1,
      size: 200,
      total: null,
      },
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
  filterOperatonType(value) {
    let list = getDevice_handle_list(),
        txt = null
  
        for(let i = 0; i < list.length; i++) {
          if(list[i].id == value) {
            txt = list[i].name
          }
        }
        return txt
  }
  },
  methods: {
    onSearch() {
      this.pagingQuery.current = 1
     this.getLogs()
    },
    getLogs() {
      let params = this.pagingQuery
       deviceLogLis(this.pagingQuery).then((res) => {
        if(res.code === 0)  {
          this.tableData = []
          this.table_loading = false
           params.size = res.data.size
           params.current = res.data.current
           params.total = res.data.total
          if(res.data.records.length !== 0) {
            this.tableData = res.data.records
          }
        } else {
          this.$message.error(res.msg)
          this.table_loading = false
        }
      })
    },
    async downLog(row) {
      try {
     await downloadDeviceLog(row.deviceId, row.id, true).then(res => {
        this.errCodeTxt = res
         new Promise(resolve => {
          if(this.errCodeTxt.length !== 0) {
            resolve()
          } else {
            this.errCodeTxt = ''
          }
        }).then(() => {
        DOWNFILE.downloadTxt(res, `设备-${ this.$options.filters.getDeviceId_name(row.deviceId) }-崩溃日志`)
        this.dialogVisible = false
        })
      })
      } catch {
        DOWNFILE.nslookup_file(downloadDeviceLog(row.deviceId, row.id))
        this.dialogVisible = false
      }
    },
    lookLog(row) {
      this.dialogVisible = true
      this.getErrlog(row)
      
    },
     getErrlog(row, fun) {
      downloadDeviceLog(row.deviceId, row.id, true).then(res => {
        this.errCodeTxt = res
      })
     },
    copyLogHandle() {
      copyhandle(this.errCodeTxt, true)
      this.dialogVisible = false
    },
    handleSizeChange(val) {
      this.pagingQuery.size = val
      this.getLogs()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.getLogs()
    },
     refreshPagingQuery() {
      this.pagingQuery = {}
      this.onSearch()
    },
    changeDate() {
      getDates(this.pagingQuery, this.date, 'createTimeFrom', 'createTimeTo', ' HH:mm:ss', 2)
    },
  },
  created() {
    vm = this
  getDeviceNames(true).then((res) => {
    this.getDeviceNames = res
    })
   this.onSearch()
  },
  mounted() {
   
  }
}
</script>
