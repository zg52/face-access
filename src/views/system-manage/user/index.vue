<!--
 * @Author: your name
 * @Date: 2021-01-10 18:10:42
 * @LastEditTime: 2021-03-23 16:13:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\system-manage\user\index.vue
-->
<style lang="scss" scoped>
	.switchStyle{
      ::v-deep.el-switch__label {
            position: absolute;
            display: none;
            font-weight:normal;
        }
      ::v-deep.el-switch__label *{
            font-size:12px;
        }
       ::v-deep.el-switch__label--left {
            z-index: 9;
            left:22px;
            color: #fff;
        }
       ::v-deep.el-switch__label--right {
            z-index: 9;
            color: #fff;
        }
       ::v-deep.el-switch__label.is-active {
            display: block;
            height:30px;
            line-height:30px;
        }
    }
   ::v-deep.switchStyle.el-switch .el-switch__core,.el-switch .el-switch__label {
        width:60px !important;
    }
    .el-switch,.el-switch__core{
        height:30px;
        line-height:30px;
    }
    .el-switch__core{
        border-radius:15px;
        &:after{
            width:20px;
            height:20px;
            top:4px;
            left:3px;
            z-index:10;
        }
    }
    .el-switch.is-checked .el-switch__core::after{
        margin-left:-23px;
    }
</style>

<template>
    <div class="app-container">
      <el-form :model="pagingParams" :inline="true">
      <el-form-item label="用户名"> <el-input v-model.trim="pagingParams.name" placeholder="输入用户名搜索"></el-input> </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="pagingParams.status" clearable>
          <el-option v-for='(item, index) in statusType' :key='index' :label='item.label' :value='item.value'>
            <span style="float: right;color:yello;">
              <i class="el-icon-check"></i>
            </span>
            <span style="float: left; color: #8492a6; font-size: 13px">
              {{ item.label }}
            </span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间节点">
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
      <el-button type="warning" @click="onDeleteUserList"> <i class="el-icon-delete"></i><span>批量删除</span></el-button>
      <el-button type="primary" @click="onExport"> <svg-icon icon-class="excel" /> <span>导出</span></el-button>
      <el-button type="primary" @click="showAddUser"><svg-icon icon-class="edit" /> 新增用户</el-button>
    </el-form>

    <el-table border :data="userList" element-loading-spinner="el-icon-loading" class="user_list" max-height="650" @selection-change="handleSelectionChange" ref="multipleTable">
     <el-table-column width="50" type="selection" fixed></el-table-column>
      <el-table-column label="序列" width="60"> <template slot-scope="scope">{{ scope.row.index }}</template></el-table-column>
      <el-table-column align="center" label="用户名" width="150"> <template slot-scope="scope"> {{ scope.row.name }} </template> </el-table-column>
      <el-table-column align="center" label="昵称" width="120"> <template slot-scope="scope"> {{ scope.row.nickName }} </template> </el-table-column>
      <el-table-column align="center" label="邮箱" width="220"> <template slot-scope="scope"> {{ scope.row.email }} </template> </el-table-column>
      <el-table-column align="center" label="手机"><template slot-scope="scope"> {{ scope.row.phone }} </template> </el-table-column>
       <el-table-column align="center" label="角色" width="120"> <template slot-scope="scope" :data="roles"> {{roles[scope.row.roleId-1].roleName}} </template> </el-table-column>
      <el-table-column align="center" label="创建时间" width="150"> <template slot-scope="scope"> {{ scope.row.createTime }} </template> </el-table-column>
       <el-table-column align="center" label="修改时间" width="150"> <template slot-scope="scope"> {{ scope.row.updataTime }} </template> </el-table-column>
         <el-table-column align="center" label="状态" width="160">
        <template v-slot="scope">
         <el-switch class="switchStyle" v-model="scope.row.status" disabled active-value="VALID" inactive-value="INVALID" active-text="激活" inactive-text="禁用" active-color="#00A854" inactive-color="#F04134"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button class="radius_45" type="primary" size="mini" @click="handleEdit(scope.row)"><i class="el-icon-edit"></i><span>编辑</span></el-button>
          <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            title="确定要删除该用户？"
            @onConfirm="handleDelete(scope.row)">
            <el-button  class="radius_45 ml10" size="mini" type="danger" slot="reference"><i class="el-icon-delete"></i><span>删除</span></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="pagingParams['current']"
         :page-sizes="[10, 20, 40, 60, 80, 100, 200, 300, 400]"
         :page-size="pagingParams['size']"
         layout="total, sizes, prev, pager, next, jumper"
         :total="pagingParams['total']"
    ></el-pagination> 

    <el-dialog title="新建用户" :visible.sync="userFormVisible" width="558px">
      <div v-loading="addSave_loading"  element-loading-text="拼命保存中"  element-loading-spinner="el-icon-loading">
        <el-form :model="addUserForm" label-width="auto" :rules="addUserRule" ref="addUserForm" class="addUserForm" :inline="true">
          <el-form-item label="用户名：" prop="name"> <el-input v-model="addUserForm.name" style="width: 160px" placeholder="用户名"></el-input> </el-form-item>
          <el-form-item label="昵称：" prop="nickName"> <el-input v-model="addUserForm.nickName" style="width: 160px" placeholder="昵称"></el-input> </el-form-item>
          <el-form-item label="邮箱：" prop="email"> <el-input v-model="addUserForm.email" style="width: 160px" placeholder="邮箱"></el-input> </el-form-item>
          <el-form-item label="手机号：" prop="phone"> <el-input v-model="addUserForm.phone" style="width: 160px" placeholder="手机号"></el-input> </el-form-item>
          <el-form-item label="角色：" prop="role">
            <el-select v-model="addUserForm.roleId" placeholder="选择角色" style="width: 160px">
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
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('addUserForm')">重 置</el-button>
          <el-button @click="userFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveUserForm('addUserForm')" :disabled="addSave_loading"><i :class="{'el-icon-loading':addSave_loading}"></i> &nbsp;保 存</el-button>
        </div>
      </div>
    </el-dialog>

    
    <el-dialog title="编辑用户" :visible.sync="editUserVisible" width="558px">
      <div v-loading="editSave_loading" element-loading-text="拼命保存中" element-loading-spinner="el-icon-loading">
        <el-form :model="editUserForm" label-width="auto" :rules="addUserRule" ref="editUserForm" class="addUserForm" :inline="true">
          <el-form-item label="用户名：" prop="name">
            <el-input v-model="editUserForm.name" style="width: 160px" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="昵称：" prop="nickName">
            <el-input v-model="editUserForm.nickName" style="width: 160px" placeholder="昵称"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="editUserForm.email" style="width: 160px" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="editUserForm.phone" style="width: 160px" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="角色：" prop="role">
            <el-select v-model="editUserForm.roleId" placeholder="选择角色" style="width: 160px">
              <el-option label="超级管理员" value=1></el-option>
              <el-option label="管理员" value=2></el-option>
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
        <div slot="footer" class="dialog-footer">
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
import { getUserRoles } from '@/utils/business'
import moment from 'moment'

