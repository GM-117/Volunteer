<template>
  <div class="step-one">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules" :disabled="isDisabled">
      <div class="title">①基本信息</div>
      <el-row>
          <el-col :span="16">
            <el-row>
              <el-col :span="12" class="col-height">
<<<<<<< HEAD
                <el-form-item label="申请类型" class="Form_item" prop="applyType">
                  <el-radio-group v-model="form.applyType">
                    <el-radio v-for="(item, index) in json.zyz_apply_type" :key="index" :label="item.value">{{item.text}}</el-radio>
=======
                <el-form-item :label="$t('申请类型')" class="Form_item" prop="applyType">
                  <el-radio-group v-model="form.applyType">
                    <el-radio v-for="(item, index) in  applyType" :key="index" :label="item.value">{{item.text}}</el-radio>
>>>>>>> master
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="col-height">
<<<<<<< HEAD
                <el-form-item label="国家/地区" class="Form_item" prop="nationality">
=======
                <el-form-item :label="$t('国家/地区')" class="Form_item" prop="nationality">
>>>>>>> master
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
<<<<<<< HEAD
                <el-form-item label="中文姓" class="Form_item" prop="chnLastName"
=======
                <el-form-item :label="$t('中文姓')" class="Form_item" prop="chnLastName"
>>>>>>> master
                  :rules="form.nationality==='CHN' || form.nationality==='HKG' ||form.nationality==='MAC' || form.nationality==='TPE'?rules.chnLastName:[{required: false}]">
                  <el-input size="mini"  v-model.trim="form.chnLastName" clearable placeholder="请填写姓名中的姓氏，例如张"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="col-height">
<<<<<<< HEAD
                <el-form-item label="中文名" class="Form_item" prop="chnFirstName"
=======
                <el-form-item :label="$t('中文名')" class="Form_item" prop="chnFirstName"
>>>>>>> master
                  :rules="form.nationality==='CHN' || form.nationality==='HKG' ||form.nationality==='MAC' || form.nationality==='TPE'?rules.chnFirstName:[{required: false}]">
                  <el-input size="mini"  v-model.trim="form.chnFirstName" clearable placeholder="请填写姓名中的名字，例如建国"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="col-height">
<<<<<<< HEAD
                <el-form-item label="英文姓" class="Form_item" prop="firstName">
                  <el-input size="mini"  v-model.trim="form.firstName" placeholder="中国内地填写汉语拼音，例如ZHANG" clearable @keyup.native="form.firstName=form.firstName.toUpperCase()"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="col-height">
                <el-form-item label="英文名" class="Form_item" prop="lastName">
                  <el-input size="mini"  v-model.trim="form.lastName" placeholder="中国内地填写汉语拼音,例如JIANGUO" clearable @keyup.native="form.lastName=form.lastName.toUpperCase()"></el-input>
=======
                <el-form-item :label="$t('英文姓')" class="Form_item" prop="firstName">
                  <el-input size="mini"  v-model.trim="form.firstName" :placeholder="$t('中国内地填写汉语拼音，例如ZHANG')" clearable @keyup.native="form.firstName=form.firstName.toUpperCase()"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="col-height">
                <el-form-item :label="$t('英文名')" class="Form_item" prop="lastName">
                  <el-input size="mini"  v-model.trim="form.lastName" :placeholder="$t('中国内地填写汉语拼音，例如JIANGUO')" clearable @keyup.native="form.lastName=form.lastName.toUpperCase()"></el-input>
>>>>>>> master
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item label-width="0" class="Form_item" prop="headPicUrl">
              <div  class="imgDiv">
                <el-upload style="float:left" ref="upload" :show-file-list="false" accept=".jpg," :limit="1"
                :http-request="uploadHttpDefault" :on-success="uploadSuccess" action="https://jsonplaceholder.typicode.com/posts/">
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
<<<<<<< HEAD
          <el-form-item label="证件类型" class="Form_item" prop="credentialType">
=======
          <el-form-item :label="$t('证件类型')" class="Form_item" prop="credentialType">
