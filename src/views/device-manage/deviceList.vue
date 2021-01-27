<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-01-27 19:14:00
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
 
  .demo-table-expand .el-form-item {
  margin-right: 0!important;
    margin-bottom: 0;
    width: 20%;
    border-bottom: 1px #eee dashed;
  }
    .demo-table-expand ::v-deep .el-form-item__label {
      padding-right: 0;
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
.pt15{padding-top: 15px!important;}
</style>
<template>
  <div class="app-container">
    <div class="device_num">
      <div class="lis">
        <div class="num"><span>设备总数</span><div>20</div></div>
        <div class="p15 pt15"> <svg-icon icon-class="device" class="device" /></div>
        </div>
      <div class="lis device_num2">
        <div class="num"><span>在线设备</span><div>20</div></div>
        <div><el-progress type="circle" :percentage="90" color="#13ce66" :stroke-width="2" :width="60"></el-progress></div>
        </div>
      <div class="lis device_num3">
        <div class="num"><span>离线设备</span><div>20</div></div>
       <div><el-progress type="circle" :percentage="20" color="#ffba00" :stroke-width="2" :width="60"></el-progress></div>
        </div>
         <div class="lis device_num4">
        <div class="num"><span>故障设备</span><div>20</div></div>
        <div><el-progress type="circle" :percentage="90" color="#ff4949" :stroke-width="2" :width="60"></el-progress></div>
        </div>
    </div>
    
    <div class="lis_tit"><i></i> <span>设备详情列表</span></div>
    <el-form :model="pagingParams" :inline="true">
      <!-- <el-form-item label="创建人"><el-input v-model.trim="roles.roleName" placeholder="输入姓名搜索"></el-input></el-form-item> -->
      <el-form-item label="设备名称"><el-input v-model.trim="pagingParams.name"></el-input></el-form-item>
      <el-form-item label="设备类型"><el-select v-model="pagingParams.type" @change="deviceTypeChange"><el-option v-for="(type, index) of pagingParams.typeValue" :key="index" :value="type.value"></el-option></el-select></el-form-item>
      <el-form-item label="设备型号"><el-input v-model.trim="pagingParams.model"></el-input ></el-form-item>
      <el-form-item label="设备厂商"><el-input v-model="pagingParams.manufacturer"></el-input></el-form-item>
      <el-form-item label="设备SN"><el-input v-model.trim="pagingParams.sn"></el-input></el-form-item>
      <el-form-item label="设备位置"><el-input v-model.trim="pagingParams.location"></el-input></el-form-item>
      <!-- <el-form-item label="已下发人数" ><el-input class="w120" v-model.trim="pagingParams.num"></el-input></el-form-item> -->
      <el-form-item label="设备在线状态"><el-select class="w100" v-model="pagingParams.isOnline" clearable><el-option v-for="(isOnline, index) of pagingParams.online" :key="index" :value="isOnline.value"></el-option></el-select></el-form-item>
       <!-- <el-form-item label="方向">  <el-select class="w100"  v-model="value" placeholder="请选择"> <el-option>进</el-option><el-option>出</el-option> </el-select></el-form-item> -->
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="pagingParams.date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          :default-time="['00:00:00', '23:59:59']"
          @change="changeDate">
        </el-date-picker>
      </el-form-item>
     <el-form-item label="设备状态"><el-select class="w100" v-model="pagingParams.deviceStatus" clearable><el-option v-for="(deviceStatus, index) of pagingParams.statusValue" :key="index" :value="deviceStatus.value"></el-option></el-select></el-form-item>
     
      <el-button type="success" @click="onSearch" class="search"><i class="el-icon-search"></i><span>查询</span></el-button>
      <el-button type="warning" @click="onDeletes"><i class="el-icon-delete"></i><span>批量删除</span></el-button>
      <el-button type="primary" @click="onExport"><svg-icon icon-class="excel"/> <span>导出</span></el-button>
      <el-button type="primary" @click="addDeviceVisible = true"><svg-icon icon-class="edit"/> <span>新增设备</span></el-button>
      <el-button type="primary"><svg-icon icon-class="guide"/> <span>下发人员</span></el-button>
    </el-form>
    
    <el-table :data="deviceList" class="device_list" max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading" ref="multipleTable">
      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
      <el-table-column :width="50" type="selection" fixed></el-table-column>
      <el-table-column label="序列" :width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingParams.size * (pagingParams.current - 1)) + 1 }}</template></el-table-column>

