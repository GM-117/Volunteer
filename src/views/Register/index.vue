
<template>
  <div class="register">
    <div class="title">志愿者注册</div>
    <div class="form-width">
      <el-form ref="form" :model="form" :rules="rules" label-width="0">
        <el-row>
          <el-col :span="24">
            <el-form-item  prop="telephone">
              <el-input ref="telephone" v-model.trim="form.telephone" @focus="registerNameActive=true" @blur="registerNameActive=false" autoComplete="off" placeholder="请输入手机号">
                <img :src="require(`@/assets/images/phone1${registerNameActive ? '-active' : ''}.png`)" slot="prepend">
                <!-- <button slot="append" class="verifi" @click.stop.prevent="getValidateCode" :disabled="countTime < 60">获取验证码 {{countTime === 60 ? '' : `${countTime}s`}}</button> -->
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item  prop="verifyCode" v-if="Config.verificationSwitch === '1'">
              <el-input v-model.trim="form.verifyCode" @focus="vailCodeActive=true" @blur="vailCodeActive=false" autoComplete="off" placeholder="请输入验证码">
                <img :src="require(`@/assets/images/vailCode1${vailCodeActive ? '-active' : ''}.png`)" alt="" slot="prepend">
                <span slot="append" class="yan-tip" v-show="yanTip">验证码已发送</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="24">
            <el-form-item  prop="password">
              <el-input v-model.trim="form.password" placeholder="请输入密码" type="password" @input="checkData" @focus="tipVisible = true" @blur="tipVisible=false">
                <img :src="require(`@/assets/images/password1${passwordActive ? '-active' : ''}.png`)" slot="prepend" />
                <img src="@/assets/images/xiangqing-3.png" alt="" slot="append" @click="tipVisible1=!tipVisible1">
              </el-input>
              <el-popover placement="bottom" trigger="manual" v-model="tipVisiblePop">
                <p><i v-show="form.password" :class="errorFlag1 ? 'el-icon-close' : 'el-icon-check'"></i>密码长度8-18个字符;</p>
                <p><i v-show="form.password" :class="errorFlag3 ? 'el-icon-close' : 'el-icon-check'"></i>同时包含数字、字母和特殊符号组合;</p>
                <p><i v-show="form.password" :class="errorFlag4 ? 'el-icon-close' : 'el-icon-check'"></i>不能包含连续3位相同/递增(减)的数字;</p>
              </el-popover>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="4">
            <span class="password-strength first" :class="level==='low'?'bg-first':''"></span>
            <span class="password-strength second" :class="level==='middle'?'bg-second':''"></span>
            <span class="password-strength third" :class="level==='high'?'bg-third':''"></span>
            <span class="password-strength first-text" :class="level==='low'?'':'hidden'">低</span>
            <span class="password-strength second-text" :class="level==='middle'?'':'hidden'">中</span>
            <span class="password-strength third-text" :class="level==='high'?'':'hidden'">高</span>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item  prop="password2">
              <el-input v-model.trim="form.password2" placeholder="确认密码" type="password" @focus="passwordAlignActive=true" autoComplete="off" @blur="passwordAlignActive=false">
                <img :src="require(`@/assets/images/password1${passwordAlignActive ? '-active' : ''}.png`)" slot="prepend" />
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="agreenment">
          <el-form-item  prop="checked">
            <el-checkbox v-model="checked"></el-checkbox>
            我已阅读并接受<span style="color: rgb(40, 134, 220); cursor:pointer;" @click="changeAgreementDialog(true)">《用户协议》和《隐私协议》</span>的条款
          </el-form-item>
        </div>
        <div class="next"><el-button type="primary" @click="btnNext">下一步</el-button></div>
        <div class="login"><el-button @click="btnReturn">返回</el-button></div>
      </el-form>
    </div>
    <!-- 滑块验证码组件 -->
    <drag ref="drag" @close="closeDrag"></drag>
    <agreement-dialog :show="agreementDialogVisible" @closeDialog="changeAgreementDialog"></agreement-dialog>
  </div>
</template>
<script>
import UserRegisterClass from './userRegisterClass'
import drag from '@/components/drag.vue'
import apis from '@/apis'
import { mapState } from 'vuex'
// import md5 from 'js-md5'
import CryptoJS from 'crypto-js'
import passwordMixin from '@/mixins/password'
import agreementDialog from './dialog/agreementDialog.vue'

