<!--
 * @Author: guojinhu
 * @Date: 2021-05-25 09:03:48
 * @LastEditTime: 2021-06-03 11:45:51
 * @LastEditors: guojinhu
 * @Description: 描述
 * @FilePath: \frontend\src\views\RegisterMana\BaseInfo\dialog\addDialog.vue
-->
<template>
  <div class="dialog-container setcloth-height">
    <el-dialog
      :visible.sync="show"
      @open="openDialog"
      :before-close="closeDialog"
      :close-on-click-modal="false"
      title="服装尺码"
      >
      <img src="../../../../assets/images/size.jpeg" alt=""  style="width: 100%; height: 100%;">
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
  .setcloth-height {
    .el-dialog__body {
      height: 870px;
    }
  }
</style>
