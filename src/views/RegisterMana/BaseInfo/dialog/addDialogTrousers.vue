<!--
 * @Author: 安林娜
 * @LastEditors: guojinhu
-->
<template>
  <div class="dialog-container settrousers-height">
    <el-dialog
      :visible.sync="show"
      @open="openDialog"
      :before-close="closeDialog"
      :close-on-click-modal="false"
      title="裤子尺码"
      center
      >
     <img src="../../../../assets/images/shoes.jpeg" alt="" style="width: 100%; height: 100%;">
    </el-dialog>
  </div>
</template>
<script>
import mixin from '@/mixins/dialogMixin'
import dictMixin from '@/mixins/dictMixin'
import { mapState } from 'vuex'
// import apis from '@/apis'

export default {
  mixins: [mixin, dictMixin],
  props: {
    show: {
      required: true,
      type: Boolean,
    },
    Language: {
      required: false,
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState(['Config']),
  },
  methods: {
    init() {},
  },
}
</script>
<style lang="less">
  .contain {
    height: 37px;
    line-height: 37px;
  }
  // .settrousers-height {
  //   .el-dialog__body {
  //     height: 1000px;
  //   }
  // }
</style>