>>>>>>> master
            <el-select v-model="form.credentialType" clearable class="set-width" @change="changeCredentialNo">
              <el-option v-for="item in credential_type" :key="`credentialType${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="position: relative;" class="col-height">
<<<<<<< HEAD
          <el-form-item label="证件号" class="Form_item" prop="credentialNo">
=======
          <el-form-item :label="$t('证件号')" class="Form_item" prop="credentialNo">
>>>>>>> master
            <el-col :span="16">
              <el-input size="mini" v-model.trim="form.credentialNo" clearable @blur="changeCredentialNo"  @keyup.native="form.credentialNo=form.credentialNo.toUpperCase()"></el-input>
            </el-col>
            <!-- <el-col :span="6" :offset="2">
              <el-button @click="$router.push({path: '/personalMana/allege'})">证件申诉</el-button>
            </el-col> -->
            <!-- <div style="position: absolute;right:-80px;top:0px;width:80px;cursor: pointer;">
              <img class="gantan" src="../../../../assets/images/gantan.png" alt="" @click="appealDialog">
              <span class="tip-gantan">证件申诉</span>
            </div> -->
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item label="证件有效期" class="Form_item" prop="credentialPeriod">
            <el-date-picker v-model="form.credentialPeriod" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
<<<<<<< HEAD
          <el-form-item label="出生年月" class="Form_item" prop="birth">
=======
          <el-form-item :label="$t('出生日期')" class="Form_item" prop="birth">
>>>>>>> master
            <el-date-picker :disabled="form.credentialType==='CID'" v-model="form.birth" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"
              style="width: 100%" :picker-options="{
              disabledDate: (date) => {
                return form.credentialType!=='CID' ? new Date(date).getTime() > new Date(2002, 8, 30).getTime(): false
              }
            }"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
<<<<<<< HEAD
          <el-form-item label="性别" class="Form_item" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio :disabled="form.credentialType==='CID'" v-for="(item, index) in json.sex" :key="index" :label="item.value">{{item.text}}</el-radio>
=======
          <el-form-item :label="$t('性别')" class="Form_item" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio :disabled="form.credentialType==='CID'" v-for="(item, index) in sex" :key="index" :label="item.value">{{item.text}}</el-radio>
>>>>>>> master
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
<<<<<<< HEAD
          <el-form-item label="是否为在校大学生" class="Form_item"  label-width="150px" prop="volunteerType">
            <el-radio-group v-model="form.volunteerType">
              <el-radio v-for="(item, index) in json.yes_no_label" :key="index" :label="item.value">{{item.text}}</el-radio>
=======
          <el-form-item :label="$t('是否为在校大学生')" class="Form_item"  label-width="150px" prop="volunteerType">
            <el-radio-group v-model="form.volunteerType">
              <el-radio v-for="(item, index) in volunteerType" :key="index" :label="item.value">{{item.text}}</el-radio>
>>>>>>> master
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='Y'" class="col-height">
          <el-form-item label="学校名称" class="Form_item" prop="school">
            <el-select v-model="form.school" filterable clearable class="set-width" @change="changeSchool">
              <el-option v-for="item in height_schools" :key="`school${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='Y'" class="col-height">
          <el-form-item label="入学时间" class="Form_item" prop="enrollmentDate">
            <el-date-picker v-model="form.enrollmentDate" type="month" value-format="yyyy-MM" placeholder="选择年月" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='Y'" class="col-height">
          <el-form-item label="院系" class="Form_item" prop="faculty">
            <el-select v-model="form.faculty" filterable clearable class="set-width">
              <el-option v-for="item in json.zyz_faculty" :key="`faculty${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='Y'" class="col-height">
          <el-form-item label="专业" class="Form_item" prop="major">
            <el-select v-model="form.major" filterable clearable class="set-width">
              <el-option v-for="item in json.major" :key="`major${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='Y'" class="col-height">
          <el-form-item label="学号" class="Form_item" prop="studentNumber">
            <el-input size="mini"  v-model.trim="form.studentNumber" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
