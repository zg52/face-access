<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-01-25 19:12:19
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
   .demo-table-expand {
 
    width: 1100px;
    
  }
  
  .demo-table-expand label {
    width: 90px;
    color: #ccc;
  }
  .demo-table-expand .el-form-item {
  margin-right: 0!important;
    margin-bottom: 0;
    width: 18%;
    border-bottom: 1px #eee dashed;
  }
    .demo-table-expand ::v-deep .el-form-item__label {
        font-weight: normal;
      .el-form-item__content {
    font-size: 12px!important;
            
        }
    }

.device_num {
     width: 100%;
   display: flex;
   justify-content: space-between;
   margin-bottom:25px;
& > div {
    width: 300px;
  height: 82px;
  border-radius: 20px;
   border:1.5px #8a16ff solid;
   color: #949494;
}
.device_num2 {
 border-color: #13ce66;
 
}
.device_num4 {
  border-color:#ff4949
}
.device_num3 {border-color: #ffba00;}
.lis {
& > div:first-child {  padding:22px; }
& > div + div {padding-top: 10px;padding-right: 22px;}
  display: flex;
  justify-content: space-between;
  .num {
    text-align: center;
    line-height: 20px;
  }
}
}
.device {
  fill: #8a16ff;
  font-size: 45px;
}

.pt22{padding-top: 15px!important;}
</style>
<template>
  <div class="app-container">
    <div class="device_num">
      <div class="lis">
        <div class="num"><span>设备总数</span><div>20</div></div>
        <div class="pt22"> <svg-icon icon-class="device" class="device" /></div>
        </div>
      <div class="lis device_num2">
        <div class="num"><span>在线设备</span><div>20</div></div>
        <div><el-progress type="circle" :percentage="90" color="#13ce66" stroke-:width="2" :width="60"></el-progress></div>
        </div>
      <div class="lis device_num3">
        <div class="num"><span>离线设备</span><div>20</div></div>
       <div><el-progress type="circle" :percentage="20" color="#ffba00" stroke-:width="2" :width="60"></el-progress></div>
        </div>
         <div class="lis device_num4">
        <div class="num"><span>故障设备</span><div>20</div></div>
        <div><el-progress type="circle" :percentage="90" color="#ff4949" stroke-:width="2" :width="60"></el-progress></div>
        </div>
    </div>
    
    <div class="lis_tit"><i></i> <span>设备详情列表</span></div>
    <el-form :model="roles" :inline="true">
      <el-form-item label="创建人"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入姓名搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="设备名称"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入姓名搜索"
        ></el-input
      ></el-form-item>
         <el-form-item label="设备类型"
        ><el-select><el-option>五寸屏
          </el-option><el-option>八寸屏桌面机
          </el-option></el-select></el-form-item>
       <el-form-item label="设备型号"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入姓名搜索"
        ></el-input
      ></el-form-item>
 
      <el-form-item label="设备厂商">  <el-select   v-model="value" placeholder="请选择">
          <el-option>
          </el-option> </el-select></el-form-item>
      <el-form-item label="设备SN"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入工号搜索"
        ></el-input
      ></el-form-item>
    <el-form-item label="设备版本"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入工号搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="已下发人数"
        ><el-input
        class="w120"
          v-model.trim="roles.roleName"
          placeholder="输入手机号搜索"
        ></el-input
      ></el-form-item>
            <el-form-item label="设备位置"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入电话搜索"
        ></el-input
      ></el-form-item>
      <el-form-item label="方向">  <el-select class="w100"  v-model="value" placeholder="请选择">
          <el-option>进</el-option><el-option>出</el-option> </el-select></el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="roles.status" class="w100">
          <el-option>正常</el-option>
            <el-option >失联</el-option>
             <el-option >关机</el-option>
        </el-select>
      </el-form-item>
  <el-form-item label="修改时间">
        <el-date-picker
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-button type="success" @click="onSearch" class="search"><i class="el-icon-search"></i><span>查询</span></el-button>
      <el-button type="warning" @click="onDelete"><i class="el-icon-delete"></i><span>批量删除</span></el-button>
      <el-button type="primary" @click="onExport"><svg-icon icon-class="excel"/><span>导出</span></el-button>
      <el-button type="primary" ><svg-icon icon-class="edit"/><span>新增设备</span></el-button><el-button type="primary"><svg-icon icon-class="guide"/><span>下发人员</span></el-button>
    </el-form>  
    
     <el-table :data="rolesList" class="people_list" max-height="650">
      <el-table-column :width="50" type="selection" fixed></el-table-column>
      <el-table-column label="序列" :width="60" align="center"> <template>1</template></el-table-column>
      
       <el-table-column type="expand" label="详情" :width="60">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="创建人："><span>{{ props.row.name }}</span></el-form-item>
          <el-form-item label="设备名称："><span>{{ props.row.name }}</span></el-form-item>
          <el-form-item label="设备类型："><span>{{ props.row.name}}</span></el-form-item>
          <el-form-item label="设备型号："><span>{{ props.row.name }}</span></el-form-item>
          <el-form-item label="设备厂商："><span>{{ props.row.name }}</span></el-form-item>
          <el-form-item label="设备SN："><span>{{ props.row.name }}</span></el-form-item>
          <el-form-item label="设备版本："><span>{{ props.row.name }}</span></el-form-item>
          <el-form-item label="设备位置："><span>{{ props.row.name }}</span></el-form-item>
          <el-form-item label="方向："><span>{{ props.row.name }}</span></el-form-item>
          <el-form-item label="创建时间："><span>{{ props.row.name }}</span></el-form-item>
          <el-form-item label="状态："><span>{{ props.row.name }}</span></el-form-item>
 
        </el-form>
      </template>
    </el-table-column>

      <el-table-column align="center" label="ID" :width="80">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
 
     <el-table-column align="center" label="设备名称" :width="80">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
            <el-table-column align="center" label="设备类型" :width="80">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
                  <el-table-column align="center" label="设备型号" :width="80">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
                  <el-table-column align="center" label="设备厂商" :width="80">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
                  <el-table-column align="center" label="设备SN" :width="80">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
                  <el-table-column align="center" label="设备版本" :width="80">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
                  <el-table-column align="center" label="已下发人数" :width="115" sortable>
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
                  <el-table-column align="center" label="设备位置" :width="80">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      
  
      <el-table-column align="center" label="方向" :width="100">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
 
      <el-table-column align="center" label="创建时间" :width="120" sortable>
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" :width="120" sortable>
        <template slot-scope="scope">
          {{ scope.row.updataTime }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="状态" :width="140">
        <template> <i class="dot_red"></i>          
            失联 </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template> fff </template>
      </el-table-column>
     <el-table-column align="center" label="创建人">
        <template> fff </template>
      </el-table-column>
      <el-table-column align="center" label="操作" :width="300" fixed="right">
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
            type="danger"
            size="mini"
            ><i class="el-icon-delete"></i><span>删除</span></el-button>
            <el-dropdown class="ml10">
             <el-button type="primary" class="radius_45" size="mini">
               更多操作<i class="el-icon-arrow-down el-icon--right"></i>
             </el-button>
             <el-dropdown-menu slot="dropdown">
               <el-dropdown-item>开门</el-dropdown-item>
               <el-dropdown-item>关门</el-dropdown-item>
               <el-dropdown-item>常开</el-dropdown-item>
               <el-dropdown-item>长关</el-dropdown-item>
               <el-dropdown-item>重启</el-dropdown-item>
                <el-dropdown-item>关机</el-dropdown-item>
             </el-dropdown-menu>
           </el-dropdown>
            </template
        >
      </el-table-column>
    </el-table>  

  <el-dialog title="新增设备" :visible.sync="addDeviceVisible" width="1000px">
     <div v-loading="addSave_loading" element-loading-text="拼命保存中" element-loading-spinner="el-icon-loading">
      <el-form :model="addDeviceData" :inline="true" :rules="addDeviceDataRule" ref="addDeviceData">
        <el-form-item label="创建人："><el-input v-model.trim="addDeviceData.username" disabled></el-input></el-form-item>
        <el-form-item label="设备名称：" prop="name"><el-input v-model.trim="addDeviceData.name" placeholder="输入设备名称"></el-input></el-form-item>
        <el-form-item label="设备型号：" prop="model"><el-input v-model.trim="addDeviceData.model" placeholder="输入设备型号"></el-input></el-form-item>
        <el-form-item label="设备厂商：" prop="manufacturer"><el-input v-model.trim="addDeviceData.manufacturer" placeholder="输入设备厂商"></el-input></el-form-item>
        <el-form-item label="设备SN：" prop="sn" ><el-input v-model.trim="addDeviceData.sn" placeholder="输入设备SN"></el-input></el-form-item>
        <el-form-item label="设备位置：" prop="location"><el-input v-model.trim="addDeviceData.location" placeholder="输入设备位"></el-input></el-form-item>
        <el-form-item label="描述：" prop="description"><el-input class="w400" v-model.trim="addDeviceData.description" placeholder="输入设备位"></el-input></el-form-item>
        <!-- <el-form-item label="设备类型："><el-select><el-option>五寸屏 </el-option><el-option>八寸屏桌面机</el-option></el-select></el-form-item> -->
        <!-- <el-form-item label="设备版本：" ><el-input v-model.trim="roles.roleName" placeholder="输入工号搜索" ></el-input></el-form-item> -->
        <!-- <el-form-item label="方向："><el-select class="w100" v-model="value" placeholder="请选择"><el-option>进</el-option><el-option>出</el-option></el-select></el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer t_right">
      <el-button type="primary"><i class="el-icon-folder-add" /><span>批量导入</span></el-button>
      <el-button @click="resetAddDeviceData('addDeviceData')">重 置</el-button>
      <el-button @click="faceFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveAddDeviceData('addDeviceData')" :disabled="addSave_loading"><i :class="{'el-icon-loading':addSave_loading}"></i> &nbsp;保 存</el-button>
    </div>
     </div>
  </el-dialog> 
  <!-- <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="pagingParams['current']"
         :page-sizes="[10, 20, 40, 60, 80, 100, 200, 300, 400]"
         :page-size="pagingParams['size']"
         layout="total, sizes, prev, pager, next, jumper"
         :total="pagingParams['total']">
    </el-pagination> -->
  </div>
</template>
<script>
import { addDevice } from '@/api/device-manage'
export default {
  name: "",
  data() {
    const notNull = [{required: true, message:'不能为空', trigger: "blur" }]
    return {
      addSave_loading: false,
      addDeviceVisible:true,
      value: 1,
      pickerOptions: [],

// 新增设备
      addDeviceData: {
           username: '艾米',
           name: '门禁主机1',
           username: '艾米',
           model: 'fewfa32',
           manufacturer: '艾米',
           sn: '门禁主机1',
           location: '门禁主机1',
           description: '门禁主机1'
         },
         
// 设备提交验证
    addDeviceDataRule: {
       name: notNull,
       model: notNull,
       manufacturer: notNull,
       sn: notNull,
       location: notNull,
       description: notNull,
    },
      roles: [
        {
          roleName: "",
        },
      ],
      addUserForm: [
        
      ],
      rolesList: [
        {
          name: "sssss",
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
          name: "fewfewf",
          description: "超管",
          createTime: "2020 01.12",
          updataTime: "2020 02.13",
          switch: 1,
        },
         {
          name: "fewfewfef",
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
    }
  },
  methods: {
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    saveAddDeviceData(el) {
       let _this = this
       this.$refs[el].validate((valid) => {
          if (valid) {
            addDevice().then((res) => {
             if(res.code === 0 && res.data) {
               this.$message.success(res.msg)
             }
            })
          }})
    },
    onSearch(){

    },
    onDelete() {

    },
    onExport() {

    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
    },
    handleSelectionChange(val) {
    },

// 重置表单
    resetAddDeviceData(e) { //重置新增
    this.$refs[e].resetFields()
   },
  },
  created() {
  },
  mounted() {},
};
</script>
