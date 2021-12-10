<template>
  <div class="dialog-container">
    <el-dialog
      :visible.sync="show"
      @open="openDialog"
      :before-close="closeDialog"
      center
      width="510px">
      <div class="dialog-wrap">
        <!-- 删除弹窗提示文字与图标 -->
        <i class="delIcon"><img :src="(type === 4 || type === 5 || type === 6 || type === 7 || type === 8) ? require('../assets/images/tips.png') : require('../assets/images/del.png')" alt=""></i>
        <p>{{$t(`confirmDialog_type${type}`)}}</p>
      </div>
      <template slot="footer">
        <!-- 如果没特别需求，统一使用mixin里面的关闭方法 -->
        <el-button @click="sureEvent" type="primary">{{$t('yes')}}</el-button>
        <el-button @click="closeDialog" type="info">{{$t('no')}}</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import mixin from '@/mixins/dialogMixin'

export default {
  mixins: [mixin],
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
    type: {
      required: true,
      type: Number,
      default: 1, // 类型，1为删除确认，2是重置密码，3是批量删除，6是提交短信，7是发送短信如果有需要，在这里增加
    },
  },
  methods: {
    /**
     * @function 初始化弹窗
     */
    init() {
      console.log('我初始化了')
    },
    /**
     * @function 点击确定按钮，先执行业务，完了调关闭方法，不要写两次关闭方法
     */
    sureEvent() {
      // 这里写业务需求
      // 因为这里是公用的组件，没办法判定说业务处理，我们把事件传到父组件，由父组件处理
      this.$emit('sureDialog')
      // 调用关闭方法，不要再写一次
    },
  },
}
</script>
<style lang="less" scoped>
// @import url('../../src/assets/styles/mixin.scoped.less');
.dialog-wrap{
  display: grid;
  justify-content: center;
  .delIcon {
    text-align: center;
  }
  .el-icon-warning{
    font-size: 50px;
    margin: 0 auto;
    // color: @confirmDialog-icon-color;
  }
  p{
    line-height: 40px;
  }
}
</style>
