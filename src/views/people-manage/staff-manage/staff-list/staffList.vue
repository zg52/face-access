<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-02-19 19:38:16
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

// 详情
 .demo-table-expand {
    width: 1100px;
    
  }
 
  .demo-table-expand .el-form-item {
  margin-right: 0!important;
    margin-bottom: 0;
    width: 20%;
  }
    .demo-table-expand ::v-deep .el-form-item__label {
      padding-right: 0;
        font-weight: normal;
      .el-form-item__content {
    font-size: 12px!important;
        }
    }
</style>
<template>
  <div class="app-container">
  <el-form :model="pagingQuery" :inline="true">
      <el-form-item label="创建人"><el-input v-model.trim="pagingQuery.operator" clearable></el-input></el-form-item>
      <el-form-item label="员工姓名"><el-input v-model.trim="pagingQuery.name" clearable></el-input></el-form-item>
       <el-form-item label="性别："><el-select class="w160" v-model="pagingQuery.gender"><el-option v-for="(gender, index) of genders" :key="index" :label="gender.value" :value="gender.id"></el-option></el-select></el-form-item>
      <el-form-item label="工号"><el-input v-model.trim="pagingQuery.employee_num" clearable></el-input></el-form-item>
      <el-form-item label="电话"><el-input v-model.trim="pagingQuery.phone" clearable></el-input></el-form-item>
      <el-form-item label="住址"><el-input v-model.trim="pagingQuery.address" clearable></el-input></el-form-item>
      <el-form-item label="邮箱"><el-input v-model.trim="pagingQuery.mail" clearable></el-input></el-form-item>
      <el-form-item label="部门"> <el-select disabled v-model="value" clearable></el-select></el-form-item> 
      <el-form-item label="职务" ><el-input v-model.trim="pagingQuery.position" clearable></el-input></el-form-item>
      <el-form-item label="入职时间：">
        <el-date-picker class="w300" v-model="pagingQuery.enrollTime" type="date" align="right" unlink-panels start-placeholder="创建日期" @change="changeDate1"></el-date-picker>
      </el-form-item>
      <el-form-item label="离职时间">
        <el-date-picker class="w300" v-model="pagingQuery.expiredTime" type="date" align="right" unlink-panels start-placeholder="创建日期" @change="changeDate2"></el-date-picker>
      </el-form-item>
      <el-form-item label="门禁卡号"> <el-input v-model.trim="pagingQuery.gateCardId" clearable></el-input></el-form-item>
      <el-form-item label="IC卡号" ><el-input v-model.trim="pagingQuery.icCardId" clearable></el-input></el-form-item>
      <el-form-item label="状态">
        <el-select v-model="pagingQuery.status" class="w100" @change="changeStatus" clearable>
         <el-option v-for="(state, index) of states" :key="index" :label="state.value" :value="state.id"></el-option>
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
          @change="changeDate3"
          clearable
          >
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="有无人脸">
        <el-select v-model="pagingQuery.state" class="w100">
          <el-option></el-option>
        </el-select>
      </el-form-item> -->

      <el-button type="success" @click="onSearch" class="search"> <i class="el-icon-search"></i><span>查询</span></el-button>
      <el-button type="warning" @click="onDeletes"> <i class="el-icon-delete"></i><span>批量删除</span></el-button>
      <el-button type="primary" @click="onExport"> <svg-icon icon-class="excel" /> <span>导出</span></el-button>
      <el-button type="primary"><router-link to="/people-manage/staff-manage/staff-add"><svg-icon icon-class="edit" /> 新增员工</router-link></el-button>
    </el-form>
    
    <el-table :data="tableData" border class="people_list" max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading">
      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
      <el-table-column width="50" type="selection" fixed ></el-table-column>
      <el-table-column label="序列" width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>

