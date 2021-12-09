/*
 * @Author: chenjianwei
 * @Date: 2021-03-29 14:27:46
 * @LastEditTime: 2021-03-30 10:51:25
 * @LastEditors: chenjianwei
 * @Description: 描述
 * @FilePath: \frontend\src\views\dialog\changeDialogClass.js
 */
import zh from '@/locales/zh.json'
import en from '@/locales/en.json'

const Lang = {
  zh,
  en,
}
class searchFrom {
  constructor(type, lanuage = 0) {
    if (type === 'form') {
      this.oldPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
    } else if (type === 'rule') {
      const checkPassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error(window.v.$t('QSRMM')))
        } else {
          const allNumberList = [
            '111',
            '222',
            '333',
            '444',
            '555',
            '666',
            '777',
            '888',
            '999',
            '000',
            '012',
            '123',
            '234',
            '345',
            '456',
            '567',
            '678',
            '789',
            '098',
            '987',
            '876',
            '765',
            '654',
            '543',
            '432',
            '321',
            '210',
          ]
          const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![\W_]+$)(?![0-9a-zA-Z]+$)(?![0-9\W_]+$)(?![a-zA-Z\W_]+$)\S{8,18}$/
          let isReg = false
          if (!reg.test(value)) {
            isReg = true
          }
          for (const i in allNumberList) {
            if (value.includes(allNumberList[i])) {
              isReg = true
            }
          }
          if (isReg) {
            callback(new Error(window.v.$t('errorReg')))
          } else {
            callback()
          }
        }
      }
      this.oldPassword = [
        {
          required: true,
          message: Lang[lanuage === 1 ? `en` : `zh`].ple_ent_oldPassword,
          trigger: 'blur',
        },
      ]
      this.newPassword = [
        {
          required: true,
          message: Lang[lanuage === 1 ? `en` : `zh`].ple_ent_newPassword,
          trigger: 'blur',
        },
        {
          validator: checkPassword,
          trigger: 'blur',
        },
      ]
      this.confirmPassword = [
        {
          required: true,
          message: Lang[lanuage === 1 ? `en` : `zh`].ple_ent_confirmPassword,
          trigger: 'blur',
        },
        {
          validator: checkPassword,
          trigger: 'blur',
        },
      ]
    }
  }
}
export default searchFrom
