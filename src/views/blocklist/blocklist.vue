<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-03-09 13:58:09
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
    width: 300px;
    height: 400px;
    line-height: 178px;
    text-align: center;
    border:1px #8a16ff dashed;
  }
  .camera {
margin-left: 30px;
    margin-top: 44px;
    i {
      font-size: 20px;
    }
  }
  .el-icon-plus {
position: absolute;
    top: 50%;
    font-size: 60px;
    margin-left: -30px;
    margin-top: -32px;
    color: #d7dae2;
}
  .des {
   color: #999;
    font-size: 12px;
    padding-left: 30px;
    line-height: 16px;
    margin-top: -27px;
    margin-left: 87px;
  }
  .img {position: absolute;left:0;top:0;}
    .photo {
    width: 300px;
    height: 400px;
    overflow: hidden;
    border: 1px #8a16ff dashed;
    background-size: contain;
    position: relative;
  }
  ::v-deep .el-loading-spinner i {
    font-size: 22px;
}
  ::v-deep .el-loading-text {
    margin-top: -18px;
  }
  .save_staff {
    justify-content: flex-end;
    display: flex;
  }
</style>
<template>
  <div class="app-container">
    <el-form :model="pagingQuery" :inline="true">
      <el-form-item label="姓名">
        <el-input v-model="pagingQuery.name" placeholder="请输入姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="禁止通行原因">
        <el-input v-model="pagingQuery.reason" placeholder="禁止通行原因" clearable></el-input>
      </el-form-item>
      <el-button type="success" @click="onSearch" class="search">
        <i class="el-icon-search"></i><span>查询</span>
      </el-button>
      <el-button type="warning" @click="onDeletes">
        <i class="el-icon-delete"></i><span>批量删除</span>
      </el-button>
      <el-button type="primary" @click="dialogVisible1 = true"><svg-icon icon-class="edit" /> 添加黑名单人员</el-button>
     </el-form>

    <el-table :data="tableData" border max-height="700" @selection-change="handleSelectionChange" ref="multipleTable" v-loading="table_loading">
      <el-table-column width="50" type="selection" fixed></el-table-column>
      <el-table-column label="序列" width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
      <el-table-column align="center" label="姓名" width="80">
        <template slot-scope="scope"> {{ scope.row.name }} </template>
      </el-table-column>
      <el-table-column align="center" label="头像" width="90">
        <template v-slot="scope"><img :src="`${ getImgUrl + scope.row.imageUrl}`" width="100%" /></template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.createTime | filterDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="禁止通行原因">
        <template slot-scope="scope"> 
          {{ scope.row.reason }} 
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="auto">
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
      :current-page="pagingQuery['current']"
      :page-sizes="[10, 20, 40, 60, 80, 100, 200, 300, 400]"
      :page-size="pagingQuery['size']"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagingQuery['total']">
    </el-pagination>

<!-- 添加黑名单人员 -->
    <el-dialog
           title="添加禁止通行人员"
           :visible.sync="dialogVisible1"
           width="45%"
           top="0"
          >
     <el-form :model="addBlock" label-width="auto" :rules="addBlockRule" ref="addBlockRule" class="addBlock" :inline="true">
       <el-form-item label="姓名：" prop="name"><el-input v-model.trim="addBlock.name" class="w160" clearable></el-input></el-form-item><br>
       <el-form-item label="性别："><el-select class="w160" v-model.trim="addBlock.gender"><el-option v-for="(gender, index) of genders" :key="index" :label="gender.value" :value="gender.id"></el-option></el-select></el-form-item><br>
      <el-form-item label="禁止通行原因：" prop="reason"><el-input class="w360" v-model.trim="addBlock.reason" type="textarea" :rows="2" placeholder="请输入内容"> </el-input></el-form-item><br>
      <el-form-item label="头像类型：">
        <el-radio-group v-model="faceType" @change="changeImgType"><el-radio v-for="(faceType, index) of faceTypes" :key="index" :label="faceType.name">{{ faceType.name }}</el-radio></el-radio-group>
      </el-form-item><br>
      <el-form-item label="头像采集：" prop="file">
          <el-upload
            class="avatar-uploader fl"
            :action="proxyUrl"
            :show-file-list="false"
            :on-success="fileuccess"
            :before-upload="imgBeforeHandle"
            :on-error="imgError"
            :multiple="true"
            >
            <div class="photo" v-loading="imgUploading" element-loading-text="正在上传中..." element-loading-spinner="el-icon-loading">
           <i class="el-icon-plus"></i>
          <img class="img" v-if="imageUrl" :src="imageUrl" width="100%">
          </div>
       </el-upload>
      
      </el-form-item><br>
      <div>
           <p class="des">图片文件支持PNG、JPG、JPEG、BMP，大小不超过2M</p>
       </div>
     <el-form-item class="save_staff">
        <el-button @click="resetAddBlock"><i class="el-icon-refresh"></i><span>重 置</span></el-button>
        <el-button type="primary" :loading="save_loading" @click="saveBlockHandle('addBlockRule')"><i class="el-icon-check"></i> &nbsp;保 存</el-button>
        <el-button @click="dialogVisible1 = false"><span>取 消</span></el-button>
     </el-form-item>
     </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { blockList, addBlockList, deleteBlock} from '@/api/blocklist/index'
