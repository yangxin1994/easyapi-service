import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import axios from "./api/fetch";
import moment from "moment";

import "view-design/dist/styles/iview.css";
import "./assets/iconfont/iconfont.css";

Vue.use(ViewUI);

Vue.prototype.$ajax = axios;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
