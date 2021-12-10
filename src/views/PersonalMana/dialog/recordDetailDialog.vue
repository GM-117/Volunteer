<!--
 * @Author: guojinhu
 * @Date: 2021-06-04 10:43:27
 * @LastEditTime: 2021-06-11 17:46:27
 * @LastEditors: guojinhu
 * @Description: 描述
 * @FilePath: \frontend\src\views\PersonalMana\dialog\recordDetailDialog.vue
-->
<template>
  <el-dialog :visible.sync="show" title="打卡记录" class="dialog-container" width="600px" center :before-close="closeDialog" :close-on-click-modal="false">
    <el-form ref="form" label-width="100px" label-position="right" :model="form" :rules="rules" disabled>
      <el-form-item :label="$t('打卡时间')" prop="signTime">
        <el-input v-model="form.clockInTime"></el-input>
      </el-form-item>
      <el-form-item :label="$t('打卡地点')" prop="signTime">
        <el-input v-model="form.address"></el-input>
        <baidu-map v-if="reload" @ready="handler" :center="point" :zoom="16" class="baidu-map">
          <bm-marker v-if="point.lng && point.lat" :position="point"></bm-marker>
        </baidu-map>
      </el-form-item>
      <el-form-item :label="$t('补卡时间')" prop="signTime">
        <el-input v-model="form.applyTime"></el-input>
      </el-form-item>
      <el-form-item :label="$t('补卡原因')" prop="signTime">
        <el-input v-model="form.applyReason"></el-input>
      </el-form-item>
      <el-form-item :label="$t('审核状态')" prop="signTime">
        <el-input v-model="form.statusName"></el-input>
      </el-form-item>
      <el-form-item :label="$t('审核原因')" prop="signTime">
        <el-input v-model="form.statusReason"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="info" @click="closeDialog">{{$t('cancel')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import mixin from '@/mixins/dialogMixin'
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: 'lXj4dZqzNFwgMsEwZuRREAPciC7epOrK', // 在此输入你自己的百度地图ak
})

export default {
  mixins: [mixin],
  data() {
    return {
      form: {
        clockInTime: '',
        applyTime: '',
        applyReason: '',
        statusName: '',
        statusReason: '',
        address: '',
        longitude: '',
        latitude: '',
      },
      point: {
        lat: '',
        lng: '',
      },
      rules: {},
      reload: true, // 重新加载
    }
  },
  props: {
    show: {
      required: true,
      type: Boolean,
    },
  },
  watch: {
    point() {
      console.log(this.point, '.......point')
    },
  },
  methods: {
    init() {},
    handler({ BMap }) {
      if (this.point.lat === '' || this.point.lng === '') {
        const geolocation = new BMap.Geolocation()
        geolocation.enableSDKLocation() // 允许SDK辅助
        geolocation.getCurrentPosition((result) => {
          if (this.point.lat || this.point.lng) {
            return
          }
          this.form.longitude = result.point.lng
          this.form.latitude = result.point.lat
          this.point = {
            lat: result.point.lat,
            lng: result.point.lng,
          }
          this.form.address = `${result.address.province}${result.address.city}${result.address.district}${result.address.street}`
        })
      }
    },
    getDataQuery(date, item, type) {
      this.reload = false
      this.$nextTick(() => {
        this.reload = true
      })
      if (type === 1) {
        this.form = {
          clockInTime: `${date} ${item.checkInTime}`,
          applyTime: item.checkInApplyTime,
          applyReason: item.checkInApplyReason,
          statusName: item.checkInApplyStatus,
          statusReason: item.checkInApplyAuditRemark,
          address: item.checkInPlace,
          longitude: item.longitude,
          latitude: item.latitude,
        }
        this.point = {
          lat: item.latitude,
          lng: item.longitude,
        }
      } else if (type === 2) {
        this.form = {
          clockInTime: `${date} ${item.checkOutTime}`,
          applyTime: item.checkOutApplyTime,
          applyReason: item.checkOutApplyReason,
          statusName: item.checkOutApplyStatus,
          statusReason: item.checkOutApplyAuditRemark,
          address: item.checkOutPlace,
          longitude: item.outLongitude,
          latitude: item.outLatitude,
        }
        this.point = {
          lat: item.outLatitude,
          lng: item.outLongitude,
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.baidu-map {
  margin-top: 20px;
  width: 100%;
  height: 300px;
}
</style>
