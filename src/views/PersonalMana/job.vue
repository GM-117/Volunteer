<!--
 * @Author: guojinhu
 * @Date: 2021-05-17 09:20:22
 * @LastEditTime: 2021-06-11 16:14:26
 * @LastEditors: guojinhu
 * @Description: 我的岗位
 * @FilePath: \frontend\src\views\PersonalMana\job.vue
-->
<template>
  <div class="job-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="container-box">
          <img src="@/assets/images/name.png" alt="" class="container-box-icon">
          <div class="container-box-right">
            <p class="container-box-cell" style="margin-top: 0px">姓名<span class="container-cell-bold">{{form.name}}</span></p>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="container-box">
          <img src="@/assets/images/post.png" alt="" class="container-box-icon">
          <div class="container-box-right">
            <p class="container-box-cell" style="margin-top: 0px">岗位名称<span class="container-cell-bold">{{form.postName}}</span></p>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="container-box" style="flex-direction: column;justify-content: center;">
          <img src="@/assets/images/time.png" alt="" class="container-box-icon">
          <p class="container-cell-bold" style="margin: 20px 0;font-size: 24px">{{form.duration}}小时</p>
          <p class="container-box-cell" style="margin: 0">总服务时长</p>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="container-box calendar-container" style="display: block;min-height:500px">
          <div class="container-box-header">
            <el-date-picker v-model="selectMonth" type="month" value-format="yyyy-MM" :clearable="false"></el-date-picker>
          </div>
          <div class="calendar-container-week">
            <div class="week-item" v-for="(item, index) in allWeekArr" :key="index">{{ item }}</div>
          </div>
          <div class="calendar-container-date">
            <div class="date-item" v-for="(item, index) in allDateArr" :key="index">
              <div v-if="item.name !== ''" class="date-item-icon" :class="{active: selectDate === item.date,success: calendarData[item.date] && calendarData[item.date] === '1' ? true : false, error: calendarData[item.date] && calendarData[item.date] === '4' ? true : false}" @click="changeSelectDate(item.date)">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="container-box" style="display: block ;height:500px">
          <div class="container-box-header" style="justify-content: space-between;">
            <span>{{ formatTime(selectDate, 'YYYY年MM月DD日') }}</span>
          </div>
          <div class="sign-container">
            <div v-if="rightData.length !== 0">
              <div class="rightBox" v-for="(item,index) in rightData" :key="index">
                <div class="flexRowbetween">
                  <div>
                    <div class="flexRowCenter">
                      <p>签到时间：</p>
                      <p>{{item.checkInTime}}</p>
                      <span v-if="item.checkInStatusName" class="status">{{item.checkInStatusName}}</span>
                    </div>
                    <div class="flexRowTop">
                      <p style=" display: inline-block;min-width: 56px;text-align-last: justify;">地点</p><span class="spanDian">：</span>
                      <div class="flexRowCenter" style="cursor: pointer; width:280px" @click="changeRecordDetailDialog(true, item, type = 1)">
                        <p>{{item.checkInPlace}}</p>
                        <img src="@/assets/images/map.png" class="mapimg" alt="">
                      </div>
                    </div>
                  </div>
                  <el-button class="repair-sign" v-show="buttonAuth.includes('REPLACEMENT_CARD')" @click="changeApplyCardDialog(true, item.checkInGroup, item, 1)">申请补卡</el-button>
                </div>
                <div class="flexRowbetween">
                  <div>
                    <div class="flexRowCenter">
                      <p>签退时间：</p>
                      <p>{{item.checkOutTime}}</p>
                      <span v-if="item.checkOutStatusName" class="status">{{item.checkOutStatusName}}</span>
                    </div>
                    <div class="flexRowTop">
                      <p style=" display: inline-block;min-width: 56px;text-align-last: justify;">地点</p><span class="spanDian">：</span>
                      <div class="flexRowCenter" style="cursor: pointer; width:280px" @click="changeRecordDetailDialog(true, item, type = 2)">
                        <p>{{item.checkOutPlace}}</p>
                        <img src="@/assets/images/map.png" class="mapimg" alt="">
                      </div>
                    </div>
                  </div>
                  <el-button class="repair-sign" v-show="buttonAuth.includes('REPLACEMENT_CARD')" @click="changeApplyCardDialog(true, item.checkInGroup, item, 2)">申请补卡</el-button>
                </div>
              </div>
            </div>
            <div class="recordBox" v-else>
              <div class="noData">暂无数据</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 打卡记录弹窗 -->
    <record-detail-dialog ref="recordDetailDialog" :show="recordDetailPopup.visible" @closeDialog="changeRecordDetailDialog"></record-detail-dialog>
    <!-- 补卡弹窗 -->
    <applyCard-Dialog ref="applyCardDialog" :show="applyCardDialog.visible" @closeDialog="changeApplyCardDialog"  @onComplete="getPunchCardRecordList(selectDate)">
    </applyCard-Dialog>
  </div>
