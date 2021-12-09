<!--
 * @Author: guojinhu
 * @Date: 2021-05-12 18:22:42
 * @LastEditTime: 2021-06-11 18:32:29
 * @LastEditors: huangyandong
 * @Description: 描述
 * @FilePath: \frontend\src\views\OrganizationLogin\components\forgetDialog.vue
-->
<template>
  <el-dialog
    :title="$t('WJMM')"
    :visible.sync="show"
    @open="openDialog"
    :before-close="closeDialog"
    :close-on-click-modal="false"
    center
    width="640px">
    <el-form ref="form" :model="form" label-width="140px" :rules="rules" size="mini">
      <el-form-item :label="$t('SJH')" prop="loginName">
        <el-input v-model="form.loginName">
          <button v-if="Config.verificationSwitch === '1'" slot="append" class="verifi" @click.prevent="handleBtn" :disabled="countTime < 60">{{countTime === 60 ? '获取验证码' : `${countTime}s`}}</button>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('YZM')" prop="verifyCode">
        <el-input v-model="form.verifyCode"></el-input>
      </el-form-item>
      <el-form-item :label="$t('password')" prop="password">
        <el-input v-model="form.password" @input="checkData" @focus="tipVisible = true" @blur="tipVisible=false">
           <img src="@/assets/images/xiangqing-3.png" slot="append" @click="tipVisible=!tipVisible">
        </el-input>
      </el-form-item>
      <el-popover placement="start" offset='50' trigger="manual" v-model="tipVisible">
            <p><i v-show="form.password" :class="errorFlag1 ? 'el-icon-close' : 'el-icon-check'"></i>密码长度8-18个字符;</p>
            <p><i v-show="form.password" :class="errorFlag3 ? 'el-icon-close' : 'el-icon-check'"></i>同时包含数字、字母和特殊符号组合;</p>
            <p><i v-show="form.password" :class="errorFlag4 ? 'el-icon-close' : 'el-icon-check'"></i>不能包含连续3位相同/递增(减)的数字;</p>
        </el-popover>
      <el-form-item :label="$t('comfigPassword')" prop="checkPass">
        <el-input v-model="form.checkPass"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="closeDialog" type="info">{{$t('cancel')}}</el-button>
      <el-button @click="sureEvent" type="primary">{{$t('sure')}}</el-button>
    </template>
      <!-- 滑块验证码组件 -->
    <drag ref="drag" @close="closeDrag"></drag>
  </el-dialog>
</template>

<script>
import mixin from '@/mixins/dialogMixin';
import { Form, Rules } from '../organizeForgetClass';
import apis from '@/apis';
import CryptoJS from 'crypto-js';
import { mapState } from 'vuex';
import md5 from "js-md5";
import drag from "@/components/drag.vue";

