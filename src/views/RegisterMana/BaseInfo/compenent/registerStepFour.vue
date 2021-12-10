<template>
  <div class="step-four">
    <el-form ref="form" :model="form" label-width="110px" disabled>
      <div class="title">①基本信息</div>
      <el-row>
        <el-col :span="16">
          <el-row>
            <el-col :span="12" class="col-height">
              <el-form-item :label="$t('申请类型')" class="Form_item" prop="applyType">
                <el-radio-group v-model="form.applyType">
                  <el-radio v-for="(item, index) in applyType" :key="index" :label="item.value">{{item.text}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="col-height">
              <el-form-item :label="$t('国家/地区')" class="Form_item" prop="nationality">
                <el-select v-model="form.nationality" filter clearable class="set-width">
                  <el-option v-for="item in country" :key="`nationality${item.countryCode}`" :value="item.countryCode" :label="item.countryName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <div>
              <el-popover
                placement="right"
                width="520"
                trigger="click">
                <!-- <el-button slot="reference" class="refer-style">姓名填写不规范？请点击这里!</el-button> -->
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
              <el-form-item :label="$t('中文姓')" class="Form_item" prop="chnLastName">
                <el-input size="mini"  v-model.trim="form.chnLastName" clearable placeholder="请填写姓名中的姓氏，例如张"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="col-height">
              <el-form-item :label="$t('中文名')" class="Form_item" prop="chnFirstName">
                <el-input size="mini"  v-model.trim="form.chnFirstName" clearable placeholder="请填写姓名中的名字，例如建国"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="col-height">
              <el-form-item :label="$t('英文姓')" class="Form_item" prop="firstName">
                <el-input size="mini"  v-model.trim="form.firstName" :placeholder="$t('中国内地填写汉语拼音，例如ZHANG')" clearable @keyup.native="form.firstName=form.firstName.toUpperCase()"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="col-height">
              <el-form-item :label="$t('英文名')" class="Form_item" prop="lastName">
                <el-input size="mini"  v-model.trim="form.lastName" :placeholder="$t('中国内地填写汉语拼音，例如JIANGUO')" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="col-height">
              <el-form-item :label="$t('证件类型')" class="Form_item" prop="credentialType">
                <el-select v-model="form.credentialType" clearable class="set-width">
                  <el-option v-for="item in credential_type" :key="`credentialType${item.value}`" :value="item.value" :label="item.text"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="position: relative;" class="col-height">
              <el-form-item :label="$t('证件号')" class="Form_item" prop="credentialNo">
                <el-input size="mini" v-model.trim="form.credentialNo" clearable></el-input>
                <!-- <div style="position: absolute;right:-80px;top:0px;width:80px;cursor: pointer;">
                  <img class="gantan" src="../../../../assets/images/gantan.png" alt="" @click="appealDialog">
                  <span class="tip-gantan">证件申诉</span>
                </div> -->
              </el-form-item>
            </el-col>
            <el-col :span="12" class="col-height">
              <el-form-item :label="$t('证件有效期')" class="Form_item" prop="credentialPeriod">
                <el-date-picker v-model="form.credentialPeriod" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="col-height">
              <el-form-item :label="$t('出生日期')" class="Form_item" prop="birth">
                <el-date-picker :disabled="form.credentialType==='CID'" v-model="form.birth" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"
                  style="width: 100%" :picker-options="{
                  disabledDate: (date) => {
                    return form.credentialType!=='CID' ? new Date(date).getTime() > new Date(2002, 5, 30).getTime(): false
                  }
                }"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item label-width="0" class="Form_item" prop="headPicUrl">
            <!-- <el-upload style="float:left" ref="upload" :show-file-list="false" accept=".jpg," :limit="1"
            :http-request="uploadHttpDefault" :on-success="uploadSuccess" :action="apis.File_ZyzImageUpload"> -->
            <div class="imgDiv">
              <div class="pictureBG">
                <img :src="returnPicUrl(form.url)" alt="">
              </div>
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
          <el-form-item :label="$t('性别')" class="Form_item" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio :disabled="form.credentialType==='CID'" v-for="(item, index) in sex" :key="index" :label="item.value">{{item.text}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="$t('是否为在校大学生')" class="Form_item"  label-width="150px" prop="volunteerType">
            <el-radio-group v-model="form.volunteerType">
              <el-radio v-for="(item, index) in volunteerType" :key="index" :label="item.value">{{item.text}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="$t('血型')" class="Form_item" prop="blood">
            <el-select v-model="form.blood" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.blood" :key="`blood${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='Y'" class="col-height">
          <el-form-item :label="$t('schoolName')" class="Form_item" prop="school">
            <el-select v-model="form.school" filterable clearable class="set-width">
              <el-option v-for="item in height_schools" :key="`school${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='Y'" class="col-height">
          <el-form-item :label="$t('admission')" class="Form_item" prop="enrollmentDate">
            <el-date-picker v-model="form.enrollmentDate" type="month" value-format="yyyy-MM" placeholder="选择年月" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="$t('志愿组织')" class="Form_item" prop="organizationId">
            <el-select v-model="form.organizationId" clearable class="set-width">
              <el-option v-for="item in organizationList" :key="`organization${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='Y'" class="col-height">
          <el-form-item :label="$t('所在单位')" class="Form_item" prop="faculty">
            <el-select v-model="form.faculty" filterable clearable class="set-width">
              <el-option v-for="item in volunteerType" :key="`faculty${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='Y'" class="col-height">
          <el-form-item :label="$t('职业')" class="Form_item" prop="major">
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
        <el-col :span="8" class="col-height">
          <el-form-item :label="$t('特长')" class="Form_item" prop="speciality">
            <el-select v-model="form.speciality" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.speciality" :key="`speciality${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.volunteerType=='N'" class="col-height">
          <el-form-item :label="$t('教育背景')" class="Form_item" prop="heghestEducation">
            <el-select v-model="form.heghestEducation" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.education" :key="`health${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="$t('健康状况')" class="Form_item" prop="health">
            <el-select v-model="form.health" clearable class="set-width">
              <el-option v-for="item in health" :key="`health${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="position: relative;" class="col-height">
          <el-form-item :label="$t('服装尺码')" class="Form_item" prop="clothesSize">
            <el-select v-model="form.clothesSize" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.clothes_size" :key="`clothesSize${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
            <!-- <div style="position: absolute;right:-20px;top:0px;width:20px;cursor: pointer;">
              <img class="size" src="../../../../assets/images/size.png" alt="">
            </div> -->
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="`${$t('身高')}(CM)`" class="Form_item" prop="height">
            <el-input size="mini" v-model.trim="form.height" clearable type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="`${$t('体重')}(KG)`" class="Form_item" prop="weight">
            <el-input size="mini"  v-model.trim="form.weight" clearable type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="position: relative;" class="col-height">
          <el-form-item :label="$t('鞋子尺码')" class="Form_item" prop="shoesSize">
            <el-select v-model="form.shoesSize" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.shoes_size" :key="`shoesSize${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
            <!-- <div style="position: absolute;right:-20px;top:0px;width:20px;cursor: pointer;">
              <img class="size" src="../../../../assets/images/size.png" alt="">
            </div> -->
          </el-form-item>
        </el-col>
        <el-col :span="8" style="position: relative;" class="col-height">
          <el-form-item :label="$t('裤子尺码')" class="Form_item" prop="trouserSize">
            <el-select v-model="form.trouserSize" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.trouser_size" :key="`trouserSize${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
            <!-- <div style="position: absolute;right:-20px;top:0px;width:20px;cursor: pointer;">
              <img class="size" src="../../../../assets/images/size.png" alt="" @click="trousersDialog">
            </div> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="col-height">
          <el-form-item :label="$t('身体是否残疾')" class="Form_item" label-width="120px" prop="disabilityFlag">
            <el-radio-group v-model="form.disabilityFlag">
              <el-radio v-for="(item, index) in disabilityFlag" :key="index" :label="item.value">{{item.text}}</el-radio>
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
          <el-form-item :label="$t('政治面貌')" class="Form_item" prop="politicalOutlook">
            <el-select v-model="form.politicalOutlook" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.political_outlook" :key="`politicalOutlook${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col-height">
          <el-form-item :label="$t('民族')" class="Form_item" prop="nation">
            <el-select v-model="form.nation" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.nation" :key="`nation${item.value}`" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('已分配岗位')" class="Form_item">
            <el-select v-model="form.postCode" clearable style="width: 100%" disabled>
              <el-option v-for="item in DROPDOWNBOX.zyz_post" :key="item.value" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('需求单位')" class="Form_item">
            <el-select v-model="form.unit" clearable style="width: 100%" disabled>
              <el-option v-for="item in units" :key="item.value" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="24">
          <el-form-item :label="$t('expect-post')" class="Form_item" prop="volExperienceOption">
            <span class="span-con">最多可选4项</span>
            <el-checkbox-group v-model="form.volExperienceOption" :max="4">
              <el-checkbox-button v-for="(item, index) in DROPDOWNBOX.zyz_service_position" :key="index" :label="item.value">{{item.text}}</el-checkbox-button>
            </el-checkbox-group>
            </el-form-item>
        </el-col> -->
      </el-row>
      <div class="title">②联系信息</div>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('现居住省')" class="Form_item" prop="domicileProvince">
            <el-select v-model="form.domicileProvince" clearable class="set-width" @change="changedomicileProvince">
              <el-option v-for="item in province" :key="`domicileProvince${item.provinceCode}`" :value="item.provinceCode" :label="item.provinceName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('现居住市')" class="Form_item" prop="domicileCity">
            <el-select v-model="form.domicileCity" clearable class="set-width" @change="changeDomicileCity">
              <el-option v-for="item in domicileCity" :key="`domicileCity${item.cityCode}`" :value="item.cityCode" :label="item.cityName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('现居住区')" class="Form_item">
            <el-select v-model="form.domicileArea" clearable class="set-width">
              <el-option v-for="item in domicileArea" :key="`domicileArea${item.areaCode}`" :value="item.areaCode" :label="item.areaName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('现居住详细地址')" class="Form_item" prop="domicileAddress">
            <el-input size="mini"  v-model.trim="form.domicileAddress" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('户籍省')" class="Form_item" prop="censusProvince">
            <el-select v-model="form.censusProvince" clearable class="set-width" @change="changeCensusProvince">
              <el-option v-for="item in province" :key="`censusProvince${item.provinceCode}`" :value="item.provinceCode" :label="item.provinceName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('户籍市')" class="Form_item" prop="censusCity">
            <el-select v-model="form.censusCity" clearable class="set-width" @change="changeCensusCity">
              <el-option v-for="item in censusCity" :key="`censusCity${item.cityCode}`" :value="item.cityCode" :label="item.cityName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('户籍区')" class="Form_item">
            <el-select v-model="form.censusArea" clearable class="set-width">
              <el-option v-for="item in censusArea" :key="`censusArea${item.areaCode}`" :value="item.areaCode" :label="item.areaName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('户籍详细地址')" class="Form_item" prop="censusAddress">
            <el-input size="mini"  v-model.trim="form.censusAddress" clearable placeholder="填写内容必须与户籍所在地址一致！"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('QQ')" class="Form_item" prop="qq">
            <el-input size="mini"  v-model.trim="form.qq" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('微信')" class="Form_item" prop="wechat">
            <el-input size="mini"  v-model.trim="form.wechat" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('邮箱')" class="Form_item" prop="email">
            <el-input size="mini"  v-model.trim="form.email" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('紧急联系人')" class="Form_item" prop="emergencyContact">
            <el-input size="mini"  v-model.trim="form.emergencyContact" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('紧急联系人电话')" class="Form_item" prop="emergencyContactPhone">
            <el-input size="mini"  v-model.trim="form.emergencyContactPhone" clearable @blur="differentMoible"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">③技能信息</div>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('外语语种')" class="Form_item" prop="foreignLanguage">
            <el-select v-model="form.foreignLanguage" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.foreign_language" :key="item.value" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('外语等级')" class="Form_item" prop="languageLevel">
            <el-select v-model="form.languageLevel" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.language_level" :key="item.value" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('中文水平')" class="Form_item" prop="chineseLevel">
            <el-select v-model="form.chineseLevel" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.chinese_level" :key="item.value" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('志愿经历')" class="Form_item" prop="experienceFlag">
            <el-radio-group v-model="form.experienceFlag">
              <el-radio :label="'1'">{{$t('是')}}</el-radio>
              <el-radio :label="'0'">{{$t('否')}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="form.experienceFlag === '1'">
        <el-col :span="8">
          <el-form-item class="Form_item">
            <span>参与日期</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="Form_item">
            <span>赛会活动</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="Form_item">
            <span>服务岗位</span>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-show="form.experienceFlag === '1'">
        <el-row v-for="(item, index) in form.experience" :key="index">
          <el-col :span="8">
            <el-form-item class="Form_item" label-width="30px">
              <el-date-picker v-model="item.date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="Form_item" label-width="30px">
              <el-input size="mini"  v-model.trim="item.activity" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="Form_item" label-width="30px">
              <el-input size="mini"  v-model.trim="item.servicePost" clearable></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="1">
            <el-form-item class="Form_item" label-width="10px">
              <img class="img_item" src="../../../../assets/images/add.png" alt="" @click="addLine"
                v-show="form.volunteerStatus === '' || form.volunteerStatus === 'VS99' || form.volunteerStatus === 'VS07' || ifMistake === 'youwu'">
            </el-form-item>
          </el-col>
          <el-col :span="1" v-if="index!=0">
            <el-form-item class="Form_item" label-width="10px">
              <img class="img_item" src="../../../../assets/images/reduce.png" alt="" @click="reduceLine(index)"
                v-show="form.volunteerStatus === '' || form.volunteerStatus === 'VS99' || form.volunteerStatus === 'VS07' || ifMistake === 'youwu'">
            </el-form-item>
          </el-col> -->
        </el-row>
      </div>
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
    ifMistake: {
      required: false,
      type: String,
      default: '',
    },
  },
  data() {
    return {
      country: [],
      height_schools: [],
      form: {}, // 外部传进来的表单
      province: [],
      domicileCity: [],
      domicileArea: [],
      censusCity: [],
      censusArea: [],
      units: [],
      organizationList: [], // 志愿组织列表
       applyType:[{text:'赛会志愿者',value:'赛会志愿者'},{text:'城市志愿者',value:'城市志愿者'}],
      disabilityFlag:[{text:'是',value:true},{text:'否',value:false}],
      sex:[{text:'男',value:1},{text:'女',value:0}],
      volunteerType:[{text:'是',value:true},{text:'否',value:false}],
    }
  },
  created() {
    this.getCountry()
    this.getHeightSchool()
    this.getUnits()
    // 获取省
    this.$http.post(apis.OptionConfig_GetProvince).then((res) => {
      if (res.data.code === 200) {
        this.province = res.data.data
      }
    })
    this.getOrganizationList()
  },
  computed: {
    credential_type() {
      let DrowList = []
      // if (this.form.nationality === 'CHN') { // 如果国家/地区是中国，只能选择身份证
      //   DrowList = this.DROPDOWNBOX.credential_type.filter(items => items.value === 'CID')
      // } else if (this.form.nationality === 'TPE') { // 国家/地区是中国台北、只能选择台湾居民来往大陆通行证
      //   DrowList = this.DROPDOWNBOX.credential_type.filter(items => items.value === 'TWT')
      // } else if (this.form.nationality === 'HKG' || this.form.nationality === 'MAC') { // 国家/地区是中国澳门、中国香港，只能选择港澳居民来往内地通行证
      //   DrowList = this.DROPDOWNBOX.credential_type.filter(items => items.value === 'GAT')
      // } else { // 国家/地区除了以上的，只能选择护照了
      //   DrowList = this.DROPDOWNBOX.credential_type.filter(items => items.value === 'PAS')
      // }
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
.step-four {
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
</style>
<style lang="less">
.step-four {
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