</template>

<script>
import apis from '@/apis'
import dayjs from 'dayjs'
import { mapState } from 'vuex'
import recordDetailDialog from './dialog/recordDetailDialog.vue'
import applyCardDialog from './dialog/applyCardDialog.vue'

export default {
  components: {
    recordDetailDialog,
    applyCardDialog,
  },
  data() {
    return {
      // 我的岗位
      form: {
        name: '',
        postName: '',
        duration: 0,
      },
      // 日历
      selectMonth: '', // 选中的月份
      selectDate: '', // 选中的日期
      allWeekArr: ['日', '一', '二', '三', '四', '五', '六'],
      allDateArr: [], // 日历显示所有的日期
      calendarData: {},
      // 打卡记录
      rightData: [],
      recordDetailPopup: {
        visible: false,
      },
      applyCardDialog: {
        visible: false,
      },
    }
  },
  computed: {
    ...mapState(['Config', 'buttonAuth']),
  },
  watch: {
    // 切换月份
    selectMonth() {
      this.getAllDate()
    },
    // 切换日期
    selectDate() {
      this.getPunchCardRecordList()
    },
  },
  mounted() {
    this.init()
    this.getMyPost()
  },
  methods: {
    init() {
      this.selectMonth = dayjs().format('YYYY-MM')
      this.selectDate = dayjs().format('YYYY-MM-DD')
      // this.getAllDate()
    },
    formatTime(date, formatStr = 'YYYY-MM-DD') {
      return dayjs(date).format(formatStr)
    },
    /**
     * @function: 岗位查询
     * @param {*}
     */
    getMyPost() {
      this.$http.post(apis.ZyzRegistered_MyPost).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.data
        }
      })
    },
    // 获取选中月份的所有日期
    getAllDate() {
      this.allDateArr = [] // 清空
      const start = dayjs(this.selectMonth).startOf('month').$D
      const end = dayjs(this.selectMonth).endOf('month').$D
      for (let i = start; i <= end; i += 1) {
        const obj = {
          date: dayjs(`${this.selectMonth}-${i}`).format('YYYY-MM-DD'),
          name: i,
        }
        this.allDateArr.push(obj)
      }
      const beforEmptyNum = dayjs(this.selectMonth).startOf('month').$W // 在数组前面筛入多少个空字符串
      if (beforEmptyNum !== 7) {
        for (let i = 0; i < beforEmptyNum; i += 1) {
          const obj = {
            date: '',
            name: '',
          }
          this.allDateArr.unshift(obj)
        }
      }
      this.getPunchCalendar()
    },
    // 日历查询
    getPunchCalendar() {
      const params = {
        startDate: dayjs(this.selectMonth).startOf('month').format('YYYY-MM-DD'),
        endDate: dayjs(this.selectMonth).endOf('month').format('YYYY-MM-DD'),
      }
      this.$http.post(apis.ZyzRegistered_PunchCalendar, params).then((res) => {
        if (res.data.code === 200) {
          const array = res.data.data || []
          const obj = {}
          array.forEach((item) => {
            obj[dayjs(item.date).format('YYYY-MM-DD')] = item.flag
          })
          this.calendarData = obj
        }
      })
    },
    // 切换选中日期
    changeSelectDate(date) {
      this.selectDate = dayjs(date).format('YYYY-MM-DD')
    },
    /**
     * @function: 右侧打卡记录
     * @param {*}
     */
    getPunchCardRecordList() {
      this.$http.post(apis.ZyzRegistered_PunchCardRecordList, { date: this.selectDate }).then((res) => {
        if (res.data.code === 200) {
          this.rightData = res.data.data
        }
      })
    },
    // 打卡记录
    changeRecordDetailDialog(dialogStatus, item, type) {
      if (dialogStatus) {
        this.recordDetailPopup.visible = dialogStatus
        this.$refs['recordDetailDialog'].getDataQuery(this.selectDate, item, type)
      } else {
        this.$nextTick(() => {
          this.recordDetailPopup.visible = dialogStatus
        })
      }
    },
    // 申请补卡
    changeApplyCardDialog(dialogStatus, checkInGroup, item, type) {
      if (dialogStatus) {
        this.applyCardDialog.visible = dialogStatus
        this.$refs['applyCardDialog'].getDataQuery(this.selectDate, checkInGroup, item, type)
      } else {
        this.$nextTick(() => {
          this.applyCardDialog.visible = dialogStatus
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.job-container {
  padding: 20px;
  .container-box {
    box-sizing: border-box;
    border-radius: 4px;
    min-height: 220px;
    background-color: #fff;
    padding: 0 30px;
    display: flex;
    align-items: center;
    .container-box-right {
      margin-left: 30px;
    }
    .container-box-img {
      width: 110px;
      height: 145px;
    }
    .container-box-icon {
      width: 45px;
      height: 45px;
    }
    .container-box-cell {
      font-size: 18px;
      color: #94989e;
      margin-top: 25px;
    }
    .container-cell-bold {
      color: #242d41;
      font-weight: bold;
      margin-left: 25px;
    }
    .container-box-header {
      border-bottom: thin solid #d5dae3;
      height: 60px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 16px;
      color: #242d41;
      font-weight: 400;
    }
  }
  .calendar-container {
    border-radius: 4px;
    padding: 0 30px;
    background-color: #fff;
    .calendar-container-week {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .week-item {
        width: calc(100% / 7);
        text-align: center;
      }
    }
    .calendar-container-date {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      .date-item {
        box-sizing: border-box;
        width: calc(100% / 7);
        height: 58px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .date-item-icon {
        border: thin solid #d5dae3;
        border-radius: 50%;
        width: 38px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        color: #687081;
        cursor: pointer;
        &.success {
          background: #60C416;
          border: thin solid #60C416;
          color: #ffffff;
        }
        &.error {
          background: #E16666;
          border: thin solid #E16666;
          color: #ffffff;
        }
        &.active {
          background: #ff9727;
          border: thin solid #ff9727;
          color: #ffffff;
        }
      }
    }
  }
  .sign-container {
    height: calc(500px - 80px);
    overflow: hidden;
    overflow-y: auto;
    font-size: 14px;
    color: #94989e;
    position: relative;
    .recordBox {
      overflow: hidden;
      overflow-y: auto;
      height: calc(500px - 160px);
      .noData {
        margin-top: 50px;
        text-align: center;
      }
    }
    .repair-sign {
      display: block;
      width: 86px;
      height: 28px;
      padding: 0;
      background-color: #3b8ace;
      line-height: 18px;
      color: #fff;
    }
  }
}
/deep/ .el-row {
  & + & {
    margin-top: 20px;
  }
}
.rightBox {
  p {
    font-size: 14px;
    font-family: SourceHanSansSC-Normal, SourceHanSansSC;
    font-weight: 400;
    color: #151515;
    line-height: 20px;
  }
}
.flexRowCenter {
  display: flex;
  justify-content: left;
  align-items: center;
}
.flexRowTop {
  display: flex;
  justify-content: left;
  align-items: flex-start;
}
.flexRowbetween {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: thin solid #d5dae3;
  padding: 16px 0;
}
.status {
  margin-left: 5px;
  padding: 1px 2px;
  height: 18px;
  border-radius: 3px;
  border: 1px solid #d11c1c;
  font-size: 12px;
  font-family: SourceHanSansSC-Normal, SourceHanSansSC;
  font-weight: 400;
  color: #d11c1c;
  line-height: 18px;
}
.mapimg {
  margin-left: 6px;
  width: 9.92px;
  height: 12.46px;
  cursor: pointer;
}
.spanDian {
  font-size: 14px;
  font-family: SourceHanSansSC-Normal, SourceHanSansSC;
  font-weight: 400;
  color: #151515;
  line-height: 20px;
}
</style>
