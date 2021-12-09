class searchFrom {
  constructor(type, vue) {
    if (type === 'form') {
      this.telephone = ''
      this.verifyCode = ''
      this.password = ''
      this.password2 = ''
    } else if (type === 'rule') {
      const checkMobile = (rule, value, callback) => {
        if (!value) {
          callback(new Error(window.v.$t('QSRZH')))
        } else {
          const reg = /^1[3456789]\d{9}$/
          if (reg.test(value)) {
            callback()
          } else {
            callback(new Error(window.v.$t('GSCW')))
          }
        }
      }
      const secondCheck = (rule, value, callback) => {
        if (!value) {
          callback(new Error(window.v.$t('请再次输入密码')))
        } else {
          if (value !== vue.form.password) {
            callback(new Error(window.v.$t('password_some')))
          }
          callback()
        }
      }
      this.telephone = [
        {
          required: true,
          message: '请输入手机号',
          trigger: `blur`,
        },
        {
          validator: checkMobile,
          trigger: 'blur',
        },
      ]
      this.verifyCode = [
        {
          required: true,
          message: '请输入验证码',
          trigger: `blur`,
        },
      ]
      this.password = [
        {
          required: true,
          message: '请输入密码',
          trigger: `blur`,
        },
      ]
      this.password2 = [
        {
          required: true,
          message: '请再次输入密码',
          trigger: `blur`,
        },
        {
          validator: secondCheck,
          trigger: 'blur',
        },
      ]
    }
  }
}
export default searchFrom
