export class ForgetPassword {
  constructor() {
    this.loginName = ''
    this.verifyCode = ''
    this.password = ''
    this.confirmPassword = ''
  }
}

export class Rules {
  constructor(that) {
    const checkMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error(window.v.$t('请输入手机号码')))
      } else {
        const reg = /^1[3456789]\d{9}$/
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error(window.v.$t('errorUserReg')))
        }
      }
    }
    // const checkPassword = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error(window.v.$t('QSRMM')))
    //   } else {
    //     const allNumberList = [
    //       '1111',
    //       '2222',
    //       '3333',
    //       '4444',
    //       '5555',
    //       '6666',
    //       '7777',
    //       '8888',
    //       '9999',
    //       '0000',
    //       '0123',
    //       '1234',
    //       '2345',
    //       '3456',
    //       '4567',
    //       '5678',
    //       '6789',
    //       '7890',
    //       '0987',
    //       '9876',
    //       '8765',
    //       '7654',
    //       '6543',
    //       '5432',
    //       '4321',
    //       '3210',
    //     ]
    //     const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![\W_]+$)(?![0-9a-zA-Z]+$)(?![0-9\W_]+$)(?![a-zA-Z\W_]+$)\S{8,18}$/
    //     let isReg = false
    //     if (!reg.test(value)) {
    //       isReg = true
    //     }
    //     for (const i in allNumberList) {
    //       if (value.includes(allNumberList[i])) {
    //         isReg = true
    //       }
    //     }
    //     if (isReg) {
    //       callback(new Error(window.v.$t('errorReg')))
    //     } else {
    //       callback()
    //     }
    //   }
    // }
    const confirmPassword = (rule, value, callback) => {
      if (value !== that.forgetPwd.password) {
        callback(new Error(window.v.$t('password_some')))
      } else {
        callback()
      }
    }
    this.loginName = [{
        required: true,
        message: `${window.v.$t('请输入手机号码')}`,
        trigger: 'blur',
      },
      {
        validator: checkMobile,
        trigger: 'blur',
      },
    ]
    this.verifyCode = [{
      required: true,
      message: `${window.v.$t('QSRYZM')}`,
      trigger: 'blur',
    }]
    this.password = [{
        required: true,
        message: `${window.v.$t('请输入密码')}`,
        trigger: 'blur',
      },
      // {
      //   validator: checkPassword,
      //   trigger: 'blur',
      // },
    ]
    this.confirmPassword = [{
        required: true,
        message: `${window.v.$t('请再次输入密码')}`,
        trigger: 'blur',
      },
      {
        validator: confirmPassword,
        trigger: 'blur',
      },
    ]
  }
}
