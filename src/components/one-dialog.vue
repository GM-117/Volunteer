<template>
  <el-dialog
    top="100px"
    :visible="visible"
    :title="title"
    :width="width"
    :custom-class="customClass"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    center
    @open="open"
    @opened="opened"
    @close="close"
    @closed="closed">
      <slot name="title" slot="title" class="one-dialogTitle"></slot>
      <slot></slot>
      <slot name="footer" slot="footer">
        <el-button type="info" @click="selectCancel">{{$t('cancel')}}</el-button>
        <el-button type="primary" @click="selectConfirm">{{$t('sure')}}</el-button>
      </slot>
    </el-dialog>
</template>

<script>
export default {
  name: 'oneDialog',
  props: {
    visible: {
      default: false,
      required: true,
      type: Boolean,
    },
    title: {
      default: '',
      required: false,
      type: String,
    },
    width: {
      default: '',
      required: false,
      type: String,
    },
    customClass: {
      default: '',
      required: false,
      type: String,
    },
  },
  methods: {
    open() {
      this.$emit('open')
    },
    opened() {
      this.$emit('opened')
    },
    close() {
      this.$emit('close')
    },
    closed() {
      this.$emit('closed')
    },
    /**
     * @function 取消
     */
    selectCancel() {
      this.$emit('update:visible', false)
    },
    /**
     * @function 确定
     */
    selectConfirm() {
      this.$emit('update:visible', false)
      this.$emit('confirm')
    },
  },
}
</script>

<style lang="less">
.el-dialog--center .el-dialog__body {
  padding-left: 64px !important;
  padding-right: 64px !important;
}
.el-dialog__header {
  border-bottom: 2px solid rgba(62,103,174,0.04);
}
.el-dialog__footer .el-button {
  width: 160px;
  +button {
    margin-left: 40px;
  }
}
</style>
