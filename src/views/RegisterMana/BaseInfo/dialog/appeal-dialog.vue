<template>
  <div class="dialog-container">
    <el-dialog :visible.sync="show" title="证件申诉" center :close-on-click-modal="false">
      <div class="appeal">
        <el-form ref="addForm" label-width="70px" :model="form" :rules="rules" label-position="left">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('userName')" class="add-border">
                <el-input v-model="form.value1" placeholder="请输入手机号">
                  <span slot="suffix" class="verifi">获取验证码</span>
                </el-input>
              </el-form-item>
              <el-form-item :label="$t('YZM')" class="add-border">
                <el-input v-model="form.value2" placeholder="请输入验证码"></el-input>
              </el-form-item>
              <el-form-item :label="$t('ZWXM')" class="add-border">
                <el-input v-model="form.value3" placeholder="请输入中文姓名"></el-input>
              </el-form-item>
              <el-form-item :label="$t('YWXM')" class="add-border">
                <el-input v-model="form.value4" placeholder="请输入英文姓名"></el-input>
              </el-form-item>
              <el-form-item :label="$t('ZJLX')" class="add-border">
                <el-input v-model="form.value5" placeholder="请输入证件类型"></el-input>
              </el-form-item>
              <el-form-item :label="$t('ZJH')" class="add-border">
                <el-input v-model="form.value6" placeholder="请输入证件号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div class="label-title">申诉原因</div>
              <el-form-item label-width="50px">
                <el-input type="textarea" :rows="11" placeholder="请输入申诉原因" v-model="form.value7"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <ul class="ul-float">
              <li>
                <img src="@/assets/images/+.png" alt="">
                <div class="text">添加身份证正面照</div>
              </li>
              <li>
                <img src="@/assets/images/+.png" alt="">
                <div class="text">添加身份证反面照</div>
              </li>
              <li>
                <img src="@/assets/images/+.png" alt="">
                <div class="text">添加手持证件照片</div>
              </li>
            </ul>
          </el-row>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="info" @click="show=false">{{$t('back')}}</el-button>
        <el-button type="primary" @click="confirm">申诉</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AppealDialogClass from './appeal-dialog-class'

export default {
  props: {
    show: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      visibleDialog: false,
      form: new AppealDialogClass('form'),
      rules: new AppealDialogClass('rule'),
    }
  },
  methods: {
    confirm() {},
  },
}
</script>

<style lang="less" scoped>
  .label-title {
    width: 56px;
    height: 20px;
    font-size: 14px;
    font-family: SourceHanSansSC-Regular,SourceHanSansSC;
    font-weight: 400;
    color: rgba(36,45,65,1);
    line-height: 20px;
    margin-left: 50px;
    margin-bottom: 15px;
  }
  .add-border {
    border-bottom: 1px solid #94989E;
  }
  .appeal {
    .el-form-item__label {
      text-align: left;
    }
    .el-input__inner {
      border: 0;
    }
    .el-form-item {
      margin-bottom: 8px;
    }
    .verifi {
      display: inline-block;
      width: 103px;
      height: 36px;
      background: rgb(40, 134, 220);
      border-radius: 4px;
      font-size: 14px;
      font-family: SourceHanSansSC-Regular,SourceHanSansSC;
      font-weight: 400;
      color: rgba(255,255,255,1);
      letter-spacing: 1px;
    }
  }
  .ul-float {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    li {
      width: 210px;
      height: 117px;
      border: 1px solid rgba(234,236,241,1);
      border-radius: 4px;
      text-align: center;
      padding-top: 60px;
    }
    .text {
      font-size: 16px;
      font-family: SourceHanSansSC-Regular,SourceHanSansSC;
      font-weight: 400;
      color: rgba(148,152,158,1);
      margin-top: 15px;
    }
  }
</style>
