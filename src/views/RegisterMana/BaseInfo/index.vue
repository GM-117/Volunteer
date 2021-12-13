<template>
  <div class="base-info">
    <div class="search-container">
      <!-- 页签 -->
      <div class="title-container">
        <div class="title_style">志愿者注册</div>
      </div>
    </div>
    <div class="form-container">
      <div class="nav-container">
        <div class="nav">
          <div style="float:left" :class="show === '1' ? 'a-style' : ''"><span :class="show === '1' ? 'num-class-active' : 'num-class'">1</span>基本信息</div>
          <div style="float:left"><img class="right-style" src="../../../assets/images/nextIcon.png" alt=""></div>
          <div style="float:left" :class="show === '2' ? 'a-style' : ''"><span :class="show === '2' ? 'num-class-active' : 'num-class'">2</span>联系信息</div>
          <div style="float:left"><img class="right-style" src="../../../assets/images/nextIcon.png" alt=""></div>
          <div style="float:left" :class="show === '3' ? 'a-style' : ''"><span :class="show === '3' ? 'num-class-active' : 'num-class'">3</span>技能信息</div>
          <div style="float:left"><img class="right-style" src="../../../assets/images/nextIcon.png" alt=""></div>
          <div style="float:left" :class="show === '4' ? 'a-style' : ''"><span :class="show === '4' ? 'num-class-active' : 'num-class'">4</span>确认信息</div>
        </div>
      </div>
        <!-- 标题 -->
      <div v-show="show === '1'">
        <register-Step-One ref="stepOne" :rules="rules" :isDisabled="isDisabled" :isId="isId"></register-Step-One>
      </div>
      <div v-show="show === '2'">
        <register-Step-Two ref="stepTwo" :rules="rules" :isDisabled="isDisabled"></register-Step-Two>
      </div>
      <div v-show="show === '3'">
        <register-Step-Three ref="stepThree" :rules="rules" :isDisabled="isDisabled"></register-Step-Three>
      </div>
      <div v-show="show === '4'">
        <register-step-four ref="stepFour"></register-step-four>
      </div>
    </div>
    <div class="button-container">
      <el-button class="btn" v-if="isPlayBack" @click="openDeleteDialog(4)">{{$t('返回')}}</el-button>
      <el-button class="btn" v-else @click="backEvent">{{$t('返回')}}</el-button>
      <el-button class="btn" v-show="show !== '1'" @click="upEvent">{{$t('上一步')}}</el-button>
      <el-button class="btn" v-show="isPlaySave" @click="saveEvent">{{$t('保存')}}</el-button>
      <el-button class="btn" v-show="show !== '4'" @click="nextEvent">{{$t('下一步')}}</el-button>
      <el-button class="btn" v-show="isPlayConfir" @click="openDeleteDialog(5)">{{$t('提交')}}</el-button>
    </div>
    <!-- 返回、提交提示弹窗 -->
    <confirm-dialog ref="confirmDialog" :show="confirmDialog.visible" :type="confirmDialog.type" @sureDialog="sureConfirmDialog" @closeDialog="changeConfirmDialog"></confirm-dialog>
  </div>
</template>
<script>
import mixin from '@/mixins/index'
// import dixtMixin from '@/mixins/dictMixin'
import dialogMixin from '@/mixins/dialogMixin'
import apis from '@/apis'
import registerStepOne from './compenent/registerStepOne.vue'
import registerStepTwo from './compenent/registerStepTwo.vue'
import registerStepThree from './compenent/registerStepThree.vue'
import registerStepFour from './compenent/registerStepFour.vue'
import confirmDialog from '@/components/confirmDialog.vue'
import UserSearchClass from './userSearchClass'

