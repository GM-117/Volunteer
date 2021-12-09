<template>
  <div class="login" style="">
    <img src="@/assets/img/logo-icon.png" class="logo" />
    <div class="login-wrap">
      <div class="login-wrap_left">
        <div class="language-container">
          <span
            :class="{ 'is-active': lang === 'zh' }"
            @click="changeLang('zh')"
            >中</span
          >
          <span
            :class="{ 'is-active': lang === 'en' }"
            @click="changeLang('en')"
            >EN</span
          >
        </div>
        <div style="margin: 16px auto 36px">
          <p class="title">
            {{
              VUE_APP_PRODUCTION_SERVER
                ? $t("system_home_title_test")
                : $t("志愿者管理系统")
            }}
          </p>
          <p class="title">
            {{
              VUE_APP_PRODUCTION_SERVER
                ? $t("system_title_test")
                : $t("")
            }}
          </p>
        </div>
        <div style="margin: 0 auto; width: 320px">
          <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
            <el-tab-pane :label="$t('志愿者')" name="volunteer">
              <el-form ref="volunteer" :model="volunteer" :rules="rules">
                <el-form-item prop="loginName">
                  <el-input
                    v-model.trim="volunteer.loginName"
                    class="userName"
                    @focus="volunteer.logingNameActive = true"
                    @blur="volunteer.logingNameActive = false"
                    placeholder="请输入手机号码"
                  >
                    <img
                      :src="require(`@/assets/images/user1${
                          volunteer.logingNameActive ? '-active' : ''
                        }.png`)"
                      slot="prepend"
                    />
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model.trim="volunteer.password"
                    class="password"
                    :type="volunteer.pwdType"
                    @focus="volunteer.passwordActive = true"
                    @blur="volunteer.passwordActive = false"
                    placeholder="请输入密码"
                  >
                    <img
                      :src="require(`@/assets/images/password1${
                          volunteer.passwordActive ? '-active' : ''
                        }.png`)"
                      slot="prepend"
                    />
                    <img
                      :src="
                        require(`../../assets/images/eye-${
                          volunteer.pwdType === 'password' ? 'close' : 'open'
                        }.png`)
                      "
                      slot="append"
                      @click="openPassword('volunteer')"
                    />
                  </el-input>
                </el-form-item>
                <!-- <el-form-item
                  prop="verifyCode"
                  v-if="Config.verificationSwitch === '1'"
                >
                  <el-input
                    v-model="volunteer.verifyCode"
                    class="userName check-code"
                    @focus="volunteer.checkCodeActive = true"
                    @blur="volunteer.checkCodeActive = false"
                    placeholder="请输入验证码"
                  >
                    <img
                      :src="
                        require(`../../assets/images/vailCode1${
                          volunteer.checkCodeActive ? '-active' : ''
                        }.png`)
                      "
                      width="16px"
                      height="19px"
                      slot="prepend"
                    />
                    <count-down-button
                      v-if="activeName === 'volunteer'"
                      :mobile="volunteer.loginName"
                      slot="append"
                    ></count-down-button>
                  </el-input>
                </el-form-item> -->
              </el-form>
            </el-tab-pane>
            <el-tab-pane :label="$t('工作人员')" name="worker">
              <el-form ref="worker" :model="worker" :rules="rules">
                <el-form-item prop="loginName">
                  <el-input
                    ref="loginName"
                    v-model="worker.loginName"
                    class="userName"
                    autofocus
                    @focus="worker.logingNameActive = true"
                    @blur="worker.logingNameActive = false"
                    placeholder="请输入手机号码"
                  >
                    <img
                      :src="
                        require(`../../assets/images/phone1${
                          worker.logingNameActive ? '-active' : ''
                        }.png`)
                      "
                      slot="prepend"
                    />
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="worker.password"
                    class="password"
                    :type="worker.pwdType"
                    @focus="worker.passwordActive = true"
                    @blur="worker.passwordActive = false"
                    placeholder="请输入密码"
                  >
                    <img
                      :src="
                        require(`../../assets/images/password1${
                          worker.passwordActive ? '-active' : ''
                        }.png`)
                      "
                      slot="prepend"
                    />
                    <img
                      :src="
                        require(`../../assets/images/eye-${
                          worker.pwdType === 'password' ? 'close' : 'open'
                        }.png`)
                      "
                      slot="append"
                      @click="openPassword('worker')"
                    />
                  </el-input>
                </el-form-item>
                <!-- <el-form-item
                  prop="verifyCode"
                  v-if="Config.verificationSwitch === '1'"
                >
                  <el-input
                    v-model="worker.verifyCode"
                    class="userName check-code"
                    @focus="worker.checkCodeActive = true"
                    @blur="worker.checkCodeActive = false"
                    placeholder="请输入验证码"
                  >
                    <img
                      :src="
                        require(`../../assets/images/vailCode1${
                          worker.checkCodeActive ? '-active' : ''
                        }.png`)
                      "
                      width="16px"
                      height="19px"
                      slot="prepend"
                    />
                    <count-down-button
                      v-if="activeName === 'worker'"
                      :mobile="worker.loginName"
                      slot="append"
                    ></count-down-button>
                  </el-input>
                </el-form-item> -->
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <div class="password-container">
            <p
              :class="['remember-password', isCheckPassword ? 'active' : '']"
              @click="isCheckPassword = !isCheckPassword"
            >
              {{ $t("记住密码") }}
            </p>
            <p class="forget-password" @click="forgetPVisibleClick">
              {{ $t("忘记密码") }}
            </p>
          </div>
          <div class="loginButton">
            <el-button type="primary" @click="openDrag">{{
              $t("登录")
            }}</el-button>
          </div>
          <!-- <div
            class="registerButton"
            v-show="activeName === 'volunteer'"
            v-if="Config.systemSetChannel === '1'"
          > -->
          <div
            class="registerButton"
            v-show="activeName === 'volunteer'"
          >
            <el-button type="default" @click="toRegister">{{
              $t("注册")
            }}</el-button>
          </div>
        </div>
        <div class="organize-container" @click="jumpOrganizationLogin">
          志愿组织入口<i class="el-icon-d-arrow-right"></i>
        </div>
      </div>
      <div class="login-wrap_right">
        <div class="notice">{{ $t("通知公告") }}</div>
        <div class="notice-content" v-if="IS_RENDER">
          <div class="onlyRead">
            <div class="div-content">请于明早10:00抵达成都火车北站！</div>
            <quill-editor
              v-model="noticeForm.content"
              disabled
              id="loginQuillEditor"
              :options="editorOption"
              class="editer ql-editor"
            >
            </quill-editor>
            <!-- <textarea class="notice_contant" id="textnames" :value="form.content"></textarea> -->
          </div>
        </div>
        <div class="fileDown">{{ $t("文档下载") }}</div>
        <div class="noFile" v-if="IS_RENDER">
          <!-- <div
            class="file-li"
            v-for="(item, index) in noticeForm.noticeManageFiles"
            :key="index"
          > -->
          <div
            class="file-li"
            :key="index"
          >
            <img
              src="../../assets/images/file.png"
              class="image-style"
              alt=""
            />
            <el-tooltip
              class="item"
              effect="dark"
              content="马拉松报名-PC_2021-05-14T20_56_42 (1).pdf"
              placement="top-start"
            >
              <div
                class="file-style blue-color"
                @click="
                  exportFunc(apis.File_Download, {
                    fileDirectory: item.filePath,
                    fileName: item.fileName,
                  })
                "
              >
                <!-- {{ item.fileName }} -->
                马拉松报名-PC_2021-05-14T20_56_42 (1).pdf
              </div>
            </el-tooltip>
          </div>
          <div
            class="file-li"
            :key="index"
          >
            <img
              src="../../assets/images/file.png"
              class="image-style"
              alt=""
            />
            <el-tooltip
              class="item"
              effect="dark"
              content="新闻报送导出20210531152246 (1).docx"
              placement="top-start"
            >
              <div
                class="file-style blue-color"
                @click="
                  exportFunc(apis.File_Download, {
                    fileDirectory: item.filePath,
                    fileName: item.fileName,
                  })
                "
              >
                <!-- {{ item.fileName }} -->
                新闻报送导出20210531152246 (1).docx
              </div>
            </el-tooltip>
          </div>
          <div
            class="file-li"
            :key="index"
          >
            <img
              src="../../assets/images/file.png"
              class="image-style"
              alt=""
            />
            <el-tooltip
              class="item"
              effect="dark"
              content="社会志愿者导入模板(2).xlsx"
              placement="top-start"
            >
              <div
                class="file-style blue-color"
                @click="
                  exportFunc(apis.File_Download, {
                    fileDirectory: item.filePath,
                    fileName: item.fileName,
                  })
                "
              >
                <!-- {{ item.fileName }} -->
                社会志愿者导入模板(2).xlsx
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <!-- ipc备案 -->
    <!-- <div class="ipc">ipc备案</div> -->
    <forget-password :forgetPVisible.sync="forgetPVisible"></forget-password>
    <!-- 滑块验证码组件 -->
    <drag ref="drag" @close="closeDrag"></drag>
    <!-- 修改密码弹窗 -->
    <update-password-dialog
      ref="updatePassword"
      :Language="Language"
      :show="updatePassword.visible"
      @closeDialog="changeChangeDialog"
      :isStatus="updatePassword.isStatus"
      :isCreate="true"
      :oldPassword="oldPassword"
    ></update-password-dialog>
  </div>
</template>

<script>
import md5 from "js-md5";
import CryptoJS from "crypto-js";
import { mapState, mapActions } from "vuex";
import mixin from "@/mixins/index";
import apis from "@/apis";
import Cookie from "@/assets/js/cookie";
import drag from "@/components/drag.vue";
// import countDownButton from "@/components/count-down-button.vue";
import { Login, Rules } from "./userLoginClass";
import forgetPassword from "./components/forgetPasswordDialog.vue";
import updatePasswordDialog from "../dialog/updatePasswordDialog.vue";
import store from "@/store/index";
// import Simditor from 'simditor'
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  mixins: [mixin],
  components: {
    forgetPassword,
    drag,
    // countDownButton,
    updatePasswordDialog,
    quillEditor,
  },
  data() {
    return {
      editorOption: {
        // 初始化富文本编辑器
        placeholder: "",
        modules: {
          toolbar: [
            // ['bold', 'italic', 'underline', 'strike'],
            // [{ 'header': 1 }, { 'header': 2 }],
            // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            // [{ 'indent': '-1' }, { 'indent': '+1' }],
            // [{ 'align': [] }],
            // [{ 'color': [] }, { 'background': [] }],
            // [{ 'font': [] }],
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            // ['blockquote', 'code-block'],
            // [{ 'size': ['small', false, 'large', 'huge'] }],
          ],
        },
      },
      activeName: "volunteer",
      rules: new Rules(this),
      volunteer: new Login(),
      worker: new Login(),
      volunteerOrg: new Login(),
      isCheckPassword: false,
      forgetPVisible: false,
      lang: "zh",
      oldPassword: "",
      form: {
        loginName: "",
        password: "",
      },
      updatePassword: {
        visible: false,
        isStatus: true,
      },
      USER: new Cookie("userName"), // 实例化  账号cookie
      PASSWORD: new Cookie("password"), // 密码 cookie
      ISCHECKED: new Cookie("check"), // 记住密码是否勾选 cookie
      USERLOGINTYPE: new Cookie("userLoginType"), // 用户类型
      IS_RENDER: true,
      sliderVerifyCode: "",
      noticeForm: {
        content: "",
        noticeManageFiles: "",
      },
    };
  },
  computed: {
    ...mapState([
      "timestampDiff",
      "Config",
      "VUE_APP_LOGO_BASE_URL",
      "VUE_APP_PRODUCTION_SERVER",
      "Language",
    ]),
  },
  activated() {
    this.getNotice();
  },
  mounted() {
    this.$refs.loginName.focus();
    this.initLogin();
    this.getNotice();
  },
  methods: {
    // 创建中文的富文本
    // createEditor() {
    //   this.editor = new Simditor({
    //     textarea: document.getElementById("textnames"),
    //     toolbar: this.toolbar,
    //     pasteImage: false, //是否允许粘贴上传图片，依赖 upload 选项，仅支持 Firefox 和 Chrome 浏览器。
    //     tabIndent: true, //是否在编辑器中使用 tab 键来缩进
    //   })
    //   this.editor.setValue(this.form.content)
    //   this.editor.on("valuechanged", () => {
    //     this.form.content = this.editor.getValue()
    //   }) //valuechanged是simditor自带获取值得方法
    // },
    /**
     * @function 获取通知和文档下载内容
     */
    getNotice() {
      this.$http.post(apis.NoticeManage_LoginNotice).then((res) => {
        if (res.data.code === 200) {
          this.noticeForm.content = res.data.data.content;
          this.noticeForm.noticeManageFiles = res.data.data.noticeManageFiles;
          // this.createEditor()
          this.IS_RENDER = false;
          this.$nextTick(() => {
            this.IS_RENDER = true;
          });
        }
      });
    },
    /**
     * @function 改变新增/修改弹窗的状态
     * @param {Boolean} dialogStatus 是否展示当前弹窗
     */
    changeChangeDialog(dialogStatus, isStatus = true) {
      this.updatePassword.visible = dialogStatus;
      this.updatePassword.isStatus = isStatus;
    },
    handleClick(val) {
      this.activeName = val.name;
      this.initLogin();
    },
    openPassword(val) {
      switch (val) {
        case "volunteer":
          this.volunteer.pwdType =
            this.volunteer.pwdType === "password" ? "text" : "password";
          break;
        case "worker":
          this.worker.pwdType =
            this.worker.pwdType === "password" ? "text" : "password";
          break;
        case "volunteerOrg":
          this.volunteerOrg.pwdType =
            this.volunteerOrg.pwdType === "password" ? "text" : "password";
          break;
        default:
      }
    },
    /**
     * @function 中英文切换
     * @param {String} lang 要切换的语言
     */
    changeLang(lang) {
      // this.$i18n.locale = lang
      this.lang = lang;
      // this.setLanguage(lang === "en" ? 1 : 0);
    },
    forgetPVisibleClick() {
      this.forgetPVisible = true;
    },
    ...mapActions({
      Login: "Login",
      LoginOut: "LoginOut",
      setLanguage: "setLanguage",
    }),
    /**
     * @function 初始化登录页面，取出记住的密码等
     */
    initLogin() {
      this.LoginOut();
      // this.activeName = this.USERLOGINTYPE.getCookie() || "worker";
      if (this.ISCHECKED.getCookie() === "1") {
        // 判断记住密码是否勾选
        this.isCheckPassword = true;
        if (this.USER.getCookie() !== null && this.USER.getCookie() !== "0") {
          // 判断cookie中是否有保存账号
          this.form.loginName = this.USER.getCookie();
        }
        if (
          this.PASSWORD.getCookie() !== null &&
          this.PASSWORD.getCookie() !== "0"
        ) {
          // 判断cookie中是否有保存密码
          const KEY = "1234567890123456";
          const IV = "1234567891012345";
          this.form.password = this.decrypt(this.PASSWORD.getCookie(), KEY, IV);
        }
        switch (this.activeName) {
          case "volunteer":
            this.volunteer = Object.assign({}, this.volunteer, this.form);
            break;
          case "worker":
            this.worker = Object.assign({}, this.worker, this.form);
            break;
          case "volunteerOrg":
            this.volunteerOrg = Object.assign({}, this.volunteerOrg, this.form);
            break;
          default:
            return false;
        }
      }
      return this.form;
    },
    /**
     * @function 唤醒滑块验证码
     */
    openDrag() {
      this.$refs[this.activeName].validate((valid) => {
        if (valid) {
          // this.Config.verificationSwitch === "1"
          if (this.Config.loginSlider) {
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
        this.sliderVerifyCode = sliderVerifyCode;
        this.loginSubmit();
      }
    },
    /**
     * @function 去注册页面
     * @param {Number}
     */
    toRegister() {
      this.$router.push("../Register");
    },
    /**
     * @function 提交登录
     * @description 一般在滑块验证码通过后调用，因为滑块验证码还没好，先跳过验证码
     */
    loginSubmit() {
      this.$refs[this.activeName].validate((valid) => {
        if (valid) {
          const formData = {};
          switch (this.activeName) {
            case "volunteer":
              formData.loginName = this.volunteer.loginName;
              formData.password = this.volunteer.password;
              formData.verifyCode = this.volunteer.verifyCode;
              this.oldPassword = this.volunteer.password;
              break;
            case "worker":
              formData.loginName = this.worker.loginName;
              formData.password = this.worker.password;
              formData.verifyCode = this.worker.verifyCode;
              this.oldPassword = this.worker.password;
              break;
            case "volunteerOrg":
              formData.loginName = this.volunteerOrg.loginName;
              formData.password = this.volunteerOrg.password;
              this.oldPassword = this.worker.password;
              break;
            default:
              formData.loginName = "";
              formData.password = "";
              this.oldPassword = "";
          }
          this.form = { ...formData };
          const timestamp = new Date().getTime() + this.timestampDiff;
          formData.timestamp = timestamp;
          const salt = "fd#O@7Ej0.U4P2^i";
          const newPass = md5(timestamp + salt);
          const aes = newPass.substring(0, 16);
          const iv = newPass.substring(16);
          formData.sliderVerifyCode = this.sliderVerifyCode;
          formData.password = this.encrypt(formData.password, aes, iv);
          this.$http
            .post(
              this.activeName !== "worker"
                ? apis.Auth_Login
                : apis.Auth_LoginByWork,
              formData
            )
            .then((res) => {
              if (res.data.code === 200) {
                const data = { ...res.data.data };
                data.token = res.headers["x-xsrf-token"];
                store.commit("setUserType", res.data.data.userType);
                this.rememberPassword();
                this.Login(data);
                if (this.activeName === "worker") {
                  // 工作人员
                  this.$router.push("../welcome");
                } else if (this.activeName === "volunteer") {
                  // 志愿者
                  this.$router.push({ name: "Application" }); // 我的报名
                }
              } else if (res.data.code === 311) {
                // 如果是新用户需要先修改密码
                store.commit("setToken", res.headers["x-xsrf-token"]);
                this.changeChangeDialog(true, true);
              } else if (res.data.code === 312) {
                store.commit("setToken", res.headers["x-xsrf-token"]);
                this.changeChangeDialog(true, false);
              }
            });
        }
      });
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
    /**
     * @function 记住密码
     */
    rememberPassword() {
      if (this.isCheckPassword) {
        this.USER.setCookie(this.form.loginName, 7); // cookie 保存账号
        const str = this.encrypt(
          this.form.password,
          "1234567890123456",
          "1234567891012345"
        );
        this.PASSWORD.setCookie(str, 7); // cookie 保存密码
        // this.PASSWORD.setCookie((this.md5Password === this.user.password ? this.user.password : md5(this.user.password)), 7) // cookie 保存密码
        this.ISCHECKED.setCookie("1", 7); // cookie 保存勾选状态
        this.USERLOGINTYPE.setCookie(this.activeName, 7); // cookie 保存用户类型
      } else {
        this.form.loginName = "";
        this.form.password = "";
        this.USER.delCookie(); // 删除 cookie
        this.PASSWORD.delCookie();
        this.ISCHECKED.delCookie();
      }
    },
    jumpOrganizationLogin() {
      this.$router.push({
        path: "/organizationLogin",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.notice_contant {
  // 注意，这里的公告内容样式被写了，如果下次要用富文本记得关闭
  width: calc(100% - 20px);
  height: 360px;
  background: rgba(255, 255, 255, 0.7);
  padding: 10px;
  overflow: auto;
}
/deep/ .el-form-item {
  padding-top: 20px;
}
.login {
  background: #fff url("../../assets/img/bg2.jpg") center top no-repeat;
  width: 100%;
  min-height: 100vh;
  background-size: cover !important;
  background-attachment: fixed !important;
  position: relative;
  .logo {
    position: absolute;
    top: 33px;
    left: 52px;
    width: 233px;
    height: 92px;
  }
  .login-wrap {
    margin: 0 auto;
    width: 1300px;
    height: 100vh;
    display: flex;
    align-items: center;
  }
  .login-wrap_left {
    box-sizing: border-box;
    height: 720px;
    width: 500px;
    padding: 13px 20px;
    background: #ffffff;
    position: relative;
    .title {
      line-height: 1.5;
      font-size: 24px;
      color: #333333;
      text-align: center;
    }
    .loginButton button {
      border-color: #3b8ace;
      display: block;
      width: 100%;
      font-size: 16px;
      margin: 20px 0;
      color: #fff;
      letter-spacing: 5px;
      &:hover {
        border-color: #95ceff;
        background-color: #95ceff;
        color: #fff;
      }
    }
    .registerButton button {
      border-color: #3b8ace;
      display: block;
      width: 100%;
      font-size: 16px;
      margin: 20px 0;
      color: #3b8ace;
      letter-spacing: 5px;
      background: #fff;
      &:hover {
        border-color: #95ceff;
        background-color: #95ceff;
        color: #fff;
      }
    }
  }
  .login-wrap_right {
    box-sizing: border-box;
    width: 728px;
    height: 720px;
    background: rgba(255, 255, 255, 0.85);
    padding: 20px;
    .notice {
      width: 100%;
      text-align: center;
      font-size: 22px;
      font-weight: 500;
      color: #242d41;
      letter-spacing: 2px;
      line-height: 50px;
    }
    .notice-content {
      height: 433px;
      overflow-y: scroll;
    }
    .onlyRead {
      pointer-events: none;
    }
    .fileDown {
      font-size: 16px;
      font-weight: 500;
      color: #242d41;
      line-height: 54px;
      letter-spacing: 1px;
    }
    .noFile {
      height: 96px;
      overflow: auto;
    }
    .file-li {
      width: calc(33% - 30px);
      margin-right: 30px;
      float: left;
      margin-bottom: 10px;
      line-height: 22px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(1, 159, 194, 1);
    }
    .image-style {
      float: left;
      padding: 3px 1px 0 0;
    }
    .file-style {
      float: left;
      padding-left: 7px;
      cursor: pointer;
      width: calc(100% - 31px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.language-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  span {
    width: 28px;
    height: 32px;
    font-size: 14px;
    color: #fff;
    background-color: #3b8ace;
    opacity: 0.2;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    &.is-active {
      background-color: #3b8ace;
      opacity: 1;
    }
    &:first-child {
      border-radius: 2px 0px 0px 2px;
    }
    &:last-child {
      border-radius: 0px 2px 2px 0px;
    }
  }
}
.password-container {
  height: 30px;
  line-height: 30px;
  margin-bottom: 7px;
  .remember-password {
    display: block;
    float: left;
    padding-left: 26px;
    font-size: 14px;
    cursor: pointer;
    color: #666;
    background: url(../../assets/images/remeber.png) left center no-repeat;
    &.active {
      color: #666;
      background: url(../../assets/images/remeber-active.png) left center no-repeat;
    }
  }
  .forget-password {
    float: right;
    padding-left: 26px;
    font-size: 14px;
    cursor: pointer;
    color: #666;
  }
}
.organize-container {
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  // margin: 45px 0 0 -20px;
  padding-left: 24px;
  width: 500px;
  height: 54px;
  line-height: 54px;
  background-color: #d8e8f5;
  color: #3b8ace;
  &:hover {
    cursor: pointer;
  }
}
</style>
<style lang="less">
.userName.el-input-group--prepend,
.password.el-input-group--prepend {
  .el-input__inner,
  .el-input-group__append,
  .el-input-group__prepend {
    background: #fff;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #94989e;
    padding: 0 5px;
  }
  .el-input__inner {
    padding-left: 5px;
  }
}
.el-tabs__item {
  color: #94989e;
}
.el-tabs__item.is-active {
  color: #218dff;
}
.el-button--primary:hover,
.el-button--primary:focus {
  background: rgb(192, 222, 255);
  border-color: rgb(192, 222, 255);
}
.el-tabs__active-bar {
  background-color: #218dff;
}
.userName.el-input-group--prepend .el-input__inner,
.password.el-input-group--prepend .el-input__inner,
.userName.el-input-group--prepend .el-input-group__append,
.password.el-input-group--prepend .el-input-group__append,
.userName.el-input-group--prepend .el-input-group__prepend,
.password.el-input-group--prepend .el-input-group__prepend {
  background: none;
  color: #000;
}
input::-webkit-input-placeholder {
  color: #fff;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fff;
}
input::-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fff;
}
input::-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #fff;
}
.login {
  .simditor-toolbar {
    display: none !important;
  }
}
</style>
<style lang="less">
#loginQuillEditor {
  .ql-toolbar.ql-snow {
    border: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    // padding: 8px;
  }
  .ql-container.ql-snow {
    border: none;
  }
}
.div-content{
  margin-top: 85px; 
  margin-left: 25px;
  font-size: 14px
}
</style>