<!-- 详情 -->
       <el-table-column type="expand" label="详情" :width="60">
           <template slot-scope="props">
             <el-form label-position="left" inline class="demo-table-expand">
               <!-- <el-form-item label="创建人："><span>{{ props.row.name }}</span></el-form-item> -->
               <el-form-item><div><img :src="`${ getImgUrl + props.row.imageId }`" alt="" width="140"></div></el-form-item>
               <el-form-item label="姓名："><span>{{ props.row.name }}</span></el-form-item>
                <el-form-item label="性别："><span>{{ props.row.gender === 'MALE' ? '男' : '女' }} </span></el-form-item>
               <el-form-item label="头像类型："><span>{{ props.row.img_type == 1 ? '生活照' : '证件照' }} </span></span></el-form-item>
                 <el-form-item label="部门："> <span>华捷艾米 </span></el-form-item>
                 <el-form-item label="身份证号："><span>{{ props.row.idNum }} </span></el-form-item>
                 <el-form-item label="工号："><span>{{ props.row.employee_num }} </span></el-form-item>
                 <el-form-item label="电话："><span>{{ props.row.phone }} </span></el-form-item>
                 <el-form-item label="住址："><span>{{ props.row.address }} </span></el-form-item>
                 <el-form-item label="邮箱："><span>{{ props.row.mail }} </span></el-form-item>
                 <el-form-item label="职务："><span>{{ props.row.position }} </span></el-form-item>
                 <el-form-item label="门禁卡："><span>{{ props.row.gateCardId }} </span></el-form-item>
                 <el-form-item label="IC卡："><span>{{ props.row.icCardId }} </span></el-form-item>
                 <el-form-item label="入职时间："><span>{{ props.row.enrollTime }} </span></el-form-item>
                 <el-form-item label="离职时间："><span>{{ props.row.expiredTime }} </span></el-form-item>
                 <el-form-item label="创建时间："><span>{{ props.row.createTime | splice_t }} </span></el-form-item>
                 <el-form-item label="修改时间："><span>{{ props.row.lastUpdateTime | splice_t }} </span></el-form-item>
                  <el-form-item label="状态："><span>{{ props.row.status == 0 ? '在职' : '离职' }}</span> </el-form-item>
                 <el-form-item label="备注："><span></span></el-form-item>
                <el-form-item label="创建人："><span>{{ props.row.operator }}</span></el-form-item>
           </el-form>
           </template>
     </el-table-column>

      
      <el-table-column align="center" label="员工姓名" width="80"> <template v-slot="scope"> {{ scope.row.name }} </template></el-table-column>
      <el-table-column align="center" label="已注册人脸" width="140">
        <template v-slot="scope"><img :src="`${ getImgUrl + scope.row.imageId}`" alt="" width="140" /></template>
      </el-table-column>
     <el-table-column align="center" label="性别" width="50"> <template v-slot="scope"> {{ scope.row.gender === 'MALE' ? '男' : '女' }} </template></el-table-column>
      <el-table-column align="center" label="部门" width="100"> <template> 华捷艾米 </template></el-table-column>
      <el-table-column align="center" label="工号" width="180"> <template v-slot="scope"> {{ scope.row.employee_num }} </template></el-table-column>
      <el-table-column align="center" label="电话" width="108"> <template v-slot="scope"> {{ scope.row.phone }} </template></el-table-column>
      <el-table-column align="center" label="邮箱" width="180"> <template v-slot="scope"> {{ scope.row.mail }} </template></el-table-column>
      <el-table-column align="center" label="职务" width="108"> <template v-slot="scope"> {{ scope.row.position }} </template></el-table-column>
      <el-table-column align="center" label="门禁卡" width="230"> <template v-slot="scope"> {{ scope.row.gateCardId }} </template></el-table-column>
      <el-table-column align="center" label="IC卡" width="230"> <template v-slot="scope"> {{ scope.row.icCardId }} </template></el-table-column>
       <el-table-column align="center" label="状态" width="60"><template v-slot="scope">{{ scope.row.status == 0 ? '在职' : '离职' }}</template> </el-table-column>
     
      <el-table-column align="left" label="操作" width="190" fixed="right" v-if="pagingQuery.isDelete == 1 ? false : true">
        <template v-slot="scope">
          <el-switch class="mll5" size="mini" active-text="在职" inactive-text="离职" v-model="status[scope.$index].status" @change="changeStaffStatus(scope.$index, scope.row)"></el-switch>
          <el-button class="radius_45 mr10" type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)" ><i class="el-icon-edit"></i><span>编辑</span></el-button>
          <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            title="确定要删除员工吗？"
            @onConfirm="handleDelete(scope.$index, scope.row)">
            <el-button  class="radius_45 ml0 mt10" size="mini" type="danger" slot="reference"><i class="el-icon-delete"></i><span>删除</span></el-button>
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
           title="修改员工信息"
           :visible.sync="dialogVisible1"
           width="80%"
          >
            <StaffFromHandle :btn_el="btn_el" :addStaffForm="addStaffForm" @cacelEdit="cacelEdit" />
           <!-- <span slot="footer" class="dialog-footer">
             <el-button @click="dialogVisible1 = false">取 消</el-button>
             <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
           </span> -->
      </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getStaffList, deleteStaff, StaffState } from '@/api/people-manage/staffManage'