<<<<<<< HEAD
          <el-form-item label="志愿组织" class="Form_item" prop="organizationId">
=======
          <el-form-item :label="$t('志愿组织')" class="Form_item" prop="organizationId">
>>>>>>> master
            <el-select v-model="form.organizationId" clearable class="set-width">
              <el-option v-for="item in organizationList" :key="`organization${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='N'" class="col-height">
          <el-form-item label="所在单位" class="Form_item" prop="company">
            <el-input size="mini"  v-model.trim="form.company" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='N'" class="col-height">
          <el-form-item label="职业" class="Form_item" prop="occupation">
            <el-select v-model="form.occupation" clearable class="set-width">
              <el-option v-for="item in json.zyz_occupation" :key="`health${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='N'" class="col-height">
          <el-form-item label="学历" class="Form_item" prop="heghestEducation">
            <el-select v-model="form.heghestEducation" clearable class="set-width">
              <el-option v-for="item in json.education" :key="`health${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
<<<<<<< HEAD
          <el-form-item label="健康状况" class="Form_item" prop="health">
=======
          <el-form-item :label="$t('健康状况')" class="Form_item" prop="health">
>>>>>>> master
            <el-select v-model="form.health" clearable class="set-width">
              <el-option v-for="item in json.health" :key="`health${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
<<<<<<< HEAD
          <el-form-item label="身高(CM)" class="Form_item" prop="height">
=======
          <el-form-item :label="`${$t('身高')}(CM)`" class="Form_item" prop="height">
>>>>>>> master
            <el-input size="mini" v-model.trim="form.height" clearable type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="position: relative;" class="col-height">
<<<<<<< HEAD
          <el-form-item label="服装尺码" class="Form_item" prop="clothesSize">
=======
          <el-form-item :label="$t('服装尺码')" class="Form_item" prop="clothesSize">
>>>>>>> master
            <el-select v-model="form.clothesSize" clearable class="set-width">
              <el-option v-for="item in json.clothes_size" :key="`clothesSize${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
            <div style="position: absolute;right:-20px;top:0px;width:20px;cursor: pointer;">
              <img class="size" src="../../../../assets/images/size.png" alt="" @click="sizeDialog">
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
<<<<<<< HEAD
          <el-form-item label="体重(KG)" class="Form_item" prop="weight">
=======
          <el-form-item :label="`${$t('体重')}(KG)`" class="Form_item" prop="weight">
>>>>>>> master
            <el-input size="mini"  v-model.trim="form.weight" clearable type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="position: relative;" class="col-height">
<<<<<<< HEAD
          <el-form-item label="鞋子尺码" class="Form_item" prop="shoesSize">
=======
          <el-form-item :label="$t('鞋子尺码')" class="Form_item" prop="shoesSize">
>>>>>>> master
            <el-select v-model="form.shoesSize" clearable class="set-width">
              <el-option v-for="item in json.shoes_size" :key="`shoesSize${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
            <div style="position: absolute;right:-15px;top:0px;width:20px;cursor: pointer;z-index: 99;">
              <img class="size" src="../../../../assets/images/size.png" alt="" @click="shoesDialog">
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="position: relative;" class="col-height">
<<<<<<< HEAD
          <el-form-item label="裤子尺码" class="Form_item">
=======
          <el-form-item :label="$t('裤子尺码')" class="Form_item">
>>>>>>> master
            <el-select v-model="form.trouserSize" clearable class="set-width">
              <el-option v-for="item in json.trouser_size" :key="`trouserSize${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
            <div style="position: absolute;right:-20px;top:0px;width:20px;cursor: pointer;">
              <img class="size" src="../../../../assets/images/size.png" alt="" @click="trousersDialog">
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
<<<<<<< HEAD
          <el-form-item label="血型" class="Form_item" prop="blood">
=======
          <el-form-item :label="$t('血型')" class="Form_item" prop="blood">
