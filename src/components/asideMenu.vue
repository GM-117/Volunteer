<!--
 * @Author: 安林娜
 * @LastEditors: 安林娜
-->
<template>
  <div class="aside-menu">
    <el-menu
      router
      unique-opened
      :default-active="$route.fullPath"
      text-color="#242D41"
      active-text-color="rgb(40, 134, 220)"
      :collapse="collapse"
      class="el-menu-vertical-demo">
      <template v-for="(item) in data">
        <el-submenu
          :index="item.url"
          :key="item.id"
          v-if="item.children1.length > 0 && item.isScreen === 'Y'">
          <template slot="title">
            <img src="../assets/images/personalMana.png" style="width: 20px; margin-right: 7px;">
            <span style="color: #fff;">{{item.name}}</span>
          </template>
          <template v-for="children_item in item.children1">
            <el-menu-item :index="children_item.url" :key="children_item.id" v-if="children_item.isScreen === 'Y'">{{children_item.name}}</el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item :index="item.url" :key="item.id" v-if="item.children1.length === 0 && item.isScreen === 'Y'">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data(){
    return{
      data: [
        {
          url: '/personalMana',
          id: '/personalMana',
          name: '志愿者个人管理',
          isScreen: 'Y',
          children1:[{
            url: '/personalMana/application',
            id: 'application',
            isScreen: 'Y',
            name: '我的报名'
          },
          // {
          //   url: 'job',
          //   id: 'job',
          //   isScreen: 'Y',
          //   name: '我的岗位'
          // },
          // {
          //   url: 'certificate',
          //   id: 'certificate',
          //   isScreen: 'Y',
          //   name: '我的证书'
          // },
          // {
          //   url: 'allege',
          //   id: 'allege',
          //   isScreen: 'Y',
          //   name: '证件申诉'
          // }
          ],
        },
      ]
    }
  },
  props: {
    // data: {
    //   type: Array,
    //   required: true,
    //   default: () => ([
    //     {
    //       url: '/personalMana',
    //       id: '1',
    //       name: '志愿者个人管理',
    //       isScreen: 'Y',
    //       iconPath: '@/assets/images/personalMana.png',
    //       children:[{
    //         url: 'application',
    //         id: '1-1',
    //         isScreen: 'Y',
    //         name: '我的报名'
    //       },
    //       {
    //         url: 'job',
    //         id: '1-1',
    //         isScreen: 'Y',
    //         name: '我的岗位'
    //       },
    //       {
    //         url: 'certificate',
    //         id: '1-1',
    //         isScreen: 'Y',
    //         name: '我的证书'
    //       },
    //       {
    //         url: 'allege',
    //         id: '1-1',
    //         isScreen: 'Y',
    //         name: '证件申诉'
    //       }],
    //     },
    //   ]),
    // },
    collapse: {
      type: Boolean,
      required: true,
      default: () => (false),
    },
  }
}
</script>

<style lang="less" scoped>
.aside-menu {
  position: relative;
  height: calc(100vh - 270px);
}
</style>
<style lang="less">
  .aside-menu {
    .el-menu {
      background: none;
    }
    .el-submenu__title:hover {
      background-color: rgb(28, 124, 214);
    }
    .el-menu-item {
      color: #fff !important;
    }
    .el-menu-item:hover, .el-menu-item:focus {
      color: #000;
      background-color: #63B4FA;
    }
  }
</style>
