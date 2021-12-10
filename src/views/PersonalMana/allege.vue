<!--
 * @Author: guojinhu
 * @Date: 2021-05-17 17:04:47
 * @LastEditTime: 2021-06-11 15:58:41
 * @LastEditors: guojinhu
 * @Description: 证件申述
 * @FilePath: \frontend\src\views\PersonalMana\allege.vue
-->
<template>
  <div class="allege-container">
    <el-card>
      <div slot="header" class="allege-header">
        <img src="@/assets/images/allege-icon.png" alt="">
        <span>{{ $t('ZJSS') }}</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="140px">
        <el-form-item :label="$t('userName')" prop="mobile">
          <el-input v-model="form.mobile" :placeholder="$t('ple_mainland_mobile')" maxlength="30" show-word-limit></el-input>
          <el-button v-if="Config.verificationSwitch === '1'" :disabled="codeButtonDisable" class="text-code-button" @click="getValidateCode">{{ codeButtonText }}</el-button>
        </el-form-item>
        <el-form-item :label="$t('YZM')" prop="verifyCode" v-if="Config.verificationSwitch === '1'">
          <el-input v-model="form.verifyCode" :placeholder="$t('ple_message_code')"></el-input>
          <span class="text-code-tip" v-show="countDownNum > 0">{{ $t('send_code') }}</span>
        </el-form-item>
        <el-form-item :label="$t('ZWXM')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('ple_chinese_name')" maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item :label="$t('YWXM')" prop="nameEn">
          <el-input v-model="form.nameEn" :placeholder="$t('ple_english_name')" maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item :label="$t('credentialType')" prop="credentialType">
          <el-select v-model="form.credentialType" :placeholder="$t('ple_certificate_type')">
            <el-option
              v-for="item in DROPDOWNBOX.credential_type"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('ZJH')" prop="idNumber">
          <el-input v-model="form.idNumber" :placeholder="$t('ple_certificate_number')" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item :label="$t('SSYY')" prop="appealReason">
          <el-input type="textarea" v-model="form.appealReason" :rows="4" resize="none" :placeholder="$t('ple_allege_remark')" maxlength="255" show-word-limit></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="0px" prop="idCardFrontImgUrl">
              <el-upload
                class="upload-container"
                ref="upload"
                accept="image/*"
                :action="uploadPath"
                :show-file-list="false"
                :http-request="uploadHttpDefault"
                :on-success="uploadSuccess1">
                <img v-if="imgUrl.idCardFrontImgUrl" :src="returnPicUrl(imgUrl.idCardFrontImgUrl)" alt="" class="certificate-img">
                <img v-else src="@/assets/images/carzm.png" alt="">
                <div slot="tip" class="upload-tip">点击上传证件正面</div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="0px" prop="idCardBackImgUrl">
              <el-upload
                class="upload-container"
                ref="upload"
                accept="image/*"
                :action="uploadPath"
                :show-file-list="false"
                :http-request="uploadHttpDefault"
                :on-success="uploadSuccess2">
                <img v-if="imgUrl.idCardBackImgUrl" :src="returnPicUrl(imgUrl.idCardBackImgUrl)" alt="" class="certificate-img">
                <img v-else src="@/assets/images/carbm.png" alt="">
                <div slot="tip" class="upload-tip">点击上传证件背面</div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="0px" prop="idCardHoldImgUrl">
              <el-upload
                class="upload-container"
                ref="upload"
                accept="image/*"
                :action="uploadPath"
                :show-file-list="false"
                :http-request="uploadHttpDefault"
                :on-success="uploadSuccess3">
                <img v-if="imgUrl.idCardHoldImgUrl" :src="returnPicUrl(imgUrl.idCardHoldImgUrl)" alt="" class="certificate-img">
                <img v-else src="@/assets/images/sczj.png" alt="">
                <div slot="tip" class="upload-tip">点击上传手持证件照片</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="allege-foot">
        <el-button type="default" @click="$router.push({path: '/personalMana/application'})">返回</el-button>
        <el-button type="primary" @click="sureEvent" v-show="buttonAuth.includes('SAVE')">下一步</el-button>
      </div>
    </el-card>
    <!-- 滑块验证码组件 -->
    <drag ref="drag" @close="closeDrag"></drag>
  </div>
</template>

<script>
import { isCardID } from "@/assets/js/regexp";
import { mapState } from 'vuex'
import mixin from '@/mixins/dialogMixin'
import apis from '@/apis'
import uploadHttp from '@/uploadHttp'
import drag from '@/components/drag.vue'