>>>>>>> master
            <el-select v-model="form.blood" clearable class="set-width">
              <el-option v-for="item in json.blood" :key="`blood${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
<<<<<<< HEAD
          <el-form-item label="特长" class="Form_item" prop="speciality">
=======
          <el-form-item :label="$t('特长')" class="Form_item" prop="speciality">
>>>>>>> master
            <el-select v-model="form.speciality" clearable class="set-width">
              <el-option v-for="item in json.speciality" :key="`speciality${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="col-height">
<<<<<<< HEAD
          <el-form-item label="身体是否残疾" class="Form_item" label-width="120px" prop="disabilityFlag">
            <el-radio-group v-model="form.disabilityFlag">
              <el-radio v-for="(item, index) in json.yes_no_label" :key="index" :label="item.value">{{item.text}}</el-radio>
=======
          <el-form-item :label="$t('身体是否残疾')" class="Form_item" label-width="120px" prop="disabilityFlag">
            <el-radio-group v-model="form.disabilityFlag">
              <el-radio v-for="(item, index) in disabilityFlag" :key="index" :label="item.value">{{item.text}}</el-radio>
>>>>>>> master
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.disabilityFlag === 'Y'">
        <el-col :span="24">
          <el-form-item class="Form_item" label-width="100px" prop="disabilityType">
            <el-checkbox-group v-model="form.disabilityType">
              <el-checkbox v-for="(item, index) in json.zyz_disability_type" :key="index" :label="item.value">{{item.text}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="col-height">
<<<<<<< HEAD
          <el-form-item label="政治面貌" class="Form_item" prop="politicalOutlook"
=======
          <el-form-item :label="$t('政治面貌')" class="Form_item" prop="politicalOutlook"
>>>>>>> master
            :rules="form.nationality==='CHN'?rules.politicalOutlook:[{required: false}]">
            <el-select v-model="form.politicalOutlook" clearable class="set-width">
              <el-option v-for="item in json.political_outlook" :key="`politicalOutlook${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
<<<<<<< HEAD
          <el-form-item label="民族" class="Form_item" prop="nation"
=======
          <el-form-item :label="$t('民族')" class="Form_item" prop="nation"
>>>>>>> master
            :rules="form.nationality==='CHN'?rules.nation:[{required: false}]">
            <el-select v-model="form.nation" clearable class="set-width">
              <el-option v-for="item in json.nation" :key="`nation${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
<<<<<<< HEAD
          <el-form-item label="已分配岗位" class="Form_item">
=======
          <el-form-item :label="$t('已分配岗位')" class="Form_item">
>>>>>>> master
            <el-select v-model="form.postCode" clearable style="width: 100%" :disabled="!isId">
              <el-option v-for="item in json.zyz_post" :key="item.value" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
<<<<<<< HEAD
          <el-form-item label="需求单位" class="Form_item">
=======
          <el-form-item :label="$t('需求单位')" class="Form_item">
>>>>>>> master
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
import json from './data'
import country from './country'
 
export default {
  components: {
    addDialog,
    appealDialog,
    addDialogShoes,
    addDialogTrousers,
  },
  mixins: [mixin],
  json,
  props: {
    //TODO form改data里面，采用方法赋值和取值，提升性能(安林娜)
    
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
      json,
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
      country,
      height_schools: [
     {"text":"不签约大学","enText":"不签约大学","value":"100001","description":""},{"text":"签约大学","enText":"签约大学","value":"100002","description":""},{"text":"导入大学","enText":"导入大学","value":"100003","description":""},{"text":"成都大学","enText":"成都大学","value":"104","description":""}
      ],
      units: [],
<<<<<<< HEAD
      form: {
        userId : '',
      volunteerType : '',
      volunteerStatus : '',
      chnName : '',
      firstName : '',
      lastName : '',
      mobile : '',
      headPicUrl : '',
      url : '',
      nationality : '',
      nation : '',
      sex : '',
      birth : '',
      school : '',
      faculty : '',
      studentNumber : '',
      credentialType : '',
      credentialNo : '',
      credentialPeriod : '',
      qq : '',
      wechat : '',
      politicalOutlook : '',
      company : '',
      heghestEducation : '',
      foreignLanguage : '',
      languageLevel : '',
      enrollmentDate : '',
      blood : '',
      emergencyContact : '',
      emergencyContactPhone : '',
      email : '',
      height : '',
      weight : '',
      clothesSize : '',
      shoesSize : '',
      trouserSize : '',
      major : '',
      occupation : '',
      speciality : '',
      health : '',
      domicileProvince : '',
      domicileCity : '',
      domicileArea : '',
      domicileAddress : '',
      censusProvince : '',
      censusCity : '',
      censusArea : '',
      censusAddress : '',
      // volExperienceOption = []
      applyType : '',
      chnFirstName : '',
      chnLastName : '',
      disabilityFlag : '',
      disabilityType: [],
      experienceFlag : '',
      chineseLevel : '',
      postCode : '',
      unit : '',
      }, // 外部传进来的表单
      organizationList: 
       [{"text":"测试","enText":"","value":"83a5ca3a-3a4b-4370-a252-fe30fb934a5e","description":""},{"text":"测试志愿组织","enText":"","value":"2cbd7952-805b-49fb-b696-143d6ee81587","description":""},{"text":"冬奥yyds","enText":"","value":"3fb8bcf0-a25d-4dc3-8b2a-9c7a3f93e653","description":""},{"text":"复仇者联盟","enText":"","value":"7d588dd1-142a-48bd-9719-894560781265","description":""},{"text":"冬奥牛逼","enText":"","value":"d2ec7bb3-de57-40de-a8a8-cba46fad2f93","description":""}
      ], // 志愿组织列表
      rules: {
        faculty : [
        {
          required: true,
          validator: this.checkFaculty,
          trigger: 'change',
        },
      ],
      applyType : [
				{
					required: true,
					message: '申请类型不可为空',
					trigger: 'change',
				},
      ],
      nationality : [
				{
					required: true,
					message: '国家/地区不可为空',
					trigger: 'change',
				},
      ],
      chnLastName : [
				{
					required: true,
          // message: '中文姓不可为空',
          validator: this.checkChnLastName,
					trigger: 'blur',
				},
      ],
      chnFirstName : [
				{
					required: true,
          // message: '中文名不可为空',
          validator: this.checkChnFirstName,
					trigger: 'blur',
				},
      ],
      firstName : [
				{
					required: true,
					message: '英文姓不可为空',
					trigger: 'blur',
				},
      ],
      lastName : [
				{
					required: true,
					message: '英文名不可为空',
					trigger: 'blur',
				},
      ],
      credentialType : [
				{
					required: true,
					message: '证件类型不可为空',
					trigger: 'change',
				},
      ],
      credentialPeriod : [
				{
					required: true,
					message: '证件有效期不可为空',
					trigger: 'change',
				},
      ],
      birth : [
				{
					required: true,
					message: '出生日期不可为空',
					trigger: 'change',
				},
      ],
      credentialNo : [
				{
					required: true,
          // message: '证件号不可为空',
          validator: this.checkCardId,
					trigger: 'blur',
				},
      ],
      sex : [
				{
					required: true,
					message: '性别不可为空',
					trigger: 'change',
				},
      ],
      volunteerType : [
				{
					required: true,
					message: '是否为在校大学生不可为空',
					trigger: 'change',
				},
      ],
      school : [
				{
					required: true,
					message: '学校名称不可为空',
					trigger: 'change',
				},
      ],
      major : [
				{
					required: true,
					message: '专业不可为空',
					trigger: 'change',
				},
      ],
      height : [
				{
					required: true,
					message: '身高(CM)不可为空',
					trigger: 'blur',
				},
      ],
      clothesSize : [
				{
					required: true,
					message: '衣服尺码不可为空',
					trigger: 'change',
				},
      ],
      trouserSize : [
				{
					required: true,
					message: '裤子尺码不可为空',
					trigger: 'change',
				},
      ],
      shoesSize : [
				{
					required: true,
					message: '鞋子尺码不可为空',
					trigger: 'change',
				},
      ],
      disabilityFlag : [
				{
					required: true,
					message: '身体是否残疾不可为空',
					trigger: 'change',
				},
      ],
      politicalOutlook : [
				{
					required: true,
          // message: '政治面貌不可为空',
          validator: this.checkPoliticalOutlook,
					trigger: 'change',
				},
      ],
      nation : [
				{
					required: true,
          // message: '民族不可为空',
          validator: this.checkNation,
					trigger: 'change',
				},
      ],
      speciality : [
				{
					required: true,
					message: '特长不可为空',
					trigger: 'change',
				},
      ],
      checkboxGroup1 : [
				{
					required: true,
					message: '期望岗位不可为空',
					trigger: 'change',
				},
      ],
      company : [
				{
					required: true,
					message: '所在单位不可为空',
					trigger: 'blur',
				},
      ],
      occupation : [
				{
					required: true,
					message: '职业不可为空',
					trigger: 'change',
				},
      ],
      heghestEducation : [
				{
					required: true,
					message: '学历不可为空',
					trigger: 'change',
				},
      ],
      // volExperienceOption : [
      //   {
			// 		required: true,
			// 		message: '期望岗位不可为空',
      //     trigger: 'change',
      //   },
      // ]
      headPicUrl : [
        {
					required: true,
					message: '请上传头像',
          trigger: 'change',
        },
      ],
      domicileProvince : [
				{
					required: true,
					message: '现居住省不可为空',
					trigger: 'change',
				},
      ],
      domicileCity : [
				{
					required: true,
					message: '现居住市不可为空',
					trigger: 'change',
				},
      ],
      domicileArea : [
				{
					required: true,
					message: '现居住区不可为空',
					trigger: 'change',
				},
      ],
      domicileAddress : [
				{
					required: true,
					message: '现居住详细地址不可为空',
					trigger: 'blur',
				},
      ],
      censusProvince : [
				{
					required: true,
					message: '户籍省不可为空',
					trigger: 'change',
				},
      ],
      censusCity : [
				{
					required: true,
					message: '户籍市不可为空',
					trigger: 'change',
				},
      ],
      censusArea : [
				{
					required: true,
					message: '户籍区不可为空',
					trigger: 'change',
				},
      ],
      censusAddress : [
				{
					required: true,
					message: '户籍详细地址不可为空',
					trigger: 'blur',
				},
      ],
      email : [
				{
					required: true,
					message: '邮箱不可为空',
					trigger: 'blur',
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur',
        },
      ],
      emergencyContact : [
				{
					required: true,
					message: '紧急联系人不可为空',
					trigger: 'blur',
				},
      ],
      emergencyContactPhone : [
				{
					required: true,
          // message: '紧急联系人电话不可为空',
          validator: this.checkPhone,
					trigger: 'blur',
				},
      ],
      experienceFlag : [
				{
					required: true,
					message: '请选择志愿经历',
					trigger: 'blur',
				},
      ],
      wechat : [
        {
          required: true,
					message: '微信不能为空',
					trigger: 'blur',
        },
      ]
      }

      
=======
      form: {}, // 外部传进来的表单
      organizationList: [], // 志愿组织列表
      applyType:[{text:'赛会志愿者',value:'赛会志愿者'},{text:'城市志愿者',value:'城市志愿者'}],
      disabilityFlag:[{text:'是',value:true},{text:'否',value:false}],
      sex:[{text:'男',value:1},{text:'女',value:0}],
      volunteerType:[{text:'是',value:true},{text:'否',value:false}],
>>>>>>> master
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
        DrowList = this.json.credential_type.filter(items => items.value === 'CID')
      } else if (this.form.nationality === 'TPE') { // 国家/地区是中国台北、只能选择台湾居民来往大陆通行证
        DrowList = this.json.credential_type.filter(items => items.value === 'TWT')
      } else if (this.form.nationality === 'HKG' || this.form.nationality === 'MAC') { // 国家/地区是中国澳门、中国香港，只能选择港澳居民来往内地通行证
        DrowList = this.json.credential_type.filter(items => items.value === 'GAT')
      } else { // 国家/地区除了以上的，只能选择护照了
        DrowList = this.json.credential_type.filter(items => items.value === 'PAS')
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
    isCardID (sId) {
        let iSum = 0
        const aCity = {
       11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外',
      }
      console.log(sId)
        if (!/^\d{17}(\d|x)$/i.test(sId)) return '你输入的身份证长度或格式错误'
        // eslint-disable-next-line no-param-reassign
        sId = sId.replace(/x$/i, 'a')
        // eslint-disable-next-line radix
        if (aCity[parseInt(sId.substr(0, 2))] === null) return '你的身份证地区非法'
        const sBirthday = `${sId.substr(6, 4)}-${Number(sId.substr(10, 2))}-${Number(sId.substr(12, 2))}`
        const d = new Date(sBirthday.replace(/-/g, '/'))
        if (sBirthday !== (`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)) return '身份证上的出生日期非法'
        // eslint-disable-next-line no-plusplus
        for (let i = 17; i >= 0; i--) iSum += ((2 ** i) % 11) * parseInt(sId.charAt(17 - i), 11)
        if (iSum % 11 !== 1) return '你输入的身份证号非法'
        // aCity[parseInt(sId.substr(0,2))]+','+sBirthday+','+(sId.substr(16,1)%2?'男':'女')//此次还可以判断出输入的身份证号的人性别
        return 'true'
      },
      checkCardId (rule, value, callback) {
        console.log(value)
        // eslint-disable-next-line no-debugger
        console.log(this.form)
        if (this.form.credentialType === 'CID') {
          const result = this.isCardID(value)
          if (result === 'true') {
            callback()
          } else {
            callback(new Error(result))
          }
        } else if (!value) {
          callback('证件号不可为空')
        } else {
          callback()
        }
      },
      checkChnLastName (rule, value, callback) {
        if (this.form.nationality === 'CHN') {
          if (!value) {
            callback('中文姓不可为空')
          } else {
            callback()
          }
        } else {
          callback()
        }
      },
      checkChnFirstName (rule, value, callback) {
        if (this.form.nationality === 'CHN') {
          if (!value) {
            callback('中文名不可为空')
          } else {
            callback()
          }
        } else {
          callback()
        }
      },
      checkPoliticalOutlook (rule, value, callback)  {
        if (this.form.nationality === 'CHN') {
          if (!value) {
            callback('政治面貌不可为空')
          } else {
            callback()
          }
        } else {
          callback()
        }
      },
      checkNation (rule, value, callback) {
        if (this.form.nationality === 'CHN') {
          if (!value) {
            callback('民族不可为空')
          } else {
            callback()
          }
        } else {
          callback()
        }
      },
      checkFaculty (rule, value, callback) {
        if (this.form.volunteerType === 'Y') {
          if (!value) {
            callback('院系不可为空')
          } else {
            callback()
          }
        }
      },
     
      checkPhone(rule, value, callback) {
        const regExpPhone = /^1[3456789]\d{9}$/ // 手机号 正则验证
        if (!value) {
          callback(new Error('紧急联系人电话不可为空'))
        } else if (!regExpPhone.test(value)) {
            callback(new Error('电话格式错误'))
          } else {
            callback()
          }
      },


    /**
     * function 证件号改变判断是否为居民身份证，如果是自动带出性别和出生日期
     */
    changeCredentialNo() {
     
      // 验证是否已经存在
      
      this.$refs.form.validateField('credentialNo', (valid) => {
        if (valid === '') {
          if (this.form.credentialType === 'CID' && this.form.credentialNo !== '') {
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
      this.$refs.form.clearValidate()

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
    background: url('../../../../assets/images/avatar.png') no-repeat;
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
