<!--
 * @Author: 安林娜
 * @LastEditors: chenjianwei
-->
<template>
  <div class="count-down-wrap">
    <p @click="sendMessageEvent">{{countDownNum > 0 ? `${countDownNum}s后重发` : $t('FSYZM')}}</p>
    <!-- 滑块验证码组件 -->
    <drag ref="drag" @close="closeDrag"></drag>
  </div>
</template>
<script>
import apis from '@/apis'
import drag from "@/components/drag.vue";
import { mapState } from "vuex";

export default {
  name: "component_name",
  components: {
    drag,
  },
  props: {
    mobile: {
      require: true,
      sliderVerifyCode: "",
    },
  },
  computed: {
    ...mapState(["Config"]),
  },
  data() {
    return {
      countDownNum: -1,
      interval: null,
    }
  },
  methods: {
    /**
     * @function 发送验证码事件
     */
    sendMessageEvent() {
      if (this.countDownNum <= 0) {
        if (this.Config.verificationSwitch === "1") {
          this.$refs.drag.open();
        } else {
          this.sendMessage();
        }
      } else {
        this.$message.error(this.$t('QQGYPF,QSHCS'))
      }
    },
    /**
     * @function 发送验证码
     */
    sendMessage() {
      this.$http.post(apis.Auth_SendVerifyCode, { mobile: this.mobile, sliderVerifyCode: this.sliderVerifyCode }).then((res) => {
        if (res.data.code === 200) {
          this.countDownNum = 60
          if (this.interval) {
            clearInterval(this.interval)
          }
          this.interval = setInterval(() => {
            this.countDownNum -= 1
            if (this.countDownNum === 0) {
              this.countDownNum = -1
              clearInterval(this.interval)
            }
          }, 1000)
        }
      })
    },
    /**
     * @function 验证码关闭
     * @param {Number} status 1是成功，0是失败
     */
    closeDrag(status, sliderVerifyCode) {
      this.sliderVerifyCode = sliderVerifyCode
      if (status) {
        this.sendMessage();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.count-down-wrap{
  width:100px;
  height:34px;
  background: #fff;
  border-radius:4px;
  border:1px solid #fff;
  font-size:14px;
  font-family:SourceHanSansCN-Regular,SourceHanSansCN;
  font-weight:400;
  color: #218DFF;
  line-height: 34px;
  text-align: center;
  cursor: pointer;
}
</style>