export default {
  mixins: [mixin],
  components: {
    drag,
  },
  data() {
    const checkCredential = (rule, value, callback) => {
      if (this.form.credentialType === 'CID') {
        if (isCardID(value) === 'true') {
          callback()
        } else {
          callback(new Error('证件号码格式不正确'))
        }
      } else {
        callback()
      }
    };
    return {
      form: {
        mobile: '',
        verifyCode: '',
        name: '',
        nameEn: '',
        idNumber: '',
        credentialType: '',
        appealReason: '',
        idCardFrontImgUrl: '',
        idCardBackImgUrl: '',
        idCardHoldImgUrl: '',
      },
      imgUrl: {
        idCardFrontImgUrl: '',
        idCardBackImgUrl: '',
        idCardHoldImgUrl: '',
      },
      rules: {
        mobile: [
          { required: true, message: '请输入账号', trigger: 'change' },
        ],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'change' },
        ],
        name: [
          { required: true, message: '请输入中文姓名', trigger: 'change' },
        ],
        nameEn: [
          { required: true, message: '请输入英文姓名', trigger: 'change' },
        ],
        credentialType: [
          { required: true, message: '请选择证件类型', trigger: 'change' },
        ],
        idNumber: [
          { required: true, message: '请输入证件号', trigger: 'change' },
          { validator: checkCredential, trigger: 'change' },
        ],
        appealReason: [
          { required: true, message: '请输入申诉原因', trigger: 'change' },
        ],
        idCardFrontImgUrl: [
          { required: true, message: '请上传证件照正面', trigger: 'change' },
        ],
        idCardBackImgUrl: [
          { required: true, message: '请上传证件照背面', trigger: 'change' },
        ],
        idCardHoldImgUrl: [
          { required: true, message: '请上传手持证件照', trigger: 'change' },
        ],
      },
      codeButtonDisable: false,
      codeButtonText: this.$t('HQYZM'),
    }
  },
  computed: {
    ...mapState(['Config', 'buttonAuth']),
    uploadPath() {
      return apis.File_AccountIdNumberUpload
    },
  },
  methods: {
    /**
     * @description: 上传
     * @param {*} e
     * @return {*}
     */
    uploadHttpDefault(e) {
      uploadHttp(e)
    },
    uploadSuccess1(res) {
      this.form.idCardFrontImgUrl = res.data.url
      this.imgUrl.idCardFrontImgUrl = res.data.url
    },
    uploadSuccess2(res) {
      this.form.idCardBackImgUrl = res.data.url
      this.imgUrl.idCardBackImgUrl = res.data.url
    },
    uploadSuccess3(res) {
      this.form.idCardHoldImgUrl = res.data.url
      this.imgUrl.idCardHoldImgUrl = res.data.url
    },
    // 获取验证码
    getValidateCode() {
      if (this.form.mobile) {
        const reg = /^1[3456789]\d{9}$/
        if (reg.test(this.form.mobile)) {
          this.$refs.drag.open() // 唤醒滑块
        } else {
          this.$notify.error({
            title: '错误',
            message: '电话号码格式不正确',
          });
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
      if (status) {
        this.sendCode(sliderVerifyCode)
      }
    },
    sendCode(sliderVerifyCode) {
      const params = {
        sliderVerifyCode,
        mobile: this.form.mobile,
      }
      this.$http.post(apis.Auth_SendVerifyCode, params).then((res) => {
        if (res.data.code === 200) {
          this.codeButtonDisable = true
          let countDownNum = 60
          const timer = setInterval(() => {
            countDownNum -= 1
            this.codeButtonText = `${countDownNum}秒`
            if (countDownNum <= 0) {
              this.codeButtonDisable = false
              this.codeButtonText = this.$t('HQYZM')
              clearInterval(timer)
            }
          }, 1000)
        }
      })
    },
    sureEvent() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const params = {
            ...this.form,
            moblie: this.form.mobile,
          }
          this.$http.post(apis.AccountAppeal_Appeal, params).then((res) => {
            if (res.data.code === 200) {
              this.$notify({
                title: '证件申诉',
                message: '证件申诉已发至后台审核，审核结果将会发至您的手机号，请耐心等待审核结果',
              })
              this.$router.push({
                path: '/personalMana/application',
              })
            }
          })
        }
        return false
      })
    },
  },
}
</script>

<style lang="less" scoped>
.allege-container {
  width: 640px;
  margin: 40px auto 0;
  .allege-header {
    font-size: 16px;
    font-weight: bold;
    color: #3B8ACE;
    img {
      vertical-align: middle;
      margin-right: 6px;
      width: 21px;
      height: 21px;
    }
  }
  .text-code-button {
    margin-left: 20px;
    color: #FFF;
    background-color: #3B8ACE;
  }
  .text-code-tip {
    margin-left: 20px;
    font-size: 12px;
    color: #9FA7B3;
  }
  .allege-foot {
    border-top: thin solid #F0F0F0;
    padding-top: 20px;
    text-align: right;
  }
  .upload-container {
    .upload-button {
      border: 1px solid #F1F1F1;
      width: 70px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      .upload-icon {
        width: 32px;
        height: 26px;
      }
    }
    .upload-tip {
      font-size: 12px;
      color: #3B8ACE;
    }
  }
  .certificate-img {
    width: 70px;
    height: 70px;
  }
}
/deep/ .el-input {
  width: 196px;
}
/deep/ .el-col {
  text-align: center;
}
</style>
