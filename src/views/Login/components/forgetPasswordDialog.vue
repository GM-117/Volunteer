<template>
  <one-dialog :visible="forgetPVisible" width="480px">
    <div slot="title">{{$t('忘记密码')}}</div>
    <el-form :model="forgetPwd" :rules="rules" ref="forgetPwdForm" class="forgetPwdForm">
      <el-form-item prop="loginName" class="forget-item">
        <el-input v-model.trim="forgetPwd.loginName" class="userName" @focus="logingNameActive=true" autoComplete="off" @blur="logingNameActive=false" placeholder="请输入手机号码">
          <img :src="require(`../../../assets/images/phone1${logingNameActive ? '-active' : ''}.png`)" slot="prepend" />
          <!-- <button slot="append" v-if="Config.verificationSwitch === '1'" class="getVail" @click.stop.prevent="getValidateCode" :disabled="countTime < 60">获取验证码 {{countTime === 60 ? '' : `${countTime}s`}}</button> -->
        </el-input>
      </el-form-item>
      <!-- <el-form-item prop="verifyCode" class="forget-item" v-if="Config.verificationSwitch === '1'">
        <el-input v-model.trim="forgetPwd.verifyCode" class="userName" @focus="vailCodeActive=true" autoComplete="off" @blur="vailCodeActive=false" placeholder="请输入验证码">
          <img :src="require(`../../../assets/images/vailCode1${vailCodeActive ? '-active' : ''}.png`)" slot="prepend" />
        </el-input>
      </el-form-item> -->
      <!-- <el-form-item prop="password" class="forget-item">
        <el-input v-model.trim="forgetPwd.password" class="password new-password" type="password" @focus="passwordActive=true" autoComplete="new-password" @blur="passwordActive=false" :placeholder="$t('ple_ent_newPassword')">
          <img :src="require(`../../../assets/images/password1${passwordActive ? '-active' : ''}.png`)" slot="prepend" />
          <img src="@/assets/images/xiangqing-3.png" alt="" slot="append" @click="visible = !visible">
        </el-input>
        <el-popover placement="bottom" trigger="manual" v-model="visible">
          <p>1.密码长度必须介于8~18位</p>
          <p>2.不能包含连续4位相同或连续4位递增(减)数字</p>
          <p>3.必须同时包含英文字母、阿拉伯数字、特殊字符，例如abcd@125</p>
        </el-popover>
      </el-form-item> -->
      <el-form-item  prop="password" class="forget-item">
        <el-input v-model.trim="forgetPwd.password" class="password new-password" placeholder="请输入密码" type="password" @input="checkData" @focus="tipVisible = true" @blur="tipVisible=false">
          <img :src="require(`@/assets/images/password1${passwordActive ? '-active' : ''}.png`)" slot="prepend" />
          <img src="@/assets/images/xiangqing-3.png" alt="" slot="append" @click="tipVisible1=!tipVisible1">
        </el-input>
        <el-popover placement="bottom" trigger="manual" v-model="tipVisiblePop">
          <p><i v-show="forgetPwd.password" :class="errorFlag1 ? 'el-icon-close' : 'el-icon-check'"></i>密码长度8-18个字符;</p>
          <p><i v-show="forgetPwd.password" :class="errorFlag3 ? 'el-icon-close' : 'el-icon-check'"></i>同时包含数字、字母和特殊符号组合;</p>
          <p><i v-show="forgetPwd.password" :class="errorFlag4 ? 'el-icon-close' : 'el-icon-check'"></i>不能包含连续3位相同/递增(减)的数字;</p>
        </el-popover>
      </el-form-item>
      <el-form-item prop="confirmPassword" class="forget-item">
        <el-input v-model.trim="forgetPwd.confirmPassword" class="password" type="password" @focus="passwordAlignActive=true" autoComplete="new-password" @blur="passwordAlignActive=false" placeholder="请再次输入密码">
          <img :src="require(`../../../assets/images/password1${passwordAlignActive ? '-active' : ''}.png`)" slot="prepend" />
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="info" @click="close">{{$t('取消')}}</el-button>
      <el-button type="primary" @click="forgetPwdConfirm">{{$t('确认')}}</el-button>
    </div>
    <drag ref="dragForCode" @close="closeDragForCode"></drag>
  </one-dialog>
</template>

<script>
import { mapState } from 'vuex'
import oneDialog from '@/components/one-dialog.vue'
import drag from '@/components/drag.vue'
import apis from '@/apis'
import passwordMixin from '@/mixins/password'
import { ForgetPassword, Rules } from './forgetPasswordPasswordClass'

