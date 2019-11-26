import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iView from "iview";
import axios from "./api/fetch";
import moment from "moment";

import "iview/dist/styles/iview.css";
import "./assets/iconfont/iconfont.css";

Vue.use(iView);

Vue.prototype.$ajax = axios;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
