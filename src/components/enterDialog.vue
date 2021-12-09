<!--
 * @Author: guojinhu
 * @Date: 2021-05-21 10:15:54
 * @LastEditTime: 2021-06-02 09:33:56
 * @LastEditors: guojinhu
 * @Description: 志愿组织成员登记入口
 * @FilePath: \frontend\src\components\enterDialog.vue
-->
<template>
  <div class="dialog-container">
    <el-dialog
      :visible.sync="show"
      @open="openDialog"
      :before-close="closeDialog"
      :close-on-click-modal="false"
      center
      width="640px">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules" size="mini">
        <p class="choice_organization">{{ $t('choice_organization') }}</p>
        <el-form-item :label="$t('ZYZZ')" prop="id">
          <el-select v-model="form.id">
            <el-option
              v-for="item in organizationList"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
          <el-link type="primary" style="margin-left: 12px;" @click.native="$router.push({path: '/organizationLogin'})">找不到志愿组织？去添加</el-link>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <!-- 如果没特别需求，统一使用mixin里面的关闭方法 -->
        <el-button type="info" @click="closeDialog">{{$t('cancel')}}</el-button>
        <el-button type="primary" @click="sureEvent">{{$t('sure')}}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import mixin from '@/mixins/dialogMixin'
import dictMixin from '@/mixins/dictMixin'
import apis from '@/apis'

export default {
  mixins: [mixin, dictMixin],
  data() {
    return {
      form: {
        id: '',
      },
      rules: {
        id: [
          { required: true, message: '请选择志愿组织', trigger: 'blur' },
        ],
      },
      organizationList: [],
    }
  },
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
  mounted() {
    this.getOrganizationList()
  },
  methods: {
    init() {
      this.form = {
        id: '',
      }
      this.$refs['form'].resetFields()
    },
    /**
     * @description: 获取组织列表
     * @param {*}
     * @return {*}
     */
    getOrganizationList() {
      this.$http.post(apis.OptionConfig_OrganizationList).then((res) => {
        if (res.data.code === 200) {
          this.organizationList = res.data.data
        }
      })
    },
    sureEvent() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$http.post(apis.ZyzRegistered_VolAddOrganization, this.form).then((res) => {
            if (res.data.code === 200) {
              this.closeDialog()
            }
          })
          return true
        }
        return false
      })
    },
  },
}
</script>

<style lang="less" scoped>
.choice_organization {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-bottom: 33px;
}
/deep/ .el-input {
  width: 196px;
}
</style>