import { imgUrl } from '@/api/public'
import { pickerOptions } from '@/utils'
import { getGender, getFaceType} from '../components/index'
import StaffFromHandle from '../components/StaffFromHandle'
import moment from 'moment'
 const faceTypes = [
   { id: 'zj', name: '证件照' }, 
   { id: 'sh', name: '生活照' }
],
 states = [
   { value: '在职', id: 0 }, 
   { value: '离职', id: 1 },
   { value: '已删除', id: 'isDelete' }
 ]
export default {
  name: 'staff-list',
   components: { StaffFromHandle },
  data() {
    return {
      table_loading:false,
      dialogVisible1: false,
      value: '华捷艾米',
      genders: getGender(),
      status: [],
      states: states,
      faceTypes: faceTypes,
      pickerOptions: pickerOptions(),
      date: null,
      multipleSelection: [],
      getImgUrl: imgUrl(),
      
      pagingQuery: {
        operator: null,
        name: null,
        gender: null,
        phone: null,
        address: null,
        idNum: null,
        mail: null,
        // companyId: null,
        employee_num: null,
        position: null,
        icCardId: null,
        gateCardId: null,
        enrollTime: null,
        expiredTime: null,
        createTimeFrom: '2020-12-29', //初始查询默认参数，必填
        createTimeTo: '6060-12-29', //初始查询默认参数，必填
        status: null,
        isDelete: null, /// 0为正常1为已删除
        
        current: 1, 
        size: 20,
        total: null,
      },
      tableData: [],

// 编辑参数
      addStaffForm: {
           id: null,
           operator: this.$store.getters.username,
           name: 'null',
           gender: '1',
           phone: '15652970356',
           address: 'w',
           idNum: '622826199811192711',
           mail: '2@163.com',
           employee_num: '32',
           companyId: '1',
           position: 'fwe',
           icCardId: '32',
           gateCardId: '32',
           enrollTime: '2021-12-20',
           img_type: '1',
           files: null
         },
         btn_el: ['edit']
    }
  },
  filters: {
    splice_t(value) {
    return value.replace('T', ' ')
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  methods: {
    changeStatus() {
      let p = this.pagingQuery
          p['isDelete'] = p['status'] === 'isDelete' ? 1 : null
    },
    getStaffList() {
      let [params, filterData,isDeleteNum] = [this.pagingQuery, [], []]
      this.table_loading = true
      getStaffList(this.pagingQuery).then((res) => {
        params.size = res.data.size
        params.current = res.data.current
         res.data.records.map((item, index) => {
           if(item.isDelete != 1) {
              filterData.push(item)
              this.tableData = filterData.reverse()
           } else {
             isDeleteNum.push(item.isDelete)
           }
         })
        params.total = res.data.total
        this.table_loading = false
      
//  转换state为Boolean
        let satatusArr = []
        this.tableData.map((x, index) => {
          satatusArr.push({
            status: x.status == 1 ? false : true
          })
        })
        this.status = satatusArr
      })
    },
    onSearch() {
      let params = this.pagingQuery
      params.current = 1
      this.getStaffList()
    },
    handleEdit(x, y) {
      this.dialogVisible1 = true
      this.addStaffForm = y
    },
     handleDelete(x, y) {
      deleteStaff(y.id).then((res) => {
        if (res.code == 0 && res.data === null) {
          this.$message.success({message: res.msg})
          this.getStaffList()
        } else {
          this.$message.warning({message: res.msg})
        }
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
                if (res.code == 0) {
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
    
// 切换员工状态(在职/离职)
    changeStaffStatus(x ,y) {
      let _this = this
      function state() {
        return y.status == 0 ? 1 : 0
      }
      StaffState(
          y.id,
          {
            status:state(),
            id: y.id
          }
      ).then((res) => {
        if (res.code == 0 && res.data === null) {
          this.$message.success({message: res.msg})
          this.getStaffList()
        } else {
          this.$message.warning({message: res.msg})
        }
      })
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
        ? ((_p.createTimeFrom = moment( this.date[0]).format("YYYY-MM-DD")),
          (_p.createTimeTo = moment( this.date[1]).format("YYYY-MM-DD")))
        :  _p.createTimeFrom = _p.createTimeTo = null
    },
    cacelEdit() {
      this.dialogVisible1 = false
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
  },
  created() {
    this.onSearch()
  },
  mounted() {
  },
};
</script>
