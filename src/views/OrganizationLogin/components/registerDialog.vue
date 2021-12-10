<!--
 * @Author: guojinhu
 * @Date: 2021-05-12 17:17:36
 * @LastEditTime: 2021-06-29 10:20:47
 * @LastEditors: XUnz
 * @Description: 描述
 * @FilePath: \frontend\src\views\OrganizationLogin\components\registerDialog.vue
-->
<template>
  <el-dialog
    :title="$t('组织信息填写')"
    :visible.sync="show"
    @open="openDialog"
    :before-close="closeDialog"
    :close-on-click-modal="false"
    center
    width="50%"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="200px"
      :rules="rules"
      size="mini"
    >
      <el-form-item :label="$t('志愿组织名称')" prop="organizationName">
        <el-input v-model="form.organizationName"></el-input>
      </el-form-item>
      <el-form-item :label="$t('负责人姓名')" prop="personInCharge">
        <el-input v-model="form.personInCharge"></el-input>
      </el-form-item>
      <el-form-item :label="$t('联系电话')" prop="picMobile">
        <el-input v-model="form.picMobile"></el-input>
      </el-form-item>
      <el-form-item :label="$t('成立日期')" prop="foundDate">
        <el-date-picker
          v-model="form.foundDate"
          type="date"
          value-format="yyyy-MM-dd"
          style="width: 100%"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('组织规模')" prop="volunteerNum">
        <el-input v-model="form.volunteerNum"></el-input>
      </el-form-item>
      <el-form-item :label="$t('QQ群')" prop="qqGroup">
        <el-input v-model="form.qqGroup"></el-input>
      </el-form-item>
      <el-form-item :label="$t('邮编')" prop="postCode">
        <el-input v-model="form.postCode"></el-input>
      </el-form-item>
      <el-form-item :label="$t('传真')" prop="fax">
        <el-input v-model="form.fax"></el-input>
      </el-form-item>
      <el-form-item :label="$t('服务领域')" prop="serviceScope">
        <el-checkbox-group v-model="form.serviceScope" :max="4">
          <el-checkbox
            v-for="item in serviceScope"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item :label="$t('志愿经历')" prop="serviceExperience">
        <el-input
          type="textarea"
          v-model="form.serviceExperience"
          :maxlength="500"
          show-word-limit
          :autosize="{ minRows: 3 }"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('详细地址')" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item :label="$t('手机号（账号)')" prop="phone">
        <el-input v-model="form.phone">
          <button
            slot="append"
            class="verifi"
            v-if="isShowVerifyCode"
            @click.prevent="handleBtn"
            :disabled="countTime < 60"
          >
            {{ countTime === 60 ? "获取验证码" : `${countTime}s` }}
          </button>
        </el-input>
      </el-form-item>
      <!-- <el-form-item :label="$t('YZM')" prop="verifyCode" v-if="isShowVerifyCode">
        <el-input v-model="form.verifyCode">
        </el-input>
      </el-form-item> -->
      <el-form-item :label="$t('身份账号')" prop="credentialNo">
        <el-input v-model="form.credentialNo"></el-input>
      </el-form-item>
      <el-form-item :label="$t('微信')" prop="wechat">
        <el-input v-model="form.wechat"></el-input>
      </el-form-item>
      <el-form-item :label="$t('邮箱')" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item :label="$t('密码')" prop="password">
        <el-input
          v-model="form.password"
          @input="checkData"
          @focus="tipVisible = true"
          @blur="tipVisible = false"
          type="password"
        >
          <img
            src="@/assets/images/xiangqing-3.png"
            slot="append"
            @click="tipVisible = !tipVisible"
          />
        </el-input>
        <el-popover placement="bottom" trigger="manual" v-model="tipVisible">
          <p>
            <i
              v-show="form.password"
              :class="errorFlag1 ? 'el-icon-close' : 'el-icon-check'"
            ></i
            >密码长度8-18个字符;
          </p>
          <p>
            <i
              v-show="form.password"
              :class="errorFlag3 ? 'el-icon-close' : 'el-icon-check'"
            ></i
            >同时包含数字、字母和特殊符号组合;
          </p>
          <p>
            <i
              v-show="form.password"
              :class="errorFlag4 ? 'el-icon-close' : 'el-icon-check'"
            ></i
            >不能包含连续3位相同/递增(减)的数字;
          </p>
        </el-popover>
      </el-form-item>
      <el-form-item :label="$t('确认密码')" prop="checkpass">
        <el-input v-model="form.checkpass" type="password"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="closeDialog" type="info">{{ $t("取消") }}</el-button>
      <el-button @click="sureEvent" type="primary">{{ $t("确认") }}</el-button>
    </template>
    <!-- 滑块验证码组件 -->
    <drag ref="drag" @close="closeDrag"></drag>
  </el-dialog>
</template>

<script>
import mixin from "@/mixins/dialogMixin";
import { RegForm, Rules } from "../organizaRegisterClass";
import apis from "@/apis";
import CryptoJS from "crypto-js";
import { mapState } from "vuex";
import md5 from "js-md5";
import store from "@/store/index";
import drag from "@/components/drag.vue";

