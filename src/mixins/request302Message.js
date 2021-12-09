/*
 * @Author: Hong Yiqun
 * @LastEditors: guojinhu
 */
import { get, debounce } from 'lodash'

export default {
  methods: {
    /**
     * 添加302就显示提示的拦截器
     */
    addInterceptors302Message(/*message = ''*/) {
      // 添加响应拦截器
      this.$http.interceptors.response.use((res) => {
        const code = get(res, 'data.code')

        if (code === 302) {
          // const msg = get(res, 'data.msg') || message
          // this.show302Message(msg)
          this.clearUserInfo()
        }

        return res
      })
    },

    // 显示302的消息
    show302Message: debounce(function (message = '') {
      this.$message.error(message)
    }, 500),

    // 清理用户信息
    clearUserInfo() {
      sessionStorage.clear()
      this.$store.commit('setName', '')
      this.$store.commit('setUserName', '')
      this.$store.commit('setUserId', '')
      this.$store.commit('setAuthority', [])
      this.$store.commit('set_access_token', '')
      this.$store.commit('set_refresh_token', '')
      if (document.querySelector('.v-modal')) {
        document.querySelector('.v-modal').style.display = 'none'
      }

      if (this.$route.path !== '/login') {
        this.$router.push('/login')
      }
    },
  },
}
