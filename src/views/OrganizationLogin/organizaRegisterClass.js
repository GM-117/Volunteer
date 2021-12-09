/*
 * @Author: huangyandong
 * @Date: 2021-05-19 15:43:36
 * @LastEditTime: 2021-06-29 10:28:32
 * @LastEditors: XUnz
 * @Description: 描述
 * @FilePath: \frontend\src\views\OrganizationLogin\organizaRegisterClass.js
 */
export class RegForm {
    constructor() {
      this.organizationName = ''
      this.personInCharge = ''
      this.picMobile = ''
      this.foundDate = ''
      this.volunteerNum = ''
      this.qqGroup = ''
      this.postCode = ''
      this.fax = ''
      this.serviceScope = []
      this.serviceExperience = ''
      this.address = ''
      this.phone = ''
      this.verifyCode = ''
      this.email = ''
      this.credentialNo = ''
      this.wechat = ''
      this.password = ''
      this.checkpass = ''
    }
  }
  // vue为调用组件的this
  export class Rules {
    constructor(vue) {
      const checkMobile = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入手机号"))
        } else {
          const reg = /^1[3456789]\d{9}$/
          if (reg.test(value)) {
            callback()
          } else {
            callback(new Error("手机格式有误"))
          }
        }
      }
      const checkCredentialNo = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入身份证"))
        } else {
          const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
          if (reg.test(value)) {
            callback()
          } else {
            callback(new Error("身份证格式有误"))
          }
        }
      }
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
      const checkEmail = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入邮箱"))
        } else {
          const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
          if (reg.test(value)) {
            callback()
          } else {
            callback(new Error("邮箱格式有误"))
          }
        }
      }
      const checkVolunteerNum = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请组织人数"))
        } else {
          if (value < 100000000) {
            callback()
          }
          callback(new Error("组织规模过大,请重新填写"))
        }
      }
      this.organizationName = { required: true, message: "请输入志愿组织名称", trigger: 'blur' }
      this.personInCharge = { required: true, message: "请输入负责人姓名", trigger: 'blur' }
      this.picMobile = [
        { required: true, message: "请输入手机号", trigger: 'blur' },
        { validator: checkMobile, trigger: 'blur' },
      ]
      this.foundDate = { required: true, message: "请输入成立日期", trigger: 'blur' }
      this.volunteerNum = [
        { required: true, message: "请输入组织规模", trigger: 'blur' },
        { validator: checkVolunteerNum }]
      this.postCode = { required: true, message: "请输入邮编", trigger: 'blur' }
      this.serviceScope = { required: true, message: "请选择服务领域", trigger: 'blur' }
      this.serviceExperience = { required: true, message: "请输入志愿经历", trigger: 'blur' }
      this.address = { required: true, message: "请输入详细地址", trigger: 'blur' }
      this.phone = [
        { required: true, message: "请输入手机号", trigger: 'blur' },
        { validator: checkMobile, trigger: 'blur' },
      ]
      this.verifyCode = { required: true, message: "请输入验证码", trigger: 'blur' }
      this.credentialNo = [
        { required: true, message: "请输入身份证", trigger: 'blur' },
        { validator: checkCredentialNo, trigger: 'blur' },
      ]
      this.email = [
        { required: true, message: "请输入邮箱", trigger: 'blur' },
        { validator: checkEmail, trigger: 'blur' },
      ]
      this.password = [{ required: true, message: "请输入密码", trigger: 'blur' },
      { validator: validatePass, trigger: 'blur' },
      ]
      this.checkpass = [
        { required: true, message: "请再次输入密码", trigger: 'blur' },
        { validator: validateCheckpass, trigger: 'blur' },
      ]
    }
  }
  