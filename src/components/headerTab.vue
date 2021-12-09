<template>
  <div>
    <template v-for="(item, index) in routerTab">
      <router-link :to="item.path" class="navTar" :key="`${item.path}-${index}`">
        <span>{{item.name}}</span>
        <i v-show="routerTab.length > 1" class="el-icon-circle-close" @click.prevent.stop="routeTabClick(index)"></i>
      </router-link>
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['authority', 'routerTab']),
  },
  data() {
    return {
      authorityFormat: [],
    }
  },
  mounted() {
    const result = []
    const map = (arr) => {
      arr.forEach((item) => {
        result.push({
          name: item.name,
          path: item.url,
          buttonAuth: item.button,
        })
        if (item.children.length > 0) {
          map(item.children)
        }
      })
    }
    (async () => {
      if (this.authority.length > 0) {
        await map(this.authority)
      }
      this.authorityFormat = result
      this.addTab(this.$route)
    })()
  },
  watch: {
    $route(to) {
      this.addTab(to)
    },
  },
  methods: {
    ...mapMutations(['setRouterTab', 'setButtonAuth']),
    /**
     * @function tab关闭
     * @param {String} index 下标
     */
    routeTabClick(index) {
      if (index < this.routerTab.length - 1) {
        this.$router.push(this.routerTab[index + 1].path)
      } else {
        this.$router.push(this.routerTab[index - 1].path)
      }
      const routerTab = [...this.routerTab]
      routerTab.splice(index, 1)
      this.setRouterTab(routerTab)
    },
    addTab(router) {
      let currentRoute = []
      const hasRoute = this.routerTab.some(item => item.path === router.fullPath)
      if (!hasRoute && router.name !== 'Welcome') {
        currentRoute = this.authorityFormat.filter(item => item.path === router.path)
        const routerObj = { ...currentRoute[0] }
        routerObj.path = this.$route.fullPath
        this.setRouterTab([routerObj].concat(this.routerTab))
      }
      this.routerTab.forEach((item) => {
        if (item.path === router.fullPath) {
          this.setButtonAuth(item.buttonAuth)
        }
      })
    },
    /* goTab(index) {
      this.$router.push({
        name: this.routerTab[index].routerName,
        params: this.routerTab[index].params,
      })
    }, */
  },
}
</script>

<style lang="less" scoped>
.navTar {
  display: inline-block;
  line-height: 60px;
  width: 180px;
  font-size: 16px;
  text-align: center;
  color: #8D8F95;
  // color: var(--text-default-color);
  text-decoration: none;
  border-right: 1px solid #DFE3E7;
  &.router-link-exact-active {
    // color: var(--active-text-color);
    color: #151515;
  }
  .el-icon-circle-close {
    margin-left: 10px;
    color: #D5DAE3;
    &:hover {
      color: red;
    }
  }
}
</style>
