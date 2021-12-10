<!--
 * @Author: XUnz
 * @Date: 2021-05-19 13:38:51
 * @LastEditors: XUnz
 * @LastEditTime: 2021-10-20 18:11:34
 * @FilePath: \frontend\src\views\PersonalMana\dialog\applyCardDialog.vue
-->
<template>
  <el-dialog :visible.sync="show" title="补卡申请" class="dialog-container" width="600px" center :close-on-click-modal="false" :before-close="closeDialog">
    <el-form ref="form" label-width="100px" label-position="right" :model="form" :rules="rules">
      <el-form-item :label="$t('BKRQ')">
        <span>{{checkDate}}</span>
      </el-form-item>
      <el-form-item :label="$t('BKSJ')" prop="signTime">
        <!-- <el-time-select v-model="form.signTime" :picker-options="{
            start: '00:00',
            step: '00:01',
            end: '24:00'
          }" placeholder="选择时间">
        </el-time-select> -->
        <el-time-picker size="mini" style="width: 100%" v-model="form.signTime" value-format="HH:mm" format="HH:mm" placeholder="选择时间">
        </el-time-picker>
      </el-form-item>
      <el-form-item :label="$t('SQYY')" prop="remark">
        <el-input type="textarea" :rows="6" v-model="form.remark" placeholder="请填写申请原因"></el-input>
      </el-form-item>
    </el-form>
    <div v-if="reload" v-show="false">
      <baidu-map @ready="handler"></baidu-map>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="confirm">{{$t('sure')}}</el-button>
      <el-button type="info" @click="closeDialog">{{$t('cancel')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import dayjs from 'dayjs'
import apis from '@/apis'
import mixin from '@/mixins/dialogMixin'
import ApplyCardDialogClass from './applyCardDialogClass'
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: 'lXj4dZqzNFwgMsEwZuRREAPciC7epOrK', // 在此输入你自己的百度地图ak
})

export default {
  mixins: [mixin],
  props: {
    show: {
      required: true,
      type: Boolean,
    },
  },
  components: {
    // baiduMap,
  },
  data() {
    return {
      form: new ApplyCardDialogClass('form'),
      rules: new ApplyCardDialogClass('rule'),
      checkDate: '', //补卡日期
      checkTime: '', //补卡时间
      checkType: null, // 1签到；2签退
      // 是否初始化定位
      hasInitLocation: false,
      reload: true,
    }
  },
  methods: {
    handler({ BMap }) {
      const geolocation = new BMap.Geolocation()
      geolocation.enableSDKLocation() // 允许SDK辅助
      geolocation.getCurrentPosition((result) => {
        this.form.longitude = result.point.lng
        this.form.latitude = result.point.lat
        this.form.checkInPlace = `${result.address.province}${result.address.city}${result.address.district}${result.address.street}`
        this.hasInitLocation = true
        this.$emit('init-local')
      })
    },
    getDataQuery(date, checkInGroup, item, type) {
      this.reload = false
      this.$nextTick(() => {
        this.reload = true
      })
      this.form.checkInGroup = checkInGroup
      this.form.checkInType = type
      this.checkDate = dayjs(date).format('YYYY-MM-DD')
    },
    /**
     * 确定
     */
    confirm() {
      this.form = {
        ...this.form,
        checkInTime: `${this.checkDate} ${this.form.signTime}`,
        signTime: undefined,
      }
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }

        if (this.hasInitLocation) {
          this.replacementCard()
        } else {
          this.$once('init-local', () => {
            this.replacementCard()
          })
        }
      })
    },

    // 发送补卡的请求，不做任何校验
    replacementCard() {
      this.$http.post(apis.ZyzRegistered_ReplacementCard, this.form).then((res) => {
        if (res.data.code === 200) {
          this.$emit('onComplete')
          this.closeDialog()
        }
      })
    },

    /**
     * @function 初始化弹窗
     */
    init() {
      this.$refs.form.resetFields()
      this.form = new ApplyCardDialogClass('form')
    },
  },
}
</script>

<style lang="less" scoped>
// @import '../../../assets/styles/mixin.scoped.less';
</style>
