<template>
  <div class="step-one">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules" :disabled="isDisabled">
      <div class="title">①基本信息</div>
      <el-row>
          <el-col :span="16">
            <el-row>
              <el-col :span="12" class="col-height">
                <el-form-item :label="$t('applyType')" class="Form_item" prop="applyType">
                  <el-radio-group v-model="form.applyType">
                    <el-radio v-for="(item, index) in DROPDOWNBOX.zyz_apply_type" :key="index" :label="item.value">{{item.text}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="col-height">
                <el-form-item :label="$t('Nationality')" class="Form_item" prop="nationality">
                  <el-select v-model="form.nationality" filterable clearable class="set-width" @change="changeNationality">
                    <el-option v-for="item in country" :key="`nationality${item.countryCode}`" :value="item.countryCode" :label="item.countryName"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <div>
                <el-popover
                  placement="right"
                  width="520"
                  trigger="click">
                  <el-button slot="reference" class="refer-style">姓名填写不规范？请点击这里!</el-button>
                  <p>中文姓：中国内地及港澳台申请人必填。其他有汉字姓名的申请人自愿填写。 </p>
                  <p style="padding-left:4em;">中国内地申请人用简体汉字填写；港澳台申请人用繁体汉字填写。</p>
                  <p style="padding-left:4em;">填写内容应当与用于注册的身份证件上显示的汉字姓一致。</p>
                  <p style="padding-left:4em;">示例：张。</p>
                  <p>中文名：中国内地及港澳台申请人必填。其他有汉字姓名的申请人自愿填写。</p>
                  <p  style="padding-left:4em;">中国内地申请人用简体汉字填写；港澳台申请人用繁体汉字填写。</p>
                  <p  style="padding-left:4em;">填写内容应当与用于注册的身份证件上显示的汉字姓一致。</p>
                  <p style="padding-left:4em;">示例：建国。</p>
                  <p>英文姓：所有申请人必填。请用大写英文字母填写，中国内地申请人填写汉语拼音。</p>
                  <p style="padding-left:4em;">示例：ZHANG。</p>
                  <p>英文名：所有申请人必填。请用大写英文字母填写，中国内地申请人填写汉语拼音。</p>
                  <p style="padding-left:4em;">示例：JIANGUO。</p>
                </el-popover>
              </div>
              <el-col :span="12" class="col-height">
                <el-form-item :label="$t('chnLastName')" class="Form_item" prop="chnLastName"
                  :rules="form.nationality==='CHN' || form.nationality==='HKG' ||form.nationality==='MAC' || form.nationality==='TPE'?rules.chnLastName:[{required: false}]">
                  <el-input size="mini"  v-model.trim="form.chnLastName" clearable placeholder="请填写姓名中的姓氏，例如张"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="col-height">
                <el-form-item :label="$t('ZWM')" class="Form_item" prop="chnFirstName"
                  :rules="form.nationality==='CHN' || form.nationality==='HKG' ||form.nationality==='MAC' || form.nationality==='TPE'?rules.chnFirstName:[{required: false}]">
                  <el-input size="mini"  v-model.trim="form.chnFirstName" clearable placeholder="请填写姓名中的名字，例如建国"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="col-height">
                <el-form-item :label="$t('firstName')" class="Form_item" prop="firstName">
                  <el-input size="mini"  v-model.trim="form.firstName" :placeholder="$t('enNamePlaceholder')" clearable @keyup.native="form.firstName=form.firstName.toUpperCase()"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="col-height">
                <el-form-item :label="$t('YWM')" class="Form_item" prop="lastName">
                  <el-input size="mini"  v-model.trim="form.lastName" :placeholder="$t('enNamePlaceholder1')" clearable @keyup.native="form.lastName=form.lastName.toUpperCase()"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item label-width="0" class="Form_item" prop="headPicUrl">
              <div  class="imgDiv">
                <el-upload style="float:left" ref="upload" :show-file-list="false" accept=".jpg," :limit="1"
                :http-request="uploadHttpDefault" :on-success="uploadSuccess" :action="apis.File_ZyzImageUpload">
                  <div class="pictureBG">
                    <img :src="returnPicUrl(form.url)" alt="" v-if="form.id || form.url">
                  </div>
                </el-upload>
                <div class="pWidth">
                  <p>1、申请人本人近期（6个月内）正面免冠彩色照片；</p>
                  <p>2、照片背景为白色，不得使用其它底色；不得使用艺术照片、翻拍照片；</p>
                  <p>3、照片尺寸为35mm×45mm；像素为413×531，无框；</p>
                  <p>4、图像文件格式为JPG；文件大小100K-300K字节，分辨率不低于300dpi。</p>
                </div>
              </div>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="col-height">
          <el-form-item :label="$t('ZJLX')" class="Form_item" prop="credentialType">
            <el-select v-model="form.credentialType" clearable class="set-width" @change="changeCredentialNo">
              <el-option v-for="item in credential_type" :key="`credentialType${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="position: relative;" class="col-height">
          <el-form-item :label="$t('ZJH')" class="Form_item" prop="credentialNo">
            <el-col :span="16">
              <el-input size="mini" v-model.trim="form.credentialNo" clearable @blur="changeCredentialNo"  @keyup.native="form.credentialNo=form.credentialNo.toUpperCase()"></el-input>
            </el-col>
            <el-col :span="6" :offset="2">
              <el-button @click="$router.push({path: '/personalMana/allege'})">证件申诉</el-button>
            </el-col>
            <!-- <div style="position: absolute;right:-80px;top:0px;width:80px;cursor: pointer;">
              <img class="gantan" src="../../../../assets/images/gantan.png" alt="" @click="appealDialog">
              <span class="tip-gantan">证件申诉</span>
            </div> -->
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="$t('ZJYXQ')" class="Form_item" prop="credentialPeriod">
            <el-date-picker v-model="form.credentialPeriod" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="$t('birthday')" class="Form_item" prop="birth">
            <el-date-picker :disabled="form.credentialType==='CID'" v-model="form.birth" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"
              style="width: 100%" :picker-options="{
              disabledDate: (date) => {
                return form.credentialType!=='CID' ? new Date(date).getTime() > new Date(2002, 8, 30).getTime(): false
              }
            }"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="$t('XB')" class="Form_item" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio :disabled="form.credentialType==='CID'" v-for="(item, index) in DROPDOWNBOX.sex" :key="index" :label="item.value">{{item.text}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="$t('volunteerType')" class="Form_item"  label-width="150px" prop="volunteerType">
            <el-radio-group v-model="form.volunteerType">
              <el-radio v-for="(item, index) in DROPDOWNBOX.yes_no_label" :key="index" :label="item.value">{{item.text}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='Y'" class="col-height">
          <el-form-item :label="$t('schoolName')" class="Form_item" prop="school">
            <el-select v-model="form.school" filterable clearable class="set-width" @change="changeSchool">
              <el-option v-for="item in height_schools" :key="`school${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='Y'" class="col-height">
          <el-form-item :label="$t('admission')" class="Form_item" prop="enrollmentDate">
            <el-date-picker v-model="form.enrollmentDate" type="month" value-format="yyyy-MM" placeholder="选择年月" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='Y'" class="col-height">
          <el-form-item :label="$t('college')" class="Form_item" prop="faculty">
            <el-select v-model="form.faculty" filterable clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.zyz_faculty" :key="`faculty${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='Y'" class="col-height">
          <el-form-item :label="$t('major')" class="Form_item" prop="major">
            <el-select v-model="form.major" filterable clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.major" :key="`major${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='Y'" class="col-height">
          <el-form-item :label="$t('student-Id')" class="Form_item" prop="studentNumber">
            <el-input size="mini"  v-model.trim="form.studentNumber" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="$t('ZYZZ')" class="Form_item" prop="organizationId">
            <el-select v-model="form.organizationId" clearable class="set-width">
              <el-option v-for="item in organizationList" :key="`organization${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='N'" class="col-height">
          <el-form-item :label="$t('SZDW')" class="Form_item" prop="company">
            <el-input size="mini"  v-model.trim="form.company" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='N'" class="col-height">
          <el-form-item :label="$t('occupation')" class="Form_item" prop="occupation">
            <el-select v-model="form.occupation" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.zyz_occupation" :key="`health${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='N'" class="col-height">
          <el-form-item :label="$t('edu-background')" class="Form_item" prop="heghestEducation">
            <el-select v-model="form.heghestEducation" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.education" :key="`health${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="$t('health')" class="Form_item" prop="health">
            <el-select v-model="form.health" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.health" :key="`health${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="`${$t('tall')}(CM)`" class="Form_item" prop="height">
            <el-input size="mini" v-model.trim="form.height" clearable type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="position: relative;" class="col-height">
          <el-form-item :label="$t('clothSize1')" class="Form_item" prop="clothesSize">
            <el-select v-model="form.clothesSize" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.clothes_size" :key="`clothesSize${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
            <div style="position: absolute;right:-20px;top:0px;width:20px;cursor: pointer;">
              <img class="size" src="../../../../assets/images/size.png" alt="" @click="sizeDialog">
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="`${$t('weight')}(KG)`" class="Form_item" prop="weight">
            <el-input size="mini"  v-model.trim="form.weight" clearable type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="position: relative;" class="col-height">
          <el-form-item :label="$t('shoes')" class="Form_item" prop="shoesSize">
            <el-select v-model="form.shoesSize" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.shoes_size" :key="`shoesSize${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
            <div style="position: absolute;right:-15px;top:0px;width:20px;cursor: pointer;z-index: 99;">
              <img class="size" src="../../../../assets/images/size.png" alt="" @click="shoesDialog">
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="position: relative;" class="col-height">
          <el-form-item :label="$t('trouserSize')" class="Form_item">
            <el-select v-model="form.trouserSize" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.trouser_size" :key="`trouserSize${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
            <div style="position: absolute;right:-20px;top:0px;width:20px;cursor: pointer;">
              <img class="size" src="../../../../assets/images/size.png" alt="" @click="trousersDialog">
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="$t('blood-type')" class="Form_item" prop="blood">
            <el-select v-model="form.blood" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.blood" :key="`blood${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="$t('speciality')" class="Form_item" prop="speciality">
            <el-select v-model="form.speciality" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.speciality" :key="`speciality${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="col-height">
          <el-form-item :label="$t('disabilityFlag')" class="Form_item" label-width="120px" prop="disabilityFlag">
            <el-radio-group v-model="form.disabilityFlag">
              <el-radio v-for="(item, index) in DROPDOWNBOX.yes_no_label" :key="index" :label="item.value">{{item.text}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.disabilityFlag === 'Y'">
        <el-col :span="24">
          <el-form-item class="Form_item" label-width="100px" prop="disabilityType">
            <el-checkbox-group v-model="form.disabilityType">
              <el-checkbox v-for="(item, index) in DROPDOWNBOX.zyz_disability_type" :key="index" :label="item.value">{{item.text}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="col-height">
          <el-form-item :label="$t('politicalStatus')" class="Form_item" prop="politicalOutlook"
            :rules="form.nationality==='CHN'?rules.politicalOutlook:[{required: false}]">
            <el-select v-model="form.politicalOutlook" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.political_outlook" :key="`politicalOutlook${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="$t('Nation')" class="Form_item" prop="nation"
            :rules="form.nationality==='CHN'?rules.nation:[{required: false}]">
            <el-select v-model="form.nation" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.nation" :key="`nation${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('YFPGW')" class="Form_item">
            <el-select v-model="form.postCode" clearable style="width: 100%" :disabled="!isId">
              <el-option v-for="item in DROPDOWNBOX.zyz_post" :key="item.value" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('XQDW')" class="Form_item">
            <el-select v-model="form.unit" clearable style="width: 100%" :disabled="!isId">
              <el-option v-for="item in units" :key="item.value" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 弹窗 -->
    <add-dialog :show="addDialog.visible" @closeDialog="changeAddDialog"></add-dialog>
    <appeal-dialog :show="addAppealDialog.visible" @closeDialog="changeAddDialogAppeal"></appeal-dialog>
    <add-dialog-shoes :show="addDialogShoes.visible" @closeDialog="changeAddDialogShoes"></add-dialog-shoes>
    <add-dialog-trousers :show="addDialogTrousers.visible" @closeDialog="changeAddDialogTrousers"></add-dialog-trousers>
  </div>
</template>
<script>
import addDialog from '../dialog/addDialog.vue'
import appealDialog from '../dialog/appeal-dialog.vue'
import addDialogShoes from '../dialog/addDialogShoes.vue'
import addDialogTrousers from '../dialog/addDialogTrousers.vue'
import mixin from '@/mixins/index'
// import dixtMixin from '@/mixins/dictMixin'
import apis from '@/apis'

export default {
  components: {
    addDialog,
    appealDialog,
    addDialogShoes,
    addDialogTrousers,
  },
  mixins: [mixin],
  props: {
    //TODO form改data里面，采用方法赋值和取值，提升性能(安林娜)
    rules: {
      required: false,
      type: Object,
    },
    isDisabled: {
      required: true,
      type: Boolean,
    },
    isId: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      addDialog: {
        visible: false,
      },
      addDialogShoes: {
        visible: false,
      },
      addDialogTrousers: {
        visible: false,
      },
      addAppealDialog: {
        visible: false,
      },
      country: [],
      height_schools: [],
      units: [],
      form: {}, // 外部传进来的表单
      organizationList: [], // 志愿组织列表
    }
  },
  created() {
    this.getCountry()
    this.getHeightSchool()
    this.getUnits()
    this.getOrganizationList()
  },
  watch: {
    'form.disabilityFlag': {
      handler: function handler() {
        if (this.form.disabilityFlag === 'N') {
          this.form.disabilityType = []
        }
      },
    },
    'form.volunteerType': {
      handler: function handler() {
        this.$refs.form.clearValidate()
        if (this.form.volunteerType === 'N') { // 如果是社会
          this.form.school = ''
          this.form.enrollmentDate = ''
          this.form.faculty = ''
          this.form.major = ''
          this.form.studentNumber = ''
        } else { // 如果是大学生
          this.form.company = ''
          this.form.occupation = ''
          this.form.heghestEducation = ''
        }
      },
    },
    'form.applyType': {
      handler: function handler() {
        this.$refs.form.clearValidate()
      },
    },
    'form.chnLastName': {
      handler: function handle() {
        this.form.firstName = this.form.chnLastName ? this.chineseToPinYin(this.form.chnLastName).toUpperCase() : this.form.firstName
      },
    },
    'form.chnFirstName': {
      handler: function handle() {
        this.form.lastName = this.form.chnFirstName ? this.chineseToPinYin(this.form.chnFirstName).toUpperCase() : this.form.lastName
      },
    },
  },
  computed: {
    credential_type() {
      let DrowList = []
      if (this.form.nationality === 'CHN') { // 如果国家/地区是中国，只能选择身份证
        DrowList = this.DROPDOWNBOX.credential_type.filter(items => items.value === 'CID')
      } else if (this.form.nationality === 'TPE') { // 国家/地区是中国台北、只能选择台湾居民来往大陆通行证
        DrowList = this.DROPDOWNBOX.credential_type.filter(items => items.value === 'TWT')
      } else if (this.form.nationality === 'HKG' || this.form.nationality === 'MAC') { // 国家/地区是中国澳门、中国香港，只能选择港澳居民来往内地通行证
        DrowList = this.DROPDOWNBOX.credential_type.filter(items => items.value === 'GAT')
      } else { // 国家/地区除了以上的，只能选择护照了
        DrowList = this.DROPDOWNBOX.credential_type.filter(items => items.value === 'PAS')
      }
      return DrowList
    },
  },
  methods: {
    /**
     * @description: 获取组织列表
     * @param {*}
     * @return {*}
     */
    getOrganizationList() {
      this.$http.post(apis.OptionConfig_OrganizationList).then((res) => {
        if (res.data.code === 200) {
          this.organizationList = res.data.data
        }
      })
    },
    /**
     * function 证件号改变判断是否为居民身份证，如果是自动带出性别和出生日期
     */
    changeCredentialNo() {
      let isSame = false // 是否有相同的证件号
      // 验证是否已经存在
      if (this.form.credentialNo) {
        this.$http.post(apis.ZyzRegistered_CheckCredentialNo, { id: this.form.id, credentialNo: this.form.credentialNo }).then((res) => {
          if (res.data.code === 200) {
            if (res.data.data === '1') {
              this.$message.error('证件号码已存在')
              isSame = true
            }
          }
        })
      }
      this.$refs.form.validateField('credentialNo', (valid) => {
        if (valid === '') {
          if (this.form.credentialType === 'CID' && this.form.credentialNo !== '' && !isSame) {
            this.form.birth = `${this.form.credentialNo.substring(6, 10)}-${this.form.credentialNo.substring(10, 12)}-${this.form.credentialNo.substring(12, 14)}`
            if (Number(this.form.credentialNo.substring(16, 17)) % 2 === 1) {
              this.form.sex = 'M'
            }
            if (Number(this.form.credentialNo.substring(16, 17)) % 2 === 0) {
              this.form.sex = 'F'
            }
          }
        }
      })
    },
    /**
     * function 上传头像成功返回
     */
    uploadSuccess(res) {
      this.$refs.upload.clearFiles()
      if (res.code === 200) {
        this.form.headPicUrl = res.data.path
        this.form.url = res.data.url
      }
    },
    sizeDialog() {
      this.addDialog.visible = true
    },
    shoesDialog() {
      this.addDialogShoes.visible = true
    },
    trousersDialog() {
      this.addDialogTrousers.visible = true
    },
    changeAddDialog(dialogStatus) {
      this.addDialog.visible = dialogStatus
    },
    changeAddDialogShoes(dialogStatus) {
      this.addDialogShoes.visible = dialogStatus
    },
    changeAddDialogTrousers(dialogStatus) {
      this.addDialogTrousers.visible = dialogStatus
    },
    appealDialog() {
      this.addAppealDialog.visible = true
    },
    changeAddDialogAppeal(dialogStatus) {
      this.addAppealDialog.visible = dialogStatus
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
     * @function 国家/地区改变的时候清空证件类型，号码和有效期
     */
    changeNationality() {
      this.form.credentialType = ''
      this.form.credentialNo = ''
      this.form.credentialPeriod = ''
    },
    /**
     * @function 学校名称改变时清空院系和专业
     */
    changeSchool() {
      this.form.faculty = ''
      this.form.major = ''
    },
    getCountry() {
      this.$http.post(apis.OptionConfig_GetCountry).then((res) => {
        if (res.data.code === 200) {
          this.country = res.data.data
        }
      })
    },
    getHeightSchool() {
      this.$http.post(apis.OptionConfig_GetAllColleges, { groupNo: 'ZYZ_SCHOOL' }).then((res) => {
        if (res.data.code === 200) {
          this.height_schools = res.data.data
        }
      })
    },
    // 获取使用单位下拉框
    getUnits() {
      this.$http.post(apis.OptionConfig_GetAllUnit).then((res) => {
        if (res.data.code === 200) {
          this.units = res.data.data
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
// @import "../../../../assets/styles/mixin.scoped.less";
.step-one {
  .col-height {
    height: 63px;
  }
  .imgDiv {
    display: flex;
  }
  .pWidth {
    width: 290px;
  }
  .pictureBG {
    // background: url('../../../../assets/images/avatar.png') no-repeat;
    background-size: 100% 100%;
    // background: url(../../../../assets/images/avatar.png);
    width: 130px;
    height: 168px;
    img {
      width: 130px;
      height: 168px;
    }
  }
}
.post-title {
  font-size: 20px;
  font-weight: bold;
}
.little-title {
  font-size: 18px;
  margin: 8px 0;
}
.p-content {
  font-size: 14px;
  padding: 5px;
  border: 1px solid #666;
}
</style>
<style lang="less">
.step-one {
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
    .el-checkbox-button:first-child .el-checkbox-button__inner {
      border-left: 1px solid rgba(194,198,202,1);
    }
    .el-checkbox-button__inner {
      border-left: 1px solid #DCDFE6;
    }
    .el-checkbox-button.is-checked .el-checkbox-button__inner {
      box-shadow: 0 0 0 0;
    }
    .el-checkbox-button.is-focus .el-checkbox-button__inner {
      border-color: rgba(194,198,202,1);
    }
    .el-checkbox-button__inner {
      background: rgba(255,255,255,1);
      border-radius: 4px;
      border: 1px solid rgba(194,198,202,1);
      font-size: 14px;
      font-family: SourceHanSansSC-Regular,SourceHanSansSC;
      font-weight: 400;
      color: rgb(40, 134, 220);
    }
      img {
        width: 130px;
        height: 168px;
        float: left;
      }
      p {
        font-size:12px;
        font-family:SourceHanSansSC-Regular,SourceHanSansSC;
        font-weight:400;
        color:rgba(148,152,158,1);
        padding: 4px;
        letter-spacing:2px;
        line-height:17px;
      }
      .span-con {
        font-size:14px;
        color:rgba(148,152,158,1);
      }
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
      .el-checkbox-button.is-disabled:first-child .el-checkbox-button__inner {
        border-left-color: #EBEEF5 !important;
      }
      .size {
        width: 16px;
        height: 16px;
        margin-top: 13px;
        margin-left: 10px;
      }
      .gantan {
        width: 14px;
        height: 14px;
        margin: 12px 5px 0 5px;
        float: left;
      }
      .tip-gantan {
        display: block;
        height: 60px;
        font-size: 14px;
        font-family: SourceHanSansSC-Medium,SourceHanSansSC;
        font-weight: 500;
        color: rgba(174,67,62,1);
        line-height: 34px;
        margin-left: 2px;
        margin-top: 2px;
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
  .refer-style {
    height: 18px;
    padding: 0;
    margin-left: 100px;
    color: rgb(40, 134, 220);
    border: none;
    background: var(--main-bg-color);
  }
}
</style>
