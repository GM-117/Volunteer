<template>
  <div class="organization-login" >
    <div class="login-container">
      <div class="login-back">
        <span style="cursor: pointer;" @click="backLogin">
          <i class="el-icon-d-arrow-left"></i>
          {{ $t("返回") }}
        </span>
      </div>
      <p class="login-title">{{ $t("志愿者登录") }}</p>
      <el-form ref="form" :model="form" :rules="rules" class="login-form">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" @focus="mobileFocus = true" @blur="mobileFocus = false" placeholder="请输入手机号" >
            <template slot="prepend">
              <img :src="mobileFocus ? require('../../assets/images/phone1-active.png') : require('../../assets/images/phone1.png')" alt="">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" :type="checkPassword ? 'text' : 'password'" @focus="passwordFocus = true" @blur="passwordFocus = false" placeholder="请输入密码" >
            <template slot="prepend">
              <img :src="passwordFocus ? require('../../assets/images/password1-active.png') : require('../../assets/images/password1.png')" alt="">
            </template>
            <template slot="append">
              <img :src="checkPassword ? require('../../assets/images/eye-open.png') : require('../../assets/images/eye-close.png')" alt="" @click.stop="checkPassword = !checkPassword">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="verifyCode" v-if="Config.verificationSwitch === '1'">
          <el-input v-model="form.verifyCode" class="userName check-code" :placeholder="$t('QSRYZM')">
            <img :src="
                require(`../../assets/images/vailCode1${
                  form.checkCodeActive ? '-active' : ''
                }.png`)
              " width="16px" height="19px" slot="prepend" />
            <count-down-button :mobile="form.mobile" slot="append"></count-down-button>
          </el-input>
        </el-form-item>
        <div class="password-container">
          <p
            :class="['remember-password', rememberPassword ? 'active' : '']"
            @click="rememberPassword = !rememberPassword"
          >
            {{ $t("JJMM") }}
          </p>
          <p class="forget-password" @click="changeForgetDialog(true)">
            {{ $t("WJMM") }}
          </p>
        </div>
        <el-button type="primary" class="login-button" @click="openDrag()">{{ $t("LOGIN") }}</el-button>
        <el-button type="defalut" class="register-button" @click="changeRegisterDialog(true)">{{ $t("REGISTER") }}</el-button>
      </el-form>
    </div>
    <!-- 忘记密码弹窗 -->
    <forget-dialog ref="forgetDialog" :show="forgetPopup.show" @closeDialog="changeForgetDialog"></forget-dialog>
    <!-- 注册弹窗 -->
    <register-dialog ref="registerDialog" :show="registerPopup.show" @closeDialog="changeRegisterDialog"></register-dialog>
    <!-- 滑块验证码组件 -->
    <drag ref="drag" @close="closeDrag"></drag>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import forgetDialog from './components/forgetDialog.vue'
import registerDialog from './components/registerDialog.vue'
import CryptoJS from "crypto-js";
import store from "@/store/index";
import apis from "@/apis";
import md5 from "js-md5";
import Cookie from "@/assets/js/cookie";
import drag from "@/components/drag.vue";
import countDownButton from "@/components/count-down-button.vue";

