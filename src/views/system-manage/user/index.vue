<!--
 * @Author: your name
 * @Date: 2021-01-10 18:10:42
 * @LastEditTime: 2021-07-05 11:14:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\system-manage\user\index.vue
-->
<style lang="scss" scoped>
@import '../../../styles/variables.scss';
.themeTxt{
  color: $themeTxt;
}
 ::v-deep .success-row {
  background: #f5f7fa !important;
}
</style>

<template>
    <div class="app-container">
      <el-form :model="pagingQuery" :inline="true">
      <el-form-item label="账号"> <el-input v-model.trim="pagingQuery.name" placeholder="输入账号搜索"></el-input> </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="pagingQuery.status" clearable>
          <el-option v-for='(item, index) in statusType' :key='index' :label='item.value' :value='item.id'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="queryDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="起止日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="changeDate"
        >
        </el-date-picker>
      </el-form-item>
      <el-button type="success" @click="onSearch" class="search"> <i class="el-icon-search"></i><span>查询</span></el-button>
      <el-button type="warning" @click="onDeletetableData"> <i class="el-icon-delete"></i><span>批量删除</span></el-button>
      <el-button type="primary" @click="onExport" disabled> <svg-icon icon-class="excel" /> <span>导出</span></el-button>
      <el-button type="primary" @click="showAddUser"><svg-icon icon-class="edit" /> 新增用户</el-button>
    </el-form>

    <el-table border :data="tableData" v-loading="table_loading" :row-class-name="tableRowClassName" element-loading-spinner="el-icon-loading" class="user_list" max-height="650" @selection-change="handleSelectionChange" ref="multipleTable">
     <el-table-column width="40" type="selection" fixed :selectable="selectableHandle"></el-table-column>
      <el-table-column label="序列" width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
      <el-table-column align="center" label="租户" width="150"><template v-slot="v">{{ v.row.tenantId | filterTenantId }}</template></el-table-column>
      <el-table-column align="center" label="账号" width="150" prop="name"></el-table-column>
      <el-table-column align="center" label="邮箱" width="220"> <template v-slot="scope"> {{ scope.row.email }} </template> </el-table-column>
      <el-table-column align="center" label="手机" width="120"><template v-slot="scope"> {{ scope.row.phone }} </template> </el-table-column>
       <el-table-column align="center" label="角色" width="120"> <template v-slot="scope"> <span :class="scope.row.roleIds == 0 ? 'themeTxt' : ''">{{ scope.row.roleIds | filterUserRoleName }}</span> </template></el-table-column>
      <el-table-column align="center" label="创建时间" width="160"> <template v-slot="scope"> {{ scope.row.createTime }} </template> </el-table-column>
      <el-table-column align="center" label="修改时间" width="160"> <template v-slot="scope"> {{ scope.row.lastUpdateTime }} </template> </el-table-column>
         <el-table-column align="center" label="状态" width="70">
        <template v-slot="scope">{{ scope.row.status | filterUserStatus }}</template>
      </el-table-column>
       <el-table-column align="center" label="备注" width="auto"> <template v-slot="scope"> {{ scope.row.remark }} </template> </el-table-column>
      <el-table-column align="center" label="操作" width="200" fixed="right">
        <template v-slot="scope" >
         <div v-show="scope.row.name === 'sysadmin' ? false : true">
            <el-button class="radius_45" type="primary" size="mini" @click="handleEdit(scope.row)"><i class="el-icon-edit"></i><span>编辑</span></el-button>
          <el-popconfirm
          v-show="scope.row.name === username ? false : true"
            confirmButtonText="确认"
            cancelButtonText="取消"
            title="确定要删除该用户？"
            @onConfirm="handleDelete(scope.row)">
            <el-button  class="radius_45 ml10" size="mini" type="danger" slot="reference"><i class="el-icon-delete"></i><span>删除</span></el-button>
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

    <el-dialog title="新建用户" :visible.sync="userFormVisible" :close-on-click-modal="false" width="558px">
      <div v-loading="addSave_loading"  element-loading-text="拼命保存中"  element-loading-spinner="el-icon-loading">
        <el-form :model="addUserForm" label-width="auto" :rules="addUserRule" ref="addUserForm" class="addUserForm" :inline="true">
          <el-form-item label="账号：" prop="name"> <el-input v-model="addUserForm.name" style="width: 160px" placeholder="账号"></el-input> </el-form-item>
          <!-- <el-form-item label="昵称：" prop="nickName"> <el-input v-model="addUserForm.nickName" style="width: 160px" placeholder="昵称"></el-input> </el-form-item> -->
          <el-form-item label="邮箱：" prop="email"> <el-input v-model="addUserForm.email" style="width: 160px" placeholder="邮箱"></el-input> </el-form-item>
          <el-form-item label="手机号：" prop="phone"> <el-input v-model="addUserForm.phone" style="width: 160px" placeholder="手机号"></el-input> </el-form-item>
          <el-form-item label="角色：" prop="roleIds">
            <el-select v-model="addUserForm.roleIds" placeholder="选择角色" style="width: 160px">
             <el-option v-for="(role, index) of getUserRoles" :key="index" :label="role.name" :value="role.id"></el-option>
          </el-select>
          </el-form-item>
         <el-form-item label="状态：" prop="status">
          <el-radio v-model="addUserForm.status" label="VALID">激活</el-radio>
          <el-radio v-model="addUserForm.status" label="INVALID">禁用</el-radio>
         </el-form-item>
         <el-form-item label="备注：" prop="remark">
          <el-input type="textarea" maxlength="400" v-model="addUserForm.remark" placeholder="备注" style="width: 320px"></el-input>
         </el-form-item>
        </el-form>
        <div class="t_right mt15">
          <el-button @click="resetForm('addUserForm')">重 置</el-button>
          <el-button @click="userFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveUserForm('addUserForm')" :disabled="addSave_loading"><i :class="{'el-icon-loading':addSave_loading}"></i> &nbsp;保 存</el-button>
        </div>
      </div>
    </el-dialog>
    
    <el-dialog title="编辑用户" :visible.sync="editUserVisible" :close-on-click-modal="false" width="558px">
      <div v-loading="editSave_loading" element-loading-text="拼命保存中" element-loading-spinner="el-icon-loading">
        <el-form :model="editUserForm" label-width="auto" :rules="addUserRule" ref="editUserForm" class="addUserForm" :inline="true">
          <el-form-item label="账号：" prop="name"><el-input v-model="editUserForm.name" style="width: 160px" placeholder="账号"></el-input></el-form-item>
          <el-form-item label="邮箱：" prop="email"><el-input v-model="editUserForm.email" style="width: 160px" placeholder="邮箱"></el-input></el-form-item>
          <el-form-item label="手机号：" prop="phone"><el-input v-model="editUserForm.phone" style="width: 160px" placeholder="手机号"></el-input></el-form-item>
          <el-form-item label="角色：" prop="roleIds">
            <el-select v-model="editUserForm.roleIds1" placeholder="选择角色" style="width: 160px" @change="changeRoleIds1">
             <el-option v-for="(role, index) of getUserRoles" :key="index" :label="role.name" :value="role.id"></el-option>
          </el-select>
          </el-form-item>
         <el-form-item label="状态：" prop="status">
          <el-radio v-model="editUserForm.status" label="VALID">激活</el-radio>
          <el-radio v-model="editUserForm.status" label="INVALID">禁用</el-radio>
         </el-form-item>
         <el-form-item label="备注：" prop="remark">
          <el-input type="textarea" maxlength="400" v-model="editUserForm.remark" placeholder="备注" style="width: 320px"></el-input>
         </el-form-item>
        </el-form>
        <div class="t_right mt15">
          <el-button @click="resetForm('editUserForm'); editUserVisible = false;">取 消</el-button>
          <el-button type="primary" @click="saveUserEdit('editUserForm')" :disabled="editSave_loading"><i :class="{'el-icon-loading':editSave_loading}"></i> &nbsp;保 存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { searchUser, addUser, editUser, deleteUser } from '@/api/system-manage/userManage'
