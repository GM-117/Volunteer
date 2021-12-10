<template>
  <div class="dialog-container">
    <el-dialog
      :title="$t('修改密码')"
      :visible.sync="show"
      @open="openDialog"
      :before-close="closeDialog"
      :close-on-click-modal="false"
      center
      width="50%">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('旧密码')" prop="oldPassword">
              <el-input v-model="form.oldPassword" type="password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('新密码')" prop="newPassword">
              <el-input v-model="form.newPassword" type="password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('确认密码')" prop="confirmPassword">
              <el-input v-model="form.confirmPassword" type="password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template slot="footer">
        <!-- 如果没特别需求，统一使用mixin里面的关闭方法 -->
        <el-button @click="sureEvent" type="primary">{{$t('确认')}}</el-button>
        <el-button @click="closeDialog" type="info" v-if="!isCreate">{{$t('取消')}}</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import mixin from '@/mixins/dialogMixin'
import passwordMixin from '@/mixins/password'
import apis from '@/apis'
import ChangeDialogClass from './changeDialogClass'

export default {
  mixins: [mixin, passwordMixin],
  props: {
    show: {
      required: true,
      type: Boolean,
    },
    Language: {
      required: false,
      type: Number,
      default: 0,
    },
    isCreate: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: new ChangeDialogClass('form'), // 实例化一个表单的变量
      rules: new ChangeDialogClass('rule', this.Language), // 实例化一个表单的规则
      resourceData: [],
      data: {},
    }
  },
  computed: {
    ...mapState(['DROPDOWNBOX', 'timestampDiff']),
  },
  methods: {
    ...mapActions({
      LoginOut: 'LoginOut',
    }),
    /**
     * @function 初始化弹窗
     */
    init() {
      this.$refs.form.resetFields()
    },
    /**
     * @function 点击确定按钮，先执行业务，完了调关闭方法，不要写两次关闭方法
     */
    sureEvent() {
      // 这里写业务需求
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.newPassword !== this.form.confirmPassword) {
            this.$message.error(`${this.$t('password_some')}`)
          } else {
            const form = { }
            form.timestamp = (new Date()).getTime() + this.timestampDiff
            form.newPassword = this.passwordCrypt(this.form.newPassword, form.timestamp)
            form.oldPassword = this.passwordCrypt(this.form.oldPassword, form.timestamp)
            this.$http.post(apis.User_UpdatePassword, form).then((res) => {
              if (res.data.code === 200) {
                this.LoginOut()
                this.closeDialog()
                this.$router.push('/login')
              }
            })
          }
        }
      })
      // 调用关闭方法，不要再写一次
    },
  },
}
</script>
