<template>
  <div class="dialog-container">
    <el-dialog :visible.sync="show" width="860px" :before-close="closeDialog" :close-on-click-modal="false">
      <img src="../../../assets/images/xieyi.jpg" alt="" style="margin-left: -1%;">
      <div slot="footer">
        <!-- 如果没特别需求，统一使用mixin里面的关闭方法 -->
        <el-button @click="closeDialog" type="primary">{{$t('closeBtn')}}</el-button>
      </div>
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
  },
  data() {
    return {}
  },
  methods: {
    /**
     * @function 初始化弹窗
     */
    init() {
      console.log('我初始化了')
    },
  },
}
</script>
<style lang="less" scoped>
  .title-user {
    width: 100er;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color: rgba(82,82,82,1);
    line-height: 20px;
    text-align: center;
  }
  .line1 {
    font-size: 14px;
    margin: 2% 0;
    height: 20px;
    line-height: 20px;
  }
</style>