import { validEmail, validPhone } from '@/utils/validate.js'
import { pickerOptions } from '@/utils'
import { getUserRoles, getUserStatus } from '@/utils/business'
import moment from 'moment'
import { mapActions, mapState, mapGetters } from 'vuex'
let vm

export default {
  data() {
    let validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback()
      }
    },
    validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback()
      }
    }

    return {
      sysadmin: 'sysadmin',
      table_loading: true,
      userFormVisible: false,
      editUserVisible: false,
      addSave_loading: false,
      editSave_loading: false,
      multipleSelection: [],
      pickerOptions: pickerOptions(),
      getUserRoles: [...getUserRoles],
      tenantname_id: [],

      queryDate: '',
      addUserForm: {
        name: null,
        email: null,
        nickName: null,
        phone: null,
        roleIds: null,
        status: 'VALID',
        remark: null
      },

      editUserForm: {
        id: null,
        name: null,
        email: null,
        phone: null,
        roleIds: null,
        roleIds1:null,
        status: null,
        remark: null
      },
      statusType: getUserStatus,
    
    //用户列表
      tableData: [],
      pagingQuery: {
        name: null,
        startTime: null,
        endTime: null,
        
        current: 1,
        size: 20,
        status: null,
        total: null,
      },
      addUserRule: {
          name: [ { required: true, message: "账号不能为空", trigger: "blur"} ],
          email: [{ required: true, message: "邮箱不能为空", trigger: "blur"}, {validator: validateEmail, trigger: "blur"}],
          phone: [{ required: true, message: "手机号不能为空", trigger: "blur"}, {validator: validatePhone, trigger: "blur"}],
          status: { required: true, message: "请选择状态", trigger: "blur"},
          roleIds: { required: true, message: "请选择角色", trigger: "blur"},
        },
    }
  },
  computed: {
     ...mapState('user',['roles']),
     ...mapGetters(['username'])
  },
  filters: {
    filterTenantId(value) {
      let name = null
      vm.tenantname_id.forEach((item) => {
        if(item.id == value) {
          name = item.name
        }
      })
      return name
    },
    filterUserRoleName(arr) {
      let roleName = null
    if(arr && Array.isArray(arr) && arr.length !== 0) {
      for(let i = 0; i < getUserRoles.length; i++) {
        if(getUserRoles[i].id == arr) {
          roleName = getUserRoles[i].name
          break
        }
      }
      return roleName
  } else {
    return '空'
  }
    }
  },
  methods: {
    setValueNull(val) {
      this.value_ = null
    },
    showAddUser() {
      this.userFormVisible = true
    },
    resetForm(val) {
      this.$refs[val].resetFields()
    },
    saveUserForm(val) {
      this.$refs[val].validate((valid) => {
          if (valid) {
            this.addUserForm.nickName = this.addUserForm.name
            addUser(this.addUserForm).then((res) => {
             if(res.code === 0 && res.data) {
               this.onSearch()
               this.$message.success(res.msg)
               this.$refs[val].resetFields()
               this.userFormVisible = false
             } else {
               this.$message.error(res.msg)
             }
           })
      }})
    },
    handleEdit(val) {
      this.editUserForm.id = val.id
      this.editUserForm.name = val.name
      this.editUserForm.email = val.email
      this.editUserForm.nickName = val.nickName
      this.editUserForm.phone = val.phone
      this.editUserForm.roleIds = val.roleIds[0]
      this.editUserForm.status = val.status
      this.editUserForm.remark = val.remark
      
      for(let i = 0; i < getUserRoles.length; i++) {
        if(getUserRoles[i].id == val.roleIds[0]) {
          this.editUserForm.roleIds1 = getUserRoles[i].name
          break
        }
      }
      this.editUserVisible = true
    },
    handleDelete(val) {
      deleteUser(val.id).then((res) => {
        if (res.code == 0) {
          this.onSearch()
          this.$message.success("成功删除用户" + val.name)
        } else {
          this.$message.warning("删除用户"+ val.name + "失败: " + res.msg)
        }
      })
    },
    saveUserEdit(val) {
      this.$refs[val].validate((valid) => {
          if (valid) {
            editUser(this.editUserForm).then((res) => {
             if(res.code === 0) {
               this.onSearch()
               this.$message.success(res.msg)
               this.editUserVisible = false
             } else {
               this.$message.error(res.msg)
             }
           })
      }})
    },
    changeRoleIds1() {
      this.editUserForm.roleIds = this.editUserForm.roleIds1
    },
    changeDate() {
      let date = this.queryDate;
      date && date.length
        ? ((this.pagingQuery.startTime = moment(date[0]).format("YYYY-MM-DD")),
          (this.pagingQuery.endTime = moment(date[1]).format("YYYY-MM-DD")))
        :  this.pagingQuery.startTime = this.pagingQuery.endTime = null
    },
    onSearch() {
       let params = this.tableData
      params.current = 1
     this.getUserList()
    },
    getUserList() {
      searchUser(this.pagingQuery).then((res) => {
        if(res.code === 0) {
               this.tableData = []
               this.pagingQuery.total = res.data.total
               this.pagingQuery.current = res.data.current
               this.pagingQuery.size = res.data.size
                 this.table_loading = false
                 this.tableData = res.data.records.length !== 0 ? res.data.records : []
             } else {
               this.$message.error(re.msg)
             }
      })
    },
    onDeletetableData() {
       if (this.multipleSelection.length !== 0) {
        this.$confirm("此操作将会删除已选的全部用户, 确定继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          for (var i = 0; i < this.multipleSelection.length; i++) {
            this.handleDelete(this.multipleSelection[i]);
          }
        }).catch(() => {
          this.$message.info({message: '已取消删除'})
          this.$refs.multipleTable.clearSelection()
          })
      } else {
        this.$message.warning('请在列表中选择要删除的用户')
      }
    },
    onExport() {

    },
    selectableHandle(row, index) {
     return row.roleIds == getUserRoles[0].id ? false : true
    },
    ...mapActions(['user/tenantList']),
    handleSizeChange(val) {
        this.pagingQuery.size = val
        this.onSearch()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.onSearch()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    tableRowClassName({ row, rowIndex }) {
      return row.name == this.username ? "success-row" : String
    },
    },
    beforeCreate() {
    vm = this
  },
  created() {
    this.onSearch()
    this['user/tenantList']().then((tenantList) => {
      this.tenantname_id = tenantList.tenantList
    })    
  },
  mounted() {
// 手动按登录用户所属角色 截取角色列表
    if(this.roles.includes(getUserRoles[1].id)) {
      this.getUserRoles.splice(0,1)
    } else if(this.roles.includes(getUserRoles[2].id)) {
      this.getUserRoles.splice(1,2)
    }
}
}
</script>