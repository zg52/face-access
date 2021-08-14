<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-07-22 10:04:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
 
</style>
<template>
  <div class="app-container">
  <el-form :model="pagingQuery" :inline="true" ref="pagingQuery">
      <el-form-item label="创建人"><el-input v-model.trim="pagingQuery.operator" clearable></el-input></el-form-item>
      <el-form-item label="分组名称"><el-input v-model.trim="pagingQuery.name" clearable></el-input></el-form-item>
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
      <el-button type="primary" @click="refreshPagingQuery" class="search"> <i class="el-icon-refresh"></i><span>重置</span></el-button>
      <el-button type="primary" @click="addGroupHandle"><svg-icon icon-class="edit" /> 新增分组</el-button>
    </el-form>
    
    <el-table :data="tableData" border class="people_list" max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading" element-loading-spinner="el-icon-loading" ref="multipleTable">
      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
      <el-table-column width="50" type="selection" fixed ></el-table-column>
      <el-table-column label="序列" width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
      <el-table-column align="center" label="分组名称"><template v-slot="scope"> {{ scope.row.userGroup.name }} </template></el-table-column>
      <el-table-column align="center" label="组内人数"><template v-slot="scope"> {{ scope.row.personCount }} </template></el-table-column>
      <el-table-column align="center" label="创建时间"><template v-slot="scope">{{scope.row.userGroup.createTime }}</template> </el-table-column>
      <el-table-column align="center" label="修改时间"><template v-slot="scope">{{scope.row.userGroup.createTime }}</template> </el-table-column>
      <el-table-column align="center" label="操作人"><template v-slot="scope">{{scope.row.userGroup.operator}}</template> </el-table-column>
     
      <el-table-column align="left" label="操作">
        <template v-slot="scope">
            <el-button class="radius_45 mr10" type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)" ><i class="el-icon-edit"></i><span>编辑</span></el-button>
             <el-popconfirm
              confirmButtonText="确认"
              cancelButtonText="取消"
              title="删除后，该组内人员会移动至未分组"
              @onConfirm="handleDelete(scope.$index, scope.row)">
            <el-button  class="radius_45 ml10" size="mini" type="danger" slot="reference"><i class="el-icon-delete"></i><span>删除</span></el-button>
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
           title="新增分组"
           :visible.sync="dialogVisible1"
           :close-on-click-modal="false"
           width="25%"
          >
          <el-form :model="addGroup" ref="addGroup" :inline="true" :rules="addGroupRule">
              <el-form-item label="分组名称：" prop="name"><el-input class="w300" v-model.trim="addGroup.name" maxlength="6" placeholder="请输入新分组名称" clearable></el-input></el-form-item>
          </el-form>
          <div class="t_center mt20">
              <el-button @click="resetAddGroupForm"><i class="el-icon-refresh"></i> 重 置</el-button>
              <el-button type="primary" @click="saveGroupMsg('addGroup')"><i class="el-icon-check"></i> 保 存</el-button>
              <el-button @click="dialogVisible1 = false">取 消</el-button>
          </div>
      </el-dialog>
  </div>
</template>
<script>
import { staffGroupLis, addStaffGroup, delStaffGroup } from '@/api/people-manage/peopleGroup'
import { pickerOptions, getDates } from '@/utils'

let vm

export default {
  name: '',

  data() {
    return {
      table_loading: true,
      dialogVisible1: false,
      dialogVisible2: true,
      pickerOptions: pickerOptions(),
      date: null,
      multipleSelection: [],
      addGroup: {
        name: null
      },
      addGroupRule: {
        name: [{required: true, message:'分组名称不能为空', trigger: "blur" }]
      },
      pagingQuery: {
        operator: null,
        name: null,
        createTimeFrom: null,
        createTimeTo: null,
        
        current: 1,
        size: 20,
        total: null,
      },
      tableData: [],
    }
  },
  methods: {
    getGroupLis() {
      let [params] = [this.pagingQuery]
      this.table_loading = true
      if(!params.name) { delete params.name }
      staffGroupLis(this.pagingQuery).then((res) => {
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
      this.getGroupLis()
    },
    handleEdit(x, y) {
      this.$router.push({
        path: '/people-manage/EditGrop',
        query: {
          name: y.userGroup.name,
          id: y.groupId
        }
      })
    },
    saveGroupMsg(el) {
        let groupName = this.addGroup.name
      this.$refs[el].validate((valid) => {
        if (valid) {
            addStaffGroup({name: groupName}).then(res => {
                if(res.code === 0) {
                    this.resetAddGroupForm()
                    this.$message.success(`分组：${ groupName }创建成功`)
                    this.dialogVisible1 = false
                    this.getGroupLis()
                } else {
                    this.$message.error(res.msg)
                    
                }
            })
        }
      })
    },
     handleDelete(x, y) {
      delStaffGroup(y.groupId,{ id: y.groupId}).then((res) => {
        if (res.code == 0 && res.data === true) {
          this.$message.success(`分组：${ y.userGroup.name }已删除`)
          this.getGroupLis()
        } else {
          this.$message.warning({message: res.msg})
        }
      })
      
    },
    onDeletes() {
       if (this.multipleSelection.length !== 0) {
        this.$confirm("此操作将永久删除已选分组，组内人员将移动至未分组 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              delStaffGroup(this.multipleSelection[i].groupId).then((res) => {
                if (res.code == 0) {
                  if(i + 1 >= this.multipleSelection.length) {
                  this.onSearch()
                  this.$message.success(res.msg)
                  }
                } else {
                  this.$message.error(res.msg)
                }
              })
            }
          }).catch(() => {
             this.$message.info('已取消删除')
             this.$refs.multipleTable.clearSelection()
          })
      } else {
        this.$message.warning('请在列表中勾选要删除的分组名称')
      }
    },
    addGroupHandle() {
        this.dialogVisible1 = true
    },
    resetAddGroupForm() {
        this.$refs['addGroup'].resetFields()
    },
    changeDate() {
      getDates(this.pagingQuery, this.date, 'createTimeFrom', 'createTimeTo', '', 2)
    },
    cacelEditHandle() {
      this.getGroupLis()
      this.dialogVisible1 = false
    },
    handleSizeChange(val) {
      this.pagingQuery.size = val
      this.getGroupLis()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.getGroupLis()
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
    this.onSearch()
  },
  mounted() {
  },
}
</script>
