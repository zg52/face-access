
<style lang="scss" scoped>
.showTenant {
  &::v-deep .el-dialog__body {
    padding:0;
  }
}
</style>
<template>
  <div class="app-container">
    <el-form :model="pagingQuery" :inline="true">
      <el-form-item label="租户名"><el-input class="w120" v-model.trim="pagingQuery.name" clearable></el-input></el-form-item>
      <!-- <el-form-item label="创建时间">
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
      </el-form-item> -->
      <!-- <el-form-item label="状态">
        <el-select v-model="pagingQuery.status" class="w120" disabled>
            <el-option v-for="(ruleState, index) of ruleStates" :key="index" :value="ruleState.state"></el-option>
        </el-select>
      </el-form-item> -->
      <el-button type="success" @click="onSearch" class="search"> <i class="el-icon-search"></i><span>查询</span></el-button>
      <!-- <el-button type="warning" @click="onDeletes"> <i class="el-icon-delete"></i><span>批量删除</span></el-button> -->
      <el-button type="primary" @click="refreshPagingQuery" class="search"> <i class="el-icon-refresh"></i><span>重置</span></el-button>
      <router-link class="ml10" to="/system-manage/multi-tenant/add-tenant"><el-button type="primary"><svg-icon icon-class="edit"/> 创建租户</el-button></router-link>
    </el-form>
      
    <el-table :data="tableData" border class="people_list" max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading" element-loading-spinner="el-icon-loading" ref="multipleTable">
      <el-table-column width="50" type="selection" fixed></el-table-column>
      <el-table-column label="序列" width="50" align="center"><template v-slot="v">{{ (v.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
      <el-table-column align="center" label="租户" width="auto" prop="name"></el-table-column>
      <el-table-column align="center" label="企业名称" width="110" prop="companyName"></el-table-column>
      <el-table-column align="center" label="联系人" width="110" prop="contact"></el-table-column>
      <el-table-column align="center" label="联系地址" width="110" prop="address"></el-table-column>
      <el-table-column align="center" label="手机号" width="110" prop="phone"></el-table-column>
      <el-table-column align="center" label="邮箱" width="110" prop="email"></el-table-column>
      <el-table-column align="center" label="信用代码" width="110" prop="creditCode"></el-table-column>
      <el-table-column align="center" label="创建时间" width="152"><template v-slot="v">{{ v.row.createTime | filterDate }}</template></el-table-column>
      <el-table-column align="center" label="操作人" prop="operator"></el-table-column>
      <el-table-column align="center" label="描述" width="152" prop="description"></el-table-column>
      <el-table-column align="center" label="修改时间" width="152"><template v-slot="v">{{ v.row.createTime | filterDate }}</template></el-table-column>
      <!-- <el-table-column align="center" label="状态" width="70" fixed="right"><template v-slot="v">{{ v.row.status }}</template></el-table-column> -->
      <el-table-column align="left" label="操作" width="95" fixed="right">
        <template v-slot="v">
          <!-- <el-button class="radius_45" type="primary" size="mini" @click="handleEdit(v.$index, v.row)"><i class="el-icon-view"></i><span>详情</span></el-button> -->
          <el-button class="radius_45 mr10" type="primary" size="mini" @click="handleEdit(v.$index, v.row)"><i class="el-icon-edit"></i><span>编辑</span></el-button>
          <!-- <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            title="确定要删除？"
            @onConfirm="handleDelete(v.$index, v.row)">
            <el-button  class="radius_45 mt10" size="mini" type="danger" slot="reference"><i class="el-icon-delete"></i><span>删除</span></el-button>
          </el-popconfirm> -->
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
      class="showTenant"
      title="修改租户信息"
      :visible.sync="dialogPesonVisible"
      width="31%"
      top="0"
      :close-on-click-modal="false"
      :before-close="beforeClose"
      >
      <AddEdit :formParams="formParams" :btnShow="btnShow" :isReset="isReset" :userNameShow="userNameShow" @refreshTableData="refreshTableData">
        <template v-slot:cacelBtn>
          <el-button @click="beforeClose">取 消</el-button>
        </template>
      </AddEdit>
    </el-dialog>
  </div>
</template>

<script>
import { tenantList } from '@/api/multi-tenant'
import { pickerOptions, getDates } from '@/utils'
import '../utils/index.js'

let vm

export default {
  name: 'tenantList',
  components: {
  },
  data() {
    return {
      dialogPesonVisible: false,
      table_loading: false,
      pickerOptions1: pickerOptions(),
      multipleSelection: [],
      date1: null,
      props: { multiple: true },
      createTime: null,
      
      pagingQuery: {
       name: '',
       phone: '',
       userName: '',
       createTimeFrom: null,
       createTimeTo: null,
       description: '',

       current: 1,
       size: 100,
       total: 10,
      },

// 编辑参数
     formParams: {

     },
     btnShow: ['edit'],
     isReset: false,
     userNameShow: false
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
      tenantList(this.pagingQuery).then((res) => {
         if(res.code === 0) {
           this.tableData = []
           this.table_loading = false

           params.size = res.data.size
           params.current = res.data.current
           params.total = res.data.total

           if(res.data.records.length != 0 ) {
           this.tableData = res.data.records
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
        this.$confirm("此操作将永久删除已选租户, 是否继续?", "提示", {
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
        this.$message.warning('请在列表中勾选要删除的租户')
      }
    },
    handleEdit(index, row) {
      this.dialogPesonVisible = true
      this.formParams = { ...row }
    },
    beforeClose(done) {
    this.$confirm('确定要取消修改？').then(_ => {
      vm.dialogPesonVisible = false, done()
      }).catch(_ => {})
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
    refreshTableData() {
      this.getTableData(), this.dialogPesonVisible = false
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
     this.onSearch()
  },
  mounted() {
  },
}
</script>