<!-- 详情 -->
       <el-table-column type="expand" label="详情" :width="60">
           <template slot-scope="props">
             <el-form label-position="left" inline class="demo-table-expand">
               <!-- <el-form-item label="创建人："><span>{{ props.row.name }}</span></el-form-item> -->
               <el-form-item label="设备ID："><span>{{ props.row.id }}</span></el-form-item>
               <el-form-item label="设备名称："><span>{{ props.row.name }}</span></el-form-item>
               <el-form-item label="设备类型："><span>{{ props.row.type}}</span></el-form-item>
               <el-form-item label="设备型号："><span>{{ props.row.model }}</span></el-form-item>
               <el-form-item label="设备厂商："><span>{{ props.row.manufacturer }}</span></el-form-item>
               <el-form-item label="设备SN："><span>{{ props.row.sn }}</span></el-form-item>
               <el-form-item label="设备版本："><span>{{ props.row.firmware_version }}</span></el-form-item>
               <el-form-item label="设备位置："><span>{{ props.row.location }}</span></el-form-item>
               <!-- <el-form-item label="方向："><span>{{ props.row.name }}</span></el-form-item> -->
               <el-form-item label="在线状态："><span>{{ props.row.online }}</span></el-form-item>
               <el-form-item label="设备状态："><span>{{ props.row.state }}</span></el-form-item>
               <el-form-item label="设备信息："><span>{{ props.row.information }}</span></el-form-item>
               <el-form-item label="创建时间："><span>{{ props.row.createTime }}</span></el-form-item>
               <el-form-item label="修改时间："><span>{{ props.row.lastUpdateTime }}</span></el-form-item>
           </el-form>
           </template>
     </el-table-column>
    
      <el-table-column align="center" label="ID" :width="80"><template v-slot="scope">{{ scope.row.id }}</template></el-table-column>
      <el-table-column align="center" label="设备名称" :width="80"><template v-slot="scope">{{ scope.row.name }}</template></el-table-column>
      <el-table-column align="center" label="设备类型" :width="80"><template v-slot="scope">{{ scope.row.type }}</template></el-table-column>
      <el-table-column align="center" label="设备型号" :width="80"><template v-slot="scope">{{ scope.row.model }}</template></el-table-column>
      <el-table-column align="center" label="设备厂商" :width="80"><template v-slot="scope">{{ scope.row.manufacturer }}</template></el-table-column>
      <el-table-column align="center" label="设备SN" :width="80"><template v-slot="scope">{{ scope.row.sn }}</template></el-table-column>
      <el-table-column align="center" label="设备版本" :width="80"><template v-slot="scope">{{ scope.row.firmware_version }}</template></el-table-column>
      <el-table-column align="center" label="设备位置" :width="80"><template v-slot="scope"> {{ scope.row. location }} </template></el-table-column>
      <!-- <el-table-column align="center" label="已下发人数" :width="115" sortable><template v-slot="scope"> {{ scope.row.name }} </template></el-table-column> -->
      <!-- <el-table-column align="center" label="方向" :width="100"> <template v-slot="scope"> {{ scope.row.description }} </template> </el-table-column> -->
      <el-table-column align="center" label="在线状态" :width="140"><template v-slot="scope"><i class="dot_red"></i> {{ scope.row.online }} </template> </el-table-column>
      <el-table-column align="center" label="设备状态" :width="140"><template v-slot="scope">{{ scope.row.state }} </template> </el-table-column>
      <el-table-column align="center" label="设备信息" :width="140"><template v-slot="scope">{{ scope.row.information }} </template> </el-table-column>
      <el-table-column align="center" label="创建时间" :width="150" sortable><template v-slot="scope">{{ scope.row.createTime }}</template> </el-table-column>
      <el-table-column align="center" label="修改时间" :width="150" sortable><template v-slot="scope">{{ scope.row.lastUpdateTime }}</template> </el-table-column>

      <el-table-column align="center" label="操作" :width="300" fixed="right">
        <template v-slot="scope">
          <el-button class="radius_45" type="primary" size="mini" @click="handleEdit(scope)" ><i class="el-icon-edit"></i><span>编辑</span></el-button >
          <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            title="确定要删除该设备？"
            @onConfirm="handleDelete(scope.$index, scope.row)">
            <el-button  class="radius_45 ml10" size="mini" type="danger" slot="reference"><i class="el-icon-delete"></i><span>删除</span></el-button>
          </el-popconfirm>
            <el-dropdown class="ml10">
               <el-button type="primary" class="radius_45" size="mini"> 更多操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
               <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item>开门</el-dropdown-item>
                 <el-dropdown-item>关门</el-dropdown-item>
                 <el-dropdown-item>常开</el-dropdown-item>
                 <el-dropdown-item>长关</el-dropdown-item>
                 <el-dropdown-item>重启</el-dropdown-item>
                 <el-dropdown-item>关机</el-dropdown-item>
               </el-dropdown-menu>
              </el-dropdown>
            </template>
      </el-table-column>
    </el-table>   

  <el-dialog title="新增设备" :visible.sync="addDeviceVisible" width="1000px">
     <div v-loading="addSave_loading" element-loading-text="拼命保存中" element-loading-spinner="el-icon-loading">
      <el-form :model="addDeviceData" :inline="true" :rules="addDeviceDataRule" ref="addDeviceData">
        <!-- <el-form-item label="创建人："><el-input v-model.trim="addDeviceData.username" disabled></el-input></el-form-item> -->
        <el-form-item label="设备名称：" prop="name"><el-input v-model.trim="addDeviceData.name" placeholder="输入设备名称"></el-input></el-form-item>
        <el-form-item label="设备类型：">
          <el-select v-model="addDeviceData.type" @change="deviceTypeChange"><el-option v-for="(type, index) of addDeviceData.typeValue" :key="index" :value="type.value"></el-option></el-select>
        </el-form-item>
        <el-form-item label="设备型号：" prop="model"><el-input v-model.trim="addDeviceData.model" placeholder="输入设备型号"></el-input></el-form-item>
        <el-form-item label="设备厂商：" prop="manufacturer"><el-input v-model.trim="addDeviceData.manufacturer" placeholder="输入设备厂商"></el-input></el-form-item>
        <el-form-item label="设备SN：" prop="sn"><el-input v-model.trim="addDeviceData.sn" placeholder="输入设备SN"></el-input></el-form-item>
        <el-form-item label="设备位置：" prop="location"><el-input v-model.trim="addDeviceData.location" placeholder="输入设备位"></el-input></el-form-item>
        <el-form-item label="描述：" prop="description"><el-input class="w400" v-model.trim="addDeviceData.description" placeholder="输入设备位"></el-input></el-form-item>
        <!-- <el-form-item label="设备版本：" ><el-input v-model.trim="roles.roleName" placeholder="输入工号搜索" ></el-input></el-form-item> -->
        <!-- <el-form-item label="方向："><el-select class="w100" v-model="value" placeholder="请选择"><el-option>进</el-option><el-option>出</el-option></el-select></el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer t_right">
      <el-button type="primary"><i class="el-icon-folder-add" /><span>批量导入</span></el-button>
      <el-button @click="resetAddDeviceData('addDeviceData')">重 置</el-button>
      <el-button @click="addDeviceVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveAddDeviceData('addDeviceData')" :disabled="addSave_loading"><i :class="{'el-icon-loading':addSave_loading}"></i> &nbsp;保 存</el-button>
    </div>
     </div>
  </el-dialog>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagingParams['current']"
    :page-sizes="[10, 20, 40, 60, 80, 100, 200, 300, 400]"
    :page-size="pagingParams['size']"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pagingParams['total']">
  </el-pagination>
  </div>