// import Cookie from "@/assets/js/cookie";
export default {
  components: {
    forgetDialog,
    registerDialog,
    drag,
    countDownButton,
  },
  mounted() {
    this.initLogin();
  },
  data() {
    return {
      activeName: "volunteerOrg",
      mobileFocus: false, // 手机号是否聚焦
      passwordFocus: false, // 密码是否聚焦
      checkPassword: false, // 查看密码状态
      rememberPassword: false, // 是否记住密码
      form: {
        mobile: '',
        password: '',
        // verifyCode:'',
      },
      rules: {
        mobile: { required: true, message: "请输入手机号", trigger: 'blur' },
        password: { required: true, message: "请输入密码", trigger: 'blur' },
        verifyCode: { required: true, message: "请输入验证码", trigger: 'blur' },
      },
      forgetPopup: {
        show: false,
      },
      registerPopup: {
        show: false,
      },
      ORGUSER: new Cookie("orguserName"), // 实例化  账号cookie
      ORGPASSWORD: new Cookie("orgpassword"), // 密码 cookie
      ORGISCHECKED: new Cookie("orgcheck"), // 记住密码是否勾选 cookie
      USERLOGINTYPE: new Cookie("userLoginType"), // 用户类型
      IS_RENDER: true,
      sliderVerifyCode: '',
    }
  },
  computed: {
    ...mapState([
      "VUE_APP_LOGO_BASE_URL",
      "timestampDiff",
      "Config",
    ]),
  },
  methods: {
    // 打开忘记密码弹窗
    changeForgetDialog(dialogStatus) {
      this.forgetPopup.show = dialogStatus
    },
    // 打开注册弹窗
    changeRegisterDialog(dialogStatus) {
      this.registerPopup.show = dialogStatus
    },
    backLogin() {
      this.$router.back(-1)
    },
    /**
     * @function 唤醒滑块验证码
     */
    openDrag() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.Config.verificationSwitch === "1") {
            this.$refs.drag.open();
          } else {
            this.loginSubmit();
          }
        }
      });
    },
    /**
     * @function 验证码关闭
     * @param {Number} status 1是成功，0是失败
     */
     closeDrag(status, sliderVerifyCode) {
      if (status) {
        this.sliderVerifyCode = sliderVerifyCode
        this.loginSubmit();
      }
    },
    /**
     * @function 提交登录
     * @description 一般在滑块验证码通过后调用，因为滑块验证码还没好，先跳过验证码
     */
    loginSubmit() {
      this.$refs["form"].validate((valid) => {
        const formData = {};
        if (valid) {
          formData.loginName = this.form.mobile;
          formData.password = this.form.password;
          formData.verifyCode = this.form.verifyCode;
        }
          const timestamp = new Date().getTime() + this.timestampDiff;
          formData.timestamp = timestamp;
          const salt = "fd#O@7Ej0.U4P2^i";
          const newPass = md5(timestamp + salt);
          const aes = newPass.substring(0, 16);
          const iv = newPass.substring(16);
          formData.password = this.encrypt(formData.password, aes, iv);
          formData.sliderVerifyCode = this.sliderVerifyCode
          this.$http.post(apis.Auth_LoginByOrganization, formData)
            .then((res) => {
              if (res.data.code === 200) {
                const data = { ...res.data.data };
                data.token = res.headers["x-xsrf-token"];
                this.rememberPass();
                this.Login(data);
                this.$router.push("../welcome");
              } else if (res.data.code === 311) {
                // 如果是新用户需要先修改密码
                store.commit("setToken", res.headers["x-xsrf-token"]);
                this.changeChangeDialog(true);
              }
            });
        })
        return "";
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
    /**
     * @function 对登录的时候密码进行解密
     * @param {String} word 要被解密的文本
     * @param {String} keyStr 密钥
     * @param {String} ivStr  偏移量
     * @returns {String} 返回解密后的文本
     */
    decrypt(word, keyStr, ivStr) {
      // 解密
      const key = CryptoJS.enc.Utf8.parse(keyStr);
      const iv = CryptoJS.enc.Utf8.parse(ivStr);
      const decrypt = CryptoJS.AES.decrypt(word, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      const decryptedStr = CryptoJS.enc.Utf8.stringify(decrypt).toString();
      return decryptedStr;
    },
    rememberPass() {
      if (this.rememberPassword) {
        this.ORGUSER.setCookie(this.form.mobile, 7); // cookie 保存账号
        const str = this.encrypt(
          this.form.password,
          "1234567890123456",
          "1234567891012345",
        );
        this.ORGPASSWORD.setCookie(str, 7); // cookie 保存密码
        // this.ORGPASSWORD.setCookie((this.md5Password === this.user.password ? this.user.password : md5(this.user.password)), 7) // cookie 保存密码
        this.ORGISCHECKED.setCookie("1", 7); // cookie 保存勾选状态
        this.USERLOGINTYPE.setCookie(this.activeName, 7); // cookie 保存用户类型
      } else {
        this.form.loginName = "";
        this.form.password = "";
        this.ORGUSER.delCookie(); // 删除 cookie
        this.ORGPASSWORD.delCookie();
        this.ORGISCHECKED.delCookie();
      }
    },
    initLogin() {
      this.LoginOut();
      // this.activeName = this.USERLOGINTYPE.getCookie() || "worker";
      if (this.ORGISCHECKED.getCookie() === "1") {
        // 判断记住密码是否勾选
        this.rememberPassword = true;
        if (this.ORGUSER.getCookie() !== null && this.ORGUSER.getCookie() !== "0") {
          // 判断cookie中是否有保存账号
          this.form.mobile = this.ORGUSER.getCookie();
          console.log(this.form.mobile, "mobile")
        }
        if (
          this.ORGPASSWORD.getCookie() !== null
          && this.ORGPASSWORD.getCookie() !== "0"
        ) {
          // 判断cookie中是否有保存密码
          const KEY = "1234567890123456";
          const IV = "1234567891012345";
          this.form.password = this.decrypt(this.ORGPASSWORD.getCookie(), KEY, IV);
        }
      }
        return this.form;
    },
    ...mapActions({
      Login: "Login",
      LoginOut: "LoginOut",
    }),
  },
}
</script>

<style lang="less" scoped>
/deep/ .login-container .el-input {
  border-bottom: thin solid #94989e;
}
/deep/ .login-container .el-input__inner {
  border: none;
}
/deep/ .login-container .el-input-group__append,
/deep/ .login-container .el-input-group__prepend {
  border: none;
  padding: 0 5px;
  background-color: inherit;
}
/deep/ .login-container .el-button {
  display: block;
  width: 100%;
  margin: 15px 0 0;
  border-color: #3B8ACE;
  font-size: 16px;
  letter-spacing: 5px;
  &.login-button {
    color: #FFF;
  }
  &.register-button {
    color: #3B8ACE;
  }
  &:hover {
    border-color: #95CEFF;
    background-color: #95CEFF;
    color: #FFF;
  }
}
.organization-login {
  background: #fff url("../../assets/img/bg2.jpg") center top no-repeat;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-container {
    width: 500px;
    height: 564px;
    background-color: #FFF;
    .login-back {
      padding-left: 14px;
      height: 54px;
      line-height: 54px;
      color: #3B8ACE;
      background-color: #D8E8F5;
    }
    .login-title {
      margin: 45px 0;
      font-size: 24px;
      color: #333;
      font-weight: 500;
      text-align: center;
    }
    .login-form {
      padding: 0 90px;
    }
  }
}
.password-container {
  height: 30px;
  line-height: 30px;
  margin-bottom: 50px;
  .remember-password {
    display: block;
    float: left;
    padding-left: 26px;
    font-size: 14px;
    cursor: pointer;
    color: #666;
    // background: url(../../assets/images/remeber.png) left center no-repeat;
    &.active {
      // background: url(../../assets/images/remeber-active.png) left center no-repeat;
    }
  }
  .forget-password {
    float: right;
    font-size: 14px;
    cursor: pointer;
    color: #666;
  }
}
</style>
