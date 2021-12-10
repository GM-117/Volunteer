<template>
  <div class="step-two">
    <el-form ref="form" :model="form" label-width="130px" :rules="rules" :disabled="isDisabled">
      <!-- 标题 -->
      <div class="title">②联系信息</div>
      <el-row>
        <el-col :span="6">
          <el-form-item :label="$t('XJZSE')" class="Form_item" prop="domicileProvince">
            <el-select v-model="form.domicileProvince" clearable class="set-width" @change="changedomicileProvince">
              <el-option v-for="item in province" :key="`domicileProvince${item.provinceCode}`" :value="item.provinceCode" :label="item.provinceName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item :label="$t('XJZSI')" class="Form_item" prop="domicileCity">
            <el-select v-model="domicileData" clearable class="set-width" @change="changeDom" v-if="form.domicileCity === ''">
              <el-option v-for="item in domicileCity" :key="`domicileCity${item.cityCode}`" :value="item.cityCode" :label="item.cityName"></el-option>
            </el-select>
            <el-select v-model="form.domicileCity" clearable class="set-width" @change="changeDomicileCity" v-else>
              <el-option v-for="item in domicileCity" :key="`domicileCity${item.cityCode}`" :value="item.cityCode" :label="item.cityName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item :label="$t('XJZQ')" class="Form_item">
            <el-select v-model="form.domicileArea" clearable class="set-width">
              <el-option v-for="item in domicileArea" :key="`domicileArea${item.areaCode}`" :value="item.areaCode" :label="item.areaName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13">
          <el-form-item :label="$t('XJZXXDZ')" class="Form_item" prop="domicileAddress">
            <el-input size="mini"  v-model.trim="form.domicileAddress" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item :label="$t('HJSE')" class="Form_item" prop="censusProvince"
              :rules="form.nationality==='CHN'?rules.censusProvince:[{required: false}]">
            <el-select v-model="form.censusProvince" clearable class="set-width" @change="changeCensusProvince">
              <el-option v-for="item in province" :key="`censusProvince${item.provinceCode}`" :value="item.provinceCode" :label="item.provinceName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item :label="$t('HJSI')" class="Form_item" prop="censusCity"
            :rules="form.nationality==='CHN'?rules.censusCity:[{required: false}]">
            <el-select v-model="form.censusCity" clearable class="set-width" @change="changeCensusCity">
              <el-option v-for="item in censusCity" :key="`censusCity${item.cityCode}`" :value="item.cityCode" :label="item.cityName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item :label="$t('HJQ')" class="Form_item">
            <el-select v-model="form.censusArea" clearable class="set-width">
              <el-option v-for="item in censusArea" :key="`censusArea${item.areaCode}`" :value="item.areaCode" :label="item.areaName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- <span class="tishi">填写内容必须与户籍所在地址一致！</span> -->
      </el-row>
      <el-row>
        <el-col :span="13">
          <el-form-item :label="$t('HJXXDZ')" class="Form_item" prop="censusAddress"
            :rules="form.nationality==='CHN'?rules.censusAddress:[{required: false}]">
            <el-input size="mini"  v-model.trim="form.censusAddress" clearable placeholder="填写内容必须与户籍所在地址一致！"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="2">
          <div class="tip" @click="sameAddress"
            v-show="form.volunteerStatus === '' && form.volunteerStatus === 'VS99' && form.volunteerStatus === 'VS07' && this.ifMistake !== 'youwu'">
            与居住地址一致</div>
        </el-col> -->
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item :label="$t('QQ')" class="Form_item" prop="qq">
            <el-input size="mini"  v-model.trim="form.qq" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('wechat')" class="Form_item" prop="wechat">
            <el-input size="mini"  v-model.trim="form.wechat" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item :label="$t('mail')" class="Form_item" prop="email">
            <el-input size="mini"  v-model.trim="form.email" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item :label="$t('emergency-contacter')" class="Form_item" prop="emergencyContact">
            <el-input size="mini"  v-model.trim="form.emergencyContact" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item :label="$t('emergency-contact')" class="Form_item" prop="emergencyContactPhone">
            <el-input size="mini"  v-model.trim="form.emergencyContactPhone" clearable @blur="differentMoible"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import mixin from '@/mixins/index'
// import dixtMixin from '@/mixins/dictMixin'
import apis from '@/apis'

