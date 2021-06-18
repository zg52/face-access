
<style lang="scss" scoped>

</style>
<template>
  <div class="app-container">
    <el-form :model="pagingQuery" :inline="true">
      <el-form-item label="创建人"><el-input class="w100" v-model.trim="pagingQuery.operator"></el-input></el-form-item>
      <el-form-item label="广告名称">
        <el-input v-model="pagingQuery.title"></el-input>
      </el-form-item>
        <el-form-item label="广告类型"><el-input class="w100" v-model.trim="pagingQuery.category"></el-input></el-form-item>
         <el-form-item label="素材类型"><el-select v-model="pagingQuery.type" placeholder="请选择" filterable clearable>
         <el-option v-for="(materialName, index) of getMaterialList" :key="index" :label="materialName.value" :value="materialName.id"></el-option>
       </el-select></el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
            v-model="date1"
            type="datetimerange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="创建时间"
            end-placeholder="结束时间"
            :picker-options="pickerOptions1"
            :default-time="['00:00:00', '23:59:59']"
            @change="changeDate1">
           </el-date-picker>
      </el-form-item>
       <el-form-item label="描述"><el-input class="w300" v-model.trim="pagingQuery.operator"></el-input></el-form-item>
       <el-form-item label="播放时间">
        <el-date-picker
          v-model="date2"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :picker-options="pickerOptions2"
          :default-time="['00:00:00', '23:59:59']"
          @change="changeDate2">
           </el-date-picker>
      </el-form-item>
 
      <el-form-item label="状态">
        <el-select v-model="pagingQuery.status" class="w120" disabled>
            <el-option v-for="(ruleState, index) of ruleStates" :key="index" :value="ruleState.state"></el-option>
        </el-select>
      </el-form-item>
      
      <el-button type="success" @click="onSearch" class="search"> <i class="el-icon-search"></i><span>查询</span></el-button>
      <el-button type="warning" @click="onDeletes"> <i class="el-icon-delete"></i><span>批量删除</span></el-button>
      <el-button type="primary" @click="refreshPagingQuery" class="search"> <i class="el-icon-refresh"></i><span>重置</span></el-button>
      <router-link class="ml10" to="/banner-manage/dtotal/add-ban/addBan"><el-button type="primary"><svg-icon icon-class="edit"/> 新增广告</el-button></router-link>
    </el-form>
      
    <el-table :data="tableData" class="people_list" max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading" element-loading-spinner="el-icon-loading" ref="multipleTable">
      <el-table-column width="50" type="selection" fixed></el-table-column>
      <el-table-column label="序列" width="50" align="center"><template v-slot="v">{{ (v.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
      <el-table-column align="center" label="广告名称" width="110" prop="title"></el-table-column>
      <el-table-column align="center" label="素材"><template v-slot="v"> {{ v.row.deviceId | getDeviceId_name}}</template></el-table-column>
      <el-table-column align="center" label="素材类型"><template v-slot="v"> {{ v.row.type}}</template></el-table-column>
      <el-table-column align="center" label="广告类型" width="120" prop="category"></el-table-column>
      <el-table-column align="center" label="描述" width="152" prop="description"></el-table-column>
      <el-table-column align="center" label="播放时间" width="152"><template v-slot="v">{{ v.row.playTime }}</template></el-table-column>
      <el-table-column align="center" label="创建时间" width="152"><template v-slot="v">{{ v.row.createTime | filterDate }}</template></el-table-column>
      <el-table-column align="center" label="更新时间" width="152"><template v-slot="v">{{ v.row.createTime | filterDate }}</template></el-table-column>
      <el-table-column align="center" label="操作人" width="152" prop="publisher"></el-table-column>
      <el-table-column align="center" label="状态" width="90" fixed="right"><template v-slot="v">{{ v.row.validity }}</template></el-table-column>
      <el-table-column align="left" label="操作" width="270" fixed="right">
        <template v-slot="v">
          <el-button class="radius_45" type="primary" size="mini" @click="handleEdit(v.$index, v.row)"><i class="el-icon-view"></i><span>详情</span></el-button>
          <el-button class="radius_45 mr10" disabled type="primary" size="mini" @click="handleEdit(v.$index, v.row)"><i class="el-icon-edit"></i><span>编辑</span></el-button>
          <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            title="确定要删除这则广告吗？"
            @onConfirm="handleDelete(v.$index, v.row)">
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

    <el-dialog
      title="可通行人员"
      :visible.sync="dialogPesonVisible"
      width="60%"
      top="0">
      <div slot="footer">
        <el-button @click="dialogPesonVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { banList, delBanMsg } from '@/api/banner-mannage/index'
import { getMaterialList } from '../../index'
import { pickerOptions, getDates } from '@/utils'

let vm

export default {
  name: 'banList',
  components: {
  },
  data() {
    return {
      dialogPesonVisible: false,
      table_loading: false,
      pickerOptions1: pickerOptions(),
      pickerOptions2:pickerOptions(),
      multipleSelection: [],
      date1: null,
      date2: null,
      props: { multiple: true },
      createTime: null,
      getMaterialList: getMaterialList,
         
// 规则名称
    // ruleName: '常客',
       ruleNames: [ '常客','访客' ],

//  通行方式
       verificationModes: [],
       passWayProps: { multiple: true },
      queryWeeksProps: { multiple: true },
      queryWeek: [],
      tableData: [
        {
          title: '6.18活动',
          material: '434',
          type: '图片+视频',
          playTime: '2021-08-09 23:23:00',
          createTime: '2021-08-09 23:23:00',
          updateTime: '2021-08-09 23:23:00',
          publisher: 'fefewfewf',
          validity: 'tru',
          category: '商业',
          description: 'fgregresgres'
        }
      ],
      
      pagingQuery: {
       publisher: '',
       title: null,
       type: '',
       category: '',
       createTimeFrom: null,
       createTimeTo: null,
       description: '',
       playTime: '',
       playEndTime: '',
       validity: '',

       current: 1,
       size: 100,
       total: 10,
      },
    }
  },
  filters: {
 
  },
  methods: {
    onSearch(){
      this.pagingQuery.current = 1
      this.getTableData()
    },
    getTableData() {
      this.table_loading = true
      let params = this.pagingQuery
      banList(this.pagingQuery).then((res) => {
         if(res.code === 0) {
           this.tableData = []
           this.table_loading = false

           params.size = res.data.size
           params.current = res.data.current
           params.total = res.data.total

           if(res.data.records.length != 0 ) {
           this.tableData = res.data.records
            new Promise((resolved) => {
                 if(this.tableData.length !== 0) resolved()
               }).then((res1) => {
                 this.tableData.map((item) => {
                   this.getRulesName.push({
                     name: item.name
                   })
                 })
               })             
           }
            } else {
               this.$message.error(res.msg)
               this.table_loading = false
            }
      })
    },
    handleDelete(x, y) {
      delBanMsg({ids: y.id}).then((res) => {
        if (res.code == 0 && res.data) {
          this.$message.success({message: res.msg})
          this.onSearch()
        } else {
          this.$message.error({message: res.msg})
        }
      })
    },
    onDeletes() {
       if (this.multipleSelection.length !== 0) {
        this.$confirm("此操作将永久删除已选广告, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              delBanMsg({ids:this.multipleSelection[i].id}).then((res) => {
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
        this.$message.warning('请在列表中勾选要删除的广告')
      }
    },
    handleEdit() {

  },
    handleSizeChange(val) {
      this.pagingQuery.size = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.getTableData()
    },
    handleSelectionChange(val) {
     this.multipleSelection = val
    },
    changeDate1() {
      getDates(this.pagingQuery, this.date1, 'createTimeFrom', 'createTimeTo', ' HH:mm:ss', 2)
    },
    changeDate2() {
      getDates(this.pagingQuery, this.date2, 'playTime', 'playEndTime', ' HH:mm:ss', 2)
    },
    refreshPagingQuery() {
      this.pagingQuery = {}
      this.onSearch()
    }
  },
  beforeCreate() {
    vm = this
  },
  created() {
    // this.onSearch()
  },
  mounted() {
    
  },
}
</script>