</template>
<script>
import { 
  addDevice,  //新增设备
  searchDevice,  //查询设备列表
  deleteDevice  //查询设备列表
 } from '@/api/device-manage'
import { pickerOptions } from '@/utils'
import moment from "moment"
export default {
  name: "deviceList",
  data() {
    const notNull = [{required: true, message:'不能为空', trigger: "blur" }]
    let deviceType = [
         { value: '门禁' },
         { value: '闸机' }
       ],
      deviceISOnline = [
        { value: '在线' },
        { value: '离线' }
       ],
      deviceStatus = [
        { value: '正常' },
        { value: '已禁用' }
      ]
    return {
      addSave_loading: false,
      addDeviceVisible: false,
      table_loading: false,
      value: 1,
      pickerOptions: pickerOptions(),
      multipleSelection: [], //多选删除

// 新增设备
      addDeviceData: {
       username: '艾米',
       name: '门禁主机1',
       type: deviceType[0].value,
       model: 'fewfa32',
       manufacturer: '艾米',
       sn: '门禁主机1',
       location: '门禁主机1',
       description: '门禁主机1',
       typeValue: deviceType
       },

// 设备查询/分页参数
     pagingParams: {
      //  username: '艾米',
       name: '门禁主机1',
       type: deviceType[0].value,
       typeValue: deviceType,
       isOnline: deviceISOnline[0].value,
       online: deviceISOnline,
       deviceStatus: deviceStatus[0].value,
       statusValue: deviceStatus,
       model: 'fewfa32',
       isOnline:'在线',
       manufacturer: '艾米',
       sn: '门禁主机1',
       location: '门禁主机1',
       description: '门禁主机1',
       date: '',
       createTimeFrom: '',
       createTimeTo: '',
       
       current: 1, 
       size: 20,
       total: 0,
      },

// 设备列表
      deviceList: [
        {
          "id": 1,
        "name": "闸机01",
        "description": null,
        "manufacturer": "华捷艾米",
        "model": "初代",
        "sn": "A0001",
        "location": "东门",
        "unique_device_identifier": "rworuowjqwueoqweqw",
        "secret": "ow9243ssd99x@@12",
        "online": true,
        "state": "normal",
        "status": "normal",
        "information": null,
        "firmware_version": null,
        "lastHeartbeatTime": "2021-01-20 16:31:25",
        "createTime": "2021-01-20 15:30:36",
        "lastUpdateTime": null
        }
      ],

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
            addDevice(this.addDeviceData).then((res) => {
             if(res.code === 0 && res.data) {
               this.$message.success(res.msg)
             }
            })
          }})
    },
    