export default {
  data() {
    var validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    }

    var validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    }
    return {
      userFormVisible: false,
      editUserVisible: false,
      addSave_loading: false,
      editSave_loading: false,
      multipleSelection: [], //多选删除
      pickerOptions: pickerOptions(),
      getUserRoles: getUserRoles,

      
      queryDate: '',
      addUserForm: {
        name: null,
        email: null,
        nickName: null,
        phone: null,
        roleId: null,
        status: null,
        remark: null,
      },

      editUserForm: {
        id: null,
        name: null,
        email: null,
        nickName: null,
        phone: null,
        roleId: null,
        status: null,
        remark: null,
      },
      roles: [
        {roleName: '超级管理员'}, {roleName: '管理员'}
      ],
      statusType: [
        {label: "激活", value: "VALID"},
        {label: "禁用", value: "INVALID"}
      ],
    
    //用户列表
      userList: [],
      pagingParams: {
        name: "",
        startTime: "",
        endTime: "",
        current: 1,
        size: 10,
        status: null,
        total: null,
      },
      addUserRule: {
          name: { required: true, message: "用户名不能为空", trigger: "blur"},
          email: [{ required: true, message: "邮箱不能为空", trigger: "blur"}, {validator: validateEmail, trigger: "blur"}],
          phone: [{ required: true, message: "手机号不能为空", trigger: "blur"}, {validator: validatePhone, trigger: "blur"}],
          status: { required: true, message: "请选择状态", trigger: "blur"},
          roleId: { required: true, message: "请选择角色", trigger: "blur"},
        },
    }
  },

  mounted() {
    let _this = this;
    searchUser(_this.pagingParams).then((res) => {
             if(res.code === 0 && res.data) {
               _this.userList.splice(0);
               _this.pagingParams.total = res.data.total;
               _this.pagingParams.current = res.data.current;
               _this.pagingParams.size = res.data.size;
               var new_userList = res.data.records;
               for (var i=0; i<new_userList.length; i++) {
                 _this.userList.push({
                    index: i,
                    id: new_userList[i].id,
                    name: new_userList[i].name,
                    nickName: new_userList[i].nickName,
                    email: new_userList[i].email,
                    phone: new_userList[i].phone,
                    roleId: new_userList[i].roleIds ? new_userList[i].roleIds[0].toString() : "1",
                    createTime: new_userList[i].createTime.substring(0,10),
                    updataTime: new_userList[i].lastUpdateTime.substring(0,10),
                    status: new_userList[i].status,
                    remark: new_userList[i].remark
                 });
               }
             }
            })
  },
  methods: {
    setValueNull(val) {
      this.value_ = null;
    },
    getRoleName(val) {
      let _this = this;
      return _this.roles[val-1].roleName;
    },
    showAddUser() {
      let _this = this;
      _this.userFormVisible = true;
    },
    resetForm(val) {
      let _this = this;
      _this.$refs[val].resetFields();
      _this.addUserForm.roleId = undefined;
      console.log(_this.addUserForm);
    },
    saveUserForm(val) {
      let _this = this;
      _this.$refs[val].validate((valid) => {
          if (valid) {
            addUser(_this.addUserForm).then((res) => {
             if(res.code === 0 && res.data == true) {
               _this.onSearch();
               _this.$message.success(res.msg);
               _this.$refs[val].resetFields();
               _this.userFormVisible = false;
             } else {
               this.$message.warning(res.msg)
             }
           });
      }})
    },
    // 修改用户
    handleEdit(val) {
      let _this = this;
      _this.editUserForm.id = val.id;
      _this.editUserForm.name = val.name;
      _this.editUserForm.email = val.email;
      _this.editUserForm.nickName = val.nickName;
      _this.editUserForm.phone = val.phone;
      _this.editUserForm.roleId = val.roleId;
      _this.editUserForm.status = val.status;
      _this.editUserForm.remark = val.remark;
      _this.editUserVisible = true;
    },
    // 删除用户
    handleDelete(val) {
      let _this = this;
      deleteUser(val.id).then((res) => {
        if (res.code == 0) {
          _this.onSearch();
          _this.$message.success("成功删除用户" + val.name);
        } else {
          _this.$message.warning("删除用户"+ val.name + "失败: " + res.msg)
        }
      })
    },
    saveUserEdit(val) {
      let _this = this;
      _this.$refs[val].validate((valid) => {
          if (valid) {
            editUser(_this.editUserForm).then((res) => {
             if(res.code === 0) {
               _this.onSearch();
               _this.$message.success(res.msg);
               _this.editUserVisible = false;
             } else {
               _this.$message.warning(res.msg);
             }
           });
      }})
    },
    changeDate() {
      let _this = this;
      let date = _this.queryDate;
      date && date.length
        ? ((_this.pagingParams.startTime = moment(date[0]).format("YYYY-MM-DD")),
          (_this.pagingParams.endTime = moment(date[1]).format("YYYY-MM-DD")))
        :  _this.pagingParams.startTime = _this.pagingParams.endTime = null;
    },
    onSearch() {
      let _this = this;
      searchUser(this.pagingParams).then((res) => {
             if(res.code === 0 && res.data) {
               _this.userList.splice(0);
               _this.pagingParams.total = res.data.total;
               _this.pagingParams.current = res.data.current;
               _this.pagingParams.size = res.data.size;
               var new_userList = res.data.records;
               for (var i=0; i<new_userList.length; i++) {
                 _this.userList.push({
                    index: i,
                    id: new_userList[i].id,
                    name: new_userList[i].name,
                    nickName: new_userList[i].nickName,
                    email: new_userList[i].email,
                    phone: new_userList[i].phone,
                    roleId: new_userList[i].roleIds ? new_userList[i].roleIds[0].toString() : "1",
                    createTime: new_userList[i].createTime.substring(0,10),
                    updataTime: new_userList[i].lastUpdateTime.substring(0,10),
                    status: new_userList[i].status,
                    remark: new_userList[i].remark
                 });
               }
             }
      });
    },
    onDeleteUserList() {
       let _this = this;
       if (_this.multipleSelection.length !== 0) {
        _this.$confirm("此操作将会删除已选的全部用户, 确定继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          console.log("here");
          console.log(_this.multipleSelection);
          for (var i = 0; i < _this.multipleSelection.length; i++) {
            _this.handleDelete(_this.multipleSelection[i]);
          }
        }).catch(() => {
          _this.$message.success.info({message: '已取消删除'})
          _this.$refs.multipleTable.clearSelection()
          })
      } else {
        _this.$message({
          message: "请在列表中选择要删除的用户",
          type: "warning"
        })
      }
    },
    onExport() {

    },
  handleSizeChange(val) {
      this.pagingParams.size = val
      this.onSearch()
  },
  handleCurrentChange(val) {
    this.pagingParams.current = val
    this.onSearch()
  },
  handleSelectionChange(val) {
    this.multipleSelection = val
  },
  }
}
</script>
