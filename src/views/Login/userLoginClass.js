export class Login {
  constructor() {
    this.loginName = ''
    this.logingNameActive = false
    this.password = ''
    this.passwordActive = false
    this.verifyCode = ''
    this.pwdType = 'password'
    this.checkCodeActive = false
    this.content = ''
    this.noticeManageFiles = []
  }
}

export class Rules {
  constructor() {
    const checkMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error(window.v.$t('请输入账号')))
      } else {
        const reg = /^1[3456789]\d{9}$/
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error(window.v.$t('GSCW')))
        }
      }
    }
    const checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error(window.v.$t('请输入密码')))
      } else {
        callback()
      }
    }
    this.loginName = [
      {
        required: true,
        message: `${window.v.$t('请输入账号')}`,
        trigger: 'blur',
      },
      {
        validator: checkMobile,
        trigger: 'blur',
      },
    ]
    this.password = [
      {
        validator: checkPassword,
        trigger: 'blur',
      },
    ]
    this.verifyCode = [
      {
        required: true,
        message: `${window.v.$t('请输入验证码')}`,
        trigger: 'blur',
      },
    ]
  }
}