// 查设备列表
    onSearch(){
      this.pagingParams.current = 1
      this.getDeviceList()
    },
    getDeviceList() {
      let _this = this
      this.table_loading = true
      searchDevice(this.pagingParams).then((res) => {
         if(res.code === 0 && res.data) {
               _this.table_loading = false
               this.$message.success(res.msg)
            }
      })
    },
    changeDate() {
      let date = this.pagingParams.date,
          _p = this.pagingParams
      date && date.length
        ? ((_p.createTimeFrom = moment(date[0]).format("YYYY-MM-DD")),
          (_p.createTimeTo = moment(date[1]).format("YYYY-MM-DD")))
        :  _p.createTimeFrom = _p.createTimeTo = null
    },

// 单删设备
    handleDelete(x, y) {
      deleteDevice(y.id).then((res) => {
        if (res.code == 0 && res.data) {
          this.$message.success({message: res.msg})
          this.getDeviceList()
        } else {
          this.$message.warning({message: res.msg})
        }
      })
    },

  // 批量删设备
    onDeletes() {
       if (this.multipleSelection.length !== 0) {
        this.$confirm("此操作将永久删除已选设备, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              deleteDevice(y.id).then((res) => {
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
        this.$message({
          message: "请在列表中勾选要删除的设备",
          type: "warning"
        })
      }
    },
    deviceTypeChange() {
      let deviceType = this.addDeviceData.type,
          typeValue = this.addDeviceData.typeValue
          deviceType = deviceType == typeValue[0] ? typeValue[0] : typeValue[1]
    },
    onExport() {

    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleSizeChange(val) {
      this.pagingParams.size = val
      this.getDeviceList()
    },
    handleCurrentChange(val) {
      this.pagingParams.size = val
      this.getDeviceList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

// 重置表单
    resetAddDeviceData(e) { //重置新增
    this.$refs[e].resetFields()
   },
  },
  created() {
  },
  mounted() {
  },
};
</script>