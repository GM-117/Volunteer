/*
 * @Author: XUnz
 * @Date: 2021-05-17 09:39:25
 * @LastEditors: guojinhu
 * @LastEditTime: 2021-06-02 09:55:13
 * @FilePath: \frontend\src\main.js
 */
/* eslint-disable */
import Vue from 'vue';
import "babel-polyfill"
import http from './plugins/axios'
import App from './App.vue';
import store from './store';
import router from './router';
import './plugins/element';
import i18n from './i18n';
// import './assets/styles/mixin.less';
import browserRedirect from './unit/browserRedirect';
import BaiduMap from 'vue-baidu-map';
import request302Message from '@/mixins/request302Message.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'uOONS3ZiGapapMDDpXdFGcYNfxHglkYx',
})
// import VueAMap from 'vue-amap'
// //引入高德地图
// Vue.use(VueAMap)
// VueAMap.initAMapApiLoader({
//   key: 'dd987c1fb29d591d0bd93b44205eeb06',
//   plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
//   v: '1.4.4',
//   uiVersion: '1.0'
// })

browserRedirect()
Vue.config.productionTip = false;
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'uOONS3ZiGapapMDDpXdFGcYNfxHglkYx',
})
Vue.use(ElementUI);

Vue.prototype.$http = http
window.v = new Vue({
  mixins: [request302Message],
  store,
  router,
  i18n,
  created(){
    this.addInterceptors302Message()
  }, 
  render: h => h(App),
}).$mount('#app');
