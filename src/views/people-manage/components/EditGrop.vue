<!--
 * @Author: your name
 * @Date: 2021-07-09 15:31:04
 * @LastEditTime: 2021-07-26 09:58:35
 * @LastEditors: Please set LastEditors
 * @Description: 人员（员工、访客）分组编辑
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\face-recognition-access\src\views\people-manage\components\EditGrop.vue
-->
<style lang="scss" scoped>
.dialog__body {
  .el-dialog__body {
  padding-top: 0!important;
}
 .el-dialog__footer {
    margin-top:-50px
  }
  }
</style>
<template>
    <div class="app-container">
        <el-page-header @back="goBack" content="编辑分组"></el-page-header>
        <div class="mt20">
            <div class="lis_tit"><i></i> <span>分组名称</span></div>
            <el-form :model="editParams" ref="editParams" :rules="editRule">
              <el-form-item label="" prop="name">
                  <el-input class="w300" v-model.trim="editParams.name" maxLength="6" clearable placeholder="请输入分组名称"></el-input>
                  <el-button class="ml10" @click="editGroupName('editParams')" type="primary">修改</el-button>
                  <el-button class="ml10" @click="getRouteParam(true)">重置</el-button>
                  </el-form-item>
            </el-form>
            <div class="lis_tit"><i></i> <span>组内人员列表</span></div>
     <el-form :model="pagingQuery" :inline="true" ref="pagingQuery">
      <el-form-item label="员工姓名"><el-input class="w100" v-model.trim="pagingQuery.name" clearable></el-input></el-form-item>

      <el-form-item label="加入分组日期">
        <el-date-picker
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建日期"
          end-placeholder="更新日期"
          :picker-options="pickerOptions"
          :default-time="['00:00:00', '23:59:59']"
          @change="changeDate1"
          clearable
          >
        </el-date-picker>
      </el-form-item>
      <el-button type="success" @click="onSearch" class="search"> <i class="el-icon-search"></i><span>查询</span></el-button>
      <el-button type="warning" @click="onDeletes" class="search"><i class="el-icon-delete"></i><span>批量移除</span></el-button>
      <!-- <el-button type="primary" disabled @click="refreshPagingQuery" class="search"><i class="el-icon-rank"></i><span>批量移动</span></el-button> -->
      <!-- <el-button type="primary" disabled @click="refreshPagingQuery" class="search"><i class="el-icon-rank"></i><span>批量复制</span></el-button> -->
      <el-button type="primary" @click="staffHandle" class="search"><i class="el-icon-plus"></i><span>添加人员</span></el-button>
    </el-form>

     <el-table :data="tableData" class="people_list" max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading" element-loading-spinner="el-icon-loading" ref="multipleTable">
      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
      <el-table-column width="50" type="selection" fixed ></el-table-column>
      <el-table-column label="序列" width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
      <el-table-column align="center" label="已注册人脸" width="90">
        <template v-slot="scope"><img :src="`${ getImgUrl + scope.row.imageId}`" width="100%"/></template>
      </el-table-column>
      <el-table-column align="center" label="员工姓名"> <template v-slot="scope"> {{ scope.row.name }} </template></el-table-column>
      <el-table-column align="center" label="入职时间"> <template v-slot="scope"> {{ scope.row.enrollTime }} </template></el-table-column>
      <el-table-column align="center" label="工号"> <template v-slot="scope"> {{ scope.row.name }} </template></el-table-column>
      <el-table-column align="left" label="操作" fixed="right">
        <template v-slot="scope">
       <div>
          <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            title="是否将该人员从组内移除？"
            @onConfirm="handleDelete(scope.$index, scope.row)">
            <el-button  class="radius_45 ml0 mt10" size="mini" type="danger" slot="reference"><i class="el-icon-delete"></i><span>移除</span></el-button>
          </el-popconfirm>
      </div>
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

    <el-dialog title="添加员工" :visible.sync="staff_dialogVisible" :close-on-click-modal="false" top="0" width="68%" class="dialog__body">
      <StaffList
       listTit="选择要添的员工"
       @employeeIds="getemployeeIds" 
       :selectabId="selectabId" 
       confirmTxt="添加到当前分组"
        v-if="staff_dialogVisible" 
        @staffHandleTo="staffHandleTo" 
       :clearSelectionState1.sync="clearSelectionState1"
       :isShowTip="{ show: true, txt:'复选框禁止勾选，表示该人员已在当前分组中' }"
        />
                  
      <span slot="footer" class="dialog-footer">
        <el-button @click="staff_dialogVisible_handle">取 消</el-button>
        <el-button type="primary" @click="staffHandleTo">确 定</el-button>
      </span>
    </el-dialog>
        </div>
    </div>
</template>
<script>
import { editStaffGroup, addStaffToGroup, delGroupStaff } from '@/api/people-manage/peopleGroup'
import { imgUrl } from '@/api/public'
import { pickerOptions, getDates } from '@/utils'
import StaffList from '@/components/Business/PersonList/StaffList'
import { getStaffList } from '@/api/people-manage/staffManage'