export default {
  mixins: [mixin],
  props: {
    //TODO form改data里面，采用方法赋值和取值，提升性能(安林娜)
    // form: {
    //   required: true,
    //   type: Object,
    // },
    rules: {
      required: false,
      type: Object,
    },
    isDisabled: {
      required: true,
      type: Boolean,
    },
    // TODO【强制】布尔类型的变量要加`is`的前缀，换个起名方式，这个应该是拼音，isError等(安林娜)
    ifMistake: {
      required: false,
      type: String,
      default: '',
    },
  },
  data() {
    return {
      form: {},
      province: [],
      domicileCity: [],
      domicileArea: [],
      censusCity: [],
      censusArea: [],
      domicileData: '',
    }
  },
  created() {
    // 获取省
    this.$http.post(apis.OptionConfig_GetProvince).then((res) => {
      if (res.data.code === 200) {
        this.province = res.data.data
      }
    })
  },
  methods: {
    /**
     * @function 解决市验证问题
     */
    changeDom() {
      this.form.domicileCity = this.domicileData
      this.changeDomicileCity(this.form.domicileCity)
    },
    /**
     * @function 封装先居住地调用省市区顺序的方法
     */
    getDomicile(res) {
      return new Promise((resolve) => {
        this.changedomicileProvince(res.domicileProvince).then(() => {
          this.form.domicileCity = res.domicileCity
          this.changeDomicileCity(res.domicileCity).then(() => {
            this.form.domicileArea = res.domicileArea
            this.$nextTick(() => {
              resolve()
            })
          })
        })
      })
    },
    /**
     * @function 封装先居住地调用省市区顺序的方法
     */
    getCensus(res) {
      return new Promise((resolve) => {
        this.changeCensusProvince(res.censusProvince).then(() => {
          this.form.censusCity = res.censusCity
          this.changeCensusCity(res.censusCity).then(() => {
            this.form.censusArea = res.censusArea
            this.$nextTick(() => {
              resolve()
            })
          })
        })
      })
    },
    /**
     * @function 改变现居住省带出现居住市的下拉框
     */
    changedomicileProvince(val) {
      return new Promise((resolve) => {
        this.form.domicileCity = ''
        this.domicileCity = []
        this.form.domicileArea = ''
        this.domicileArea = []
        this.$http.post(apis.OptionConfig_GetCity, { code: val }).then((res) => {
          if (res.data.code === 200) {
            this.domicileCity = res.data.data
            this.$nextTick(() => {
              resolve()
            })
          }
        })
      })
    },
    /**
     * @function 改变现居住市带出现居住区的下拉框
     */
    changeDomicileCity(val) {
      return new Promise((resolve) => {
        this.form.domicileArea = ''
        this.domicileArea = []
        this.$http.post(apis.OptionConfig_GetArea, { code: val }).then((res) => {
          if (res.data.code === 200) {
            this.domicileArea = res.data.data
            this.$nextTick(() => {
              resolve()
            })
          }
        })
      })
    },
    /**
     * @function 改变户籍省带出户籍市的下拉框
     */
    changeCensusProvince(val) {
      return new Promise((resolve) => {
        this.form.censusCity = ''
        this.censusCity = []
        this.form.censusArea = ''
        this.censusArea = []
        this.$http.post(apis.OptionConfig_GetCity, { code: val }).then((res) => {
          if (res.data.code === 200) {
            this.censusCity = res.data.data
            this.$nextTick(() => {
              resolve()
            })
          }
        })
      })
    },
    /**
     * @function 改变户籍市带出户籍区的下拉框
     */
    changeCensusCity(val) {
      return new Promise((resolve) => {
        this.form.censusArea = ''
        this.censusArea = []
        this.$http.post(apis.OptionConfig_GetArea, { code: val }).then((res) => {
          if (res.data.code === 200) {
            this.censusArea = res.data.data
            this.$nextTick(() => {
              resolve()
            })
          }
        })
      })
    },
    /**
     * @function 与居住地址一致
     */
    sameAddress() {
      this.form.censusAddress = this.form.domicileAddress
    },
    /**
     * @function 设置表单变量的值
     */
    setFormData(value) {
      this.form = value
    },
    /**
     * @function 获取表单变量的值
     */
    getFormData() {
      return this.form
    },
    /**
     * @function 紧急联系人电话不能与注册的手机号一致！
     */
    differentMoible() {
      if (this.form.emergencyContactPhone === this.form.mobile && this.form.emergencyContactPhone !== '') {
        this.$message.error('紧急联系人电话不能与注册的手机号一致！')
      }
    },
  },
}
</script>
<style lang="less" scoped>
// @import "../../../../assets/styles/mixin.scoped.less";
</style>
<style lang="less">
.step-two{
  padding-left: 10px;
  .set-width {
    width: 100%;
  }
  .title-container {
    width: 100%;
    // text-align: center;
    .title_style {
      width:90px;
      height:27px;
      font-size:18px;
      font-family:SourceHanSansSC-Medium,SourceHanSansSC;
      font-weight:500;
      color:rgba(36,45,65,1);
      line-height:27px;
      margin-left: 45%;
    }
  }
  .title {
    height:24px;
    font-size:16px;
    font-family:SourceHanSansSC-Medium,SourceHanSansSC;
    font-weight:500;
    color:rgba(62,103,174,1);
    line-height:24px;
    margin: 20px 0 10px;
  }
  .form-container {
      .el-checkbox-button .el-checkbox-button__inner {
        margin: 12px;
        width: 140px;
        height: 36px;
      }
      .el-input--suffix .el-input__inner {
        height: 36px;
      }
      .el-checkbox-button.is-checked .el-checkbox-button__inner {
        background-color: rgb(40, 134, 220);
        border-color: rgb(40, 134, 220);
      }
      .tip {
        display: inline-block;
        width: 121px;
        height: 36px;
        margin-left: 20px;
        background: rgb(40, 134, 220);
        border-radius: 4px;
        color: rgba(255,255,255,1);
        line-height: 36px;
        text-align: center;
      }
      .tishi {
        display: inline-block;
        color: rgb(40, 134, 220);
        font-size: 14px;
        margin-left: 10%;
      }
  }
  .button-container {
    width: 100%;
    // text-align: center;
    .btn {
      margin: 10px;
      background: rgb(40, 134, 220);
      color:rgba(255,255,255,1);
      font-family:SourceHanSansSC-Regular,SourceHanSansSC;
      font-weight:400;
      width: 160px;
      height: 32px;
      line-height: 7px;
    }
  }
}
</style>
