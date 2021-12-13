<!--
 * @Author: guojinhu
 * @Date: 2021-05-25 09:03:48
 * @LastEditTime: 2021-06-03 11:46:21
 * @LastEditors: guojinhu
 * @Description: 描述
 * @FilePath: \frontend\src\views\RegisterMana\BaseInfo\dialog\addDialogShoes.vue
-->
<template>
  <div class="dialog-container setshoes-height">
    <el-dialog
      :visible.sync="show"
      @open="openDialog"
      :before-close="closeDialog"
      :close-on-click-modal="false"
      title="鞋子尺码"
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
<style lang="less" scoped>
  .contain {
    height: 37px;
    line-height: 37px;
  }
  .setshoes-height {
    .el-dialog__body {
      height: 380px;
    }
  }
</style>
