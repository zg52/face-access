<!--
 * @Author: your name
 * @Date: 2021-01-10 18:10:42
 * @LastEditTime: 2021-01-12 16:47:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\system-manage\user\index.vue
-->
<template>
    <div class="app-container">
      <el-form :model="roles" :inline="true">
      <el-form-item label="用户名"> <el-input v-model.trim="roles.roleName" placeholder="输入用户名搜索"></el-input> </el-form-item>
      <el-form-item label="已禁用 / 已启用">
        <el-select v-model="roles.status">
          <el-option v-for="status in roles.userStatus" :key="status.value" :value="status.status"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间节点">
        <el-date-picker
          v-model="user_date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="changeDate"
        >
        </el-date-picker>
      </el-form-item>
      <el-button type="success" @click="onSearch" class="search"> <i class="el-icon-search"></i><span>查询</span></el-button>
      <el-button type="warning" @click="onDelete"> <i class="el-icon-delete"></i><span>批量删除</span></el-button>
      <el-button type="primary" @click="onExport"> <i class="el-icon-download"></i><span>导出</span></el-button>
      <el-button type="primary" @click="handleAddRole"><svg-icon icon-class="edit" /> 新增用户</el-button>
    </el-form>
        <el-table :data="rolesList" border>
     <el-table-column width="50" type="selection" :selectable="userDisabled" fixed></el-table-column>
      <el-table-column label="序列" width="60"> <template>1</template></el-table-column>
      <el-table-column align="center" label="用户名" width="120">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="昵称"  width="120">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱"  width="190">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="角色"  width="100">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间"  width="120">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="修改时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.updataTime }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="状态"  width="120">
        <template v-slot="scope">
         <el-switch v-model="scope.row.switch"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template>
       fff
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button class="radius_45" type="primary" size="small" @click="handleEdit(scope)"><i class="el-icon-edit"></i><span>编辑</span></el-button>
          <el-button class="radius_45" type="danger" size="small" @click="handleDelete(scope)"><i class="el-icon-delete"></i><span>删除</span></el-button></template>
      </el-table-column>
    </el-table>

      <el-dialog title="新建用户" :visible.sync="userFormVisible" width="558px">
     <div v-loading="addSave_loading"  element-loading-text="拼命保存中"  element-loading-spinner="el-icon-loading">
    <el-form :model="addUserForm" label-width="auto" :rules="libraryRule" ref="addLibraryRule" class="addUserForm" :inline="true">
      <el-form-item label="用户名："><el-input v-model="username" style="width: 160px"></el-input></el-form-item>
        <el-form-item label="邮箱："><el-input v-model="username" style="width: 160px"></el-input></el-form-item>
      <el-form-item label="昵称：" prop="displayName" :rules="{ required: true, message: '脸库名称不能为空'}">
        <el-input v-model.trim="addUserForm.displayName" placeholder="脸库名称" maxlength="30" style="width: 160px"></el-input>
      </el-form-item>
       <el-form-item label="角色：">
      <el-select v-model="addUserForm.region" placeholder="超级管理员" style="width: 160px">
        <el-option label="人力组" value="shanghai"></el-option>
        <el-option label="行政组" value="beijing"></el-option>
      </el-select>
   </el-form-item>
     <el-form-item label="状态：" prop="maxSize">
        <el-radio v-model="addUserForm.radio" label="1">激活</el-radio>
        <el-radio v-model="addUserForm.radio" label="2">禁用</el-radio>
     </el-form-item>
     <el-form-item label="备注：" prop="description"><el-input type="textarea" maxlength="400" v-model="addUserForm.description" placeholder="备注" style="width: 320px"></el-input></el-form-item>
     </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetFaceLibraryForm('addLibraryRule')">重 置</el-button>
      <el-button @click="faceFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addFaceLibraryHandler('addLibraryRule')" :disabled="addSave_loading"><i :class="{'el-icon-loading':addSave_loading}"></i> &nbsp;保 存</el-button>
    </div>
     </div>
  </el-dialog> 
    </div>
</template>
<script>
export default {
    data() {
        return {
        userFormVisible: true,
        addUserForm: [

        ],
       roles: [
        {
          roleName: ''
        }
      ],
    rolesList: [
        {
        name: '阿龙',
        description: '超管',
        createTime: '2020 01.12',
        updataTime: '2020 02.13',
        switch: 1
       },
     {
        name: '阿龙',
        description: '超管',
        createTime: '2020 01.12',
        updataTime: '2020 02.13',
        switch: 1
       },
      ],
          }
    }
}
</script>