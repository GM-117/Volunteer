<template>
  <div class="form-container step-three">
    <el-form ref="form" :model="form" label-width="81px" :rules="rules" :disabled="isDisabled">
      <!-- 标题 -->
      <div class="title">③技能信息</div>
      <el-row>
        <el-col :span="6">
          <el-form-item :label="$t('外语语种')" class="Form_item" prop="foreignLanguage">
            <el-select v-model="form.foreignLanguage" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.foreign_language" :key="item.value" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item :label="$t('外语等级')" class="Form_item" prop="languageLevel">
            <el-select v-model="form.languageLevel" clearable class="set-width">
              <el-option v-for="item in DROPDOWNBOX.language_level" :key="item.value" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
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
        <el-col :span="6">
          <el-form-item class="Form_item">
            <span>参与日期</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="Form_item">
            <span>赛会活动</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="Form_item">
            <span>服务岗位</span>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-show="form.experienceFlag === '1'">
        <el-row v-for="(item, index) in form.experience" :key="index">
          <el-col :span="6">
            <el-form-item class="Form_item" label-width="30px">
              <el-date-picker v-model="item.date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="Form_item" label-width="30px">
              <el-input size="mini"  v-model.trim="item.activity" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="Form_item" label-width="30px">
              <el-input size="mini"  v-model.trim="item.servicePost" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
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
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>
<script>
import mixin from '@/mixins/index'
// import dixtMixin from '@/mixins/dictMixin'
// import apis from '@/apis'

const defaultData = {
  id: '',
  volunteerId: '',
  date: '',
  activity: '',
  servicePost: '',
}
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
    ifMistake: {
      required: false,
      type: String,
      default: '',
    },
  },
  created() {
    // this.list.push(this.model)
  },
  data() {
    return {
      model: Object.assign({}, defaultData),
      sportList: [],
      form: {},
      // form: new UserSearchClass('form'), // 实例化一个表单的变量
      // rules: new UserSearchClass('rule'), // 实例化一个表单的规则
    }
  },
  watch: {
    'form.experienceFlag': {
      handler: function handler() {
        if (this.form.experienceFlag === '0') {
          this.form.experience = []
          return 'false'
        }
        if (this.form.experience.length === 0) {
          this.addLine()
        }
        return 'true'
      },
    },
  },
  methods: {
    sureEvent() {
      console.log(this.form)
    },
    addLine() {
      this.form.experience.push(Object.assign({}, defaultData))
    },
    reduceLine(index) {
      this.form.experience.splice(index, 1)
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
  },
}
</script>
<style lang="less" scoped>
// @import "../../../../assets/styles/mixin.scoped.less";
</style>
<style lang="less">
.step-three {
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
    .img_item {
      width: 20px;
      height: 20px;
      float: left;
      margin-top: 9px;
    }
  }
  .button-container {
    width: 100%;
    // text-align: center;
    .btn01 {
      width: 200px;
      height: 46px;
      margin: 10px;
      color: rgb(40, 134, 220);
    }
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
