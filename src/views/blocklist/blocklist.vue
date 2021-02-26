<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-02-26 19:10:46
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
    <el-form :model="pagingParams" :inline="true">
      <el-form-item label="姓名">
        <el-input v-model="pagingParams.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="头像类型">
        <el-select v-model="pagingParams.faceType" clearable="true">
          <el-option v-for='(item, index) in faceTypes' :key='index' :label='item.label' :value='item.value'>
            <span style="float: right;color:yello;">
            <i class="el-icon-check"></i>
            </span>
            <span style="float: left; color: #8492a6; font-size: 13px">{{ item.label }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="禁止通行原因">
        <el-input v-model="pagingParams.reason" placeholder="禁止通行原因"></el-input>
      </el-form-item>
      <el-button type="success" @click="onSearch" class="search">
        <i class="el-icon-search"></i><span>查询</span>
      </el-button>
      <el-button type="warning" @click="onDeleteRecordList">
        <i class="el-icon-delete"></i><span>批量删除</span>
      </el-button>
      <el-button type="primary" @click="onExport" disabled="true">
        <svg-icon icon-class="excel" /> <span>导出</span>
      </el-button>
    </el-form>

    <el-table :data="blockList" border max-height="700" @selection-change="handleSelectionChange" ref="multipleTable">
      <el-table-column width="50" type="selection" fixed>
      </el-table-column>
      <el-table-column label="序列" width="60" align="center">
        <template slot-scope="scope">
          {{ scope.row.index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="100">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template> 
      </el-table-column>
      <el-table-column align="center" label="姓名" width="80">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="picture" header-align="center" align="center" width="120" label="头像">
        <template slot-scope="scope">
          <el-popover placement="right" :title="scope.row.name" trigger="hover">
            <img :src="scope.row.url"/>
            <img slot="reference" :src="scope.row.url" style="max-height:50px; max-width:50px">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="头像类型" width="100">
        <template slot-scope="scope">
          <i v-text="getFaceTypeLabel(scope.row.faceType)"></i> 
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最近更新时间" width="180">
        <template slot-scope="scope"> 
          {{ scope.row.lastUpdateTime }} 
        </template>
      </el-table-column>
      <el-table-column align="center" label="禁止通行原因">
        <template slot-scope="scope"> 
          {{ scope.row.reason }} 
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="90">
        <template slot-scope="scope">
          <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            title="确定要删除该记录？"
            @onConfirm="handleDelete(scope.row)">
            <el-button  class="radius_45 ml10" size="mini" type="danger" slot="reference"><i class="el-icon-delete"></i><span>删除</span>
            </el-button>
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
      :total="pagingParams['total']">
    </el-pagination>
  </div>
</template>

<script>
import { searchBlocklist} from '@/api/blocklist/index'
import { pickerOptions } from '@/utils'

export default {
  name: "",
  data() {
    return {
      pickerOptions: pickerOptions(),
      multipleSelection: [], //多选删除
      faceTypes: [
        {label: "生活照", value: "LIFE"},
        {label: "证件照", value: "ID"}
      ],
      blockList: [
        {
          index: 0,
          id: 110,
          name: "王雷",
          url: "http://10.0.0.180/images/000800.jpg",
          faceType: "LIFE",
          createTime: "2020-01-21 16:26:00",
          lastUpdateTime: "2020-01-21 16:26:00",
          reason: "黑名单"
        },
        {
          index: 1,
          id: 110,
          name: "王雷",
          url: "http://10.0.0.180/images/000812.jpg",
          faceType: "ID",
          createTime: "2020-01-21 16:26:00",
          lastUpdateTime: "2020-01-21 16:26:00",
          reason: "黑名单"
        },
          {
          index: 2,
          id: 110,
          name: "王雷",
          url: "http://10.0.0.180/images/000812.jpg",
          faceType: "ID",
          createTime: "2020-01-21 16:26:00",
          lastUpdateTime: "2020-01-21 16:26:00",
          reason: "黑名单"
        },
          {
          index: 3,
          id: 110,
          name: "王雷",
          url: "http://10.0.0.180/images/000812.jpg",
          faceType: "ID",
          createTime: "2020-01-21 16:26:00",
          lastUpdateTime: "2020-01-21 16:26:00",
          reason: "黑名单"
        },
          {
          index: 4,
          id: 110,
          name: "王雷",
          url: "http://10.0.0.180/images/000812.jpg",
          faceType: "ID",
          createTime: "2020-01-21 16:26:00",
          lastUpdateTime: "2020-01-21 16:26:00",
          reason: "黑名单"
        },
          {
          index: 5,
          id: 110,
          name: "王雷",
          url: "http://10.0.0.180/images/000812.jpg",
          faceType: "ID",
          createTime: "2020-01-21 16:26:00",
          lastUpdateTime: "2020-01-21 16:26:00",
          reason: "黑名单"
        },
          {
          index: 6,
          id: 110,
          name: "王雷",
          url: "http://10.0.0.180/images/000812.jpg",
          faceType: "ID",
          createTime: "2020-01-21 16:26:00",
          lastUpdateTime: "2020-01-21 16:26:00",
          reason: "黑名单"
        },
          {
          index: 7,
          id: 110,
          name: "王雷",
          url: "http://10.0.0.180/images/000812.jpg",
          faceType: "ID",
          createTime: "2020-01-21 16:26:00",
          lastUpdateTime: "2020-01-21 16:26:00",
          reason: "黑名单"
        }
      ],
     pagingParams: {
        faceType: null,
        name: null,
        reason: null,
        current: 1, //默认当前页数为1
        size: 10,
      },
    };
  },
  methods: {
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
    getFaceTypeLabel(val) {
      let _this = this;
      for (var i=0; i< _this.faceTypes.length; i++) {
        if (_this.faceTypes[i].value == val) {
          return _this.faceTypes[i].label;
        }
      }
      return "未定义";
    },
    onSearch(){
      let _this = this;
      searchBlocklist(_this.pagingParams).then((res) => {
             if(res.code === 0 && res.data) {
               console.log(res.data)
             }
      });
    },
    handleDelete(val) {
      let _this = this;
      console.log("deleteRecord");
      console.log(val);
      //deleteRecord
    },
    onDeleteRecordList() {
      let _this = this;
      console.log("onDeleteRecordList");
      console.log(_this.multipleSelection);
      if (_this.multipleSelection.length !== 0) {
      _this.$confirm("此操作将会删除已选的记录, 确定继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        for (var i = 0; i < _this.multipleSelection.length; i++) {
          _this.handleDelete(_this.multipleSelection[i]);
        }
      }).catch(() => {
        _this.$message.success.info({message: '已取消删除'})
        _this.$refs.multipleTable.clearSelection()
        })
      } else {
        _this.$message({
        message: "请在列表中选择要删除的记录",
        type: "warning"
        })
      }
    },
    onDelete() {

    },
    onExport() {

    }
  },
  created() {
  },
  mounted() {},
};
</script>
