<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-02-03 19:43:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8a16ff;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border:1px #8a16ff dashed;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .camera {
    margin-left: 30px;
    margin-top: 44px;
    i {
      font-size: 20px;
    }
  }
  .des {
   color: #999;
    font-size: 12px;
    padding-left: 30px;
    line-height: 16px;
  }
</style>
<template>
  <div class="app-container">
  <el-form :model="pagingQuery" :inline="true">
      <el-form-item label="创建人"><el-input v-model.trim="pagingQuery.operator"></el-input></el-form-item>
      <el-form-item label="员工姓名"><el-input v-model.trim="pagingQuery.name"></el-input></el-form-item>
       <el-form-item label="性别："><el-select class="w160" v-model="pagingQuery.gender"><el-option v-for="(gender, index) of genders" :key="index" :label="gender.value" :value="gender.id"></el-option></el-select></el-form-item>
      <el-form-item label="工号"><el-input v-model.trim="pagingQuery.companyId"></el-input></el-form-item>
      <el-form-item label="电话"><el-input v-model.trim="pagingQuery.phone"></el-input></el-form-item>
      <el-form-item label="住址"><el-input v-model.trim="pagingQuery.address"></el-input></el-form-item>
      <el-form-item label="邮箱"><el-input v-model.trim="pagingQuery.mail"></el-input></el-form-item>
      <el-form-item label="部门"> <el-select disabled v-model="value"></el-select></el-form-item> 
      <el-form-item label="职务" ><el-input v-model.trim="pagingQuery.position"></el-input></el-form-item>
      <el-form-item label="入职时间：">
        <el-date-picker class="w300" v-model="pagingQuery.enrollTime" type="date" align="right" unlink-panels start-placeholder="创建日期" @change="changeDate1"></el-date-picker>
      </el-form-item>
      <el-form-item label="离职时间">
        <el-date-picker class="w300" v-model="pagingQuery.expiredTime" type="date" align="right" unlink-panels start-placeholder="创建日期" @change="changeDate2"></el-date-picker>
      </el-form-item>
      <el-form-item label="门禁卡号"> <el-input v-model.trim="pagingQuery.gateCardId"></el-input></el-form-item>
      <el-form-item label="IC卡号"
        ><el-input
          v-model.trim="pagingQuery.icCardId"
        ></el-input
      ></el-form-item>
            <el-form-item label="状态">
        <el-select v-model="pagingQuery.isDelete" class="w100">
         <el-option v-for="(isDelete, index) of isDeletes" :key="index" :label="isDelete.value" :value="isDelete.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建日期">
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
          @change="changeDate3">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="有无人脸">
        <el-select v-model="pagingQuery.status" class="w100">
          <el-option></el-option>
        </el-select>
      </el-form-item> -->

      <el-button type="success" @click="onSearch" class="search">
        <i class="el-icon-search"></i><span>查询</span></el-button
      >
      <el-button type="warning" @click="onDeletes">
        <i class="el-icon-delete"></i><span>批量删除</span></el-button
      >
      <el-button type="primary" @click="onExport">
        <svg-icon icon-class="excel" /> <span>导出</span></el-button
      >
      <el-button type="primary"><router-link to="/people-manage/staff-manage/staff-add"><svg-icon icon-class="edit" /> 新增员工</router-link></el-button>
    </el-form>
    <el-table :data="pagingQueryList" border class="people_list" max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading">
      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
      <el-table-column
        width="50"
        type="selection"
        fixed
      ></el-table-column>
      <el-table-column label="序列" width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column >
      <el-table-column align="center" label="ID" width="80">
        <template v-slot="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="员工姓名" width="80">
        <template v-slot="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="已注册人脸" width="140">
        <template>
          <img src="../../../../assets/image/1.png" alt="" width="140" />
        </template>
      </el-table-column>
     <el-table-column align="center" label="性别" width="100">
        <template v-slot="scope">
          {{ scope.row.gender }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="部门" width="100">
        <template v-slot="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="身份证号" width="80">
        <template v-slot="scope">
          {{ scope.row.idNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="工号" width="80">
        <template v-slot="scope">
          {{ scope.row.dfs }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话" width="108">
        <template v-slot="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
         <el-table-column align="center" label="住址" width="108">
        <template v-slot="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱" width="108">
        <template v-slot="scope">
          {{ scope.row.mail }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="职务" width="108">
        <template v-slot="scope">
          {{ scope.row.position }}
        </template>
      </el-table-column>
     <el-table-column align="center" label="门禁卡" width="108">
        <template v-slot="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="IC卡" width="108">
        <template v-slot="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="入职时间" width="108">
        <template v-slot="scope">
          {{ scope.row.entryTime }}
        </template>
      </el-table-column>
            <el-table-column align="center" label="离职时间" width="108">
        <template v-slot="scope">
          {{ scope.row.entryTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="120">
        <template v-slot="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" width="120">
        <template v-slot="scope">
          {{ scope.row.updataTime }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="状态" width="140">
        <template>          
            在职 </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template> fff </template>
      </el-table-column>
     <el-table-column align="center" label="创建人">
        <template> fff </template>
      </el-table-column>
      <el-table-column align="left" label="操作" width="190" fixed="right">
        <template v-slot="scope">
            <el-switch
            disabled
            size="mini"
            active-text="离职"
            inactive-text="在职"
            @change="changeUserStatus(scope.$index, scope.row)"
          ></el-switch>
          <el-button
            class="radius_45"
            type="primary"
            size="mini"
            @click="handleEdit(scope)"
            ><i class="el-icon-edit"></i><span>编辑</span></el-button
          >
          <el-button
            class="radius_45 mt10"
            type="primary"
            size="mini"
            ><i class="el-icon-notebook-2"></i><span>详情</span></el-button
          >
          <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            title="确定要删除该设备？"
            @onConfirm="handleDelete(scope.$index, scope.row)">
            <el-button  class="radius_45 ml0 mt10" size="mini" type="danger" slot="reference"><i class="el-icon-delete"></i><span>删除</span></el-button>
          </el-popconfirm>
         </template
        >
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getStaffList, deleteStaff } from '@/api/people-manage/staffManage'
import { pickerOptions } from '@/utils'
import moment from 'moment'
const genders = [
   { value: '男', id: 'MALE' }, 
   { value: '女', id: 'FEMALE' }
 ]
 const isDeletes = [
   { value: '在职', id: true }, 
   { value: '离职', id: false }
 ]
const faceTypes = [
   { id: 'zj', name: '证件照' }, 
   { id: 'sh', name: '生活照' } 
]
export default {
  name: "",
  data() {
    return {
      table_loading:false,
      value: '华捷艾米',
      genders: genders,
      isDeletes: isDeletes,
      faceTypes: faceTypes,
      pickerOptions: pickerOptions(),
      date: null,
      multipleSelection: [],
      
      pagingQuery: {
        operator: null,
        name: null,
        gender: null,
        phone: null,
        address: null,
        idNum: null,
        mail: null,
        companyId: null,
        position: null,
        icCardId: null,
        gateCardId: null,
        enrollTime: null,
        expiredTime: null,
        createTime: null,
        createTimeTo: null,
        isDelete: null,
        
        current: 1, 
        size: 20,
        total: 0,
      },

      pagingQueryList: [
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
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  methods: {
    getStaffList() {
      let params = this.pagingQuery
      console.log("🚀 ~ file: index.vue ~ line 337 ~ getStaffList ~ pagingQuery", params)
      this.table_loading = true
      getStaffList(this.pagingQuery).then((res) => {
        params.size = res.data.size
        params.current = res.data.current
        params.total = res.data.total
        this.tableData = res.data.records
        this.table_loading = false

        //  转换status为Boolean
        // let satatusArr = []
        // this.tableData.map((x, index) => {
        //   satatusArr.push({
        //     status: x.status == "disabled" ? false : true,
        //   })
        // })
        // this.userStatus = satatusArr
      })
      // this.tableData = this.tableData.reverse()
    },
    onSearch() {
      let params = this.pagingQuery
      params.current = 1
      this.getStaffList()
    },
     handleDelete(x, y) {
      deleteStaff(y.id).then((res) => {
        if (res.code == 0 && res.data) {
          this.$message.success({message: res.msg})
          this.getDeviceList()
        } else {
          this.$message.warning({message: res.msg})
        }
      }).catch(() => {
        
      })
    },
    onDeletes() {
       if (this.multipleSelection.length !== 0) {
        this.$confirm("此操作将永久删除已选员工, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              deleteStaff(this.multipleSelection[i].id).then((res) => {
                if (res.code == 0 && res.data) {
                  if(i + 1 >= this.multipleSelection.length) {
                  this.onSearch()
                  this.$message.success({message: res.msg})
                  } 
                }
              })
            }
          }).catch(() => {
             this.$message.success.info({message: '已取消删除'})
             this.$refs.multipleTable.clearSelection()
          })
      } else {
        this.$message.warning('请在列表中勾选要删除的员工')
      }
    },
    onExport() {

    },
   changeDate(item) {
     let a = this.pagingQuery
         a[item] =  moment(a[item]).format('YYYY-MM-DD')
  },
  changeDate1() {
    this.changeDate('enrollTime')
  },
  changeDate2() {
    this.changeDate('expiredTime')
  },
  changeDate3() {
    let _p = this.pagingQuery
      this.date && this.date.length
        ? ((_p.createTime = moment( this.date[0]).format("YYYY-MM-DD")),
          (_p.createTimeTo = moment( this.date[1]).format("YYYY-MM-DD")))
        :  _p.createTime = _p.createTimeTo = null
    },
    handleSizeChange(val) {
      this.pagingParams.size = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.pagingParams.current = val
      this.getUserList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
  },
  created() {
  },
  mounted() {
    console.log()
  },
};
</script>