export default {
  components: {
    drag, agreementDialog,
    },
  mixins: [passwordMixin],
  data() {
    return {
      content: '获取验证码',
      checked: false, // 勾选相关条约
      canClick: true,
      errorList: [],
      tipVisible: false,
      tipVisible1: false,
      registerNameActive: false,
      vailCodeActive: false,
      passwordActive: false,
      passwordAlignActive: false,
      countTime: 60,
      flag: true, // 密码格式是否正确
      level: '', // 密码水平
      yanTip: false, // 验证码提示
      form: new UserRegisterClass('form'), // 实例化一个表单的变量
      rules: new UserRegisterClass('rule', this), // 实例化一个表单的规则
      agreementDialogVisible: false, // 协议弹窗可见性
      errorFlag1: false, // 验证标识 false为验证通过，true为验证不通过
      errorFlag2: false, // 验证标识 false为验证通过，true为验证不通过
      errorFlag3: false, // 验证标识 false为验证通过，true为验证不通过
      errorFlag4: false, // 验证标识 false为验证通过，true为验证不通过
      sliderVerifyCode: "",
    }
  },
  computed: {
    ...mapState(['timestampDiff', 'Config']),
    tipVisiblePop: {
      get() {
        return this.tipVisible || this.tipVisible1
      },
      set(val) {
        return val
      },
    },
  },
  mounted() {
    this.$refs.telephone.focus()
  },
  methods: {
    /**
     * @function 初始化弹窗
     */
    init() {
      this.form = new UserRegisterClass('form')
      this.tipVisible = false
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    /**
     * @function 对注册的时候密码进行加密
     * @param {String} word 要被加密的文本
     * @param {String} keyStr 密钥
     * @param {String} ivStr  偏移量
     * @returns {String} 返回加密后的文本
     */
    encrypt(word, keyStr, ivStr) {
      const key = CryptoJS.enc.Utf8.parse(keyStr)
      const iv = CryptoJS.enc.Utf8.parse(ivStr)
      const srcs = CryptoJS.enc.Utf8.parse(word)
      const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
      return encrypted.toString()
    },
    /**
     * 获取验证码
     */
    getValidateCode() {
      if (this.form.telephone) {
        const reg = /^1[3456789]\d{9}$/
        if (reg.test(this.form.telephone)) {
          this.$refs.drag.open() // 唤醒滑块
        }
      } else {
        this.$notify.error({
          title: '错误',
          message: '电话号码不可为空',
        });
      }
    },
    /**
     * @function 验证码关闭
     * @param {Number} status 1是成功，0是失败
     */
    closeDrag(status, sliderVerifyCode) {
      this.sliderVerifyCode = sliderVerifyCode
      if (status) {
        if (!this.canClick) {
          return
        }
        this.canClick = false
        // 倒计时
        const interval = setInterval(() => {
          this.countTime -= 1
          if (this.countTime === 0) {
            this.countTime = 60
            this.yanTip = false
            clearInterval(interval)
          }
        }, 1000)
        const aaa = {
          mobile: '',
        }
        // 获取验证码
        aaa.mobile = this.form.telephone
          aaa.sliderVerifyCode = this.sliderVerifyCode;
        this.$http.post(apis.Auth_SendVerifyCode, aaa).then((res) => {
          if (res.data.code === 200) {
            this.yanTip = true
            this.canClick = true
          }
        })
      }
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
     * 下一步
     */
    btnNext() {
      this.$router.push('/personalMana/application')
      // this.$refs.form.validate((valid) => {
      //   // this.changeStrength() // 验证密码格式
      //   if (valid && !this.errorFlag1 && !this.errorFlag2 && !this.errorFlag3 && !this.errorFlag4) {
      //     if (this.checked) {
      //       this.type = 'xiayibu'
      //       this.registeredAccount()
      //     } else {
      //       this.$message.warning('您需要勾选相关条款才能注册')
      //     }
      //   } else {
      //     this.tipVisible = true
      //   }
      // })
    },
    /**
     * 返回
     */
    btnReturn() {
      this.$router.push('../Login')
    },
    /**
     * 注册账号
     */
    registeredAccount() {
      const formData = {}
      formData.telephone = this.form.telephone
      formData.verifyCode = this.form.verifyCode
      formData.password = this.form.password
      const timestamp = (new Date()).getTime() + this.timestampDiff
      const password = this.passwordCrypt(formData.password, timestamp)
      formData.timestamp = timestamp
      formData.password = password
      this.$http.post(apis.Auth_RegisteredAccount, formData).then((res) => {
        if (res.data.code === 200) {
          this.$notify({
            title: '成功',
            message: '注册成功',
            type: 'success',
          });
          this.$router.push('../Login')
        }
      })
    },
    /**
     * 判断密码强度
     */
    // changeStrength() {
    //   this.level = ''
    //   const length = /\S{8,16}/ // 长度不小于8位
    //   // const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![\W_]+$)(?![0-9a-zA-Z]+$)(?![0-9\W_]+$)(?![a-zA-Z\W_]+$)\S/ // 必须三种
    //   // const lianxu = /([a-zA-Z0-9])\1{3,}/ // 匹配是否含有连续三个相同的字母或数字

    //   const zimushuzi = /^[0-9a-zA-Z]+$/
    //   const shuziteshu = /^[0-9\W_]+$/
    //   const zimuteshu = /^[a-zA-Z\W_]+$/

    //   const allNumberList = [
    //   '1111',
    //   '2222',
    //   '3333',
    //   '4444',
    //   '5555',
    //   '6666',
    //   '7777',
    //   '8888',
    //   '9999',
    //   '0000',
    //   '0123',
    //   '1234',
    //   '2345',
    //   '3456',
    //   '4567',
    //   '5678',
    //   '6789',
    //   '7890',
    //   '0987',
    //   '9876',
    //   '8765',
    //   '7654',
    //   '6543',
    //   '5432',
    //   '4321',
    //   '3210',
    // ]
    //   if (!length.test(this.form.password)) {
    //     // this.$message.warning('密码长度必须介于8~18位，不能包含连续4位相同或连续4位递增(减)数字，必须同时包含数字、字母和特殊符号组合，例如abcd@125')
    //     this.flag = false
    //     this.level = 'low'
    //     return '0'
    //   }
    //   let isLowwe = false
    //   for (const i in allNumberList) {
    //     if (this.form.password.includes(allNumberList[i])) {
    //       this.flag = false
    //       this.level = 'low'
    //       isLowwe = true
    //       // this.$message.warning('密码长度必须介于8~18位，不能包含连续4位相同或连续4位递增(减)数字，必须同时包含数字、字母和特殊符号组合，例如abcd@125')
    //       break
    //     }
    //   }
    //   if (!isLowwe && (zimushuzi.test(this.form.password) || shuziteshu.test(this.form.password) || zimuteshu.test(this.form.password))) {
    //     this.level = 'middle'
    //     // this.$message.warning('密码长度必须介于8~18位，不能包含连续4位相同或连续4位递增(减)数字，必须同时包含数字、字母和特殊符号组合，例如abcd@125')
    //     return '0'
    //   }
    //   this.level = this.level || 'high'
    //   this.flag = true
    //   return this.flag
    // },
    /**
     * 查看协议
     */
    changeAgreementDialog(val) {
      this.agreementDialogVisible = val
    },
  },
}
</script>
<style lang="less">
  .register {
    width: 100%;
    // background: rgba(248,249,250,1);
    .title {
      width: 992px;
      height: 50px;
      font-size: 18px;
      font-family: SourceHanSansSC-Medium,SourceHanSansSC;
      font-weight: 500;
      color: rgba(36,45,65,1);
      line-height: 50px;
      text-align: center;
      margin: 5% auto 0;
      border-bottom: 2px solid rgba(62,103,174,0.08);
    }
    .form-width {
      width: 500px;
      margin: 5% auto;
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
    // .el-popover {
    //   margin-left: 37%;
    // }
    .agreenment {
      text-align: left;;
    }
    .next {
      width: 359px;
      height: 46px;
      background: rgba(62,103,174,1);
      border-radius: 4px;
      font-size: 16px;
      font-family: SourceHanSansSC-Regular,SourceHanSansSC;
      font-weight: 400;
      color: rgba(255,255,255,1);
      letter-spacing: 5px;
      text-align: center;
      margin: 10px auto;
    }
    .login {
      width: 359px;
      height: 46px;
      font-size: 16px;
      font-family: SourceHanSansSC-Regular,SourceHanSansSC;
      font-weight: 400;
      color: rgba(36,45,65,1);
      letter-spacing: 5px;
      text-align: center;
      margin: 10px auto;
    }
    .el-button {
      // border: 0;
      width: 100%;
      height: 100%
    }
    .verifi {
      display: inline-block;
      width: 115px;
      height: 36px;
      background: rgb(40, 134, 220);
      border-radius: 4px;
      font-size: 14px;
      font-family: SourceHanSansSC-Regular,SourceHanSansSC;
      font-weight: 400;
      color: rgba(255,255,255,1);
      letter-spacing: 1px;
      line-height: 36px;
      cursor: pointer;
    }
    .password-strength {
      width: 24px;
      height: 12px;
      display: inline-block;
    }
    .first {
      border: 1px solid rgba(201,41,49,1);
    }
    .second {
      border: 1px solid rgba(238,138,20,1);
      margin-left: 1px;
    }
    .third {
      border: 1px solid rgba(0,205,0,1);
      margin-left: 1px;
    }
    .first-text {
      text-align: center;
    }
    .second-text {
      text-align: center;
      margin-left: 5px;
    }
    .third-text {
      margin-left: 3px;
      text-align: center;
    }
    .bg-first {
      background: rgba(201,41,49,1);
    }
    .bg-second {
      background: rgba(238,138,20,1);
    }
    .bg-third {
      background: rgba(0,205,0,1);
    }
    .hidden {
      text-indent:-9999px;
    }
    .yan-tip {
      color: rgba(148, 152, 158);
      font-size: 12px;
    }
  }
</style>
<style lang="less">
  .el-input-group--prepend .el-input__inner {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #94989e;
  }
  .el-input-group__prepend {
    background: #fff;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #94989e;
  }
  .el-input-group__append {
    background: #fff;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #94989e;
  }
</style>
