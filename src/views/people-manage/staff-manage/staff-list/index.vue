<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-01-13 18:09:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss">
.people_list {
  // margin-top: 24px;
}
</style>
<template>
  <div class="app-container">
    <el-form :model="roles" :inline="true">
      <el-form-item label="姓名"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入姓名搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="性别"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入姓名搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="工号"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入工号搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="电话"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入手机号搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="邮箱"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入手机号搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="部门">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
      ></el-form-item>
      <el-form-item label="职务"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入部门搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="入职时间">
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
      <el-form-item label="设备SN">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
      ></el-form-item>
      <el-form-item label="门禁卡号">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
      ></el-form-item>
      <el-form-item label="IC卡号"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入部门搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="状态">
        <el-select v-model="roles.status">
          <el-option
            v-for="status in roles.userStatus"
            :key="status.value"
            :value="status.status"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
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
      <el-button type="success" @click="onSearch" class="search">
        <i class="el-icon-search"></i><span>查询</span></el-button
      >
      <el-button type="warning" @click="onDelete">
        <i class="el-icon-delete"></i><span>批量删除</span></el-button
      >
      <el-button type="primary" @click="onExport">
        <i class="el-icon-s-promotion"></i
        ><span>批量下发至设备</span></el-button
      >
      <el-button type="primary" @click="onExport">
        <i class="el-icon-download"></i><span>导出</span></el-button
      >
      <el-button type="primary" @click="handleAddRole"
        ><svg-icon icon-class="edit" /> 新增员工</el-button
      >
    </el-form>
    <el-table :data="rolesList" border class="people_list" max-height="650">
      <el-table-column
        width="50"
        type="selection"
        :selectable="userDisabled"
        fixed
      ></el-table-column>
      <el-table-column label="序列" width="60" align="center">
        <template>1</template></el-table-column
      >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" width="80">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="已注册人脸" width="140">
        <template>
          <img src="../../../../assets/image/1.png" alt="" width="140" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别" width="50">
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="部门" width="100">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="身份证号" width="80">
        <template slot-scope="scope">
          {{ scope.row.dfs }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="工号" width="80">
        <template slot-scope="scope">
          {{ scope.row.dfs }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话" width="108">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱" width="108">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="职务" width="108">
        <template slot-scope="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
     <el-table-column align="center" label="门禁卡" width="108">
        <template slot-scope="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="IC卡" width="108">
        <template slot-scope="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="入职时间" width="108">
        <template slot-scope="scope">
          {{ scope.row.entryTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.updataTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="120">
        <template v-slot="scope">
          <el-switch v-model="scope.row.switch"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template> fff </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="210" fixed="right">
        <template slot-scope="scope">
          <el-button
            class="radius_45"
            type="primary"
            size="mini"
            @click="handleEdit(scope)"
            ><i class="el-icon-edit"></i><span>编辑</span></el-button
          >
          <el-button
            class="radius_45"
            type="primary"
            size="mini"
            @click="handleEdit(scope)"
            ><i class="el-icon-s-promotion"></i><span>下发</span></el-button
          ><br />
          <el-button
            class="radius_45 mt10"
            type="primary"
            size="mini"
            @click="handleEdit(scope)"
            ><i class="el-icon-notebook-2"></i><span>详情</span></el-button
          >
          <el-button
            class="radius_45 mt10"
            type="danger"
            size="mini"
            @click="handleDelete(scope)"
            ><i class="el-icon-delete"></i><span>删除</span></el-button
          ></template
        >
      </el-table-column>
      
      <el-dialog title="新建员工" :visible.sync="userFormVisible" width="558px">
        <div
          v-loading="addSave_loading"
          element-loading-text="拼命保存中"
          element-loading-spinner="el-icon-loading"
        >
          <el-form
            :model="addUserForm"
            label-width="auto"
            :rules="libraryRule"
            ref="addLibraryRule"
            class="addUserForm"
            :inline="true"
          >
            <el-form-item label="用户名："
              ><el-input v-model="username" style="width: 160px"></el-input
            ></el-form-item>
            <el-form-item label="邮箱："
              ><el-input v-model="username" style="width: 160px"></el-input
            ></el-form-item>
            <el-form-item
              label="昵称："
              prop="displayName"
              :rules="{ required: true, message: '脸库名称不能为空' }"
            >
              <el-input
                v-model.trim="addUserForm.displayName"
                placeholder="脸库名称"
                maxlength="30"
                style="width: 160px"
              ></el-input>
            </el-form-item>
            <el-form-item label="角色：">
              <el-select
                v-model="addUserForm.region"
                placeholder="超级管理员"
                style="width: 160px"
              >
                <el-option label="人力组" value="shanghai"></el-option>
                <el-option label="行政组" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态：" prop="maxSize">
              <el-radio v-model="addUserForm.radio" label="1">激活</el-radio>
              <el-radio v-model="addUserForm.radio" label="2">禁用</el-radio>
            </el-form-item>
            <el-form-item label="备注：" prop="description"
              ><el-input
                type="textarea"
                maxlength="400"
                v-model="addUserForm.description"
                placeholder="备注"
                style="width: 320px"
              ></el-input
            ></el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetFaceLibraryForm('addLibraryRule')"
              >重 置</el-button
            >
            <el-button @click="faceFormVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="addFaceLibraryHandler('addLibraryRule')"
              :disabled="addSave_loading"
              ><i :class="{ 'el-icon-loading': addSave_loading }"></i> &nbsp;保
              存</el-button
            >
          </div>
        </div>
      </el-dialog>
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
  </div>
</template>
<script>
import { addList } from "@/api/people-manage/staff-manage";
export default {
  name: "",
  data() {
    return {
      roles: [
        {
          roleName: "",
        },
      ],
      addUserForm: [
        
      ],
      rolesList: [
        {
          name: "阿娃",
          description: "算法应用院",
          createTime: "2020 01.12",
          updataTime: "2020 02.13",
          switch: 1,
          dfs: 9988983,
          phone: 15652655412,
          job: "打杂专员",
          sex: "女",
          entryTime: "2023-12-12",
        },
        {
          name: "阿龙",
          description: "超管",
          createTime: "2020 01.12",
          updataTime: "2020 02.13",
          switch: 1,
        },
      ],
     pagingParams: {
        username: "",
        email: "",
        // appkey: "",
        // secret:"",
        createDateFrom: "",
        createDateTo: "",
        current: 1, //默认当前页数为1
        size: 10,
        total: 0,
        status: "",
        // type:'0',
      },
    };
  },
  created() {
    addList({ username: "yang", password: "12345678" }).then(() => {});
  },
  mounted() {},
};
</script>
