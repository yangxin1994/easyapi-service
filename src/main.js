// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview';
import axios from 'axios';
import moment from 'moment'
import VueClipboard from 'vue-clipboard2'

import 'iview/dist/styles/iview.css';
import './assets/iconfont/iconfont.css';

Vue.use(iView);
Vue.use(VueClipboard)

Vue.prototype.$ajax = axios
Vue.prototype.$moment = moment;

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})


