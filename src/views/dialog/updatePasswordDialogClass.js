/*
 * @Author: chenjianxin
 * @Date: 2020-08-17 10:58:09
 * @LastEditTime: 2020-08-20 10:27:51
 * @LastEditors: chenjianxin
 * @Description: 描述
 * @FilePath: \frontend\src\views\dialog\updatePasswordDialogClass.js
 */
class searchFrom {
  constructor(type, vue) {
    if (type === 'form') {
      this.newPassword = ''
      this.confirmPassword = ''
    } else if (type === 'rule') {
      const secondCheck = (rule, value, callback) => {
        if (!value) {
          callback(new Error(window.v.$t('QSRMM')))
        } else {
          if (value !== vue.form.newPassword) {
            callback(new Error(window.v.$t('password_some')))
          }
          callback()
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
      //       callback(new Error(window.v.$t('passwordError')))
      //     } else {
      //       callback()
      //     }
      //   }
      // }
      this.newPassword = [
        {
          required: true,
          message: window.v.$t('ple_ent_newPassword'),
          trigger: 'blur',
        },
      ]
      this.confirmPassword = [
        {
          required: true,
          message: window.v.$t('password_some'),
          trigger: 'blur',
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
