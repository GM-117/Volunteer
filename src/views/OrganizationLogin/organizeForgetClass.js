/*
 * @Author: huangyandong
 * @Date: 2021-05-21 09:56:05
 * @LastEditTime: 2021-05-21 11:13:08
 * @LastEditors: huangyandong
 * @Description: 描述
 * @FilePath: \frontend\src\views\OrganizationLogin\organizeForgetClass.js
 */
export class Form {
    constructor() {
      this.loginName = ''
      this.password = ''
      this.verifyCode = ''
      this.checkPass = ''
    }
  }
  export class Rules {
    constructor(vue) {
      const validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码'))
        } else if (vue.errorFlag1 || vue.errorFlag2 || vue.errorFlag3 || vue.errorFlag4) {
            callback(new Error('请输入正确格式的密码'))
        } else {
            callback()
        }
      }
      const validateCheckpass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== vue.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      this.loginName = { required: true, message: "请输入手机号", trigger: 'blur' }
      this.verifyCode = { required: true, message: "请输入验证码", trigger: 'blur' }
      this.password = [
        { required: true, message: "请输入密码", trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' },
      ]
      this.checkPass = [
        { required: true, message: "请再次输入密码", trigger: 'blur' },
        { validator: validateCheckpass, trigger: 'blur' },
      ]
    }
  }
  