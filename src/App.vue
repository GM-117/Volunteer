<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import apis from "@/apis";

export default {
  name: "app",
  methods: {
    ...mapActions({
      setConfig: "setConfig",
      setDict: "setDict",
    }),
  },
  mounted() {
    this.$http.post(apis.OptionConfig_GetConfig).then((res) => {
      this.setConfig(res.data.data);
    });
  },
};
</script>

<style>
@import "styles/app.css";
/* #app {
  margin: 0;
  border: 0;
  padding: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body .el-table th.gutter {
  display: table-cell !important;
}

body .el-table colgroup.gutter {
  display: table-cell !important;
} */
</style>