export default {
  components: { oneDialog, drag },
  mixins: [passwordMixin],
  props: {
    forgetPVisible: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tipVisible: false,
      tipVisible1: false,
      errorList: [],
      logingNameActive: false,
      vailCodeActive: false,
      passwordActive: false,
      passwordAlignActive: false,
      forgetPwd: new ForgetPassword(),
      rules: new Rules(this),
      countTime: 60,
      visible: false,
      interval: null,
      errorFlag1: false, // 验证标识 false为验证通过，true为验证不通过
      errorFlag2: false, // 验证标识 false为验证通过，true为验证不通过
      errorFlag3: false, // 验证标识 false为验证通过，true为验证不通过
      errorFlag4: false, // 验证标识 false为验证通过，true为验证不通过
    }
  },
  computed: {
    ...mapState(['Config', 'timestampDiff']),
    tipVisiblePop: {
      get() {
        return this.tipVisible || this.tipVisible1
      },
      set(val) {
        return val
      },
    },
  },
  methods: {
    /**
     * @function 关闭弹窗
     */
    close() {
      this.$refs.forgetPwdForm.resetFields()
      this.$emit('update:forgetPVisible', false)
    },
    /**
     * @function 失去焦点验证
     */
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
      this.errorFlag1 = !reg1.test(this.forgetPwd.password)
      this.errorFlag2 = reg2.test(this.forgetPwd.password)
      this.errorFlag3 = !reg3.test(this.forgetPwd.password)
      for (const i in allNumberList) {
        if (this.forgetPwd.password.includes(allNumberList[i])) {
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
     * 下一步
     */
    btnNext() {
      this.$refs.form.validate((valid) => {
        // this.changeStrength() // 验证密码格式
        if (valid && !this.errorFlag1 && !this.errorFlag2 && !this.errorFlag3 && !this.errorFlag4) {
          if (this.checked) {
            this.type = 'xiayibu'
            this.registeredAccount()
          } else {
            this.$message.warning('您需要勾选相关条款才能注册')
          }
        } else {
          this.tipVisible = true
        }
      })
    },
    /**
     * @function 发送验证码-滑块验证码
     */
    getValidateCode() {
      if (this.Config.verificationSwitch === '1') {
        this.$refs.dragForCode.open()
      } else {
        this.closeDragForCode()
      }
    },
    /**
     * @function 发送验证码
     */
    closeDragForCode(status, sliderVerifyCode) {
      this.$http.post(apis.Auth_SendVerifyCode, { mobile: this.forgetPwd.loginName, sliderVerifyCode }).then((res) => {
        if (res.data.code === 200) {
          this.countTime = 60
          if (this.interval) {
            clearInterval(this.interval)
          }
          this.interval = setInterval(() => {
            this.countTime -= 1
            if (this.countTime === 0) {
              this.countTime = 60
              clearInterval(this.interval)
            }
          }, 1000)
        }
      })
    },
    /**
     * @function 忘记密码提交
     */
    forgetPwdConfirm() {
      this.$refs.forgetPwdForm.validate((valid) => {
        if (valid) {
          const timestamp = (new Date()).getTime() + this.timestampDiff
          const password = this.passwordCrypt(this.forgetPwd.password, timestamp)
          this.$http.post(apis.Auth_ForgetPassword, {
            password, loginName: this.forgetPwd.loginName, verifyCode: this.forgetPwd.verifyCode, timestamp,
          }).then((res) => {
            if (res.data.code === 200) {
              this.close()
            }
          })
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.getVail {
  width:103px;
  height:36px;
  position: relative;
  right: -20px;
  background:rgb(40, 134, 220);
  border-radius:4px;
  color: #FFF;
  outline: none;
  cursor: pointer;
}
.forget-item{
  margin-top: 30px;
}
</style>
<style lang="less">
.forgetPwdForm {
  .el-input-group__append {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #94989E;
    background: #FFF;
  }
  .el-popover {
    background: rgba(0,0,0,0.7);
    color: rgba(255,255,255,1);
    left: -62px;
    margin-left: 37%;
  }
  .el-icon-close {
    color: #FE6363;
  }
  .el-icon-check {
    color: #6DD400;
  }
  .userName.el-input-group--prepend .el-input__inner, .password.el-input-group--prepend .el-input__inner, .userName.el-input-group--prepend .el-input-group__append, .password.el-input-group--prepend .el-input-group__append, .userName.el-input-group--prepend .el-input-group__prepend, .password.el-input-group--prepend .el-input-group__prepend {
    background: none;
    color: #000;
  }
}
p{
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
.el-button--info {
  color: #2886dc;
  background-color: #eaecf1;
  border-color: #eaecf1;
}
</style>
