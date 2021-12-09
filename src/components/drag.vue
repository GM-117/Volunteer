<!--
 * @Author: chenjianwei
 * @Date: 2021-03-29 14:27:46
 * @LastEditTime: 2021-03-29 17:35:17
 * @LastEditors: chenjianwei
 * @Description: 描述
 * @FilePath: \frontend\src\components\drag.vue
-->
<template>
  <div class="mask" v-if="isOpen">
    <div id="__Verification" style=" width:300px; height:234px;"></div>
  </div>
</template>
<script>
import $ from 'jquery'
import apis from '@/apis'
// import '@/assets/js/drag'
// import '@/assets/styles/drag.css'

export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    /**
     * @function 打开验证码,外部通过ref调用
     */
    open() {
      this.isOpen = true
      $(() => {
        /******************************************************
         * 参数一 验证码图片规格 "300*300", "300*200", "200*100"
         * 参数二 校验通过时执行的回调函数
         * 绑定的div width与图片宽一致 height为图片高加34像素
         ******************************************************/
        // eslint-disable-next-line
        this.$nextTick(() => {
          $('#__Verification').slide({
            imgspec: '300*200',
            getImageUrl: apis.Auth_GetValidationCode,
            verifiyUrl: apis.Auth_VerifyClient,
            successCallBack: (sliderVerifyCode) => {
              this.isOpen = false
              // 1成功，0失败
              this.$emit('close', 1, sliderVerifyCode)
            },
            completeCallBack: (res) => {
              this.$emit("getCode", res.sliderVerifyCode)
              this.$store.commit("setSliderVerifyCode", res.sliderVerifyCode)
              this.isOpen = false
            },
          })
        })
      })
    },
  },
}
</script>
<style lang="less" scoped>
.mask{
  z-index: 999;
}
</style>
