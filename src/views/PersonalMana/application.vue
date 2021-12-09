<template>
  <div class="text-container">
    <!-- 未提交审核 -->
    <div v-if="type === '' || type === 'VS99'">
      <el-row>
        <el-col :span="4" :offset="4"><span class="text active">完善报名信息</span></el-col>
        <el-col :span="2"><span class="dotted">…………</span></el-col>
        <el-col :span="4"><span class="text">后台审核</span></el-col>
        <el-col :span="2"><span class="dotted">…………</span></el-col>
        <el-col :span="4"><span class="text">反馈审核结果</span></el-col>
      </el-row>
      <!-- <el-row><div class="tip">请完善个人信息并提交审核</div></el-row> -->
      <el-row><div class="tip">您的报名信息未补充完整，点击下方完善</div></el-row>
      <el-row>
        <div class="align">
          <img src="@/assets/images/login-perfect.png" alt="" @click="tiaoZhuan('update')">
          <span class="low-text">完善报名信息</span>
        </div>
      </el-row>
    </div>
    <!-- 待审核 -->
    <div v-if="type === 'VS01' || type === 'VS02'">
      <el-row>
        <el-col :span="4" :offset="4"><span class="text active">完善报名信息</span></el-col>
        <el-col :span="2"><span class="dotted">…………</span></el-col>
        <el-col :span="4"><span class="text active">后台审核</span></el-col>
        <el-col :span="2"><span class="dotted">…………</span></el-col>
        <el-col :span="4"><span class="text">反馈审核结果</span></el-col>
      </el-row>
      <el-row>
        <div class="tip">您的报名信息正在审核中，请等待审核通知</div>
      </el-row>
      <el-row>
        <div class="align">
          <img src="@/assets/images/login-search.png" alt="" @click="tiaoZhuan">
          <span class="low-text">查看报名信息</span>
        </div>
      </el-row>
    </div>
    <!-- 不通过 -->
    <div v-if="type === 'VS03' || type === 'VS05'">
      <el-row>
        <el-col :span="4" :offset="4"><span class="text active">完善报名信息</span></el-col>
        <el-col :span="2"><span class="dotted">…………</span></el-col>
        <el-col :span="4"><span class="text active">后台审核</span></el-col>
        <el-col :span="2"><span class="dotted">…………</span></el-col>
        <el-col :span="4"><span class="text active">反馈审核结果</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="9" :offset="5">
          <p>尊敬的<span class="notice-name">{{name}}:</span></p>
          <span class="notice">很抱歉您未能被录用为{{VUE_APP_PRODUCTION_SERVER ? 'XXX运动会' : $t('text_name')}}志愿者，未通过原因为：{{approvalReason}}，感谢您的参与！</span>
          <img class="img-position" src="@/assets/images/no-pass.png" alt="">
        </el-col>
        <el-col :span="4" :offset="1">
          <div class="align">
            <img src="@/assets/images/login-search.png" alt="" @click="tiaoZhuan">
            <span class="low-text">查看报名信息</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 通过 -->
    <div v-if="type === 'VS04'">
      <el-row>
        <el-col :span="4" :offset="4"><span class="text active">完善报名信息</span></el-col>
        <el-col :span="2"><span class="dotted">…………</span></el-col>
        <el-col :span="4"><span class="text active">后台审核</span></el-col>
        <el-col :span="2"><span class="dotted">…………</span></el-col>
        <el-col :span="4"><span class="text active">反馈审核结果</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="9" :offset="5">
          <p>尊敬的<span class="notice-name">{{name}}:</span></p>
          <span class="notice">您好！您已通过{{VUE_APP_PRODUCTION_SERVER ? 'XXX运动会' : $t('text_name')}}志愿者报名系统初步审核！请在48小时内复核个人信息，并在下方点击确认！</span>
          <img class="img-position" src="@/assets/images/pass.png" alt="">
          <p class="p-margin"><img src="@/assets/images/time-blue.png" alt="">
            <span style="color: rgb(40, 134, 220); margin-left: 5px;">{{hour}}</span>
            时
            <span style="color: rgb(40, 134, 220); margin-left: 5px;">{{minute}}</span>
            分
            <span style="color: #60C416; margin-left: 5px;">{{second}}</span>
            秒
          </p>
          <el-button class="btn btn-error" @click="openErrorDialog">资料有误</el-button>
          <el-button class="btn btn-success" @click="comfired">确认</el-button>
        </el-col>
        <el-col :span="4" :offset="1">
          <div style="text-align:center;">
            <img src="@/assets/images/login-search.png" alt="" @click="tiaoZhuan">
            <span class="low-text">查看报名信息</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 退回 -->
    <div v-if="type === 'VS07'">
      <el-row>
        <el-col :span="4" :offset="4"><span class="text active">完善报名信息</span></el-col>
        <el-col :span="2"><span class="dotted">…………</span></el-col>
        <el-col :span="4"><span class="text active">后台审核</span></el-col>
        <el-col :span="2"><span class="dotted">…………</span></el-col>
        <el-col :span="4"><span class="text active">反馈审核结果</span></el-col>
      </el-row>
      <el-row>
        <div class="tip">您提交的报名资料中"{{returnReason}}",请根据提示修改资料</div>
      </el-row>
      <el-row>
        <div class="align">
          <img src="@/assets/images/login-perfect.png" alt="" @click="tiaoZhuan">
          <span class="low-text">完善报名信息</span>
        </div>
      </el-row>
    </div>
    <!-- 已确认 -->
    <!-- <div v-if="type === 'VS06' && (trainStatus === '' || trainStatus === '0')">
      <div class="chenggong">
        <img class="chenggong-img" src="../../assets/images/chenggong.png" alt="">
        <div class="comfi-text">恭喜您已成功报名{{VUE_APP_PRODUCTION_SERVER ? 'XXX运动会' : $t('text_name')}}志愿者，衷心的感谢您的支持与参与，请积极参与志愿者相关培训、活动，后续安排请关注组委会相关通知。</div>
      </div>
    </div> -->
    <!-- 已确认+培训已通过 -->
    <div v-if="type === 'VS06'">
      <div v-if="imgUrl" class="chenggong">
        <img :src="imgUrl" alt="" class="imgUrl">
      </div>
      <div v-else class="certificate-none">
        <img src="@/assets/images/certificate-none.png" alt="">
        <p>“很抱歉，您还未获得证书，继续加油哦！”</p>
      </div>
    </div>
    <!-- 资料有误弹窗 -->
    <el-dialog title="提示" :visible.sync="errorDialogVisible" width="30%" center :close-on-click-modal="false">
      <span class="tip-info">您的操作将退回已审核通过的资料，再次提交将重新进行审核，请确认是否要进行资料有误的操作？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="comfiedYouWu('youwu')">是</el-button>
        <el-button @click="errorDialogVisible = false">否</el-button>
      </span>
  </el-dialog>
  <!-- 确认弹窗 -->
  <el-dialog title="提示" :visible.sync="confirmDialogVisible" width="30%" center :close-on-click-modal="false">
    <span class="tip-info">是否已确认您提交的资料无误？</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="Confirm">是</el-button>
      <el-button @click="confirmDialogVisible = false">否</el-button>
    </span>
  </el-dialog>
  </div>