let vm

export default {
   components: {
     StaffList
    },
    data() {
     return {
       date: null,
       multipleSelection: [],

       getImgUrl: imgUrl(),
       pickerOptions: pickerOptions(),
       staff_dialogVisible: false,
       checked1: false,
       personNum: null,
       clearSelectionState1: false,
       editParams: {
           name: null,
           id: null
       },
       editRule: {
           name: [{required: true, message:'分组名称不能为空', trigger: "blur" }]
       },
       pagingQuery: {
          name: '',
          createTimeFrom: null,
          createTimeFrom: null,
          groupId: null,
          current: 1,
          size: 20,
          total: null,
       },
       tableData: [],
        personId: null,
        
        selectabId: [], // 获取已在分组中的员工id和全部员工id作比较,判断数据是否可选
        }
    },
    filters: {
      filterGroupLis(val) {
      if(val !== undefined) {
        return val
      }
      }
    },
    watch: {
    staff_dialogVisible(val) {
      if(!val) {
        if(!this.employeeIdNum) {
          this.checked1 = false
          this.personId = null
        }
      }
    },
    $route() {
      let querys = this.$route.query
     if(!querys.name || !querys.id) {
       this.$router.go(-1)
     }
    }
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
  editGroupName(el) {
     this.$refs[el].validate((valid) => {
        if (valid) {
            editStaffGroup(this.editParams.id, this.editParams).then(res => {
                if(res.code === 0) {
                    this.$message.success('修改成功')
                } else {
                    this.$message.error(res.msg)
                }
            })
        }
      })
  },
    getPersonIds(x) {
     let personIdsArr = []
         x.map(item => personIdsArr.push(item.id))
         this.personId = personIdsArr
    },
    getemployeeIds(employeeIds) {
      this.getPersonIds(employeeIds)
    },
    staffHandle() {
      this.personHandle('personId', 'staff_dialogVisible', 'checked1', 'clearSelectionState1')
    },
    staffHandleTo() {
      this.handleTo('personId', 'staff_dialogVisible', '请勾选要添加的人员', 'employeeIdNum')
    },
    staff_dialogVisible_handle() {
      this.person_dialogVisible_handle('staff_dialogVisible', 'personId', 'checked1')
    },
    personHandle(x, y, n, q) {
      this.getStaffList()
          this[x] = null
          if(this[n]) {
            this[y] = false, this[q] = false
          } else {
            this[y] = true

// 获取人员id 传给staffList组件
           new Promise((resolve) => {
              if(this.tableData && this[y]) {
                resolve()
              }
            }).then(() => {
              this.tableData.forEach((item) => {
                this.selectabId.push(item.id)
              })
              }) 
          }
    },
    handleTo(x, y, z, m) {
         if (this[x] !== null && this[x].length !== 0) {
             this[y] = false, this[m] = true
             let formData = new FormData(),
                  a = {
                        groupId: this.editParams.id,
                        personIds: this.personId
                      }

             for(let item in a) { 
               formData.append(item, a[item]) 
               }
             addStaffToGroup(formData).then(res => {
               if(res.code === 0 && res.data) {
                 this.$message.success('添加成功')
                  this.getStaffList()
               } else {
                 this.$message.error(res.msg)
               }
                })
          } else {
            this.$message.warning(z)
            this[m] = null
          }
    },
    person_dialogVisible_handle(x, y, z) {
      this[x] = false, this[y] = null, this[z] = false
    },
     handleDelete(x, y) {
      delGroupStaff({
        groupId: this.pagingQuery.groupId,
        personIds: y.id
      }).then((res) => {
        if (res.code == 0 && res.data) {
          this.$message.success(`已移除 ${y.name}`)
          this.getStaffList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    onDeletes() {
     if (this.multipleSelection.length !== 0) {
      this.$confirm("此操作将移除该分组内已选人员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            delGroupStaff(
               {
                 groupId: this.pagingQuery.groupId,
                 personIds: this.multipleSelection[i].id
               }
              ).then((res) => {
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
           this.$message.info('已取消移除')
           this.$refs.multipleTable.clearSelection()
        })
    } else {
      this.$message.warning('请在列表中勾选要移除的人员')
    }
    },
  goBack() {
     this.$router.go(-1)
   },
  changeDate1() {
    getDates(this.pagingQuery, this.date, 'createTimeFrom', 'createTimeTo', '', 2)
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
  },
  getRouteParam(isReset) {
    let is = isReset ?? false
    if(is) {
      this.$refs.editParams.resetFields()
    } else {
      getGroupName()
    }
    function getGroupName() {
    let groupQuery = vm.$route.query
       vm.editParams = {
       name: groupQuery.name,
       id: groupQuery.id
     }
     vm.pagingQuery.groupId = groupQuery.id
    }

  }
 },
 created() {
   vm = this
   this.getRouteParam()
  },
  mounted() {
   this.onSearch()
  }
}
</script>