export default {
  mixins: [mixin],
  components: { drag },
  data() {
    return {
      form: new RegForm(),
      rules: new Rules(this),
      tipVisible: false,
      test: true,
      countTime: 60,
      isSendVerifyCode: !this.isShowVerifyCode,
      sliderVerifyCode: "",
      errorFlag1: false, // 验证标识 false为验证通过，true为验证不通过
      errorFlag2: false, // 验证标识 false为验证通过，true为验证不通过
      errorFlag3: false, // 验证标识 false为验证通过，true为验证不通过
      errorFlag4: false, // 验证标识 false为验证通过，true为验证不通过
      serviceScope: [
        { label: "抵离服务", value: "1" },
        { label: "礼宾接待", value: "2" },
        { label: "语言服务", value: "3" },
        { label: "交通引导服务", value: "4" },
        { label: "保卫安全", value: "5" },
        { label: "医疗卫生", value: "6" },
        { label: "医疗卫生", value: "7" },
        { label: "观众服务", value: "8" },
        { label: "竞赛组织支持", value: "9" },
        { label: "场馆运行支持", value: "10" },
        { label: "运动员村运行支持", value: "11" },
        { label: "新闻运行支持", value: "12" },
        { label: "活动文化支持", value: "13" },
        { label: "特许商品推广支持", value: "14" },
        { label: "其他工作岗位", value: "15" },
      ],
    };
  },
  props: {
    show: {
      required: true,
      type: Boolean,
    },
  },
  created() {
    this.getDro();
    this.init();
  },
  computed: {
    ...mapState(["timestampDiff", "Config"]),
    tipVisiblePop: {
      get() {
        return this.tipVisible || this.tipVisible1;
      },
      set(val) {
        return val;
      },
    },
    // 判断是否显示验证码
    isShowVerifyCode() {
      if (this.Config.verificationSwitch === "0") {
        return false;
      }
      return true;
    },
  },
  methods: {
    init() {
      this.$refs["form"].resetFields();
      this.form = new RegForm();
    },
    // 获取字典
    getDro() {
      this.$http
        .post(apis.OptionConfig_GetDictZyzServicePosition, {
          dictGroups: ["ZYZ_SERVICE_POSITION"],
        })
        .then((res) => {
          if (res.data.code === 200) {
            const { data } = res.data;
            const newDict = { ...store.state.DROPDOWNBOX, ...data };
            store.commit("setDropDownbox", newDict);
          }
        });
    },
    sureEvent() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.registeredAccount();
        }
      });
    },
    checkData() {
      // 如果密码正确不弹出提示，点击感叹号弹出提示
      let flag = false;
      this.errorList = [];
      const allNumberList = [
        "111",
        "222",
        "333",
        "444",
        "555",
        "666",
        "777",
        "888",
        "999",
        "000",
        "012",
        "123",
        "234",
        "345",
        "456",
        "567",
        "678",
        "789",
        "098",
        "987",
        "876",
        "765",
        "654",
        "543",
        "432",
        "321",
        "210",
      ];
      const reg1 = /^\S{8,18}$/; // 密码长度8-18个字符
      const reg2 = /^(?![^ ]+$)(?![\u4e00-\u9fa5]{0,}$)/; // 不能包含空格、中文
      const reg3 =
        /^(?![0-9]+$)(?![a-zA-Z]+$)(?![\W_]+$)(?![0-9a-zA-Z]+$)(?![0-9\W_]+$)(?![a-zA-Z\W_]+$)/; // 同时包含数字/字母/符号两种组合
      this.errorFlag1 = !reg1.test(this.form.password);
      this.errorFlag2 = reg2.test(this.form.password);
      this.errorFlag3 = !reg3.test(this.form.password);
      for (const i in allNumberList) {
        if (this.form.password.includes(allNumberList[i])) {
          this.errorFlag4 = true;
          flag = true;
          break;
        }
      }
      if (!flag) {
        this.errorFlag4 = false;
      }
    },
    /* @function 验证码关闭
     * @param {Number} status 1是成功，0是失败
     */
    closeDrag(status, sliderVerifyCode) {
      if (status) {
        this.sliderVerifyCode = sliderVerifyCode;
        this.getValidateCode();
      }
    },
    // 打开滑块
    openDrag() {
      if (this.Config.verificationSwitch === "1") {
        this.$refs.drag.open();
      } else {
        this.getValidateCode(); // 获取验证码();
      }
    },
    /**
     * 获取验证码
     */
    handleBtn() {
      if (this.form.phone) {
        const reg = /^1[3456789]\d{9}$/;
        if (reg.test(this.form.phone)) {
          this.openDrag(); //  打开弹窗
        }
      } else {
        this.$message.error("电话号码不能为空");
      }
    },
    getValidateCode() {
      const interval = setInterval(() => {
        this.countTime -= 1;
        if (this.countTime === 0) {
          this.countTime = 60;
          clearInterval(interval);
        }
      }, 1000);
      const reqData = {
        mobile: "",
        sliderVerifyCode: this.sliderVerifyCode,
      };
      // 获取验证码
      reqData.mobile = this.form.phone;
      this.$http.post(apis.Auth_SendVerifyCode, reqData).then((res) => {
        if (res.data.code === 200) {
          this.isSendVerifyCode = true;
        }
      });
    },
    /**
     * 注册账号
     */
    registeredAccount() {
      if (this.isSendVerifyCode) {
        const formData = {
          ...this.form,
        };
        const timestamp = new Date().getTime() + this.timestampDiff;
        formData.volunteerNum = parseInt(this.form.volunteerNum, 10);
        formData.timestamp = timestamp;
        const salt = "fd#O@7Ej0.U4P2^i";
        const newPass = md5(timestamp + salt);
        const aes = newPass.substring(0, 16);
        const iv = newPass.substring(16);
        formData.sliderVerifyCode = this.sliderVerifyCode;
        formData.password = this.encrypt(formData.password, aes, iv);
        this.$http
          .post(apis.Auth_ZyzOrganizationRegistration, formData)
          .then((res) => {
            if (res.data.code === 200) {
              this.closeDialog();
            }
          });
      } else {
        this.$message.error("请获取验证码");
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
};
</script>

<style lang="less" scoped>
</style>