</template>
<script>
import apis from "@/apis";
import mixin from '@/mixins/index'
import { mapState } from 'vuex';

export default {
  mixins: [mixin],
  data() {
    return {
      type: '', // 审核状态
      approvalTime: '',
      name: '',
      hour: '0',
      minute: 0,
      second: 0,
      time: 172799,
      returnReason: '',
      approvalReason: '',
      trainStatus: '',
      imgUrl: '',
      confirmDialogVisible: false, // 确认弹窗可见性
      errorDialogVisible: false, // 资料有误弹窗可见性
    }
  },
  computed: {
    ...mapState(['VUE_APP_PRODUCTION_SERVER', 'timestampDiff']),
  },
  created() {
    this.$http.post(apis.Auth_GetVolunteerStatua).then((res) => {
      if (res.data.code === 200) {
        this.type = res.data.data.volunteerStatua // 志愿者状态
        this.name = res.data.data.name // 用户名
        this.returnReason = res.data.data.returnReason
        this.approvalReason = res.data.data.approvalReason
        this.approvalTime = res.data.data.approvalTime // 获取审核时间
        this.trainStatus = res.data.data.trainStatus // 培训是否通过
        if (!this.approvalTime) {
          console.log('print')
        } else {
          this.countDown(this.approvalTime)
        }
        if (this.type === 'VS06') {
          this.$http.post(apis.ZyzRegistered_AddTextToImg).then((response) => {
            if (response.data.code === 200) {
              this.imgUrl = response.data.data ? `data:image/png;base64,${response.data.data}` : ''
            }
          })
        }
        // if (this.type === 'VS06' && this.trainStatus === '1') {
        //   this.$http.post(apis.ZyzRegistered_AddTextToImg).then((response) => {
        //     if (response.data.code === 200) {
        //       this.imgUrl = `data:image/png;base64,${response.data.data}`
        //     }
        //   })
        // }
      }
    })
  },
  methods: {
    tiaoZhuan() {
      this.$router.push({ name: "BaseInfo" })
    },
    /**
     * @function comfired
     * @param {String} lang 确认有误跳转
     */
    comfiedYouWu(val) {
      this.$router.push({ name: "BaseInfo", params: { youWu: val } })
    },
    /**
     * @function comfired
     * @param {String} lang 确认按钮
     */
    comfired() {
      this.confirmDialogVisible = true
    },
    /**
     * @function Confirm
     * @param {String} lang 确认成功按钮
     */
    Confirm() {
      this.$http.post(apis.ZyzRegistered_Confirm, {}).then((res) => {
        if (res.data.code === 200) {
          this.$message.success('提交成功！')
          this.confirmDialogVisible = false
          this.type = 'VS06' // 变为已确认页面
        }
      })
    },
    /**
     * @function openErrorDialog
     * @param {String} lang 打开资料有误弹窗
     */
    openErrorDialog() {
      this.errorDialogVisible = true
    },
    countDown(val) {
      //如果还要设置天, 时, 秒, 在上面声明绑定后, 在这里赋值即可
      const countDownInterval = setInterval(() => {
        const apptime = new Date(val.replace(/-/g, '/')).getTime() + (2 * 24 * 60 * 60 * 1000);
        const nowTime = new Date().getTime() - this.timestampDiff
        const hasTime = (apptime - nowTime) / 1000;
        if (apptime < nowTime || (this.hour === 0 && this.minute === 0 && this.second === 0)) {
          clearInterval(countDownInterval)
        } else {
          this.hour = parseInt(hasTime / (60 * 60), 10);
          this.minute = parseInt((hasTime - (this.hour * 60 * 60)) / 60, 10);
          this.second = parseInt(hasTime - (this.hour * 60 * 60) - (this.minute * 60), 10)
        }
      }, 1000)
    },
  },
}
</script>
<style lang="less" scoped>
  .text-container {
    .text {
    display: block;
    width: 85%;
    height: 40px;
    background: rgba(189,194,202,1);
    border-radius: 4px;
    color: rgba(255,255,255,1);
    line-height: 40px;
    text-align: center;
  }
  .active {
    background: rgba(96,196,22,1);
  }
  .dotted {
    display: block;
    width: 72px;
    height: 24px;
    font-size: 16px;
    font-family: SourceHanSansSC-Medium,SourceHanSansSC;
    font-weight: 500;
    color: #60C416;
    line-height: 30px;
    text-align: center;
  }
  .tip {
    width: 100%;
    // height: 41px;
    font-size: 28px;
    font-family: SourceHanSansSC-Medium,SourceHanSansSC;
    font-weight: 500;
    color: rgba(36,45,65,1);
    line-height: 41px;
    text-align: center;
    word-break: break-word;
  }
  .el-row {
    margin-top: 120px;
  }
  .low-text {
    display: block;
    width: 100%;
    height: 36px;
    font-size: 24px;
    font-family: SourceHanSansSC-Medium,SourceHanSansSC;
    font-weight: 500;
    color: rgba(62,103,174,1);
    line-height: 36px;
  }
  .align {
    text-align: center;
    cursor:pointer;
  }
  .notice-name {
    font-size: 26px;
    font-family: SourceHanSansSC-Medium,SourceHanSansSC;
    font-weight: 500;
    color: rgba(36,45,65,1);
  }
  .notice {
    display: block;
    width: 384px;
    // height: 48px;
    margin-top: 3%;
    margin-left: 33px;
    font-family: SourceHanSansSC-Medium,SourceHanSansSC;
    font-weight: 500;
    color: rgba(36,45,65,1);
    line-height: 24px;
    word-break: break-word;
  }
  .img-position {
    margin-left: 350px;
    margin-top: -4%;
  }
  .p-margin {
    margin-left: 132px;
    margin-top: 30px;
    color: #94989E;
  }
  .btn {
    width: 168px;
    height: 46px;
    border-radius: 4px;
    font-family: SourceHanSansSC-Regular,SourceHanSansSC;
    font-weight: 400;
    color: rgba(255,255,255,1);
    margin-top: 50px;
  }
  .btn-error {
    background:rgba(174,67,62,1);
  }
  .btn-success {
    margin-left: 50px;
    background: rgba(96,196,22,1);
  }
  .chenggong {
    width: 100%;
    // margin-top: 10%;
    text-align: center;
    .imgUrl {
      // width: 33%;
      // margin-top: -9%;
      width: 455px;
      margin-top: 15vh;
    }
  }
  .certificate-none {
    margin: 30vh auto;
    width: 300px;
    text-align: center;
    img {
      width: 108px;
      height: 102px;
    }
    p {
      margin-top: 15px;
      font-size: 14px;
      color: #999;
    }
  }
  .comfi-text {
    width: 766px;
    height: 123px;
    font-size: 28px;
    font-family: SourceHanSansSC-Medium,SourceHanSansSC;
    font-weight: 500;
    color: rgba(36,45,65,1);
    line-height: 41px;
    text-align: left;
    margin: 20px auto 0;
    text-indent: 2em;
  }
  .tip-info {
    height: 51px;
    font-size: 18px;
    font-family: SourceHanSansSC-Regular,SourceHanSansSC;
    font-weight: 400;
    color: rgba(36,45,65,1);
    line-height: 27px;
  }
  }
</style>
