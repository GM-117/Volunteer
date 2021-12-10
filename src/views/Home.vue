<template>
  <el-container class="home">
    <el-aside :width="collapse ? '64px' : '210px'" class="asideContainer"
      style="">
      <div class="systemTitle">
        <img src="@/assets/img/logo-icon.png" style="width: 129px;" class="img" />
        <!-- <h3 class="title" v-show="!collapse">{{VUE_APP_PRODUCTION_SERVER ? $t('systemName_test') : $t('systemName')}}</h3> -->
        <h3 class="title" v-show="!collapse">志愿者管理系统</h3>
      </div>
      <aside-menu
        :data="authority"
        :collapse="collapse"></aside-menu>
      <i :class="['asideCollapse', collapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left']" @click="collapse=!collapse"></i>
    </el-aside>
    <el-container style="height:100vh;overfloat-y:auto;">
      <el-header class="header">
        <header-tab class="headerLeft"></header-tab>
        <login-dropdown class="headerRight" @registerEnter="changeEnterDialog" @updatePassword="changeChangeDialog"></login-dropdown>
        <!-- 修改密码弹窗 -->
        <change-dialog ref="changeDialog" :Language="Language" :show="changeDialog.visible" @closeDialog="changeChangeDialog"></change-dialog>
        <!--  -->
        <enter-dialog ref="enterDialog" :Language="Language" :show="enterPopup.visible" @closeDialog="changeEnterDialog"></enter-dialog>
      </el-header>
      <el-main class="main" :style="`width: calc(100vw - ${collapse ? '64px' : '210px'});`">
        <router-view :key="$route.fullPath"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import asideMenu from '@/components/asideMenu.vue';
import headerTab from '@/components/headerTab.vue';
import loginDropdown from '@/components/loginDropdown.vue';
import changeDialog from './dialog/changeDialog.vue'
import enterDialog from '@/components/enterDialog.vue'

export default Vue.extend({
  name: 'home',
  components: {
    asideMenu,
    headerTab,
    loginDropdown,
    changeDialog,
    enterDialog,
  },
  data() {
    return {
      changeDialog: {
        visible: false,
      },
      enterPopup: {
        visible: false,
      },
      collapse: false,
    }
  },
  computed: {
    ...mapState(['authority', 'Language', 'VUE_APP_LOGO_BASE_URL', 'VUE_APP_PRODUCTION_SERVER']),
  },
  methods: {
    /**
     * @function 改变新增/修改弹窗的状态
     * @param {Boolean} dialogStatus 是否展示当前弹窗
     */
    changeChangeDialog(dialogStatus) {
      this.changeDialog.visible = dialogStatus
    },
    changeEnterDialog(dialogStatus) {
      this.enterPopup.visible = dialogStatus
    },
  },
});
</script>
<style lang="less" scoped>
.home{
  min-height: 100vh;
  display: flex;
  .systemTitle {
    text-align: center;
    .img {
      margin-top: 40px;
    }
    .title {
      // color: var(--text-default-color);
      color: #fff;
      font-size: 16px;
      text-align: center;
      font-weight: normal;
      margin-bottom: 30px;
      margin-top: 13px;
    }
  }
  .header {
    background: var(--header-bg-color);
    box-shadow: var(--header-bg-color-shadow);
    padding: 0;
    width: 100%;
    .headerLeft {
      width: calc(100vw - 460px);
      height: 60px;
      overflow: hidden;
    }
    .headerRight {
      width: 150px;
    }
  }
  .main {
    background: var(--main-bg-color);
    padding: 0;
  }
  .asideContainer {
    background: url('../assets/img/aside01.png'); background-size: 100% 100%;
    position: relative;
    transition: all 0.2s linear;
    overflow: hidden;
    overflow-y: auto;
    // background: url('../assets/images/aside01.png') no-repeat;
    // background-size: 100% 100%;
    .asideCollapse {
      position: absolute;
      width: 42px;
      height: 42px;
      line-height: 42px;
      padding-left: 7px;
      border-radius: 50%;
      z-index: 9;
      top: calc(50% - 21px);
      right: -21px;
      background: #EEF0F4;
      font-family: '宋体'
    }
  }
}
</style>