export default {
  mixins: [mixin],
  components: { drag },
  data() {
    return {
      form: new Form(),
      rules: new Rules(this),
      isSendVerifyCode: false,
      countTime: 60,
      tipVisible: false,
      sliderVerifyCode: '',
      errorFlag1: false, // 验证标识 false为验证通过，true为验证不通过
      errorFlag2: false, // 验证标识 false为验证通过，true为验证不通过
      errorFlag3: false, // 验证标识 false为验证通过，true为验证不通过
      errorFlag4: false, // 验证标识 false为验证通过，true为验证不通过
    }
  },
  props: {
    show: {
      required: true,
      type: Boolean,
    },
  },
  computed: {
  ...mapState([
      "VUE_APP_LOGO_BASE_URL",
      "timestampDiff",
      "Config",
    ]),
  },
  methods: {
    init() {
      this.$refs.form.resetFields()
      this.form = new Form()
    },
    sureEvent() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.isSendVerifyCode) {
            const formData = {
              ...this.form,
            }
            const timestamp = (new Date()).getTime() + this.timestampDiff
            formData.volunteerNum = parseInt(this.form.volunteerNum, 10)
            formData.timestamp = timestamp
            const salt = "fd#O@7Ej0.U4P2^i";
            const newPass = md5(timestamp + salt);
            const aes = newPass.substring(0, 16);
            const iv = newPass.substring(16);
            formData.password = this.encrypt(formData.password, aes, iv);
            formData.sliderVerifyCode = this.sliderVerifyCode
            this.$http.post(apis.Auth_ForgetPassword, formData).then((res) => {
              if (res.data.code === 200) {
                this.closeDialog()
              }
            })
          } else {
            this.$message.error('请先获取验证码')
          }
        }
      });
    },
    /* @function 验证码关闭
     * @param {Number} status 1是成功，0是失败
     */
    closeDrag(status, sliderVerifyCode) {
      if (status) {
        this.sliderVerifyCode = sliderVerifyCode
        this.getValidateCode();
      }
    },
    // 打开滑块
    openDrag() {
        if (this.Config.verificationSwitch === "1") {
          this.$refs.drag.open();
        } else {
          this.getValidateCode() // 获取验证码();
        }
    },
    handleBtn() {
      if (this.form.loginName) {
        const reg = /^1[3456789]\d{9}$/
        if (reg.test(this.form.loginName)) {
          this.openDrag() // 打开滑块
        } else {
          this.$message.error('请输入正确手机号');
        }
      } else {
        this.$message.error('请输入手机号');
      }
    },
    getValidateCode() {
      const interval = setInterval(() => {
          this.countTime -= 1
          if (this.countTime === 0) {
            this.countTime = 60
            clearInterval(interval)
          }
        }, 1000)
        const reqData = {
          mobile: '',
          sliderVerifyCode: this.sliderVerifyCode,
        }
        // 获取验证码
        reqData.mobile = this.form.loginName
        this.$http.post(apis.Auth_SendVerifyCode, reqData).then((res) => {
          if (res.data.code === 200) {
            this.isSendVerifyCode = true
          }
        })
    },
    checkData() { // 如果密码正确不弹出提示，点击感叹号弹出提示
      let flag = false
      this.errorList = []
      const allNumberList = [
            '111',
            '222',
            '333',
            '444',
            '555',
            '666',
            '777',
            '888',
            '999',
            '000',
            '012',
            '123',
            '234',
            '345',
            '456',
            '567',
            '678',
            '789',
            '098',
            '987',
            '876',
            '765',
            '654',
            '543',
            '432',
            '321',
            '210',
      ]
      const reg1 = /^\S{8,18}$/ // 密码长度8-18个字符
      const reg2 = /^(?![^ ]+$)(?![\u4e00-\u9fa5]{0,}$)/ // 不能包含空格、中文
      const reg3 = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![\W_]+$)(?![0-9a-zA-Z]+$)(?![0-9\W_]+$)(?![a-zA-Z\W_]+$)/ // 同时包含数字/字母/符号两种组合
      this.errorFlag1 = !reg1.test(this.form.password)
      this.errorFlag2 = reg2.test(this.form.password)
      this.errorFlag3 = !reg3.test(this.form.password)
      for (const i in allNumberList) {
        if (this.form.password.includes(allNumberList[i])) {
          this.errorFlag4 = true
          flag = true
          break
        }
      }
      if (!flag) {
        this.errorFlag4 = false
      }
    },
    /**
     * @function 对登录的时候密码进行加密
     * @param {String} word 要被加密的文本
     * @param {String} keyStr 密钥
     * @param {String} ivStr  偏移量
     * @returns {String} 返回加密后的文本
     */
    encrypt(word, keyStr, ivStr) {
      const key = CryptoJS.enc.Utf8.parse(keyStr);
      const iv = CryptoJS.enc.Utf8.parse(ivStr);
      const srcs = CryptoJS.enc.Utf8.parse(word);
      const encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      return encrypted.toString();
    },
  },
}
</script>

<style lang="less" scoped>
  /deep/ .el-popover{
    right: 0%;
  }
</style>