import { getGender, getFaceType} from '@/utils/business'
import { imgUrl } from '@/api/public'
import { pickerOptions } from '@/utils'
import Mock from '../../../mock/proxyUrl'
import moment from 'moment'

let vm

export default {
  name: 'blcoklist',
  data() {
     function notNull(notNullName) { return [{required: true, message: `请输入${ notNullName }`, trigger: "blur" }] }
    return {
      dialogVisible1: false,
      table_loading:false,
      save_loading: false,
      imgUploading: false,
      proxyUrl: 'http://www.zg.com',
      pickerOptions: pickerOptions(),
      multipleSelection: [], //多选删除
      genders: getGender(),
      faceTypes: getFaceType(),
      faceType: getFaceType()[0].name,
       getImgUrl: imgUrl(),
      imageUrl: '',
      addBlock: {
        name: null,
        gender: 'male',
        faceType: 'id',
        reason: null,
        file: null 
      },
       addBlockRule: {
          name: notNull('姓名'),
          reason: notNull('职务'),
       },
      tableData: [],
     pagingQuery: {
        faceType: null,
        name: null,
        reason: null,
        current: 1,
        size: 10,
        total: null
      },
    }
  },
  methods: {
      async saveBlockHandle(el) {
    let a = this.addBlock
       this.$refs[el].validate((valid) => {
        if (valid) {
          a['file'] === null ? this.$message.warning('请上传禁止通行人头像！') : this.httpRequest()
      }
     })
  },
    imgBeforeHandle(file, fileList) {
        function imageType () { return ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp'].includes(file.type) }
        const isLt2M = file.size / 1024 / 1024 < 2;
              if (!imageType()) { 
                this.$message.error('上传人脸图片只能是四种格式（jpg/jpeg/png/bmp）!')
                } else if (!isLt2M) {
                 this.$message.error('上传人脸图片大小不能超过2MB!')
              } else { 
                  let format = file.type.substr(file.type.indexOf('/') + 1)
              }
            return imageType() && isLt2M
    },
     fileuccess(res, file) {
       this.imgUploading = true
        setTimeout(() => {
          this.imgUploading = false
          this.imageUrl = URL.createObjectURL(file.raw)
          this.addBlock['file'] = file.raw
           }, 700)
      },
    async httpRequest(content){
        this.save_loading = true
         let a = this.addBlock,
          formData = new FormData()
          for(let item in a) { formData.append(item, a[item]) }
               addBlockList(formData).then((res) => {
                if(res.code === 0) {
                   vm.save_loading = false
                   vm.$message.success(`${ a?.['name'] } 保存成功！`, 4000)
                   vm.resetAddBlock()
                   vm.getBockList()
                     } else {
                       vm.$message.warning(res.msg, 4000)
                       vm.save_loading = false
                     }
                },(err) => {
                   vm.save_loading = false
                   vm.$message.error('保存失败，请重试！')
                  })
        },
      imgError(err, file, fileList) {
       this.$message({
                message: '上传失败，请重试',
                 type: "error"
            })
     },

    changeImgType() {
      this.addBlock.faceType = this.faceType == 'id' ? 'id' : 'life'
    },
   changeDate() {
         let a = this.addBlock
       a['enrollTime'] =  moment(a['enrollTime']).format('YYYY-MM-DD')
  },

    onSearch(){
    let params = this.pagingQuery
      params.current = 1
      this.getBockList()
    },
    getBockList() {
      blockList(vm.pagingQuery).then((res) => {
        this.tableData = []
             if(res.code === 0) {
              if(res.data.records.length !== 0) {
                this.tableData = res.data.records
                this.table_loading = false
              }
             } else {
               this.$message.error(res.msg)
             }
      })
    },
    handleDelete(y) {
       deleteBlock(y.id).then((res) => {
        if (res.code == 0 && res.data) {
          this.$message.success({message: res.msg})
          this.getBockList()
        } else {
          this.$message.warning({message: res.msg})
        }
      })
    },
    onDeletes() {
       if (this.multipleSelection.length !== 0) {
        this.$confirm("此操作将永久删除已选人员, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              deleteBlock(this.multipleSelection[i].id).then((res) => {
                if (res.code == 0 && res.data) {
                  if(i + 1 >= this.multipleSelection.length) {
                  this.onSearch()
                  this.$message.success({message: res.msg})
                  } 
                }
              })
            }
          }).catch(() => {
             this.$message.info({message: '已取消删除'})
             this.$refs.multipleTable.clearSelection()
          })
      } else {
        this.$message.warning('请在列表中勾选要删除的人员')
      }
    },
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
  resetAddBlock() { 
    this.$refs['addBlockRule'].resetFields()
    this.addBlock['file'] = this.imageUrl = null
   },
    onDelete() {

    },
  },
  created() {
    vm = this
    this.onSearch()
  },
  mounted() {},
};
</script>
