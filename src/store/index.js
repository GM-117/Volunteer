/* eslint-disable guard-for-in */
import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue';
import Vuex from 'vuex';
import CryptoJS from 'crypto-js'
import SecureLS from "secure-ls";


const { base64decode } = require('nodejs-base64')

Vue.use(Vuex);
const ls = new SecureLS({ isCompression: false });

/**
 * @function 对文本进行加密
 * @param {String} word 要加密的文本
 * @param {String} keyStr 密钥
 * @param {String} ivStr 偏移量
 */
function decrypt(word, keyStr, ivStr) { // 解密
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const iv = CryptoJS.enc.Utf8.parse(ivStr)
  const Decrypt = CryptoJS.AES.decrypt(word, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  const decryptedStr = CryptoJS.enc.Utf8.stringify(Decrypt).toString()
  return decryptedStr
}

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: {
      getItem: key => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: key => ls.remove(key),
    },
  })],
  state: {
    LOGODIAPLAY: '1', // logo 显示隐藏
    LOGOSWITCH: 1, // 判断页面是否存在logo和相关文字，1显示，0隐藏
    VUE_APP_LOGO_BASE_URL: process.env.VUE_APP_LOGO_BASE_URL,
    VUE_APP_PRODUCTION_SERVER: process.env.VUE_APP_PRODUCTION_SERVER === 'test',
    NAME: '', // 当前用户名
    USERNAME: '', // 当前账号
    USERTYPE: '', // 当前用户类型
    USERID: '', // 当前用户ID
    UNIT: '', // 当前用户ID
    SYSTEMID: '', // 当前系统ID
    MYBROWSER: '', // 浏览器
    TOKEN: '', // TOKEN
    timestampDiff: 0, // 服务端与客户端的时间差
    DROPDOWNBOX: [],
    authority: [],
    buttonAuth: [],
    Language: 0,
    routerTab: [],
    Config: {
      verificationSwitch: '1',
      systemSetChannel: '0',
    },
    sliderVerifyCode: "",
  },
  mutations: {
    setDropDownbox(state, payload) {
      state.DROPDOWNBOX = payload
    },
    setUserName(state, payload) {
      state.USERNAME = payload
    },
    setName(state, payload) {
      state.NAME = payload
    },
    setUnit(state, payload) {
      state.UNIT = payload
    },
    setUserType(state, payload) {
      state.USERTYPE = payload
    },
    setUserId(state, payload) {
      state.USERID = payload
    },
    setSystemId(state, payload) {
      state.SYSTEMID = payload
    },
    setMyBrowser(state, payload) {
      state.MYBROWSER = payload
    },
    setAuthority(state, payload) {
      state.authority = payload
    },
    setToken(state, payload) {
      state.TOKEN = payload
      // dropBox()
    },
    setTimestampDiff(state, payload) {
      state.timestampDiff = payload
    },
    setLogoSwitch(state, payload) {
      state.LOGOSWITCH = payload
    },
    setButtonAuth(state, payload) {
      state.buttonAuth = payload || []
    },
    setEventId(state, payload) {
      state.eventId = payload
    },
    setLanguage(state, payload) {
      state.Language = payload
      window.v.$i18n.locale = payload === 1 ? 'en' : 'zh'
    },
    setConfig(state, payload) {
      state.Config = { ...state.Config, ...payload }
    },
    setRouterTab(state, payload) {
      state.routerTab = payload
    },
    setSliderVerifyCode(state, payload) {
      state.sliderVerifyCode = payload
    },
  },
  actions: {
    /**
     * @function 登录方法
     * @param {String} username 用户名
     * @param {Number} id 用户ID
     * @param {String} token TOKEN
     * @param {String} name 用户姓名
     * @param {Number} systemId 系统ID
     * @param {Array} authority 用户权限列表
     * @description 不用分开赋值，只要把后端返回的res.data丢到变量里即可
     */
    Login(context, {
      loginName, id, token, name, systemId, resourceData, unit,
    }) {
      context.commit('setUserName', loginName)
      context.commit('setUserId', id)
      context.commit('setToken', token)
      context.commit('setUnit', unit)
      context.commit('setSystemId', systemId)
      if (resourceData !== '') {
        const authBase64 = base64decode(resourceData)
        const authBase641 = decrypt(authBase64, 'One@-!Sports456G', 'One@-!SportsG654')
        // 使用Store 方法操作共享状态
        const authority = JSON.parse(authBase641).sort((a, b) => parseInt(a.sort, 10) - parseInt(b.sort, 10))
        context.commit('setAuthority', authority)
      } else {
        context.commit('setAuthority', [])
      }
      context.commit('setName', name)
      /* sessionStorage.setItem('NAME', name) // 用户名
      sessionStorage.setItem('TOKEN', token) // TOKEN
      sessionStorage.setItem('USERID', id) // 用户名ID
      sessionStorage.setItem('SYSTEMID', systemId) // 系统ID
      sessionStorage.setItem('USERNAME', loginName) // 用户账号 */
      // sessionStorage.setItem('authority', changeStr(base64encode(JSON.stringify(authority)))) // 权限
    },
    /**
     * @function 退出登录
     */
    LoginOut(context) {
      context.commit('setUserName', '')
      context.commit('setUserId', '')
      context.commit('setToken', '')
      context.commit('setSystemId', '')
      // 使用Store 方法操作共享状态
      context.commit('setAuthority', [])
      context.commit('setName', '')
      context.commit('setUnit', '')
      context.commit('setRouterTab', [])
      sessionStorage.clear()
      /* sessionStorage.setItem('NAME', '') // 用户名
      sessionStorage.setItem('TOKEN', '') // TOKEN
      sessionStorage.setItem('USERID', '') // 用户名ID
      sessionStorage.setItem('SYSTEMID', '') // 系统ID
      sessionStorage.setItem('USERNAME', '') // 用户账号 */
      // sessionStorage.setItem('authority', changeStr(base64encode(JSON.stringify([])))) // 权限
    },
    /**
     * @function 切换语言
     * @param {Number} language 语言0为中文，1为英文，默认中文
     */
    setLanguage(context, lang) {
      context.commit('setLanguage', lang)
    },
    /**
     * @function 设置配置
     * @param {Number} timestampDiff
     */
    setConfig(context, {
      timestamp,
      verificationSwitch,
      systemSetChannel,
      useDataDesensitization,
      pcClothesPicUrl,
      pcShoesPicUrl,
      pcTrouserPicUrl,
      loginSlider,
    }) {
      context.commit('setConfig', {
        verificationSwitch,
        systemSetChannel,
        useDataDesensitization,
        pcClothesPicUrl,
        pcShoesPicUrl,
        pcTrouserPicUrl,
        loginSlider,
      })
      const timestampDiff = new Date().getTime() - timestamp
      context.commit('setTimestampDiff', timestampDiff)
    },
    /**
     * @function 设置下拉到VUEX
     * @param {Array} data 获取到的下拉列表
     */
    setDict(context, {
      data,
    }) {
      // sessionStorage.setItem('DROPDOWNBOX', JSON.stringify(data))
      context.commit('setDropDownbox', data)
    },
  },
  modules: {

  },
});
