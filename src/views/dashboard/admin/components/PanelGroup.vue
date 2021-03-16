
<style lang="scss" scoped>
.panel-group {
  margin-top: 5px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
.card-panel-icon2 {color: red;}
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #8a16ff;
        .card-panel-icon1 {color: #fff;}
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: red;
      }

      .icon-shopping {
        background: red;
        .card-panel-icon2 {color: #fff;}
      }
    }

    .icon-people {
      color: #40c9c6;
    }
    .card-panel-icon1 {
      color: #8a16ff;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: red;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
    margin-left: 6px;
    position: absolute;
    left: 48%;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
.offline {
  color: #ffba00;
}
.offlineBox:hover {
 .offline {
   color: #fff;
 }
 .icon-offline {
  background: #ffba00;
}
}
.icon-face_swiping {
  .face_swipingNum {
    color:#13ce66;
    font-size: 54px!important;
  }
  :hover {
    .card-panel-icon-wrapper {
    background: #13ce66;
    .face_swipingNum {
    color: #fff;
    }
    }
  }
}
</style>
<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :md="8" :xs="12" :sm="12" :lg="4" class="card-panel-col">
     <router-link to="/traffic-records/index?tab=1">
        <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon card-panel-icon1" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
           今日进门人数
          </div>
          <count-to :start-val="0" :end-val="0" :duration="2600" class="card-panel-num" />
        </div>
      </div>
     </router-link>
    </el-col>
    <el-col :md="8" :xs="12" :sm="12" :lg="4" class="card-panel-col">
     <router-link to="/people-manage/visitor-manage/visitor-list/visitorlist">
        <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日访客预约
          </div>
          <count-to :start-val="0" :end-val="0" :duration="3000" class="card-panel-num" />
        </div>
      </div>
     </router-link>
    </el-col>
     <el-col :md="8" :xs="12" :sm="12" :lg="4" class="card-panel-col icon-face_swiping">
      <router-link to="/traffic-records/index?tab=0">
         <div class="card-panel">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="face_swipingNum" class-name="card-panel-icon face_swipingNum" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日刷脸人数
          </div>
          <count-to :start-val="0" :end-val="0" :duration="3600" class="card-panel-num" />
        </div>
      </div>
      </router-link>
    </el-col>
    <el-col :md="8" :xs="12" :sm="12" :lg="4" class="card-panel-col offlineBox">
     <router-link to="/device-manage/deviceList">
        <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-offline">
          <svg-icon icon-class="device" class-name="card-panel-icon offline" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日设备离线
          </div>
          <count-to :start-val="0" :end-val="0" :duration="3200" class="card-panel-num" />
        </div>
      </div>
     </router-link>
    </el-col>
    <el-col :md="8" :xs="12" :sm="12" :lg="4" class="card-panel-col">
     <router-link to="/alarm/deviceAlarm">
        <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="device" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日设备故障
          </div>
          <count-to :start-val="0" :end-val="0" :duration="3200" class="card-panel-num" />
        </div>
      </div>
     </router-link>
    </el-col>
    <el-col :md="8" :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <router-link to="/alarm/personAlarm">
         <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="peoples" class-name="card-panel-icon card-panel-icon2" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日体温异常
          </div>
          <count-to :start-val="0" :end-val="0" :duration="3600" class="card-panel-num" />
        </div>
      </div>
      </router-link>
    </el-col>
  </el-row>
</template>
<script>
import CountTo from 'vue-count-to'
import { deviceException } from '@/api/alarm'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      device_out_of_order_num: 0,
      deviceException_params: {
        source: 'device',
        category: 'device_out_of_order',
        current: 1
      }
    }
  },
  methods: {
    onSearch() {
      this.pagingQuery.current = 1
     this.getDeviceException()
    },
    getDeviceException() {
      deviceException(this.deviceException_params).then((res) => {
         if(res.code === 0)  {
           this.table_loading = false
           if(res.data.records.length !== 0) {
             this.device_out_of_order_num = res.data.total
           }
         } else {
           this.$message.error(res.msg)
           this.table_loading = false
         }
       })
    }
  },
  created() {
    this.getDeviceException()

// 每30分刷新
  setInterval(() => {
        
      },(1000 * 60) * 30)
    
  }
}
</script>