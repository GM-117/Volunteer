import pageClass from '@/unit/pageClass'

class searchFrom extends pageClass {
  constructor(type, Vue) {
    super()
    if (type === 'form') {
      this.userId = ''
      this.volunteerType = ''
      this.volunteerStatus = ''
      this.chnName = ''
      this.firstName = ''
      this.lastName = ''
      this.mobile = ''
      this.headPicUrl = ''
      this.url = ''
      this.nationality = ''
      this.nation = ''
      this.sex = ''
      this.birth = ''
      this.school = ''
      this.faculty = ''
      this.studentNumber = ''
      this.credentialType = ''
      this.credentialNo = ''
      this.credentialPeriod = ''
      this.qq = ''
      this.wechat = ''
      this.politicalOutlook = ''
      this.company = ''
      this.heghestEducation = ''
      this.foreignLanguage = ''
      this.languageLevel = ''
      this.enrollmentDate = ''
      this.blood = ''
      this.emergencyContact = ''
      this.emergencyContactPhone = ''
      this.email = ''
      this.height = ''
      this.weight = ''
      this.clothesSize = ''
      this.shoesSize = ''
      this.trouserSize = ''
      this.major = ''
      this.occupation = ''
      this.speciality = ''
      this.health = ''
      this.domicileProvince = ''
      this.domicileCity = ''
      this.domicileArea = ''
      this.domicileAddress = ''
      this.censusProvince = ''
      this.censusCity = ''
      this.censusArea = ''
      this.censusAddress = ''
      // this.volExperienceOption = []
      this.applyType = ''
      this.chnFirstName = ''
      this.chnLastName = ''
      this.disabilityFlag = ''
      this.disabilityType = []
      this.experienceFlag = ''
      this.chineseLevel = ''
      this.postCode = ''
      this.unit = ''
      this.experience = [
        {
          date: '',
          activity: '',
          servicePost: '',
          volunteerId: '',
        },
      ]
    } else if (type === 'rule') {
      const isCardID = (sId) => {
        let iSum = 0
        const aCity = {
       11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外',
      }
        if (!/^\d{17}(\d|x)$/i.test(sId)) return '你输入的身份证长度或格式错误'
        // eslint-disable-next-line no-param-reassign
        sId = sId.replace(/x$/i, 'a')
        // eslint-disable-next-line radix
        if (aCity[parseInt(sId.substr(0, 2))] === null) return '你的身份证地区非法'
        const sBirthday = `${sId.substr(6, 4)}-${Number(sId.substr(10, 2))}-${Number(sId.substr(12, 2))}`
        const d = new Date(sBirthday.replace(/-/g, '/'))
        if (sBirthday !== (`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)) return '身份证上的出生日期非法'
        // eslint-disable-next-line no-plusplus
        for (let i = 17; i >= 0; i--) iSum += ((2 ** i) % 11) * parseInt(sId.charAt(17 - i), 11)
        if (iSum % 11 !== 1) return '你输入的身份证号非法'
        // aCity[parseInt(sId.substr(0,2))]+','+sBirthday+','+(sId.substr(16,1)%2?'男':'女')//此次还可以判断出输入的身份证号的人性别
        return 'true'
      }
      const checkCardId = (rule, value, callback) => {
        if (Vue.form.credentialType === 'CID') {
          const result = isCardID(value)
          if (result === 'true') {
            callback()
          } else {
            callback(new Error(result))
          }
        } else if (!value) {
          callback('证件号不可为空')
        } else {
          callback()
        }
      }
      const checkChnLastName = (rule, value, callback) => {
        if (Vue.form.nationality === 'CHN') {
          if (!value) {
            callback('中文姓不可为空')
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      const checkChnFirstName = (rule, value, callback) => {
        if (Vue.form.nationality === 'CHN') {
          if (!value) {
            callback('中文名不可为空')
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      const checkPoliticalOutlook = (rule, value, callback) => {
        if (Vue.form.nationality === 'CHN') {
          if (!value) {
            callback('政治面貌不可为空')
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      const checkNation = (rule, value, callback) => {
        if (Vue.form.nationality === 'CHN') {
          if (!value) {
            callback('民族不可为空')
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      const checkFaculty = (rule, value, callback) => {
        if (Vue.form.volunteerType === 'Y') {
          if (!value) {
            callback('院系不可为空')
          } else {
            callback()
          }
        }
      }
      const regExpPhone = /^1[3456789]\d{9}$/ // 手机号 正则验证
      const checkPhone = (rule, value, callback) => {
        if (!value) {
          callback(new Error('紧急联系人电话不可为空'))
        } else if (!regExpPhone.test(value)) {
            callback(new Error('电话格式错误'))
          } else {
            callback()
          }
      }
      this.faculty = [
        {
          required: true,
          validator: checkFaculty,
          trigger: 'change',
        },
      ]
      this.applyType = [
				{
					required: true,
					message: '申请类型不可为空',
					trigger: 'change',
				},
      ]
      this.nationality = [
				{
					required: true,
					message: '国家/地区不可为空',
					trigger: 'change',
				},
      ]
      this.chnLastName = [
				{
					required: true,
          // message: '中文姓不可为空',
          validator: checkChnLastName,
					trigger: 'blur',
				},
      ]
      this.chnFirstName = [
				{
					required: true,
          // message: '中文名不可为空',
          validator: checkChnFirstName,
					trigger: 'blur',
				},
      ]
      this.firstName = [
				{
					required: true,
					message: '英文姓不可为空',
					trigger: 'blur',
				},
      ]
      this.lastName = [
				{
					required: true,
					message: '英文名不可为空',
					trigger: 'blur',
				},
      ]
      this.credentialType = [
				{
					required: true,
					message: '证件类型不可为空',
					trigger: 'change',
				},
      ]
      this.credentialPeriod = [
				{
					required: true,
					message: '证件有效期不可为空',
					trigger: 'change',
				},
      ]
      this.birth = [
				{
					required: true,
					message: '出生日期不可为空',
					trigger: 'change',
				},
      ]
      this.credentialNo = [
				{
					required: true,
          // message: '证件号不可为空',
          validator: checkCardId,
					trigger: 'blur',
				},
      ]
      this.sex = [
				{
					required: true,
					message: '性别不可为空',
					trigger: 'change',
				},
      ]
      this.volunteerType = [
				{
					required: true,
					message: '是否为在校大学生不可为空',
					trigger: 'change',
				},
      ]
      this.school = [
				{
					required: true,
					message: '学校名称不可为空',
					trigger: 'change',
				},
      ]
      this.major = [
				{
					required: true,
					message: '专业不可为空',
					trigger: 'change',
				},
      ]
      this.height = [
				{
					required: true,
					message: '身高(CM)不可为空',
					trigger: 'blur',
				},
      ]
      this.clothesSize = [
				{
					required: true,
					message: '衣服尺码不可为空',
					trigger: 'change',
				},
      ]
      this.trouserSize = [
				{
					required: true,
					message: '裤子尺码不可为空',
					trigger: 'change',
				},
      ]
      this.shoesSize = [
				{
					required: true,
					message: '鞋子尺码不可为空',
					trigger: 'change',
				},
      ]
      this.disabilityFlag = [
				{
					required: true,
					message: '身体是否残疾不可为空',
					trigger: 'change',
				},
      ]
      this.politicalOutlook = [
				{
					required: true,
          // message: '政治面貌不可为空',
          validator: checkPoliticalOutlook,
					trigger: 'change',
				},
      ]
      this.nation = [
				{
					required: true,
          // message: '民族不可为空',
          validator: checkNation,
					trigger: 'change',
				},
      ]
      this.speciality = [
				{
					required: true,
					message: '特长不可为空',
					trigger: 'change',
				},
      ]
      this.checkboxGroup1 = [
				{
					required: true,
					message: '期望岗位不可为空',
					trigger: 'change',
				},
      ]
      this.company = [
				{
					required: true,
					message: '所在单位不可为空',
					trigger: 'blur',
				},
      ]
      this.occupation = [
				{
					required: true,
					message: '职业不可为空',
					trigger: 'change',
				},
      ]
      this.heghestEducation = [
				{
					required: true,
					message: '学历不可为空',
					trigger: 'change',
				},
	    ]
      // this.volExperienceOption = [
      //   {
			// 		required: true,
			// 		message: '期望岗位不可为空',
      //     trigger: 'change',
      //   },
      // ]
      this.headPicUrl = [
        {
					required: true,
					message: '请上传头像',
          trigger: 'change',
        },
      ]
      this.domicileProvince = [
				{
					required: true,
					message: '现居住省不可为空',
					trigger: 'change',
				},
      ]
      this.domicileCity = [
				{
					required: true,
					message: '现居住市不可为空',
					trigger: 'change',
				},
      ]
      this.domicileArea = [
				{
					required: true,
					message: '现居住区不可为空',
					trigger: 'change',
				},
      ]
      this.domicileAddress = [
				{
					required: true,
					message: '现居住详细地址不可为空',
					trigger: 'blur',
				},
      ]
      this.censusProvince = [
				{
					required: true,
					message: '户籍省不可为空',
					trigger: 'change',
				},
      ]
      this.censusCity = [
				{
					required: true,
					message: '户籍市不可为空',
					trigger: 'change',
				},
      ]
      this.censusArea = [
				{
					required: true,
					message: '户籍区不可为空',
					trigger: 'change',
				},
      ]
      this.censusAddress = [
				{
					required: true,
					message: '户籍详细地址不可为空',
					trigger: 'blur',
				},
      ]
      this.email = [
				{
					required: true,
					message: '邮箱不可为空',
					trigger: 'blur',
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur',
        },
      ]
      this.emergencyContact = [
				{
					required: true,
					message: '紧急联系人不可为空',
					trigger: 'blur',
				},
      ]
      this.emergencyContactPhone = [
				{
					required: true,
          // message: '紧急联系人电话不可为空',
          validator: checkPhone,
					trigger: 'blur',
				},
      ]
      this.experienceFlag = [
				{
					required: true,
					message: '请选择志愿经历',
					trigger: 'blur',
				},
      ]
      this.wechat = [
        {
          required: true,
					message: '微信不能为空',
					trigger: 'blur',
        },
      ]
    }
  }
}
export default searchFrom