export default {
  components: {
    registerStepOne,
    registerStepTwo,
    registerStepThree,
    registerStepFour,
    confirmDialog,
  },
  mixins: [mixin, dialogMixin],
  data() {
    return {
      form: new UserSearchClass('form',this.form), // 实例化一个表单的变量
      rules: new UserSearchClass('rule', this), // 实例化一个表单的规则
      show: '3',
      ifMistake: '',
      confirmDialog: {
        visible: false,
        type: 4,
      },
      isId: false, // 批量操作编辑
    }
  },
  activated() {
    if (!this.$route.query.id) {
      this.getQuery()
    } else {
      // this.isId = true
      this.getQueryById()
    }
  },
  computed: {
    // 页面是否可编辑
    isDisabled() {
      return this.form.volunteerStatus !== '' && this.form.volunteerStatus !== 'VS99' && this.form.volunteerStatus !== 'VS07' && this.ifMistake !== 'youwu' && !this.isId
    },
    // 是否显示返回弹窗按钮
    isPlayBack() {
      return this.form.volunteerStatus === '' || this.form.volunteerStatus === 'VS99' || this.ifMistake === 'youwu' || this.isId
    },
    // 是否显示保存按钮
    isPlaySave() {
      return this.form.volunteerStatus === '' || this.form.volunteerStatus === 'VS99' || this.isId
    },
    // 是否显示提交
    isPlayConfir() {
      return this.show === '4'
        && (this.form.volunteerStatus === 'VS99' || this.form.volunteerStatus === 'VS07' || this.form.volunteerStatus === '' || this.ifMistake === 'youwu')
        && !this.isId
    },
  },
  methods: {
    /**
     * @function 进入页面调回显，先调取第二步骤里面封装的省市区联动方法，最后在赋值
     */
    getQuery() {
      this.$http.post(apis.ZyzRegistered_InformationQuery).then((res) => {
        if (res.data.code === 200) {
          Promise.all([
            // 获取子组件的值
            this.$refs['stepOne'].getFormData(),
            this.$refs['stepTwo'].getFormData(),
            this.$refs['stepThree'].getFormData(),
          ]).then(() => {
            this.form = {
              ...this.form,
              ...res.data.data,
            }
            if (this.$route.params.youWu) {
              this.ifMistake = this.$route.params.youWu
            }
            // 传值到子组件
            this.$refs['stepOne'].setFormData(this.form)
            this.$refs['stepTwo'].setFormData(this.form)
            this.$refs['stepThree'].setFormData(this.form)
            this.$refs['stepFour'].setFormData(this.form)
            // 回显数据后需要根据证件号带出年龄和性别
            this.$nextTick(() => {
              this.$refs['stepOne'].$refs.form.clearValidate()
              this.$refs['stepTwo'].$refs.form.clearValidate()
              this.$refs['stepThree'].$refs.form.clearValidate()
              this.$refs['stepFour'].$refs.form.clearValidate()
              if (res.data.data.credentialNo) {
                this.$refs['stepOne'].changeCredentialNo()
              }
            })
          })
        }
      })
    },
    /**
     * @function 根据id获取数据
     */
    getQueryById() {
      this.$http.post(apis.BatchOperatio_EditViewAsync, { id: this.$route.query.id }).then((res) => {
        if (res.data.code === 200) {
          Promise.all([
            // 获取子组件的值
            this.$refs['stepOne'].getFormData(),
            this.$refs['stepTwo'].getFormData(),
            this.$refs['stepThree'].getFormData(),
          ]).then(() => {
            this.form = {
              ...this.form,
              ...res.data.data,
            }
            // 传值到子组件
            this.$refs['stepOne'].setFormData(this.form)
            this.$refs['stepTwo'].setFormData(this.form)
            this.$refs['stepThree'].setFormData(this.form)
            this.$refs['stepFour'].setFormData(this.form)
            // 回显数据后需要根据证件号带出年龄和性别
            this.$nextTick(() => {
              this.$refs['stepOne'].$refs.form.clearValidate()
              this.$refs['stepTwo'].$refs.form.clearValidate()
              this.$refs['stepThree'].$refs.form.clearValidate()
              this.$refs['stepFour'].$refs.form.clearValidate()
              if (res.data.data.credentialNo) {
                this.$refs['stepOne'].changeCredentialNo()
              }
            })
          })
        }
      })
    },
    /**
     * @function 返回上一个页面
     */
    backEvent() {
      this.$router.push({ name: 'Application' })
    },
    /**
     * @function 下一步
     */
    nextEvent() {
      if (this.show === '1') {
        this.$refs['stepOne'].$refs.form.validate((valid) => {
          if (valid) {
            this.$refs['stepTwo'].getDomicile({ domicileProvince: this.form.domicileProvince, domicileCity: this.form.domicileCity, domicileArea: this.form.domicileArea })
            this.$refs['stepTwo'].getCensus({ censusProvince: this.form.censusProvince, censusCity: this.form.censusCity, censusArea: this.form.censusArea })
            this.show = '2'
          }
        })
      } else if (this.show === '2') {
        this.$refs['stepTwo'].$refs.form.validate((valid) => {
          if (valid) {
            if (this.form.emergencyContactPhone === this.form.mobile) {
              this.$message.error('紧急联系人电话不能与注册的手机号一致！')
              return
            }
            this.show = '3'
          }
        })
      } else if (this.show === '3') {
        this.$refs['stepThree'].$refs.form.validate((valid) => {
          if (valid) {
            this.$refs['stepFour'].getDomicile({ domicileProvince: this.form.domicileProvince, domicileCity: this.form.domicileCity, domicileArea: this.form.domicileArea })
            this.$refs['stepFour'].getCensus({ censusProvince: this.form.censusProvince, censusCity: this.form.censusCity, censusArea: this.form.censusArea })
            this.show = '4'
          }
        })
      }
    },
    /**
     * @function 上一步
     */
    upEvent() {
      if (this.show === '3') {
        this.show = '2'
      } else if (this.show === '2') {
        this.show = '1'
      } else if (this.show === '4') {
        this.show = '3'
      }
    },
    /**
     * @function 保存
     */
    saveEvent() {
      const formData = { ...this.form }
      formData.disabilityType = formData.disabilityType.join(',')
      formData.experience = formData.experience.filter(item => ((item.date !== '' && item.date !== null) || item.activity !== '' || item.servicePost !== ''))
      formData.IsEncypt = this.Config.useDataDesensitization
      this.$http.post(this.isId ? apis.BatchOperatio_EditSaveAsync : apis.ZyzRegistered_InformationSave, formData).then((res) => {
        if (res.data.code === 200) {
          this.$refs.confirmDialog.closeDialog()
        }
        })
    },
    /**
     * @function 提交
     */
    confirmEvent() {
      let flag = false
      this.$refs['stepThree'].$refs.form.validate((valid) => {
        if (valid) {
          const formData = { ...this.form }
          // formData.volExperienceOption = formData.volExperienceOption.join(',')
          formData.disabilityType = formData.disabilityType.join(',')
          formData.experience = formData.experience.filter(item => (item.date !== '' || item.date !== null || item.activity !== '' || item.servicePost !== ''))
          // 判断志愿经历是否有空值
          if (this.form.experience.length > 0) {
            for (let i = 0; i < this.form.experience.length; i += 1) {
              if (this.form.experience[i].date === '' || this.form.experience[i].activity === '' || this.form.experience[i].servicePost === '') {
                this.$message.error('请完善志愿经历！')
                flag = true
                break
              }
            }
          }
          if (!flag) { // 如果志愿经历已完善
            // if (new Date(this.form.birth).getTime() > new Date(2002, 5, 30).getTime()) { // 如果出生日期还是在2002年6月30日无法提交
            //   this.$message.error('年龄未满18岁，无法提交！')
            //   return
            // }
            formData.IsEncypt = this.Config.useDataDesensitization
            this.$http.post(apis.ZyzRegistered_InformationSubmitAudit, formData).then((res) => {
              if (res.data.code === 200) {
                // this.$refs.stepOne.resetFields() // 重置表单
                // this.$refs.stepTwo.resetFields() // 重置表单
                // this.$refs.stepThree.resetFields() // 重置表单
                this.confirmDialog.type = 5
                this.changeConfirmDialog(false)
              }
            })
          } else {
            this.confirmDialog.visible = false
          }
        }
      })
    },
    /**
     * @function 返回和提交打开提示弹窗
     * @param {Array} id 选中的ID数组
     */
    openDeleteDialog(type) {
      this.confirmDialog.type = type
      if (type === 5) { // 5位提交状态
        this.$refs['stepThree'].$refs.form.validate((valid) => {
          if (valid) {
            this.changeConfirmDialog(true)
          }
        })
      } else { // 返回
        this.changeConfirmDialog(true)
      }
    },
    /**
     * @function 当确认弹窗点击确定的时候触发
     */
    sureConfirmDialog() {
      // 如果一个页面有多个弹窗，视情况决定用if语句还是二元表达式对api进行判断
      if (this.confirmDialog.type === 4) { // 保存
        this.saveEvent()
      } else {
        this.confirmEvent() // 提交操作
      }
    },
    /**
     * @function 改变确认/删除弹窗的状态
     * @param {Boolean} dialogStatus 是否展示当前弹窗
     * @param {Number} type 打开的弹窗类型，1为删除确认
     */
    changeConfirmDialog(dialogStatus) {
      this.confirmDialog.visible = dialogStatus
      if (!dialogStatus) {
        if (this.confirmDialog.type === 4) { // 返回
          this.$router.push({ name: this.isId ? 'BatchOperation' : 'Application' })
        }
        if (this.confirmDialog.type === 5) {
          this.$router.push({ name: 'Application' })
        }
      }
    },
  },
}
</script>
<style lang="less" scoped>
// @import "../../../assets/styles/mixin.scoped.less";
.base-info {
  width: calc(100vw - 270px);
  .col-height {
    height: 63px;
  }
}
</style>
<style lang="less">
.search-container {
  height: 50px;
  display: block;
  display: grid;
  border-bottom: 1px dashed #81a6d0;
}
// .base-info{
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
    height: 24px;
    font-size: 16px;
    font-family: SourceHanSansSC-Medium,SourceHanSansSC;
    font-weight: 500;
    color: rgb(40, 134, 220);
    line-height: 24px;
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
      color:rgb(40, 134, 220);
    }
    .nav-container {
      text-align: center;
    }
      .nav {
        display: inline-block;
        margin: 0 auto;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-top: 20px;
        &::after {
          display: block;
          content: '';
          clear: both;
        }
        a {
          clear: both;
          text-decoration: none;
          color:rgba(144,147,153,1);
          margin: 10px;
        }
        .a-style {
          color: rgb(40, 134, 220);
        }
        .right-style {
          width:16px;
          height:29px;
          margin: 0 18px;
        }
        .num-class {
          margin-top: 2px;
          margin-right: 5px;
          float: left;
          width:20px;
          height:20px;
          display: block;
          border-radius: 20px;
          line-height: 20px;
          border:2px solid rgba(144,147,153,1);
        }
        .num-class-active {
          margin-top: 2px;
          margin-right: 5px;
          float: left;
          width:24px;
          height:24px;
          display: block;
          border-radius: 24px;
          line-height: 24px;
          background:rgba(223,232,246,1);
        }
      }
      // img {
      //   width: 130px;
      //   height: 168px;
      // }
      p {
        font-size:12px;
        font-family:SourceHanSansSC-Regular,SourceHanSansSC;
        font-weight:400;
        color:rgba(148,152,158,1);
        padding: 4px;
        letter-spacing:2px;
        line-height:17px;
        // margin-left: 140px;
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
// }
</style>
<style lang="less" scoped>
.button-container {
  width: 100%;
  text-align: center;
  .btn {
    margin: 10px;
    background: rgb(40, 134, 220);
    color:rgba(255,255,255,1);
    font-family:SourceHanSansSC-Regular,SourceHanSansSC;
    font-weight:400;
    width: 160px;
    height: 32px;
    line-height: 7px;
    border-color: rgb(40, 134, 220);
  }
}
</style>
