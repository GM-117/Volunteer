import CryptoJS from 'crypto-js'
import md5 from 'js-md5'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['timestampDiff']),
  },
  methods: {
    /**
     * @function 对登录的时候密码进行加密
     * @param {String} word 要被加密的文本
     * @param {String} keyStr 密钥
     * @param {String} ivStr  偏移量
     * @returns {String} 返回加密后的文本
     */
    encrypt(word, keyStr, ivStr) {
      const key = CryptoJS.enc.Utf8.parse(keyStr)
      const iv = CryptoJS.enc.Utf8.parse(ivStr)
      const srcs = CryptoJS.enc.Utf8.parse(word)
      const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
      return encrypted.toString()
    },
    /**
     * @function 对登录的时候密码进行解密
     * @param {String} word 要被解密的文本
     * @param {String} keyStr 密钥
     * @param {String} ivStr  偏移量
     * @returns {String} 返回解密后的文本
     */
    decrypt(word, keyStr, ivStr) { // 解密
      const key = CryptoJS.enc.Utf8.parse(keyStr)
      const iv = CryptoJS.enc.Utf8.parse(ivStr)
      const decrypt = CryptoJS.AES.decrypt(word, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      })
      const decryptedStr = CryptoJS.enc.Utf8.stringify(decrypt).toString()
      return decryptedStr
    },
    /**
     * @function 加密密码
     * @param {String} password 要加密的密码
     * @return 返回加密后的密码
     */
    passwordCrypt(password, timestamp) {
      const salt = 'fd#O@7Ej0.U4P2^i'
      const newPass = md5(timestamp + salt)
      const aes = newPass.substring(0, 16)
      const iv = newPass.substring(16)
      return this.encrypt(password, aes, iv)
    },
  },
}
