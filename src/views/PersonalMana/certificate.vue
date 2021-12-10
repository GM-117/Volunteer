<!--
 * @Author: guojinhu
 * @Date: 2021-05-17 15:47:21
 * @LastEditTime: 2021-05-31 12:49:14
 * @LastEditors: guojinhu
 * @Description: 我的证书
 * @FilePath: \frontend\src\views\PersonalMana\certificate.vue
-->
<template>
  <div class="certificate-container">
    <img :src="certificateImg" alt="" v-if="certificateImg" style="width: 455px;margin-top: 13vh;">
    <div v-else class="certificate-none">
      <img src="@/assets/images/certificate-none.png" alt="">
      <p>“很抱歉，您还未获得证书，继续加油哦！”</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import apis from '@/apis'

export default {
  data() {
    return {
      certificateImg: '',
    }
  },
  computed: {
    ...mapState(['Language']),
  },
  activated() {
    this.getVolunteerStatus()
  },
  methods: {
    ...mapMutations(['setLanguage']),
    /**
     * @description: 获取志愿者状态
     * @param {*}
     * @return {*}
     */
    getVolunteerStatus() {
      this.$http.post(apis.Auth_GetVolunteerStatua).then((res) => {
        if (res.data.code === 200 && res.data.data.volunteerStatua === 'VS06') {
          this.getCertificate()
        }
      })
    },
    /**
     * @description: 获取证书图片
     * @param {*}
     * @return {*}
     */
    getCertificate() {
      this.$http.post(apis.ZyzRegistered_AddTextToImg).then((res) => {
        if (res.data.code === 200) {
          this.certificateImg = res.data.data ? `data:image/png;base64,${res.data.data}` : ''
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.certificate-container {
  display: flex;
  justify-content: center;
  align-items: center;
  .certificate-none {
    margin-top: 30vh;
    width: 300px;
    text-align: center;
    img {
      width: 108px;
      height: 102px;
    }
    p {
      margin-top: 15px;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
